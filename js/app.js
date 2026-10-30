// 传音手机结构件知识宝典 - 主逻辑

(function () {
  "use strict";

  let currentCategory = "all";
  let currentProcessId = "cnc-anodize";
  let currentView = "detail"; // "overview" | "detail"
  let searchKeyword = "";
  let sortKey = "default"; // default | cost | yield | models
  let sortDir = 1;

  // ============ 渲染左侧列表 ============
  function renderSidebar() {
    const sidebar = document.getElementById("sidebar");
    const all = getAllProcesses();

    // 过滤
    let filtered = all;
    if (currentCategory !== "all") {
      filtered = all.filter((p) => p.category === currentCategory);
    }
    if (searchKeyword) {
      const kw = searchKeyword.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(kw) ||
          p.shortName.toLowerCase().includes(kw) ||
          p.tagline.toLowerCase().includes(kw) ||
          (p.models || []).some(
            (m) =>
              m.name.toLowerCase().includes(kw) ||
              m.brand.toLowerCase().includes(kw)
          )
      );
    }

    // 按新分类分组
    const mdaFrames = filtered.filter((p) => p.category === "MDA中框");
    const threePiece = filtered.filter((p) => p.category === "三件式");
    const metalFrames = filtered.filter((p) => p.category === "金属中框");
    const backs = filtered.filter((p) => p.category === "电池盖");

    let html = "";

    // 总览入口（始终置顶显示）
    html += `
      <div class="process-item overview-entry ${currentView === "vendors" ? "active" : ""}" data-view="vendors" style="margin-bottom:10px;">
        <div class="process-icon overview">🏭</div>
        <div class="process-text">
          <div class="process-name">供应商名录</div>
          <div class="process-tag">5 大分组 · 40 种物料 · 76 家供应商</div>
        </div>
      </div>
      <div class="process-item overview-entry ${currentView === "docs" ? "active" : ""}" data-view="docs" style="margin-bottom:10px;">
        <div class="process-icon overview">📚</div>
        <div class="process-text">
          <div class="process-name">内部学习资料</div>
          <div class="process-tag">上传 PDF / PPT / PPTX</div>
        </div>
      </div>
      <div class="process-item overview-entry ${currentView === "decision" ? "active" : ""}" data-view="decision" style="margin-bottom:10px;">
        <div class="process-icon overview">🧭</div>
        <div class="process-text">
          <div class="process-name">工艺选型决策树</div>
          <div class="process-tag">按价位段给方案组合</div>
        </div>
      </div>

    `;

    // 分类切换按钮
    html += `<div class="category-filter">
      ${CATEGORIES.map(
        (c) =>
          `<button class="cat-btn ${
            currentCategory === c.id ? "active" : ""
          }" data-cat="${c.id}">${c.icon} ${c.name}</button>`
      ).join("")}
    </div>`;

    if (mdaFrames.length > 0) {
      html += `<div class="sidebar-section-title">MDA中框 (${mdaFrames.length})</div>`;
      html += mdaFrames.map((p) => renderProcessItem(p)).join("");
    }

    if (threePiece.length > 0) {
      html += `<div class="sidebar-section-title">三件式 (${threePiece.length})</div>`;
      html += threePiece.map((p) => renderProcessItem(p)).join("");
    }

    if (metalFrames.length > 0) {
      html += `<div class="sidebar-section-title">金属中框 (${metalFrames.length})</div>`;
      // 金属中框按 subCategory 再分组
      const subGroups = {};
      metalFrames.forEach(p => {
        const sc = p.subCategory || "其他";
        if (!subGroups[sc]) subGroups[sc] = [];
        subGroups[sc].push(p);
      });
      const subOrder = ["钛合金", "不锈钢", "铝合金全C", "铝合金点焊", "铝合金一体压铸", "一体化锻压"];
      subOrder.forEach(sc => {
        if (subGroups[sc]) {
          html += `<div class="sidebar-subsection-title">  ${sc} (${subGroups[sc].length})</div>`;
          html += subGroups[sc].map((p) => renderProcessItem(p)).join("");
        }
      });
      // 其他 subCategory
      Object.keys(subGroups).filter(s => !subOrder.includes(s)).forEach(sc => {
        html += `<div class="sidebar-subsection-title">  ${sc} (${subGroups[sc].length})</div>`;
        html += subGroups[sc].map((p) => renderProcessItem(p)).join("");
      });
    }

    if (backs.length > 0) {
      html += `<div class="sidebar-section-title">电池盖工艺 (${backs.length})</div>`;
      // 电池盖按 subCategory 再分组
      const backSubGroups = {};
      backs.forEach(p => {
        const sc = p.subCategory || "其他";
        if (!backSubGroups[sc]) backSubGroups[sc] = [];
        backSubGroups[sc].push(p);
      });
      const backSubOrder = ["复合板", "素皮", "玻纤", "陶瓷", "PGI", "玻璃"];
      backSubOrder.forEach(sc => {
        if (backSubGroups[sc]) {
          html += `<div class="sidebar-subsection-title">  ${sc} (${backSubGroups[sc].length})</div>`;
          html += backSubGroups[sc].map((p) => renderProcessItem(p)).join("");
        }
      });
      // 其他 subCategory
      Object.keys(backSubGroups).filter(s => !backSubOrder.includes(s)).forEach(sc => {
        html += `<div class="sidebar-subsection-title">  ${sc} (${backSubGroups[sc].length})</div>`;
        html += backSubGroups[sc].map((p) => renderProcessItem(p)).join("");
      });
    }

    if (filtered.length === 0) {
      html += `<div style="text-align:center;color:#94a3b8;padding:30px 10px;font-size:13px;">
        没有匹配的工艺
      </div>`;
    }

    sidebar.innerHTML = html;

    // 绑定分类按钮
    sidebar.querySelectorAll(".cat-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        currentCategory = e.currentTarget.dataset.cat;
        renderSidebar();
      });
    });

    // 绑定总览/资料入口（支持多个）
    sidebar.querySelectorAll(".overview-entry").forEach((entry) => {
      entry.addEventListener("click", () => {
        currentView = entry.dataset.view || "overview";
        renderSidebar();
        renderContent();
      });
    });

    // 绑定列表项
    sidebar.querySelectorAll(".process-item:not(.overview-entry)").forEach((item) => {
      item.addEventListener("click", (e) => {
        currentProcessId = e.currentTarget.dataset.id;
        currentView = "detail";
        renderSidebar();
        renderContent();
      });
    });
  }

  function renderProcessItem(p) {
    const isFrame = p.category === "金属中框" || p.category === "MDA中框" || p.category === "三件式";
    const isActive = p.id === currentProcessId;
    const icon = isFrame ? "中框" : "后盖";
    return `
      <div class="process-item ${isActive ? "active" : ""}" data-id="${p.id}">
        <div class="process-icon ${isFrame ? "frame" : "back"}">${icon}</div>
        <div class="process-text">
          <div class="process-name">${p.shortName}</div>
          <div class="process-tag">${p.models.length} 款机型应用</div>
        </div>
      </div>
    `;
  }

  // ============ 渲染详情 ============
  function renderDetail() {
    const content = document.getElementById("content");
    const p = getProcessById(currentProcessId);

    if (!p) {
      content.innerHTML = `<div class="empty"><div class="empty-icon">📭</div><div class="empty-text">请选择左侧工艺查看详情</div></div>`;
      return;
    }

    const isFrame = p.category === "金属中框" || p.category === "MDA中框" || p.category === "三件式";

    content.innerHTML = `
      <div class="detail-card">
        <div class="detail-header">
          <div class="breadcrumb">
            <span>知识宝典</span>
            <span class="sep">/</span>
            <span class="badge ${isFrame ? "frame" : "back"}">${
      p.category
    }</span>
            <span class="sep">/</span>
            <span>${p.shortName}</span>
          </div>
          <div class="detail-title">${p.name}</div>
          <div class="detail-tagline">${p.tagline}</div>
          <div class="detail-summary">${p.summary}</div>
        </div>

        <div class="detail-image">
          <img src="${p.image}" alt="${p.name}" />
        </div>

        <div class="detail-body">

          <!-- 工艺流程 -->
          <div class="section">
            <div class="section-title">
              <span class="section-title-icon">⚙</span>
              工艺流程
            </div>
            <div class="flow-timeline">
              ${p.flow
                .map(
                  (s) => `
                <div class="flow-step">
                  <div class="flow-step-name">
                    <span class="flow-step-num">${s.step}</span>${s.name}
                  </div>
                  <div class="flow-step-desc">${s.desc}</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <!-- 上下游行业状态 -->
          <div class="section">
            <div class="section-title">
              <span class="section-title-icon">🔗</span>
              上下游行业状态
            </div>
            <div class="two-col">
              <div class="info-card">
                <div class="info-card-title">⬆ 上游原材料 / 设备</div>
                <ul class="material-list">
                  ${p.upstream.materials.map((m) => `<li>${m}</li>`).join("")}
                </ul>
                <div class="info-card-content" style="margin-top:10px;font-size:12px;color:#64748b;">
                  ${p.upstream.status}
                </div>
              </div>
              <div class="info-card">
                <div class="info-card-title">⬇ 下游应用 / 趋势</div>
                <ul class="material-list">
                  ${p.downstream.industries.map((i) => `<li>${i}</li>`).join("")}
                </ul>
                <div class="info-card-content" style="margin-top:10px;font-size:12px;color:#64748b;">
                  ${p.downstream.status}
                </div>
              </div>
            </div>
          </div>

          <!-- 主要供应商 -->
          <div class="section">
            <div class="section-title">
              <span class="section-title-icon">🏭</span>
              主要供应商
            </div>
            <table class="supplier-table">
              <thead>
                <tr>
                  <th>供应商</th>
                  <th>主要角色</th>
                  <th>备注</th>
                </tr>
              </thead>
              <tbody>
                ${p.suppliers
                  .map(
                    (s) => `
                  <tr>
                    <td>
                      <span class="supplier-name">${s.name}</span>
                      <span class="supplier-tag">战略合作</span>
                    </td>
                    <td>${s.role}</td>
                    <td style="color:#64748b;font-size:12px;">${s.note}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>

          <!-- 成本构成 -->
          <div class="section">
            <div class="section-title">
              <span class="section-title-icon">💰</span>
              成本构成（典型机型参考）
            </div>
            <div class="cost-chart">
              ${p.cost
                .map(
                  (c) => `
                <div class="cost-row">
                  <div class="cost-label">${c.item}</div>
                  <div class="cost-bar">
                    <div class="cost-bar-fill" style="width:${
                      c.pct
                    }%;background:${c.color};">
                      ${c.pct >= 10 ? c.pct + "%" : ""}
                    </div>
                  </div>
                  <div class="cost-value">${c.pct}%</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <!-- 应用机型 -->
          <div class="section">
            <div class="section-title">
              <span class="section-title-icon">📱</span>
              传音应用机型
            </div>
            <div class="mobile-cards">
              ${p.models
                .map(
                  (m) => `
                <div class="mobile-card">
                  <div class="mobile-brand">${m.brand}</div>
                  <div class="mobile-name">${m.name}</div>
                  <div class="mobile-note">${m.note}</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <!-- 优势与挑战 -->
          <div class="section">
            <div class="section-title">
              <span class="section-title-icon">⚡</span>
              工艺优劣势
            </div>
            <div class="pros-cons">
              <div class="pros">
                <div class="pros-title">优势</div>
                <ul>${p.advantages
                  .map((a) => `<li>${a}</li>`)
                  .join("")}</ul>
              </div>
              <div class="cons">
                <div class="cons-title">挑战</div>
                <ul>${p.challenges
                  .map((a) => `<li>${a}</li>`)
                  .join("")}</ul>
              </div>
            </div>
          </div>

          <!-- 风险点与应对 -->
          <div class="section">
            <div class="section-title">
              <span class="section-title-icon">⚠️</span>
              工艺风险点与应对
            </div>
            ${(p.risks || []).length
              ? `<div class="risk-list">
                ${p.risks
                  .map(
                    (r, i) => `
                <div class="risk-item">
                  <div class="risk-head">
                    <span class="risk-badge">风险 ${i + 1}</span>
                    <span class="risk-title">${r.risk}</span>
                  </div>
                  ${r.detail ? `<div class="risk-detail">${r.detail}</div>` : ""}
                  ${r.counter ? `<div class="risk-counter"><span class="risk-counter-label">应对思路</span><span class="risk-counter-text">${r.counter}</span></div>` : ""}
                </div>`
                  )
                  .join("")}
              </div>`
              : `<div class="empty-hint">该工艺暂无收录的风险条目</div>`}
          </div>

          <!-- 未来技术趋势 -->
          <div class="section">
            <div class="section-title">
              <span class="section-title-icon">🔮</span>
              未来技术发展趋势
            </div>
            ${(p.trends || []).length
              ? `<div class="trend-grid">
                ${p.trends
                  .map(
                    (t, i) => `
                <div class="trend-card">
                  <div class="trend-top">
                    <span class="trend-num">0${i + 1}</span>
                    ${t.horizon ? `<span class="trend-horizon">${t.horizon}</span>` : ""}
                  </div>
                  <div class="trend-title">${t.title}</div>
                  <div class="trend-desc">${t.desc}</div>
                </div>`
                  )
                  .join("")}
              </div>`
              : `<div class="empty-hint">该工艺暂无收录的趋势条目</div>`}
          </div>

          <!-- LT 工序周期（用户上传） -->
          <div class="section">
            <div class="section-title">
              <span class="section-title-icon">⏱</span>
              工序周期（LT）
            </div>
            <div class="lt-upload-zone" id="lt-upload-${p.id}">
              <div class="lt-upload-icon">📤</div>
              <div class="lt-upload-title">上传工序周期表</div>
              <div class="lt-upload-desc">支持 Excel (.xlsx/.xls)，自动解析工序步骤和周期天数</div>
              <input type="file" id="lt-file-${p.id}" accept=".xlsx,.xls" style="display:none;" />
              <button class="lt-upload-btn" data-process="${p.id}">选择文件</button>
            </div>
            <div class="lt-data-container" id="lt-data-${p.id}"></div>
          </div>

          ${p.comparisonTable ? renderComparisonTable(p.comparisonTable) : ""}
          ${p.sheetParams ? renderSimpleTable(p.sheetParams, "sheet-params-table") : ""}
          ${p.processYields ? renderProcessYields(p.processYields) : ""}
          ${p.v600Colors ? renderSimpleTable(p.v600Colors, "v600-colors-table") : ""}
          ${p.principleImages ? renderImageGallery(p.principleImages, "镀膜原理示意图（来自《真空镀膜知识培训》）") : ""}
          ${p.productionImages ? renderImageGallery(p.productionImages, "产线实拍 / 项目成品（来自内部培训资料）") : ""}

        </div>
      </div>

      <div style="text-align:center;color:#94a3b8;font-size:11px;padding:10px;">
        数据来源：公开行业资料整理（IDC、CPCA、行业研报、供应商官网、年报等）· 仅作学习参考
      </div>
    `;

    // LT 上传功能绑定
    const ltUploadBtn = content.querySelector(".lt-upload-btn");
    const ltFileInput = content.querySelector("input[type=file][id^='lt-file-']");
    const ltUploadZone = content.querySelector(".lt-upload-zone");

    if (ltUploadBtn && ltFileInput) {
      ltUploadBtn.addEventListener("click", () => ltFileInput.click());
      ltUploadZone.addEventListener("click", (e) => {
        if (e.target !== ltUploadBtn && e.target !== ltFileInput) ltFileInput.click();
      });
      ltUploadZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        ltUploadZone.classList.add("drag-over");
      });
      ltUploadZone.addEventListener("dragleave", () => ltUploadZone.classList.remove("drag-over"));
      ltUploadZone.addEventListener("drop", (e) => {
        e.preventDefault();
        ltUploadZone.classList.remove("drag-over");
        if (e.dataTransfer.files.length > 0) handleLtUpload(e.dataTransfer.files[0], currentProcessId);
      });
      ltFileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) handleLtUpload(e.target.files[0], currentProcessId);
      });
    }

    // 渲染已保存的 LT 数据
    if (ltDataStore[currentProcessId]) {
      renderLtData(currentProcessId);
    }
  }

  // LT 数据存储（会话内有效）
  const ltDataStore = {};

  function handleLtUpload(file, processId) {
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['xlsx', 'xls'].includes(ext)) {
      alert('请上传 Excel 文件（.xlsx 或 .xls）');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        // 解析数据：序号 | 工艺名称 | 周期天数 | 备注
        const ltData = [];
        let totalDays = 0;
        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i];
          if (!row || row.length < 3) continue;
          const seq = row[0];
          const name = row[1];
          const days = parseFloat(row[2]);
          const note = row[3] || '';
          if (name && !isNaN(days)) {
            ltData.push({ seq: seq || i, name: String(name), days: days, note: String(note) });
            totalDays += days;
          }
        }

        ltDataStore[processId] = { data: ltData, totalDays: totalDays, fileName: file.name };
        renderLtData(processId);
      } catch (err) {
        alert('解析失败：' + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function renderLtData(processId) {
    const container = document.getElementById("lt-data-" + processId);
    const uploadZone = document.getElementById("lt-upload-" + processId);
    if (!container || !ltDataStore[processId]) return;

    const { data, totalDays, fileName } = ltDataStore[processId];

    uploadZone.style.display = 'none';
    container.innerHTML = `
      <div class="lt-summary">
        <span class="lt-summary-label">总 LT</span>
        <span class="lt-summary-value">${totalDays} 天</span>
        <span class="lt-file-name">${fileName}</span>
        <button class="lt-clear-btn" data-process="${processId}">清除</button>
      </div>
      <div class="lt-timeline">
        ${data.map((item, i) => `
          <div class="lt-step">
            <div class="lt-step-num">${item.seq}</div>
            <div class="lt-step-content">
              <div class="lt-step-name">${item.name}</div>
              ${item.note ? `<div class="lt-step-note">${item.note}</div>` : ''}
            </div>
            <div class="lt-step-days">${item.days} 天</div>
          </div>
        `).join("")}
      </div>
    `;

    // 绑定清除按钮
    container.querySelector(".lt-clear-btn").addEventListener("click", () => {
      delete ltDataStore[processId];
      uploadZone.style.display = '';
      container.innerHTML = '';
    });
  }

  // ============ 渲染总览页 ============
  function renderContent() {
    if (currentView === "docs") {
      renderInternalDocs();
    } else if (currentView === "vendors") {
      renderVendors();
    } else if (currentView === "decision") {
      renderDecisionTree();
    } else {
      renderDetail();
    }
  }

  // ============ 工艺详情页 — 新增 sections 渲染函数 ============
  function renderComparisonTable(ct) {
    return `
      <div class="section">
        <div class="section-title">
          <span class="section-title-icon">🆚</span>${ct.title}
        </div>
        <div class="ov-table-wrap">
          <table class="ov-table comparison-table">
            <thead>
              <tr>${ct.columns.map((c) => `<th>${c}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${ct.rows
                .map(
                  (r) => `
                <tr>
                  ${r
                    .map(
                      (cell, j) =>
                        `<td${j === 0 ? ' class="first-col"' : ""}${j >= 3 && j <= 4 ? ' class="num-cell"' : ""}>${cell}</td>`
                    )
                    .join("")}
                </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderSimpleTable(st, tableClass) {
    return `
      <div class="section">
        <div class="section-title">
          <span class="section-title-icon">📊</span>${st.title}
        </div>
        <div class="ov-table-wrap">
          <table class="ov-table ${tableClass || ""}">
            <thead>
              <tr>${st.columns.map((c) => `<th>${c}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${st.rows.map((r) => `<tr>${r.map((c, j) => `<td${j === 0 ? ' class="first-col"' : ""}>${c}</td>`).join("")}</tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderProcessYields(py) {
    const maxYield = 100;
    return `
      <div class="section">
        <div class="section-title">
          <span class="section-title-icon">📈</span>${py.title}
        </div>
        <div class="yield-summary">
          <span class="yield-summary-label">整体 1*4 排版良率</span>
          <span class="yield-summary-value">${py.totalYield}</span>
        </div>
        <div class="yield-chart">
          ${py.rows
            .map((r) => {
              const pct = parseFloat(r[1]);
              const w = (pct / maxYield) * 100;
              const color = pct >= 98 ? "#16a34a" : pct >= 96 ? "#0891b2" : "#d97706";
              return `
              <div class="yield-row">
                <div class="yield-step">${r[0]}</div>
                <div class="yield-bar">
                  <div class="yield-bar-fill" style="width:${w}%;background:${color};">${r[1]}</div>
                </div>
                <div class="yield-defect">${r[2]}</div>
              </div>
            `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  function renderImageGallery(images, title) {
    return `
      <div class="section">
        <div class="section-title">
          <span class="section-title-icon">🖼</span>${title}
        </div>
        <div class="photo-grid">
          ${images
            .map(
              (img) => `
            <div class="photo-card">
              <img src="${img.src}" alt="${img.caption}" loading="lazy" />
              <div class="photo-caption">${img.caption}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  // ============ 内部学习资料视图 ============
  // 用户上传的文档（浏览器会话内有效）
  let userUploadedDocs = [];

  function renderInternalDocs() {
    const content = document.getElementById("content");
    const all = INTERNAL_DOCS.concat(userUploadedDocs);
    const totalPoints = all.reduce((n, d) => n + d.keyPoints.length, 0);
    const totalImages = all.reduce((n, d) => n + d.images.length, 0);

    content.innerHTML = `
      <div class="detail-card">
        <div class="detail-header">
          <div class="breadcrumb">
            <span>知识宝典</span>
            <span class="sep">/</span>
            <span class="badge docs">内部资料</span>
          </div>
          <div class="detail-title">内部学习资料库</div>
          <div class="detail-tagline">${all.length} 份文档 · ${totalPoints} 条要点 · ${totalImages} 张配图</div>
          <div class="detail-summary">由你提供的内部培训与项目文档，已结构化整合到各工艺详情页中（NCVM / 复合板材等）。这里是文档总览，点击卡片可查看摘要与要点。</div>
        </div>

        <div class="docs-stats">
          <div class="docs-stat">
            <div class="docs-stat-num">${all.length}</div>
            <div class="docs-stat-label">份文档</div>
          </div>
          <div class="docs-stat">
            <div class="docs-stat-num">${all.filter((d) => d.type === "PDF").length}</div>
            <div class="docs-stat-label">PDF</div>
          </div>
          <div class="docs-stat">
            <div class="docs-stat-num">${all.filter((d) => d.type === "PPT").length + all.filter((d) => d.type === "PPTX").length}</div>
            <div class="docs-stat-label">演示文稿</div>
          </div>
          <div class="docs-stat">
            <div class="docs-stat-num">${totalPoints}</div>
            <div class="docs-stat-label">核心要点</div>
          </div>
        </div>

        <!-- 上传区域 -->
        <div class="upload-zone" id="upload-zone">
          <div class="upload-icon"></div>
          <div class="upload-title">上传内部学习资料</div>
          <div class="upload-desc">支持 PDF / PPT / PPTX 格式，拖拽或点击上传</div>
          <input type="file" id="file-upload-input" accept=".pdf,.ppt,.pptx" multiple style="display:none;" />
          <button class="upload-btn" id="upload-btn">选择文件</button>
        </div>

        <div class="docs-list">
          ${all
            .map(
              (d, i) => `
            <div class="doc-card" data-doc-id="${d.id}" style="cursor:pointer;">
              <div class="doc-card-header">
                <div class="doc-type-badge ${d.type.toLowerCase()}">${d.type}</div>
                <div class="doc-card-title">${d.title}</div>
                <div class="doc-card-meta">
                  ${d.date ? `<span>📅 ${d.date}</span>` : ""}
                  ${d.author ? `<span>👤 ${d.author}</span>` : ""}
                  ${d.pages ? `<span>📄 ${d.pages} 页</span>` : ""}
                  <span>📁 ${d.file}</span>
                </div>
              </div>
              <div class="doc-card-body">
                <div class="doc-summary">${d.summary}</div>
                <div class="doc-keypoints">
                  <div class="doc-keypoints-title">核心要点</div>
                  <ul>
                    ${d.keyPoints.map((p) => `<li>${p}</li>`).join("")}
                  </ul>
                </div>
                <div class="doc-related">
                  <span class="doc-related-label">关联工艺：</span>
                  ${d.relatedProcesses
                    .map((rid) => {
                      const p = getProcessById(rid);
                      if (!p) return "";
                      return `<span class="doc-related-chip" data-id="${p.id}">${p.shortName}</span>`;
                    })
                    .join("")}
                </div>
              </div>
              ${
                d.images && d.images.length
                  ? `<div class="doc-imgs">
                  ${d.images
                    .slice(0, 4)
                    .map((img) => `<img src="${img.src}" alt="${img.caption}" loading="lazy" title="${img.caption}" />`)
                    .join("")}
                </div>`
                  : ""
              }
            </div>
          `
            )
            .join("")}
        </div>

        <div style="text-align:center;color:#94a3b8;font-size:11px;padding:10px;">
          资料由你提供并已结构化整理 · 仅作团队内部学习使用
        </div>
      </div>
    `;

    // 绑定：点击关联工艺 chip → 跳转
    content.querySelectorAll(".doc-related-chip").forEach((chip) => {
      chip.addEventListener("click", (e) => {
        e.stopPropagation();
        currentProcessId = chip.dataset.id;
        currentView = "detail";
        renderSidebar();
        renderContent();
        document.getElementById("content").scrollTop = 0;
      });
    });

    // 上传功能绑定
    const uploadZone = content.querySelector("#upload-zone");
    const uploadInput = content.querySelector("#file-upload-input");
    const uploadBtn = content.querySelector("#upload-btn");

    uploadBtn.addEventListener("click", () => uploadInput.click());
    uploadZone.addEventListener("click", (e) => {
      if (e.target !== uploadBtn && e.target !== uploadInput) uploadInput.click();
    });

    uploadZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      uploadZone.classList.add("drag-over");
    });
    uploadZone.addEventListener("dragleave", () => {
      uploadZone.classList.remove("drag-over");
    });
    uploadZone.addEventListener("drop", (e) => {
      e.preventDefault();
      uploadZone.classList.remove("drag-over");
      handleUploadFiles(e.dataTransfer.files);
    });

    uploadInput.addEventListener("change", (e) => {
      handleUploadFiles(e.target.files);
    });

    function handleUploadFiles(files) {
      if (!files || files.length === 0) return;
      Array.from(files).forEach(file => {
        const ext = file.name.split('.').pop().toLowerCase();
        if (!['pdf', 'ppt', 'pptx'].includes(ext)) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          const docId = 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
          userUploadedDocs.push({
            id: docId,
            type: ext.toUpperCase(),
            title: file.name.replace(/\.[^.]+$/, ''),
            date: new Date().toISOString().split('T')[0],
            author: "用户上传",
            source: "本地上传",
            summary: "用户上传的文件：" + file.name + "（" + (file.size / 1024).toFixed(1) + " KB）",
            pages: null,
            file: file.name,
            relatedProcesses: [],
            keyPoints: ["文件已上传，请点击文件名查看"],
            images: [],
            fileData: e.target.result
          });
          renderInternalDocs();
        };
        reader.readAsDataURL(file);
      });
    }

    // 绑定：点击上传文档卡片 → 在新窗口打开
    content.querySelectorAll(".doc-card[data-doc-id]").forEach(card => {
      card.addEventListener("click", (e) => {
        const docId = card.dataset.docId;
        const uploaded = userUploadedDocs.find(d => d.id === docId);
        if (uploaded && uploaded.fileData) {
          const win = window.open();
          if (win) {
            win.document.write('<iframe src="' + uploaded.fileData + '" style="width:100%;height:100vh;border:none;"></iframe>');
          }
        }
      });
    });
  }

  function miniBar(level, color) {
    // 5 段小方块进度条
    let cells = "";
    for (let i = 1; i <= 5; i++) {
      cells += `<span class="mini-cell ${i <= level ? "on" : ""}" style="${i <= level ? `background:${color}` : ""}"></span>`;
    }
    return `<div class="mini-bar">${cells}</div>`;
  }

  function renderOverview() {
    const content = document.getElementById("content");
    const all = getAllProcesses();
    const mdaFrames = all.filter((p) => p.category === "MDA中框");
    const threePiece = all.filter((p) => p.category === "三件式");
    const metalFrames = all.filter((p) => p.category === "金属中框");
    const backs = all.filter((p) => p.category === "电池盖");
    const supplierSet = new Set();
    all.forEach((p) => (p.suppliers || []).forEach((s) => supplierSet.add(s.name)));
    const modelTotal = all.reduce((n, p) => n + (p.models || []).length, 0);

    // 排序（组内各自排序，中框 / 电池盖 永不混排）
    const cmp = {
      cost: (a, b) => sortDir * (a.overview.costLevel - b.overview.costLevel),
      yield: (a, b) => sortDir * (a.overview.yieldLevel - b.overview.yieldLevel),
      models: (a, b) => sortDir * ((a.models || []).length - (b.models || []).length),
      default: (a, b) => 0,
    }[sortKey];
    if (cmp) {
      frames.sort(cmp);
      backs.sort(cmp);
    }

    const sortIcon = (key) =>
      sortKey === key ? (sortDir === 1 ? " ▲" : " ▼") : ' <span class="sort-hint">⇅</span>';

    // 单组表格行
    const tableRows = (list) =>
      list
        .map((p) => {
          const c = p.overview;
          const costColor = c.costLevel >= 4 ? "#dc2626" : c.costLevel === 3 ? "#d97706" : "#16a34a";
          const yieldColor = c.yieldLevel >= 4 ? "#16a34a" : c.yieldLevel === 3 ? "#d97706" : "#dc2626";
          return `
            <tr class="ov-row" data-id="${p.id}">
              <td><span class="ov-proc-name">${p.shortName}</span><span class="ov-proc-sub">${p.name}</span></td>
              <td>${miniBar(c.costLevel, costColor)}<span class="ov-level-tag" style="color:${costColor}">${c.costLabel}</span></td>
              <td class="ov-cost-range">${c.costRange}</td>
              <td>${miniBar(c.yieldLevel, yieldColor)}<span class="ov-yield-val">${c.yieldRange}</span></td>
              <td><span class="ov-model-count">${(p.models || []).length} 款</span><span class="ov-model-first">${(p.models || [])[0] ? p.models[0].brand + " " + p.models[0].name.split(" ")[0] : ""}</span></td>
              <td class="ov-positioning">${c.positioning}</td>
            </tr>`;
        })
        .join("");

    content.innerHTML = `
      <div class="detail-card">
        <div class="detail-header overview-header">
          <div class="breadcrumb">
            <span>知识宝典</span>
            <span class="sep">/</span>
            <span class="badge ov">总览</span>
          </div>
          <div class="detail-title">📊 全工艺总览</div>
          <div class="detail-tagline">一页看懂传音结构件 11 种主流工艺的成本、良率与机型应用</div>
          <div class="detail-summary">
            中框与电池盖两大类工艺的横向对比。点击任意一行可进入该工艺的详细页面（工艺流程、上下游、供应商、成本构成、应用机型）。
            成本等级与单件价格为行业公开资料的典型参考区间，实际以项目报价为准。
          </div>
        </div>

        <div class="detail-body">
          <!-- 统计卡片 -->
          <div class="ov-stats">
            <div class="ov-stat"><div class="ov-stat-num">${all.length}</div><div class="ov-stat-label">工艺总数</div></div>
            <div class="ov-stat"><div class="ov-stat-num"><span style="color:#8b5cf6">${mdaFrames.length}</span><span class="ov-stat-sub"> / </span><span style="color:#06b6d4">${threePiece.length}</span><span class="ov-stat-sub"> / </span><span style="color:var(--frame-color)">${metalFrames.length}</span><span class="ov-stat-sub"> / </span><span style="color:var(--back-color)">${backs.length}</span></div><div class="ov-stat-label">MDA / 三件式 / 金属 / 电池盖</div></div>
            <div class="ov-stat"><div class="ov-stat-num">${supplierSet.size}</div><div class="ov-stat-label">涉及供应商</div></div>
            <div class="ov-stat"><div class="ov-stat-num">${modelTotal}</div><div class="ov-stat-label">应用机型（条目）</div></div>
          </div>

          <!-- 对比表（中框 / 电池盖 分组） -->
          <div class="section">
            <div class="section-title"><span class="section-title-icon">📋</span>工艺对比总表（点击表头排序，点击行查看详情）</div>
            <div class="ov-table-wrap">
              <table class="ov-table">
                <thead>
                  <tr>
                    <th class="sortable" data-sort="default">工艺名称${sortIcon("default")}</th>
                    <th class="sortable" data-sort="cost">相对成本${sortIcon("cost")}</th>
                    <th>单件成本参考</th>
                    <th class="sortable" data-sort="yield">良率${sortIcon("yield")}</th>
                    <th class="sortable" data-sort="models">应用机型${sortIcon("models")}</th>
                    <th>定位</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="ov-group-row" style="background:rgba(139,92,246,.07);color:#8b5cf6;"><td colspan="6">🔩 MDA中框（${mdaFrames.length}）</td></tr>
                  ${tableRows(mdaFrames)}
                  <tr class="ov-group-row" style="background:rgba(6,182,212,.07);color:#06b6d4;"><td colspan="6">🔧 三件式（${threePiece.length}）</td></tr>
                  ${tableRows(threePiece)}
                  <tr class="ov-group-row frame"><td colspan="6">️ 金属中框（${metalFrames.length}）</td></tr>
                  ${tableRows(metalFrames)}
                  <tr class="ov-group-row back"><td colspan="6">🎨 电池盖工艺（${backs.length}）</td></tr>
                  ${tableRows(backs)}
                </tbody>
              </table>
            </div>
          </div>

          <!-- 成本 × 良率定位图（全宽） -->
          <div class="section">
            <div class="section-title"><span class="section-title-icon">🎯</span>成本 × 良率 定位图</div>
            <div class="scatter-toolbar">
              <div class="scatter-legend">
                <span class="legend-dot" style="background:#8b5cf6;"></span>MDA中框
                <span class="legend-dot" style="background:#06b6d4;margin-left:8px;"></span>三件式
                <span class="legend-dot" style="background:#2563eb;margin-left:8px;"></span>金属中框
                <span class="legend-dot" style="background:#0891b2;margin-left:8px;"></span>电池盖
              </div>
              <div class="scatter-caption">横轴：单件成本（对数刻度）　纵轴：综合良率</div>
            </div>
            <div class="scatter-chart" id="scatter-chart"></div>
            <div class="scatter-notes">
              <div class="scatter-note">
                <div class="scatter-note-title">💡 如何看图</div>
                <div class="scatter-note-body">每个标签 = 一种工艺，按真实成本 / 良率数值定位；颜色区分类别，点击标签可跳转详情。</div>
              </div>
              <div class="scatter-note">
                <div class="scatter-note-title">✅ 性价比区（左上）</div>
                <div class="scatter-note-body">低成本 + 高良率，走量机型（itel / SPARK / HOT）主力：塑胶注塑、PC喷涂、IMD、NCVM。</div>
              </div>
              <div class="scatter-note">
                <div class="scatter-note-title">⛰ 旗舰攻坚区（右下）</div>
                <div class="scatter-note-body">高成本 + 低良率，旗舰（Phantom / Zero）为质感付出的代价：钛合金、3D 玻璃。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align:center;color:#94a3b8;font-size:11px;padding:10px;">
        数据来源：公开行业资料整理（IDC、CPCA、行业研报、供应商官网、年报等）· 仅作学习参考
      </div>
    `;

    // 绑定排序
    content.querySelectorAll(".ov-table th.sortable").forEach((th) => {
      th.addEventListener("click", () => {
        const key = th.dataset.sort;
        if (key === "default") {
          sortKey = "default";
          sortDir = 1;
        } else if (sortKey === key) {
          sortDir = -sortDir;
        } else {
          sortKey = key;
          sortDir = key === "cost" ? -1 : -1; // 成本默认从高到低，良率/机型默认从多到少
        }
        renderOverview();
      });
    });

    // 绑定行点击 → 跳转详情
    content.querySelectorAll(".ov-row").forEach((tr) => {
      tr.addEventListener("click", () => {
        currentProcessId = tr.dataset.id;
        currentView = "detail";
        renderSidebar();
        renderContent();
        document.querySelector(".content").scrollTop = 0;
      });
    });

    // 渲染成本 × 良率散点定位图
    renderScatterChart();
  }

  // ============ 成本 × 良率 散点定位图 ============
  // 解析 "¥60–120" / "90–95%" 之类的区间字符串，返回中值
  function parseMid(str) {
    const nums = String(str).match(/[\d.]+/g);
    if (!nums || nums.length === 0) return null;
    if (nums.length === 1) return parseFloat(nums[0]);
    return (parseFloat(nums[0]) + parseFloat(nums[1])) / 2;
  }

  function renderScatterChart() {
    const chart = document.getElementById("scatter-chart");
    if (!chart) return;
    const all = getAllProcesses();

    const W = Math.max(chart.clientWidth, 480);
    const H = 460;
    const padL = 64, padR = 30, padT = 26, padB = 46; // 绘图区边距

    // 坐标系：x = 单件成本中值（对数轴 ¥5–300），y = 良率中值（80–98%）
    const COST_MIN = 5, COST_MAX = 300, Y_MIN = 80, Y_MAX = 98;
    const lgMin = Math.log10(COST_MIN), lgMax = Math.log10(COST_MAX);
    const px = (cost) => padL + ((Math.log10(cost) - lgMin) / (lgMax - lgMin)) * (W - padL - padR);
    const py = (y) => padT + (1 - (y - Y_MIN) / (Y_MAX - Y_MIN)) * (H - padT - padB);

    // 象限分界：成本 ¥50、良率 91%
    const SPLIT_COST = 50, SPLIT_YIELD = 91;
    const sx = px(SPLIT_COST), sy = py(SPLIT_YIELD);

    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("width", W);
    svg.setAttribute("height", H);
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

    // ---- 背景象限 ----
    const quads = [
      { x: padL, y: padT, w: sx - padL, h: sy - padT, fill: "rgba(22,163,74,0.06)" },
      { x: sx, y: padT, w: W - padR - sx, h: sy - padT, fill: "rgba(37,99,235,0.05)" },
      { x: padL, y: sy, w: sx - padL, h: H - padB - sy, fill: "rgba(148,163,184,0.05)" },
      { x: sx, y: sy, w: W - padR - sx, h: H - padB - sy, fill: "rgba(220,38,38,0.05)" },
    ];
    quads.forEach((q) => {
      const r = document.createElementNS(NS, "rect");
      r.setAttribute("x", q.x); r.setAttribute("y", q.y);
      r.setAttribute("width", Math.max(q.w, 0)); r.setAttribute("height", Math.max(q.h, 0));
      r.setAttribute("fill", q.fill);
      svg.appendChild(r);
    });

    // 象限名称（放在四角，避开数据点密集区）
    const quadLabels = [
      { x: padL + 10, y: padT + 18, text: "性价比区 · 走量主力", color: "#16a34a", anchor: "start" },
      { x: W - padR - 10, y: padT + 18, text: "成熟溢价区 · 中高端", color: "#2563eb", anchor: "end" },
      { x: padL + 10, y: H - padB - 10, text: "待优化区", color: "#94a3b8", anchor: "start" },
      { x: W - padR - 10, y: H - padB - 10, text: "旗舰攻坚区", color: "#dc2626", anchor: "end" },
    ];
    quadLabels.forEach((q) => {
      const t = document.createElementNS(NS, "text");
      t.setAttribute("x", q.x); t.setAttribute("y", q.y);
      t.setAttribute("text-anchor", q.anchor);
      t.setAttribute("font-size", "12");
      t.setAttribute("font-weight", "700");
      t.setAttribute("fill", q.color);
      t.setAttribute("opacity", "0.75");
      t.textContent = q.text;
      svg.appendChild(t);
    });

    // ---- 网格线与刻度 ----
    const xTicks = [5, 10, 30, 100, 300];
    xTicks.forEach((v) => {
      const x = px(v);
      const line = document.createElementNS(NS, "line");
      line.setAttribute("x1", x); line.setAttribute("y1", padT);
      line.setAttribute("x2", x); line.setAttribute("y2", H - padB);
      line.setAttribute("stroke", "#e2e8f0");
      line.setAttribute("stroke-width", "1");
      svg.appendChild(line);
      const t = document.createElementNS(NS, "text");
      t.setAttribute("x", x); t.setAttribute("y", H - padB + 18);
      t.setAttribute("text-anchor", "middle");
      t.setAttribute("font-size", "11");
      t.setAttribute("fill", "#94a3b8");
      t.textContent = "¥" + v;
      svg.appendChild(t);
    });
    const yTicks = [80, 85, 90, 95, 98];
    yTicks.forEach((v) => {
      const y = py(v);
      const line = document.createElementNS(NS, "line");
      line.setAttribute("x1", padL); line.setAttribute("y1", y);
      line.setAttribute("x2", W - padR); line.setAttribute("y2", y);
      line.setAttribute("stroke", "#e2e8f0");
      line.setAttribute("stroke-width", "1");
      svg.appendChild(line);
      const t = document.createElementNS(NS, "text");
      t.setAttribute("x", padL - 8); t.setAttribute("y", y + 4);
      t.setAttribute("text-anchor", "end");
      t.setAttribute("font-size", "11");
      t.setAttribute("fill", "#94a3b8");
      t.textContent = v + "%";
      svg.appendChild(t);
    });

    // 象限分界虚线
    [
      { x1: sx, y1: padT, x2: sx, y2: H - padB },
      { x1: padL, y1: sy, x2: W - padR, y2: sy },
    ].forEach((l) => {
      const line = document.createElementNS(NS, "line");
      line.setAttribute("x1", l.x1); line.setAttribute("y1", l.y1);
      line.setAttribute("x2", l.x2); line.setAttribute("y2", l.y2);
      line.setAttribute("stroke", "#94a3b8");
      line.setAttribute("stroke-width", "1.5");
      line.setAttribute("stroke-dasharray", "6 5");
      svg.appendChild(line);
    });

    // ---- 数据点 ----
    const pts = all
      .map((p) => {
        const cost = parseMid(p.overview.costRange);
        const yld = parseMid(p.overview.yieldRange);
        if (cost == null || yld == null) return null;
        return {
          id: p.id,
          label: p.shortName,
          color: p.category === "金属中框" ? "#2563eb" : p.category === "MDA中框" ? "#8b5cf6" : p.category === "三件式" ? "#06b6d4" : "#0891b2",
          dx: px(cost),
          dy: py(yld),
        };
      })
      .filter(Boolean);

    // 标签盒子（初始放在数据点右侧，靠右则放左侧）
    const boxes = pts.map((p) => {
      const w = p.label.length * 13 + 24;
      const h = 24;
      let x = p.dx + 10;
      if (x + w > W - padR) x = p.dx - 10 - w;
      let y = p.dy - h / 2;
      return { ...p, w, h, x, y, ox: x, oy: y };
    });

    // 碰撞消除：迭代推开重叠标签
    const clampBox = (b) => {
      b.x = Math.min(Math.max(b.x, padL + 2), W - padR - b.w);
      b.y = Math.min(Math.max(b.y, padT + 2), H - padB - b.h);
    };
    for (let iter = 0; iter < 300; iter++) {
      let moved = false;
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i], b = boxes[j];
          const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
          const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
          if (ox > 0 && oy > 0) {
            if (ox < oy) {
              const s = a.x < b.x ? 1 : -1;
              a.x -= (s * ox) / 2; b.x += (s * ox) / 2;
            } else {
              const s = a.y < b.y ? 1 : -1;
              a.y -= (s * oy) / 2; b.y += (s * oy) / 2;
            }
            moved = true;
          }
        }
      }
      boxes.forEach(clampBox);
      if (!moved) break;
    }

    // ---- 连接线（标签被推离数据点时）→ 圆点 → 标签 ----
    boxes.forEach((b) => {
      const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
      const dist = Math.hypot(cx - b.dx, cy - b.dy);
      if (dist > 16) {
        const line = document.createElementNS(NS, "line");
        line.setAttribute("x1", b.dx); line.setAttribute("y1", b.dy);
        line.setAttribute("x2", cx); line.setAttribute("y2", cy);
        line.setAttribute("stroke", b.color);
        line.setAttribute("stroke-width", "1");
        line.setAttribute("opacity", "0.45");
        svg.appendChild(line);
      }
      const dot = document.createElementNS(NS, "circle");
      dot.setAttribute("cx", b.dx); dot.setAttribute("cy", b.dy);
      dot.setAttribute("r", "6");
      dot.setAttribute("fill", b.color);
      dot.setAttribute("stroke", "white");
      dot.setAttribute("stroke-width", "2");
      svg.appendChild(dot);

      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", "svg-label");
      g.setAttribute("transform", `translate(${b.x},${b.y})`);
      g.style.cursor = "pointer";
      const rect = document.createElementNS(NS, "rect");
      rect.setAttribute("width", b.w); rect.setAttribute("height", b.h);
      rect.setAttribute("rx", "12");
      rect.setAttribute("fill", "white");
      rect.setAttribute("stroke", b.color);
      rect.setAttribute("stroke-width", "1.5");
      const text = document.createElementNS(NS, "text");
      text.setAttribute("x", b.w / 2); text.setAttribute("y", b.h / 2 + 4);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("font-size", "12");
      text.setAttribute("font-weight", "600");
      text.setAttribute("fill", b.color);
      text.textContent = b.label;
      g.appendChild(rect);
      g.appendChild(text);
      g.addEventListener("click", () => {
        currentProcessId = b.id;
        currentView = "detail";
        renderSidebar();
        renderContent();
      });
      svg.appendChild(g);
    });

    chart.innerHTML = "";
    chart.appendChild(svg);
  }

  // ============ 搜索 ============


  // ============ 工艺选型决策树 ============
  function renderDecisionTree() {
    const content = document.getElementById("content");
    const all = getAllProcesses();

    // 按价位段分组
    const tiers = [
      { name: "入门级（<¥50）", range: [1, 2], color: "#16a34a", bg: "rgba(22,163,74,.06)", desc: "itel / Spark / Smart 走量机型" },
      { name: "中端（¥50-150）", range: [2, 3], color: "#2563eb", bg: "rgba(37,99,235,.06)", desc: "POVA / Camon / HOT / NOTE 系列" },
      { name: "中高端（¥150-300）", range: [3, 4], color: "#d97706", bg: "rgba(217,119,6,.06)", desc: "Camon Premier / NOTE Ultra" },
      { name: "旗舰（>¥300）", range: [4, 5], color: "#dc2626", bg: "rgba(220,38,38,.06)", desc: "Phantom / Zero 系列" },
    ];

    content.innerHTML = `
      <div class="detail-card">
        <div class="detail-header" style="background:linear-gradient(135deg,#fef3c7 0%,#fde68a 100%);">
          <div class="breadcrumb">
            <span>知识宝典</span>
            <span class="sep">/</span>
            <span class="badge" style="background:rgba(217,119,6,.12);color:#d97706;">决策树</span>
          </div>
          <div class="detail-title">🧭 工艺选型决策树</div>
          <div class="detail-tagline">按价位段给方案组合</div>
          <div class="detail-summary">根据目标价位段，快速匹配推荐的中框 + 电池盖工艺组合方案。</div>
        </div>

        <div class="detail-body">
          ${tiers.map(tier => {
            const frameCandidates = all.filter(p => (p.category === "金属中框" || p.category === "MDA中框" || p.category === "三件式") && p.overview.costLevel >= tier.range[0] && p.overview.costLevel <= tier.range[1]);
            const backCandidates = all.filter(p => p.category === "电池盖" && p.overview.costLevel >= tier.range[0] && p.overview.costLevel <= tier.range[1]);

            return `
              <div class="decision-tier" style="background:${tier.bg};border-left:4px solid ${tier.color};border-radius:var(--radius-md);padding:20px;margin-bottom:20px;">
                <div class="decision-tier-header">
                  <span class="decision-tier-name" style="color:${tier.color};">${tier.name}</span>
                  <span class="decision-tier-desc">${tier.desc}</span>
                </div>
                <div class="decision-grid">
                  <div class="decision-col">
                    <div class="decision-col-title">中框方案</div>
                    ${frameCandidates.length > 0 ? frameCandidates.map(p => `
                      <div class="decision-card" data-id="${p.id}">
                        <div class="dc-name">${p.shortName}</div>
                        <div class="dc-cost">成本：${p.overview.costRange}</div>
                        <div class="dc-yield">良率：${p.overview.yieldRange}</div>
                      </div>
                    `).join("") : '<div class="decision-empty">暂无匹配方案</div>'}
                  </div>
                  <div class="decision-col">
                    <div class="decision-col-title">电池盖方案</div>
                    ${backCandidates.length > 0 ? backCandidates.map(p => `
                      <div class="decision-card" data-id="${p.id}">
                        <div class="dc-name">${p.shortName}</div>
                        <div class="dc-cost">成本：${p.overview.costRange}</div>
                        <div class="dc-yield">良率：${p.overview.yieldRange}</div>
                      </div>
                    `).join("") : '<div class="decision-empty">暂无匹配方案</div>'}
                  </div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
      <div style="text-align:center;color:#94a3b8;font-size:11px;padding:10px;">
        数据来源：公开行业资料整理 · 仅作学习参考
      </div>
    `;

    // 绑定点击工艺卡片 → 跳转详情
    content.querySelectorAll(".decision-card").forEach(card => {
      card.addEventListener("click", () => {
        currentProcessId = card.dataset.id;
        currentView = "detail";
        renderSidebar();
        renderContent();
      });
    });
  }

  // ============ 供应商能力矩阵 ============
  function renderSupplierMatrix() {
    const content = document.getElementById("content");
    if (typeof VENDORS === "undefined") {
      content.innerHTML = '<div class="empty"><div class="empty-icon">📭</div><div class="empty-text">供应商数据未加载</div></div>';
      return;
    }

    // 收集所有供应商和工艺类型
    const vendorMap = {};
    const processTypes = new Set();

    VENDORS.forEach(g => {
      g.materials.forEach(m => {
        processTypes.add(m.name);
        m.vendors.forEach(v => {
          if (!vendorMap[v.name]) {
            vendorMap[v.name] = new Set();
          }
          vendorMap[v.name].add(m.name);
        });
      });
    });

    const vendors = Object.keys(vendorMap).sort();
    const processes = Array.from(processTypes).sort();

    // 取前 18 家供应商（按覆盖工艺数排序）
    const topVendors = vendors
      .map(v => ({ name: v, count: vendorMap[v].size }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 18)
      .map(v => v.name);

    // 取前 8 类工艺
    const topProcesses = processes.slice(0, 8);

    content.innerHTML = `
      <div class="detail-card">
        <div class="detail-header" style="background:linear-gradient(135deg,#ede9fe 0%,#ddd6fe 100%);">
          <div class="breadcrumb">
            <span>知识宝典</span>
            <span class="sep">/</span>
            <span class="badge" style="background:rgba(124,58,237,.12);color:#7c3aed;">能力矩阵</span>
          </div>
          <div class="detail-title"> 供应商能力矩阵</div>
          <div class="detail-tagline">18 家 × 8 类工艺覆盖</div>
          <div class="detail-summary">展示 Top 18 供应商在主要工艺类型上的覆盖情况，快速评估供应商能力广度。</div>
        </div>

        <div class="detail-body">
          <div class="matrix-table-wrap">
            <table class="matrix-table">
              <thead>
                <tr>
                  <th>供应商</th>
                  ${topProcesses.map(p => `<th>${p}</th>`).join("")}
                  <th>覆盖数</th>
                </tr>
              </thead>
              <tbody>
                ${topVendors.map(v => {
                  const covered = vendorMap[v];
                  const count = topProcesses.filter(p => covered.has(p)).length;
                  return `
                    <tr>
                      <td class="matrix-vendor">${v}</td>
                      ${topProcesses.map(p => covered.has(p) ? '<td class="matrix-yes">✓</td>' : '<td class="matrix-no">-</td>').join("")}
                      <td class="matrix-count">${count}/${topProcesses.length}</td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>

          <div class="matrix-legend">
            <span class="legend-item"><span class="legend-dot" style="background:#16a34a;"></span>覆盖</span>
            <span class="legend-item"><span class="legend-dot" style="background:#e2e8f0;"></span>未覆盖</span>
          </div>
        </div>
      </div>
      <div style="text-align:center;color:#94a3b8;font-size:11px;padding:10px;">
        数据来源：内部供应商清单 · 仅供内部学习参考
      </div>
    `;
  }

  // ============ 供应商名录视图 ============
  let vendorSearchKeyword = "";
  let vendorGroupFilter = "all";

  function renderVendors() {
    const content = document.getElementById("content");
    if (typeof VENDORS === "undefined") {
      content.innerHTML = '<div class="empty"><div class="empty-icon">📭</div><div class="empty-text">供应商数据未加载</div></div>';
      return;
    }

    const groups = VENDORS;
    const groupNames = ["all"].concat(groups.map(g => g.group));

    // 统计
    let totalMaterials = 0, totalVendors = 0;
    const vendorSet = new Set();
    groups.forEach(g => {
      g.materials.forEach(m => {
        totalMaterials++;
        m.vendors.forEach(v => {
          totalVendors++;
          vendorSet.add(v.name);
        });
      });
    });

    // 过滤
    let filtered = groups;
    if (vendorGroupFilter !== "all") {
      filtered = groups.filter(g => g.group === vendorGroupFilter);
    }
    if (vendorSearchKeyword) {
      const kw = vendorSearchKeyword.toLowerCase();
      filtered = filtered.map(g => {
        const mats = g.materials.filter(m =>
          m.name.toLowerCase().includes(kw) ||
          m.vendors.some(v =>
            v.name.toLowerCase().includes(kw) ||
            v.contact.toLowerCase().includes(kw) ||
            v.email.toLowerCase().includes(kw)
          )
        );
        return mats.length > 0 ? { ...g, materials: mats } : null;
      }).filter(Boolean);
    }

    content.innerHTML = `
      <div class="detail-card">
        <div class="detail-header" style="background:linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%);">
          <div class="breadcrumb">
            <span>知识宝典</span>
            <span class="sep">/</span>
            <span class="badge" style="background:rgba(22,163,74,.12);color:#16a34a;">供应商名录</span>
          </div>
          <div class="detail-title">🏭 供应商名录</div>
          <div class="detail-tagline">${groups.length} 大分组 · ${totalMaterials} 种物料 · ${vendorSet.size} 家供应商</div>
          <div class="detail-summary">传音手机结构件 AVL 供应商清单，按分组和物料分类展示，支持搜索供应商名称、联系人和邮箱。</div>
        </div>

        <div class="detail-body">
          <!-- 筛选栏 -->
          <div class="vendor-filter-bar">
            <div class="vendor-search">
              <span class="search-icon-inline">🔍</span>
              <input id="vendor-search-input" type="text" placeholder="搜索供应商、联系人、邮箱..." value="${vendorSearchKeyword}" />
            </div>
            <div class="vendor-group-tabs">
              ${groupNames.map(gid => {
                const label = gid === "all" ? "全部" : gid;
                const cnt = gid === "all" ? groups.reduce((n,g)=>n+g.materials.length,0) : (groups.find(g=>g.group===gid)||{materials:[]}).materials.length;
                return `<button class="vg-tab ${vendorGroupFilter===gid?'active':''}" data-group="${gid}">${label} (${cnt})</button>`;
              }).join("")}
            </div>
          </div>

          <!-- 供应商列表 -->
          <div class="vendor-groups">
            ${filtered.map(g => `
              <div class="vendor-group-section">
                <div class="vendor-group-title">
                  <span class="vg-icon">${g.group === '形态组' ? '🔲' : g.group === '外观组' ? '🎨' : g.group === '小件组' ? '🔩' : g.group === '冲压件' ? '⚙️' : '🔧'}</span>
                  ${g.group}
                  <span class="vg-count">${g.materials.length} 种物料</span>
                </div>
                ${g.materials.map(m => `
                  <div class="vendor-material">
                    <div class="vm-title">${m.name}</div>
                    <table class="vendor-table">
                      <thead>
                        <tr>
                          <th>厂商代码</th>
                          <th>供应商</th>
                          <th>联系人</th>
                          <th>电话</th>
                          <th>邮箱</th>
                          <th>商务备注</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${m.vendors.map(v => `
                          <tr>
                            <td class="vt-code">${v.code}</td>
                            <td class="vt-name">${v.name}</td>
                            <td>${v.contact}</td>
                            <td><a href="tel:${v.phone}" class="vt-phone">${v.phone}</a></td>
                            <td><a href="mailto:${v.email}" class="vt-email">${v.email}</a></td>
                            <td class="vt-note">${v.note}</td>
                          </tr>
                        `).join("")}
                      </tbody>
                    </table>
                  </div>
                `).join("")}
              </div>
            `).join("")}
          </div>

          ${filtered.length === 0 ? '<div class="empty-hint" style="margin-top:20px;">没有匹配的供应商</div>' : ''}
        </div>
      </div>
      <div style="text-align:center;color:#94a3b8;font-size:11px;padding:10px;">
        数据来源：内部供应商清单 · 仅供内部学习参考
      </div>
    `;

    // 绑定搜索
    const searchInput = content.querySelector("#vendor-search-input");
    let timer;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        vendorSearchKeyword = e.target.value.trim();
        renderVendors();
      }, 200);
    });

    // 绑定分组切换
    content.querySelectorAll(".vg-tab").forEach(btn => {
      btn.addEventListener("click", (e) => {
        vendorGroupFilter = e.currentTarget.dataset.group;
        renderVendors();
      });
    });
  }

  function setupSearch() {
    const input = document.getElementById("search-input");
    let timer;
    input.addEventListener("input", (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        searchKeyword = e.target.value.trim();
        renderSidebar();
      }, 200);
    });
  }

  // ============ 启动 ============
  document.addEventListener("DOMContentLoaded", () => {
    renderSidebar();
    renderContent();
    setupSearch();
  });
})();
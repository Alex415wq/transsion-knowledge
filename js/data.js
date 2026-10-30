// 传音手机结构件知识宝典 - 数据
// 数据来源：公开行业资料整理（IDC、CPCA、行业研报、供应商官网、年报等）
// 信息仅作学习参考，具体项目以内部数据为准。

const PROCESSES = [
  {
    id: "cnc-anodize",
    category: "金属中框",
    subCategory: "铝合金全C",
    categoryColor: "#2563eb",
    name: "铝合金CNC一体中框 + 阳极氧化",
    shortName: "铝合金CNC",
    tagline: "当前中高端手机金属中框的绝对主流方案",
    summary:
      "采用 6061 / 7075 铝合金板材或型材，通过 CNC 精密铣削加工一体成型，再经喷砂、阳极氧化、染色、封孔等表面处理，形成强度高、手感细腻的金属中框。是传音 TECNO Camon / Phantom 系列中高端机型的主流方案。",
    image: "assets/images/cnc-anodize.png",
    overview: {
      costLevel: 4,          // 相对成本等级 1-5（5 最高）
      costLabel: "高",
      costRange: "¥60–120",  // 单件成本参考（元）
      yieldRange: "90–95%",  // 典型综合良率
      yieldLevel: 4,         // 良率等级 1-5（5 最好）
      positioning: "中高端主流",
    },
    flow: [
      { step: 1, name: "原材料备料", desc: "6061/7075 铝板或铝挤型材" },
      { step: 2, name: "粗加工 CNC", desc: "粗铣去除余量，预留 0.3mm" },
      { step: 3, name: "去应力退火", desc: "消除切削应力，防止变形" },
      { step: 4, name: "精加工 CNC", desc: "真空吸盘夹持，精铣至 ±0.05mm" },
      { step: 5, name: "喷砂 / 拉丝", desc: "形成均匀哑光表面" },
      { step: 6, name: "阳极氧化", desc: "硫酸法，膜厚 10–15μm" },
      { step: 7, name: "染色 / 封孔", desc: "着色后镍盐封孔，提高耐蚀" },
      { step: 8, name: "镭雕 / 终检", desc: "LOGO 雕刻、外观与尺寸全检" },
    ],
    upstream: {
      materials: [
        "6061-T6 铝合金板 / 型材（南南铝、南山铝业）",
        "7075 高强度铝合金（高端旗舰）",
        "CNC 加工中心（DMG、马扎克、北京精雕）",
      ],
      status:
        "原材料端价格随 LME 铝价波动，2023 年 LME 铝价大幅波动导致下游阳极氧化报价 ±12–18%；高端 7075 铝仍依赖海外品牌。国内铝合金挤压与精雕设备国产化率持续提升。",
    },
    downstream: {
      industries: ["智能手机品牌商（OEM/ODM）", "折叠屏铰链厂商"],
      status:
        "5G 与无线充电推动一体化金属中框回归，并向钛合金、不锈钢上探；同时折叠屏带动异形中框和铰链结构件需求。金属中框由'可选项'重回旗舰必选。",
    },
    suppliers: [
      { name: "伯恩光学", role: "金属中框 + 玻璃盖板 + 折叠中框", note: "传音2024战略合作伙伴" },
      { name: "长盈精密", role: "CNC + 阳极氧化全制程", note: "全制程垂直整合，年产数亿件" },
      { name: "领益智造", role: "金属外观件代工", note: "深圳/东莞产能" },
      { name: "捷荣技术", role: "精密结构件", note: "重庆基地就近配套 OPPO/传音" },
    ],
    cost: [
      { item: "CNC 加工工时", pct: 45, color: "#2563eb" },
      { item: "原材料 (6061 铝)", pct: 18, color: "#60a5fa" },
      { item: "阳极氧化 + 喷砂", pct: 18, color: "#93c5fd" },
      { item: "检测 / 包装", pct: 12, color: "#bfdbfe" },
      { item: "模具 / 夹具摊销", pct: 7, color: "#dbeafe" },
    ],
    models: [
      { brand: "TECNO", name: "CAMON 20 Premier 5G", note: "伯恩光学供应" },
      { brand: "TECNO", name: "Phantom V Flip / Flip2", note: "折叠屏中框" },
      { brand: "Infinix", name: "NOTE 60 Ultra", note: "宾尼法利纳设计，铝合金中框" },
      { brand: "Infinix", name: "Zero Flip", note: "折叠屏中框" },
    ],
    advantages: ["强度高、散热好", "金属质感强", "支持无线充电友好改造", "可做超薄壁（1.2mm）"],
    challenges: ["CNC 加工工时长、成本高", "天线净空需开断点", "深色染色易褪色"],
    risks: [
      {
        risk: "铝价波动直接挤压毛利",
        detail: "铝材约占单件成本 18%，LME 铝价大幅波动时行业报价联动 ±12–18%，小批量多色订单受影响更明显。",
        counter: "与上游签订铝板长协 / 浮动计价联动条款；淡季锁价备料，套保对冲金属价格波动。",
      },
      {
        risk: "CNC 高工时造成交期与产能瓶颈",
        detail: "CNC 工时占成本 45%，旺季机台稼动率不足会拖累整机交付；多机型小批量切换损失稼动。",
        counter: "推进柔性自动化产线（机械手自动上下料 + 在线检测），标准件合并编程，提升换线效率。",
      },
      {
        risk: "染色色差与封孔批量性不良",
        detail: "深色（尤其哑黑/古铜）阳极染色批次色差难控，封孔不全会导致盐雾/汗渍腐蚀失效，属于高发客诉。",
        counter: "染液浓度/槽温数字化监控 + 首件色差仪管控，关键批留样；封孔工序纳入抽检加严项。",
      },
      {
        risk: "产品路线被两端挤压",
        detail: "旗舰向钛合金上探、入门级回落到注塑/压铸，铝合金 CNC 中框长期面临被替代的量能风险。",
        counter: "向高光倒角、异形曲面中框等差异化形态升级，绑定中高端旗舰项目，避免陷入低端价格战。",
      },
    ],
    trends: [
      {
        title: "减 CNC 化复合工艺",
        desc: "压铸/型材 + 少量 CNC 精修的复合路线持续下探成本，单件工时从 60 分钟级降至 20 分钟级，中端机型优先采用。",
        horizon: "1–3 年",
      },
      {
        title: "钛合金 CNC 下放",
        desc: "Apple 引领钛金属中框后国产供应链加速成熟，钛材价格与刀具方案持续优化，将从旗舰向中高端下探。",
        horizon: "2–4 年",
      },
      {
        title: "再生铝与低碳阳极",
        desc: "ESG 压力下再生铝使用比例提升；无铬钝化、低能耗阳极工艺成为供应链准入新门槛。",
        horizon: "3–5 年",
      },
      {
        title: "AI 视觉质检 + 黑灯产线",
        desc: "CNC 柔性线配合 AI 外观/尺寸检测，人均产出成倍提升，中框厂向少人化智能工厂演进。",
        horizon: "2–3 年",
      },
    ],
  },

  {
    id: "die-cast",
    category: "金属中框",
    subCategory: "铝合金一体压铸",
    categoryColor: "#2563eb",
    name: "锌 / 铝合金压铸 + CNC精修",
    shortName: "压铸中框",
    tagline: "中端机型兼顾成本与结构强度的折中方案",
    summary:
      "通过高压将熔融铝/锌合金压入精密模具一次成型，得到接近成品形态的中框毛坯，再经少量 CNC 精修与表面处理。相比纯 CNC，工时大幅缩短，单件成本可下降 30–60%。",
    image: "assets/images/die-cast.png",
    overview: {
      costLevel: 2,
      costLabel: "中",
      costRange: "¥30–60",
      yieldRange: "88–93%",
      yieldLevel: 3,
      positioning: "中端主力",
    },
    flow: [
      { step: 1, name: "模具设计制造", desc: "热流道 + 温控系统" },
      { step: 2, name: "熔炼 / 压铸", desc: "650–700℃ 铝液高速压入" },
      { step: 3, name: "切边 / 去毛刺", desc: "去除水口与披缝" },
      { step: 4, name: "CNC 精修", desc: "对装配面、按键孔精加工" },
      { step: 5, name: "喷砂 / 抛光", desc: "去除压铸纹理" },
      { step: 6, name: "阳极 / 喷涂", desc: "决定最终外观" },
      { step: 7, name: "终检 / 包装", desc: "CMM + AQL 抽检" },
    ],
    upstream: {
      materials: ["ADC12 / A380 铝合金锭", "锌合金 Zamak-3/5", "热作模具钢（H13）"],
      status:
        "压铸设备国产化率高，力劲、海天、伊之密占据主导；铝锭价格波动直接影响成本。模具寿命约 5–10 万模次，是固定投入的主要构成。",
    },
    downstream: {
      industries: ["智能手机", "智能穿戴", "VR/AR 设备", "新能源汽车结构件"],
      status:
        "高致性压铸 + 半固态压铸向手机中框渗透，结合 CNC 精修可兼顾效率与精度，传音 POVA 系列、SparX 系列中端机型大量采用。",
    },
    suppliers: [
      { name: "长盈精密", role: "镁铝合金压铸 + 塑胶一体成型", note: "传音金属中框主力" },
      { name: "劲胜智能（创世纪母公司）", role: "CNC + 压铸", note: "老牌华南精密代工" },
      { name: "领益智造", role: "压铸结构件", note: "垂直整合" },
    ],
    cost: [
      { item: "CNC 精修", pct: 30, color: "#2563eb" },
      { item: "压铸成型", pct: 25, color: "#60a5fa" },
      { item: "原材料 (铝合金)", pct: 20, color: "#93c5fd" },
      { item: "表面处理", pct: 15, color: "#bfdbfe" },
      { item: "模具摊销", pct: 10, color: "#dbeafe" },
    ],
    models: [
      { brand: "TECNO", name: "POVA 6 / 7 / 8 系列", note: "中端大电池机型" },
      { brand: "TECNO", name: "SPARK 20 / 30 系列", note: "中端市场主力" },
      { brand: "Infinix", name: "HOT 40 / 50 系列", note: "新兴市场走量" },
    ],
    advantages: ["成型效率高", "复杂结构一次成型", "成本低于全 CNC 30–60%"],
    challenges: ["致密度与气孔控制难", "薄壁精度受限", "需后段 CNC 配合"],
    risks: [
      {
        risk: "气孔 / 缩孔致强度外观双不良",
        detail: "压铸件内部气孔、缩孔比例偏高，薄壁件(＜1.0mm)成型尤其困难，气孔外露会导致镀层/喷漆起泡、漏检流出到客户端。",
        counter: "模具排气与模温机参数标准化，真空压铸/局部挤压工艺；X-Ray 抽检内孔密度，关键承力区改 CNC。",
      },
      {
        risk: "模具寿命与摊销压力",
        detail: "压铸模具受热冲击易热裂、冲蚀，一副模具寿命有限；项目量不够大时模具成本摊销高，单价失去竞争力。",
        counter: "模具钢选型与表面氮化处理延长寿命；多机型共用模具平台化设计摊薄成本。",
      },
      {
        risk: "环保与能耗合规成本上升",
        detail: "铝/锌熔炼能耗高，压铸车间粉尘与脱模剂废气治理投入大，环保政策趋严地区产能面临限产。",
        counter: "集中熔炼 + 余热回收，改用水性脱模剂；产能向环保达标园区集中。",
      },
      {
        risk: "表面处理结合力不稳定",
        detail: "压铸件表皮下气孔致密度差，阳极氧化/喷涂结合力波动，易出现局部发黑、膜层脱落不良。",
        counter: "前处理增加碱蚀/抛丸工序去除致密层，喷涂层做百格与盐雾加严测试。",
      },
    ],
    trends: [
      {
        title: "真空/半固态压铸",
        desc: "真空压铸与半固态压铸消除卷气，薄壁可做到 0.8mm 且可直接阳极氧化，逼近 CNC 表面品质。",
        horizon: "1–3 年",
      },
      {
        title: "一体化大压铸跨界渗透",
        desc: "汽车一体化压铸技术降本成熟后，向中框-中板一体件等大尺寸结构件渗透，减少组装工序。",
        horizon: "3–5 年",
      },
      {
        title: "压铸岛自动化",
        desc: "压铸机 + 机器人取件 + 模温数字化闭环，向无人化压铸岛演进，良率与 OEE 双提升。",
        horizon: "2–3 年",
      },
    ],
  },

  {
    id: "stainless-pvd",
    category: "金属中框",
    subCategory: "不锈钢",
    categoryColor: "#2563eb",
    name: "不锈钢中框 + PVD 镀膜",
    shortName: "不锈钢中框",
    tagline: "曾代表高端，现逐步被钛/铝合金取代",
    summary:
      "以 304/316 不锈钢为原料，通过锻造 + CNC + 抛光 + PVD 真空镀膜形成镜面或彩色金属质感中框。代表机型为 iPhone X/XS 系列；当前主要应用于部分旗舰或折叠屏副框。",
    image: "assets/images/stainless-pvd.png",
    overview: {
      costLevel: 4,
      costLabel: "高",
      costRange: "¥80–150",
      yieldRange: "85–90%",
      yieldLevel: 3,
      positioning: "历史旗舰 / 折叠副框",
    },
    flow: [
      { step: 1, name: "不锈钢锻造 / 冲压", desc: "形成中框毛坯" },
      { step: 2, name: "CNC 粗精加工", desc: "薄壁加工挑战大" },
      { step: 3, name: "抛光", desc: "镜面 / 哑光分级" },
      { step: 4, name: "PVD 真空镀膜", desc: "TiN / CrN 等陶瓷膜" },
      { step: 5, name: "镭雕 / 终检", desc: "LOGO 与尺寸" },
    ],
    upstream: {
      materials: ["304 / 316 不锈钢板", "PVD 靶材（Ti、Cr）", "CNC 设备"],
      status:
        "不锈钢冲压与锻造产业链成熟，但因重量与无线充电不友好，新机型使用率持续下滑。PVD 镀膜在手表、卫浴仍大量使用。",
    },
    downstream: {
      industries: ["历史旗舰机型", "折叠屏副框 / 铰链外露件", "智能手表"],
      status:
        "主流手机品牌已基本退出，转向铝合金或钛合金。但折叠屏铰链外露部分及部分高定机型仍有少量应用。",
    },
    suppliers: [
      { name: "伯恩光学", role: "金属中框与玻璃盖板", note: "折叠屏金属件主力" },
      { name: "长盈精密", role: "CNC 全制程", note: "具备不锈钢加工能力" },
      { name: "东山精密", role: "不锈钢精密件", note: "海外品牌主力" },
    ],
    cost: [
      { item: "CNC 加工", pct: 50, color: "#2563eb" },
      { item: "原材料 (不锈钢)", pct: 20, color: "#60a5fa" },
      { item: "PVD 镀膜", pct: 15, color: "#93c5fd" },
      { item: "抛光 / 表面", pct: 10, color: "#bfdbfe" },
      { item: "其他", pct: 5, color: "#dbeafe" },
    ],
    models: [
      { brand: "传音历史", name: "早期 Phantom 系列", note: "不锈钢中框时代代表" },
      { brand: "行业参考", name: "iPhone X/XS 系列", note: "不锈钢 PVD 工艺标杆" },
    ],
    advantages: ["镜面质感顶级", "硬度高", "抗腐蚀"],
    challenges: ["重量大", "影响无线充电", "CNC 工时长成本高"],
    risks: [
      {
        risk: "重量超标影响整机手感与规格",
        detail: "不锈钢密度约为铝的 2.7 倍，同尺寸中框更重，会推高整机重量、影响轻薄化卖点与电池容量配比。",
        counter: "采用中板减重镂空、与铝/钛分段拼接设计；评估整机重量预算后再定材质。",
      },
      {
        risk: "对无线充电与天线信号的屏蔽",
        detail: "不锈钢对电磁场有屏蔽效应，影响 5G 天线与无线充电线圈效率，传统上需要开断点或改用非导磁材料。",
        counter: "中框断点设计 + 导磁贴片方案；优先选用低导磁奥氏体不锈钢牌号。",
      },
      {
        risk: "加工硬化导致刀具损耗与良率波动",
        detail: "不锈钢切削加工硬化严重、导热差，刀具磨损快，亮面抛光(镜面)工序依赖人工、一致性差。",
        counter: "选用 CVD/PCD 刀具与高速切削参数；镜面抛工序导入机器人抛磨。",
      },
      {
        risk: "PVD 膜层磕碰掉膜与指纹残留",
        detail: "不锈钢亮面本身易留指纹，PVD 膜层耐磕碰性一般，边角受冲击时易出现掉膜白点。",
        counter: "PVD 前加喷砂/拉丝纹理减少指纹可见度，表面加 AF 防指纹涂层。",
      },
    ],
    trends: [
      {
        title: "低磁导率不锈钢牌号",
        desc: "新型低磁导率不锈钢兼顾强度与无线充电兼容性，逐步替代需开断点的传统 304/316 方案。",
        horizon: "2–4 年",
      },
      {
        title: "不锈钢 + 钛/铝复合结构",
        desc: "外观面用不锈钢保质感、内部用铝或钛减重的分段/包覆复合设计，成为旗舰减重的主流路径。",
        horizon: "2–3 年",
      },
      {
        title: "DLC 类金刚石镀膜升级",
        desc: "多弧 + 磁控复合 PVD、DLC 膜层提升硬度与耐磨，替代单一 TiN/CrN 颜色膜，丰富深黑等高端配色。",
        horizon: "2–3 年",
      },
    ],
  },

  {
    id: "titanium",
    category: "金属中框",
    subCategory: "钛合金",
    categoryColor: "#2563eb",
    name: "钛合金中框（CNC + 喷砂）",
    shortName: "钛合金中框",
    tagline: "当前旗舰机型的天花板材质",
    summary:
      "使用 TA2 / TC4 钛合金板材，通过 CNC 精密铣削加工成型，结合喷砂、PVD 或阳极氧化表面处理。强度是铝合金 2 倍以上、重量仅多 5–10%，成为 2024 年起高端旗舰的主流之选。",
    image: "assets/images/titanium.png",
    overview: {
      costLevel: 5,
      costLabel: "极高",
      costRange: "¥150–300",
      yieldRange: "80–90%",
      yieldLevel: 2,
      positioning: "旗舰天花板",
    },
    flow: [
      { step: 1, name: "钛合金坯料", desc: "TA2 / TC4 板材" },
      { step: 2, name: "CNC 粗加工", desc: "钛屑易粘刀，需特殊刀具" },
      { step: 3, name: "去应力退火", desc: "防止翘曲" },
      { step: 4, name: "CNC 精加工", desc: "薄壁 0.8mm 级别" },
      { step: 5, name: "喷砂", desc: "形成细腻哑光" },
      { step: 6, name: "PVD / 阳极氧化", desc: "上色与耐指纹" },
      { step: 7, name: "终检", desc: "外观 + CMM" },
    ],
    upstream: {
      materials: [
        "TA2 工业纯钛 / TC4 (Ti-6Al-4V) 合金",
        "钛合金专用 CNC 刀具（山特维克等）",
      ],
      status:
        "钛合金坯料约 25–40 万元/吨，是铝合金的 5–8 倍；刀具磨损快，加工工时是铝合金的 1.5–2 倍。但下游需求拉动下，国产钛合金供应能力快速提升。",
    },
    downstream: {
      industries: ["高端旗舰手机", "折叠屏铰链", "智能手表 Ultra 系列"],
      status:
        "苹果 Watch Ultra / iPhone 15 Pro、华为 Mate RS、小米 14 Pro 钛金属版等均采用钛合金中框。传音 Phantom 系列高端机型正在跟进。",
    },
    suppliers: [
      { name: "长盈精密", role: "钛合金 CNC", note: "已掌握钛合金 CNC 工艺" },
      { name: "伯恩光学", role: "金属中框主力", note: "高端机型配套" },
      { name: "领益智造", role: "钛合金精密结构件", note: "技术储备充分" },
    ],
    cost: [
      { item: "原材料 (钛合金)", pct: 35, color: "#2563eb" },
      { item: "CNC 加工", pct: 40, color: "#60a5fa" },
      { item: "表面处理", pct: 15, color: "#93c5fd" },
      { item: "刀具 / 模具", pct: 10, color: "#bfdbfe" },
    ],
    models: [
      { brand: "TECNO", name: "Phantom 系列高端机型", note: "钛金属版跟进中" },
      { brand: "行业参考", name: "iPhone 15 Pro / Max", note: "钛合金中框标杆" },
      { brand: "行业参考", name: "小米 14 Pro 钛金属", note: "国产品牌跟进" },
    ],
    advantages: ["强度高、重量轻", "耐腐蚀", "高级感突出"],
    challenges: ["原材料昂贵", "加工难度大", "表面处理成本高"],
    risks: [
      {
        risk: "原材料昂贵且价格波动大",
        detail: "海绵钛价格高、波动大，航空级钛材供应集中，采购周期长；钛合金中框单件成本可达铝合金的 2–3 倍。",
        counter: "长约锁量锁价，评估近净成形(锻造/3D 打印)减少材料浪费；项目早期做成本门禁评审。",
      },
      {
        risk: "难加工导致刀具与良率双重压力",
        detail: "钛合金导热差、化学活性高易粘刀，CNC 刀具损耗约为铝的 5–10 倍，加工变形与尺寸超差风险高。",
        counter: "低温微量润滑(MQL)、专用钛合金刀具与工艺参数库；关键尺寸在线测量闭环补偿。",
      },
      {
        risk: "表面处理批次色差",
        detail: "钛阳极氧化/喷涂色彩一致性控制难度高于铝，批量色差容易在客诉边缘反复。",
        counter: "电压/电流-颜色曲线数字化标定，同批次集中生产，色差仪全检。",
      },
      {
        risk: "供应商集中、产能爬坡慢",
        detail: "钛结构件产能集中在少数头部厂商，新品爬坡期良率低、交期长，容易拖累整机上市节奏。",
        counter: "双供应商备份 + 提前试产验证；与材料端协同解决切削瓶颈后再规模放量。",
      },
    ],
    trends: [
      {
        title: "低成本钛材与近净成形",
        desc: "民用级钛材放量 + 锻造/3D 打印近净成形大幅降低材料损耗与加工工时，推动钛合金从旗舰走向中高端。",
        horizon: "2–4 年",
      },
      {
        title: "钛-铝-碳纤维混构",
        desc: "钛保质感、铝做骨架、碳纤维做薄板的多元混构设计，兼顾强度、重量与成本，成为折叠屏中框新方向。",
        horizon: "3–5 年",
      },
      {
        title: "微弧氧化多彩化",
        desc: "微弧氧化(MAO)工艺在钛上实现耐磨多彩表面，替代传统阳极+喷涂，耐久性与色彩丰富度同步提升。",
        horizon: "2–3 年",
      },
      {
        title: "国产钛供应链成熟",
        desc: "国内钛材厂商扩大消费电子级产能与牌号，材料-加工一体化配套模式使整体成本加速下行。",
        horizon: "2–3 年",
      },
    ],
  },

  {
    id: "aluminum-spot-weld",
    category: "金属中框",
    subCategory: "铝合金点焊",
    categoryColor: "#2563eb",
    name: "铝合金点焊中框",
    shortName: "铝合金点焊",
    tagline: "多段铝合金通过点焊拼接的中框方案",
    summary: "将多段铝合金型材或板材通过电阻点焊工艺拼接成完整中框，兼顾强度与成本，适用于中大屏机型。",
    image: "assets/images/cnc-anodize.png",
    overview: { costLevel: 3, costLabel: "中", costRange: "¥40-80", yieldRange: "88-93%", yieldLevel: 3, positioning: "中端主力" },
    flow: [
      { step: 1, name: "铝型材备料", desc: "6061-T6 铝型材分段" },
      { step: 2, name: "CNC 粗加工", desc: "各段粗铣成型" },
      { step: 3, name: "点焊拼接", desc: "电阻点焊连接各段" },
      { step: 4, name: "焊后处理", desc: "去焊渣、打磨" },
      { step: 5, name: "CNC 精加工", desc: "精铣至公差" },
      { step: 6, name: "阳极氧化", desc: "表面处理" },
      { step: 7, name: "终检", desc: "外观+尺寸检测" },
    ],
    upstream: { materials: ["6061-T6 铝型材", "点焊设备"], status: "点焊工艺成熟，设备国产化率高" },
    downstream: { industries: ["中端智能机"], status: "适用于中大屏机型，成本介于全CNC与压铸之间" },
    suppliers: [{ name: "长盈精密", role: "铝合金点焊全制程", note: "中端机型主力" }],
    cost: [{ item: "CNC 加工", pct: 40, color: "#2563eb" }, { item: "点焊工序", pct: 25, color: "#60a5fa" }, { item: "原材料", pct: 20, color: "#93c5fd" }, { item: "表面处理", pct: 15, color: "#bfdbfe" }],
    models: [{ brand: "TECNO", name: "POVA 系列", note: "中端大屏机型" }],
    advantages: ["成本低于全CNC", "强度高于压铸", "适合大屏"],
    challenges: ["焊点一致性控制", "外观处理难度"],
    risks: [{ risk: "焊点强度不足", detail: "点焊参数漂移会导致焊点强度波动", counter: "焊接参数数字化监控+首件拉力测试" }],
    trends: [{ title: "激光焊替代点焊", desc: "激光焊精度更高、热影响区更小", horizon: "2-3年" }],
  },

  {
    id: "integrated-forging",
    category: "金属中框",
    subCategory: "一体化锻压",
    categoryColor: "#2563eb",
    name: "一体化锻压中框",
    shortName: "一体化锻压",
    tagline: "高端机型的高强度一体化方案",
    summary: "通过精密锻造工艺将铝合金一次锻压成型，再经CNC精修，实现高强度与轻薄化的平衡，适用于高端旗舰机型。",
    image: "assets/images/titanium.png",
    overview: { costLevel: 4, costLabel: "高", costRange: "¥80-150", yieldRange: "85-90%", yieldLevel: 3, positioning: "高端旗舰" },
    flow: [
      { step: 1, name: "铝坯料加热", desc: "加热至锻造温度" },
      { step: 2, name: "精密锻压", desc: "模具一次锻压成型" },
      { step: 3, name: "热处理", desc: "T6 固溶+时效" },
      { step: 4, name: "CNC 精加工", desc: "精铣至公差" },
      { step: 5, name: "表面处理", desc: "喷砂+阳极氧化" },
      { step: 6, name: "终检", desc: "外观+CMM检测" },
    ],
    upstream: { materials: ["7075 高强度铝合金", "精密锻压设备"], status: "锻压设备投入大，工艺门槛高" },
    downstream: { industries: ["高端旗舰手机"], status: "适用于对强度要求极高的旗舰机型" },
    suppliers: [{ name: "伯恩光学", role: "一体化锻压中框", note: "高端机型配套" }],
    cost: [{ item: "锻压工序", pct: 35, color: "#2563eb" }, { item: "CNC 加工", pct: 30, color: "#60a5fa" }, { item: "原材料", pct: 20, color: "#93c5fd" }, { item: "表面处理", pct: 15, color: "#bfdbfe" }],
    models: [{ brand: "TECNO", name: "Phantom 系列", note: "高端旗舰" }],
    advantages: ["强度极高", "一体化无焊点", "轻薄化潜力大"],
    challenges: ["模具成本高", "工艺难度大"],
    risks: [{ risk: "模具寿命有限", detail: "锻压模具受热冲击易损耗", counter: "模具钢选型优化+定期维护" }],
    trends: [{ title: "锻压+3D打印复合", desc: "复杂结构用3D打印+主体锻压", horizon: "3-5年" }],
  },

  {
    id: "plastic-injection",
    category: "MDA中框",
    subCategory: "塑胶注塑",
    categoryColor: "#2563eb",
    name: "塑胶注塑中框（含 NCVM 仿金属）",
    shortName: "塑胶中框",
    tagline: "入门与走量机型的成本最优解",
    summary:
      "采用 PC / PC+ABS / ABS 等工程塑料，通过注塑一次成型得到完整中框，再经喷涂或 NCVM 真空镀膜形成仿金属或彩色外观。是 itel / Spark 入门机的绝对主流。",
    image: "assets/images/plastic-injection.png",
    overview: {
      costLevel: 1,
      costLabel: "低",
      costRange: "¥8–20",
      yieldRange: "95–98%",
      yieldLevel: 5,
      positioning: "入门走量",
    },
    flow: [
      { step: 1, name: "塑料粒子备料", desc: "PC / ABS / PC+ABS 改性" },
      { step: 2, name: "模具制造", desc: "S136 / NAK80 模具钢" },
      { step: 3, name: "注塑成型", desc: "高温高压一次成型" },
      { step: 4, name: "修边 / 检验", desc: "去除水口与披锋" },
      { step: 5, name: "表面处理", desc: "喷涂 / NCVM 仿金属" },
      { step: 6, name: "镭雕 / 印刷", desc: "LOGO、纹理" },
      { step: 7, name: "终检 / 包装", desc: "外观 + 装配尺寸" },
    ],
    upstream: {
      materials: ["PC / PC+ABS 改性粒子（沙特 SABIC、奇美、LG）", "改性工程塑料"],
      status:
        "塑料粒子供应充分，价格相对稳定。注塑机国产化率高，海天、伊之密占据主导。塑胶中框技术门槛低，竞争激烈。",
    },
    downstream: {
      industries: ["入门级智能机", "智能穿戴", "功能机", "儿童机"],
      status:
        "传音面向非洲、南亚、拉丁美洲等新兴市场，入门机型对成本敏感，塑胶中框 + 喷涂方案仍是主力。同时塑胶外壳配合 NCVM 镀膜可低成本实现金属质感。",
    },
    suppliers: [
      { name: "捷荣技术", role: "塑胶精密结构件", note: "重庆基地配套传音" },
      { name: "领益智造", role: "塑胶精密结构件", note: "全制程" },
      { name: "合力泰", role: "塑胶件代工", note: "早期传音供应商" },
    ],
    cost: [
      { item: "原材料 (塑料)", pct: 30, color: "#2563eb" },
      { item: "注塑成型", pct: 25, color: "#60a5fa" },
      { item: "模具摊销", pct: 20, color: "#93c5fd" },
      { item: "表面处理", pct: 15, color: "#bfdbfe" },
      { item: "其他", pct: 10, color: "#e0e7ff" },
    ],
    models: [
      { brand: "itel", name: "itel S23 / P65 系列", note: "入门走量主力" },
      { brand: "TECNO", name: "SPARK 20 / Spark Go", note: "入门系列" },
      { brand: "Infinix", name: "Smart 8 系列", note: "低端入门" },
    ],
    advantages: ["成本最低", "成型效率高", "颜色/纹理自由度大"],
    challenges: ["强度低于金属", "导热差", "质感低于金属"],
    risks: [
      {
        risk: "结构强度不足引发整机品质客诉",
        detail: "大屏/大电池机型跌落时塑胶中框易开裂、断柱；长期使用应力松弛导致中框翘曲，挤压屏幕与电池。",
        counter: "局部金属嵌件补强(螺丝柱/卡扣位)，筋位拓扑优化；整机跌落 DOE 验证前置。",
      },
      {
        risk: "注塑外观缺陷拉低喷涂良率",
        detail: "缩水、流痕、熔接线等注塑缺陷高发，直接导致喷涂后外观不良，综合良率与返工成本承压。",
        counter: "模流分析前置 + 浇口/壁厚优化；注塑参数实时监控，缺陷自动检出分选。",
      },
      {
        risk: "原材料价格与再生料品质波动",
        detail: "PC/PA 原料价格随油价波动，再生料批次物性不稳定会导致脆断与色差，低价竞品扰乱市场。",
        counter: "与石化厂锁定一级料供应，再生料建立供应商认证与来料物性全检。",
      },
      {
        risk: "质感定位被金属方案下探挤压",
        detail: "金属/金属质感方案不断降价下探，塑胶中框在千元机以上价位逐步失去位置，长期量能收窄。",
        counter: "通过 NMT 纳米注塑、仿金属喷涂提升质感，锁定入门机与海外新兴市场走量盘。",
      },
    ],
    trends: [
      {
        title: "NMT 金属-塑胶一体成型",
        desc: "纳米注塑把金属边框与塑胶一体结合，外观是金属、内部是塑胶，兼顾质感与成本，入门机型广泛受益。",
        horizon: "1–3 年",
      },
      {
        title: "高模量工程塑胶替代",
        desc: "长玻纤增强 PA、液晶聚合物等高模量材料在中框结构件上部分替代金属，实现减重与免喷涂。",
        horizon: "3–5 年",
      },
      {
        title: "免喷涂高光注塑",
        desc: "高光无痕注塑 + 模内纹理一步成型，省去喷涂工序，降本减碳同时避免 VOC 排放压力。",
        horizon: "2–3 年",
      },
      {
        title: "再生/生物基塑胶",
        desc: "消费电子碳中和要求下，再生 PC、生物基材料的采用比例成为品牌商供应链准入加分项。",
        horizon: "3–5 年",
      },
    ],
  },

  {
    id: "pc-spray",
    category: "电池盖",
    subCategory: "复合板",
    categoryColor: "#0891b2",
    name: "PC 注塑 + 喷涂电池盖",
    shortName: "PC喷涂盖板",
    tagline: "入门到中端机型的主流电池盖方案",
    summary:
      "采用 PC（聚碳酸酯）或 PC+ABS 工程塑料注塑成电池盖毛坯，经过表面清洁、底漆、色漆、UV 固化、镭雕等工序实现丰富多彩的外观。是传音入门与中端机型的主要背盖方案。",
    image: "assets/images/pc-spray.png",
    overview: {
      costLevel: 1,
      costLabel: "低",
      costRange: "¥5–15",
      yieldRange: "95–97%",
      yieldLevel: 5,
      positioning: "入门主流",
    },
    flow: [
      { step: 1, name: "塑料粒子备料", desc: "PC / PC+ABS" },
      { step: 2, name: "注塑成型", desc: "高温注塑一次成型" },
      { step: 3, name: "表面清洁", desc: "等离子 / 除静电" },
      { step: 4, name: "底漆", desc: "提高附着力" },
      { step: 5, name: "色漆 / 金属漆", desc: "实现色彩与光泽" },
      { step: 6, name: "UV 固化", desc: "提高表面硬度" },
      { step: 7, name: "镭雕 / 印刷", desc: "LOGO、纹理" },
    ],
    upstream: {
      materials: ["PC / PC+ABS 粒子", "UV 涂料（卡秀、PPG、阿克苏诺贝尔）", "喷涂设备"],
      status:
        "喷涂产业链成熟，涂料端国产化率提升，UV 涂料在固化速度与环保性上持续优化。自动化喷涂线（如 6 轴机器人 + 旋杯）渗透率提升。",
    },
    downstream: {
      industries: ["入门/中端智能机", "智能家居外壳", "汽车内饰件"],
      status:
        "塑料外壳受 5G 与无线充电挑战，但因其成本优势与色彩灵活性，仍是中低端机型主力。传音面向新兴市场的中端机型大量采用。",
    },
    suppliers: [
      { name: "捷荣技术", role: "塑胶喷涂全制程", note: "塑胶件主力" },
      { name: "领益智造", role: "塑胶喷涂与组装", note: "一站式服务" },
      { name: "东莞劲胜", role: "塑胶件代工", note: "老牌华南代工" },
    ],
    cost: [
      { item: "喷涂工序", pct: 30, color: "#0891b2" },
      { item: "原材料 (PC)", pct: 25, color: "#22d3ee" },
      { item: "注塑成型", pct: 20, color: "#67e8f9" },
      { item: "模具摊销", pct: 15, color: "#a5f3fc" },
      { item: "其他", pct: 10, color: "#cffafe" },
    ],
    models: [
      { brand: "TECNO", name: "SPARK 20 / POP 系列", note: "中低端走量" },
      { brand: "itel", name: "itel A 系列", note: "功能机/入门机" },
      { brand: "Infinix", name: "Smart 7 / HOT 系列", note: "入门机背盖" },
    ],
    advantages: ["色彩与表面纹理灵活", "成本低", "成型效率高"],
    challenges: ["涂层耐磨耐刮一般", "塑料感强", "无线充电需改方案"],
    risks: [
      {
        risk: "涂层耐磨与耐候性不足",
        detail: "PC 底材偏软，喷涂面漆耐磨/耐刮等级有限，长期 UV 照射与汗渍环境下易黄变、失光，形成批量客诉。",
        counter: "面漆选高耐磨 UV 体系 + 加硬处理；按出货国气候做 QUV/人工汗老化验证。",
      },
      {
        risk: "喷涂 VOC 环保合规收紧",
        detail: "溶剂型涂料 VOC 排放受环保监管趋严，产线需配套废气治理设施，合规成本逐年上升。",
        counter: "切换水性/UV 固化涂料，优化上漆率(静电喷涂)减少涂料损耗与排放。",
      },
      {
        risk: "色差与橘皮等外观一致性",
        detail: "多色小批量喷涂易出现批次色差、橘皮、颗粒；浅色系对洁净度敏感，返工率偏高。",
        counter: "自动喷涂线 + 供漆系统恒温恒湿控制，色差仪与膜厚仪在线抽检。",
      },
      {
        risk: "低端定位被升级方案替代",
        detail: "NCVM、复合板材、IMD 等方案价格持续下行，纯 PC 喷涂后盖逐步被挤出中端机型，陷入同质化价格战。",
        counter: "叠加 NCVM/渐变配色/3D 纹理做差异化升级，守住入门与海外新兴市场基本盘。",
      },
    ],
    trends: [
      {
        title: "水性/UV 涂料替代",
        desc: "环保法规驱动溶剂型向水性、UV 固化体系切换，VOC 排放降低的同时耐候性提升。",
        horizon: "2–3 年",
      },
      {
        title: "自动喷涂 + AI 外观检测",
        desc: "六轴机器人仿形喷涂配合 AI 视觉检测，减少对人工经验的依赖，良率与一致性双升。",
        horizon: "1–2 年",
      },
      {
        title: "幻彩/随角变色涂料",
        desc: "珠光、干涉颜料与渐变喷涂工艺成熟，让入门机型用低成本实现炫彩差异化外观。",
        horizon: "2–3 年",
      },
    ],
  },

  {
    id: "ncvm",
    category: "电池盖",
    subCategory: "复合板",
    categoryColor: "#0891b2",
    name: "NCVM 真空镀膜（不导电镀）",
    shortName: "NCVM镀膜",
    tagline: "塑胶仿金属 / 玻璃外观的核心工艺",
    summary:
      "NCVM（Non-Conductive Vacuum Metallization）在塑胶或玻璃表面真空蒸镀极薄（<500nm）金属膜，再经 UV 漆面保护。膜层不导电，对天线信号与无线充电无干扰，是 5G 时代塑胶外壳回潮的关键工艺。",
    image: "assets/images/ncvm.png",
    overview: {
      costLevel: 2,
      costLabel: "中低",
      costRange: "¥15–30",
      yieldRange: "90–95%",
      yieldLevel: 4,
      positioning: "中端仿金属",
    },
    flow: [
      { step: 1, name: "基材前处理", desc: "注塑壳体 / 玻璃盖板清洁" },
      { step: 2, name: "底涂 (Base Coating)", desc: "提高膜层附着力" },
      { step: 3, name: "中涂 (Middle)", desc: "调色 / 平整" },
      { step: 4, name: "NCVM 真空蒸镀", desc: "靶金属（Sn 等）沉积" },
      { step: 5, name: "顶涂 (Top Coating)", desc: "UV 漆面保护" },
      { step: 6, name: "镭雕 / 印刷", desc: "LOGO、纹理" },
      { step: 7, name: "终检", desc: "外观 + 信号测试" },
    ],
    upstream: {
      materials: [
        "NCVM 真空镀膜设备（布勒莱宝、光驰科技、韩一真空、纳峰）",
        "UV 涂料",
        "靶材（锡、锌等）",
      ],
      status:
        "NCVM 设备国产化率提升，纳峰、三海科技等打破进口垄断；同时是当前塑胶+玻璃仿金属、玻璃高亮镀色的标准方案。",
    },
    downstream: {
      industries: ["智能手机中框与背盖", "智能手表", "无线充电产品", "智能家居外壳"],
      status:
        "5G 时代塑胶外壳回归，NCVM 因不导电特性成为标配；同时被广泛用于 2.5D/3D 玻璃盖板的色彩化处理。VIVO Y67、OPPO R11s、华为畅享 8e、联想 Moto 等均为经典案例。",
    },
    suppliers: [
      { name: "伯恩光学", role: "玻璃 + NCVM 镀膜", note: "传音战略合作伙伴" },
      { name: "长盈精密", role: "塑胶中框 + NCVM", note: "全制程" },
      { name: "光驰科技", role: "镀膜设备", note: "国际三大镀膜设备厂" },
      { name: "纳峰科技", role: "镀膜设备/服务", note: "国产代表" },
    ],
    cost: [
      { item: "NCVM 镀膜工序", pct: 35, color: "#0891b2" },
      { item: "涂装 (3 涂)", pct: 25, color: "#22d3ee" },
      { item: "基材 (塑胶/玻璃)", pct: 20, color: "#67e8f9" },
      { item: "镭雕 / 印刷", pct: 10, color: "#a5f3fc" },
      { item: "其他", pct: 10, color: "#cffafe" },
    ],
    // 真空镀膜培训 + 复合板总结 — 镀膜方式对比（来自汇诚/兆奕实测）
    comparisonTable: {
      title: "三种镀膜工艺对比（来源：汇诚/兆奕实测，传音内部培训）",
      columns: ["工艺", "供应商", "日产能", "直通率", "工艺成本", "推荐颜色", "优点", "缺点"],
      rows: [
        ["电子枪蒸发镀", "兆奕 / 汇诚", "3k–3.2k pcs/台", "兆奕 45–50%", "¥3–3.5", "金/银/蓝/紫等鲜艳色", "膜层厚、光泽好、质感强", "膜厚不均，中间厚边缘薄，色差大、效率低、价高"],
        ["磁控炉溅射镀", "兆奕", "3.5k pcs/台", "兆奕 50–55%", "¥2.5–3.5", "深色系（黑/深灰/靛蓝）", "膜厚较均匀、稳定性好", "可镀颜色单一、不够亮、质感一般"],
        ["磁控线溅射镀", "汇诚", "30k pcs/线", "汇诚 50–60%（ID5 约50%、vivo可达75%）", "¥2–2.5", "深色系为主，浅色需配油墨", "膜厚均匀、产能高，适合量产", "可镀颜色单一、颜色可调性差"],
      ],
    },
    // 真空镀膜培训PPT — 原理示意图
    principleImages: [
      { src: "assets/images/ncvm-principle-egun.png", caption: "e 形电子枪结构（磁场将电子束转弯 270°/180°/90°）" },
      { src: "assets/images/ncvm-principle-control.png", caption: "光控 vs 晶控：晶控精度高（1 埃），可实现闭环控制" },
      { src: "assets/images/ncvm-principle-thickness.png", caption: "三种厚度概念（几何/光学 nd/质量）+ 监控方法" },
      { src: "assets/images/ncvm-principle-spectrum.png", caption: "可见光光谱 — 颜色由 380–780nm 波长决定" },
      { src: "assets/images/ncvm-principle-reflectance.png", caption: "不同镀膜区域反射光谱对比（左/中/右区域）" },
    ],
    // V600 PPT 提取的真实产线照片
    productionImages: [
      { src: "assets/images/vacuum-chamber.jpeg", caption: "真空镀膜舱体（坩埚装靶后入舱镀膜）" },
      { src: "assets/images/target-loading.jpg", caption: "靶材装载作业" },
      { src: "assets/images/uv-curing.jpeg", caption: "UV 隧道炉固化" },
    ],
    models: [
      { brand: "TECNO", name: "Camon 20 / POVA 系列中框", note: "NCVM 仿金属" },
      { brand: "Infinix", name: "NOTE 系列玻璃后盖", note: "NCVM 上色" },
      { brand: "TECNO", name: "V600 全系（锖/灰白/墨绿/红）", note: "复合板磁控溅射镀（V600 项目）" },
      { brand: "行业参考", name: "OPPO R11s 星幕屏", note: "NCVM 经典案例" },
    ],
    advantages: ["金属质感 + 不导电", "适配无线充电/天线", "塑胶/玻璃通用"],
    challenges: ["膜层薄、易刮伤", "需 UV 保护", "镀膜工序长"],
    risks: [
      {
        risk: "膜层极薄、易刮伤脱落",
        detail: "NCVM 金属膜层为纳米级，耐刮性差，磕碰/钥匙刮擦易露底，镀后必须叠 UV 保护层，保护层不均匀会前功尽弃。",
        counter: "控制镀膜-UV 固化间隔，UV 膜厚与硬度设首件门槛；模拟包装运输振动磨耗测试。",
      },
      {
        risk: "深腔/大弧面均匀性差",
        detail: "磁控/电子枪镀膜对深腔、大弧面存在夹具遮蔽，膜厚不均导致颜色明暗不一致，异形件尤其明显。",
        counter: "仿形治具 + 公转自转行星架设计，先做膜厚均匀性 DOE 再放量。",
      },
      {
        risk: "镀膜路线选型失误",
        detail: "电子枪蒸发镀与磁控溅射在产能、成本、颜色表现上差异大（内部对比表实测），选错产线会在成本与品质上双重吃亏。",
        counter: "按目标颜色与订单量评估设备路线：大批量标准色用磁控线，多色小批量用电子枪炉。",
      },
      {
        risk: "设备重资产、稼动率压力",
        detail: "真空镀膜设备单台投入高，若订单波动稼动率不足，折旧摊销会显著推高单件成本。",
        counter: "多品牌共享镀膜产能、外发与自产弹性调配；争取稳定机型订单保障稼动。",
      },
    ],
    trends: [
      {
        title: "磁控溅射线替代电子枪",
        desc: "磁控溅射在产能、膜层致密度与颜色一致性上优于电子枪（对比表），新建产能向磁控线倾斜。",
        horizon: "1–3 年",
      },
      {
        title: "NCVM + 光学镀复合效果",
        desc: "NCVM 叠加 OPVD 光学膜实现镜面、渐变、炫彩等高级光学效果，让塑胶后盖逼近玻璃质感。",
        horizon: "2–4 年",
      },
      {
        title: "应用场景外溢",
        desc: "NCVM 技术向笔电 A 件、车载内饰、智能穿戴外观件外溢，摊薄设备投资、放大规模效应。",
        horizon: "3–5 年",
      },
      {
        title: "镀膜 + AG 蚀刻一体化",
        desc: "镀膜与 AG 防眩蚀刻、AF 防指纹在同一条线内联做，减少转运污染，缩短工序链。",
        horizon: "2–3 年",
      },
    ],
  },

  {
    id: "imd-iml",
    category: "电池盖",
    subCategory: "复合板",
    categoryColor: "#0891b2",
    name: "IMD / IML 模内装饰电池盖",
    shortName: "IMD/IML盖板",
    tagline: "图案耐久、效率高的中端背盖方案",
    summary:
      "IMD (In-Mold Decoration) / IML (In-Mold Labeling) 在注塑前将印刷好的装饰膜放入模具，注塑后膜与塑料一体成型，图案在塑料保护层下耐刮耐磨损。是中端机型背盖纹理的高效方案。",
    image: "assets/images/imd-iml.png",
    overview: {
      costLevel: 2,
      costLabel: "中低",
      costRange: "¥10–25",
      yieldRange: "92–96%",
      yieldLevel: 4,
      positioning: "中端纹理主力",
    },
    flow: [
      { step: 1, name: "PET 膜印刷", desc: "图案 / 纹理印刷" },
      { step: 2, name: "膜片成型", desc: "热压预成型" },
      { step: 3, name: "放入模具", desc: "自动送膜系统" },
      { step: 4, name: "注塑成型", desc: "塑料覆盖膜层" },
      { step: 5, name: "冲切 / 修边", desc: "得到成品背盖" },
      { step: 6, name: "表面硬化", desc: "可选 UV 加硬" },
    ],
    upstream: {
      materials: ["PET / PC 装饰膜", "注塑机（海天、伊之密）", "印刷油墨"],
      status:
        "IMD/IML 产业链成熟，国产化率高。力超精密、中塑新材料等是代表设备/材料供应商。中端机型背盖纹理的标准化方案。",
    },
    downstream: {
      industries: ["中端智能机背盖", "家电面板", "汽车内饰", "智能家居"],
      status:
        "IMD/IML 在中端机型背盖占据主导，可一次成型实现渐变、拉丝、菱格、皮革纹等丰富纹理，且图案耐久。传音 Camon 中端机型大量采用。",
    },
    suppliers: [
      { name: "力超精密", role: "IMD 自动化设备", note: "IMD 设备主力" },
      { name: "中塑新材料", role: "IMT 专用材料", note: "材料端配套" },
      { name: "群达塑胶", role: "IMD/IML 加工", note: "华南代工" },
    ],
    cost: [
      { item: "注塑成型", pct: 30, color: "#0891b2" },
      { item: "装饰膜印刷", pct: 25, color: "#22d3ee" },
      { item: "模具与设备", pct: 20, color: "#67e8f9" },
      { item: "表面硬化", pct: 15, color: "#a5f3fc" },
      { item: "其他", pct: 10, color: "#cffafe" },
    ],
    productionImages: [
      { src: "assets/images/silkscreen-logo.jpeg", caption: "丝印 LOGO（IMD 装饰膜替代了直接丝印）" },
      { src: "assets/images/uv-curing.jpeg", caption: "UV 固化隧道炉" },
    ],
    models: [
      { brand: "TECNO", name: "Camon 中端机型背盖", note: "纹理多样化" },
      { brand: "Infinix", name: "HOT / NOTE 系列", note: "皮革 / 拉丝纹理" },
    ],
    advantages: ["图案耐久不磨损", "一次成型效率高", "纹理丰富"],
    challenges: ["模具开发周期长", "颜色一致性控制", "膜片浪费"],
    risks: [
      {
        risk: "模具/纹理一旦固化难以更改",
        detail: "IMD/IML 纹理与颜色在模具与膜片上固化，后期想改色改纹理需重开模或重制膜片，开发周期长、响应慢。",
        counter: "项目前期用数字化打样快速验证纹理效果；膜片与模具做成平台化，后盖 ID 变更前做变更评审。",
      },
      {
        risk: "深拉伸/大 R 角开裂",
        detail: "IML 膜片在深拉伸、大 R 角区域易开裂或油墨拉伸变色，复杂 3D 造型成型受限。",
        counter: "选用高延展率 PC 膜 + 预拉伸成型；拉伸比超限部位改局部喷涂/转印。",
      },
      {
        risk: "膜片利用率与成本浪费",
        detail: "膜片排版损耗与成型裁切浪费普遍，利用率低时膜片成本占比被推高，拉大与喷涂方案的价差。",
        counter: "多穴排版优化 + 小尺寸共板设计；推行 IMT 转印减少基膜浪费。",
      },
      {
        risk: "注塑环节带来的外观缺陷",
        detail: "注塑冲膜、移位、缺胶会造成批量不良，且缺陷常在后工序才暴露，损失放大。",
        counter: "模内压力传感器监控 + 首末件留样比对，冲膜类缺陷用在线视觉检出。",
      },
    ],
    trends: [
      {
        title: "IMT 膜内转印替代 IML",
        desc: "IMT 转印把装饰层留在制品表面而剥离基膜，成本更低、纹理自由度更高，正在替代部分 IML 应用。",
        horizon: "1–3 年",
      },
      {
        title: "3D 曲面 IML 拉伸能力提升",
        desc: "高延展膜材与预拉伸工艺进步，让 IML 覆盖更大弧面与立体造型，向 3D 玻璃视觉效果靠拢。",
        horizon: "2–4 年",
      },
      {
        title: "装饰 + 功能膜集成",
        desc: "把天线、石墨烯散热层、NFC 线圈等功能层做进装饰膜内，一步成型减少后组装工序。",
        horizon: "3–5 年",
      },
      {
        title: "数字印刷/激光纹理",
        desc: "数字印刷与激光直写纹理替代传统制版，小批量多颜色开发周期从月级缩短到天级。",
        horizon: "2–3 年",
      },
    ],
  },

  {
    id: "glass-back",
    category: "电池盖",
    subCategory: "玻璃",
    categoryColor: "#0891b2",
    name: "2.5D / 3D 玻璃电池盖",
    shortName: "玻璃电池盖",
    tagline: "中高端机型背盖的主流方案",
    summary:
      "采用康宁大猩猩、肖特等高强度玻璃原片，经 CNC 切形、薄化、钢化、NCVM 镀膜、贴合等工序实现弧形玻璃背盖。视觉通透、支持无线充电、是旗舰机型背盖的主流方案。",
    image: "assets/images/glass-back.png",
    overview: {
      costLevel: 4,
      costLabel: "高",
      costRange: "¥40–90",
      yieldRange: "80–90%",
      yieldLevel: 2,
      positioning: "中高端主流",
    },
    flow: [
      { step: 1, name: "玻璃原片裁切", desc: "康宁 GG5/GG6/GG Victus" },
      { step: 2, name: "CNC 切形", desc: "外形 + 摄像头孔" },
      { step: 3, name: "薄化 (3D 必做)", desc: "化学蚀刻薄化至 0.5–0.7mm" },
      { step: 4, name: "钢化", desc: "化学钢化提高强度" },
      { step: 5, name: "NCVM / 印刷", desc: "色彩与 LOGO" },
      { step: 6, name: "贴合 / 装配", desc: "与中框组装" },
    ],
    upstream: {
      materials: [
        "康宁大猩猩 GG5/GG6/GG Victus",
        "肖特 / 旭硝子玻璃原片",
        "化学钢化液、NCVM 镀膜设备",
      ],
      status:
        "玻璃原片高度集中（康宁占主导），国产替代（彩虹、肖特国产线）正在突破；3D 玻璃加工以伯恩光学、蓝思科技为代表，是玻璃盖板行业的双寡头。",
    },
    downstream: {
      industries: ["智能手机背盖", "智能手表后盖", "车载玻璃", "AR/VR"],
      status:
        "玻璃盖板支持 5G 信号、无线充电，是中高端机型的标配。3D 曲面玻璃工艺难度高，是技术壁垒核心。传音 Phantom X 等已采用，Infinix Zero 系列也在跟进。",
    },
    suppliers: [
      { name: "伯恩光学", role: "玻璃盖板全球龙头", note: "传音2024战略合作伙伴" },
      { name: "蓝思科技", role: "玻璃盖板双寡头", note: "海外品牌主力" },
      { name: "华显光电", role: "玻璃盖板", note: "传音供应链" },
    ],
    cost: [
      { item: "玻璃原材料", pct: 35, color: "#0891b2" },
      { item: "CNC + 钢化加工", pct: 30, color: "#22d3ee" },
      { item: "NCVM 镀膜", pct: 15, color: "#67e8f9" },
      { item: "印刷 / 贴合", pct: 12, color: "#a5f3fc" },
      { item: "其他", pct: 8, color: "#cffafe" },
    ],
    models: [
      { brand: "TECNO", name: "Phantom X / X2 Pro", note: "玻璃背盖 + 金属中框" },
      { brand: "Infinix", name: "Zero 系列", note: "中高端曲面玻璃" },
      { brand: "TECNO", name: "CAMON 20 Premier", note: "伯恩光学供应" },
    ],
    advantages: ["视觉通透高级", "支持无线充电", "质感与触感好"],
    challenges: ["易碎", "CNC 良率挑战", "成本较高"],
    risks: [
      {
        risk: "跌落破损率高引发售后成本",
        detail: "玻璃后盖跌落破损是最高发客诉之一，碎屏/碎盖保险与售后更换成本高，还会影响品牌口碑。",
        counter: "化学强化深度与压应力(CS/DOL)指标管控，四角加厚设计；与保险/维修体系联动降低赔付成本。",
      },
      {
        risk: "热弯-CNC-抛光良率爬坡难",
        detail: "3D 热弯回弹、CNC 磨边崩边、抛光划伤叠加工序损耗，整体良率 80–90%，新品爬坡期更低。",
        counter: "热弯模具按回弹迭代修模，CNC/抛光段自动上下料减少人为划伤；良率按工序日跟踪改进。",
      },
      {
        risk: "重资产投入回收慢",
        detail: "热弯机、精雕机、抛光机单线投资大，订单波动时折旧压力明显，中小企业资金链承压。",
        counter: "优先借用头部盖板厂产能爬坡，自建线在订单稳定后逐步投放。",
      },
      {
        risk: "与复合板/陶瓷/钛的方案竞争",
        detail: "复合板以更低价格逼近玻璃观感，高端又被陶瓷、钛合金抢占，玻璃盖板定位区间受到双向挤压。",
        counter: "强化 AG 磨砂、微晶玻璃等差异化卖点，绑定摄影旗舰/折叠屏等对光学与硬度要求高的项目。",
      },
    ],
    trends: [
      {
        title: "微晶玻璃普及",
        desc: "微晶玻璃结合玻璃成形与陶瓷强度，抗跌落性能大幅提升，高端机型后盖与屏幕同步采用。",
        horizon: "2–4 年",
      },
      {
        title: "装饰一体化(无孔化)",
        desc: "直接在玻璃上做镀膜、AG、AF 一体化装饰，配合无孔设计与虚拟按键，减少结构开孔与贴合工序。",
        horizon: "3–5 年",
      },
      {
        title: "玻璃 + 素皮拼接",
        desc: "摄像头区玻璃 + 下半区素皮的双拼设计兼顾质感、手感和减重，成为中高端新流行语言。",
        horizon: "1–2 年",
      },
      {
        title: "可再生玻璃与减薄降本",
        desc: "回收玻璃原料与化学减薄工艺降低材料与能耗成本，玻璃盖板整体价格中枢缓慢下移。",
        horizon: "3–5 年",
      },
    ],
  },

  {
    id: "pc-pmma",
    category: "电池盖",
    subCategory: "复合板",
    categoryColor: "#0891b2",
    name: "PC + PMMA 复合板材（IMT）",
    shortName: "复合板材",
    tagline: "玻璃盖板的低成本替代方案",
    summary:
      "将 PMMA 与 PC 通过共挤形成 3D 复合板材，经高压热成型得到弧形背盖，再经表面硬化、纹理处理等实现低成本仿玻璃质感。是 5G 时代高性价比替代方案。",
    image: "assets/images/pc-pmma.png",
    overview: {
      costLevel: 2,
      costLabel: "中",
      costRange: "¥15–35",
      yieldRange: "90–95%",
      yieldLevel: 4,
      positioning: "玻璃平替（性价比）",
    },
    flow: [
      { step: 1, name: "复合板材共挤", desc: "PMMA+PC 双层共挤" },
      { step: 2, name: "膜片印刷 / IMT", desc: "膜上印刷纹理" },
      { step: 3, name: "高压热成型", desc: "3D 弧形成型" },
      { step: 4, name: "裁切 / 冲孔", desc: "外形 + 摄像头孔" },
      { step: 5, name: "表面硬化", desc: "提高耐磨耐刮" },
      { step: 6, name: "镭雕 / 终检", desc: "LOGO 与外观" },
    ],
    upstream: {
      materials: ["PC + PMMA 共挤板材（龙华光电、台湾奇美）", "IMT 膜", "热成型设备"],
      status:
        "复合板材是 3D 玻璃的低成本替代，国内材料厂已突破。龙华光电、新桥联、震宇模具等是核心供应商，传音 Camon 中端机型大量采用。",
    },
    downstream: {
      industries: ["中端智能机背盖", "智能家居外壳", "穿戴设备"],
      status:
        "5G + 无线充电趋势下，复合板材背盖是塑料外壳回归潮的重要分支。3D 弧度接近玻璃但成本仅 30–50%，是性价比之选。",
    },
    suppliers: [
      { name: "龙华光电", role: "PC+PMMA 板材", note: "板材端国产化" },
      { name: "新桥联", role: "高压复合盖板", note: "复合板成型龙头" },
      { name: "震宇模具", role: "IMT 工艺与材料", note: "材料工艺双布局" },
    ],
    cost: [
      { item: "复合板材原材料", pct: 30, color: "#0891b2" },
      { item: "高压成型", pct: 25, color: "#22d3ee" },
      { item: "印刷 / IMT", pct: 20, color: "#67e8f9" },
      { item: "表面硬化", pct: 15, color: "#a5f3fc" },
      { item: "其他", pct: 10, color: "#cffafe" },
    ],
    // V600 PPT 提取 — 复合板技术参数表
    sheetParams: {
      title: "复合板技术参数（来源：V600 手机后盖工艺介绍）",
      columns: ["评估项目", "测试方法", "单位", "数据"],
      rows: [
        ["厚度规格", "千分尺", "mm", "0.5（另有 0.65 / 0.8 / 1.0）"],
        ["比重", "ASTM D792", "g/cm³", "1.2"],
        ["PMMA 厚度", "膜厚仪", "μm", "45 ± 5"],
        ["全光线透过率", "ASTM D1003", "%", "≥ 90"],
        ["雾度", "—", "%", "＜ 0.5"],
        ["黄色指数", "ATSM D1925", "—", "＜ 1"],
        ["UV 透过率（360nm）", "ASTM G154", "%", "＜ 1"],
        ["UV 透过率（380nm）", "ASTM G154", "%", "＜ 25"],
        ["表面硬度（500g, PMMA 面）", "三菱铅笔划痕", "—", "HB"],
        ["润湿张力", "达因笔 Dyne pen", "mN/m", "≥ 34"],
        ["落球冲击", "112g 钢球", "cm", "＞ 60"],
        ["弯折", "间距 16mm / 速度 9", "°", "＞ 120 无断开"],
        ["煮沸测试", "80℃ / 30min", "—", "外观无异常"],
        ["拉伸强度", "ASTM D882", "MPa", "＞ 50"],
        ["介电常数", "IEC 60250", "—", "＞ 2.8"],
        ["体积绝缘", "IEC 60093", "Ω·cm", "＞ 10¹³"],
        ["表面绝缘", "IEC 60093", "Ω", "＞ 10¹⁵"],
      ],
    },
    // V600 PPT — 各工序良率（单工序 + 1*4 排版产出）
    processYields: {
      title: "V600 项目各工序良率（来源：V600 工艺介绍 / 单工序实测）",
      totalYield: "1*4 排版整体良率 ≈ 78%",
      columns: ["工序", "单工序良率", "主要不良"],
      rows: [
        ["丝印 LOGO", "98.5%", "肥油、锯齿、牙边、缺口"],
        ["UV 转印", "96.5%", "压印、印痕、滚困印、缺胶"],
        ["镀膜（磁控溅射）", "96%", "异色块、异色线、色差"],
        ["丝印盖底", "98%", "颗粒、杂质、异色块/线"],
        ["高压成型", "97%", "颗粒、鼓包、裂纹"],
        ["淋涂 AG", "96.5%", "颗粒、麻点、流痕"],
        ["CNC 切形", "97.5%", "过切、毛丝、尺寸 NG"],
      ],
    },
    // V600 四种颜色工艺叠层
    v600Colors: {
      title: "V600 电池盖 4 种颜色叠层工艺",
      columns: ["颜色", "叠层结构（由内到外）", "工艺路线"],
      rows: [
        ["锖色", "复合生板 → 丝印镜面银 LOGO → UV 转印 → 磁控溅射镀（锖色）→ 丝印盖底 → 淋涂哑光", "淋涂哑光 + 高压"],
        ["灰白", "复合生板 → 丝印 LOGO → UV 转印 → 磁控溅射镀（灰白）→ 丝印盖底 → 淋涂哑光", "淋涂哑光 + 高压"],
        ["墨绿", "复合生板 → 丝印 LOGO → UV 转印 → 磁控溅射镀（墨绿）→ 丝印盖底 → 淋涂哑光", "淋涂哑光 + 高压"],
        ["红色", "复合生板 → 丝印 LOGO → UV 转印 → 磁控溅射镀（红）→ 丝印盖底 → 淋涂哑光", "淋涂哑光 + 高压"],
      ],
    },
    // V600 PPT 提取的真实产线 + 成品照片
    productionImages: [
      { src: "assets/images/v600-black.png", caption: "V600 锖色成品" },
      { src: "assets/images/v600-silver.png", caption: "V600 灰白成品" },
      { src: "assets/images/v600-green.png", caption: "V600 墨绿成品" },
      { src: "assets/images/v600-red.png", caption: "V600 红色成品" },
      { src: "assets/images/v600-texture.png", caption: "V600 复合板 AG 纹理细节" },
      { src: "assets/images/silkscreen-logo.jpeg", caption: "丝印 LOGO 工序（聚酯网 380/420 目）" },
      { src: "assets/images/uv-curing.jpeg", caption: "UV 转印固化隧道炉" },
      { src: "assets/images/uv-rolling.png", caption: "UV 胶水刮平 / 滚压" },
      { src: "assets/images/cleanroom-ag.jpeg", caption: "淋涂 AG 喷淋硬化（55℃→60℃→65℃ 渐次加热 + UV）" },
      { src: "assets/images/high-pressure-red.jpeg", caption: "高压成型（380℃ 30s, 30→70kg 加压）" },
    ],
    models: [
      { brand: "TECNO", name: "V600（锖/灰白/墨绿/红）", note: "2024 项目 — 复合板+磁控溅射镀" },
      { brand: "TECNO", name: "Camon 中端系列", note: "成本最优解" },
      { brand: "Infinix", name: "NOTE 中端系列", note: "复合板弧形背盖" },
      { brand: "TECNO", name: "POVA 中端", note: "高性价比背盖" },
    ],
    advantages: ["成本仅为玻璃 30–50%", "3D 弧形外观接近玻璃", "不易碎"],
    challenges: ["表面硬度低于玻璃", "质感仍有差异", "图案选择有限"],
    risks: [
      {
        risk: "层间剥离与气泡",
        detail: "PC/PMMA 复合板贴合或 UV 转印层间结合力不足，在高温高湿与弯折处易分层、起泡，属批量性隐患。",
        counter: "贴合前等离子/电晕处理，粘合层厚度与固化能量标准化；做高温高湿与弯折疲劳验证。",
      },
      {
        risk: "高压成型良率波动",
        detail: "高压(热弯)成型对温度、压力、保压时间敏感，参数漂移会导致回弹变形与纹理拉伸，良率不稳定。",
        counter: "成型参数数字化配方管理 + 模温实时监控；首件尺寸 CMM 检测防漂移。",
      },
      {
        risk: "表面硬度与耐磨的天花板",
        detail: "复合板表面硬度(铅笔 HB 级)低于玻璃(5H+)，日常使用易产生划痕，拉低中高端机型的品质口碑。",
        counter: "淋涂/喷涂加硬涂层提升至 2–3H，配合 AF 防指纹涂层；向用户明示保护壳建议。",
      },
      {
        risk: "中端机型升级玻璃后的需求波动",
        detail: "一旦品牌把中端机型全面升级为玻璃盖板，复合板订单会快速收缩，产线稼动与投资回收受影响。",
        counter: "深耕 3D 复合板大曲率与光学镀效果做差异化，向穿戴、IoT、笔电上盖等新场景外溢。",
      },
    ],
    trends: [
      {
        title: "硬度逼近玻璃的加硬方案",
        desc: "高官能度 UV 加硬涂层与 SiO₂ 杂化涂层技术发展，复合板表面硬度向 3–5H 提升，缩小与玻璃差距。",
        horizon: "2–3 年",
      },
      {
        title: "光学镀 + 渐变叠层",
        desc: "在复合板上叠 NCVM/光学镀与多色渐变(如 V600 四色叠层工艺)，用板材成本做出玻璃级光泽。",
        horizon: "1–2 年",
      },
      {
        title: "大曲率 3D 复合板",
        desc: "高压成型与板材配方进步，复合板曲率向 3D 玻璃看齐，四曲面后盖也可用复合板实现。",
        horizon: "2–3 年",
      },
      {
        title: "场景外溢到穿戴与 IoT",
        desc: "复合板轻、耐摔、成本低的组合优势使其向智能手表表壳、耳机仓、智能家居面板等场景扩散。",
        horizon: "2–4 年",
      },
    ],
  },

  {
    id: "leather",
    category: "电池盖",
    subCategory: "素皮",
    categoryColor: "#0891b2",
    name: "素皮 / PU 皮革电池盖",
    shortName: "素皮电池盖",
    tagline: "中高端商务 / 旗舰质感方案",
    summary:
      "在塑胶或金属骨架上贴合 PU 皮革或素皮材质，通过压纹、缝合工艺形成高级皮质感。是商务机型与旗舰质感差异化方案，传音部分 Phantom 高端机型曾采用。",
    image: "assets/images/leather.png",
    overview: {
      costLevel: 3,
      costLabel: "中高",
      costRange: "¥30–60",
      yieldRange: "92–96%",
      yieldLevel: 4,
      positioning: "商务差异化",
    },
    flow: [
      { step: 1, name: "基材成型", desc: "塑胶骨架或金属骨架" },
      { step: 2, name: "皮革备料", desc: "PU / 素皮材质" },
      { step: 3, name: "贴合", desc: "热压或胶水贴合" },
      { step: 4, name: "压纹 / 缝合", desc: "仿缝线工艺" },
      { step: 5, name: "表面处理", desc: "耐磨涂层" },
      { step: 6, name: "终检", desc: "外观与贴合强度" },
    ],
    upstream: {
      materials: ["PU 皮革（禾欣、双象）", "素皮（部分采用植物纤维）", "贴合胶水"],
      status:
        "皮革贴合产业链成熟，环保型素皮成为新趋势（如华为 Mate RS、OPPO Find 系列）。传音在 Phantom 高端机型中已有应用。",
    },
    downstream: {
      industries: ["中高端商务机型", "旗舰差异化", "高端配件"],
      status:
        "皮革背盖代表商务质感差异化路线，但因成本与环保考量，'素皮'成为新趋势。传音面对的中东、东南亚市场对皮革质感接受度高。",
    },
    suppliers: [
      { name: "伯恩光学", role: "金属 + 皮革组合", note: "高端机型配套" },
      { name: "长盈精密", role: "金属 + 皮革组合", note: "复合工艺" },
      { name: "领益智造", role: "贴合组装", note: "复合方案" },
    ],
    cost: [
      { item: "皮革 / 素皮", pct: 30, color: "#0891b2" },
      { item: "基材", pct: 25, color: "#22d3ee" },
      { item: "贴合 / 压纹", pct: 20, color: "#67e8f9" },
      { item: "表面处理", pct: 15, color: "#a5f3fc" },
      { item: "其他", pct: 10, color: "#cffafe" },
    ],
    models: [
      { brand: "TECNO", name: "Phantom 高端商务版", note: "皮革质感差异化" },
      { brand: "行业参考", name: "华为 Mate RS / OPPO Find", note: "素皮旗舰代表" },
    ],
    advantages: ["高级质感突出", "商务定位差异化", "手感温润"],
    challenges: ["成本较高", "环保压力", "长期使用老化"],
    risks: [
      {
        risk: "耐磨耐污与长期老化",
        detail: "素皮长期使用易出现表面磨损、发亮包浆与边角起皮；汗渍、化妆品与深色衣物染色会造成污渍难清理。",
        counter: "选择高耐磨 PUR 涂层与耐污处理，边角做包边加强；老化与耐污测试按客诉场景加严。",
      },
      {
        risk: "批次手感与纹理不一致",
        detail: "素皮纹路、软硬度受基材批次与压纹工艺影响，不同批次手感差异会让用户体验与媒体评测感知不一致。",
        counter: "基材供应商认证 + 压纹参数固化，建立手感/色差标准样板对板验收。",
      },
      {
        risk: "环保法规与动物皮革争议",
        detail: "部分市场对动物皮革与含溶剂涂层有法规/道德审查压力，再生与生物基材料合规要求上升。",
        counter: "全面转向环保再生/PU 素皮，取得相关环保认证，规避动物源合规风险。",
      },
      {
        risk: "散热与无线充电叠厚",
        detail: "素皮导热差且厚度大，叠加散热膜与无线充电线圈后整机变厚，影响轻薄化卖点。",
        counter: "摄像头区域局部素皮 + 其余区域散热设计；控制素皮+泡棉总厚在预算内。",
      },
    ],
    trends: [
      {
        title: "环保再生素皮",
        desc: "PET 回收料、生物基 PU、再生纤维基材成为素皮主流，兼顾质感与 ESG 卖点，动物皮革彻底退出。",
        horizon: "1–3 年",
      },
      {
        title: "双拼拼接设计语言",
        desc: "素皮 + 玻璃/金属的拼接后盖成为中高端差异化标签，上半区玻璃显质感、下半区素皮重手感。",
        horizon: "1–2 年",
      },
      {
        title: "触感科技化",
        desc: "微纹理、亲肤涂层与随角变色的光效素皮开发，让后盖触感与观感成为可营销的产品卖点。",
        horizon: "2–4 年",
      },
      {
        title: "抗污纳米涂层",
        desc: "在素皮表面叠加纳米抗污/防水防油涂层，提升日常耐脏性，延长视觉效果寿命。",
        horizon: "2–3 年",
      },
    ],
  },
];

// ============= 内部学习资料 =============
const INTERNAL_DOCS = [
  {
    id: "doc-pdf-composite",
    type: "PDF",
    title: "复合板材光学镀着色技术总结",
    date: "2018-07-31",
    author: "TRANSSION HOLDINGS（传音控股）",
    source: "机密内部资料 — 由用户提供",
    summary: "复合板材（PC+PMMA）上光学镀膜着色的系统研究，涵盖磁控溅射镀、电子枪镀膜两种主流方案，从原理、工序、靶材、UV 胶配方到汇诚/兆奕实测对比。",
    pages: 22,
    file: "复合板材光学镀着色技术总结.pdf",
    relatedProcesses: ["ncvm", "pc-pmma", "imd-iml"],
    keyPoints: [
      "磁控溅射镀膜：电子在电场作用下撞击氩原子产生 Ar⁺，Ar⁺ 高速轰击阴极靶，溅射靶材沉积成膜",
      "汇诚磁控线采用 3 种靶材：铟锡合金（颜色调控）、氧化铌（高反/质感）、硅铝合金（保护层）",
      "电子轰击时间从常规 15s 增加到 30s 以提高镀层附着力",
      "电子枪蒸发镀：膜中心厚四周薄、易色差；适合金/银/蓝/紫等鲜艳色，红色必须靠油墨配合",
      "磁控线溅射镀产能 30k pcs/线（汇诚），直通率 50–60%，vivo 项目可达 75%",
    ],
    images: [
      { src: "assets/images/ncvm-principle-egun.png", caption: "e 形电子枪结构（PDF 第 2 章）" },
      { src: "assets/images/vacuum-chamber.jpeg", caption: "真空镀膜舱体（PDF 实拍图）" },
    ],
  },
  {
    id: "doc-ppt-vacuum",
    type: "PPT",
    title: "真空镀膜知识培训",
    date: "未注明（经典培训材料）",
    author: "TRANSSION HOLDINGS（传音控股）",
    source: "内部培训 — 由用户提供",
    summary: "真空镀膜的基础原理培训：电子枪结构、光控 vs 晶控、膜厚三种概念与监控方法、可见光光谱基础、镀膜反射率光谱分析。",
    pages: null,
    file: "真空镀膜知识培训.ppt",
    relatedProcesses: ["ncvm"],
    keyPoints: [
      "e 形电子枪通过磁场将电子束转弯 270°/180°/90°，10kV 加速 / 0–500V 抑制",
      "光控：直接控制 T/R 参数，膜厚控制精度较低；晶控：精度 1 埃，可闭环控制成膜速率，是工业主流",
      "厚度三种概念：几何厚度（物理）、光学厚度（nd）、质量厚度；监控方法：目视/光电极值/石英晶体振荡/光谱法",
      "可见光 380–780nm 决定人眼颜色，红色 625–740nm / 绿色 500–565nm / 蓝色 440–485nm",
      "不同镀膜区域的反射光谱对比，可用于评估膜厚均匀性",
    ],
    images: [
      { src: "assets/images/ncvm-principle-egun.png", caption: "e 形电子枪结构图（培训 PPT）" },
      { src: "assets/images/ncvm-principle-control.png", caption: "光控 vs 晶控（培训 PPT）" },
      { src: "assets/images/ncvm-principle-thickness.png", caption: "厚度三种概念与监控方法（培训 PPT）" },
      { src: "assets/images/ncvm-principle-spectrum.png", caption: "可见光光谱（培训 PPT）" },
      { src: "assets/images/ncvm-principle-reflectance.png", caption: "不同镀膜区域反射光谱（培训 PPT）" },
    ],
  },
  {
    id: "doc-pptx-v600",
    type: "PPTX",
    title: "V600 手机后盖工艺介绍",
    date: "2024-12-23",
    author: "李文洪（TECNO 项目工艺）",
    source: "项目内部资料 — 由用户提供",
    summary: "TECNO V600 电池盖完整技术文档：复合板技术参数、4 种颜色叠层工艺、各工序良率实测、设备参数、印刷网版规格。V600 是复合板+磁控溅射镀的典型量产案例。",
    pages: 22,
    file: "V600手机后盖工艺介绍(1) (1).pptx",
    relatedProcesses: ["pc-pmma", "ncvm"],
    keyPoints: [
      "复合板：0.5/0.65/0.8/1.0 mm 规格，PMMA 45±5μm / PC 0.455mm，全光线透过率 ≥90%，雾度 <0.5%",
      "V600 工艺路线：复合生板 → 丝印 LOGO → UV 转印 → 镀膜 → 丝印盖底 → 高压成型 → 淋涂 AG → CNC",
      "整体 1*4 排版良率 ≈ 78%；单工序良率：丝印 LOGO 98.5% / UV 转印 96.5% / 镀膜 96% / 盖底 98% / 高压 97% / 淋涂 AG 96.5% / CNC 97.5%",
      "高压成型：380℃ 30s 烘烤，30→70kg 两段加压；淋涂 AG：55℃→60℃→65℃ 渐次加热 + UV 100mj",
      "V600 四种颜色：锖色 / 灰白 / 墨绿 / 红色，均采用复合板+磁控溅射镀叠层",
    ],
    images: [
      { src: "assets/images/v600-black.png", caption: "V600 锖色成品" },
      { src: "assets/images/v600-silver.png", caption: "V600 灰白成品" },
      { src: "assets/images/v600-green.png", caption: "V600 墨绿成品" },
      { src: "assets/images/v600-red.png", caption: "V600 红色成品" },
      { src: "assets/images/silkscreen-logo.jpeg", caption: "V600 丝印 LOGO 工序（实拍）" },
      { src: "assets/images/uv-curing.jpeg", caption: "V600 UV 转印固化（实拍）" },
      { src: "assets/images/cleanroom-ag.jpeg", caption: "V600 淋涂 AG（实拍）" },
      { src: "assets/images/high-pressure-red.jpeg", caption: "V600 高压成型（实拍）" },
    ],
  },
];

// 工具函数
function getAllProcesses() {
  return PROCESSES;
}

function getProcessesByCategory(category) {
  return PROCESSES.filter((p) => p.category === category);
}

function getProcessById(id) {
  return PROCESSES.find((p) => p.id === id);
}

// 导航分类
// 导航分类（新结构）
const CATEGORIES = [
  { id: "all", name: "全部工艺", icon: "📋", color: "#475569" },
  { id: "MDA中框", name: "MDA中框", icon: "🔩", color: "#8b5cf6" },
  { id: "三件式", name: "三件式", icon: "🔧", color: "#06b6d4" },
  { id: "金属中框", name: "金属中框", icon: "⚙️", color: "#2563eb" },
  { id: "电池盖", name: "电池盖工艺", icon: "🎨", color: "#0891b2" },
];

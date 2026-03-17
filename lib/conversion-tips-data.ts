export type TipLocaleText = {
  en: string;
  zh: string;
  es?: string;
  fr?: string;
  ru?: string;
  ar?: string;
};

export interface TipArticle {
  title: TipLocaleText;
  summary: TipLocaleText;
}

export interface TipFaqItem {
  q: TipLocaleText;
  a: TipLocaleText;
}

export interface TipDetailSection {
  heading: TipLocaleText;
  body: TipLocaleText;
}

export interface TipDetailContent {
  overview: TipLocaleText;
  sections: TipDetailSection[];
  faq?: TipFaqItem[];
}

export interface TipModule {
  key: string;
  title: TipLocaleText;
  intro: TipLocaleText;
  articles: TipArticle[];
}

export const TIP_MODULES: TipModule[] = [
  {
    key: "fun-facts",
    title: { en: "Fun facts behind units", zh: "单位背后的趣味冷知识" },
    intro: {
      en: "Knowing where units come from helps you avoid mistakes and remember formulas faster.",
      zh: "理解单位来源，能更快记住换算关系，也能减少误用。",
    },
    articles: [
      { title: { en: "Why is 1 mile = 1.609 km?", zh: "为什么 1 英里 = 1.609 公里？" }, summary: { en: "From Roman roads to modern standards: where this famous ratio comes from.", zh: "从古代道路计量到现代标准化，解释这个常见换算常数的来源。" } },
      { title: { en: "Was the foot based on human feet?", zh: "英尺真的是“脚长”吗？" }, summary: { en: "The foot began as a body measure but became a strict engineering standard.", zh: "从人体尺度演变为工程标准，厘清“英尺”的历史与现代定义。" } },
      { title: { en: "How did Celsius and Fahrenheit formulas form?", zh: "摄氏与华氏公式怎么来的？" }, summary: { en: "Why this conversion needs both a multiplier and an offset.", zh: "为什么温度换算必须包含“系数+偏移量”，不是纯比例。" } },
      { title: { en: "Why shoe sizes differ by country", zh: "为什么鞋码各国不统一" }, summary: { en: "US/EU/UK/JP systems and the safest mapping method.", zh: "梳理美欧英日鞋码差异，并给出更稳妥对照方法。" } },
      { title: { en: "Why nautical mile differs from mile", zh: "海里和英里为什么不同" }, summary: { en: "The geodesy logic behind marine and aviation navigation.", zh: "从地理测量与航海需求解释海里的来源与意义。" } },
      { title: { en: "Pound vs kilogram: why both survive", zh: "磅和千克为何长期并存" }, summary: { en: "Trade, regulation, and habit keep dual systems alive.", zh: "从贸易、法规与习惯解释双单位长期并存。" } },
      { title: { en: "Inch and centimeter in manufacturing", zh: "英寸与厘米在制造业中的关系" }, summary: { en: "How metric standardization changed design collaboration.", zh: "公制标准化如何影响工业设计与跨区域协作。" } },
      { title: { en: "Why scientists prefer Kelvin", zh: "科研场景为何偏爱开尔文" }, summary: { en: "Absolute temperature and where Celsius becomes less ideal.", zh: "绝对温标在科研中的优势，以及摄氏度的边界。" } },
      { title: { en: "Cup sizes vary by region", zh: "“一杯”在不同国家并不相同" }, summary: { en: "US cups vs metric cups and recipe failure risk.", zh: "美制杯与公制杯差异导致配方偏差的常见原因。" } },
      { title: { en: "Why ounce has two meanings", zh: "为什么盎司有两种含义" }, summary: { en: "Mass ounce vs fluid ounce in real usage.", zh: "重量盎司与液体盎司的混用陷阱与识别方式。" } },
    ],
  },
  {
    key: "daily-guides",
    title: { en: "Daily life conversion guides", zh: "生活实用换算指南" },
    intro: {
      en: "Practical conversion scenarios for travel, shopping, and cooking.",
      zh: "面向旅行、购物、烹饪等高频生活场景的换算建议。",
    },
    articles: [
      { title: { en: "Travel quick checks: temperature, distance, currency", zh: "出国旅行速查：温度、距离、货币" }, summary: { en: "A compact checklist before you land.", zh: "落地前必备的三类换算速查清单。" } },
      { title: { en: "Shoe size cross-region matching", zh: "海淘鞋码对照：中美欧日" }, summary: { en: "Use foot length first to reduce return rates.", zh: "按脚长对照能显著降低海淘买错概率。" } },
      { title: { en: "Baking conversion: g, oz, cup, spoon", zh: "烘焙换算：克、盎司、杯、勺" }, summary: { en: "Density matters more than one fixed ratio.", zh: "食材密度决定结果，不能套一个固定比例。" } },
      { title: { en: "Personal top conversions dashboard", zh: "个人高频换算仪表盘" }, summary: { en: "Turn repetitive tasks into one-click bookmarks.", zh: "把高频换算沉淀成一键收藏，长期省时。" } },
      { title: { en: "Travel packing weight conversion", zh: "行李重量换算指南" }, summary: { en: "Avoid airport surprises with kg/lb checks.", zh: "用 kg/lb 快速核对，避免机场超重尴尬。" } },
      { title: { en: "Weather app unit mismatch fixes", zh: "天气 App 单位不一致怎么办" }, summary: { en: "Switch C/F and wind units confidently.", zh: "摄氏/华氏与风速单位切换的高效方法。" } },
      { title: { en: "Home fitness unit consistency", zh: "居家健身的单位统一" }, summary: { en: "Keep lb and kg logs consistent over time.", zh: "统一磅/千克记录，避免训练数据漂移。" } },
      { title: { en: "Kitchen liquid conversion pitfalls", zh: "厨房液体换算常见坑" }, summary: { en: "Cup/ml/fl oz mistakes and fast correction.", zh: "杯、毫升、液体盎司混淆的快速排错法。" } },
      { title: { en: "Renting/moving area conversion", zh: "租房搬家的面积换算" }, summary: { en: "sqm and sqft with price-per-area comparison.", zh: "平方米/平方英尺和单价比较的一体化方法。" } },
      { title: { en: "Cross-border shopping price normalization", zh: "跨境购物价格标准化" }, summary: { en: "Normalize prices per unit before checkout.", zh: "下单前做单位标准化，避免“看便宜实则贵”。" } },
    ],
  },
  {
    key: "professional",
    title: { en: "Professional scenario conversions", zh: "专业场景换算" },
    intro: {
      en: "In technical work, unit semantics are as important as numeric conversion.",
      zh: "在技术场景中，单位语义与数值换算同样重要。",
    },
    articles: [
      { title: { en: "Programmer basics: binary, octal, hex", zh: "程序员必备：二进制、八进制、十六进制" }, summary: { en: "Validate machine-level representations safely.", zh: "面向开发者的进制转换与校验方法。" } },
      { title: { en: "Fuel economy: mpg vs L/100km", zh: "油耗：mpg 与 L/100km" }, summary: { en: "One framework for global fuel-cost comparison.", zh: "统一跨市场油耗口径，减少误读。" } },
      { title: { en: "Pressure, power, energy dimensions", zh: "压强、功率、能量的维度区别" }, summary: { en: "A checklist before conversion in dashboards.", zh: "报表和看板中常用的量纲检查清单。" } },
      { title: { en: "Unit naming in API contracts", zh: "接口字段的单位命名规范" }, summary: { en: "Avoid downstream confusion with explicit units.", zh: "字段命名带单位，减少跨团队误解。" } },
      { title: { en: "Cloud billing units explained", zh: "云计费单位读懂指南" }, summary: { en: "Translate vCPU-hour and GB-hour to business metrics.", zh: "把资源计费单位转成业务可读指标。" } },
      { title: { en: "Mb vs MB in data transfer specs", zh: "Mb 与 MB 在传输规格中的区别" }, summary: { en: "Prevent bandwidth and file-size confusion.", zh: "避免带宽与文件大小混淆引发争议。" } },
      { title: { en: "Battery capacity conversion logic", zh: "电池容量换算逻辑" }, summary: { en: "Wh, mAh, and voltage in consumer devices.", zh: "Wh、mAh、电压关系在消费电子中的应用。" } },
      { title: { en: "Engineering drawing unit mismatch audit", zh: "工程图纸单位审计" }, summary: { en: "Pre-release checks that prevent costly mistakes.", zh: "发布前核对单位，降低返工风险。" } },
      { title: { en: "SI prefixes in production systems", zh: "生产系统中的 SI 前缀处理" }, summary: { en: "Keep k/M/G and m/u/n consistent across tools.", zh: "跨工具保持 SI 前缀一致性的方法。" } },
      { title: { en: "Migrating legacy industrial units", zh: "工业遗留单位迁移" }, summary: { en: "Move old unit systems into modern reporting safely.", zh: "将遗留单位平滑迁移到现代报表体系。" } },
    ],
  },
  {
    key: "tricks-tools",
    title: { en: "Conversion tricks and mini tools", zh: "换算技巧与小工具" },
    intro: {
      en: "Combine mental math and tools for better speed and reliability.",
      zh: "把心算近似与工具精算结合，效率与准确性更平衡。",
    },
    articles: [
      { title: { en: "Mental math vs tool: decision matrix", zh: "手算 vs 工具：决策矩阵" }, summary: { en: "Choose speed-first or precision-first by scenario.", zh: "按场景选择“估算优先”或“精算优先”。" } },
      { title: { en: "Country unit habit quick map", zh: "各国单位习惯速查" }, summary: { en: "Present numbers in locally familiar units.", zh: "面向不同地区用户的单位表达策略。" } },
      { title: { en: "Ounce pitfalls: mass vs fluid", zh: "盎司误区：重量 vs 液体" }, summary: { en: "Identify dimension first to avoid hidden bugs.", zh: "先判定量纲再换算，避免隐性错误。" } },
      { title: { en: "Build your top-20 conversion set", zh: "建立 Top20 常用换算库" }, summary: { en: "Turn repetitive conversions into routines.", zh: "把重复换算沉淀成稳定工作流。" } },
      { title: { en: "Top 10 travel conversion cheatsheet", zh: "旅行 Top10 换算清单" }, summary: { en: "A ready pack for airport, hotel, transit.", zh: "覆盖机场、酒店、交通场景的高频换算。" } },
      { title: { en: "Top 10 e-commerce conversion checks", zh: "电商 Top10 换算核对项" }, summary: { en: "A safety checklist before checkout.", zh: "下单前快速核对单位与规格风险。" } },
      { title: { en: "Top 10 engineering conversion checks", zh: "工程 Top10 换算核对项" }, summary: { en: "Review specs, drawings, procurement docs consistently.", zh: "规格书、图纸、采购文件的统一核对方案。" } },
      { title: { en: "Build a team unit glossary", zh: "搭建团队单位术语表" }, summary: { en: "Align product, ops, and engineering language.", zh: "统一产品、运营、研发的单位语言体系。" } },
      { title: { en: "Spreadsheet conversion QA", zh: "表格换算质量检查" }, summary: { en: "Catch unit bugs early in Excel/Sheets.", zh: "在表格中提前发现单位错误。" } },
      { title: { en: "60-second pre-report sanity check", zh: "报表发布前 60 秒快检" }, summary: { en: "A tiny routine that prevents major mistakes.", zh: "用简短流程降低报表高影响错误。" } },
    ],
  },
];

export type FlatTipArticle = TipArticle & {
  moduleKey: string;
  moduleTitle: TipLocaleText;
  slug: string;
};

export function getArticleSlug(moduleKey: string, idx: number): string {
  return `${moduleKey}-${String(idx + 1).padStart(2, "0")}`;
}

export function getAllFlatTipArticles(): FlatTipArticle[] {
  return TIP_MODULES.flatMap((module) =>
    module.articles.map((article, idx) => ({
      ...article,
      moduleKey: module.key,
      moduleTitle: module.title,
      slug: getArticleSlug(module.key, idx),
    }))
  );
}

export function getTipArticleBySlug(slug: string): FlatTipArticle | undefined {
  return getAllFlatTipArticles().find((a) => a.slug === slug);
}

export function getTipModuleByKey(moduleKey: string): TipModule | undefined {
  return TIP_MODULES.find((m) => m.key === moduleKey);
}

const TIP_DETAILS: Record<string, TipDetailContent> = {
  "fun-facts-01": {
    overview: {
      en: "The mile was not invented in one day. It evolved through Roman road counting, medieval practice, and modern standardization into the value we use today.",
      zh: "英里并不是一次性定义出来的。它经历了罗马道路计量、中世纪沿用和现代标准化，最终形成今天的数值。",
    },
    sections: [
      {
        heading: { en: "Historical origin", zh: "历史来源" },
        body: {
          en: "Roman 'mille passus' (one thousand double-steps) is the conceptual ancestor of the mile. Different regions later used slightly different values.",
          zh: "罗马时代的“mille passus（千步）”是英里的概念前身。后来不同地区的英里长度并不完全一致。",
        },
      },
      {
        heading: { en: "Modern standard", zh: "现代标准定义" },
        body: {
          en: "The international mile is defined exactly as 1,609.344 meters. That gives the commonly memorized shortcut 1 mile ≈ 1.609 km.",
          zh: "现代国际英里被精确定义为 1609.344 米，因此常见速记为 1 英里约等于 1.609 公里。",
        },
      },
      {
        heading: { en: "Practical usage tip", zh: "实操建议" },
        body: {
          en: "For quick mental checks, use 1.6 km. For contracts, logistics, and engineering documents, always keep full precision.",
          zh: "心算时可先按 1.6 km 粗估；涉及合同、物流、工程文档时应使用完整精度值。",
        },
      },
    ],
    faq: [
      {
        q: { en: "Is 1.609 an approximation?", zh: "1.609 是近似值吗？" },
        a: {
          en: "Yes. Exact value is 1.609344 km per mile. 1.609 is a rounded quick-reference value.",
          zh: "是。精确值是 1 英里 = 1.609344 公里，1.609 只是便于速记的四舍五入值。",
        },
      },
      {
        q: { en: "Can I use 1.6 for travel planning?", zh: "旅行规划可以直接用 1.6 吗？" },
        a: {
          en: "Usually yes for rough planning. Use precise conversion for billing and official reporting.",
          zh: "用于粗略规划通常可以，但计费和正式报表建议使用精确换算。",
        },
      },
    ],
  },
  "fun-facts-03": {
    overview: {
      en: "Celsius and Fahrenheit are both linear scales, but their zero points and step sizes differ, so conversion needs multiplier plus offset.",
      zh: "摄氏和华氏都是线性温标，但零点与刻度步长不同，所以换算必须同时考虑“系数+偏移”。",
    },
    sections: [
      {
        heading: { en: "Scale spacing difference", zh: "刻度间距差异" },
        body: {
          en: "A 1 degree change in Celsius equals 1.8 degrees in Fahrenheit. That is where 9/5 comes from.",
          zh: "摄氏每变化 1 度，华氏变化 1.8 度，这就是公式中 9/5 的来源。",
        },
      },
      {
        heading: { en: "Zero point offset", zh: "零点偏移" },
        body: {
          en: "0 C is not 0 F. Their reference points differ by 32 Fahrenheit degrees, so +32 appears in conversion.",
          zh: "0 摄氏并不等于 0 华氏，两者参考零点相差 32 华氏度，所以公式里有 +32。",
        },
      },
      {
        heading: { en: "Common error", zh: "常见错误" },
        body: {
          en: "People often only multiply by 1.8 and forget the offset. That creates large errors around freezing/room temperature ranges.",
          zh: "很多人只乘 1.8 却忘记加减偏移量，尤其在冰点和室温附近会产生明显误差。",
        },
      },
    ],
  },
  "fun-facts-02": {
    overview: {
      en: "The modern foot started as a human-based reference but is now a strict international engineering unit defined by law and standards.",
      zh: "英尺最早源于人体尺度，但现代已经成为被法律和标准严格定义的工程单位。",
    },
    sections: [
      {
        heading: { en: "Body measure origin", zh: "人体尺度的起点" },
        body: {
          en: "In ancient systems, length units often came from body parts, including hand, cubit, and foot.",
          zh: "在古代计量体系中，很多长度单位都来自人体部位，例如掌、肘尺和脚长。",
        },
      },
      {
        heading: { en: "Why this was not enough", zh: "为什么后来不够用" },
        body: {
          en: "Body-based units vary by person and region, which caused trade disputes and design inconsistency.",
          zh: "人体尺度会随人和地区变化，导致贸易纠纷和工程设计不一致问题。",
        },
      },
      {
        heading: { en: "Modern precise definition", zh: "现代精确定义" },
        body: {
          en: "Today 1 foot equals exactly 0.3048 meters, making imperial-metric conversion stable across industries.",
          zh: "如今 1 英尺被精确定义为 0.3048 米，使英制与公制换算在各行业保持一致。",
        },
      },
    ],
  },
  "fun-facts-04": {
    overview: {
      en: "Shoe size is a regional language problem as much as a measurement problem. Number labels look similar but map differently across systems.",
      zh: "鞋码问题本质上既是测量问题，也是地区标准语言问题。数字看似接近，映射却可能完全不同。",
    },
    sections: [
      {
        heading: { en: "Different systems, different baselines", zh: "体系不同，基准也不同" },
        body: {
          en: "US, EU, UK, and JP standards use different calculation logic, so direct number-to-number comparison is unsafe.",
          zh: "美码、欧码、英码、日码采用不同计算基准，不能直接“数字对数字”硬对应。",
        },
      },
      {
        heading: { en: "Foot length is the safest bridge", zh: "脚长是最稳妥的桥梁" },
        body: {
          en: "Use foot length in centimeters first, then map to target standards. This method reduces cross-border mismatch.",
          zh: "优先使用脚长（厘米）作为中间值，再映射各国鞋码，能显著降低跨境购买偏差。",
        },
      },
      {
        heading: { en: "Practical buying checklist", zh: "实操购买清单" },
        body: {
          en: "Check brand-specific charts, width notes, and return policy. Standard tables are guidance, not guarantees.",
          zh: "购买前应同时看品牌尺码表、鞋楦宽度说明和退换政策。通用对照表只能做参考。",
        },
      },
    ],
  },
  "daily-guides-01": {
    overview: {
      en: "When traveling internationally, conversion friction appears in three places first: weather, transport distance, and payment.",
      zh: "跨国旅行时，最先遇到的换算摩擦通常出现在天气、路程和消费三个环节。",
    },
    sections: [
      {
        heading: { en: "Temperature interpretation", zh: "温度体感判断" },
        body: {
          en: "Memorize anchor points: 0 C freezing, 20 C mild, 30 C hot. This speeds up adaptation without constant app switching.",
          zh: "记住几个锚点：0°C 结冰、20°C 舒适、30°C 偏热，能减少来回切换软件的成本。",
        },
      },
      {
        heading: { en: "Distance translation", zh: "路程单位换读" },
        body: {
          en: "If your navigation uses miles, convert roughly by ×1.6 to kilometers for daily planning.",
          zh: "导航显示英里时，日常规划可先按 ×1.6 近似换成公里。",
        },
      },
      {
        heading: { en: "Currency guardrail", zh: "货币换算防线" },
        body: {
          en: "Before paying, normalize to your home currency and then compare per-unit price, not only sticker price.",
          zh: "付款前先换回本币，再看单位价格，不要只看标签总价。",
        },
      },
    ],
  },
  "daily-guides-02": {
    overview: {
      en: "Cross-region shoe shopping fails mostly on conversion shortcuts. A structured mapping workflow is more reliable.",
      zh: "海淘鞋码翻车大多来自“凭经验速配”。使用结构化对照流程更可靠。",
    },
    sections: [
      {
        heading: { en: "Measure at the right time", zh: "在正确时间测量脚长" },
        body: {
          en: "Measure in the evening with socks you plan to wear. Feet can expand during the day.",
          zh: "建议在晚间、穿目标袜子测量。脚部在一天内会有轻微膨胀变化。",
        },
      },
      {
        heading: { en: "Map by region then by brand", zh: "先按地区，再按品牌修正" },
        body: {
          en: "Convert by region standard first, then apply brand chart adjustments for final selection.",
          zh: "先按地区标准做基础换算，再根据品牌尺码表做二次修正。",
        },
      },
      {
        heading: { en: "Handle half sizes carefully", zh: "半码处理要谨慎" },
        body: {
          en: "If in-between sizes, prioritize foot width, activity type, and insole thickness before deciding up/down.",
          zh: "处于半码区间时，应综合脚宽、用途和鞋垫厚度再决定向上或向下取码。",
        },
      },
    ],
  },
  "daily-guides-03": {
    overview: {
      en: "Baking conversion failures often come from treating volume and mass as if they were equivalent for all ingredients.",
      zh: "烘焙换算失败的根源，常常是把“体积”和“质量”当成所有食材都可直接互换。",
    },
    sections: [
      {
        heading: { en: "Why one ratio fails", zh: "为什么单一比例会失效" },
        body: {
          en: "Flour, sugar, and butter have different densities. 1 cup of each does not weigh the same.",
          zh: "面粉、糖、黄油密度不同，同样 1 杯对应的克数并不相同。",
        },
      },
      {
        heading: { en: "Safer conversion workflow", zh: "更稳妥的换算流程" },
        body: {
          en: "Convert by ingredient-specific tables first; only use generalized ratios for rough estimation.",
          zh: "先按食材专属对照表换算；通用比例只用于粗估，不用于最终定量。",
        },
      },
      {
        heading: { en: "Precision recommendation", zh: "精度建议" },
        body: {
          en: "For pastries, keep at least one decimal during intermediate steps and round at the end.",
          zh: "烘焙中间步骤建议保留至少一位小数，最后一步再统一取整。",
        },
      },
    ],
  },
  "professional-01": {
    overview: {
      en: "Binary/octal/hex conversion is not only academic. It directly impacts debugging, memory inspection, and protocol analysis.",
      zh: "进制转换不只是理论题，它直接影响调试、内存观察和协议排查效率。",
    },
    sections: [
      {
        heading: { en: "Hex and bytes", zh: "十六进制与字节" },
        body: {
          en: "Hex aligns naturally with 4-bit groups. Two hex digits map to one byte, making binary inspection readable.",
          zh: "十六进制天然对齐 4 位二进制，两位 hex 正好对应 1 字节，便于阅读机器数据。",
        },
      },
      {
        heading: { en: "Prefix discipline", zh: "前缀规范" },
        body: {
          en: "Always include clear prefixes like 0b, 0o, 0x in docs and code snippets to avoid parser ambiguity.",
          zh: "在文档和代码片段中明确写出 0b/0o/0x 前缀，避免解析歧义和沟通误解。",
        },
      },
      {
        heading: { en: "Validation strategy", zh: "校验策略" },
        body: {
          en: "Round-trip conversion (A->B->A) is a quick way to detect mistakes in tooling or manual edits.",
          zh: "用往返转换（A->B->A）做快速校验，能高效发现工具链或手工编辑错误。",
        },
      },
    ],
  },
  "professional-02": {
    overview: {
      en: "mpg and L/100km describe fuel efficiency from opposite directions, so interpretation can easily flip.",
      zh: "mpg 与 L/100km 在表达逻辑上方向相反，理解不当很容易得出反结论。",
    },
    sections: [
      {
        heading: { en: "Interpretation rule", zh: "判读规则" },
        body: {
          en: "Higher mpg means better efficiency; lower L/100km means better efficiency.",
          zh: "mpg 数值越高越省油；L/100km 数值越低越省油。",
        },
      },
      {
        heading: { en: "Regional context", zh: "地区语境差异" },
        body: {
          en: "North American specs often use mpg, while many other regions use L/100km. Normalize before comparing models.",
          zh: "北美常用 mpg，很多其他地区常用 L/100km。跨市场比车型前要先统一口径。",
        },
      },
      {
        heading: { en: "Cost perspective", zh: "成本视角" },
        body: {
          en: "Final decision should include local fuel price and yearly mileage, not unit conversion alone.",
          zh: "最终判断应结合当地油价和年行驶里程，而不仅是单位换算后的数字。",
        },
      },
    ],
  },
  "professional-03": {
    overview: {
      en: "Pressure, power, and energy are often mixed in dashboards. Unit conversion cannot fix dimensional mistakes.",
      zh: "压强、功率、能量在看板中最容易被混用。量纲错误不是单位换算能补救的。",
    },
    sections: [
      {
        heading: { en: "Dimension before conversion", zh: "先量纲，后换算" },
        body: {
          en: "Confirm physical quantity first: pressure (Pa), power (W), energy (J/Wh). Then convert inside the same dimension.",
          zh: "先确认物理量类别：压强（Pa）、功率（W）、能量（J/Wh），再在同一量纲内换算。",
        },
      },
      {
        heading: { en: "Naming rules in data models", zh: "数据模型命名规则" },
        body: {
          en: "Use explicit fields like pressure_kpa, power_kw, energy_kwh to prevent semantic drift across teams.",
          zh: "使用 pressure_kpa、power_kw、energy_kwh 这类显式命名，减少跨团队语义漂移。",
        },
      },
      {
        heading: { en: "Audit high-risk visualizations", zh: "高风险图表审计" },
        body: {
          en: "Prioritize KPI charts and exported reports for unit audits. Most costly errors happen at decision layers.",
          zh: "优先审计 KPI 图表和外发报表。多数高成本错误都发生在决策层输出环节。",
        },
      },
    ],
  },
  "tricks-tools-01": {
    overview: {
      en: "A practical workflow separates rough estimation and exact conversion to improve both speed and decision quality.",
      zh: "实用工作流应区分“粗估阶段”和“精算阶段”，同时兼顾效率与决策质量。",
    },
    sections: [
      {
        heading: { en: "When mental math is enough", zh: "何时心算就够" },
        body: {
          en: "Use mental shortcuts for planning and conversation-level estimates where 2-5% error is acceptable.",
          zh: "在规划和沟通层面的粗判断中，若允许 2%-5% 误差，心算足够。",
        },
      },
      {
        heading: { en: "When tool precision is required", zh: "何时必须工具精算" },
        body: {
          en: "Use exact tools for pricing, technical specs, legal docs, and production settings.",
          zh: "涉及价格、技术规格、合同文档和生产参数时，必须使用工具给出精确值。",
        },
      },
      {
        heading: { en: "Hybrid method", zh: "混合方法" },
        body: {
          en: "Estimate first to catch impossible outputs, then verify with the converter for final values.",
          zh: "先做心算判断结果范围，再用工具锁定最终值，可明显降低误输风险。",
        },
      },
    ],
  },
  "tricks-tools-02": {
    overview: {
      en: "Country-level unit habits affect comprehension speed. Showing familiar units is a UX decision, not only a math decision.",
      zh: "各国单位习惯直接影响理解速度。采用用户熟悉单位是体验决策，不只是数学问题。",
    },
    sections: [
      {
        heading: { en: "Audience-first unit output", zh: "以受众为中心的单位输出" },
        body: {
          en: "For US-first audiences, imperial first with metric in brackets can reduce friction; inverse for metric-first audiences.",
          zh: "面向美区可“英制优先+公制补充”，面向公制用户则反过来，能显著降低理解成本。",
        },
      },
      {
        heading: { en: "Keep dual-unit consistency", zh: "双单位展示的一致性" },
        body: {
          en: "If you present both units, keep decimal precision and ordering consistent across pages and charts.",
          zh: "若同时展示双单位，需在页面和图表中保持小数位和展示顺序一致。",
        },
      },
      {
        heading: { en: "Localization checklist", zh: "本地化检查清单" },
        body: {
          en: "Validate unit labels, separators, decimal formats, and conversion context during localization QA.",
          zh: "本地化验收时要同时检查单位标签、分隔符、小数格式与换算语境。",
        },
      },
    ],
  },
  "tricks-tools-03": {
    overview: {
      en: "Many conversion errors are not arithmetic errors, but semantic errors caused by selecting the wrong unit type.",
      zh: "很多换算错误并非算术错误，而是“单位语义选错”导致的系统性偏差。",
    },
    sections: [
      {
        heading: { en: "Dimension-first checklist", zh: "先判维度清单" },
        body: {
          en: "Before converting, identify whether you are handling length, mass, volume, temperature, or speed.",
          zh: "换算前先确认当前处理的是长度、质量、体积、温度还是速度等维度。",
        },
      },
      {
        heading: { en: "The ounce trap", zh: "盎司陷阱" },
        body: {
          en: "oz and fl oz look similar but represent different physical dimensions and cannot be swapped directly.",
          zh: "oz 与 fl oz 看起来接近，但对应不同物理量，不能直接互换。",
        },
      },
      {
        heading: { en: "Team communication rule", zh: "团队沟通规则" },
        body: {
          en: "Always include unit symbol and context in tickets or comments to prevent downstream rework.",
          zh: "在需求、工单、注释中同时写清单位符号和语境，可显著减少返工。",
        },
      },
    ],
  },
  "daily-guides-04": {
    overview: {
      en: "A personal conversion dashboard turns repetitive conversions into a fast routine and reduces context switching.",
      zh: "个人换算仪表盘可以把重复换算沉淀成固定动作，显著减少来回切换成本。",
    },
    sections: [
      {
        heading: { en: "Pick top recurring tasks", zh: "先选最高频任务" },
        body: {
          en: "Start with your top 5-10 tasks, such as kg-lb, C-F, or miles-km, before expanding the set.",
          zh: "先覆盖你的前 5-10 个高频任务，例如 kg-lb、摄氏-华氏、英里-公里，再逐步扩展。",
        },
      },
      {
        heading: { en: "Use fixed default values", zh: "使用固定默认值" },
        body: {
          en: "Preset values like 1, 10, 100 or common business thresholds can speed up daily checks.",
          zh: "预置 1、10、100 或常见业务阈值，可显著提升日常核对效率。",
        },
      },
      {
        heading: { en: "Version and review monthly", zh: "按月复盘迭代" },
        body: {
          en: "Review dashboard usage monthly and remove low-frequency items to keep it concise and practical.",
          zh: "建议按月复盘使用情况，移除低频条目，保持仪表盘简洁且实用。",
        },
      },
    ],
  },
  "professional-04": {
    overview: {
      en: "Explicit unit naming in APIs prevents hidden semantic bugs and improves cross-team integration quality.",
      zh: "在 API 中显式声明单位可避免语义歧义，显著提升跨团队集成质量。",
    },
    sections: [
      {
        heading: { en: "Encode units in field names", zh: "单位写进字段名" },
        body: {
          en: "Prefer fields like distance_km, weight_kg, and temp_c to avoid guessing at integration time.",
          zh: "优先使用 distance_km、weight_kg、temp_c 这类字段，避免联调时猜单位。",
        },
      },
      {
        heading: { en: "Document unit and precision", zh: "文档写清单位与精度" },
        body: {
          en: "In API docs, include unit, numeric range, decimal precision, and rounding strategy.",
          zh: "接口文档中应同时描述单位、取值范围、小数精度与舍入策略。",
        },
      },
      {
        heading: { en: "Validate on boundaries", zh: "边界值校验" },
        body: {
          en: "Run tests on zero, max, min, and conversion boundaries to catch subtle unit mistakes early.",
          zh: "对 0、最大值、最小值和换算边界做测试，可提前发现隐性单位错误。",
        },
      },
    ],
  },
  "tricks-tools-04": {
    overview: {
      en: "A curated top-20 conversion set is a practical mini knowledge base for teams handling repeated numeric communication.",
      zh: "建立 Top20 常用换算集合，本质上是在团队内搭建一个高复用的小型知识库。",
    },
    sections: [
      {
        heading: { en: "Build by scenario, not by category", zh: "按场景建库，不按学科建库" },
        body: {
          en: "Group conversions by travel, e-commerce, engineering, and analytics scenarios for faster retrieval.",
          zh: "建议按旅行、电商、工程、数据分析场景分组，而不是按学科划分。",
        },
      },
      {
        heading: { en: "Add confidence labels", zh: "给结果加可信度标签" },
        body: {
          en: "Mark entries as rough estimate, business-ready, or contract-grade to avoid misuse.",
          zh: "可标注“粗估可用/业务可用/合同级精度”，避免不同场景误用同一结果。",
        },
      },
      {
        heading: { en: "Share as team standard", zh: "沉淀为团队标准" },
        body: {
          en: "Publish the set in onboarding docs and internal wikis so everyone uses consistent conversions.",
          zh: "把这套集合同步到入职文档和团队 wiki，确保全员换算口径一致。",
        },
      },
    ],
  },
};

export function getTipDetailBySlug(slug: string): TipDetailContent | undefined {
  return TIP_DETAILS[slug];
}

export function getAllDetailedTipArticles(): FlatTipArticle[] {
  const detailedSlugs = new Set(Object.keys(TIP_DETAILS));
  return getAllFlatTipArticles().filter((a) => detailedSlugs.has(a.slug));
}

export function getDetailedModuleArticles(moduleKey: string): FlatTipArticle[] {
  return getAllDetailedTipArticles().filter((a) => a.moduleKey === moduleKey);
}

export interface TipWidgetPreset {
  category: string;
  from?: string;
  to?: string;
  value?: number;
}

const MODULE_DEFAULT_WIDGET: Record<string, TipWidgetPreset> = {
  "fun-facts": { category: "length", from: "mile", to: "kilometer", value: 1 },
  "daily-guides": { category: "temperature", from: "celsius", to: "fahrenheit", value: 25 },
  professional: { category: "numbase", from: "decimal", to: "binary", value: 255 },
  "tricks-tools": { category: "length", from: "inch", to: "centimeter", value: 10 },
};

const ARTICLE_WIDGET_OVERRIDES: Record<string, TipWidgetPreset> = {
  "fun-facts-03": { category: "temperature", from: "celsius", to: "fahrenheit", value: 0 },
  "fun-facts-04": { category: "shoe", from: "us_m", to: "eu", value: 9 },
  "fun-facts-08": { category: "temperature", from: "celsius", to: "kelvin", value: 25 },
  "fun-facts-09": { category: "volume", from: "cup", to: "milliliter", value: 1 },
  "fun-facts-10": { category: "cooking", from: "oz_weight", to: "gram", value: 1 },

  "daily-guides-02": { category: "shoe", from: "eu", to: "us_m", value: 42 },
  "daily-guides-03": { category: "cooking", from: "cup", to: "ml", value: 1 },
  "daily-guides-05": { category: "weight", from: "kilogram", to: "pound", value: 23 },
  "daily-guides-06": { category: "temperature", from: "fahrenheit", to: "celsius", value: 77 },
  "daily-guides-08": { category: "volume", from: "fluid_oz", to: "milliliter", value: 12 },
  "daily-guides-09": { category: "area", from: "sq_meter", to: "sq_foot", value: 80 },

  "professional-01": { category: "numbase", from: "decimal", to: "hex", value: 255 },
  "professional-02": { category: "fuel", from: "mpg_us", to: "lper100km", value: 30 },
  "professional-03": { category: "pressure", from: "psi", to: "bar", value: 35 },
  "professional-06": { category: "data", from: "byte", to: "bit", value: 1 },
  "professional-07": { category: "energy", from: "watt_hour", to: "joule", value: 1 },
  "professional-09": { category: "data", from: "gigabyte", to: "megabyte", value: 1 },

  "tricks-tools-03": { category: "cooking", from: "oz_weight", to: "gram", value: 8 },
  "tricks-tools-05": { category: "speed", from: "mph", to: "kph", value: 60 },
  "tricks-tools-06": { category: "weight", from: "pound", to: "kilogram", value: 2.2 },
  "tricks-tools-07": { category: "pressure", from: "bar", to: "psi", value: 2.3 },
  "tricks-tools-09": { category: "length", from: "meter", to: "foot", value: 1 },
};

export function getTipWidgetPresetBySlug(slug: string): TipWidgetPreset {
  const override = ARTICLE_WIDGET_OVERRIDES[slug];
  if (override) return override;

  const article = getTipArticleBySlug(slug);
  if (article) {
    return MODULE_DEFAULT_WIDGET[article.moduleKey] ?? MODULE_DEFAULT_WIDGET["fun-facts"];
  }
  return MODULE_DEFAULT_WIDGET["fun-facts"];
}


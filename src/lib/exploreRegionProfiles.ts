import type { Day, Trip } from "./tripTypes";

/** Seed templates for explore routes — real lat/lng per country / region */
export type RegionProfile = {
  key: string;
  name: string;
  cover: Trip["cover"];
  date: string;
  defaultDays: number;
  aliases: string[];
  days: Omit<Day, "id">[];
};

export const exploreRegionProfiles: RegionProfile[] = [
  {
    key: "ukLondon",
    name: "英国",
    cover: "map",
    date: "2026.06.01 — 06.04",
    defaultDays: 4,
    aliases: ["伦敦", "英国", "london", "爱丁堡", "苏格兰"],
    days: [
      {
        label: "Day 1",
        route: "伦敦西城",
        spots: [
          { id: "", time: "09:00", title: "大本钟与威斯敏斯特", desc: "外观徒步 1.5h", lat: 51.5007, lng: -0.1246, category: "景点", intro: "议会大厦与泰晤士河经典天际线", rating: 4.8, tags: ["地标"] },
          { id: "", time: "11:00", title: "大英博物馆", desc: "参观 2.5h", lat: 51.5194, lng: -0.1269, category: "景点", intro: "罗塞塔石碑与全球文明珍藏", rating: 4.9, tags: ["博物馆"] },
          { id: "", time: "15:00", title: "考文特花园", desc: "逛街 1.5h", lat: 51.5129, lng: -0.1243, category: "购物", intro: "露天市集与街头表演", rating: 4.5, tags: ["街区"] },
        ],
      },
      {
        label: "Day 2",
        route: "伦敦东区 · 塔桥",
        spots: [
          { id: "", time: "09:30", title: "伦敦塔", desc: "参观 2h", lat: 51.5081, lng: -0.0759, category: "景点", intro: "王冠珠宝与千年要塞", rating: 4.7, price: "£33", tags: ["历史"] },
          { id: "", time: "13:00", title: "塔桥", desc: "步行 1h", lat: 51.5055, lng: -0.0754, category: "景点", intro: "维多利亚哥特式开启桥", rating: 4.6, tags: ["地标"] },
        ],
      },
      {
        label: "Day 3",
        route: "牛津",
        spots: [
          { id: "", time: "10:00", title: "牛津大学博德利图书馆", desc: "参观 2h", lat: 51.7541, lng: -1.2544, category: "景点", intro: "霍格沃茨图书馆取景地之一", rating: 4.7, tags: ["学术"] },
          { id: "", time: "13:00", title: "基督教堂学院", desc: "参观 1.5h", lat: 51.7503, lng: -1.2577, category: "景点", intro: "牛津最大学院与大礼堂", rating: 4.8, price: "£18", tags: ["校园"] },
        ],
      },
      {
        label: "Day 4",
        route: "苏格兰高地",
        spots: [
          { id: "", time: "09:00", title: "格伦科峡谷", desc: "观景公路 2h", lat: 56.6825, lng: -5.1028, category: "景点", intro: "壮丽火山谷地与《007》取景公路", rating: 4.9, tags: ["自然"] },
          { id: "", time: "14:00", title: "尼斯湖", desc: "湖畔 1h", lat: 57.3229, lng: -4.4244, category: "景点", intro: "神秘湖水与厄克哈特城堡遗址", rating: 4.4, tags: ["湖泊"] },
        ],
      },
    ],
  },
  {
    key: "itRome",
    name: "意大利",
    cover: "france",
    date: "2026.05.10 — 05.14",
    defaultDays: 5,
    aliases: ["罗马", "佛罗伦萨", "威尼斯", "italy", "米兰"],
    days: [
      {
        label: "Day 1",
        route: "罗马古城",
        spots: [
          { id: "", time: "09:00", title: "罗马斗兽场", desc: "参观 2h", lat: 41.8902, lng: 12.4922, category: "景点", intro: "帝国时代角斗场遗址", rating: 4.9, price: "€18", tags: ["世界遗产"] },
          { id: "", time: "12:00", title: "古罗马广场", desc: "遗址漫步 1.5h", lat: 41.8915, lng: 12.4865, category: "景点", intro: "共和与帝国政治中心废墟", rating: 4.7, tags: ["古迹"] },
          { id: "", time: "15:00", title: "特莱维喷泉", desc: "游览 45min", lat: 41.9009, lng: 12.4833, category: "景点", intro: "巴洛克许愿池夜景更佳", rating: 4.6, tags: ["地标"] },
        ],
      },
      {
        label: "Day 2",
        route: "梵蒂冈",
        spots: [
          { id: "", time: "08:30", title: "圣彼得大教堂", desc: "参观 2h", lat: 41.9022, lng: 12.4539, category: "景点", intro: "文艺复兴巨作穹顶与城市俯瞰", rating: 4.9, tags: ["宗教"] },
          { id: "", time: "12:00", title: "梵蒂冈博物馆", desc: "参观 3h", lat: 41.9065, lng: 12.4536, category: "景点", intro: "西斯廷天顶画与拉斐尔画室", rating: 4.9, price: "€20", tags: ["博物馆"] },
        ],
      },
      {
        label: "Day 3",
        route: "佛罗伦萨",
        spots: [
          { id: "", time: "10:00", title: "圣母百花大教堂", desc: "参观 2h", lat: 43.7731, lng: 11.256, category: "景点", intro: "布鲁内莱斯基穹顶与文艺复兴心脏", rating: 4.9, price: "€18", tags: ["建筑"] },
          { id: "", time: "14:00", title: "乌菲兹美术馆", desc: "参观 2.5h", lat: 43.7687, lng: 11.255, category: "景点", intro: "波提切利与文艺复兴绘画宝库", rating: 4.9, price: "€20", tags: ["美术馆"] },
        ],
      },
      {
        label: "Day 4",
        route: "威尼斯",
        spots: [
          { id: "", time: "09:00", title: "圣马可广场", desc: "游览 2h", lat: 45.4342, lng: 12.3388, category: "景点", intro: "钟楼、总督宫与咖啡历史", rating: 4.8, tags: ["地标"] },
          { id: "", time: "14:00", title: "贡多拉游运河", desc: "体验 1h", lat: 45.4376, lng: 12.3359, category: "景点", intro: "水城巷道与拱桥经典视角", rating: 4.5, tags: ["体验"] },
        ],
      },
      {
        label: "Day 5",
        route: "阿马尔菲海岸",
        spots: [
          { id: "", time: "10:00", title: "波西塔诺", desc: "海滨 2h", lat: 40.628, lng: 14.485, category: "景点", intro: "彩色悬崖小镇与地中海", rating: 4.8, tags: ["海岸"] },
          { id: "", time: "14:00", title: "阿马尔菲主教座堂", desc: "参观 1h", lat: 40.6333, lng: 14.6027, category: "景点", intro: "华丽马赛克正立面", rating: 4.6, tags: ["教堂"] },
        ],
      },
    ],
  },
  {
    key: "ausEast",
    name: "澳洲东岸",
    cover: "map",
    date: "2026.11.01 — 11.05",
    defaultDays: 5,
    aliases: ["悉尼", "墨尔本", "澳大利亚", "大洋路"],
    days: [
      {
        label: "Day 1",
        route: "悉尼港湾",
        spots: [
          { id: "", time: "09:00", title: "悉尼歌剧院", desc: "导览 1.5h", lat: -33.8568, lng: 151.2153, category: "景点", intro: "世界文化遗产贝壳屋顶", rating: 4.8, tags: ["地标"] },
          { id: "", time: "11:30", title: "悉尼海港大桥", desc: "步行 1h", lat: -33.8523, lng: 151.2108, category: "景点", intro: "钢拱大桥与环形码头景观", rating: 4.7, tags: ["观景"] },
        ],
      },
      {
        label: "Day 2",
        route: "邦迪 · 蓝山",
        spots: [
          { id: "", time: "09:00", title: "邦迪海滩", desc: "冲浪散步 2h", lat: -33.8915, lng: 151.2767, category: "景点", intro: "澳洲最著名城市海滩", rating: 4.7, tags: ["海滩"] },
          { id: "", time: "14:00", title: "蓝山三姐妹峰", desc: "观景 2h", lat: -33.715, lng: 150.311, category: "景点", intro: "桉树油雾营造的蓝雾山脉", rating: 4.8, tags: ["自然"] },
        ],
      },
      {
        label: "Day 3",
        route: "墨尔本",
        spots: [
          { id: "", time: "10:00", title: "弗林德斯街车站", desc: "街区 1h", lat: -37.8183, lng: 144.9671, category: "景点", intro: "墨尔本地标黄砂岩车站", rating: 4.5, tags: ["地标"] },
          { id: "", time: "12:00", title: "联邦广场", desc: "文化与咖啡 2h", lat: -37.8179, lng: 144.9691, category: "景点", intro: "NGV 与雅拉河畔公共空间", rating: 4.4, tags: ["艺术"] },
        ],
      },
      {
        label: "Day 4",
        route: "大洋路",
        spots: [
          { id: "", time: "09:00", title: "十二使徒岩", desc: "观景 1.5h", lat: -38.6499, lng: 143.1051, category: "景点", intro: "石灰岩海柱与南大洋日落", rating: 4.9, tags: ["海岸"] },
          { id: "", time: "13:00", title: "洛克阿德峡谷", desc: "步道 1h", lat: -38.62, lng: 143.08, category: "景点", intro: "壮观峡湾与沉船故事", rating: 4.7, tags: ["徒步"] },
        ],
      },
      {
        label: "Day 5",
        route: "凯恩斯 / 大堡礁",
        spots: [
          { id: "", time: "08:00", title: "大堡礁出海浮潜", desc: "一日游 6h", lat: -16.4833, lng: 145.4667, category: "景点", intro: "道格拉斯港出发珊瑚礁与热带鱼", rating: 4.9, tags: ["潜水"] },
        ],
      },
    ],
  },
  {
    key: "maMarrakech",
    name: "摩洛哥",
    cover: "map",
    date: "2026.04.01 — 04.04",
    defaultDays: 4,
    aliases: ["摩洛哥", "马拉喀什", "撒哈拉", "菲斯", "舍夫沙万", "卡萨布兰卡"],
    days: [
      {
        label: "Day 1",
        route: "马拉喀什",
        spots: [
          { id: "", time: "10:00", title: "杰马艾夫纳广场", desc: "市集 2h", lat: 31.6258, lng: -7.9891, category: "景点", intro: "世界遗产夜市与街头美食", rating: 4.6, tags: ["集市"] },
          { id: "", time: "15:00", title: "马若雷勒花园", desc: "散步 1.5h", lat: 31.6413, lng: -8.0025, category: "景点", intro: "伊夫·圣罗兰蓝墙仙人掌园", rating: 4.7, price: "¥70", tags: ["花园"]},
        ],
      },
      {
        label: "Day 2",
        route: "阿特拉斯山麓",
        spots: [
          { id: "", time: "09:00", title: "阿伊特·本·哈杜村", desc: "古城 2h", lat: 31.0471, lng: -7.1295, category: "景点", intro: "夯土城堡村落，《权游》取景地", rating: 4.8, tags: ["古迹"] },
        ],
      },
      {
        label: "Day 3",
        route: "菲斯",
        spots: [
          { id: "", time: "10:00", title: "菲斯古城麦地那", desc: "迷宫巷弄 3h", lat: 34.0617, lng: -4.9833, category: "景点", intro: "九千条巷道与传统皮革染坊", rating: 4.7, tags: ["老城"] },
        ],
      },
      {
        label: "Day 4",
        route: "蓝城 / 海岸",
        spots: [
          { id: "", time: "09:00", title: "舍夫沙万老城", desc: "拍照 2h", lat: 35.171, lng: -5.2696, category: "景点", intro: "山城蓝白小巷", rating: 4.8, tags: ["拍照"] },
          { id: "", time: "14:00", title: "哈桑二世清真寺", desc: "参观 1.5h", lat: 33.6085, lng: -7.6328, category: "景点", intro: "矗立大西洋上的现代清真寺", rating: 4.7, tags: ["建筑"] },
        ],
      },
    ],
  },
  {
    key: "esSpain",
    name: "西班牙",
    cover: "france",
    date: "2026.09.01 — 09.07",
    defaultDays: 7,
    aliases: ["巴塞罗那", "马德里", "西班牙", "安达卢西亚", "圣地亚哥"],
    days: [
      {
        label: "Day 1",
        route: "巴塞罗那",
        spots: [
          { id: "", time: "09:00", title: "圣家堂", desc: "参观 2.5h", lat: 41.4036, lng: 2.1744, category: "景点", intro: "高迪未竟杰作", rating: 4.9, price: "€26", tags: ["建筑"] },
          { id: "", time: "14:00", title: "古埃尔公园", desc: "游览 1.5h", lat: 41.4145, lng: 2.1527, category: "景点", intro: "马赛克蜥蜴与城景露台", rating: 4.6, tags: ["公园"] },
        ],
      },
      {
        label: "Day 2",
        route: "巴塞罗那海滨",
        spots: [
          { id: "", time: "10:00", title: "兰布拉大道 · 波盖利亚市场", desc: "美食 2h", lat: 41.3819, lng: 2.1717, category: "美食", intro: "彩色果蔬与 tapas", rating: 4.5, tags: ["市场"] },
          { id: "", time: "14:00", title: "巴塞罗那海滩", desc: "休息 2h", lat: 41.3851, lng: 2.1975, category: "景点", intro: "地中海城市沙滩", rating: 4.4, tags: ["海滩"] },
        ],
      },
      {
        label: "Day 3",
        route: "马德里",
        spots: [
          { id: "", time: "09:30", title: "马德里王宫", desc: "参观 2h", lat: 40.418, lng: -3.7142, category: "景点", intro: "波旁王朝宫殿与御花园", rating: 4.7, price: "€12", tags: ["宫殿"] },
          { id: "", time: "14:00", title: "普拉多博物馆", desc: "参观 2.5h", lat: 40.4138, lng: -3.6921, category: "景点", intro: "戈雅、委拉斯开兹核心馆藏", rating: 4.9, price: "€15", tags: ["博物馆"] },
        ],
      },
      {
        label: "Day 4",
        route: "塞维利亚",
        spots: [
          { id: "", time: "10:00", title: "塞维利亚王宫", desc: "参观 2h", lat: 37.3831, lng: -5.9904, category: "景点", intro: "穆德哈尔宫殿与权游多恩取景", rating: 4.8, tags: ["宫殿"] },
          { id: "", time: "14:00", title: "西班牙广场", desc: "游览 1h", lat: 37.3772, lng: -5.9869, category: "景点", intro: "半圆形陶瓦建筑的巨无霸广场", rating: 4.8, tags: ["广场"]},
        ],
      },
      {
        label: "Day 5",
        route: "格拉纳达",
        spots: [
          { id: "", time: "09:00", title: "阿尔罕布拉宫", desc: "参观 3h", lat: 37.1761, lng: -3.5881, category: "景点", intro: "纳斯瑞德宫与轩尼洛里菲花园", rating: 4.9, price: "€14", tags: ["世界遗产"]},
        ],
      },
      {
        label: "Day 6",
        route: "科尔多瓦 / 白色小镇",
        spots: [
          { id: "", time: "10:00", title: "科尔多瓦大清真寺", desc: "参观 2h", lat: 37.8789, lng: -4.7794, category: "景点", intro: "拱柱森林与天主教座堂共存", rating: 4.8, tags: ["古迹"] },
        ],
      },
      {
        label: "Day 7",
        route: "圣地亚哥",
        spots: [
          { id: "", time: "10:00", title: "圣地亚哥大教堂", desc: "参观 1.5h", lat: 42.8806, lng: -8.5447, category: "景点", intro: "朝圣之路终点与香薰炉摆动仪式", rating: 4.8, tags: ["教堂"] },
        ],
      },
    ],
  },
  {
    key: "deGermany",
    name: "德国",
    cover: "map",
    date: "2026.07.01 — 07.04",
    defaultDays: 4,
    aliases: ["柏林", "慕尼黑", "德国", "莱茵", "新天鹅堡"],
    days: [
      {
        label: "Day 1",
        route: "柏林",
        spots: [
          { id: "", time: "09:00", title: "勃兰登堡门", desc: "游览 1h", lat: 52.5163, lng: 13.3777, category: "景点", intro: "统一德国的象征性地标", rating: 4.7, tags: ["地标"] },
          { id: "", time: "11:00", title: "国会大厦穹顶", desc: "预约参观 1.5h", lat: 52.5186, lng: 13.3761, category: "景点", intro: "诺曼·福斯特玻璃穹顶俯瞰柏林", rating: 4.8, tags: ["建筑"] },
        ],
      },
      {
        label: "Day 2",
        route: "柏林博物 · 东边画廊",
        spots: [
          { id: "", time: "10:00", title: "博物馆岛", desc: "任选馆 3h", lat: 52.5169, lng: 13.4016, category: "景点", intro: "佩加蒙祭坛与古埃及馆", rating: 4.8, tags: ["博物馆"] },
          { id: "", time: "15:00", title: "东边画廊", desc: "漫步 1h", lat: 52.5055, lng: 13.4445, category: "景点", intro: "《兄弟之吻》柏林墙壁画", rating: 4.5, tags: ["历史"] },
        ],
      },
      {
        label: "Day 3",
        route: "慕尼黑",
        spots: [
          { id: "", time: "10:00", title: "玛丽恩广场与新市政厅", desc: "游览 1.5h", lat: 48.1372, lng: 11.5755, category: "景点", intro: "木偶钟表演与巴伐利亚心脏", rating: 4.6, tags: ["广场"] },
          { id: "", time: "14:00", title: "英国花园", desc: "散步 2h", lat: 48.1646, lng: 11.6055, category: "景点", intro: "城市公园内冲浪河与人面溪", rating: 4.7, tags: ["公园"] },
        ],
      },
      {
        label: "Day 4",
        route: "新天鹅堡",
        spots: [
          { id: "", time: "09:00", title: "新天鹅堡", desc: "参观 3h", lat: 47.5576, lng: 10.7498, category: "景点", intro: "巴伐利亚童话城堡与阿尔卑斯背景", rating: 4.8, price: "€15", tags: ["城堡"] },
        ],
      },
    ],
  },
  {
    key: "chSwiss",
    name: "瑞士",
    cover: "france",
    date: "2026.08.01 — 08.04",
    defaultDays: 4,
    aliases: ["瑞士", "苏黎世", "琉森", "少女峰", "因特拉肯"],
    days: [
      {
        label: "Day 1",
        route: "苏黎世",
        spots: [
          { id: "", time: "10:00", title: "苏黎世老城与林登霍夫", desc: "散步 2h", lat: 47.3713, lng: 8.5419, category: "景点", intro: "利马特河与双塔大教堂天际线", rating: 4.6, tags: ["老城"] },
        ],
      },
      {
        label: "Day 2",
        route: "卢塞恩",
        spots: [
          { id: "", time: "09:00", title: "卡佩尔廊桥", desc: "游览 1h", lat: 47.0516, lng: 8.3077, category: "景点", intro: "欧洲最古老木结构廊桥之一", rating: 4.7, tags: ["地标"] },
          { id: "", time: "12:00", title: "卢塞恩湖游船", desc: "2h", lat: 47.0503, lng: 8.3115, category: "景点", intro: "皮拉图斯山与湖水倒影", rating: 4.6, tags: ["湖泊"] },
        ],
      },
      {
        label: "Day 3",
        route: "少女峰地区",
        spots: [
          { id: "", time: "09:00", title: "劳特布龙嫩山谷", desc: "观景 2h", lat: 46.5934, lng: 7.9082, category: "景点", intro: "72条瀑布峭壁村落", rating: 4.9, tags: ["自然"] },
          { id: "", time: "13:00", title: "格林德瓦梦幻山坡", desc: "徒步 2h", lat: 46.6239, lng: 8.0367, category: "景点", intro: "艾格峰北壁下的木屋草坡", rating: 4.9, tags: ["徒步"] },
        ],
      },
      {
        label: "Day 4",
        route: "采尔马特",
        spots: [
          { id: "", time: "10:00", title: "戈尔内格拉特观景台", desc: "齿轨火车 3h", lat: 45.9835, lng: 7.7859, category: "景点", intro: "马特洪峰经典三角倒影", rating: 4.9, tags: ["雪山"] },
        ],
      },
    ],
  },
  {
    key: "sgCity",
    name: "新加坡",
    cover: "thailand",
    date: "2026.02.01 — 02.03",
    defaultDays: 3,
    aliases: ["新加坡", "singapore", "圣淘沙", "狮城"],
    days: [
      {
        label: "Day 1",
        route: "滨海湾",
        spots: [
          { id: "", time: "10:00", title: "滨海湾花园", desc: "游览 2h", lat: 1.2816, lng: 103.8636, category: "景点", intro: "超级树与冷室云雾林", rating: 4.8, tags: ["花园"] },
          { id: "", time: "15:00", title: "鱼尾狮公园", desc: "拍照 45min", lat: 1.2868, lng: 103.8545, category: "景点", intro: "新加坡国家象征喷泉", rating: 4.5, tags: ["地标"] },
        ],
      },
      {
        label: "Day 2",
        route: "多元文化区",
        spots: [
          { id: "", time: "09:00", title: "牛车水", desc: "美食逛街 2h", lat: 1.2839, lng: 103.844, category: "景点", intro: "百年店屋与海南鸡饭集散地", rating: 4.5, tags: ["美食"] },
          { id: "", time: "14:00", title: "小印度", desc: "游览 1.5h", lat: 1.3066, lng: 103.8517, category: "景点", intro: "维拉玛卡里曼庙与飘香咖喱", rating: 4.4, tags: ["文化"] },
        ],
      },
      {
        label: "Day 3",
        route: "圣淘沙",
        spots: [
          { id: "", time: "10:00", title: "环球影城新加坡", desc: "园区 5h", lat: 1.254, lng: 103.8239, category: "景点", intro: "东南亚唯一环球影城", rating: 4.7, tags: ["主题公园"] },
        ],
      },
    ],
  },
  {
    key: "myKl",
    name: "马来西亚",
    cover: "thailand",
    date: "2026.03.01 — 03.04",
    defaultDays: 4,
    aliases: ["吉隆坡", "马来西亚", "槟城", "沙巴", "兰卡威"],
    days: [
      {
        label: "Day 1",
        route: "吉隆坡",
        spots: [
          { id: "", time: "10:00", title: "双子塔", desc: "登塔 2h", lat: 3.1579, lng: 101.7118, category: "景点", intro: "452米钢结构双塔与空中桥", rating: 4.7, tags: ["地标"] },
          { id: "", time: "15:00", title: "独立广场", desc: "游览 1h", lat: 3.1489, lng: 101.694, category: "景点", intro: "殖民建筑与苏丹阿都沙末大厦", rating: 4.4, tags: ["历史"] },
        ],
      },
      {
        label: "Day 2",
        route: "黑风洞 · 云顶",
        spots: [
          { id: "", time: "09:00", title: "黑风洞阶梯", desc: "参观 2h", lat: 3.2385, lng: 101.6839, category: "景点", intro: "彩虹梯与石灰岩印度庙洞", rating: 4.6, tags: ["寺庙"] },
        ],
      },
      {
        label: "Day 3",
        route: "槟城乔治市",
        spots: [
          { id: "", time: "10:00", title: "乔治市壁画街", desc: "散步 2h", lat: 5.4141, lng: 100.3297, category: "景点", intro: "街头艺术与传统店屋", rating: 4.7, tags: ["街区"] },
        ],
      },
      {
        label: "Day 4",
        route: "沙巴亚庇",
        spots: [
          { id: "", time: "16:00", title: "丹绒亚路海滩日落", desc: "1.5h", lat: 5.9373, lng: 116.0476, category: "景点", intro: "全球前列的火烧云海滩", rating: 4.8, tags: ["日落"] },
        ],
      },
    ],
  },
  {
    key: "vnHanoi",
    name: "越南",
    cover: "thailand",
    date: "2026.01.10 — 01.12",
    defaultDays: 3,
    aliases: ["越南", "河内", "下龙湾", "会安", "胡志明"],
    days: [
      {
        label: "Day 1",
        route: "河内老城",
        spots: [
          { id: "", time: "09:00", title: "还剑湖 · 三十六行街", desc: "漫步 2h", lat: 21.0287, lng: 105.852, category: "景点", intro: "摩托与咖啡共存的千年商街", rating: 4.5, tags: ["老城"] },
          { id: "", time: "14:00", title: "胡志明纪念堂区域", desc: "参观 2h", lat: 21.0369, lng: 105.8347, category: "景点", intro: "巴亭广场与一柱寺", rating: 4.4, tags: ["历史"] },
        ],
      },
      {
        label: "Day 2",
        route: "下龙湾",
        spots: [
          { id: "", time: "08:00", title: "下龙湾一日游船", desc: "6h", lat: 20.9101, lng: 107.1839, category: "景点", intro: "千座石灰岩岛峰与溶洞", rating: 4.8, tags: ["游船"] },
        ],
      },
      {
        label: "Day 3",
        route: "会安 · 古城",
        spots: [
          { id: "", time: "10:00", title: "会安古镇", desc: "灯笼夜景 3h", lat: 15.8801, lng: 108.338, category: "景点", intro: "中日葡混血世界遗产老街", rating: 4.8, tags: ["古镇"] },
        ],
      },
    ],
  },
  {
    key: "idBali",
    name: "印度尼西亚",
    cover: "thailand",
    date: "2026.04.10 — 04.14",
    defaultDays: 5,
    aliases: ["巴厘岛", "印尼", "乌布", "日惹", "科莫多"],
    days: [
      {
        label: "Day 1",
        route: "乌布",
        spots: [
          { id: "", time: "09:00", title: "圣猴森林公园", desc: "漫步 2h", lat: -8.5193, lng: 115.2592, category: "景点", intro: "长尾猕猴与热带雨林", rating: 4.6, tags: ["自然"] },
          { id: "", time: "14:00", title: "乌布皇宫与市集", desc: "2h", lat: -8.5066, lng: 115.2625, category: "景点", intro: "巴厘传统舞蹈夜场起点", rating: 4.4, tags: ["文化"] },
        ],
      },
      {
        label: "Day 2",
        route: "梯田 · 圣泉寺",
        spots: [
          { id: "", time: "08:00", title: "德格拉朗梯田", desc: "观景 2h", lat: -8.4354, lng: 115.28, category: "景点", intro: "椰林与曲线稻田", rating: 4.7, tags: ["梯田"] },
          { id: "", time: "12:00", title: "圣泉寺", desc: "参观 1.5h", lat: -8.4152, lng: 115.3166, category: "景点", intro: "沐浴圣水的印度教寺庙", rating: 4.6, tags: ["寺庙"] },
        ],
      },
      {
        label: "Day 3",
        route: "水神庙 · 北部",
        spots: [
          { id: "", time: "10:00", title: "布拉坦湖水神庙", desc: "参观 1.5h", lat: -8.2752, lng: 115.1663, category: "景点", intro: "倒影在火山湖中的 iconic 门塔", rating: 4.8, tags: ["寺庙"] },
        ],
      },
      {
        label: "Day 4",
        route: "南部海岸",
        spots: [
          { id: "", time: "09:00", title: "乌鲁瓦图断崖神庙", desc: "游览 2h", lat: -8.8151, lng: 115.0884, category: "景点", intro: "印度洋绝壁与克差火舞", rating: 4.8, tags: ["海岸"] },
          { id: "", time: "15:00", title: "水明漾海滩", desc: "日落 2h", lat: -8.6844, lng: 115.1389, category: "景点", intro: "冲浪与精品店海滩区", rating: 4.6, tags: ["海滩"] },
        ],
      },
      {
        label: "Day 5",
        route: "日惹",
        spots: [
          { id: "", time: "06:00", title: "婆罗浮屠日出", desc: "参观 3h", lat: -7.6079, lng: 110.2038, category: "景点", intro: "世界最大佛教遗址之一", rating: 4.9, tags: ["世界遗产"] },
        ],
      },
    ],
  },
  {
    key: "caCanada",
    name: "加拿大",
    cover: "map",
    date: "2026.07.10 — 07.14",
    defaultDays: 5,
    aliases: ["加拿大", "温哥华", "班夫", "多伦多", "魁北克"],
    days: [
      {
        label: "Day 1",
        route: "温哥华",
        spots: [
          { id: "", time: "09:00", title: "史丹利公园", desc: "环岛骑行 3h", lat: 49.3043, lng: -123.1443, category: "景点", intro: "北美最大城市公园与海堤步道", rating: 4.8, tags: ["公园"] },
        ],
      },
      {
        label: "Day 2",
        route: "温哥华 · 吊桥",
        spots: [
          { id: "", time: "10:00", title: "卡皮拉诺吊桥公园", desc: "游览 3h", lat: 49.3429, lng: -123.1149, category: "景点", intro: "雨林树梢步道与峡谷悬桥", rating: 4.6, price: "CAD65", tags: ["自然"] },
        ],
      },
      {
        label: "Day 3",
        route: "班夫镇",
        spots: [
          { id: "", time: "09:00", title: "班夫小镇与弓河瀑布", desc: "游览 2h", lat: 51.1784, lng: -115.566, category: "景点", intro: "落基山脉门户与温泉", rating: 4.7, tags: ["小镇"] },
          { id: "", time: "14:00", title: "硫磺山缆车", desc: "观景 2h", lat: 51.1447, lng: -115.5583, category: "景点", intro: "360度班夫与加拿大落基", rating: 4.8, tags: ["观景"] },
        ],
      },
      {
        label: "Day 4",
        route: "露易丝湖",
        spots: [
          { id: "", time: "09:00", title: "露易丝湖环湖", desc: "徒步 3h", lat: 51.4254, lng: -116.1773, category: "景点", intro: "维多利亚冰川碧湖水色", rating: 4.9, tags: ["湖泊"] },
        ],
      },
      {
        label: "Day 5",
        route: "多伦多 · 尼亚加拉",
        spots: [
          { id: "", time: "10:00", title: "尼亚加拉大瀑布", desc: "游船 3h", lat: 43.0828, lng: -79.0742, category: "景点", intro: "美加边界雷鸣瀑布", rating: 4.9, tags: ["瀑布"] },
          { id: "", time: "16:00", title: "加拿大国家电视塔", desc: "观景 1h", lat: 43.6426, lng: -79.3871, category: "景点", intro: "多伦多天际线玻璃地板", rating: 4.6, tags: ["观景"] },
        ],
      },
    ],
  },
  {
    key: "nzSouth",
    name: "新西兰",
    cover: "map",
    date: "2026.12.01 — 12.07",
    defaultDays: 7,
    aliases: ["新西兰", "皇后镇", "南岛", "奥克兰", "米尔福德"],
    days: [
      {
        label: "Day 1",
        route: "奥克兰",
        spots: [
          { id: "", time: "10:00", title: "天空塔", desc: "观景 1.5h", lat: -36.8485, lng: 174.7633, category: "景点", intro: "北岛最大城与怀特玛塔港景", rating: 4.5, tags: ["地标"] },
        ],
      },
      {
        label: "Day 2",
        route: "罗托鲁瓦",
        spots: [
          { id: "", time: "09:00", title: "怀奥塔普地热公园", desc: "游览 2h", lat: -38.3093, lng: 176.33, category: "景点", intro: "香槟池与五彩地热奇观", rating: 4.7, tags: ["地热"] },
        ],
      },
      {
        label: "Day 3",
        route: "惠灵顿",
        spots: [
          { id: "", time: "11:00", title: "蒂帕帕国家博物馆", desc: "2.5h", lat: -41.2841, lng: 174.7787, category: "景点", intro: "新西兰故事互动展厅", rating: 4.8, tags: ["博物馆"] },
        ],
      },
      {
        label: "Day 4",
        route: "基督城 · 特卡波",
        spots: [
          { id: "", time: "15:00", title: "好牧羊人教堂", desc: "星空 2h", lat: -44.0035, lng: 170.48, category: "景点", intro: "特卡波湖与南阿尔卑斯金门框景", rating: 4.9, tags: ["星空"] },
        ],
      },
      {
        label: "Day 5",
        route: "皇后镇",
        spots: [
          { id: "", time: "09:00", title: "天际缆车", desc: "2h", lat: -45.0108, lng: 168.6478, category: "景点", intro: "俯瞰瓦卡蒂普湖与卓越山", rating: 4.8, tags: ["观景"] },
          { id: "", time: "14:00", title: "蒸汽船厄恩斯劳", desc: "湖区巡航 3h", lat: -45.04, lng: 168.65, category: "景点", intro: "百年燃煤船与高山牧场", rating: 4.6, tags: ["游船"] },
        ],
      },
      {
        label: "Day 6",
        route: "米尔福德峡湾",
        spots: [
          { id: "", time: "08:00", title: "米尔福德峡湾游船", desc: "一日 8h", lat: -44.6414, lng: 167.8974, category: "景点", intro: "峡湾瀑布与海狮", rating: 4.9, tags: ["峡湾"] },
        ],
      },
      {
        label: "Day 7",
        route: "玛塔玛塔",
        spots: [
          { id: "", time: "10:00", title: "霍比特人村", desc: "导览 2h", lat: -37.8721, lng: 175.6819, category: "景点", intro: "电影布景袋底洞与绿龙酒馆", rating: 4.8, tags: ["影视"] },
        ],
      },
    ],
  },
  {
    key: "egCairo",
    name: "埃及",
    cover: "map",
    date: "2026.10.01 — 10.04",
    defaultDays: 4,
    aliases: ["埃及", "开罗", "卢克索", "金字塔", "尼罗河"],
    days: [
      {
        label: "Day 1",
        route: "吉萨",
        spots: [
          { id: "", time: "08:00", title: "吉萨金字塔群", desc: "参观 3h", lat: 29.9792, lng: 31.1342, category: "景点", intro: "胡夫金字塔与狮身人面像", rating: 4.9, tags: ["世界遗产"] },
        ],
      },
      {
        label: "Day 2",
        route: "开罗博物馆",
        spots: [
          { id: "", time: "10:00", title: "埃及博物馆", desc: "参观 3h", lat: 30.0478, lng: 31.2336, category: "景点", intro: "图坦卡蒙黄金面具", rating: 4.8, tags: ["博物馆"] },
          { id: "", time: "15:00", title: "哈利利集市", desc: "逛街 2h", lat: 30.0474, lng: 31.2624, category: "购物", intro: "中世纪商队驿站与香料铺", rating: 4.5, tags: ["集市"] },
        ],
      },
      {
        label: "Day 3",
        route: "卢克索",
        spots: [
          { id: "", time: "06:00", title: "热气球帝王谷", desc: "日出 3h", lat: 25.7402, lng: 32.6014, category: "景点", intro: "尼罗河东岸俯瞰神庙与沙漠", rating: 4.9, tags: ["热气球"] },
          { id: "", time: "11:00", title: "卢克索神庙", desc: "参观 2h", lat: 25.6995, lng: 32.6391, category: "景点", intro: "拉美西斯巨像与方尖碑", rating: 4.7, tags: ["神庙"] },
        ],
      },
      {
        label: "Day 4",
        route: "尼罗河 · 阿斯旺",
        spots: [
          { id: "", time: "09:00", title: "菲莱神庙", desc: "乘船参观 2h", lat: 24.0253, lng: 32.8884, category: "景点", intro: "托勒密时期伊西斯神庙与搬迁史诗", rating: 4.8, tags: ["神庙"] },
        ],
      },
    ],
  },
  {
    key: "trTurkey",
    name: "土耳其",
    cover: "map",
    date: "2026.05.20 — 05.25",
    defaultDays: 6,
    aliases: ["土耳其", "伊斯坦布尔", "卡帕多西亚", "棉花堡"],
    days: [
      {
        label: "Day 1",
        route: "伊斯坦布尔旧城区",
        spots: [
          { id: "", time: "09:00", title: "圣索菲亚大教堂", desc: "参观 1.5h", lat: 41.0086, lng: 28.9802, category: "景点", intro: "拜占庭穹顶与奥斯曼书法共存", rating: 4.9, tags: ["世界遗产"] },
          { id: "", time: "11:30", title: "蓝色清真寺", desc: "参观 1h", lat: 41.0054, lng: 28.9768, category: "景点", intro: "六座宣礼塔与伊兹尼蓝瓷砖", rating: 4.8, tags: ["清真寺"] },
        ],
      },
      {
        label: "Day 2",
        route: "博斯普鲁斯",
        spots: [
          { id: "", time: "10:00", title: "大巴扎", desc: "购物 2h", lat: 41.0107, lng: 28.968, category: "购物", intro: "四千店铺穹顶集市", rating: 4.5, tags: ["集市"] },
          { id: "", time: "14:00", title: "多尔玛巴赫切宫", desc: "参观 2h", lat: 41.0392, lng: 29.0, category: "景点", intro: "海峡边巴洛克皇宫", rating: 4.7, tags: ["宫殿"] },
        ],
      },
      {
        label: "Day 3",
        route: "王子岛 / 新城区",
        spots: [
          { id: "", time: "10:00", title: "独立大街", desc: "逛街 2h", lat: 41.0351, lng: 28.9833, category: "购物", intro: "红色缆车与欧式拱廊", rating: 4.5, tags: ["街区"] },
        ],
      },
      {
        label: "Day 4",
        route: "卡帕多西亚",
        spots: [
          { id: "", time: "05:30", title: "格雷梅热气球", desc: "日出 3h", lat: 38.6431, lng: 34.8286, category: "景点", intro: "奇石烟囱与玫瑰谷日出", rating: 4.9, tags: ["热气球"] },
          { id: "", time: "11:00", title: "格雷梅露天博物馆", desc: "参观 2h", lat: 38.6388, lng: 34.834, category: "景点", intro: "岩凿教堂拜占庭湿壁画", rating: 4.7, tags: ["古迹"] },
        ],
      },
      {
        label: "Day 5",
        route: "棉花堡 · 希拉波利斯",
        spots: [
          { id: "", time: "09:00", title: "棉花堡钙华梯田", desc: "游览 3h", lat: 37.925, lng: 29.1209, category: "景点", intro: "温泉沉积白色梯田", rating: 4.7, tags: ["自然"] },
        ],
      },
      {
        label: "Day 6",
        route: "以弗所",
        spots: [
          { id: "", time: "09:00", title: "以弗所古城", desc: "参观 3h", lat: 37.9398, lng: 27.3412, category: "景点", intro: "塞尔苏斯图书馆与罗马大道", rating: 4.9, tags: ["古迹"] },
        ],
      },
    ],
  },
];

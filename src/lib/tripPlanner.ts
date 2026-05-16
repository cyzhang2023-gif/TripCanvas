import type {
  Day,
  ExploreRoute,
  ImportJob,
  ImportPayload,
  PoiCategory,
  RouteSourceReference,
  SourceKind,
  Spot,
  Trip,
} from "./tripTypes";
import { exploreRegionProfiles } from "./exploreRegionProfiles";
import { extraExploreDB } from "./extraRoutes";

const times = ["09:00", "10:00", "11:30", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00"];
const importSteps = ["读取攻略来源", "提取地点与偏好", "合并相邻区域", "生成每日路线"];

type Profile = {
  key: string;
  name: string;
  cover: Trip["cover"];
  date: string;
  defaultDays: number;
  aliases: string[];
  days: Omit<Day, "id">[];
};

const profiles: Profile[] = [
  {
    key: "tokyo",
    name: "东京",
    cover: "tokyo",
    date: "2026.05.18 — 05.22",
    defaultDays: 5,
    aliases: ["东京", "tokyo", "新宿", "涩谷", "浅草", "上野", "原宿"],
    days: [
      {
        label: "Day 1",
        route: "新宿 · 涩谷",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "新宿御苑",
            desc: "游览 1.5h",
            lat: 35.6852,
            lng: 139.71,
            category: "景点",
            intro: "东京最大的庭园之一，春季有1100棵樱花树盛开，融合了日式、英式、法式三种庭园风格",
            rating: 4.7,
            tags: ["赏樱", "散步"],
          },
          {
            id: "",
            time: "11:00",
            title: "一兰拉面 新宿店",
            desc: "午餐 40min",
            lat: 35.6934,
            lng: 139.7037,
            category: "美食",
            intro: "博多豚骨拉面名店，独创味集中系统，可自选面硬度、油量、蒜量",
            rating: 4.5,
            price: "¥980",
            tags: ["拉面", "排队名店"],
          },
          {
            id: "",
            time: "13:00",
            title: "涩谷十字路口",
            desc: "拍照 30min",
            lat: 35.6595,
            lng: 139.7004,
            category: "景点",
            intro: "世界最繁忙的十字路口，每次绿灯有多达3000人同时过马路，是东京的标志性场景",
            rating: 4.6,
            tags: ["地标", "拍照"],
          },
          {
            id: "",
            time: "14:00",
            title: "涩谷 PARCO",
            desc: "购物 2h",
            lat: 35.6618,
            lng: 139.6973,
            category: "购物",
            intro: "涩谷地标性商场，汇集任天堂官方商店、潮牌、设计师品牌和动漫周边",
            rating: 4.3,
            tags: ["潮牌", "任天堂"],
          },
          {
            id: "",
            time: "17:00",
            title: "SHIBUYA SKY",
            desc: "日落观景 1h",
            lat: 35.6584,
            lng: 139.7022,
            category: "景点",
            intro: "涩谷Scramble Square顶层360度全景展望台，海拔229米，天气好可远眺富士山",
            rating: 4.8,
            price: "¥2000",
            tags: ["观景台", "日落"],
          },
          {
            id: "",
            time: "19:00",
            title: "东京柏悦酒店",
            desc: "入住",
            lat: 35.6857,
            lng: 139.6905,
            category: "住宿",
            intro: "位于新宿公园塔41-52层，可俯瞰新宿御苑和富士山，《迷失东京》取景地",
            rating: 4.9,
            price: "¥3500/晚",
            tags: ["五星", "景观房"],
          },
        ],
      },
      {
        label: "Day 2",
        route: "原宿 · 明治神宫",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "明治神宫",
            desc: "散步参拜 1.5h",
            lat: 35.6764,
            lng: 139.6993,
            category: "景点",
            intro: "供奉明治天皇的神社，被70万棵树木的常绿森林环绕，是闹市中的宁静绿洲",
            rating: 4.7,
            tags: ["神社", "森林"],
          },
          {
            id: "",
            time: "11:00",
            title: "原宿竹下通",
            desc: "逛街 1.5h",
            lat: 35.6708,
            lng: 139.7036,
            category: "购物",
            intro: "东京青年潮流文化圣地，350米长的步行街汇集了各种古着店、甜品店和特色小店",
            rating: 4.2,
            tags: ["潮流", "古着"],
          },
          {
            id: "",
            time: "12:30",
            title: "AFURI 阿夫利",
            desc: "午餐 40min",
            lat: 35.6697,
            lng: 139.7048,
            category: "美食",
            intro: "柚子盐拉面专门店，清爽汤底配合特制柚子酱，是拉面界的清新派代表",
            rating: 4.4,
            price: "¥1100",
            tags: ["柚子拉面", "网红店"],
          },
          {
            id: "",
            time: "14:00",
            title: "表参道",
            desc: "散步购物 2h",
            lat: 35.6654,
            lng: 139.7107,
            category: "购物",
            intro: "东京的香榭丽舍大道，两旁是安藤忠雄等大师设计的品牌旗舰店建筑",
            rating: 4.5,
            tags: ["建筑", "奢侈品"],
          },
          {
            id: "",
            time: "17:00",
            title: "bills 表参道",
            desc: "下午茶 1h",
            lat: 35.6651,
            lng: 139.7121,
            category: "美食",
            intro: "来自悉尼的世界第一早餐店，招牌松饼口感绵密如云朵",
            rating: 4.6,
            price: "¥1800",
            tags: ["松饼", "网红"],
          },
        ],
      },
      {
        label: "Day 3",
        route: "浅草 · 上野",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "浅草寺",
            desc: "游览 2h",
            lat: 35.7148,
            lng: 139.7967,
            category: "景点",
            intro:
              "东京最古老的寺庙（公元628年），雷门大灯笼是东京必拍标志，仲见世通有90多家传统小店",
            rating: 4.8,
            tags: ["寺庙", "必去"],
          },
          {
            id: "",
            time: "11:30",
            title: "大黑家天妇罗",
            desc: "午餐 1h",
            lat: 35.7126,
            lng: 139.7953,
            category: "美食",
            intro: "浅草百年老字号（1887年创业），炸虾天妇罗个头巨大溢出碗边，是浅草名物",
            rating: 4.3,
            price: "¥1700",
            tags: ["天妇罗", "百年老店"],
          },
          {
            id: "",
            time: "13:00",
            title: "上野公园",
            desc: "散步 1.5h",
            lat: 35.7156,
            lng: 139.7745,
            category: "景点",
            intro: "东京最大的公园，内有东京国立博物馆、上野动物园和不忍池，春季1200棵樱花绝景",
            rating: 4.5,
            tags: ["公园", "博物馆"],
          },
          {
            id: "",
            time: "15:00",
            title: "阿美横丁",
            desc: "逛市场 1h",
            lat: 35.7107,
            lng: 139.7747,
            category: "购物",
            intro: "上野站旁的平民市场街，400多家店铺售卖海鲜、干货、药妆和服饰，讨价还价的乐趣",
            rating: 4.1,
            tags: ["市场", "药妆"],
          },
          {
            id: "",
            time: "18:00",
            title: "Dormy Inn 上野",
            desc: "入住",
            lat: 35.7113,
            lng: 139.7752,
            category: "住宿",
            intro: "性价比极高的商务酒店，顶楼有免费天然温泉大浴场，每晚提供免费拉面宵夜",
            rating: 4.4,
            price: "¥800/晚",
            tags: ["温泉", "性价比"],
          },
        ],
      },
      {
        label: "Day 4",
        route: "银座 · 台场",
        spots: [
          {
            id: "",
            time: "10:00",
            title: "筑地场外市场",
            desc: "早午餐 1.5h",
            lat: 35.6654,
            lng: 139.7707,
            category: "美食",
            intro: "虽然场内市场搬至丰洲，场外400多家店依然是海鲜天堂，现烤帝王蟹腿和海鲜丼必试",
            rating: 4.6,
            tags: ["海鲜", "市场"],
          },
          {
            id: "",
            time: "12:00",
            title: "银座",
            desc: "购物 2h",
            lat: 35.6719,
            lng: 139.7648,
            category: "购物",
            intro: "东京最高端的商业区，中央通步行者天国、三越百货、GINZA SIX汇集全球顶级品牌",
            rating: 4.5,
            tags: ["奢侈品", "百货"],
          },
          {
            id: "",
            time: "15:00",
            title: "teamLab Borderless",
            desc: "互动艺术 2h",
            lat: 35.6257,
            lng: 139.7712,
            category: "景点",
            intro: "全球最受欢迎的数字艺术美术馆，沉浸式光影空间随步移动变化，每次体验都不同",
            rating: 4.9,
            price: "¥3800",
            tags: ["艺术", "打卡"],
          },
          {
            id: "",
            time: "18:00",
            title: "鮨さいとう 银座本店",
            desc: "晚餐 1.5h",
            lat: 35.6701,
            lng: 139.7639,
            category: "美食",
            intro: "米其林三星寿司，主厨在食客面前现捏，每一贯都是对新鲜食材的极致呈现",
            rating: 4.8,
            price: "¥15000",
            tags: ["米其林", "寿司"],
          },
        ],
      },
      {
        label: "Day 5",
        route: "秋叶原 · 东京塔",
        spots: [
          {
            id: "",
            time: "10:00",
            title: "秋叶原电器街",
            desc: "逛街 2h",
            lat: 35.7023,
            lng: 139.7745,
            category: "购物",
            intro: "全球最大的动漫和电子产品圣地，从复古游戏到最新手办，宅文化的终极朝圣地",
            rating: 4.3,
            tags: ["动漫", "电子"],
          },
          {
            id: "",
            time: "12:30",
            title: "神田まつや",
            desc: "午餐 40min",
            lat: 35.6975,
            lng: 139.7677,
            category: "美食",
            intro: "明治17年创业的荞麦面老铺，手打荞麦面配合秘传酱汁，是东京人的灵魂美食",
            rating: 4.4,
            price: "¥900",
            tags: ["荞麦面", "老字号"],
          },
          {
            id: "",
            time: "14:00",
            title: "皇居外苑",
            desc: "散步 1h",
            lat: 35.6825,
            lng: 139.7521,
            category: "景点",
            intro: "日本天皇居所的外围庭园，二重桥是经典取景点，护城河和松林构成宁静的都市绿洲",
            rating: 4.3,
            tags: ["皇居", "散步"],
          },
          {
            id: "",
            time: "16:00",
            title: "东京塔",
            desc: "观光 1.5h",
            lat: 35.6586,
            lng: 139.7454,
            category: "景点",
            intro: "333米高的红色铁塔，比埃菲尔铁塔高13米，顶层展望台可360度俯瞰东京全景",
            rating: 4.6,
            price: "¥1200",
            tags: ["地标", "夜景"],
          },
          {
            id: "",
            time: "19:00",
            title: "芝公园烤肉六歌仙",
            desc: "告别晚餐 2h",
            lat: 35.6565,
            lng: 139.7471,
            category: "美食",
            intro: "东京塔脚下的人气和牛烤肉店，A5和牛入口即化，边吃边赏东京塔夜景",
            rating: 4.5,
            price: "¥6000",
            tags: ["和牛", "烤肉"],
          },
        ],
      },
    ],
  },
  {
    key: "kyoto",
    name: "京都",
    cover: "japan",
    date: "2026.04.03 — 04.05",
    defaultDays: 3,
    aliases: ["京都", "kyoto", "清水寺", "祇园", "伏见"],
    days: [
      {
        label: "Day 1",
        route: "东山区",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "清水寺",
            desc: "游览 1.5h",
            lat: 34.9949,
            lng: 135.785,
            category: "景点",
            intro: "世界文化遗产，悬空的清水舞台不用一根钉子建成，春秋季夜间点灯更是绝景",
            rating: 4.8,
            tags: ["世界遗产", "必去"],
          },
          {
            id: "",
            time: "11:00",
            title: "二年坂三年坂",
            desc: "散步 1h",
            lat: 34.998,
            lng: 135.7808,
            category: "购物",
            intro: "保存完好的江户时代石板路，两侧是京都传统町屋商店和手工艺品店",
            rating: 4.5,
            tags: ["古街", "手信"],
          },
          {
            id: "",
            time: "12:30",
            title: "顺正汤豆腐",
            desc: "午餐 1h",
            lat: 34.9962,
            lng: 135.7835,
            category: "美食",
            intro: "百年汤豆腐名店，使用南禅寺水源制作的手工豆腐，口感细嫩如丝",
            rating: 4.3,
            price: "¥3000",
            tags: ["豆腐料理", "百年老店"],
          },
          {
            id: "",
            time: "14:30",
            title: "祇园花见小路",
            desc: "散步 1h",
            lat: 35.0038,
            lng: 135.775,
            category: "景点",
            intro: "京都最著名的花街，傍晚有机会偶遇真正的艺伎匆匆赴宴",
            rating: 4.6,
            tags: ["艺伎", "花街"],
          },
          {
            id: "",
            time: "17:00",
            title: "THE SODOH 东山",
            desc: "晚餐 1.5h",
            lat: 34.9983,
            lng: 135.7803,
            category: "美食",
            intro: "由画家竹内栖凤的旧宅改造，在百年庭园中享用京都法式料理",
            rating: 4.7,
            price: "¥5000",
            tags: ["法餐", "庭园"],
          },
          {
            id: "",
            time: "19:00",
            title: "翠岚豪华精选",
            desc: "入住",
            lat: 35.0156,
            lng: 135.6735,
            category: "住宿",
            intro: "岚山畔的顶级温泉旅馆，每间客房可望保津川溪谷，私汤体验极致",
            rating: 4.9,
            price: "¥5000/晚",
            tags: ["温泉旅馆", "岚山"],
          },
        ],
      },
      {
        label: "Day 2",
        route: "伏见 · 锦市场",
        spots: [
          {
            id: "",
            time: "07:00",
            title: "伏见稻荷大社",
            desc: "千鸟居 2h",
            lat: 34.9671,
            lng: 135.7727,
            category: "景点",
            intro: "万座朱红色鸟居组成绵延4公里的隧道，清晨人少时拍照最佳，是京都人气第一景点",
            rating: 4.9,
            tags: ["鸟居", "清晨"],
          },
          {
            id: "",
            time: "10:00",
            title: "锦市场",
            desc: "逛吃 1.5h",
            lat: 35.005,
            lng: 135.7648,
            category: "美食",
            intro: "京都的厨房，400年历史的食品市场，京渍物、抹茶甜品、烤章鱼丸子边走边吃",
            rating: 4.5,
            tags: ["市场", "小吃"],
          },
          {
            id: "",
            time: "12:00",
            title: "金阁寺",
            desc: "游览 1h",
            lat: 35.0394,
            lng: 135.7292,
            category: "景点",
            intro: "正式名称鹿苑寺，贴满金箔的三层楼阁倒映在镜湖池中，是京都最经典的画面",
            rating: 4.7,
            tags: ["金阁寺", "世界遗产"],
          },
          {
            id: "",
            time: "14:00",
            title: "岚山竹林",
            desc: "散步 1h",
            lat: 35.0173,
            lng: 135.6717,
            category: "景点",
            intro: "高耸的青竹林形成天然隧道，风吹竹叶沙沙作响，被评为日本音风景百选",
            rating: 4.6,
            tags: ["竹林", "散步"],
          },
          {
            id: "",
            time: "16:00",
            title: "% Arabica 岚山",
            desc: "咖啡 30min",
            lat: 35.0148,
            lng: 135.6776,
            category: "美食",
            intro: "全球网红咖啡品牌的发源店，坐在渡月桥畔品一杯拿铁看山水",
            rating: 4.4,
            price: "¥600",
            tags: ["咖啡", "网红"],
          },
        ],
      },
      {
        label: "Day 3",
        route: "南禅寺 · 哲学之道",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "南禅寺",
            desc: "游览 1h",
            lat: 35.0113,
            lng: 135.7937,
            category: "景点",
            intro: "日本禅宗最高寺格，水路阁的红砖拱门是热门取景地，方丈庭园枯山水意境深远",
            rating: 4.6,
            tags: ["禅宗", "水路阁"],
          },
          {
            id: "",
            time: "10:30",
            title: "哲学之道",
            desc: "散步 1h",
            lat: 35.0232,
            lng: 135.7949,
            category: "景点",
            intro: "沿琵琶湖疏水渠的1.5公里石板路，因哲学家西田几多郎每日在此沉思而得名",
            rating: 4.5,
            tags: ["散步", "赏樱"],
          },
          {
            id: "",
            time: "12:00",
            title: "おめん 银阁寺店",
            desc: "午餐 1h",
            lat: 35.0265,
            lng: 135.7937,
            category: "美食",
            intro: "京都乌冬面名店，手打粗面配合七种蔬菜佐料，蘸浓郁味噌汤汁",
            rating: 4.3,
            price: "¥1200",
            tags: ["乌冬面", "京料理"],
          },
          {
            id: "",
            time: "14:00",
            title: "银阁寺",
            desc: "游览 1h",
            lat: 35.027,
            lng: 135.7983,
            category: "景点",
            intro: "与金阁寺并称的世界遗产，银沙滩和向月台的枯山水庭园体现了侘寂之美",
            rating: 4.5,
            tags: ["世界遗产", "侘寂"],
          },
          {
            id: "",
            time: "16:00",
            title: "中村藤吉 本店",
            desc: "抹茶甜品",
            lat: 34.8894,
            lng: 135.8036,
            category: "美食",
            intro: "安政元年创业的宇治抹茶老铺，抹茶冻配白玉团子是京都甜品天花板",
            rating: 4.7,
            price: "¥1500",
            tags: ["抹茶", "甜品"],
          },
        ],
      },
    ],
  },
  {
    key: "seoul",
    name: "首尔",
    cover: "korea",
    date: "2026.06.10 — 06.13",
    defaultDays: 4,
    aliases: ["首尔", "seoul", "明洞", "弘大", "景福宫"],
    days: [
      {
        label: "Day 1",
        route: "景福宫 · 北村",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "景福宫",
            desc: "韩服体验 2h",
            lat: 37.5796,
            lng: 126.977,
            category: "景点",
            intro: "朝鲜王朝正宫，穿韩服可免费入场，勤政殿前的守卫换岗仪式不可错过",
            rating: 4.7,
            tags: ["韩服", "王宫"],
          },
          {
            id: "",
            time: "11:30",
            title: "土俗村参鸡汤",
            desc: "午餐 1h",
            lat: 37.5789,
            lng: 126.9714,
            category: "美食",
            intro: "景福宫旁的排队名店，整只童子鸡塞满糯米人参炖至软烂，是韩国国民补汤",
            rating: 4.5,
            price: "₩16000",
            tags: ["参鸡汤", "排队名店"],
          },
          {
            id: "",
            time: "13:00",
            title: "北村韩屋村",
            desc: "散步 1.5h",
            lat: 37.5826,
            lng: 126.983,
            category: "景点",
            intro: "600年历史的传统韩屋聚落，保留了朝鲜时代的建筑风貌，八景拍照路线是经典",
            rating: 4.4,
            tags: ["韩屋", "拍照"],
          },
          {
            id: "",
            time: "15:00",
            title: "三清洞",
            desc: "逛街咖啡 1.5h",
            lat: 37.5832,
            lng: 126.9818,
            category: "购物",
            intro: "韩屋与现代咖啡馆、画廊混搭的文艺街区，每条小巷都有惊喜",
            rating: 4.3,
            tags: ["文艺", "咖啡"],
          },
          {
            id: "",
            time: "18:00",
            title: "广藏市场",
            desc: "晚餐 1.5h",
            lat: 37.5701,
            lng: 126.9998,
            category: "美食",
            intro: "首尔最古老的传统市场，绿豆煎饼、麻药紫菜包饭和生拌牛肉是三大必吃",
            rating: 4.6,
            tags: ["市场", "小吃"],
          },
          {
            id: "",
            time: "20:00",
            title: "乐天酒店首尔",
            desc: "入住",
            lat: 37.5653,
            lng: 126.981,
            category: "住宿",
            intro: "明洞核心地段，直连乐天百货和免税店，顶层可远眺南山塔",
            rating: 4.5,
            price: "₩200000/晚",
            tags: ["五星", "便利"],
          },
        ],
      },
      {
        label: "Day 2",
        route: "明洞 · 南山塔",
        spots: [
          {
            id: "",
            time: "10:00",
            title: "明洞",
            desc: "购物 2h",
            lat: 37.5638,
            lng: 126.985,
            category: "购物",
            intro: "首尔最热闹的购物街，韩国美妆品牌旗舰店云集，街头小吃摊也是一大看点",
            rating: 4.4,
            tags: ["美妆", "购物"],
          },
          {
            id: "",
            time: "12:30",
            title: "明洞饺子",
            desc: "午餐 40min",
            lat: 37.5636,
            lng: 126.9857,
            category: "美食",
            intro: "米其林必比登推荐，手工刀削面和蒸饺是招牌，性价比极高",
            rating: 4.5,
            price: "₩10000",
            tags: ["刀削面", "米其林"],
          },
          {
            id: "",
            time: "14:00",
            title: "南山塔",
            desc: "观光 2h",
            lat: 37.5512,
            lng: 126.9882,
            category: "景点",
            intro: "首尔地标，海拔480米的观景台可360度俯瞰全城，爱情锁墙是情侣必去",
            rating: 4.6,
            price: "₩16000",
            tags: ["观景台", "地标"],
          },
          {
            id: "",
            time: "17:00",
            title: "梨泰院",
            desc: "逛街 2h",
            lat: 37.5345,
            lng: 126.9946,
            category: "购物",
            intro: "首尔最国际化的街区，独立设计师品牌、古着店和异国餐厅一条街",
            rating: 4.2,
            tags: ["潮流", "古着"],
          },
          {
            id: "",
            time: "19:30",
            title: "姜虎东白丁",
            desc: "烤肉晚餐 1.5h",
            lat: 37.5356,
            lng: 126.993,
            category: "美食",
            intro: "韩国综艺明星姜虎东开的烤肉连锁，厚切五花肉在铁板上滋滋作响",
            rating: 4.4,
            price: "₩18000",
            tags: ["烤肉", "五花肉"],
          },
        ],
      },
      {
        label: "Day 3",
        route: "弘大 · 汉江",
        spots: [
          {
            id: "",
            time: "10:00",
            title: "弘大自由市场",
            desc: "逛街 2h",
            lat: 37.5563,
            lng: 126.9236,
            category: "购物",
            intro: "弘益大学周边的年轻人圣地，独立品牌、街头表演和涂鸦墙构成创意氛围",
            rating: 4.3,
            tags: ["文创", "街头艺术"],
          },
          {
            id: "",
            time: "12:30",
            title: "延南洞",
            desc: "午餐咖啡 1.5h",
            lat: 37.5656,
            lng: 126.9249,
            category: "美食",
            intro: "弘大旁的隐藏美食街区，经理团街沿线遍布韩式brunch店和精品咖啡馆",
            rating: 4.4,
            tags: ["brunch", "咖啡"],
          },
          {
            id: "",
            time: "15:00",
            title: "汝矣岛汉江公园",
            desc: "骑车野餐 2h",
            lat: 37.5283,
            lng: 126.9347,
            category: "景点",
            intro: "首尔人的后花园，租一辆自行车沿江骑行，再点一份炸鸡配啤酒坐在草坪上",
            rating: 4.5,
            tags: ["汉江", "野餐"],
          },
          {
            id: "",
            time: "18:00",
            title: "BHC炸鸡",
            desc: "汉江炸鸡 1h",
            lat: 37.5268,
            lng: 126.932,
            category: "美食",
            intro: "汉江边叫外卖炸鸡是首尔人的仪式感，蜂蜜黄油味是人气第一",
            rating: 4.5,
            price: "₩19000",
            tags: ["炸鸡", "汉江必做"],
          },
        ],
      },
      {
        label: "Day 4",
        route: "江南 · 免税购物",
        spots: [
          {
            id: "",
            time: "10:00",
            title: "COEX MALL",
            desc: "逛街 2h",
            lat: 37.5116,
            lng: 127.0592,
            category: "购物",
            intro: "亚洲最大的地下商场，星空图书馆的巨型书架墙是社交媒体打卡热门",
            rating: 4.4,
            tags: ["商场", "图书馆"],
          },
          {
            id: "",
            time: "12:30",
            title: "松亭排骨",
            desc: "午餐 1h",
            lat: 37.5098,
            lng: 127.0578,
            category: "美食",
            intro: "江南老字号酱牛排骨，腌制48小时的牛肋排入口软嫩，酱香浓郁",
            rating: 4.6,
            price: "₩35000",
            tags: ["牛排骨", "老字号"],
          },
          {
            id: "",
            time: "14:30",
            title: "乐天世界塔",
            desc: "观光 1.5h",
            lat: 37.5126,
            lng: 127.1026,
            category: "景点",
            intro: "555米高的韩国第一高楼，顶层SEOUL SKY观景台有透明玻璃地板，可俯瞰整个首尔",
            rating: 4.7,
            price: "₩29000",
            tags: ["摩天楼", "观景台"],
          },
          {
            id: "",
            time: "17:00",
            title: "新罗免税店",
            desc: "购物 2h",
            lat: 37.5577,
            lng: 127.0052,
            category: "购物",
            intro: "韩国最顶级免税店，韩妆和大牌价格优势明显，离境前最后扫货站",
            rating: 4.3,
            tags: ["免税", "韩妆"],
          },
        ],
      },
    ],
  },
  {
    key: "bangkok",
    name: "曼谷",
    cover: "thailand",
    date: "2026.07.01 — 07.04",
    defaultDays: 4,
    aliases: ["曼谷", "bangkok", "泰国", "大皇宫", "暹罗"],
    days: [
      {
        label: "Day 1",
        route: "大皇宫 · 湄南河",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "大皇宫",
            desc: "游览 2h",
            lat: 13.75,
            lng: 100.4913,
            category: "景点",
            intro: "泰国最神圣的地标，玉佛寺内供奉翡翠佛像，建筑群金碧辉煌令人叹为观止",
            rating: 4.7,
            price: "฿500",
            tags: ["皇宫", "必去"],
          },
          {
            id: "",
            time: "11:30",
            title: "Pad Thai Thip Samai",
            desc: "午餐",
            lat: 13.7527,
            lng: 100.5045,
            category: "美食",
            intro: "曼谷最有名的Pad Thai店，鸡蛋包裹的炒河粉配虾仁，70年不变的味道",
            rating: 4.6,
            price: "฿100",
            tags: ["泰式炒粉", "老字号"],
          },
          {
            id: "",
            time: "13:30",
            title: "郑王庙",
            desc: "拍日落 1.5h",
            lat: 13.7437,
            lng: 100.4889,
            category: "景点",
            intro: "湄南河西岸的陶瓷塔寺，攀登82米主塔可俯瞰河景，日落时分最壮观",
            rating: 4.6,
            tags: ["日落", "寺庙"],
          },
          {
            id: "",
            time: "17:00",
            title: "Sala Rattanakosin",
            desc: "河畔晚餐 1.5h",
            lat: 13.7464,
            lng: 100.4893,
            category: "美食",
            intro: "正对郑王庙的顶楼餐厅，边品创意泰菜边看寺庙在夕阳中渐变为金色",
            rating: 4.5,
            price: "฿800",
            tags: ["河景", "创意泰菜"],
          },
          {
            id: "",
            time: "19:00",
            title: "华昌遗产酒店",
            desc: "入住",
            lat: 13.7411,
            lng: 100.5064,
            category: "住宿",
            intro: "唐人街百年建筑改造的精品酒店，泳池在天台可看寺庙尖塔，设计感满分",
            rating: 4.6,
            price: "฿3000/晚",
            tags: ["精品酒店", "唐人街"],
          },
        ],
      },
      {
        label: "Day 2",
        route: "暹罗商圈 · 恰图恰",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "恰图恰周末市场",
            desc: "逛市集 2.5h",
            lat: 13.7997,
            lng: 100.5502,
            category: "购物",
            intro: "东南亚最大露天市场，15000个摊位分27个区域，从椰壳灯到设计师品牌应有尽有",
            rating: 4.4,
            tags: ["市场", "淘宝"],
          },
          {
            id: "",
            time: "12:00",
            title: "暹罗商圈",
            desc: "购物午餐 3h",
            lat: 13.7467,
            lng: 100.5348,
            category: "购物",
            intro: "Siam Paragon、Central World等大型商场集群，空调购物天堂",
            rating: 4.3,
            tags: ["商场", "空调"],
          },
          {
            id: "",
            time: "16:00",
            title: "Mango Tango",
            desc: "甜品",
            lat: 13.7459,
            lng: 100.5349,
            category: "美食",
            intro: "曼谷芒果糯米饭网红店，新鲜芒果配椰浆糯米饭是泰国甜品之王",
            rating: 4.3,
            price: "฿180",
            tags: ["芒果糯米饭", "甜品"],
          },
          {
            id: "",
            time: "18:00",
            title: "Nana 夜市",
            desc: "夜市小吃 2h",
            lat: 13.7405,
            lng: 100.5064,
            category: "美食",
            intro: "本地人最爱的街头美食聚集地，烤猪颈肉、青木瓜沙拉和泰式奶茶",
            rating: 4.4,
            tags: ["夜市", "街头美食"],
          },
        ],
      },
    ],
  },
  {
    key: "paris",
    name: "巴黎",
    cover: "france",
    date: "2026.09.12 — 09.15",
    defaultDays: 4,
    aliases: ["巴黎", "paris", "埃菲尔", "卢浮宫", "塞纳"],
    days: [
      {
        label: "Day 1",
        route: "卢浮宫 · 塞纳河",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "卢浮宫",
            desc: "重点展厅 3h",
            lat: 48.8606,
            lng: 2.3376,
            category: "景点",
            intro: "世界四大博物馆之首，蒙娜丽莎、胜利女神、断臂维纳斯三大镇馆之宝必看",
            rating: 4.9,
            price: "€17",
            tags: ["博物馆", "必去"],
          },
          {
            id: "",
            time: "12:30",
            title: "Café Marly",
            desc: "午餐 1h",
            lat: 48.8615,
            lng: 2.3361,
            category: "美食",
            intro: "卢浮宫拱廊下的经典咖啡馆，坐在露台上一边用餐一边看贝聿铭的玻璃金字塔",
            rating: 4.4,
            price: "€30",
            tags: ["露台", "景观"],
          },
          {
            id: "",
            time: "14:30",
            title: "塞纳河左岸",
            desc: "散步 1.5h",
            lat: 48.8566,
            lng: 2.3522,
            category: "景点",
            intro: "从卢浮宫沿河漫步至圣日耳曼，沿途经过莎士比亚书店、圣母院和旧书摊",
            rating: 4.6,
            tags: ["散步", "左岸"],
          },
          {
            id: "",
            time: "17:00",
            title: "花神咖啡馆",
            desc: "下午茶 1h",
            lat: 48.8541,
            lng: 2.3325,
            category: "美食",
            intro: "存在主义的摇篮，萨特和波伏瓦的御用咖啡馆，点一杯热巧克力感受文学氛围",
            rating: 4.5,
            price: "€15",
            tags: ["文学", "历史咖啡馆"],
          },
          {
            id: "",
            time: "19:00",
            title: "Le Cinq",
            desc: "法餐晚宴 2h",
            lat: 48.8696,
            lng: 2.3014,
            category: "美食",
            intro: "四季酒店内的米其林三星餐厅，经典法式料理的极致演绎",
            rating: 4.8,
            price: "€200",
            tags: ["米其林三星", "法餐"],
          },
          {
            id: "",
            time: "21:30",
            title: "巴黎四季酒店",
            desc: "入住",
            lat: 48.8696,
            lng: 2.3014,
            category: "住宿",
            intro: "香榭丽舍大道旁的宫殿级酒店，奥斯曼风格建筑内是极致奢华与舒适",
            rating: 4.9,
            price: "€800/晚",
            tags: ["宫殿酒店", "香榭丽舍"],
          },
        ],
      },
      {
        label: "Day 2",
        route: "埃菲尔铁塔 · 蒙马特",
        spots: [
          {
            id: "",
            time: "09:00",
            title: "埃菲尔铁塔",
            desc: "登塔观光 2h",
            lat: 48.8584,
            lng: 2.2945,
            category: "景点",
            intro: "巴黎永恒的象征，324米高的铁塔二层观景台视野最佳，夜间整点闪灯5分钟",
            rating: 4.8,
            price: "€26",
            tags: ["地标", "必去"],
          },
          {
            id: "",
            time: "12:00",
            title: "Café de l'Homme",
            desc: "午餐 1h",
            lat: 48.8622,
            lng: 2.2877,
            category: "美食",
            intro: "夏约宫内正对铁塔的餐厅，露台是拍摄铁塔最佳角度之一",
            rating: 4.4,
            price: "€35",
            tags: ["铁塔景观", "露台"],
          },
          {
            id: "",
            time: "14:00",
            title: "蒙马特高地",
            desc: "散步 2h",
            lat: 48.8867,
            lng: 2.3431,
            category: "景点",
            intro: "巴黎最浪漫的山丘，圣心堂前的台阶可俯瞰全城，小丘广场有画家现场作画",
            rating: 4.7,
            tags: ["浪漫", "艺术"],
          },
          {
            id: "",
            time: "17:00",
            title: "玛黑区",
            desc: "逛街 2h",
            lat: 48.859,
            lng: 2.362,
            category: "购物",
            intro: "巴黎最潮的街区，独立买手店、vintage店和画廊密布在中世纪的窄巷中",
            rating: 4.5,
            tags: ["潮流", "vintage"],
          },
          {
            id: "",
            time: "19:30",
            title: "Breizh Café",
            desc: "晚餐 1h",
            lat: 48.8597,
            lng: 2.3607,
            category: "美食",
            intro: "巴黎最佳可丽饼店，荞麦饼皮配各种精选食材，是法式街头美食的升级版",
            rating: 4.5,
            price: "€18",
            tags: ["可丽饼", "玛黑区"],
          },
        ],
      },
    ],
  },
  {
    key: "usaNyc",
    name: "纽约",
    cover: "map",
    date: "2026.07.01 — 07.03",
    defaultDays: 3,
    aliases: ["纽约", "new york", "nyc", "曼哈顿"],
    days: [
      {
        label: "Day 1",
        route: "曼哈顿中城",
        spots: [
          { id: "", time: "09:00", title: "中央公园", desc: "漫步 2h", lat: 40.7829, lng: -73.9654, category: "景点", intro: "843英亩城市绿肺，可租船游湖或参观动物园", rating: 4.8, tags: ["公园", "必去"] },
          { id: "", time: "11:15", title: "Levain Bakery Upper West Side", desc: "咖啡甜点 45min", lat: 40.7799, lng: -73.9803, category: "美食", intro: "纽约人气曲奇店，适合作为博物馆前的轻补给", rating: 4.6, tags: ["甜点", "咖啡"] },
          { id: "", time: "12:00", title: "大都会艺术博物馆", desc: "参观 2.5h", lat: 40.7794, lng: -73.9632, category: "景点", intro: "世界顶尖艺术博物馆之一，馆藏跨越五千年", rating: 4.9, price: "$30", tags: ["博物馆"] },
          { id: "", time: "14:45", title: "The Shops at Columbus Circle", desc: "购物休息 1h", lat: 40.7686, lng: -73.983, category: "购物", intro: "中央公园南侧的综合商场，餐饮、精品店和室内休息点集中", rating: 4.4, tags: ["购物", "休息"] },
          { id: "", time: "15:30", title: "时报广场", desc: "打卡 45min", lat: 40.758, lng: -73.9855, category: "景点", intro: "霓虹闪烁的世界十字路口，百老汇剧院区核心", rating: 4.5, tags: ["地标"] },
          { id: "", time: "17:30", title: "帝国大厦观景台", desc: "登顶 1h", lat: 40.7484, lng: -73.9857, category: "景点", intro: "经典 Art Deco 摩天楼，86层室外观景台俯瞰曼哈顿", rating: 4.7, price: "$44", tags: ["观景"] },
          { id: "", time: "20:30", title: "The Plaza Hotel", desc: "入住建议", lat: 40.7645, lng: -73.9745, category: "住宿", intro: "中央公园南侧经典酒店，适合高预算或作为同区域住宿参考", rating: 4.6, tags: ["酒店", "中城"] },
        ],
      },
      {
        label: "Day 2",
        route: "下城 · 布鲁克林",
        spots: [
          { id: "", time: "09:00", title: "自由女神环岛游船", desc: "游船 1.5h", lat: 40.6892, lng: -74.0445, category: "景点", intro: "从海上观赏自由女神与曼哈顿天际线", rating: 4.6, price: "$24", tags: ["游船"] },
          { id: "", time: "11:30", title: "9/11 纪念博物馆", desc: "参观 2h", lat: 40.7115, lng: -74.0132, category: "景点", intro: "在原世贸遗址缅怀与了解当代纽约史", rating: 4.8, price: "$33", tags: ["纪念馆"] },
          { id: "", time: "13:45", title: "Katz's Delicatessen", desc: "午餐 1h", lat: 40.7223, lng: -73.9874, category: "美食", intro: "纽约经典熟牛肉三明治老店，适合下城到布鲁克林前补给", rating: 4.5, tags: ["熟食店", "午餐"] },
          { id: "", time: "14:30", title: "布鲁克林大桥", desc: "步行 1h", lat: 40.7061, lng: -73.9969, category: "景点", intro: "百年悬索桥，漫步至布鲁克林看华尔街天际线", rating: 4.7, tags: ["步行"] },
          { id: "", time: "16:00", title: "Brookfield Place", desc: "购物咖啡 1h", lat: 40.7127, lng: -74.0159, category: "购物", intro: "世贸中心旁高品质购物餐饮空间，适合雨天或换乘休息", rating: 4.5, tags: ["购物", "餐饮"] },
          { id: "", time: "19:00", title: "布鲁克林 Dumbo", desc: "夜景 1h", lat: 40.7033, lng: -73.9881, category: "景点", intro: "鹅卵石街巷与曼哈顿大桥经典拍照机位", rating: 4.6, tags: ["夜景"] },
          { id: "", time: "20:30", title: "1 Hotel Brooklyn Bridge", desc: "入住建议", lat: 40.7022, lng: -73.9956, category: "住宿", intro: "布鲁克林桥公园旁酒店，适合想看曼哈顿夜景的住宿区域参考", rating: 4.6, tags: ["酒店", "夜景"] },
        ],
      },
      {
        label: "Day 3",
        route: "西切尔西 · 高线",
        spots: [
          { id: "", time: "09:30", title: "高线公园", desc: "漫步 1.5h", lat: 40.748, lng: -74.0048, category: "景点", intro: "废弃高架铁路改建的空中花园", rating: 4.7, tags: ["城市设计"] },
          { id: "", time: "11:30", title: "切尔西市场", desc: "午餐 1h", lat: 40.7424, lng: -74.0061, category: "美食", intro: "文创工业风美食大厅，龙虾卷与甜点云集", rating: 4.5, tags: ["美食集市"] },
          { id: "", time: "13:00", title: "Little Island", desc: "海滨休闲 1h", lat: 40.742, lng: -74.0101, category: "休闲", intro: "哈德逊河上人工岛公园，适合短休、看河景和拍城市景观", rating: 4.6, tags: ["公园", "休闲"] },
          { id: "", time: "14:00", title: "Vessel 地标区", desc: "拍照 45min", lat: 40.7713, lng: -74.0029, category: "景点", intro: "哈德逊广场一带的现代建筑集群", rating: 4.3, tags: ["建筑"] },
          { id: "", time: "15:00", title: "The Shops & Restaurants at Hudson Yards", desc: "购物 1.5h", lat: 40.7538, lng: -74.001, category: "购物", intro: "高线北端的大型商业综合体，适合安排购物和咖啡休息", rating: 4.4, tags: ["购物", "餐饮"] },
          { id: "", time: "16:00", title: "无畏号海空博物馆", desc: "参观 1.5h", lat: 40.7645, lng: -73.9996, category: "景点", intro: "航母改建博物馆，适家庭与军事迷", rating: 4.5, price: "$33", tags: ["博物馆"] },
          { id: "", time: "20:00", title: "Moxy NYC Chelsea", desc: "入住建议", lat: 40.7462, lng: -73.9899, category: "住宿", intro: "切尔西花区附近的设计酒店，方便连接高线、公园和中城", rating: 4.4, tags: ["酒店", "切尔西"] },
        ],
      },
    ],
  },
  {
    key: "usaLa",
    name: "洛杉矶",
    cover: "map",
    date: "2026.08.05 — 08.07",
    defaultDays: 3,
    aliases: ["洛杉矶", "la", "好莱坞", "圣塔莫尼卡"],
    days: [
      {
        label: "Day 1",
        route: "好莱坞 · 格里菲斯",
        spots: [
          { id: "", time: "09:00", title: "好莱坞星光大道", desc: "游览 1h", lat: 34.1016, lng: -118.3267, category: "景点", intro: "星形奖章镶嵌的人行道，毗邻中国戏院", rating: 4.3, tags: ["地标"] },
          { id: "", time: "10:15", title: "Musso & Frank Grill", desc: "经典早午餐 1h", lat: 34.1019, lng: -118.3352, category: "美食", intro: "好莱坞百年餐厅，适合安排电影黄金年代主题用餐", rating: 4.6, tags: ["经典餐厅"] },
          { id: "", time: "10:30", title: "格里菲斯天文台", desc: "参观 1.5h", lat: 34.1184, lng: -118.3004, category: "景点", intro: "俯瞰洛杉矶与好莱坞标志的经典观景点", rating: 4.8, tags: ["观景", "免费"] },
          { id: "", time: "13:00", title: "中央市场 Grand Central Market", desc: "午餐 1h", lat: 34.0505, lng: -118.2488, category: "美食", intro: "百年市集，墨西哥塔可与精品咖啡", rating: 4.4, tags: ["市集"] },
          { id: "", time: "15:00", title: "华特迪士尼音乐厅", desc: "外观 30min", lat: 34.0553, lng: -118.2496, category: "景点", intro: "弗兰克·盖里设计的银色波浪屋顶", rating: 4.6, tags: ["建筑"] },
          { id: "", time: "17:00", title: "The Last Bookstore", desc: "书店休闲 1h", lat: 34.0478, lng: -118.2497, category: "休闲", intro: "洛杉矶标志性独立书店，二手书拱门和艺术空间适合慢逛", rating: 4.6, tags: ["书店", "休闲"] },
          { id: "", time: "20:30", title: "The Hollywood Roosevelt", desc: "入住建议", lat: 34.1017, lng: -118.3417, category: "住宿", intro: "星光大道旁历史酒店，适合好莱坞主题路线住宿参考", rating: 4.4, tags: ["酒店", "好莱坞"] },
        ],
      },
      {
        label: "Day 2",
        route: "影城 · 海滩",
        spots: [
          { id: "", time: "09:00", title: "好莱坞环球影城", desc: "畅玩 5h", lat: 34.1381, lng: -118.3534, category: "景点", intro: "片场之旅与哈利波特魔法世界", rating: 4.7, price: "$109+", tags: ["主题公园"] },
          { id: "", time: "14:15", title: "Universal CityWalk Hollywood", desc: "购物用餐 1.5h", lat: 34.1369, lng: -118.3534, category: "购物", intro: "环球影城旁餐饮娱乐步行街，适合主题公园后补给", rating: 4.5, tags: ["购物", "餐饮"] },
          { id: "", time: "15:30", title: "威尼斯海滩", desc: "散步 2h", lat: 33.985, lng: -118.4695, category: "景点", intro: "加州波西米亚海滨，滑板公园与街头艺人", rating: 4.5, tags: ["海滩"] },
          { id: "", time: "18:30", title: "Gjelina Venice", desc: "晚餐 1.5h", lat: 33.9906, lng: -118.4647, category: "美食", intro: "Abbot Kinney 附近高人气加州料理餐厅，适合海滩日落后用餐", rating: 4.4, tags: ["晚餐"] },
          { id: "", time: "20:30", title: "Shutters on the Beach", desc: "入住建议", lat: 34.0078, lng: -118.4918, category: "住宿", intro: "圣塔莫尼卡海边酒店，适合西区海滩线住宿参考", rating: 4.5, tags: ["酒店", "海景"] },
        ],
      },
      {
        label: "Day 3",
        route: "圣塔莫尼卡 · 西岸艺术",
        spots: [
          { id: "", time: "09:00", title: "圣塔莫尼卡码头", desc: "游览 1.5h", lat: 34.0101, lng: -118.4963, category: "景点", intro: "66号公路终点、摩天轮与太平洋日落", rating: 4.7, tags: ["海滩", "日落"] },
          { id: "", time: "11:30", title: "第三步行街", desc: "购物午餐 2h", lat: 34.0164, lng: -118.5011, category: "购物", intro: "步行商业街，街头表演与露天咖啡", rating: 4.4, tags: ["购物"] },
          { id: "", time: "13:30", title: "Rodeo Drive", desc: "精品购物 1h", lat: 34.0679, lng: -118.4004, category: "购物", intro: "比弗利山庄奢侈品街区，适合橱窗购物和城市漫步", rating: 4.4, tags: ["购物", "比弗利"] },
          { id: "", time: "14:30", title: "盖蒂中心", desc: "参观 2.5h", lat: 34.078, lng: -118.4741, category: "景点", intro: "山顶美术馆与花园，馆藏从古典到印象派", rating: 4.8, price: "免费", tags: ["美术馆"] },
          { id: "", time: "18:00", title: "The Grove", desc: "休闲晚餐 2h", lat: 34.072, lng: -118.357, category: "休闲", intro: "户外商业街区，喷泉、影院、餐厅和 Farmers Market 相连", rating: 4.6, tags: ["休闲", "晚餐"] },
        ],
      },
    ],
  },
  {
    key: "usaPch",
    name: "加州一号公路",
    cover: "map",
    date: "2026.09.01 — 09.07",
    defaultDays: 7,
    aliases: ["一号公路", "pch", "big sur", "加州自驾", "旧金山", "洛杉矶"],
    days: [
      {
        label: "Day 1",
        route: "旧金山",
        spots: [
          { id: "", time: "09:00", title: "金门大桥观景点", desc: "拍照 1h", lat: 37.8199, lng: -122.4783, category: "景点", intro: "Battery Spencer 经典机位看橙红大桥与海湾", rating: 4.9, tags: ["地标"] },
          { id: "", time: "11:00", title: "渔人码头 Pier 39", desc: "游览 1.5h", lat: 37.8087, lng: -122.4098, category: "景点", intro: "海狮聚集区与海鲜餐厅", rating: 4.4, tags: ["海滨"] },
          { id: "", time: "12:30", title: "Ferry Building Marketplace", desc: "午餐购物 1.5h", lat: 37.7955, lng: -122.3937, category: "美食", intro: "旧金山海湾边美食市场，适合采购公路旅行零食和咖啡", rating: 4.6, tags: ["美食", "市场"] },
          { id: "", time: "13:30", title: "九曲花街", desc: "行车/步行 30min", lat: 37.8021, lng: -122.4187, category: "景点", intro: "伦巴底街急弯与花坛", rating: 4.3, tags: ["拍照"] },
          { id: "", time: "15:00", title: "中国城", desc: "闲逛 1.5h", lat: 37.7941, lng: -122.4078, category: "景点", intro: "北美最古老唐人街之一，点心与中药铺", rating: 4.5, tags: ["街区"] },
          { id: "", time: "20:00", title: "Fairmont San Francisco", desc: "入住建议", lat: 37.7924, lng: -122.4104, category: "住宿", intro: "诺布山经典酒店，适合作为旧金山首晚住宿区域参考", rating: 4.5, tags: ["酒店"] },
        ],
      },
      {
        label: "Day 2",
        route: "半岛海岸",
        spots: [
          { id: "", time: "10:00", title: "半月湾州立海滩", desc: "海岸散步 1h", lat: 37.4636, lng: -122.4459, category: "景点", intro: "崎岖崖岸与常绿的北加海景", rating: 4.6, tags: ["海岸"] },
          { id: "", time: "11:30", title: "Sam's Chowder House", desc: "海鲜午餐 1h", lat: 37.5023, lng: -122.4725, category: "美食", intro: "半月湾海边海鲜餐厅，龙虾卷和海景座位适合公路休息", rating: 4.4, tags: ["海鲜"] },
          { id: "", time: "12:30", title: "圣克鲁兹海滨", desc: "午餐散步 2h", lat: 36.9741, lng: -122.0308, category: "景点", intro: "复古码头与小型游乐场", rating: 4.4, tags: ["小镇"] },
          { id: "", time: "16:00", title: "Santa Cruz Beach Boardwalk", desc: "海边休闲 1.5h", lat: 36.9641, lng: -122.025, category: "休闲", intro: "复古海滨游乐场，适合作为自驾中段轻松停留", rating: 4.5, tags: ["游乐场", "海滨"] },
        ],
      },
      {
        label: "Day 3",
        route: "蒙特雷 · 17英里",
        spots: [
          { id: "", time: "09:00", title: "蒙特雷老渔人码头", desc: "游览 1h", lat: 36.6047, lng: -121.8915, category: "景点", intro: "观鲸出发地与海滨步道起点", rating: 4.5, tags: ["海滨"] },
          { id: "", time: "11:00", title: "17英里风景线", desc: "自驾 2h", lat: 36.5688, lng: -121.9485, category: "景点", intro: "私人收费景观公路，孤柏与高尔夫球场海景", rating: 4.8, price: "$12", tags: ["自驾"] },
          { id: "", time: "15:00", title: "卡梅尔小镇", desc: "逛街 2h", lat: 36.5552, lng: -121.9233, category: "购物", intro: "童话风格滨海艺术村", rating: 4.7, tags: ["小镇"] },
          { id: "", time: "20:00", title: "Monterey Plaza Hotel & Spa", desc: "入住建议", lat: 36.6124, lng: -121.8996, category: "住宿", intro: "蒙特雷海边酒店，方便连接罐头厂街和次日大瑟尔", rating: 4.6, tags: ["酒店", "海景"] },
        ],
      },
      {
        label: "Day 4",
        route: "大瑟尔",
        spots: [
          { id: "", time: "09:00", title: "比克斯比溪拱桥", desc: "观景 30min", lat: 36.3715, lng: -121.9016, category: "景点", intro: "一号公路明信片级海湾拱桥", rating: 4.9, tags: ["必拍"] },
          { id: "", time: "11:00", title: "麦克维瀑布湾", desc: "步道 1h", lat: 36.1598, lng: -121.6721, category: "景点", intro: "岸坠小瀑入沙滩的稀有景观（潮汐时注意）", rating: 4.7, tags: ["自然"] },
          { id: "", time: "12:30", title: "Nepenthe Big Sur", desc: "悬崖午餐 1.5h", lat: 36.2288, lng: -121.761, category: "美食", intro: "大瑟尔经典海景餐厅，适合把午餐和观景合并安排", rating: 4.5, tags: ["海景餐厅"] },
          { id: "", time: "14:00", title: "菲佛大瑟尔州立公园", desc: "徒步 2h", lat: 36.2471, lng: -121.7711, category: "景点", intro: "红杉峡谷与海岸峭壁徒步", rating: 4.8, tags: ["徒步"] },
          { id: "", time: "19:30", title: "Big Sur River Inn", desc: "入住建议", lat: 36.2699, lng: -121.8086, category: "住宿", intro: "大瑟尔区域经典旅宿，适合拆分长途驾驶并保留自然体验", rating: 4.3, tags: ["旅宿"] },
        ],
      },
      {
        label: "Day 5",
        route: "圣西米恩 · 莫罗贝",
        spots: [
          { id: "", time: "10:00", title: "赫氏古堡", desc: "参观 2.5h", lat: 35.6842, lng: -121.1763, category: "景点", intro: "媒体大亨山顶庄园，奢华建筑与典藏", rating: 4.7, price: "$30+", tags: ["建筑"] },
          { id: "", time: "14:00", title: "莫罗湾巨岩", desc: "海滨 1.5h", lat: 35.3658, lng: -120.865, category: "景点", intro: "海湾中孤矗火山栓与海獭观赏", rating: 4.6, tags: ["海岸"] },
          { id: "", time: "18:30", title: "Madonna Inn", desc: "入住建议", lat: 35.2644, lng: -120.675, category: "住宿", intro: "圣路易斯-奥比斯波标志性主题酒店，适合自驾路线中途体验", rating: 4.4, tags: ["酒店", "主题"] },
        ],
      },
      {
        label: "Day 6",
        route: "圣巴巴拉 · 丹麦村",
        spots: [
          { id: "", time: "10:00", title: "圣巴巴拉教会", desc: "参观 1h", lat: 34.4378, lng: -119.7139, category: "景点", intro: "粉白西班牙殖民复兴风格地标", rating: 4.6, tags: ["建筑"] },
          { id: "", time: "12:00", title: "斯特恩斯码头", desc: "午餐 1.5h", lat: 34.4083, lng: -119.6853, category: "景点", intro: "西海岸最长木码头之一", rating: 4.4, tags: ["海滨"] },
          { id: "", time: "13:45", title: "Santa Barbara Funk Zone", desc: "酒庄街区 1.5h", lat: 34.414, lng: -119.6916, category: "休闲", intro: "酒吧、画廊和小店聚集的步行街区，适合下午慢逛", rating: 4.5, tags: ["酒庄", "街区"] },
          { id: "", time: "15:00", title: "索尔万丹麦村", desc: "闲逛 2h", lat: 34.5958, lng: -120.1376, category: "景点", intro: "风车与北欧风小店", rating: 4.5, tags: ["小镇"] },
        ],
      },
      {
        label: "Day 7",
        route: "马利布 · 洛杉矶",
        spots: [
          { id: "", time: "10:00", title: "马利布溪州立公园", desc: "海景公路 1h", lat: 34.0824, lng: -118.7348, category: "景点", intro: "山海交错的西海岸尾声路段", rating: 4.5, tags: ["自驾"] },
          { id: "", time: "11:30", title: "Malibu Country Mart", desc: "购物咖啡 1h", lat: 34.0358, lng: -118.6861, category: "购物", intro: "马利布户外购物街区，适合海岸线收尾前休整", rating: 4.3, tags: ["购物", "咖啡"] },
          { id: "", time: "13:00", title: "盖蒂别墅博物馆", desc: "参观 2h", lat: 34.0459, lng: -118.5648, category: "景点", intro: "仿庞贝别 Villa，古希腊罗马艺术", rating: 4.7, price: "免费需预约", tags: ["博物馆"] },
          { id: "", time: "17:00", title: "圣塔莫尼卡码头", desc: "日落 1.5h", lat: 34.0101, lng: -118.4963, category: "景点", intro: "为一号公路南下画上太平洋落日句号", rating: 4.8, tags: ["日落"] },
        ],
      },
    ],
  },
  {
    key: "usaYellowstone",
    name: "黄石",
    cover: "map",
    date: "2026.06.10 — 06.14",
    defaultDays: 5,
    aliases: ["黄石", "yellowstone", "大提顿"],
    days: [
      {
        label: "Day 1",
        route: "老忠实 · 老忠实区",
        spots: [
          { id: "", time: "09:00", title: "老忠实间歇泉", desc: "喷发观赏 2h", lat: 44.4605, lng: -110.8281, category: "景点", intro: "约90分钟一次的壮观热泉喷发", rating: 4.9, tags: ["必去"] },
          { id: "", time: "11:30", title: "Old Faithful Inn Dining Room", desc: "午餐 1h", lat: 44.4599, lng: -110.8312, category: "美食", intro: "老忠实区经典木屋餐厅，适合把喷泉等待时间和用餐结合", rating: 4.3, tags: ["餐厅"] },
          { id: "", time: "12:00", title: "中途间歇泉盆地", desc: "栈道徒步 1.5h", lat: 44.5268, lng: -110.8361, category: "景点", intro: "色彩缤纷的温泉与喷气孔", rating: 4.8, tags: ["地热"] },
          { id: "", time: "15:00", title: "大棱镜温泉观景台", desc: "徒步观景 2h", lat: 44.5253, lng: -110.8383, category: "景点", intro: "公园最大热泉，蓝心彩色菌毯边缘", rating: 4.9, tags: ["摄影"] },
          { id: "", time: "19:30", title: "Old Faithful Inn", desc: "入住建议", lat: 44.4599, lng: -110.8312, category: "住宿", intro: "国家公园历史木屋旅宿，适合作为老忠实区域住宿参考", rating: 4.5, tags: ["酒店", "公园内"] },
        ],
      },
      {
        label: "Day 2",
        route: "黄石大峡谷",
        spots: [
          { id: "", time: "09:00", title: "Artist Point 观景点", desc: "峡谷观景 1h", lat: 44.8338, lng: -110.4906, category: "景点", intro: "俯瞰黄石下瀑布染色岩壁", rating: 4.9, tags: ["峡谷"] },
          { id: "", time: "11:30", title: "黄石下瀑布观景台", desc: "步道 1.5h", lat: 44.8991, lng: -110.3922, category: "景点", intro: "近距离感受308英尺瀑布雷鸣", rating: 4.8, tags: ["瀑布"] },
          { id: "", time: "13:30", title: "Canyon Village General Store", desc: "午餐补给 1h", lat: 44.7352, lng: -110.487, category: "购物", intro: "峡谷村补给点，适合购买饮水、简餐和公园纪念品", rating: 4.2, tags: ["补给", "购物"] },
          { id: "", time: "19:30", title: "Canyon Lodge & Cabins", desc: "入住建议", lat: 44.735, lng: -110.489, category: "住宿", intro: "峡谷区域大型旅宿，适合连接峡谷、湖区和拉马尔山谷", rating: 4.2, tags: ["住宿"] },
        ],
      },
      {
        label: "Day 3",
        route: "黄石湖 · 钓鱼桥",
        spots: [
          { id: "", time: "09:00", title: "西拇指间歇泉盆地", desc: "栈道 1h", lat: 44.4175, lng: -110.5746, category: "景点", intro: "湖边热泉与清澈湖水相接", rating: 4.7, tags: ["地热"] },
          { id: "", time: "11:00", title: "黄石湖游船出发点", desc: "湖景 1.5h", lat: 44.5439, lng: -110.4014, category: "景点", intro: "北美高海拔大湖之一", rating: 4.6, tags: ["湖泊"] },
          { id: "", time: "13:00", title: "Lake Yellowstone Hotel Dining Room", desc: "湖畔午餐 1h", lat: 44.5499, lng: -110.4003, category: "美食", intro: "黄石湖畔历史酒店餐厅，适合湖区路线中段休息", rating: 4.3, tags: ["餐厅", "湖景"] },
          { id: "", time: "16:00", title: "Lake Lodge Gift Shop", desc: "购物休闲 45min", lat: 44.55, lng: -110.3976, category: "购物", intro: "湖区纪念品和补给点，适合采购明信片和户外小物", rating: 4.2, tags: ["纪念品"] },
        ],
      },
      {
        label: "Day 4",
        route: "拉马尔山谷",
        spots: [
          { id: "", time: "06:30", title: "拉马尔山谷野生动物观测", desc: "清晨 3h", lat: 44.805, lng: -110.1714, category: "景点", intro: "狼群与野牛高频出没的开阔河谷", rating: 4.9, tags: ["野生动物"] },
          { id: "", time: "10:00", title: "Roosevelt Lodge Dining Room", desc: "早午餐 1h", lat: 44.9121, lng: -110.4163, category: "美食", intro: "拉马尔山谷和峡谷之间的公园餐厅，适合作为清晨观兽后补给", rating: 4.3, tags: ["餐厅"] },
          { id: "", time: "11:00", title: "猛犸热阶", desc: "徒步 2h", lat: 44.9765, lng: -110.7015, category: "景点", intro: "奶油色石灰华梯田温泉", rating: 4.7, tags: ["地热"] },
          { id: "", time: "15:00", title: "Mammoth Hot Springs Terrace Grill", desc: "休闲用餐 1h", lat: 44.9769, lng: -110.7019, category: "休闲", intro: "猛犸区域轻食和休息点，适合长距离自驾后的放松", rating: 4.1, tags: ["休闲", "补给"] },
        ],
      },
      {
        label: "Day 5",
        route: "诺里斯 ·  outbound",
        spots: [
          { id: "", time: "09:00", title: "诺里斯间歇泉盆地", desc: "栈道 2h", lat: 44.7282, lng: -110.7053, category: "景点", intro: "公园最热最活跃地热区之一", rating: 4.7, tags: ["地热"] },
          { id: "", time: "13:00", title: "饼干盆地", desc: "短徒步 1h", lat: 44.4754, lng: -110.8274, category: "景点", intro: "蓝宝石池与密集喷泉", rating: 4.6, tags: ["地热"] },
          { id: "", time: "15:00", title: "Old Faithful General Store", desc: "购物补给 45min", lat: 44.4607, lng: -110.826, category: "购物", intro: "老忠实区综合商店，适合购买纪念品、补给和返程零食", rating: 4.2, tags: ["购物", "补给"] },
        ],
      },
    ],
  },
  {
    key: "usaHawaii",
    name: "夏威夷",
    cover: "map",
    date: "2026.03.01 — 03.04",
    defaultDays: 4,
    aliases: ["夏威夷", "欧胡岛", "檀香山", "waikiki", "honolulu"],
    days: [
      {
        label: "Day 1",
        route: "威基基",
        spots: [
          { id: "", time: "09:00", title: "钻石头山步道", desc: "登山 2h", lat: 21.2599, lng: -157.8057, category: "景点", intro: "死火山口徒步，俯瞰威基基与太平洋", rating: 4.8, price: "$5", tags: ["徒步"] },
          { id: "", time: "11:30", title: "Leonard's Bakery", desc: "甜点补给 45min", lat: 21.2846, lng: -157.8133, category: "美食", intro: "欧胡岛经典 malasada 甜甜圈店，适合徒步后补充能量", rating: 4.6, tags: ["甜点"] },
          { id: "", time: "13:00", title: "威基基海滩", desc: "浮潜休息 2h", lat: 21.2793, lng: -157.8295, category: "景点", intro: "世界著名新月形沙滩与冲浪启蒙浪", rating: 4.7, tags: ["海滩"] },
          { id: "", time: "15:30", title: "Royal Hawaiian Center", desc: "购物休闲 1.5h", lat: 21.2787, lng: -157.8293, category: "购物", intro: "威基基核心购物中心，适合安排餐饮、纪念品和冷气休息", rating: 4.4, tags: ["购物"] },
          { id: "", time: "20:00", title: "Outrigger Waikiki Beach Resort", desc: "入住建议", lat: 21.2767, lng: -157.8274, category: "住宿", intro: "威基基海滩边酒店，适合作为欧胡岛首晚住宿区域参考", rating: 4.4, tags: ["酒店", "海滩"] },
        ],
      },
      {
        label: "Day 2",
        route: "珍珠港 · 北岸",
        spots: [
          { id: "", time: "08:00", title: "珍珠港 USS 亚利桑那纪念馆", desc: "参观 3h", lat: 21.3649, lng: -157.9501, category: "景点", intro: "二战历史国家纪念地", rating: 4.8, price: "$1", tags: ["历史"] },
          { id: "", time: "12:30", title: "Giovanni's Shrimp Truck", desc: "虾车午餐 1h", lat: 21.5969, lng: -158.1034, category: "美食", intro: "北岸蒜香虾车代表，适合珍珠港后一路北上用餐", rating: 4.4, tags: ["虾车", "午餐"] },
          { id: "", time: "14:00", title: "哈雷瓦北岸小镇", desc: "冲浪文化 2h", lat: 21.5924, lng: -158.1034, category: "景点", intro: "冬浪观赛与虾车美食集散地", rating: 4.6, tags: ["小镇"] },
          { id: "", time: "16:30", title: "Matsumoto Shave Ice", desc: "刨冰休闲 45min", lat: 21.5927, lng: -158.1027, category: "休闲", intro: "北岸经典彩虹刨冰店，适合下午慢节奏停留", rating: 4.5, tags: ["甜品", "休闲"] },
        ],
      },
      {
        label: "Day 3",
        route: "东岸风谷",
        spots: [
          { id: "", time: "09:00", title: "植物园与平等院", desc: "参观 2h", lat: 21.4337, lng: -157.8057, category: "景点", intro: "日式寺院倒映锦鲤池", rating: 4.7, price: "$5", tags: ["文化"] },
          { id: "", time: "12:00", title: "努阿努帕里大风口", desc: "观景 45min", lat: 21.3668, lng: -157.8051, category: "景点", intro: "战役史诗悬崖观景点", rating: 4.6, tags: ["观景"] },
          { id: "", time: "13:30", title: "Kailua Town", desc: "午餐购物 1.5h", lat: 21.3972, lng: -157.7394, category: "购物", intro: "东岸小镇餐饮、冲浪用品和本地小店集中，适合海滩日前补给", rating: 4.4, tags: ["小镇", "购物"] },
          { id: "", time: "15:30", title: "Lanikai Beach", desc: "海滩休闲 1.5h", lat: 21.3926, lng: -157.7153, category: "休闲", intro: "欧胡岛东岸细白沙滩，适合轻松游泳和看 Mokulua 小岛", rating: 4.8, tags: ["海滩", "休闲"] },
        ],
      },
      {
        label: "Day 4",
        route: "科科岬 · 檀香山",
        spots: [
          { id: "", time: "06:00", title: "科科岬铁道徒步", desc: "徒步 3h", lat: 21.2799, lng: -157.6979, category: "景点", intro: "枕木台阶登顶看东岸海岸线", rating: 4.8, tags: ["徒步"] },
          { id: "", time: "11:00", title: "伊奥拉尼王宫", desc: "参观 1.5h", lat: 21.3069, lng: -157.8588, category: "景点", intro: "美国唯一王宫，夏威夷王国历史", rating: 4.5, price: "$25", tags: ["历史"] },
          { id: "", time: "13:00", title: "Helena's Hawaiian Food", desc: "本地午餐 1h", lat: 21.3267, lng: -157.8767, category: "美食", intro: "檀香山本地夏威夷菜代表，适合补上 poi、kalua pig 等传统风味", rating: 4.5, tags: ["本地菜"] },
          { id: "", time: "15:00", title: "Ala Moana Center", desc: "购物 2h", lat: 21.2915, lng: -157.843, category: "购物", intro: "檀香山大型露天购物中心，适合离岛前采购和休息", rating: 4.5, tags: ["购物"] },
        ],
      },
    ],
  },
  ...(exploreRegionProfiles as Profile[]),
];

export function getSeedTrips(): Trip[] {
  return [
    {
      id: "tokyo-5",
      name: "东京5日游",
      date: "2026.05.18 — 05.22",
      cover: "tokyo",
      status: "进行中",
      favorite: true,
      days: buildDays(profiles[0]),
      source: { kind: "text", title: "Routey 示例行程" },
    },
    {
      id: "kyoto-3",
      name: "京都赏樱3日",
      date: "2026.04.03 — 04.05",
      cover: "japan",
      status: "已完成",
      favorite: true,
      days: buildDays(profiles[1]),
      source: { kind: "link", title: "收藏攻略" },
    },
    {
      id: "seoul-4",
      name: "首尔美食之旅",
      date: "2026.06.10 — 06.13",
      cover: "korea",
      status: "草稿",
      favorite: false,
      days: buildDays(profiles[2]),
      source: { kind: "video", title: "短视频灵感" },
    },
  ];
}

export function createTripFromImport(payload: ImportPayload): Trip {
  const profile = inferProfile(payload.content);
  const days = inferDayCount(payload.content, profile.defaultDays);
  const tripId = `${profile.key}-${days}-${Date.now().toString(36)}`;

  return {
    id: tripId,
    name: `${profile.name}${days}日游`,
    date: profile.date,
    cover: profile.cover,
    status: "草稿",
    favorite: false,
    days: buildDays(profile, days),
    source: {
      kind: payload.kind,
      title: sourceTitle(payload.kind),
    },
  };
}

export function optimizeDay(day: Day): Day {
  if (day.spots.length < 3) return scheduleDay(day);

  /* Step 1: nearest-neighbor greedy */
  const [first, ...rest] = day.spots;
  const ordered = [first];
  const queue = [...rest];

  while (queue.length) {
    const last = ordered[ordered.length - 1];
    const nextIndex = queue.reduce((best, spot, index) => {
      return dist(last, spot) < dist(last, queue[best]) ? index : best;
    }, 0);
    ordered.push(queue.splice(nextIndex, 1)[0]);
  }

  /* Step 2: 2-opt to eliminate crossings */
  const totalDist = (path: Spot[]) =>
    path.reduce((sum, s, i) => (i === 0 ? 0 : sum + dist(path[i - 1], s)), 0);

  let improved = true;
  while (improved) {
    improved = false;
    for (let i = 1; i < ordered.length - 1; i++) {
      for (let j = i + 1; j < ordered.length; j++) {
        const before = totalDist(ordered);
        const segment = ordered.slice(i, j + 1);
        segment.reverse();
        ordered.splice(i, j - i + 1, ...segment);
        if (totalDist(ordered) < before) {
          improved = true;
        } else {
          segment.reverse();
          ordered.splice(i, j - i + 1, ...segment);
        }
      }
    }
  }

  return scheduleDay({ ...day, spots: ordered, route: routeName(ordered) });
}

export function optimizeTrip(trip: Trip, dayId?: string): Trip {
  return {
    ...trip,
    days: trip.days.map((day) => (!dayId || day.id === dayId ? optimizeDay(day) : day)),
  };
}

export function buildImportJob(
  id: string,
  kind: SourceKind,
  createdAt: number,
  tripId: string,
): ImportJob {
  const elapsed = Date.now() - createdAt;
  const progress = Math.min(100, Math.floor((elapsed / 2800) * 100));
  const activeIndex = Math.min(
    importSteps.length - 1,
    Math.floor((progress / 100) * importSteps.length),
  );

  return {
    id,
    kind,
    status: progress >= 100 ? "done" : "processing",
    progress,
    tripId: progress >= 100 ? tripId : undefined,
    steps: importSteps.map((label, index) => ({
      label,
      state:
        progress >= 100 || index < activeIndex
          ? "done"
          : index === activeIndex
            ? "active"
            : "pending",
    })),
  };
}

function inferProfile(content: string): Profile {
  const lower = content.toLowerCase();
  return (
    profiles.find((p) => p.aliases.some((a) => lower.includes(a.toLowerCase()))) ?? profiles[0]
  );
}

function inferDayCount(content: string, fallback: number): number {
  const match = content.match(/(\d+)\s*(?:天|日|day|days)/i);
  if (!match) return fallback;
  return Math.min(7, Math.max(1, Number(match[1])));
}

function buildDays(profile: Profile, count?: number): Day[] {
  let template = [...profile.days];
  if (count && count > template.length) {
    let n = template.length;
    while (template.length < count) {
      n += 1;
      const last = template[template.length - 1];
      template.push({
        ...last,
        label: `Day ${n}`,
        route: `${last.route} · 延伸`,
        spots: last.spots.map((s) => ({ ...s, id: "" })),
      });
    }
  }
  const src = count ? template.slice(0, count) : template;
  return src.map((day, dayIndex) => {
    const rawDay: Day = {
      ...day,
      id: `d${dayIndex + 1}`,
      spots: day.spots.map((spot, spotIndex) => ({
        ...spot,
        id: spot.id || `${profile.key}-d${dayIndex + 1}-s${spotIndex + 1}`,
      })),
    };
    return optimizeDay(rawDay);
  });
}

function scheduleDay(day: Day): Day {
  return {
    ...day,
    route: routeName(day.spots),
    spots: day.spots.map((spot, index) => ({
      ...spot,
      time: times[index] ?? times[times.length - 1],
    })),
  };
}

function routeName(spots: Spot[]): string {
  if (spots.length === 0) return "自由探索";
  if (spots.length === 1) return spots[0].title;
  return `${spots[0].title} → ${spots[spots.length - 1].title}`;
}

function dist(a: Spot, b: Spot): number {
  if (!a.lat || !a.lng || !b.lat || !b.lng) return 1;
  return Math.hypot(a.lat - b.lat, a.lng - b.lng);
}

function sourceTitle(kind: SourceKind): string {
  return { link: "链接导入", image: "截图导入", text: "文本导入", video: "视频导入" }[kind];
}

/* ── Explore: popular routes per destination ── */

const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=600&h=300&q=80&auto=format&fit=crop`;

const exploreDB: Record<string, ExploreRoute[]> = {
  "日本": [
    { id: "ex-jp-1", title: "东京5日经典路线", days: 5, spots: 22, source: "小红书 @东京吃货日记", likes: 12800, cover: unsplash("photo-1540959733332-eab4deabeeaf"), tags: ["经典", "购物", "美食"], profileKey: "tokyo" },
    { id: "ex-jp-2", title: "京都3日深度和风游", days: 3, spots: 15, source: "小红书 @京都和风散步", likes: 9600, cover: unsplash("photo-1493976040374-85c8e12f0c0e"), tags: ["寺庙", "和服", "抹茶"], profileKey: "kyoto" },
    { id: "ex-jp-3", title: "大阪美食2日暴走", days: 2, spots: 12, source: "携程攻略 @关西美食探店", likes: 7200, cover: unsplash("photo-1480796927426-f609979314bd"), tags: ["美食", "道顿堀", "环球影城"], profileKey: "tokyo" },
    { id: "ex-jp-4", title: "北海道4日自然之旅", days: 4, spots: 18, source: "小红书 @北海道旅拍笔记", likes: 5400, cover: unsplash("photo-1578271887552-5ac3a72752bc"), tags: ["自然", "温泉", "雪景"], profileKey: "tokyo" },
    { id: "ex-jp-5", title: "冲绳3日海岛度假", days: 3, spots: 15, source: "马蜂窝 @冲绳海岛玩家", likes: 4100, cover: unsplash("photo-1528360983277-13d401cdc186"), tags: ["海岛", "潜水", "度假"], profileKey: "tokyo" },
  ],
  "韩国": [
    { id: "ex-kr-1", title: "首尔4日潮流之旅", days: 4, spots: 18, source: "小红书 @首尔韩范穿搭", likes: 11200, cover: unsplash("photo-1534274988757-a28bf1a57c17"), tags: ["购物", "美食", "明洞"], profileKey: "seoul" },
    { id: "ex-kr-4", title: "首尔咖啡厅巡礼2日", days: 2, spots: 12, source: "小红书 @首尔咖啡地图", likes: 8400, cover: unsplash("photo-1559496417-e7f25cb247f3"), tags: ["咖啡", "网红店", "弘大"], profileKey: "seoul" },
    { id: "ex-kr-2", title: "济州岛3日环岛游", days: 3, spots: 15, source: "小红书 @济州橘子味", likes: 6800, cover: unsplash("photo-1548115184-bc6544d06a58"), tags: ["自然", "海岛", "徒步"], profileKey: "seoul" },
  ],
  "泰国": [
    { id: "ex-th-1", title: "曼谷2日寺庙美食之旅", days: 2, spots: 12, source: "小红书 @泰好玩", likes: 8900, cover: unsplash("photo-1528181304800-259b08848526"), tags: ["寺庙", "美食", "夜市"], profileKey: "bangkok" },
    { id: "ex-th-2", title: "清迈3日慢生活", days: 3, spots: 15, source: "马蜂窝 @清迈小城", likes: 7200, cover: unsplash("photo-1552465011-b4e21bf6e79a"), tags: ["寺庙", "咖啡", "夜市"], profileKey: "bangkok" },
    { id: "ex-th-4", title: "曼谷购物美食5日深度", days: 5, spots: 22, source: "小红书 @曼谷买手", likes: 6100, cover: unsplash("photo-1563492065599-3520f775eeed"), tags: ["购物", "街头美食", "按摩"], profileKey: "bangkok" },
    { id: "ex-th-3", title: "普吉岛4日海岛游", days: 4, spots: 18, source: "小红书 @海岛度假", likes: 5600, cover: unsplash("photo-1504214208698-ea1916a2195a"), tags: ["海岛", "潜水", "SPA"], profileKey: "bangkok" },
  ],
  "法国": [
    { id: "ex-fr-1", title: "巴黎2日浪漫之旅", days: 2, spots: 12, source: "小红书 @巴黎漫步", likes: 10500, cover: unsplash("photo-1502602898657-3e91760cbb34"), tags: ["浪漫", "博物馆", "美食"], profileKey: "paris" },
    { id: "ex-fr-3", title: "巴黎博物馆深度4日", days: 4, spots: 18, source: "小红书 @艺术旅人", likes: 7800, cover: unsplash("photo-1541264161754-445bbdd7de52"), tags: ["卢浮宫", "奥赛", "蓬皮杜"], profileKey: "paris" },
    { id: "ex-fr-2", title: "南法普罗旺斯3日", days: 3, spots: 15, source: "知乎 @法国深度游", likes: 6300, cover: unsplash("photo-1499856871958-5b9627545d1a"), tags: ["薰衣草", "小镇", "红酒"], profileKey: "paris" },
  ],
  "美国": [
    { id: "ex-us-1", title: "纽约3日城市探索", days: 3, spots: 15, source: "小红书 @NYC攻略", likes: 9200, cover: unsplash("photo-1496442226666-8d4d0e62e6e9"), tags: ["都市", "博物馆", "百老汇"], profileKey: "usaNyc" },
    { id: "ex-us-2", title: "加州1号公路7日自驾", days: 7, spots: 30, source: "马蜂窝 @公路旅行", likes: 7800, cover: unsplash("photo-1449034446853-66c86144b0ad"), tags: ["自驾", "海岸", "国家公园"], profileKey: "usaPch" },
    { id: "ex-us-3", title: "洛杉矶好莱坞3日游", days: 3, spots: 15, source: "小红书 @LA生活", likes: 6500, cover: unsplash("photo-1580655653885-65763b2597d0"), tags: ["好莱坞", "环球影城", "海滩"], profileKey: "usaLa" },
    { id: "ex-us-4", title: "黄石国家公园5日", days: 5, spots: 22, source: "知乎 @户外探险", likes: 5400, cover: unsplash("photo-1472396961693-142e6e269027"), tags: ["国家公园", "自然", "露营"], profileKey: "usaYellowstone" },
    { id: "ex-us-5", title: "夏威夷4日阳光之旅", days: 4, spots: 18, source: "小红书 @夏威夷玩家", likes: 4700, cover: unsplash("photo-1507876466758-bc54f384809c"), tags: ["海滩", "冲浪", "火山"], profileKey: "usaHawaii" },
  ],
  "英国": [
    { id: "ex-uk-1", title: "伦敦3日经典路线", days: 3, spots: 15, source: "小红书 @伦敦生活", likes: 7600, cover: unsplash("photo-1513635269975-59663e0ac1ad"), tags: ["博物馆", "皇家", "下午茶"], profileKey: "tokyo" },
    { id: "ex-uk-4", title: "伦敦哈利波特主题2日", days: 2, spots: 12, source: "小红书 @HP迷", likes: 6900, cover: unsplash("photo-1486299267070-83823f5448dd"), tags: ["哈利波特", "影视", "打卡"], profileKey: "tokyo" },
    { id: "ex-uk-2", title: "苏格兰高地4日自驾", days: 4, spots: 18, source: "马蜂窝 @英国自驾", likes: 5200, cover: unsplash("photo-1529655683826-aba9b3e77383"), tags: ["高地", "城堡", "威士忌"], profileKey: "tokyo" },
    { id: "ex-uk-3", title: "牛津剑桥2日学术游", days: 2, spots: 12, source: "知乎 @英国留学", likes: 4800, cover: unsplash("photo-1526129318478-62ed807ebdf9"), tags: ["大学", "学术", "古镇"], profileKey: "tokyo" },
  ],
  "意大利": [
    { id: "ex-it-1", title: "罗马佛罗伦萨5日", days: 5, spots: 22, source: "小红书 @意大利行", likes: 8100, cover: unsplash("photo-1515859005217-8a1f08870f59"), tags: ["文艺复兴", "美食", "古迹"], profileKey: "tokyo" },
    { id: "ex-it-2", title: "威尼斯2日水城浪漫游", days: 2, spots: 12, source: "小红书 @威尼斯梦", likes: 6400, cover: unsplash("photo-1523906834658-6e24ef2386f9"), tags: ["贡多拉", "面具", "浪漫"], profileKey: "tokyo" },
    { id: "ex-it-3", title: "阿马尔菲海岸3日", days: 3, spots: 15, source: "马蜂窝 @意大利海岸", likes: 5700, cover: unsplash("photo-1534113414509-0eec2bfb493f"), tags: ["海岸", "柠檬", "悬崖"], profileKey: "tokyo" },
    { id: "ex-it-4", title: "米兰时尚购物2日", days: 2, spots: 12, source: "小红书 @时尚买手", likes: 4900, cover: unsplash("photo-1534445867742-43195f401b6c"), tags: ["时尚", "购物", "大教堂"], profileKey: "tokyo" },
  ],
  "澳洲": [
    { id: "ex-au-2", title: "大堡礁3日潜水之旅", days: 3, spots: 15, source: "马蜂窝 @潜水控", likes: 7100, cover: unsplash("photo-1523428096881-5bd79d043006"), tags: ["潜水", "珊瑚", "海洋"], profileKey: "tokyo" },
    { id: "ex-au-1", title: "悉尼墨尔本5日游", days: 5, spots: 22, source: "小红书 @澳洲玩家", likes: 5900, cover: unsplash("photo-1506973035872-a4ec16b8e8d9"), tags: ["歌剧院", "大洋路", "咖啡"], profileKey: "tokyo" },
    { id: "ex-au-3", title: "塔斯马尼亚4日自驾", days: 4, spots: 18, source: "小红书 @塔岛探索", likes: 4300, cover: unsplash("photo-1494233892892-84542a694e72"), tags: ["自然", "自驾", "野生动物"], profileKey: "tokyo" },
  ],
  "摩洛哥": [
    { id: "ex-ma-3", title: "舍夫沙万蓝色小镇2日", days: 2, spots: 12, source: "小红书 @蓝色梦境", likes: 5600, cover: unsplash("photo-1553102674-af685bb5fe40"), tags: ["蓝城", "拍照", "小镇"], profileKey: "tokyo" },
    { id: "ex-ma-1", title: "摩洛哥4日撒哈拉之旅", days: 4, spots: 18, source: "小红书 @非洲探险", likes: 4200, cover: unsplash("photo-1489749798305-4fea3ae63d43"), tags: ["沙漠", "蓝城", "集市"], profileKey: "tokyo" },
    { id: "ex-ma-2", title: "马拉喀什3日迷宫之旅", days: 3, spots: 15, source: "马蜂窝 @北非玩家", likes: 3800, cover: unsplash("photo-1539020140153-e479b8c22e70"), tags: ["集市", "庭院", "美食"], profileKey: "tokyo" },
  ],
  "西班牙": [
    { id: "ex-es-1", title: "巴塞罗那3日高迪之旅", days: 3, spots: 15, source: "小红书 @西班牙控", likes: 8700, cover: unsplash("photo-1583422409516-2895a77efded"), tags: ["高迪", "建筑", "海滩"], profileKey: "paris" },
    { id: "ex-es-2", title: "马德里2日皇家之旅", days: 2, spots: 12, source: "知乎 @西班牙深度", likes: 5400, cover: unsplash("photo-1539037116277-4db20889f2d4"), tags: ["皇宫", "普拉多", "弗拉门戈"], profileKey: "paris" },
    { id: "ex-es-3", title: "安达卢西亚5日自驾", days: 5, spots: 22, source: "马蜂窝 @南欧自驾", likes: 4600, cover: unsplash("photo-1558642452-9d2a7deb7f62"), tags: ["自驾", "白色小镇", "斗牛"], profileKey: "paris" },
  ],
  "德国": [
    { id: "ex-de-1", title: "慕尼黑3日啤酒之旅", days: 3, spots: 15, source: "小红书 @德国啤酒", likes: 6200, cover: unsplash("photo-1599946347371-68eb71b16afc"), tags: ["啤酒", "城堡", "巴伐利亚"], profileKey: "paris" },
    { id: "ex-de-2", title: "柏林2日历史文化游", days: 2, spots: 12, source: "知乎 @德国历史", likes: 5100, cover: unsplash("photo-1560969184-10fe8719e047"), tags: ["柏林墙", "博物馆", "文化"], profileKey: "paris" },
    { id: "ex-de-3", title: "莱茵河谷4日浪漫之路", days: 4, spots: 18, source: "马蜂窝 @德国自驾", likes: 4300, cover: unsplash("photo-1534313314376-a72289b6181e"), tags: ["城堡", "河谷", "葡萄园"], profileKey: "paris" },
  ],
  "瑞士": [
    { id: "ex-ch-1", title: "瑞士4日雪山湖泊之旅", days: 4, spots: 18, source: "小红书 @瑞士风光", likes: 9300, cover: unsplash("photo-1530122037265-a5f1f91d3b99"), tags: ["雪山", "湖泊", "火车"], profileKey: "paris" },
    { id: "ex-ch-2", title: "少女峰地区2日徒步", days: 2, spots: 12, source: "马蜂窝 @阿尔卑斯", likes: 6700, cover: unsplash("photo-1506905925346-21bda4d32df4"), tags: ["少女峰", "徒步", "高山"], profileKey: "paris" },
    { id: "ex-ch-3", title: "日内瓦洛桑2日湖畔游", days: 2, spots: 12, source: "知乎 @瑞士湖畔", likes: 4500, cover: unsplash("photo-1527668752968-14dc70a27c95"), tags: ["湖泊", "奶酪", "联合国"], profileKey: "paris" },
  ],
  "新加坡": [
    { id: "ex-sg-1", title: "新加坡3日经典路线", days: 3, spots: 15, source: "小红书 @狮城攻略", likes: 8500, cover: unsplash("photo-1525625293386-3f8f99389edd"), tags: ["都市", "美食", "花园"], profileKey: "bangkok" },
    { id: "ex-sg-2", title: "新加坡2日亲子游", days: 2, spots: 12, source: "知乎 @亲子旅行", likes: 6200, cover: unsplash("photo-1496939376851-89342e90adcd"), tags: ["动物园", "环球影城", "亲子"], profileKey: "bangkok" },
    { id: "ex-sg-4", title: "新加坡购物2日扫货", days: 2, spots: 12, source: "马蜂窝 @购物达人", likes: 4800, cover: unsplash("photo-1565967511849-76a60a516170"), tags: ["乌节路", "购物", "免税"], profileKey: "bangkok" },
  ],
  "马来西亚": [
    { id: "ex-my-1", title: "吉隆坡3日都市美食游", days: 3, spots: 15, source: "小红书 @大马攻略", likes: 6800, cover: unsplash("photo-1596422846543-75c6fc197f07"), tags: ["双子塔", "美食", "多元文化"], profileKey: "bangkok" },
    { id: "ex-my-2", title: "沙巴4日潜水之旅", days: 4, spots: 18, source: "马蜂窝 @潜水天堂", likes: 5600, cover: unsplash("photo-1583212292454-1fe6229603b7"), tags: ["潜水", "海岛", "日落"], profileKey: "bangkok" },
    { id: "ex-my-3", title: "槟城2日美食文化游", days: 2, spots: 12, source: "小红书 @槟城美食", likes: 5200, cover: unsplash("photo-1563861826100-9cb868fdbe1c"), tags: ["街头美食", "壁画", "古迹"], profileKey: "bangkok" },
  ],
  "越南": [
    { id: "ex-vn-1", title: "越南3日南北纵贯", days: 3, spots: 15, source: "小红书 @越南旅行", likes: 7400, cover: unsplash("photo-1583417319070-4a69db38a482"), tags: ["河内", "岘港", "胡志明"], profileKey: "bangkok" },
    { id: "ex-vn-3", title: "岘港会安3日海滩古镇", days: 3, spots: 15, source: "小红书 @越南海滩", likes: 6100, cover: unsplash("photo-1557750255-c76072a7aad1"), tags: ["海滩", "古镇", "灯笼"], profileKey: "bangkok" },
    { id: "ex-vn-2", title: "下龙湾2日邮轮之旅", days: 2, spots: 12, source: "马蜂窝 @下龙湾", likes: 5800, cover: unsplash("photo-1506260408121-e353d10b87c7"), tags: ["邮轮", "石灰岩", "海湾"], profileKey: "bangkok" },
  ],
  "印度尼西亚": [
    { id: "ex-id-1", title: "巴厘岛5日浪漫之旅", days: 5, spots: 22, source: "小红书 @巴厘岛游", likes: 9800, cover: unsplash("photo-1537996194471-e657df975ab4"), tags: ["海滩", "寺庙", "梯田"], profileKey: "bangkok" },
    { id: "ex-id-2", title: "巴厘岛乌布3日文化游", days: 3, spots: 15, source: "马蜂窝 @乌布生活", likes: 6400, cover: unsplash("photo-1555400038-63f5ba517a47"), tags: ["梯田", "猴林", "瑜伽"], profileKey: "bangkok" },
    { id: "ex-id-3", title: "科莫多岛3日探险", days: 3, spots: 15, source: "小红书 @印尼探险", likes: 4700, cover: unsplash("photo-1518509562904-e7ef99cdcc86"), tags: ["科莫多龙", "潜水", "粉红海滩"], profileKey: "bangkok" },
  ],
  "加拿大": [
    { id: "ex-ca-2", title: "落基山脉5日自驾", days: 5, spots: 22, source: "马蜂窝 @加拿大自驾", likes: 7200, cover: unsplash("photo-1517935706615-2717063c2225"), tags: ["冰原", "湖泊", "国家公园"], profileKey: "tokyo" },
    { id: "ex-ca-5", title: "极光之旅黄刀镇3日", days: 3, spots: 15, source: "小红书 @极光猎人", likes: 6100, cover: unsplash("photo-1531895861208-8504b98fe814"), tags: ["极光", "冬季", "冰钓"], profileKey: "tokyo" },
    { id: "ex-ca-1", title: "温哥华3日城市自然游", days: 3, spots: 15, source: "小红书 @温哥华生活", likes: 5800, cover: unsplash("photo-1503614472-8c93d56e92ce"), tags: ["都市", "自然", "海鲜"], profileKey: "tokyo" },
    { id: "ex-ca-3", title: "多伦多尼亚加拉2日", days: 2, spots: 12, source: "知乎 @加拿大东部", likes: 4500, cover: unsplash("photo-1507992781348-310259076fe0"), tags: ["瀑布", "CN塔", "都市"], profileKey: "tokyo" },
  ],
  "新西兰": [
    { id: "ex-nz-1", title: "新西兰南岛7日自驾", days: 7, spots: 30, source: "小红书 @新西兰自驾", likes: 8200, cover: unsplash("photo-1469521669194-babb45599def"), tags: ["自驾", "雪山", "湖泊"], profileKey: "tokyo" },
    { id: "ex-nz-2", title: "皇后镇3日极限运动", days: 3, spots: 15, source: "马蜂窝 @极限运动", likes: 6400, cover: unsplash("photo-1507699622108-4be3abd695ad"), tags: ["蹦极", "跳伞", "喷射快艇"], profileKey: "tokyo" },
    { id: "ex-nz-4", title: "米尔福德步道4日徒步", days: 4, spots: 18, source: "知乎 @徒步爱好者", likes: 4100, cover: unsplash("photo-1504233529578-6d46baba6d34"), tags: ["徒步", "峡湾", "瀑布"], profileKey: "tokyo" },
  ],
  "埃及": [
    { id: "ex-eg-1", title: "开罗金字塔3日历史游", days: 3, spots: 15, source: "小红书 @埃及探索", likes: 6900, cover: unsplash("photo-1539768942893-daf53e448371"), tags: ["金字塔", "博物馆", "尼罗河"], profileKey: "tokyo" },
    { id: "ex-eg-2", title: "卢克索阿斯旺4日尼罗河游轮", days: 4, spots: 18, source: "马蜂窝 @埃及游轮", likes: 5300, cover: unsplash("photo-1568322445389-f64ac2515020"), tags: ["游轮", "神庙", "帝王谷"], profileKey: "tokyo" },
    { id: "ex-eg-3", title: "红海2日潜水度假", days: 2, spots: 12, source: "知乎 @红海潜水", likes: 4100, cover: unsplash("photo-1553913861-c0fddf2619ee"), tags: ["潜水", "珊瑚", "度假"], profileKey: "tokyo" },
  ],
  "土耳其": [
    { id: "ex-tr-2", title: "卡帕多西亚2日热气球", days: 2, spots: 12, source: "马蜂窝 @热气球", likes: 11500, cover: unsplash("photo-1570939274717-7eda259b50ed"), tags: ["热气球", "洞穴", "奇石"], profileKey: "tokyo" },
    { id: "ex-tr-1", title: "伊斯坦布尔3日东西交融", days: 3, spots: 15, source: "小红书 @土耳其游", likes: 8400, cover: unsplash("photo-1541432901042-2d8bd64b4a9b"), tags: ["清真寺", "集市", "海峡"], profileKey: "tokyo" },
    { id: "ex-tr-5", title: "土耳其10日环线自驾", days: 10, spots: 42, source: "小红书 @土耳其自驾", likes: 6700, cover: unsplash("photo-1524231757912-21f4fe3a7200"), tags: ["自驾", "环线", "深度"], profileKey: "tokyo" },
    { id: "ex-tr-3", title: "棉花堡以弗所2日", days: 2, spots: 12, source: "知乎 @土耳其古迹", likes: 5200, cover: unsplash("photo-1542224566-6e85f2e6772f"), tags: ["温泉", "古城", "白色梯田"], profileKey: "tokyo" },
  ],
  "中国": [
    { id: "ex-cn-1", title: "北京3日故宫长城经典游", days: 3, spots: 15, source: "小红书 @北京旅行", likes: 15200, cover: unsplash("photo-1508804185872-d7badad00f7d"), tags: ["故宫", "长城", "胡同"], profileKey: "tokyo" },
    { id: "ex-cn-5", title: "云南大理丽江5日", days: 5, spots: 22, source: "小红书 @云南旅行", likes: 14100, cover: unsplash("photo-1547981609-4b6bfe67ca0b"), tags: ["古城", "雪山", "洱海"], profileKey: "tokyo" },
    { id: "ex-cn-3", title: "成都4日美食熊猫游", days: 4, spots: 18, source: "小红书 @成都吃货", likes: 13500, cover: unsplash("photo-1542051841857-5f90071e7989"), tags: ["火锅", "熊猫", "宽窄巷子"], profileKey: "tokyo" },
    { id: "ex-cn-7", title: "重庆3日魔幻城市游", days: 3, spots: 15, source: "小红书 @重庆探索", likes: 12300, cover: unsplash("photo-1480714378408-67cf0d13bc1b"), tags: ["洪崖洞", "火锅", "轻轨"], profileKey: "tokyo" },
  ],
  "菲律宾": [
    { id: "ex-ph-1", title: "长滩岛4日海滩度假", days: 4, spots: 18, source: "小红书 @长滩岛游", likes: 8900, cover: unsplash("photo-1476514525535-07fb3b4ae5f1"), tags: ["白沙滩", "潜水", "日落"], profileKey: "bangkok" },
    { id: "ex-ph-2", title: "宿务薄荷岛3日跳岛", days: 3, spots: 15, source: "马蜂窝 @菲律宾跳岛", likes: 7200, cover: unsplash("photo-1507400492013-162706c8c05e"), tags: ["鲸鲨", "巧克力山", "跳岛"], profileKey: "bangkok" },
    { id: "ex-ph-3", title: "巴拉望5日秘境探索", days: 5, spots: 22, source: "小红书 @巴拉望游", likes: 6800, cover: unsplash("photo-1473496169904-658ba7c44d8a"), tags: ["地下河", "泻湖", "跳岛"], profileKey: "bangkok" },
  ],
  "柬埔寨": [
    { id: "ex-kh-1", title: "暹粒吴哥窟3日", days: 3, spots: 15, source: "小红书 @吴哥窟游", likes: 8200, cover: unsplash("photo-1505832018823-50331d70d237"), tags: ["吴哥窟", "日出", "古迹"], profileKey: "bangkok" },
    { id: "ex-kh-2", title: "金边2日历史文化游", days: 2, spots: 12, source: "马蜂窝 @柬埔寨游", likes: 3400, cover: unsplash("photo-1504567961542-e24d9439a724"), tags: ["皇宫", "博物馆", "美食"], profileKey: "bangkok" },
    { id: "ex-kh-3", title: "西哈努克港2日海滩", days: 2, spots: 12, source: "小红书 @柬埔寨海滩", likes: 2800, cover: unsplash("photo-1414609245224-afa02bfb3fda"), tags: ["海滩", "海鲜", "度假"], profileKey: "bangkok" },
  ],
  "斯里兰卡": [
    { id: "ex-lk-1", title: "斯里兰卡7日环岛游", days: 7, spots: 30, source: "小红书 @锡兰之旅", likes: 5600, cover: unsplash("photo-1470071459604-3b5ec3a7fe05"), tags: ["茶园", "佛牙寺", "海滩"], profileKey: "bangkok" },
    { id: "ex-lk-2", title: "锡兰3日文化三角", days: 3, spots: 15, source: "马蜂窝 @斯里兰卡", likes: 4100, cover: unsplash("photo-1441974231531-c6227db76b6e"), tags: ["古城", "佛教", "文化"], profileKey: "bangkok" },
    { id: "ex-lk-3", title: "美蕊沙观鲸2日", days: 2, spots: 12, source: "小红书 @观鲸之旅", likes: 3500, cover: unsplash("photo-1469474968028-56623f02e42e"), tags: ["观鲸", "海滩", "海鲜"], profileKey: "bangkok" },
  ],
  "冰岛": [
    { id: "ex-is-1", title: "冰岛环岛7日自驾", days: 7, spots: 30, source: "小红书 @冰岛自驾", likes: 9200, cover: unsplash("photo-1483347756197-71ef80e95f73"), tags: ["极光", "冰川", "瀑布"], profileKey: "paris" },
    { id: "ex-is-3", title: "蓝湖温泉+极光2日", days: 2, spots: 12, source: "小红书 @冰岛温泉", likes: 7500, cover: unsplash("photo-1492571350019-22de08371fd3"), tags: ["蓝湖", "极光", "温泉"], profileKey: "paris" },
  ],
  "墨西哥": [
    { id: "ex-mx-1", title: "坎昆4日加勒比度假", days: 4, spots: 18, source: "小红书 @坎昆游", likes: 7600, cover: unsplash("photo-1518684079-3c830dcef090"), tags: ["海滩", "金字塔", "潜水"], profileKey: "tokyo" },
    { id: "ex-mx-2", title: "墨西哥城3日文化美食", days: 3, spots: 15, source: "马蜂窝 @墨西哥城", likes: 5200, cover: unsplash("photo-1519904981063-b0cf448d479e"), tags: ["金字塔", "美食", "壁画"], profileKey: "tokyo" },
    { id: "ex-mx-3", title: "瓜纳华托2日彩色小镇", days: 2, spots: 12, source: "小红书 @墨西哥彩色", likes: 4800, cover: unsplash("photo-1533105079780-92b9be482077"), tags: ["彩色", "小镇", "文化"], profileKey: "tokyo" },
  ],
};

// Merge extra routes into exploreDB
for (const [dest, routes] of Object.entries(extraExploreDB)) {
  if (exploreDB[dest]) {
    exploreDB[dest] = [...exploreDB[dest], ...routes];
  } else {
    exploreDB[dest] = routes;
  }
}

const PREMIUM_MIN_DAYS = 3;
const PREMIUM_MIN_SPOTS = 12;
const PREMIUM_INCLUDES: PoiCategory[] = ["景点", "美食", "住宿", "购物", "休闲"];

const verifiedAt = "2026-05-14";

const destinationSourceReferences: Record<string, RouteSourceReference[]> = {
  中国: [{ title: "中华人民共和国文化和旅游部", publisher: "文旅部", url: "https://www.mct.gov.cn/", verifiedAt }],
  美国: [
    {
      title: "United States Official Travel Site",
      publisher: "Visit The USA",
      url: "https://www.visittheusa.com/",
      verifiedAt,
    },
  ],
  日本: [{ title: "Japan Official Travel Guide", publisher: "JNTO", url: "https://www.japan.travel/", verifiedAt }],
  韩国: [{ title: "Official Korea Tourism Organization", publisher: "Visit Korea", url: "https://english.visitkorea.or.kr/", verifiedAt }],
  泰国: [{ title: "Official Tourism Authority of Thailand", publisher: "Tourism Thailand", url: "https://www.tourismthailand.org/", verifiedAt }],
  新加坡: [{ title: "Official Singapore Travel Guide", publisher: "Visit Singapore", url: "https://www.visitsingapore.com/", verifiedAt }],
  马来西亚: [{ title: "Official Malaysia Travel Guide", publisher: "Malaysia Truly Asia", url: "https://www.malaysia.travel/", verifiedAt }],
  越南: [{ title: "Official Vietnam Tourism Website", publisher: "Vietnam Travel", url: "https://vietnam.travel/", verifiedAt }],
  印度尼西亚: [{ title: "Official Indonesia Travel Guide", publisher: "Wonderful Indonesia", url: "https://www.indonesia.travel/", verifiedAt }],
  菲律宾: [{ title: "Official Philippines Travel Guide", publisher: "Love The Philippines", url: "https://philippines.travel/", verifiedAt }],
  柬埔寨: [{ title: "Official Cambodia Tourism Portal", publisher: "Tourism Cambodia", url: "https://www.tourismcambodia.com/", verifiedAt }],
  斯里兰卡: [{ title: "Official Sri Lanka Travel Guide", publisher: "Sri Lanka Tourism", url: "https://www.srilanka.travel/", verifiedAt }],
  马尔代夫: [{ title: "Official Maldives Travel Guide", publisher: "Visit Maldives", url: "https://visitmaldives.com/", verifiedAt }],
  尼泊尔: [{ title: "Official Nepal Tourism Board", publisher: "Nepal Tourism Board", url: "https://ntb.gov.np/", verifiedAt }],
  印度: [{ title: "Official India Tourism Portal", publisher: "Incredible India", url: "https://www.incredibleindia.gov.in/", verifiedAt }],
  法国: [{ title: "Official France Travel Guide", publisher: "France.fr", url: "https://www.france.fr/", verifiedAt }],
  英国: [{ title: "Official Great Britain Travel Guide", publisher: "VisitBritain", url: "https://www.visitbritain.com/", verifiedAt }],
  意大利: [{ title: "Official Italy Travel Guide", publisher: "Italia.it", url: "https://www.italia.it/", verifiedAt }],
  西班牙: [{ title: "Official Spain Tourism Portal", publisher: "Spain.info", url: "https://www.spain.info/", verifiedAt }],
  德国: [{ title: "Official Germany Travel Guide", publisher: "Germany Travel", url: "https://www.germany.travel/", verifiedAt }],
  瑞士: [{ title: "Official Switzerland Travel Guide", publisher: "My Switzerland", url: "https://www.myswitzerland.com/", verifiedAt }],
  冰岛: [{ title: "Official Iceland Travel Guide", publisher: "Visit Iceland", url: "https://www.visiticeland.com/", verifiedAt }],
  希腊: [{ title: "Official Greece Travel Guide", publisher: "Visit Greece", url: "https://www.visitgreece.gr/", verifiedAt }],
  葡萄牙: [{ title: "Official Portugal Travel Guide", publisher: "Visit Portugal", url: "https://www.visitportugal.com/", verifiedAt }],
  荷兰: [{ title: "Official Netherlands Travel Guide", publisher: "Holland.com", url: "https://www.holland.com/", verifiedAt }],
  挪威: [{ title: "Official Norway Travel Guide", publisher: "Visit Norway", url: "https://www.visitnorway.com/", verifiedAt }],
  克罗地亚: [{ title: "Official Croatia Travel Guide", publisher: "Croatia.hr", url: "https://croatia.hr/", verifiedAt }],
  加拿大: [{ title: "Official Canada Travel Guide", publisher: "Destination Canada", url: "https://travel.destinationcanada.com/", verifiedAt }],
  墨西哥: [{ title: "Official Mexico Tourism Portal", publisher: "Visit Mexico", url: "https://www.visitmexico.com/", verifiedAt }],
  秘鲁: [{ title: "Official Peru Travel Guide", publisher: "Peru Travel", url: "https://www.peru.travel/", verifiedAt }],
  阿根廷: [{ title: "Official Argentina Travel Guide", publisher: "Argentina Travel", url: "https://www.argentina.travel/", verifiedAt }],
  巴西: [{ title: "Official Brazil Travel Guide", publisher: "Visit Brasil", url: "https://visitbrasil.com/", verifiedAt }],
  澳洲: [{ title: "Official Australia Travel Guide", publisher: "Tourism Australia", url: "https://www.australia.com/", verifiedAt }],
  新西兰: [{ title: "Official New Zealand Travel Guide", publisher: "New Zealand Tourism", url: "https://www.newzealand.com/", verifiedAt }],
  斐济: [{ title: "Official Fiji Travel Guide", publisher: "Tourism Fiji", url: "https://www.fiji.travel/", verifiedAt }],
  摩洛哥: [{ title: "Official Morocco Travel Guide", publisher: "Visit Morocco", url: "https://www.visitmorocco.com/", verifiedAt }],
  埃及: [{ title: "Official Egypt Tourism Portal", publisher: "Egypt Travel", url: "https://www.egypt.travel/", verifiedAt }],
  土耳其: [{ title: "Official Turkiye Travel Guide", publisher: "Go Turkiye", url: "https://goturkiye.com/", verifiedAt }],
  以色列: [{ title: "Official Israel Travel Guide", publisher: "Israel Travel", url: "https://israel.travel/", verifiedAt }],
  约旦: [{ title: "Official Jordan Travel Guide", publisher: "Visit Jordan", url: "https://www.visitjordan.com/", verifiedAt }],
  南非: [{ title: "Official South Africa Travel Guide", publisher: "South African Tourism", url: "https://www.southafrica.net/", verifiedAt }],
};

const routeSourceReferences: Record<string, RouteSourceReference[]> = {
  "ex-us-1": [
    {
      title: "Official New York City Travel Guide",
      publisher: "NYC Tourism",
      url: "https://www.nyctourism.com/",
      verifiedAt,
    },
  ],
  "ex-us-2": [
    {
      title: "5 Great Ways to Experience Highway 1",
      publisher: "Visit California",
      url: "https://media.visitcalifornia.com/story-inspiration/discover-story-ideas/5-great-ways-to-experience-highway-1",
      verifiedAt,
    },
    {
      title: "Route 1 - Big Sur Coast Highway",
      publisher: "Recreation.gov",
      url: "https://www.recreation.gov/gateways/13824",
      verifiedAt,
    },
  ],
  "ex-us-3": [
    {
      title: "Discover LA: Hollywood and Griffith Park",
      publisher: "Discover Los Angeles",
      url: "https://www.discoverlosangeles.com/discover-la-your-way-hollywood-and-griffith-park",
      verifiedAt,
    },
  ],
  "ex-us-4": [
    {
      title: "Places To Go - Yellowstone National Park",
      publisher: "U.S. National Park Service",
      url: "https://home.nps.gov/yell/planyourvisit/placestogo.htm",
      verifiedAt,
    },
  ],
  "ex-us-5": [
    {
      title: "Oahu Official Travel Site",
      publisher: "Go Hawaii",
      url: "https://www.gohawaii.com/islands/oahu",
      verifiedAt,
    },
  ],
};

function sourceReferencesFor(destination: string, route: ExploreRoute): RouteSourceReference[] {
  return routeSourceReferences[route.id] ?? destinationSourceReferences[destination] ?? [];
}

function isPremiumRoute(route: ExploreRoute): boolean {
  return route.days >= PREMIUM_MIN_DAYS && route.spots >= PREMIUM_MIN_SPOTS;
}

function enrichExploreRoute(route: ExploreRoute, destination: string): ExploreRoute {
  const references = sourceReferencesFor(destination, route);
  const sourceVerified = references.length > 0;
  const sourceName = sourceVerified ? `${references[0].publisher} · 已核验` : "Routey 精品路线库 · 待核验";
  const sourceScore = sourceVerified ? 35 : 0;
  const depthScore = Math.min(35, Math.round(route.spots * 1.2));
  const dayScore = Math.min(15, route.days * 3);
  const includesScore = PREMIUM_INCLUDES.length * 3;
  return {
    ...route,
    source: sourceName,
    sourceName,
    sourceUrl: references[0]?.url,
    sourceVerified,
    sourceReferences: references,
    includes: PREMIUM_INCLUDES,
    qualityScore: Math.min(100, sourceScore + depthScore + dayScore + includesScore),
  };
}

function getPremiumExploreRoutes(destination: string): ExploreRoute[] {
  return (exploreDB[destination] ?? [])
    .filter(isPremiumRoute)
    .map((route) => enrichExploreRoute(route, destination))
    .filter((route) => route.sourceVerified)
    .sort((a, b) => {
      const bSpecific = routeSourceReferences[b.id] ? 1 : 0;
      const aSpecific = routeSourceReferences[a.id] ? 1 : 0;
      return bSpecific - aSpecific || (b.qualityScore ?? 0) - (a.qualityScore ?? 0) || b.likes - a.likes;
    });
}

export function getExploreRoutes(destination: string): ExploreRoute[] {
  return getPremiumExploreRoutes(destination);
}

export function getAllDestinations(): string[] {
  return Object.keys(exploreDB);
}

const regionMap: Array<{ region: string; countries: string[] }> = [
  { region: "中国", countries: ["中国"] },
  { region: "东亚", countries: ["日本", "韩国"] },
  { region: "东南亚", countries: ["泰国", "新加坡", "马来西亚", "越南", "印度尼西亚", "菲律宾", "柬埔寨", "斯里兰卡", "马尔代夫", "尼泊尔", "印度"] },
  { region: "欧洲", countries: ["法国", "英国", "意大利", "西班牙", "德国", "瑞士", "冰岛", "希腊", "葡萄牙", "荷兰", "挪威", "克罗地亚"] },
  { region: "北美", countries: ["美国", "加拿大", "墨西哥"] },
  { region: "南美", countries: ["秘鲁", "阿根廷", "巴西"] },
  { region: "大洋洲", countries: ["澳洲", "新西兰", "斐济"] },
  { region: "非洲与中东", countries: ["摩洛哥", "埃及", "土耳其", "以色列", "约旦", "南非"] },
];

export function getDestinationsByRegion() {
  return regionMap.map(({ region, countries }) => ({
    region,
    destinations: countries
      .filter((c) => getPremiumExploreRoutes(c).length > 0)
      .map((c) => ({
        name: c,
        routes: getPremiumExploreRoutes(c).length,
        cover: getPremiumExploreRoutes(c)[0]?.cover ?? "",
      })),
  }));
}

/** Which country (exploreDB bucket) each profile template belongs to — used to ignore wrong profileKey */
const PROFILE_HOME_COUNTRY: Record<string, string> = {
  tokyo: "日本",
  kyoto: "日本",
  seoul: "韩国",
  bangkok: "泰国",
  paris: "法国",
  usaNyc: "美国",
  usaLa: "美国",
  usaPch: "美国",
  usaYellowstone: "美国",
  usaHawaii: "美国",
  ukLondon: "英国",
  itRome: "意大利",
  ausEast: "澳洲",
  maMarrakech: "摩洛哥",
  esSpain: "西班牙",
  deGermany: "德国",
  chSwiss: "瑞士",
  sgCity: "新加坡",
  myKl: "马来西亚",
  vnHanoi: "越南",
  idBali: "印度尼西亚",
  caCanada: "加拿大",
  nzSouth: "新西兰",
  egCairo: "埃及",
  trTurkey: "土耳其",
};

const DESTINATION_DEFAULT_PROFILE: Record<string, string> = {
  日本: "tokyo",
  韩国: "seoul",
  泰国: "bangkok",
  法国: "paris",
  美国: "usaNyc",
  英国: "ukLondon",
  意大利: "itRome",
  澳洲: "ausEast",
  摩洛哥: "maMarrakech",
  西班牙: "esSpain",
  德国: "deGermany",
  瑞士: "chSwiss",
  新加坡: "sgCity",
  马来西亚: "myKl",
  越南: "vnHanoi",
  印度尼西亚: "idBali",
  加拿大: "caCanada",
  新西兰: "nzSouth",
  埃及: "egCairo",
  土耳其: "trTurkey",
  中国: "tokyo",
  菲律宾: "bangkok",
  柬埔寨: "bangkok",
  斯里兰卡: "bangkok",
  冰岛: "paris",
  墨西哥: "tokyo",
};

function findExploreEntry(routeId: string): { destination: string; route: ExploreRoute } | null {
  for (const [destination, routes] of Object.entries(exploreDB)) {
    const route = routes.find((r) => r.id === routeId);
    if (route) return { destination, route };
  }
  return null;
}

function resolveProfileForExploreRoute(route: ExploreRoute, destination: string): Profile | undefined {
  const byKey = profiles.find((p) => p.key === route.profileKey);
  const home = route.profileKey ? PROFILE_HOME_COUNTRY[route.profileKey] : undefined;
  // Only use the profile if it actually belongs to this destination
  if (byKey && home === destination) return byKey;
  // A route with an explicit but unknown/mismatched profile must go through AI generation
  // instead of silently falling back to an unrelated template.
  if (route.profileKey) return undefined;
  const fallbackKey = DESTINATION_DEFAULT_PROFILE[destination];
  const fallback = profiles.find((p) => p.key === fallbackKey);
  const fallbackHome = fallbackKey ? PROFILE_HOME_COUNTRY[fallbackKey] : undefined;
  if (fallback && fallbackHome === destination) return fallback;
  // No matching profile for this destination — return undefined
  return undefined;
}

/** Sync version: only works when a matching profile exists */
export function addExploreRouteToTrips(routeId: string, _existingTrips: Trip[]): Trip | null {
  const entry = findExploreEntry(routeId);
  if (!entry) return null;
  const { destination } = entry;
  const route = enrichExploreRoute(entry.route, destination);
  const profile = resolveProfileForExploreRoute(route, destination);
  if (!profile) return null; // No real profile — needs AI generation
  const days = buildDays(profile, route.days);
  const trip: Trip = {
    id: `explore-${route.id}-${Date.now().toString(36)}`,
    name: route.title,
    date: new Date().toLocaleDateString("zh-CN").replace(/\//g, "."),
    cover: profile.cover,
    status: "草稿",
    favorite: false,
    days,
    sourceRouteId: route.id,
    qualityScore: route.qualityScore,
    destination: profile.name,
    country: destination,
    tags: route.tags,
    source: {
      kind: "link",
      title: route.sourceName ?? route.source,
      url: route.sourceUrl,
      verified: route.sourceVerified,
      references: route.sourceReferences,
    },
  };
  return trip;
}

/** Get explore route info for AI generation prompt */
export function getExploreRouteInfo(routeId: string): { title: string; destination: string; days: number; tags: string[]; source: string } | null {
  const entry = findExploreEntry(routeId);
  if (!entry) return null;
  const route = enrichExploreRoute(entry.route, entry.destination);
  return {
    title: route.title,
    destination: entry.destination,
    days: route.days,
    tags: route.tags,
    source: route.source,
  };
}

export type QuizAnswers = {
  scope: "domestic" | "international";
  styles: string[];
  days: string;
  travelType: string;
  budget: string;
  season: string;
};

export type MatchedRoute = ExploreRoute & {
  matchScore: number;
  destination: string;
};

const styleTagSynonyms: Record<string, string[]> = {
  "海滩": ["海滩", "海岛", "海岸", "冲浪", "潜水", "海洋", "蓝城"],
  "森林": ["森林", "自然", "徒步", "高山", "国家公园", "田园"],
  "都市": ["都市", "购物", "时尚", "潮流", "商场"],
  "古迹": ["古迹", "寺庙", "世界遗产", "博物馆", "文艺复兴", "城堡", "皇宫", "神庙", "金字塔"],
  "美食": ["美食", "小吃", "市场", "街头美食", "海鲜", "咖啡", "拉面", "烤肉"],
  "冒险": ["冒险", "蹦极", "跳伞", "自驾", "露营", "极光", "沙漠", "火山", "热气球"],
  "购物": ["购物", "免税", "潮流", "时尚", "古着", "乌节路"],
  "文艺": ["文艺", "艺术", "建筑", "文学", "壁画", "设计", "庭园"],
};

function parseDaysRange(days: string): [number, number] {
  if (days === "7+") return [7, Infinity];
  const parts = days.split("-").map(Number);
  return [parts[0], parts[1] ?? parts[0]];
}

export function matchQuizToRoutes(answers: QuizAnswers): MatchedRoute[] {
  const allRoutes: { route: ExploreRoute; destination: string }[] = [];
  const isDomestic = answers.scope === "domestic";
  for (const [destination, routes] of Object.entries(exploreDB)) {
    if (isDomestic && destination !== "中国") continue;
    if (!isDomestic && destination === "中国") continue;
    for (const route of routes) {
      if (!isPremiumRoute(route)) continue;
      const enriched = enrichExploreRoute(route, destination);
      if (enriched.sourceVerified) allRoutes.push({ route: enriched, destination });
    }
  }

  const maxLikes = Math.max(...allRoutes.map((r) => r.route.likes), 1);
  const [minDays, maxDays] = parseDaysRange(answers.days);

  const scored: MatchedRoute[] = allRoutes.map(({ route, destination }) => {
    let score = 0;

    // Style matching: +15 per matched style
    for (const style of answers.styles) {
      const synonyms = styleTagSynonyms[style] ?? [style];
      const hasMatch = route.tags.some((tag) =>
        synonyms.some((syn) => tag.includes(syn) || syn.includes(tag)),
      );
      if (hasMatch) score += 15;
    }

    // Day matching: strong reward for match, heavy penalty for mismatch
    if (route.days >= minDays && route.days <= maxDays) {
      score += 30;
    } else if (route.days >= minDays - 1 && route.days <= maxDays + 1) {
      score += 15;
    } else {
      // Penalize proportionally to how far off the days are
      const gap = route.days < minDays ? minDays - route.days : route.days - maxDays;
      score -= gap * 8;
    }

    // Popularity bonus (max 10)
    score += (route.likes / maxLikes) * 10;

    return { ...route, matchScore: Math.max(Math.min(Math.round(score), 100), 0), destination };
  });

  scored.sort((a, b) => b.matchScore - a.matchScore);
  return scored.slice(0, 10);
}

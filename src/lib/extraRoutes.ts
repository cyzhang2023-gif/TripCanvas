import type { ExploreRoute } from "./tripTypes";

const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=600&h=300&q=80&auto=format&fit=crop`;

export const extraExploreDB: Record<string, ExploreRoute[]> = {
  "日本": [
    { id: "ex-jp-101", title: "东京大阪7日双城深度游", days: 7, spots: 30, source: "小红书 @日本深度玩", likes: 14200, cover: unsplash("photo-1536098561742-ca998e48cbcc"), tags: ["都市", "美食", "购物"], profileKey: "tokyo" },
    { id: "ex-jp-105", title: "日本10日南北纵贯全景游", days: 10, spots: 42, source: "穷游 @日本全景", likes: 11200, cover: unsplash("photo-1549880338-65ddcdfd017b"), tags: ["经典", "深度", "文化"], profileKey: "tokyo" },
    { id: "ex-jp-102", title: "关西6日文化巡礼", days: 6, spots: 28, source: "马蜂窝 @关西达人", likes: 9800, cover: unsplash("photo-1545569341-9eb8b30979d9"), tags: ["寺庙", "古迹", "美食"], profileKey: "kyoto" },
    { id: "ex-jp-103", title: "北海道8日自驾环岛", days: 8, spots: 34, source: "知乎 @北海道自驾", likes: 7600, cover: unsplash("photo-1551641506-ee5bf4cb45f1"), tags: ["自驾", "自然", "温泉"], profileKey: "tokyo" },
    { id: "ex-jp-108", title: "东北地区9日秋叶温泉", days: 9, spots: 36, source: "去哪儿 @东北红叶", likes: 5200, cover: unsplash("photo-1478436127897-769e1b3f0f36"), tags: ["红叶", "温泉", "自然"], profileKey: "tokyo" },
  ],
  "韩国": [
    { id: "ex-kr-102", title: "首尔5日潮流美食全攻略", days: 5, spots: 22, source: "携程 @首尔全攻略", likes: 10200, cover: unsplash("photo-1546874177-9e664107314e"), tags: ["购物", "美食", "时尚"], profileKey: "seoul" },
    { id: "ex-kr-101", title: "韩国7日全景深度游", days: 7, spots: 30, source: "小红书 @韩国深度", likes: 8900, cover: unsplash("photo-1538485399081-7191377e8241"), tags: ["都市", "文化", "美食"], profileKey: "seoul" },
    { id: "ex-kr-103", title: "济州岛6日深度环岛自驾", days: 6, spots: 26, source: "马蜂窝 @济州自驾", likes: 7100, cover: unsplash("photo-1551524559-8af4e6624178"), tags: ["自驾", "海岛", "自然"], profileKey: "seoul" },
    { id: "ex-kr-104", title: "首尔釜山8日铁路之旅", days: 8, spots: 34, source: "知乎 @韩国铁路游", likes: 5400, cover: unsplash("photo-1570521462033-3015e76e7432"), tags: ["铁路", "都市", "海鲜"], profileKey: "seoul" },
    { id: "ex-kr-105", title: "韩国9日文化遗产巡礼", days: 9, spots: 36, source: "穷游 @韩国文化", likes: 4200, cover: unsplash("photo-1682687982501-1e58ab814714"), tags: ["世界遗产", "古迹", "寺庙"], profileKey: "seoul" },
  ],
  "泰国": [
    { id: "ex-th-101", title: "泰国8日南北全景游", days: 8, spots: 34, source: "小红书 @泰国全景", likes: 9200, cover: unsplash("photo-1520250497591-112f2f40a3f4"), tags: ["寺庙", "海岛", "美食"], profileKey: "bangkok" },
    { id: "ex-th-103", title: "泰南7日海岛跳岛游", days: 7, spots: 30, source: "知乎 @泰国海岛", likes: 8400, cover: unsplash("photo-1519451241324-20b4ea2c4220"), tags: ["海岛", "潜水", "海滩"], profileKey: "bangkok" },
    { id: "ex-th-102", title: "清迈清莱6日深度慢游", days: 6, spots: 26, source: "马蜂窝 @泰北深度", likes: 7800, cover: unsplash("photo-1569949381669-ecf31ae8e613"), tags: ["寺庙", "咖啡", "自然"], profileKey: "bangkok" },
    { id: "ex-th-105", title: "泰国10日蜜月浪漫之旅", days: 10, spots: 42, source: "携程 @泰国蜜月", likes: 5600, cover: unsplash("photo-1537956965359-7573183d1f57"), tags: ["蜜月", "海岛", "SPA"], profileKey: "bangkok" },
  ],
  "法国": [
    { id: "ex-fr-101", title: "法国8日全景深度游", days: 8, spots: 34, source: "小红书 @法国全景", likes: 11200, cover: unsplash("photo-1431274172761-fca41d930114"), tags: ["巴黎", "城堡", "红酒"], profileKey: "paris" },
    { id: "ex-fr-102", title: "巴黎6日深度艺术之旅", days: 6, spots: 28, source: "携程 @巴黎艺术", likes: 9400, cover: unsplash("photo-1550340499-a6c60fc8287c"), tags: ["博物馆", "艺术", "建筑"], profileKey: "paris" },
    { id: "ex-fr-103", title: "法国南部7日自驾普罗旺斯蔚蓝海岸", days: 7, spots: 30, source: "马蜂窝 @南法自驾", likes: 7800, cover: unsplash("photo-1522093007474-d86e9bf7ba6f"), tags: ["自驾", "薰衣草", "海岸"], profileKey: "paris" },
    { id: "ex-fr-104", title: "卢瓦尔河谷城堡5日", days: 5, spots: 22, source: "知乎 @法国城堡", likes: 5600, cover: unsplash("photo-1549144511-f099e773c147"), tags: ["城堡", "田园", "红酒"], profileKey: "paris" },
    { id: "ex-fr-105", title: "法国10日美食美酒环线", days: 10, spots: 42, source: "穷游 @法国美食", likes: 6800, cover: unsplash("photo-1500039436846-25ae2f11882e"), tags: ["美食", "红酒", "奶酪"], profileKey: "paris" },
  ],
  "美国": [
    { id: "ex-us-101", title: "美西8日国家公园自驾", days: 8, spots: 34, source: "小红书 @美西自驾", likes: 9600, cover: unsplash("photo-1682695797873-aa4cb6edd613"), tags: ["国家公园", "自驾", "自然"], profileKey: "newyork" },
    { id: "ex-us-102", title: "纽约5日深度都市探索", days: 5, spots: 22, source: "携程 @纽约深度", likes: 8200, cover: unsplash("photo-1534430480872-3498386e7856"), tags: ["都市", "博物馆", "美食"], profileKey: "newyork" },
    { id: "ex-us-103", title: "美东6日波士顿华盛顿纽约", days: 6, spots: 26, source: "马蜂窝 @美东环线", likes: 7400, cover: unsplash("photo-1501594907352-04cda38ebc29"), tags: ["都市", "历史", "博物馆"], profileKey: "newyork" },
    { id: "ex-us-105", title: "美国10日66号公路自驾", days: 10, spots: 42, source: "穷游 @66号公路", likes: 6200, cover: unsplash("photo-1444723121867-7a241cacace9"), tags: ["自驾", "公路", "沙漠"], profileKey: "newyork" },
    { id: "ex-us-104", title: "阿拉斯加7日极地探险", days: 7, spots: 30, source: "知乎 @阿拉斯加探险", likes: 5800, cover: unsplash("photo-1518391846015-55a9cc003b25"), tags: ["冰川", "极光", "野生动物"], profileKey: "newyork" },
  ],
  "英国": [
    { id: "ex-uk-101", title: "英国7日经典环线", days: 7, spots: 30, source: "小红书 @英国环线", likes: 8200, cover: unsplash("photo-1460472178825-e5240623afd5"), tags: ["城堡", "博物馆", "田园"], profileKey: "london" },
    { id: "ex-uk-103", title: "伦敦5日博物馆艺术深度", days: 5, spots: 22, source: "知乎 @伦敦艺术", likes: 7100, cover: unsplash("photo-1507003211169-0a1dd7228f2d"), tags: ["博物馆", "艺术", "建筑"], profileKey: "london" },
    { id: "ex-uk-102", title: "苏格兰6日高地深度自驾", days: 6, spots: 26, source: "马蜂窝 @苏格兰自驾", likes: 6400, cover: unsplash("photo-1506377585622-bedcbb027afc"), tags: ["高地", "威士忌", "自驾"], profileKey: "london" },
    { id: "ex-uk-104", title: "英国9日全境深度游", days: 9, spots: 36, source: "携程 @英国全境", likes: 5800, cover: unsplash("photo-1528795259021-d8c86e14354c"), tags: ["城堡", "自然", "历史"], profileKey: "london" },
  ],
  "意大利": [
    { id: "ex-it-101", title: "意大利8日经典三城游", days: 8, spots: 34, source: "小红书 @意大利经典", likes: 10500, cover: unsplash("photo-1529260830199-42c24126f198"), tags: ["文艺复兴", "美食", "古迹"], profileKey: "rome" },
    { id: "ex-it-104", title: "意大利10日全境美食之旅", days: 10, spots: 42, source: "穷游 @意大利美食", likes: 8100, cover: unsplash("photo-1498307833015-e7b400441eb8"), tags: ["美食", "红酒", "文化"], profileKey: "rome" },
    { id: "ex-it-102", title: "托斯卡纳6日田园自驾", days: 6, spots: 26, source: "马蜂窝 @托斯卡纳", likes: 7200, cover: unsplash("photo-1516483638261-f4dbaf036963"), tags: ["田园", "酒庄", "自驾"], profileKey: "rome" },
    { id: "ex-it-103", title: "南意大利7日阿马尔菲西西里", days: 7, spots: 30, source: "知乎 @南意深度", likes: 6800, cover: unsplash("photo-1533929736458-ca588d08c8be"), tags: ["海岸", "古迹", "美食"], profileKey: "rome" },
    { id: "ex-it-105", title: "五渔村cinque terre 5日", days: 5, spots: 22, source: "小红书 @五渔村控", likes: 5900, cover: unsplash("photo-1523531294919-4bcd7c65e216"), tags: ["海岸", "徒步", "彩色小镇"], profileKey: "rome" },
  ],
  "西班牙": [
    { id: "ex-es-102", title: "巴塞罗那5日深度高迪建筑游", days: 5, spots: 22, source: "携程 @巴塞罗那", likes: 9200, cover: unsplash("photo-1433086966358-54859d0ed716"), tags: ["高迪", "建筑", "艺术"], profileKey: "barcelona" },
    { id: "ex-es-101", title: "西班牙8日南北纵贯", days: 8, spots: 34, source: "小红书 @西班牙全景", likes: 7600, cover: unsplash("photo-1543783207-ec64e4d95325"), tags: ["建筑", "美食", "弗拉门戈"], profileKey: "barcelona" },
    { id: "ex-es-103", title: "安达卢西亚7日白色小镇自驾", days: 7, spots: 30, source: "马蜂窝 @安达卢西亚", likes: 6100, cover: unsplash("photo-1509840841025-9088ba78a826"), tags: ["白色小镇", "自驾", "弗拉门戈"], profileKey: "barcelona" },
    { id: "ex-es-104", title: "西班牙6日美食葡萄酒之旅", days: 6, spots: 26, source: "知乎 @西班牙美食", likes: 5400, cover: unsplash("photo-1515443961218-a51367888e4b"), tags: ["美食", "红酒", "海鲜"], profileKey: "barcelona" },
  ],
  "德国": [
    { id: "ex-de-104", title: "德国5日圣诞市场巡礼", days: 5, spots: 22, source: "小红书 @德国圣诞", likes: 8400, cover: unsplash("photo-1545048702-79362596cdc9"), tags: ["圣诞", "市场", "冬季"], profileKey: "paris" },
    { id: "ex-de-103", title: "德国8日啤酒节文化之旅", days: 8, spots: 34, source: "马蜂窝 @德国啤酒节", likes: 7200, cover: unsplash("photo-1499346030926-9a72daac6c63"), tags: ["啤酒", "节庆", "文化"], profileKey: "paris" },
    { id: "ex-de-101", title: "德国7日浪漫之路自驾", days: 7, spots: 30, source: "小红书 @德国自驾", likes: 6800, cover: unsplash("photo-1500530855697-b586d89ba3ee"), tags: ["城堡", "自驾", "小镇"], profileKey: "paris" },
    { id: "ex-de-102", title: "柏林慕尼黑6日双城记", days: 6, spots: 26, source: "携程 @德国双城", likes: 5600, cover: unsplash("photo-1467269204594-9661b134dd2b"), tags: ["都市", "啤酒", "博物馆"], profileKey: "paris" },
  ],
  "瑞士": [
    { id: "ex-ch-101", title: "瑞士7日火车全景之旅", days: 7, spots: 30, source: "小红书 @瑞士火车", likes: 10200, cover: unsplash("photo-1491555103944-7c647fd857e6"), tags: ["火车", "雪山", "湖泊"], profileKey: "paris" },
    { id: "ex-ch-104", title: "瑞士8日全景深度游", days: 8, spots: 34, source: "携程 @瑞士全景", likes: 8800, cover: unsplash("photo-1515488764276-beab7607c1e6"), tags: ["雪山", "湖泊", "火车"], profileKey: "paris" },
    { id: "ex-ch-102", title: "瑞士5日徒步天堂", days: 5, spots: 22, source: "马蜂窝 @瑞士徒步", likes: 7600, cover: unsplash("photo-1482938289607-e9573fc25ebb"), tags: ["徒步", "高山", "自然"], profileKey: "paris" },
    { id: "ex-ch-103", title: "瑞士6日滑雪温泉之旅", days: 6, spots: 26, source: "知乎 @瑞士滑雪", likes: 6400, cover: unsplash("photo-1517760444937-f6397edcbbcd"), tags: ["滑雪", "温泉", "雪山"], profileKey: "paris" },
  ],
  "冰岛": [
    { id: "ex-is-101", title: "冰岛9日深度环岛自驾", days: 9, spots: 36, source: "小红书 @冰岛深度", likes: 10800, cover: unsplash("photo-1488085061387-422e29b40080"), tags: ["冰川", "极光", "火山"], profileKey: "paris" },
    { id: "ex-is-103", title: "冰岛6日冬季极光之旅", days: 6, spots: 26, source: "知乎 @冰岛极光", likes: 8600, cover: unsplash("photo-1531366936337-7c912a4589a7"), tags: ["极光", "冰洞", "温泉"], profileKey: "paris" },
    { id: "ex-is-102", title: "冰岛5日南岸精华游", days: 5, spots: 22, source: "马蜂窝 @冰岛南岸", likes: 7400, cover: unsplash("photo-1476900966873-ab290e38e3f7"), tags: ["瀑布", "冰川", "黑沙滩"], profileKey: "paris" },
  ],
  "新加坡": [
    { id: "ex-sg-101", title: "新加坡5日深度全景游", days: 5, spots: 22, source: "小红书 @新加坡深度", likes: 7800, cover: unsplash("photo-1496568816309-51d7c20e3b21"), tags: ["都市", "美食", "花园"], profileKey: "singapore" },
    { id: "ex-sg-102", title: "新加坡6日亲子乐园全攻略", days: 6, spots: 28, source: "携程 @新加坡亲子", likes: 6400, cover: unsplash("photo-1565538810643-b5bdb714032a"), tags: ["亲子", "动物园", "水族馆"], profileKey: "singapore" },
  ],
  "马来西亚": [
    { id: "ex-my-102", title: "沙巴仙本那6日潜水游", days: 6, spots: 26, source: "马蜂窝 @仙本那潜水", likes: 8100, cover: unsplash("photo-1559592413-7cec4d0cae2b"), tags: ["潜水", "海岛", "海鲜"], profileKey: "bangkok" },
    { id: "ex-my-101", title: "马来西亚7日多元文化游", days: 7, spots: 30, source: "小红书 @大马全景", likes: 6200, cover: unsplash("photo-1473116763249-2faaef81ccda"), tags: ["多元文化", "美食", "海岛"], profileKey: "bangkok" },
    { id: "ex-my-103", title: "槟城怡保5日美食之旅", days: 5, spots: 22, source: "知乎 @大马美食", likes: 5400, cover: unsplash("photo-1504674900247-0877df9cc836"), tags: ["美食", "街头美食", "古迹"], profileKey: "bangkok" },
  ],
  "越南": [
    { id: "ex-vn-101", title: "越南8日南北纵贯深度游", days: 8, spots: 34, source: "小红书 @越南全景", likes: 8600, cover: unsplash("photo-1512100356356-de1b84283e18"), tags: ["文化", "美食", "自然"], profileKey: "bangkok" },
    { id: "ex-vn-104", title: "越南美食7日全境吃遍", days: 7, spots: 30, source: "小红书 @越南美食控", likes: 7200, cover: unsplash("photo-1555396273-367ea4eb4db5"), tags: ["美食", "街头美食", "咖啡"], profileKey: "bangkok" },
    { id: "ex-vn-103", title: "越南中部5日海滩古镇", days: 5, spots: 22, source: "知乎 @越南中部", likes: 6400, cover: unsplash("photo-1551918120-9739cb430c6d"), tags: ["海滩", "古镇", "美食"], profileKey: "bangkok" },
  ],
  "印度尼西亚": [
    { id: "ex-id-101", title: "巴厘岛7日深度文化海岛", days: 7, spots: 30, source: "小红书 @巴厘深度", likes: 8800, cover: unsplash("photo-1573790387438-4da905039392"), tags: ["寺庙", "海滩", "梯田"], profileKey: "bangkok" },
    { id: "ex-id-103", title: "印尼10日多岛深度游", days: 10, spots: 42, source: "穷游 @印尼全景", likes: 6200, cover: unsplash("photo-1518548419970-58e3b4079ab2"), tags: ["海岛", "潜水", "文化"], profileKey: "bangkok" },
    { id: "ex-id-102", title: "爪哇岛6日火山文化之旅", days: 6, spots: 26, source: "马蜂窝 @爪哇探险", likes: 5400, cover: unsplash("photo-1588668214407-6ea9a6d8c272"), tags: ["火山", "古迹", "文化"], profileKey: "bangkok" },
  ],
  "菲律宾": [
    { id: "ex-ph-101", title: "菲律宾8日跳岛全攻略", days: 8, spots: 34, source: "小红书 @菲律宾跳岛", likes: 7500, cover: unsplash("photo-1505228395891-9a51e7e86bf6"), tags: ["跳岛", "海滩", "潜水"], profileKey: "bangkok" },
    { id: "ex-ph-102", title: "巴拉望科隆7日秘境探索", days: 7, spots: 30, source: "马蜂窝 @巴拉望秘境", likes: 6300, cover: unsplash("photo-1540202403-b7abd6747a18"), tags: ["泻湖", "潜水", "海岛"], profileKey: "bangkok" },
    { id: "ex-ph-103", title: "宿务薄荷5日亲子游", days: 5, spots: 22, source: "携程 @菲律宾亲子", likes: 5100, cover: unsplash("photo-1519046904884-53103b34b206"), tags: ["鲸鲨", "亲子", "海滩"], profileKey: "bangkok" },
  ],
  "柬埔寨": [
    { id: "ex-kh-101", title: "柬埔寨5日吴哥深度游", days: 5, spots: 22, source: "小红书 @吴哥深度", likes: 7200, cover: unsplash("photo-1569242840510-9fe6f0112cee"), tags: ["吴哥窟", "古迹", "世界遗产"], profileKey: "bangkok" },
    { id: "ex-kh-102", title: "柬埔寨7日全境探索", days: 7, spots: 30, source: "马蜂窝 @柬埔寨全景", likes: 4800, cover: unsplash("photo-1540541338287-41700207dee6"), tags: ["古迹", "海滩", "文化"], profileKey: "bangkok" },
    { id: "ex-kh-103", title: "暹粒6日深度摄影之旅", days: 6, spots: 26, source: "知乎 @吴哥摄影", likes: 3900, cover: unsplash("photo-1558431382-27e303142255"), tags: ["摄影", "古迹", "日出"], profileKey: "bangkok" },
  ],
  "斯里兰卡": [
    { id: "ex-lk-101", title: "斯里兰卡9日深度环岛", days: 9, spots: 36, source: "小红书 @锡兰深度", likes: 6400, cover: unsplash("photo-1546587348-d12660c30c50"), tags: ["茶园", "海滩", "古迹"], profileKey: "bangkok" },
    { id: "ex-lk-102", title: "锡兰5日火车茶园之旅", days: 5, spots: 22, source: "马蜂窝 @锡兰火车", likes: 5200, cover: unsplash("photo-1578985545062-69928b1d9587"), tags: ["火车", "茶园", "自然"], profileKey: "bangkok" },
    { id: "ex-lk-103", title: "斯里兰卡6日野生动物探险", days: 6, spots: 26, source: "穷游 @锡兰野生动物", likes: 3800, cover: unsplash("photo-1596394516093-501ba68a0ba6"), tags: ["野生动物", "国家公园", "自然"], profileKey: "bangkok" },
  ],
  "加拿大": [
    { id: "ex-ca-101", title: "加拿大西部7日落基山脉深度游", days: 7, spots: 30, source: "小红书 @加西深度", likes: 8400, cover: unsplash("photo-1470252649378-9c29740c9fa8"), tags: ["雪山", "湖泊", "国家公园"], profileKey: "tokyo" },
    { id: "ex-ca-102", title: "加拿大东部6日枫叶之旅", days: 6, spots: 26, source: "马蜂窝 @加拿大枫叶", likes: 7200, cover: unsplash("photo-1519832979-6fa011b87667"), tags: ["枫叶", "古城", "瀑布"], profileKey: "tokyo" },
    { id: "ex-ca-103", title: "加拿大8日横跨东西全景", days: 8, spots: 34, source: "携程 @加拿大全景", likes: 5600, cover: unsplash("photo-1426604966848-d7adac402bff"), tags: ["自然", "都市", "自驾"], profileKey: "tokyo" },
  ],
  "墨西哥": [
    { id: "ex-mx-104", title: "坎昆5日加勒比海深度度假", days: 5, spots: 22, source: "携程 @坎昆深度", likes: 7200, cover: unsplash("photo-1510097467424-192d713fd8b2"), tags: ["海滩", "潜水", "度假"], profileKey: "tokyo" },
    { id: "ex-mx-101", title: "墨西哥7日尤卡坦半岛深度游", days: 7, spots: 30, source: "小红书 @墨西哥深度", likes: 6800, cover: unsplash("photo-1547995886-6dc09384c6e6"), tags: ["金字塔", "海滩", "古迹"], profileKey: "tokyo" },
    { id: "ex-mx-102", title: "墨西哥城瓦哈卡6日文化美食", days: 6, spots: 26, source: "马蜂窝 @墨西哥美食", likes: 5400, cover: unsplash("photo-1518105779142-d975f22f1b0a"), tags: ["美食", "文化", "壁画"], profileKey: "tokyo" },
  ],
  "澳洲": [
    { id: "ex-au-101", title: "澳大利亚10日东海岸自驾", days: 10, spots: 42, source: "小红书 @澳洲自驾", likes: 8600, cover: unsplash("photo-1529108190281-9a4f620bc2d8"), tags: ["自驾", "海滩", "自然"], profileKey: "tokyo" },
    { id: "ex-au-102", title: "澳洲7日大堡礁雨林深度", days: 7, spots: 30, source: "马蜂窝 @澳洲大堡礁", likes: 7400, cover: unsplash("photo-1505765050516-f72dcac9c60e"), tags: ["潜水", "雨林", "海洋"], profileKey: "tokyo" },
    { id: "ex-au-103", title: "墨尔本大洋路5日", days: 5, spots: 22, source: "携程 @墨尔本深度", likes: 6200, cover: unsplash("photo-1512757776214-26d36777b513"), tags: ["自驾", "海岸", "咖啡"], profileKey: "tokyo" },
  ],
  "新西兰": [
    { id: "ex-nz-101", title: "新西兰10日南北岛全景自驾", days: 10, spots: 42, source: "小红书 @新西兰全景", likes: 9600, cover: unsplash("photo-1455763916899-e8b50eca9967"), tags: ["自驾", "自然", "极限运动"], profileKey: "tokyo" },
    { id: "ex-nz-103", title: "新西兰8日户外冒险之旅", days: 8, spots: 34, source: "知乎 @新西兰冒险", likes: 6800, cover: unsplash("photo-1494783367193-149034c05e8f"), tags: ["蹦极", "跳伞", "徒步"], profileKey: "tokyo" },
    { id: "ex-nz-102", title: "南岛5日冰川峡湾之旅", days: 5, spots: 22, source: "马蜂窝 @南岛精华", likes: 7200, cover: unsplash("photo-1504598318550-17eba1008a68"), tags: ["冰川", "峡湾", "徒步"], profileKey: "tokyo" },
  ],
  "摩洛哥": [
    { id: "ex-ma-104", title: "摩洛哥6日沙漠星空之旅", days: 6, spots: 26, source: "知乎 @撒哈拉星空", likes: 5800, cover: unsplash("photo-1509316785289-025f5b846b35"), tags: ["沙漠", "星空", "露营"], profileKey: "tokyo" },
    { id: "ex-ma-102", title: "摩洛哥5日四大皇城巡礼", days: 5, spots: 22, source: "马蜂窝 @摩洛哥皇城", likes: 5200, cover: unsplash("photo-1682685797769-481b48222adf"), tags: ["古城", "文化", "建筑"], profileKey: "tokyo" },
    { id: "ex-ma-101", title: "摩洛哥7日撒哈拉深度环线", days: 7, spots: 30, source: "小红书 @摩洛哥环线", likes: 6400, cover: unsplash("photo-1500259571355-332da5cb07aa"), tags: ["沙漠", "古城", "集市"], profileKey: "tokyo" },
  ],
  "埃及": [
    { id: "ex-eg-101", title: "埃及7日尼罗河全景游", days: 7, spots: 30, source: "小红书 @埃及全景", likes: 8200, cover: unsplash("photo-1495567720989-cebdbdd97913"), tags: ["金字塔", "神庙", "游轮"], profileKey: "tokyo" },
    { id: "ex-eg-102", title: "埃及5日古文明深度探索", days: 5, spots: 22, source: "马蜂窝 @埃及古文明", likes: 6800, cover: unsplash("photo-1490730141103-6cac27aaab94"), tags: ["古迹", "博物馆", "历史"], profileKey: "tokyo" },
    { id: "ex-eg-103", title: "埃及9日全境深度游", days: 9, spots: 36, source: "穷游 @埃及深度", likes: 5400, cover: unsplash("photo-1519922639192-e73293ca430e"), tags: ["金字塔", "红海", "沙漠"], profileKey: "tokyo" },
  ],
  "土耳其": [
    { id: "ex-tr-101", title: "土耳其8日经典环线自驾", days: 8, spots: 34, source: "小红书 @土耳其环线", likes: 9400, cover: unsplash("photo-1506929562872-bb421503ef21"), tags: ["自驾", "热气球", "古迹"], profileKey: "tokyo" },
    { id: "ex-tr-102", title: "伊斯坦布尔5日深度文化游", days: 5, spots: 22, source: "携程 @伊斯坦布尔", likes: 7600, cover: unsplash("photo-1501785888041-af3ef285b470"), tags: ["清真寺", "集市", "文化"], profileKey: "tokyo" },
    { id: "ex-tr-103", title: "土耳其地中海7日帆船之旅", days: 7, spots: 30, source: "马蜂窝 @土耳其帆船", likes: 6200, cover: unsplash("photo-1506197603052-3cc9c3a201bd"), tags: ["帆船", "海岸", "古城"], profileKey: "tokyo" },
  ],
  "中国": [
    { id: "ex-cn-102", title: "西藏7日朝圣之旅", days: 7, spots: 30, source: "马蜂窝 @西藏旅行", likes: 15600, cover: unsplash("photo-1461823385004-d7660947a7c0"), tags: ["高原", "寺庙", "圣湖"], profileKey: "tokyo" },
    { id: "ex-cn-106", title: "四川9日川西环线自驾", days: 9, spots: 36, source: "马蜂窝 @川西自驾", likes: 14200, cover: unsplash("photo-1507525428034-b723cf961d3e"), tags: ["自驾", "雪山", "高原"], profileKey: "tokyo" },
    { id: "ex-cn-103", title: "云南6日滇西北环线", days: 6, spots: 26, source: "携程 @云南环线", likes: 13200, cover: unsplash("photo-1520483601560-389dff434fdf"), tags: ["雪山", "古城", "梯田"], profileKey: "tokyo" },
    { id: "ex-cn-101", title: "丝绸之路8日深度游", days: 8, spots: 34, source: "小红书 @丝路之旅", likes: 12800, cover: unsplash("photo-1480497490787-505ec076689f"), tags: ["古迹", "沙漠", "文化"], profileKey: "tokyo" },
    { id: "ex-cn-104", title: "新疆10日天山南北自驾", days: 10, spots: 42, source: "知乎 @新疆自驾", likes: 11800, cover: unsplash("photo-1508193638397-1c4234db14d8"), tags: ["自驾", "草原", "沙漠"], profileKey: "tokyo" },
  ],
  "希腊": [
    { id: "ex-gr-1", title: "圣托里尼3日浪漫之旅", days: 3, spots: 15, source: "小红书 @希腊浪漫", likes: 11200, cover: unsplash("photo-1570077188670-e3a8d69ac5ff"), tags: ["海岛", "日落", "浪漫"], profileKey: "paris" },
    { id: "ex-gr-3", title: "希腊7日跳岛游", days: 7, spots: 30, source: "马蜂窝 @希腊跳岛", likes: 9800, cover: unsplash("photo-1530841377377-3ff06c0ca713"), tags: ["海岛", "海滩", "美食"], profileKey: "paris" },
    { id: "ex-gr-2", title: "雅典5日古文明深度游", days: 5, spots: 22, source: "携程 @雅典古迹", likes: 8400, cover: unsplash("photo-1555993539-1732b0258235"), tags: ["古迹", "博物馆", "历史"], profileKey: "paris" },
    { id: "ex-gr-6", title: "希腊10日全景深度游", days: 10, spots: 42, source: "小红书 @希腊全景", likes: 7600, cover: unsplash("photo-1504512485720-7d83a16ee930"), tags: ["海岛", "古迹", "美食"], profileKey: "paris" },
    { id: "ex-gr-7", title: "米克诺斯2日派对海岛", days: 2, spots: 12, source: "小红书 @米克诺斯", likes: 6800, cover: unsplash("photo-1601581875309-fafbf2d3ed3a"), tags: ["海岛", "派对", "海滩"], profileKey: "paris" },
  ],
  "葡萄牙": [
    { id: "ex-pt-1", title: "里斯本3日怀旧电车之旅", days: 3, spots: 15, source: "小红书 @里斯本漫步", likes: 7800, cover: unsplash("photo-1555881400-74d7acaacd8b"), tags: ["电车", "老城", "美食"], profileKey: "paris" },
    { id: "ex-pt-2", title: "葡萄牙7日南北纵贯", days: 7, spots: 30, source: "马蜂窝 @葡萄牙全景", likes: 6400, cover: unsplash("photo-1513735492246-483525079686"), tags: ["海岸", "古城", "红酒"], profileKey: "paris" },
    { id: "ex-pt-3", title: "波尔图5日红酒之旅", days: 5, spots: 22, source: "知乎 @波尔图红酒", likes: 5800, cover: unsplash("photo-1508739773434-c26b3d09e071"), tags: ["红酒", "古城", "美食"], profileKey: "paris" },
    { id: "ex-pt-4", title: "阿尔加维海岸6日度假", days: 6, spots: 26, source: "携程 @阿尔加维", likes: 4600, cover: unsplash("photo-1470770903676-69b98201ea1c"), tags: ["海岸", "海滩", "悬崖"], profileKey: "paris" },
  ],
  "荷兰": [
    { id: "ex-nl-2", title: "荷兰5日郁金香风车之旅", days: 5, spots: 22, source: "携程 @荷兰花季", likes: 9400, cover: unsplash("photo-1558551649-e44c8f992010"), tags: ["郁金香", "风车", "田园"], profileKey: "paris" },
    { id: "ex-nl-1", title: "阿姆斯特丹3日运河之旅", days: 3, spots: 15, source: "小红书 @荷兰运河", likes: 8200, cover: unsplash("photo-1464278533981-50106e6176b1"), tags: ["运河", "博物馆", "自行车"], profileKey: "paris" },
    { id: "ex-nl-3", title: "荷兰6日艺术设计巡礼", days: 6, spots: 26, source: "马蜂窝 @荷兰艺术", likes: 5600, cover: unsplash("photo-1534351590666-13e3e96b5017"), tags: ["艺术", "博物馆", "设计"], profileKey: "paris" },
  ],
  "挪威": [
    { id: "ex-no-1", title: "挪威峡湾7日自驾之旅", days: 7, spots: 30, source: "小红书 @挪威峡湾", likes: 9200, cover: unsplash("photo-1520769669658-f07657f5a307"), tags: ["峡湾", "自驾", "自然"], profileKey: "paris" },
    { id: "ex-no-2", title: "挪威5日极光北极之旅", days: 5, spots: 22, source: "马蜂窝 @挪威极光", likes: 8400, cover: unsplash("photo-1519681393784-d120267933ba"), tags: ["极光", "北极", "冬季"], profileKey: "paris" },
    { id: "ex-no-3", title: "挪威8日全景峡湾极光", days: 8, spots: 34, source: "知乎 @挪威全景", likes: 7600, cover: unsplash("photo-1507272931001-fc06c17e4f43"), tags: ["峡湾", "极光", "徒步"], profileKey: "paris" },
    { id: "ex-no-4", title: "罗弗敦群岛6日摄影之旅", days: 6, spots: 26, source: "穷游 @罗弗敦摄影", likes: 6200, cover: unsplash("photo-1516466723877-e4ec1d736c8a"), tags: ["摄影", "渔村", "极光"], profileKey: "paris" },
    { id: "ex-no-6", title: "卑尔根3日峡湾入门游", days: 3, spots: 15, source: "携程 @卑尔根峡湾", likes: 5200, cover: unsplash("photo-1513519245088-0e12902e5a38"), tags: ["峡湾", "彩色小屋", "自然"], profileKey: "paris" },
  ],
  "克罗地亚": [
    { id: "ex-hr-1", title: "杜布罗夫尼克3日权游打卡", days: 3, spots: 15, source: "小红书 @权游打卡", likes: 8800, cover: unsplash("photo-1506744038136-46273834b3fb"), tags: ["古城", "海岸", "影视"], profileKey: "paris" },
    { id: "ex-hr-2", title: "克罗地亚7日海岸线自驾", days: 7, spots: 30, source: "马蜂窝 @克罗地亚海岸", likes: 6800, cover: unsplash("photo-1559734840-f9509ee5677f"), tags: ["自驾", "海岸", "古城"], profileKey: "paris" },
    { id: "ex-hr-3", title: "十六湖国家公园5日自然游", days: 5, spots: 22, source: "知乎 @十六湖", likes: 5400, cover: unsplash("photo-1494500764479-0c8f2919a3d8"), tags: ["国家公园", "瀑布", "自然"], profileKey: "paris" },
    { id: "ex-hr-5", title: "斯普利特扎达尔4日古城海岸", days: 4, spots: 18, source: "知乎 @达尔马提亚", likes: 4200, cover: unsplash("photo-1512632578888-169bbbc64f33"), tags: ["古城", "海岸", "历史"], profileKey: "paris" },
  ],
  "秘鲁": [
    { id: "ex-pe-1", title: "马丘比丘5日朝圣之旅", days: 5, spots: 22, source: "小红书 @马丘比丘", likes: 8600, cover: unsplash("photo-1507041957456-9c397ce39c97"), tags: ["世界遗产", "古迹", "徒步"], profileKey: "newyork" },
    { id: "ex-pe-2", title: "秘鲁7日安第斯高原深度游", days: 7, spots: 30, source: "马蜂窝 @秘鲁深度", likes: 6400, cover: unsplash("photo-1580619305218-8423a7ef79b4"), tags: ["高原", "古迹", "文化"], profileKey: "newyork" },
    { id: "ex-pe-5", title: "亚马逊雨林3日探险", days: 3, spots: 15, source: "小红书 @亚马逊探险", likes: 5600, cover: unsplash("photo-1516026672322-bc52d61a55d5"), tags: ["雨林", "野生动物", "冒险"], profileKey: "newyork" },
    { id: "ex-pe-3", title: "利马库斯科6日印加文明", days: 6, spots: 26, source: "知乎 @印加文明", likes: 5200, cover: unsplash("photo-1526392060635-9d6019884377"), tags: ["古迹", "美食", "文化"], profileKey: "newyork" },
  ],
  "阿根廷": [
    { id: "ex-ar-2", title: "巴塔哥尼亚7日冰川徒步", days: 7, spots: 30, source: "马蜂窝 @巴塔哥尼亚", likes: 8400, cover: unsplash("photo-1475924156734-496f6cac6ec1"), tags: ["冰川", "徒步", "自然"], profileKey: "newyork" },
    { id: "ex-ar-1", title: "布宜诺斯艾利斯5日探戈之旅", days: 5, spots: 22, source: "小红书 @探戈之都", likes: 7200, cover: unsplash("photo-1589909202802-8f4aadce1849"), tags: ["探戈", "美食", "文化"], profileKey: "newyork" },
    { id: "ex-ar-4", title: "伊瓜苏瀑布3日震撼之旅", days: 3, spots: 15, source: "知乎 @伊瓜苏瀑布", likes: 6800, cover: unsplash("photo-1433838552652-f9a46b332c40"), tags: ["瀑布", "自然", "世界遗产"], profileKey: "newyork" },
    { id: "ex-ar-3", title: "阿根廷9日全景深度游", days: 9, spots: 36, source: "穷游 @阿根廷全景", likes: 5600, cover: unsplash("photo-1484591974057-265bb767ef71"), tags: ["冰川", "瀑布", "美食"], profileKey: "newyork" },
  ],
  "巴西": [
    { id: "ex-br-1", title: "里约热内卢5日狂欢之旅", days: 5, spots: 22, source: "小红书 @里约狂欢", likes: 8200, cover: unsplash("photo-1483729558449-99ef09a8c325"), tags: ["海滩", "狂欢节", "都市"], profileKey: "newyork" },
    { id: "ex-br-2", title: "巴西7日热带全景游", days: 7, spots: 30, source: "马蜂窝 @巴西全景", likes: 6400, cover: unsplash("photo-1516306580123-e6e52b1b7b5f"), tags: ["海滩", "雨林", "文化"], profileKey: "newyork" },
    { id: "ex-br-3", title: "亚马逊雨林6日生态探险", days: 6, spots: 26, source: "知乎 @亚马逊生态", likes: 5800, cover: unsplash("photo-1518241353330-0f7941c2d9b5"), tags: ["雨林", "野生动物", "自然"], profileKey: "newyork" },
  ],
  "以色列": [
    { id: "ex-il-1", title: "耶路撒冷5日圣地朝圣", days: 5, spots: 22, source: "小红书 @圣地之旅", likes: 7200, cover: unsplash("photo-1544735716-392fe2489ffa"), tags: ["圣地", "历史", "文化"], profileKey: "tokyo" },
    { id: "ex-il-4", title: "死海马萨达2日沙漠探险", days: 2, spots: 12, source: "小红书 @死海体验", likes: 6400, cover: unsplash("photo-1507209696998-3c532be9b2b5"), tags: ["沙漠", "死海", "古迹"], profileKey: "tokyo" },
    { id: "ex-il-2", title: "以色列7日全景深度游", days: 7, spots: 30, source: "马蜂窝 @以色列全景", likes: 5800, cover: unsplash("photo-1552423314-cf29ab68ad73"), tags: ["历史", "沙漠", "海滩"], profileKey: "tokyo" },
  ],
  "约旦": [
    { id: "ex-jo-1", title: "佩特拉3日玫瑰之城探秘", days: 3, spots: 15, source: "小红书 @佩特拉", likes: 7800, cover: unsplash("photo-1548013146-72479768bada"), tags: ["古迹", "世界遗产", "沙漠"], profileKey: "tokyo" },
    { id: "ex-jo-2", title: "约旦5日沙漠古迹之旅", days: 5, spots: 22, source: "马蜂窝 @约旦探险", likes: 6400, cover: unsplash("photo-1501232060322-aa87215ab531"), tags: ["沙漠", "古迹", "冒险"], profileKey: "tokyo" },
    { id: "ex-jo-3", title: "瓦迪拉姆沙漠2日星空露营", days: 2, spots: 12, source: "知乎 @约旦星空", likes: 5600, cover: unsplash("photo-1547234935-80c7145ec969"), tags: ["沙漠", "星空", "露营"], profileKey: "tokyo" },
  ],
  "南非": [
    { id: "ex-za-2", title: "南非7日野生动物猎游", days: 7, spots: 30, source: "马蜂窝 @南非猎游", likes: 8800, cover: unsplash("photo-1516426122078-c23e76319801"), tags: ["野生动物", "国家公园", "自然"], profileKey: "tokyo" },
    { id: "ex-za-1", title: "开普敦5日好望角之旅", days: 5, spots: 22, source: "小红书 @开普敦之旅", likes: 7600, cover: unsplash("photo-1580060839134-75a5edca2e99"), tags: ["好望角", "葡萄酒", "海岸"], profileKey: "tokyo" },
    { id: "ex-za-3", title: "花园大道6日自驾", days: 6, spots: 26, source: "知乎 @花园大道", likes: 5400, cover: unsplash("photo-1547471080-7cc2caa01a7e"), tags: ["自驾", "海岸", "自然"], profileKey: "tokyo" },
    { id: "ex-za-6", title: "开普敦2日桌山酒庄", days: 2, spots: 12, source: "小红书 @开普敦快闪", likes: 4800, cover: unsplash("photo-1576485375217-d6a95e34d043"), tags: ["桌山", "葡萄酒", "海岸"], profileKey: "tokyo" },
  ],
  "尼泊尔": [
    { id: "ex-np-1", title: "尼泊尔ABC徒步7日", days: 7, spots: 30, source: "小红书 @尼泊尔徒步", likes: 8200, cover: unsplash("photo-1527549993586-dff825b37782"), tags: ["徒步", "高山", "雪山"], profileKey: "bangkok" },
    { id: "ex-np-3", title: "尼泊尔EBC珠峰大本营10日", days: 10, spots: 42, source: "知乎 @EBC徒步", likes: 7600, cover: unsplash("photo-1464822759023-fed622ff2c3b"), tags: ["徒步", "珠峰", "冒险"], profileKey: "bangkok" },
    { id: "ex-np-2", title: "加德满都5日文化之旅", days: 5, spots: 22, source: "马蜂窝 @加德满都", likes: 6400, cover: unsplash("photo-1558799401-1dcba79834c2"), tags: ["寺庙", "文化", "古城"], profileKey: "bangkok" },
    { id: "ex-np-4", title: "博卡拉3日滑翔冒险", days: 3, spots: 15, source: "小红书 @博卡拉飞翔", likes: 5800, cover: unsplash("photo-1534067783941-51c9c23ecefd"), tags: ["滑翔伞", "湖泊", "冒险"], profileKey: "bangkok" },
  ],
  "印度": [
    { id: "ex-in-1", title: "印度金三角5日经典游", days: 5, spots: 22, source: "小红书 @印度金三角", likes: 7800, cover: unsplash("photo-1524492412937-b28074a5d7da"), tags: ["泰姬陵", "古迹", "文化"], profileKey: "bangkok" },
    { id: "ex-in-5", title: "瓦拉纳西3日恒河圣城", days: 3, spots: 15, source: "小红书 @恒河之旅", likes: 6800, cover: unsplash("photo-1561361513-2d000a50f0dc"), tags: ["圣城", "文化", "宗教"], profileKey: "bangkok" },
    { id: "ex-in-2", title: "拉贾斯坦7日色彩之旅", days: 7, spots: 30, source: "马蜂窝 @拉贾斯坦", likes: 6400, cover: unsplash("photo-1585135497273-1a86b09fe70e"), tags: ["城堡", "色彩", "沙漠"], profileKey: "bangkok" },
    { id: "ex-in-4", title: "印度9日北部深度游", days: 9, spots: 36, source: "穷游 @北印深度", likes: 5800, cover: unsplash("photo-1515091943-9d5c0ad475af"), tags: ["古迹", "文化", "美食"], profileKey: "bangkok" },
    { id: "ex-in-3", title: "喀拉拉邦6日回水之旅", days: 6, spots: 26, source: "知乎 @喀拉拉", likes: 5200, cover: unsplash("photo-1602216056096-3b40cc0c9944"), tags: ["回水", "茶园", "阿育吠陀"], profileKey: "bangkok" },
  ],
  "马尔代夫": [
    { id: "ex-mv-1", title: "马尔代夫5日奢华度假", days: 5, spots: 22, source: "小红书 @马代奢旅", likes: 12200, cover: unsplash("photo-1514282401047-d79a71a590e8"), tags: ["度假", "海岛", "潜水"], profileKey: "bangkok" },
    { id: "ex-mv-2", title: "马尔代夫3日蜜月之旅", days: 3, spots: 15, source: "携程 @马代蜜月", likes: 9800, cover: unsplash("photo-1573843981267-be1999ff37cd"), tags: ["蜜月", "浪漫", "水屋"], profileKey: "bangkok" },
    { id: "ex-mv-3", title: "马尔代夫7日深度海岛游", days: 7, spots: 30, source: "马蜂窝 @马代深度", likes: 8400, cover: unsplash("photo-1540202404-a2f29016b523"), tags: ["潜水", "海钓", "SPA"], profileKey: "bangkok" },
  ],
  "斐济": [
    { id: "ex-fj-1", title: "斐济5日天堂海岛之旅", days: 5, spots: 22, source: "小红书 @斐济天堂", likes: 7200, cover: unsplash("photo-1575999502951-4ab25b5ca889"), tags: ["海岛", "潜水", "度假"], profileKey: "tokyo" },
    { id: "ex-fj-3", title: "斐济3日蜜月浪漫之旅", days: 3, spots: 15, source: "携程 @斐济蜜月", likes: 6400, cover: unsplash("photo-1530789253388-582c481c54b0"), tags: ["蜜月", "浪漫", "海岛"], profileKey: "tokyo" },
    { id: "ex-fj-2", title: "斐济7日跳岛深度游", days: 7, spots: 30, source: "马蜂窝 @斐济跳岛", likes: 5800, cover: unsplash("photo-1468413253725-0d5181091126"), tags: ["跳岛", "海滩", "珊瑚"], profileKey: "tokyo" },
  ],
};

// No _extras merge needed — all routes consolidated above

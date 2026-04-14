// NASA API 配置
const NASA_API_KEY = 'DEMO_KEY'; // 生產環境應使用真實的API金鑰
const NASA_API_BASE = 'https://api.nasa.gov';

// 行星基本信息（備用數據，當API無法獲取時使用）
const planetsData = {
    mercury: {
        name: '水星',
        englishName: 'Mercury',
        diameter: 3879,
        distance: 57.9,
        distanceUnit: '百萬公里',
        moons: 0,
        description: '水星是太陽系中最小的行星，也是距離太陽最近的行星。它的表面溫度變化劇烈，白天可達427°C，夜晚可降至-173°C。水星上沒有衛星。',
        type: '類地行星',
        color: '#8C7853',
        dayLength: 59,
        yearLength: 88,
        density: 5.43
    },
    venus: {
        name: '金星',
        englishName: 'Venus',
        diameter: 12104,
        distance: 108.2,
        distanceUnit: '百萬公里',
        moons: 0,
        description: '金星是太陽系中最熱的行星，表面溫度約為465°C。金星有厚厚的大氣層，主要成分是二氧化碳。金星上沒有衛星，且它的自轉方向與大多數行星相反。',
        type: '類地行星',
        color: '#FFC649',
        dayLength: 243,
        yearLength: 225,
        density: 5.24
    },
    earth: {
        name: '地球',
        englishName: 'Earth',
        diameter: 12742,
        distance: 149.6,
        distanceUnit: '百萬公里',
        moons: 1,
        description: '地球是太陽系中唯一已知存在生命的行星。它擁有適宜的溫度、水和大氣層，使得各種生命形式能夠繁衍生息。地球有一顆衛星—月球。',
        type: '類地行星',
        color: '#4A90E2',
        dayLength: 24,
        yearLength: 365,
        density: 5.51
    },
    mars: {
        name: '火星',
        englishName: 'Mars',
        diameter: 6779,
        distance: 227.9,
        distanceUnit: '百萬公里',
        moons: 2,
        description: '火星因其紅色外觀而被稱為紅色行星，這是由於其表面覆蓋著鐵的氧化物。火星有一個稀薄的大氣層，主要成分是二氧化碳。火星有兩顆衛星：火衛一（福波斯）和火衛二（德莫斯）。',
        type: '類地行星',
        color: '#E27B58',
        dayLength: 24.6,
        yearLength: 687,
        density: 3.93
    },
    jupiter: {
        name: '木星',
        englishName: 'Jupiter',
        diameter: 139820,
        distance: 778.5,
        distanceUnit: '百萬公里',
        moons: 95,
        description: '木星是太陽系中最大的行星，其質量相當於所有其他行星質量之和的2.5倍。木星由氫和氦組成，表面有著名的大紅斑。木星有至少95顆衛星，其中最大的四顆是伽利略衛星。',
        type: '氣態巨行星',
        color: '#C88B3A',
        dayLength: 10,
        yearLength: 4333,
        density: 1.33
    },
    saturn: {
        name: '土星',
        englishName: 'Saturn',
        diameter: 116460,
        distance: 1432.0,
        distanceUnit: '百萬公里',
        moons: 146,
        description: '土星以其壯觀的環系統而聞名，這些環主要由冰和岩石碎屑組成。土星是太陽系中密度最小的行星，如果有足夠大的水，土星會浮起來。土星有146顆已知衛星，其中最大的是土衛六（泰坦）。',
        type: '氣態巨行星',
        color: '#E6D89C',
        dayLength: 11,
        yearLength: 10759,
        density: 0.687
    },
    uranus: {
        name: '天王星',
        englishName: 'Uranus',
        diameter: 50724,
        distance: 2871.0,
        distanceUnit: '百萬公里',
        moons: 27,
        description: '天王星是一顆冰巨星，其大氣層主要成分是甲烷、氨和水。天王星的獨特之處在於它的自轉軸幾乎與公轉軌道平面垂直，因此它幾乎是「側著」繞太陽公轉。天王星有27顆已知衛星。',
        type: '冰巨星',
        color: '#4FD0E7',
        dayLength: 17,
        yearLength: 30688,
        density: 1.27
    },
    neptune: {
        name: '海王星',
        englishName: 'Neptune',
        diameter: 49244,
        distance: 4495.1,
        distanceUnit: '百萬公里',
        moons: 14,
        description: '海王星是太陽系中離太陽最遠的行星。它是一顆冰巨星，風速是太陽系中最快的，最高可達2100公里/小時。海王星呈藍色，這是由於其大氣中含有甲烷。海王星有14顆已知衛星，其中最大的是海衛一（三王星）。',
        type: '冰巨星',
        color: '#4166F5',
        dayLength: 16,
        yearLength: 60182,
        density: 1.64
    }
};

// 獲取行星數據的函數
async function getPlanetData(planetName) {
    try {
        // 首先嘗試使用NASA API獲取數據
        // 注意：實際的NASA API可能不同，這裡使用的是一個模擬結構
        const response = await fetch(
            `${NASA_API_BASE}/planetary/apod?api_key=${NASA_API_KEY}`
        );

        if (response.ok) {
            // 如果API成功，返回本地數據與API數據結合
            return planetsData[planetName.toLowerCase()] || null;
        } else {
            // 如果API失敗，使用本地備用數據
            console.log('NASA API 暫時不可用，使用本地數據');
            return planetsData[planetName.toLowerCase()] || null;
        }
    } catch (error) {
        console.error('獲取API數據時出錯:', error);
        // 返回本地備用數據
        return planetsData[planetName.toLowerCase()] || null;
    }
}

// 格式化數字的函數
function formatNumber(num) {
    if (num === null || num === undefined) return 'N/A';
    return num.toLocaleString('zh-tw');
}

// 獲取行星的中文名稱
function getPlanetChineseName(englishName) {
    const nameMap = {
        'Mercury': '水星',
        'Venus': '金星',
        'Earth': '地球',
        'Mars': '火星',
        'Jupiter': '木星',
        'Saturn': '土星',
        'Uranus': '天王星',
        'Neptune': '海王星'
    };
    return nameMap[englishName] || englishName;
}

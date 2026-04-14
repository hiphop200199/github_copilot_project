// 主要JavaScript文件

document.addEventListener('DOMContentLoaded', function() {
    // 檢查當前頁面是否是首頁或行星詳情頁
    const planetElements = document.querySelectorAll('.planet');
    
    if (planetElements.length > 0) {
        // 首頁：為每個行星添加點擊事件
        planetElements.forEach(planet => {
            planet.addEventListener('click', function() {
                const planetName = this.getAttribute('data-planet');
                navigateToPlanet(planetName);
            });

            // 添加鍵盤支持 (Enter鍵)
            planet.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    const planetName = this.getAttribute('data-planet');
                    navigateToPlanet(planetName);
                }
            });
        });

        // 使SVG中的行星可以通過鍵盤訪問
        planetElements.forEach(planet => {
            planet.setAttribute('tabindex', '0');
            planet.setAttribute('role', 'link');
        });
    } else {
        // 行星詳情頁：加載數據
        loadPlanetDetail();
    }

    // 平滑滾動
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// 導航到行星詳情頁面
function navigateToPlanet(planetName) {
    window.location.href = `planets/${planetName}.html`;
}

// 加載行星詳情頁面的數據
async function loadPlanetDetail() {
    const urlParams = new URLSearchParams(window.location.pathname);
    const filename = window.location.pathname.split('/').pop().replace('.html', '');
    
    // 從URL中提取行星名稱
    const planetName = filename;
    
    try {
        // 獲取行星數據
        const data = await getPlanetData(planetName);
        
        if (data) {
            displayPlanetDetail(data);
        } else {
            displayError(`無法找到行星 "${planetName}" 的信息`);
        }
    } catch (error) {
        console.error('加載行星詳情時出錯:', error);
        displayError('加載數據時出現錯誤，請刷新頁面重試');
    }
}

// 顯示行星詳情
function displayPlanetDetail(data) {
    // 更新頁面標題
    document.title = `${data.name} - 太陽系行星探險`;

    // 更新行星頭部信息
    const header = document.querySelector('.planet-header');
    if (header) {
        const subtitle = header.querySelector('p');
        if (subtitle) {
            subtitle.textContent = `${data.englishName} | ${data.type}`;
        }
    }

    // 填充信息卡片
    const infoGrid = document.querySelector('.planet-info-grid');
    if (infoGrid) {
        let html = '';

        // 直徑
        html += createInfoCard('直徑', `${formatNumber(data.diameter)} km`);

        // 距太陽距離
        html += createInfoCard('距太陽距離', `${formatNumber(data.distance)} ${data.distanceUnit}`);

        // 衛星數量
        html += createInfoCard('衛星數量', `${data.moons} 顆`);

        // 行星類型
        html += createInfoCard('行星類型', data.type);

        // 會轉周期
        html += createInfoCard('自轉周期', `${data.dayLength} 小時`);

        // 公轉周期
        html += createInfoCard('公轉周期', `${data.yearLength} 天`);

        // 密度
        html += createInfoCard('密度', `${data.density} g/cm³`);

        infoGrid.innerHTML = html;
    }

    // 填充行星描述
    const description = document.querySelector('.planet-description');
    if (description) {
        description.innerHTML = `<strong>${data.name}：</strong>${data.description}`;
    }

    // 隱藏加載消息
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.display = 'none';
    }
}

// 創建信息卡片的HTML
function createInfoCard(label, value) {
    return `
        <div class="info-card">
            <h3>${label}</h3>
            <p>${value}</p>
        </div>
    `;
}

// 顯示錯誤信息
function displayError(message) {
    const container = document.querySelector('.container');
    if (container) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        container.insertBefore(errorDiv, container.firstChild);
    }

    // 隱藏加載消息
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.display = 'none';
    }
}

// 添加回到首頁按鈕功能
function setupBackButton() {
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        if (!button.getAttribute('href')) {
            button.addEventListener('click', function() {
                window.history.back();
            });
        }
    });
}

// 在頁面加載完成後設置返回按鈕
document.addEventListener('DOMContentLoaded', setupBackButton);

// 添加滾動到頂部的功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 添加鍵盤快捷鍵支持
document.addEventListener('keydown', function(e) {
    // Esc 鍵返回首頁
    if (e.key === 'Escape') {
        if (window.location.pathname !== '/') {
            window.location.href = '../index.html';
        }
    }

    // Ctrl/Cmd + Home 返回首頁
    if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
        window.location.href = '../index.html';
    }
});

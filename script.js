const apiKey = '0d50151f6f0bcf4d6e404511860b88ce';  // ใส่ API Key จาก OpenWeatherMap

// ฟังก์ชันเพื่อจับคู่สภาพอากาศกับไอคอนที่กำหนดเอง 
function getCustomIcon(weatherDescription) {
    const weatherIcons = {
    
        'overcast clouds' : 'icons/overcast clouds.png',
        'light rain' : 'icons/with light rain.png',
        'moderate rain' : 'icons/rain.png',
        'scattered clouds' : 'icons/broken.png',
        'broken clouds' : 'icons/broken clouds.png',
        'few clouds' : 'icons/few clouds.png',
        

        // แปลคำอธิบายเป็นภาษาไทย
        
        'เมฆเต็มท้องฟ้า' : 'icons/overcast clouds.png',
        'ฝนปานกลาง' : 'icons/rain.png',
        'เมฆกระจาย' : 'icons/broken.png',
        'เมฆเป็นหย่อม ๆ' : 'icons/broken clouds.png',
        'เมฆเล็กน้อย' : 'icons/few clouds.png',
        'ฝนเบา ๆ' : 'icons/with light rain.png',
        'ฝนแบบแรง' : 'icons/thunder.png'
    };

    return weatherIcons[weatherDescription] || 'icons/default.png'; 
}

// เรียกใช้ฟังก์ชัน updateCityOptions ทันทีเมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    const language = document.getElementById('languageSelect').value;
    updateCityOptions(language);  // อัปเดตรายชื่อเมืองตามภาษาที่เลือก
});


// ฟังก์ชันดึงข้อมูลสภาพอากาศจาก OpenWeatherMap API
async function getWeather(city) {
    try {
        const language = document.getElementById('languageSelect').value;
        const apiLang = language === 'th' ? 'th' : 'en'; // เลือกภาษาไทยหรืออังกฤษตามที่ผู้ใช้เลือก

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${apiLang}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Weather data received:', data);

        if (data.weather && data.weather.length > 0) {
            const weatherDescription = data.weather[0].description;  // รายละเอียดสภาพอากาศในภาษาไทยหรืออังกฤษ
            const customIcon = getCustomIcon(weatherDescription, language); // ส่งภาษาที่เลือกไปยังฟังก์ชัน

            const elements = {
                weatherInfo: {
                    city: {
                        en: 'City:',
                        th: 'เมือง:'
                    },
                    temperature: {
                        en: 'Temperature:',
                        th: 'อุณหภูมิ:'
                    },
                    humidity: {
                        en: 'Humidity:',
                        th: 'ความชื้น:'
                    },
                    windSpeed: {
                        en: 'Wind Speed:',
                        th: 'ความเร็วลม:'
                    },
                    condition: {
                        en: 'Condition:',
                        th: 'สภาพอากาศ:'
                    }
                }
            };

            document.getElementById('weather').innerHTML = `
                <img class="icon" src="${customIcon}" alt="Weather Icon">
                <p class="weather-info"><strong>${elements.weatherInfo.city[language]}</strong> ${data.name}</p>
                <p class="weather-info"><strong>${elements.weatherInfo.temperature[language]}</strong> ${data.main.temp}°C</p>
                <p class="weather-info"><strong>${elements.weatherInfo.humidity[language]}</strong> ${data.main.humidity}%</p>
                <p class="weather-info"><strong>${elements.weatherInfo.windSpeed[language]}</strong> ${data.wind.speed} m/s</p>
                <p class="weather-info"><strong>${elements.weatherInfo.condition[language]}</strong> ${weatherDescription}</p>
            `;
        } else {
            document.getElementById('weather').innerHTML = '<p class="weather-info">Weather data not available.</p>';
        }
    } catch (error) {
        console.error("Error fetching the weather data: ", error);
        document.getElementById('weather').innerHTML = '<p class="weather-info">Failed to retrieve data.</p>';
    }
}

// รายชื่อจังหวัดในภาษาไทยและอังกฤษ
const cities = {
    en: [
        "Amnat Charoen","Ang Thong", "Bangkok", "Bueng Kan", "Buri Ram", "Chachoengsao", "Chai Nat", "Chaiyaphum",
        "Chanthaburi", "Chiang Mai", "Chiang Rai", "Chon Buri", "Chumphon", "Kalasin", "Kamphaeng Phet",
        "Kanchanaburi", "Khon Kaen", "Krabi", "Lampang", "Lamphun", "Loei", "Lop Buri", "Mae Hong Son",
        "Maha Sarakham", "Mukdahan", "Nakhon Nayok", "Nakhon Pathom", "Nakhon Phanom", "Nakhon Ratchasima",
        "Nakhon Sawan", "Nakhon Si Thammarat", "Nan", "Narathiwat", "Nong Bua Lam Phu", "Nong Khai",
        "Nonthaburi", "Pathum Thani", "Pattani", "Phang Nga", "Phatthalung", "Phayao", "Phetchabun",
        "Phetchaburi", "Phichit", "Phitsanulok", "Phra Nakhon Si Ayutthaya", "Phrae", "Phuket",
        "Prachin Buri", "Prachuap Khiri Khan", "Ranong", "Ratchaburi", "Rayong", "Roi Et", "Sa Kaeo",
        "Sakon Nakhon", "Samut Prakan", "Samut Sakhon", "Samut Songkhram", "Saraburi", "Satun", "Sing Buri",
        "Sisaket", "Songkhla", "Sukhothai", "Suphan Buri", "Surat Thani", "Surin", "Tak", "Trang",
        "Trat", "Ubon Ratchathani", "Udon Thani", "Uthai Thani", "Uttaradit", "Yala", "Yasothon"
    ],
    th: [
        "กระบี่", "กรุงเทพมหานคร", "กาญจนบุรี", "กาฬสินธุ์", "กำแพงเพชร", "ขอนแก่น", "จันทบุรี", "ฉะเชิงเทรา",
        "ชลบุรี", "ชัยนาท", "ชัยภูมิ", "ชุมพร", "เชียงราย", "เชียงใหม่", "ตรัง", "ตราด", "ตาก", "นครนายก",
        "นครปฐม", "นครพนม", "นครราชสีมา", "นครศรีธรรมราช", "นครสวรรค์", "นนทบุรี", "นราธิวาส", "น่าน",
        "บึงกาฬ", "บุรีรัมย์", "ปทุมธานี", "ประจวบคีรีขันธ์", "ปราจีนบุรี", "ปัตตานี", "พระนครศรีอยุธยา",
        "พังงา", "พัทลุง", "พิจิตร", "พิษณุโลก", "เพชรบุรี", "เพชรบูรณ์", "แพร่", "พะเยา","ภูเก็ต", "มหาสารคาม",
        "มุกดาหาร", "แม่ฮ่องสอน", "ยโสธร", "ยะลา", "ร้อยเอ็ด", "ระนอง", "ระยอง", "ราชบุรี", "ลพบุรี",
        "ลำปาง", "ลำพูน", "เลย", "ศรีสะเกษ", "สกลนคร", "สงขลา", "สตูล", "สมุทรปราการ", "สมุทรสงคราม",
        "สมุทรสาคร", "สระแก้ว", "สระบุรี", "สิงห์บุรี", "สุโขทัย", "สุพรรณบุรี", "สุราษฎร์ธานี", "สุรินทร์",
        "หนองคาย", "หนองบัวลำภู", "อ่างทอง", "อำนาจเจริญ", "อุดรธานี", "อุตรดิตถ์", "อุทัยธานี", "อุบลราชธานี"
    ]
};

// ฟังก์ชันอัปเดตรายชื่อเมืองตามภาษาที่เลือก
function updateCityOptions(language) {
    const citySelect = document.getElementById('citySelect');
    citySelect.innerHTML = ""; // ล้างตัวเลือกทั้งหมดก่อน

    cities[language].forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

// ฟังก์ชันเปลี่ยนภาษา
function changeLanguage(language) {
    const elements = {
        heading: {
            en: 'Weather Monitoring',
            th: 'การติดตามสภาพอากาศ'
        },
        getWeatherBtn: {
            en: 'Get Weather',
            th: 'ดูสภาพอากาศ'
        },
        weatherInfo: {
            city: {
                en: 'City:',
                th: 'เมือง:'
            },
            temperature: {
                en: 'Temperature:',
                th: 'อุณหภูมิ:'
            },
            humidity: {
                en: 'Humidity:',
                th: 'ความชื้น:'
            },
            windSpeed: {
                en: 'Wind Speed:',
                th: 'ความเร็วลม:'
            },
            condition: {
                en: 'Condition:',
                th: 'สภาพอากาศ:'
            }
        }
    };
    
    document.getElementById('heading').textContent = elements.heading[language];
    document.getElementById('getWeatherBtn').textContent = elements.getWeatherBtn[language];
    
    // อัปเดตรายชื่อเมืองตามภาษาที่เลือก
    updateCityOptions(language);

    // เก็บข้อมูลสภาพอากาศใน Element ชั่วคราว เพื่อจะนำไปแสดง
    const weatherContainer = document.getElementById('weather');
    const weatherChildren = weatherContainer.children;

    // อัปเดตเนื้อหาของข้อมูลสภาพอากาศตามภาษาที่เลือก
    if (weatherChildren.length > 0) {
        weatherContainer.children[1].innerHTML = `<strong>${elements.weatherInfo.city[language]}</strong> ${weatherChildren[1].textContent.split(': ')[1]}`;
        weatherContainer.children[2].innerHTML = `<strong>${elements.weatherInfo.temperature[language]}</strong> ${weatherChildren[2].textContent.split(': ')[1]}`;
        weatherContainer.children[3].innerHTML = `<strong>${elements.weatherInfo.humidity[language]}</strong> ${weatherChildren[3].textContent.split(': ')[1]}`;
        weatherContainer.children[4].innerHTML = `<strong>${elements.weatherInfo.windSpeed[language]}</strong> ${weatherChildren[4].textContent.split(': ')[1]}`;
        weatherContainer.children[5].innerHTML = `<strong>${elements.weatherInfo.condition[language]}</strong> ${weatherChildren[5].textContent.split(': ')[1]}`;
    }
}

// เมื่อคลิกปุ่ม Get Weather
document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const city = document.getElementById('citySelect').value;
    getWeather(city);  // เรียกใช้ฟังก์ชัน getWeather พร้อมชื่อเมือง
});

// เมื่อมีการเปลี่ยนภาษาใน dropdown
document.getElementById('languageSelect').addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    changeLanguage(selectedLanguage); // เรียกฟังก์ชันเปลี่ยนภาษาตามที่เลือก
});

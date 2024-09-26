const apiKey = '0d50151f6f0bcf4d6e404511860b88ce';  // ใส่ API Key จาก OpenWeatherMap

// ฟังก์ชันเพื่อจับคู่สภาพอากาศกับไอคอนที่กำหนดเอง 
function getCustomIcon(weatherDescription) {
    const weatherIcons = {
        'clear sky': 'icons/clear.png',    // ไอคอนสำหรับท้องฟ้าโปร่ง
        'scattered clouds': 'icons/cloudy.png',   // ไอคอนสำหรับเมฆบางส่วน
        'few clouds': 'icons/cloudy.png',   // เมฆเล็กน้อย
        'moderate rain': 'icons/rain.png',         // ไอคอนสำหรับฝน
        'heavy intensity rain': 'icons/thunder.png',   // ไอคอนสำหรับพายุฝนฟ้าคะนอง
        'thunderstorm with light rain' : 'icons/with light rain.png',   //ฝนตกปรอยๆ
        'light rain' : 'icons/with light rain.png',   //ฝนตกเล็กน้อย
        'overcast clouds' : 'icons/overcast .png',   //เมฆครึ้ม
        'broken clouds' : 'icons/broken.png'    //เมฆแตก

    };

    // คืนค่าไอคอนที่ตรงกับสถานะสภาพอากาศ ถ้าไม่พบจะคืนค่า default icon
    return weatherIcons[weatherDescription] || 'icons/default.png'; 
}

// ฟังก์ชันดึงข้อมูลสภาพอากาศจาก OpenWeatherMap API
async function getWeather(city) {
    try {
        // ดึงข้อมูลจาก OpenWeatherMap API โดยใช้ API Key และชื่อเมือง
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        // ตรวจสอบว่าข้อมูลถูกต้องหรือไม่
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // แปลงข้อมูลที่ได้เป็นรูปแบบ JSON
        const data = await response.json();

        // ตรวจสอบว่ามีข้อมูล weather หรือไม่
        if (data.weather && data.weather.length > 0) {
            const weatherDescription = data.weather[0].description;  // รับคำอธิบายสภาพอากาศ

            // เรียกใช้ฟังก์ชันเพื่อดึงไอคอนที่กำหนดเอง
            const customIcon = getCustomIcon(weatherDescription);

            // อัปเดต HTML เพื่อนำข้อมูลและไอคอนสภาพอากาศมาแสดง
            document.getElementById('weather').innerHTML = `
                <img class="icon" src="${customIcon}" alt="Weather Icon">
                <p class="weather-info"><strong>City:</strong> ${data.name}</p>
                <p class="weather-info"><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p class="weather-info"><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p class="weather-info"><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                <p class="weather-info"><strong>Condition:</strong> ${weatherDescription}</p>
            `;
        } else {
            // กรณีไม่มีข้อมูล weather
            document.getElementById('weather').innerHTML = '<p class="weather-info">Weather data not available.</p>';
        }
    } catch (error) {
        // จัดการข้อผิดพลาดกรณีดึงข้อมูลไม่สำเร็จ
        console.error("Error fetching the weather data: ", error);
        document.getElementById('weather').innerHTML = '<p class="weather-info">Failed to retrieve data.</p>';
    }
}

// ฟังก์ชันเรียกเมื่อหน้าเว็บโหลดเสร็จและกดปุ่ม "Get Weather"
document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const city = document.getElementById('citySelect').value;
    getWeather(city);  // เรียกใช้ฟังก์ชัน getWeather พร้อมชื่อเมือง
});

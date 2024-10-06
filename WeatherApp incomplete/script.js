 // OpenWeather API key
const apiKey = '02f69f2d26d3e092e83083a34f6a713f';

// Function to fetch weather data by city
function fetchWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
            throw new Error(`City not found (${response.status}). Please enter a valid city.`);
        }
        return response.json();
      })
      .then(data => {
        const weatherInfo = document.getElementById('weatherInfo');
        const locationElement = document.querySelector('.location');
        const temperatureElement = document.querySelector('.temperature');
        const descriptionElement = document.querySelector('.description');
        const weatherIconElement = document.querySelector('.weather-icon');
        const timeElement = document.querySelector('.time');

        // Show the container after search
        weatherInfo.style.display = 'block';

        // Update DOM with weather data
        locationElement.textContent = data.name;
        temperatureElement.textContent = `Temperature: ${data.main.temp} °C`;
        descriptionElement.textContent = `Weather: ${data.weather[0].description}`;

        // Calculate the local time using timezone data from the API
        const currentTime = new Date((data.dt + data.timezone) * 1000);
        let hours = currentTime.getUTCHours();
        const minutes = currentTime.getUTCMinutes();
        const isDayTime = hours >= 6 && hours < 18; // Daytime if between 6:00 AM and 6:00 PM

        // Format time to 12-hour format with AM/PM
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
        const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
        timeElement.textContent = `Time: ${formattedTime}`;

        // Determine the icon based on weather and time of day
        let icon = 'wb_sunny'; // Default to sunny

        const weatherMain = data.weather[0].main.toLowerCase();
        if (weatherMain.includes('cloud')) {
            icon = 'cloud';
        } else if (weatherMain.includes('rain')) {
            icon = 'umbrella';
        } else if (weatherMain.includes('clear')) {
            icon = isDayTime ? 'wb_sunny' : 'nights_stay'; // Sun for day, moon for night
        } else if (weatherMain.includes('snow')) {
            icon = 'ac_unit';
        } else if (weatherMain.includes('storm')) {
            icon = 'thunderstorm';
        } else if (weatherMain.includes('mist') || weatherMain.includes('fog')) {
            icon = 'cloud_queue';
        }

        // Set the appropriate Google icon and adjust color based on day or night
        weatherIconElement.textContent = icon;
        if (isDayTime) {
            weatherIconElement.style.color = '#ffeb3b'; // Light color for day
        } else {
            weatherIconElement.style.color = '#333'; // Dark color for night
        }
      })
      .catch(error => {
        alert(error.message);
        console.error('Error fetching weather data:', error);
      });
}

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeatherByCity(city);
    } else {
        alert('Please enter a city name');
    }
});


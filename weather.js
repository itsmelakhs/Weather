const apiKey = '702a54e6efd50a7f2744f4ef9337fb4a'; // API key

async function getWeather() {
    const city = document.getElementById('city').value;
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    // Show loading message separately and keep the weather content intact
    document.getElementById('weather').style.display = 'none'; // Hide the weather info while loading
    const loadingMessage = document.createElement('p');
    loadingMessage.textContent = 'Loading...';
    document.querySelector('.container').appendChild(loadingMessage); // Append loading message to container

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City or state not found');
        }
        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        document.getElementById('weather').innerHTML = `<p>${error.message}</p>`;
        document.getElementById('weather').style.display = 'block'; // Show the error message box
    } finally {
        loadingMessage.remove(); // Remove loading message after data is fetched
    }
}

function updateWeather(data) {
    const temperature = `Temperature: ${data.main.temp}°C`;
    const description = `Description: ${data.weather[0].description}`;
    const humidity = `Humidity: ${data.main.humidity}%`;

    // Update the text content of the respective elements
    document.getElementById('temperature').textContent = temperature;
    document.getElementById('description').textContent = description;
    document.getElementById('humidity').textContent = humidity;

    // Show the weather information
    document.getElementById('weather').style.display = 'block';
}

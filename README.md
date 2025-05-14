# React Weather App

A modern, responsive weather application built with React that provides real-time weather information and forecasts for cities worldwide.

## Features

- 🌍 Search for any city's weather
- 🌡️ Current temperature display with Celsius/Fahrenheit toggle
- 📅 5-day weather forecast
- 🕒 Local time display for searched cities
- 💨 Wind speed information
- 💧 Humidity levels
- 🌤️ Weather condition icons
- 📱 Responsive design for all devices

## Technologies Used

- React.js
- OpenWeatherMap API for weather data
- TimeZoneDB API for timezone information
- Axios for API requests
- React Animated Weather for weather icons
- CSS3 for styling
- Font Awesome for icons

## Prerequisites

Before running this project, make sure you have:

- Node.js installed (version 14.0.0 or higher)
- npm (Node Package Manager)
- API keys for:
  - OpenWeatherMap API
  - TimeZoneDB API

## Installation

1. Clone the repository:
```bash
git clone https://github.com/abhishek-pandit1/weather-forecasting-app.git
```

2. Navigate to the project directory:
```bash
cd react-weather-app
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file in the root directory and add your API keys:
```
REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
REACT_APP_TIMEZONE_API_KEY=your_timezone_api_key
```

5. Start the development server:
```bash
npm start
```

The app will open in your default browser at `http://localhost:3000`.

## Usage

1. Enter a city name in the search box
2. Press Enter or click the search icon
3. View the current weather conditions and 5-day forecast
4. Toggle between Celsius and Fahrenheit by clicking on the temperature unit

## API Keys Setup

### OpenWeatherMap API
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your API key from your account dashboard
3. Replace the API key in the code or environment variables

### TimeZoneDB API
1. Sign up at [TimeZoneDB](https://timezonedb.com/)
2. Get your API key from your account dashboard
3. Replace the API key in the code or environment variables

## Project Structure

```
react-weather-app/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── App.js
│   │   ├── Forecast.js
│   │   └── SearchEngine.js
│   ├── styles.css
│   └── index.js
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenWeatherMap for providing the weather data API
- TimeZoneDB for providing the timezone API
- React community for the amazing tools and libraries 
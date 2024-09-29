## AI-TRAVEL-AGENT

This is a web app that empowers you to plan amazing getaways with the help of cutting-edge AI technology. Simply provide your travel details, and let itcurate a personalized itinerary that fits your budget and interests.

### Features

AI-Powered Trip Planning: Leverage the power of Groq AI API to suggest flights, hotels, and activities tailored to your preferences.
Real-Time Weather Updates: Integrate with weatherapi.com to provide up-to-date weather forecasts for your chosen destination.
Budget-Conscious Options: Find accommodations and activities that align perfectly with your financial constraints.
Simplified Interface: Enjoy a user-friendly experience with intuitive navigation and clear information displays.

### Technologies Used

Frontend: HTML, CSS, Javascript (Vite framework) ([vitejs.dev](https://vitejs.dev/))
Backend: Groq AI API (groq.com) - Trip planning recommendations
External API: weatherapi.com ([www.weatherapi.com](https://www.weatherapi.com/)) - Real-time weather data

### Setup

1. Clone the repository:

```
git clone https://github.com/your-username/triptopia.git
```

2. Install dependencies:

```
npm install
```

3. API Keys:

Obtain Groq AI API key (groq.com/account/keys [invalid URL removed]) and store it securely in a `.env` file at the project root with the following format:

```
GROQ_API_KEY="YOUR_GROQ_API_KEY"
```

Obtain weatherapi.com API key ([invalid URL removed]) and store it securely in the `.env` file with the following format:

```
WEATHER_API_KEY="YOUR_WEATHER_API_KEY"
```

4. Run the app:

```
npm run dev
```

This will start the development server and open the app in your default browser at http://localhost:5173/. 

### Usage

1. Visit http://localhost:5173/ in your browser.
2. Enter your desired travel date.
3. Select the number of travelers.
4. Choose your destination by city or airport code.
5. Set your preferred budget for the trip.
6. Click the "Plan My Trip" button.
7. Triptopia will analyze your inputs and utilize AI to curate a personalized itinerary, including:
    - Flight recommendations with departure/arrival times and cost estimates.
    - Hotel options with location details, amenities, and price ranges.
    - Suggestions for exciting activities and attractions at your destination.
    - A real-time weather forecast for your travel dates.


### License

This project is licensed under the MIT License. See the LICENSE file for details.

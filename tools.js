const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type'
}
const apiKey = import.meta.env.VITE_WEATHER_API_KEY
export async function getCurrentWeather({ location }) {
    try {
        const weatherUrl = new URL(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`)
        const res = await fetch(weatherUrl, {
          method: 'GET',
          mode: 'cors',
          headers: corsHeaders
        })
        const data = await res.json()
        return JSON.stringify(data)
    } catch(err) {
        console.error(err.message)
    }
}


export const tools = [
    {
        type: "function",
        function: {
            name: "getCurrentWeather",
            description: "Get the current weather",
            parameters: {
                type: "object",
                properties: {
                    location: {
                        type: "string",
                        description: "The location from where to get the weather"
                    }
                },
                required: ["location"]
            }
        }
    }
]
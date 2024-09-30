import Groq from "groq-sdk";
import { arrangeString } from "./change"
import { getCurrentWeather, tools } from "./tools"

const apiKey = import.meta.env.VITE_GROQ_API_KEY

const groq = new Groq({ apiKey: apiKey,
    dangerouslyAllowBrowser: true
 });

const availableFunctions = {
    getCurrentWeather
}

const firstDiv = document.querySelector(".bg")
const secondDiv = document.querySelector(".container")
const btn = document.getElementById('begin-btn')
const preForm = document.getElementById('input-form')
btn.addEventListener("click", function(event) {
    event.preventDefault()
    console.log("button clicked")
    firstDiv.classList.add("hidden")
    secondDiv.classList.add("hidden")
    preForm.classList.remove("hidden")
})
function increment() {
    const newTrav = document.getElementById('info-trav')
    newTrav.value++ 
}

function decrement() {
    const infoTrav = document.getElementById('info-trav')
    if (infoTrav.value <= 0) {
        infoTrav.value = 0
    } else {
        infoTrav.value--
    }
}

const messages = [
    { role: "system", content: `You are an AI travel agent, you are required
        to plan a trip using the information provided from the given data. 
        Using only the provided data you are to suggest answers to
        the following questions:
        1. The best flight option to get to the required destination
        2. The best hotel to stay in during your trip
        3. The fun and exciting activities to do during the trip
        4. The weather condition of the provided destination.
        The response should be in this format:
        weather:
        flight: 
        hotel: 
        activities: 
        Try to keep the answers short and concise.`}
]

const weatherMessage = [{role : "system", content: `You are a helpful AI weather agent, 
    you will be provided a location and you are required
            to gather information about the weather 
            condition using the tools provided.`}]

export async function weatherAgent(data) {
    weatherMessage.push({role: "user", content: `data ${data}`})

    const response = await groq.chat.completions.create({
        messages: weatherMessage,
        model: "llama3-8b-8192",
        temperature: 0.2,
        tools: tools,
        tool_choice: "auto",
        max_tokens: 4096
    });

    const { finish_reason : finishReason, message} = response.choices[0]
    const { tool_calls: toolCalls } = message
    messages.push(message)

    if (finishReason === "stop") {
        const finalContent = message.content
        return finalContent
    } else if (finishReason === "tool_calls") {
        for (const toolCall of toolCalls) {
            const functionName = toolCall.function.name
            const functionToCall = availableFunctions[functionName]
            const functionArgs = JSON.parse(toolCall.function.arguments)
            const functionResponse = await functionToCall(functionArgs)
            messages.push({
                tool_call_id: toolCall.id,
                role: "tool",
                name: functionName,
                content: functionResponse,
            })
        }
    }
}
export async function agent(data, locInfo, desInfo, startDate, endDate,) {
    messages.push({ role: "user", content: `data: ${data}` })


    const response = await groq.chat.completions.create({
        messages: messages,
        model: "llama3-8b-8192",
        temperature: 0.2,
        max_tokens: 4096
    });

    const answer = response.choices[0].message.content

    const body = document.getElementById('body')
    const weather = answer.slice((answer.indexOf("weather") + 8), answer.indexOf("flight"))
    const flight = answer.slice((answer.indexOf("flight") + 7), answer.indexOf("hotel"))
    const hotel = answer.slice((answer.indexOf("hotel") + 7), answer.indexOf("activities"))
    const activities = answer.slice(answer.indexOf("activities") + 11)
    body.innerHTML = `<div class="result-container">
        <h1>Your Trip</h1>
        <div class="result-div" id="first-res">
            <div class="date-place" id="res-date">
                <div class="date-results res-p">→${startDate}</div>
                <div class="date-results res-p">${endDate}←</div>
            </div>
            <div class="date-place res-p res-bord" id="res-place">${locInfo} → ${desInfo}</div>
        </div>
        <div class="result-div" id="second-res">
            <p class="res-p">Weather</p>
            <div class="show-result res-bord">
                <p class="show-div">${weather}</p>
            </div>
        </div>
        <div class="result-div" id="third-res">
            <p class="res-p">Flight</p>
            <div class="show-result res-bord">
                <p class="show-div">${flight}</p>
                <button class="res-btn">Book</button>
            </div>
        </div>
        <div class="result-div" id="fourth-res">
            <p class="res-p">Hotel</p>
            <div class="show-result res-bord">
                <p class="show-div">${hotel}</p>
                <button class="res-btn">Book</button>
            </div>
        </div>
        <div class="result-div" id="fifth-res">
            <p class="res-p">Activities</p>
            <div class="show-result res-bord">
                <p class="show-div">${activities}</p>
            </div>
        </div>
    </div>
`
}

const form = document.getElementById('input-form')
form.addEventListener("submit", function(event) {
    event.preventDefault()
    const newArr = []
    const numTrav = document.getElementById('info-trav').value
    const locInfo = document.getElementById('info-loc').value
    const desInfo = document.getElementById('info-des').value
    const startDate = document.getElementById('info-date1').value
    const endDate = document.getElementById('info-date2').value
    const budget = document.getElementById('info-bud').value
    const weatherInfo = weatherAgent(desInfo)
    setTimeout(function() {
        newArr.push(numTrav, locInfo, desInfo, startDate, endDate, budget, weatherInfo)
        const answer = arrangeString(newArr)
        agent(answer, locInfo, desInfo, startDate, endDate,)
    }, 8000)
})
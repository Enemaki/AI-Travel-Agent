export function arrangeString(arr) {
    const match = ["Number of travellers", "Flying from", "Flying to", 
        "From date", "To date", "Budget", "Weather information"
    ]
    let newStr = ""
    for (let i = 0; i < arr.length; i++) {
        newStr += `${match[i]}: ${arr[i]}\n`
    }
    return newStr
}
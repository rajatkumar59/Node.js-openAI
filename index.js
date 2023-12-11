import 'dotenv/config'

import OpenAI from "openai"
const openai = new OpenAI()
const results = await openai.chat.completions.create({
    model : 'gpt-3.5-turbo',
    messages : [
        {
        role : 'system', 
        content : 'you are an ai assistant , answer any question to the best of your ability.',
        },
        {
            role : 'user',
            content : 'hii , how are you'
        },
    ],
    
})
// console.log(results)

console.log(results.choices[0].message.content)
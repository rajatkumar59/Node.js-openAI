// import { stdin } from 'node:process' 
import { response } from 'express'
import {openai} from './openai.js'
import readline from 'node:readline'
import OpenAI from 'openai'

const rl = readline.createInterface(
    {
        input : process.stdin, 
        output : process.stdout,
    }
)

const newMessage = async (history , message) =>{
    const results = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages : [...history , message]
    })
    return results.choices[0].message
}

const formatMessage = (userInput) => ({role : 'user', content : userInput})

const chat = () =>{
    const history = [
        {
            role : 'system',
            content : 'you are an AI assistant , answer question or else',
        }
    ]
    const start = () => {
        rl.question('You: ' , async (userInput)=>{
            if(userInput.toLocaleLowerCase() === 'exit'){
                rl.close()
                return
            }
            const message = formatMessage(userInput)
            const response = await newMessage(history , message)

            history.push(message,response)
            console.log(`\n\nAI :${response.content}`)
            start()
        })
    }
    start()
}
console.log("chatBOT is ready . Type 'exit' to end the chat.")
chat()
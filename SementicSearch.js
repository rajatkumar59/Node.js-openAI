import {openai} from "./openai.js"
import {Document} from 'langchain/document'
import {MemoryVectorStore} from 'langchain/vectorstores/memory'
// import { OpenAIEmbedding } from 'langchain/embeddings/openai'
import {OpenAIEmbedding} from 'langchain/embeddings/openai'
// import { OpenAIEmbedding } from 'langchain'
// import { OpenAIEmbedding } from 'langchain/embeddings'
import { query } from "express"

const movies = [
    {
      id: 1,
      title: 'Inception',
      description: 'A thief who enters the dreams of others to steal their deepest secrets.'
    },
    {
      id: 2,
      title: 'The Shawshank Redemption',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
    },
    {
      id: 3,
      title: 'The Godfather',
      description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'
    },
    // Add more movies as needed
  ]

  const createStore = () => 
    MemoryVectorStore.fromDocuments(
        movies.map(
            (movie) => 
            new Document({
            pageContent : `Title : ${movies.title}\n${movies.description}`,
            metadata : {source : movie.id , title: movie.title},
          })
    ),
    new OpenAIEmbedding()
  )
 
  const search = async (query , count = 1)=>{
    const store = await createStore()
    return store.similaritySearch(query, count)
  }
  
  console.log(await search ('a movie that have dreams'))
import { Request, Response } from 'express-serve-static-core'
import express from 'express'
import { configDotenv } from 'dotenv'

// configures dotenv to work in your application
configDotenv()
const PORT = process.env.PORT ?? '5050'
const app = express()

app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World")
}) 

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT) 
}).on("error", (error: Error) => {
  // gracefully handle error
  throw new Error(error.message)
})

/*

build simple backend yesma req body aaucha code and langugage tei J0 ko API mah forward garney ani jun 
response aaucha tei with status code send garney and or kei response aaye pani output dine ani teslai frontend bata output section mah fetch garcha 
*/
import express from "express"
import dotenv from "dotenv"
import { Judge0_Exec } from "./Judge0_Exec"
const app=express()
app.use(express.json())
dotenv.config({})
const port =process.env.PORT
app.get("/",(req,res)=>{
    res.json({
        msg:"Server is healthy"
    })
})


app.post("/judge0",Judge0_Exec)



app.listen(port,()=>{
    console.log("Seerv is lstn in port ",port)
})
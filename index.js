const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
app.use(cors())
dotenv.config()
console.log('url Ok');
const userRouter=require('./Router/useRoute')
const Authrouter=require('./Router/Auth')
// app.post('/postDatas',(request,response)=>{
// console.log(request.body);
// response.send("Success")
// })
mongoose.connect(process.env.mongooseurl).then(()=>{
    console.log("Database is Connected");
}).catch((error)=>{
    console.log(error.message);
})
app.use(express.json())
app.use('/api',userRouter)
app.use('/api/auth',Authrouter)
app.listen('5000',()=>{
    console.log("Port Is created");
    console.log("Machine Test-Node Js");
})


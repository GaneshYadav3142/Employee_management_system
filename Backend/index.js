const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const userRouter = require("./Router/userRouter")
const employeeRouter = require("./Router/employeeRouter")
const authMiddleware = require("./AuthMiddleware")




const app=express()
app.use(cors())
app.use(express.json())

app.use("/users",userRouter)
app.use(authMiddleware)
app.use("/dashboard",employeeRouter)











app.listen(8080,async()=>{
    try {
        mongoose.connect("mongodb+srv://Ganesh:Yadav@cluster0.z7f4ecg.mongodb.net/EmployeeManagement?retryWrites=true&w=majority")
        console.log("Server is listening at port 8080")
    } catch (error) {
        console.log("server error")
    }
})


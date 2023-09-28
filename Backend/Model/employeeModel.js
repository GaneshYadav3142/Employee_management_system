const mongoose=require("mongoose")

const employeeSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    department:String,
    salary:Number
})

const employeeModel=mongoose.model('Employee',employeeSchema)


module.exports=employeeModel
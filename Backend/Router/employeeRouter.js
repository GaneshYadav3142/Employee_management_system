const express=require("express")
const employeeModel = require("../Model/employeeModel")

const employeeRouter=express.Router()


employeeRouter.post("/employee",async(req,res)=>{
    const {firstName,lastName,email,department,salary}=req.body
  try {
    const newEmployee=await employeeModel.create({firstName,lastName,email,department,salary})
    newEmployee.save()
    res.status(200).send({"msg":"New Employee has been added","employee":newEmployee})
  } catch (error) {
    res.status(400).send("Error")
  }

})

employeeRouter.get("/",authMiddleware,async(req,res)=>{
    const {department}=req.query
    try {
       if(department){
        const data=await employeeModel.find({department})
        if(data){
            res.status(200).send(data)
        }
        else{
            res.status(400).send({"msg":"No employee found of that deparment"})
        } 
       }
       else{
        const data=await employeeModel.find({})
        res.status(200).send(data)
       }
    } catch (error) {
        res.status(400).send({error}) 
    }
})


employeeRouter.get("/employee/search", async (req, res) => {
    try {
      const { firstName } = req.query;
  
      // Use a regular expression for case-insensitive search
      const employees = await employeeModel.find({
        firstName: { $regex: new RegExp(firstName, "i") },
      });
  
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  employeeRouter.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const updatepost = await employeeModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!updatepost) {
       
            return res.status(404).send({ error: "Post not found" });
        }

        res.status(200).send(updatepost);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

employeeRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    console.log(id)
    try {
     await employeeModel.findByIdAndDelete(id)
        res.status(200).send({msg:"post Deleted"})
    } catch (error) {
        res.status(400).send({error})
    }
})










module.exports=employeeRouter
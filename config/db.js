const mongoose=require('mongoose')

let connection=async()=>{
       try {
        await mongoose.connect(process.env.MONGODBURL) 
        console.log("db connected")    

       } catch (error) {
          console.log(error.message)
       }
}
module.exports=connection;
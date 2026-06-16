const express=require('express')
const cors=require('cors')
const bcrypt=require('bcrypt')

let limiter= require('./middlewares/ratelimit')
let connection=require('./config/db')

let productroutes=require('./routes/productroute')
let authroutes =require('./routes/Authroute')
const app=express();
const port=process.env.PORT


//middleware
app.use(cors())
app.use(limiter)
app.use(express.json())
app.use('/products',productroutes)
app.use('/auth',authroutes)
app.use('/',authroutes)


// app.get('/products',async(req,res)=>{
//     try{
//         let allproducts=await products.find()
//         res.status(200).json(allproducts)
//     }
//     catch(error){
//         res.json({msg:error.message})
//     }
// })
// app.post('/products',async(req,res)=>{
//     try{
//         await products.create(req.body)
//         res.status(201).json({msg:"Product Saved"})
//     }
//     catch(error){
//         res.json({msg:error.message})
//     }
// })

// app.post('/bulkproducts',async(req,res)=>{
//     try{
//         await products.insertMany(req.body)
//         res.status(201).json({msg:"Products are Saved"})
//     }
//     catch(error){
//         res.json({msg:error.message})
//     }
// })

// app.put('/products/:id',async(req,res)=>{
//     try{
//         let productid = req.params.id
//        await products.findByIdAndUpdate(productid, req.body)
//        res.status(201).json({msg:"Products are Updated"})
//     }
//     catch(error){
//         res.json({msg:error.message})
//     }
// })
// app.delete('/products/:id',async(req,res)=>{
//     try{
//         let productid = req.params.id
//         await products.findByIdAndDelete(productid)
//          res.status(201).json({msg:"Products are Deleted"})
//     }
//     catch(error){
//         res.json({msg:error.message})
//     }
// })
// //registration
// app.post('/register', async (req, res) => {
//     try {
//         const { username, password, email, role } = req.body;

//         if (!username || !password || !email || !role) {
//             return res.json({ msg: "Missing fields" });
//         }

//         let checkuser = await users.findOne({ username });

//         if (checkuser) {
//             return res.json({ msg: "User already exists" });
//         }
// //hash the password
// let hashpassword= await bcrypt.hash(password,10)
//         await users.create({
//             username,
//             password : hashpassword,
//             email,
//             role
//         });
//     //generate a json web token
//     //payload  ,secretkey,expirydate .sign()

//     let payload={
//         username: username,
//         emailaddress : email,
//         role : role
//     }
//     let token=await jwt.sign(payload,secretkey,{expiresIn:'1hr'})

//         res.json({ msg: "Registration successful",token });
//         await mail(email,username)
//     } catch (error) {
//         res.json({ msg: error.message });
//     }
// });

// app.post('/login', async(req,res,next)=>{
//     try{
//         const {username,password}=req.body
//         if(!username || !password)
//             return res.json({"msg":"Missing fields"})
//         let checkuser = await users.findOne({username})
//         if(!checkuser)
//             return res.status(201).json({"msg": "user not found"})
//         let ishashverified=await bcrypt.compare(password,checkuser.password)
//     if(!ishashverified)
//         return res.status(403).json({"msg":"Username or Password is invalid"})
        
// //verify the token first
// let token=req.headers.authorization.split(' ')[1]
// let isvalid= await jwt.verify(token,secretkey)
// if(!isvalid)
//     return res.json({"msg":"invaild token"})
// res.json({msg :"Login Successful"})
//     }
//     catch(error){
//         next (error)
//     }
    
// })

app.listen(port,async()=>{
    await connection();
    console.log(`server is running on ${port}`)
})
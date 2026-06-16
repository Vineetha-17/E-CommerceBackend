let products=require('../models/productmodel')
exports.getproduct = async(req,res)=>{
 try{
        let productid = req.params.id
        let allproducts
        
        if (productid) {
            // Get single product by custom id field
            allproducts = await products.findOne({ id: parseInt(productid) })
            if (!allproducts) {
                return res.status(404).json({ msg: "Product not found" })
            }
        } else {
            // Get all products
            allproducts = await products.find()
        }
        res.status(200).json(allproducts)
    }
    catch(error){
        res.json({msg:error.message})
    }
}
exports.createproduct = async(req,res)=>{
try{
        await products.create(req.body)
        res.status(201).json({msg:"Product Saved"})
    }
    catch(error){
        res.json({msg:error.message})
    }
}
exports.createbulk = async(req,res)=>{
 try{
         await products.insertMany(req.body)
         res.status(201).json({msg:"Products are Saved"})
     }
     catch(error){
         res.json({msg:error.message})
     }
}
exports.updateproduct = async(req,res)=>{
 try{
         let productid = req.params.id
        await products.findOneAndUpdate({ id: parseInt(productid) }, req.body, { new: true })
        res.status(200).json({msg:"Products are Updated"})
     }
     catch(error){
         res.status(400).json({msg:error.message})
     }
}
exports.deleteproduct = async(req,res)=>{
     try{
            let productid = req.params.id
            await products.findOneAndDelete({ id: parseInt(productid) })
             res.status(200).json({msg:"Products are Deleted"})
        }
        catch(error){
            res.status(400).json({msg:error.message})
        }
}
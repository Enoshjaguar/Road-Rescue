const mongoose = require('mongoose')
const signupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("userdatas",signupSchema)
// app.post('/signup',async(req,res)=>{
//     try{
//         const {name, address, mobile, password } = req.body;

//         if(!name || !address || !mobile || !password){
//             return res.status(400).send("all fields are required")
//         }
//         const user = new User({
//             name,address,mobile,password
//         });
//         await user.save()
            
//             res.render('./login')
            
//     }
//     catch(err){
//         console.error("error signining up ",err)
//         res.render('signup')
        
//     }
// });
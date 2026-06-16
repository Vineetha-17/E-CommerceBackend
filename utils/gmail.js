const { text } = require("express");
const nodemailer=require("nodemailer");
//s1-create a transport 
let mail=async(email,username)=>{
    let transporter=nodemailer.createTransport({
    service:'/gmail',
    auth:{
        user:process.env.GMAILUSER,
        pass:process.env.GMAILPASS
    }
})
//compose a message
let message={
    from: "vineethapalavalasa17@gmail.com", // sender address
    to: email, // list of recipients
    subject: "Resgistration", // subject line
    html: `<b>"Hi ${username} your account is sucessfully created"</b>`, // HTML body
}

await transporter.sendMail(message)
console.log("Email sent✅")
}
module.exports=mail
const express=require("express");
const https=require("https");
const request=require("request")
// const https=require('http')
const bodyParser=require("body-parser");
const app=express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    // res.send("hellow world")
    res.sendFile(__dirname+"/signup.html")
})
app.post("/", function(req,res){
    const f1name=req.body.fname;
    const l1name=req.body.mname;
    const email=req.body.lname;
   const data={
    members: [
        {
            email_address:email,
            status: "subscribed",
            merge_fields:{
                FNAME:f1name, 
                MNAME:l1name
            }
        }
    ]
   };
   const jsonData=JSON.stringify(data);
   const url="https://us22.api.mailchimp.com/3.0/lists/12a946c196";
   const options={
    method:"POST",
    auth:"ashish:098476f59b4b9e2f2c94d2e1de9512b4-us22"
   }
  const request= https.request(url,options, function(response){
    if(response.statusCode==200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
        console.log(JSON.parse(data));
     })
   })
   request.write(jsonData);
   request.end();
    
})
app.post("/failure",  function (req,res){
    res.redirect("/")
})
app.listen(process.env.PORT || 3000, function(){
    console.log("server is on 3000");
})
   
// 098476f59b4b9e2f2c94d2e1de9512b4-us22
// 098476f59b4b9e2f2c94d2e1de9512b4-us22
// 098476f59b4b9e2f2c94d2e1de9512b4-us22
// list id
// 12a946c196
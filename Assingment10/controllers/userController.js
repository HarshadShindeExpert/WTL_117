const express = require('express');
const user = require('../models/connect');

const collect = async (req, res) => {
    try {
        const body = req.body;
        if(!body.email || !body.password || !body.name)
        {
            res.send("All feild are compulsory !");
            return;
        }
        const result = await user.create({
            name: body.name,
            email: body.email,
            password: body.password
        });
        res.status(401).send("User added successfully !");
    }catch(err)
    {
        res.send(`error occured :${err}`);
    }

};

const validate=async (req,res)=>{

    try{
        const body=req.body;
        if(!body.email || !body.password)
        {
            res.send("All feild are compulsory !");
            return;
        }
        const target=await user.findOne({email:body.email});
        console.log("Target : ",target);
        console.log("incoming mail : ",body);
       // res.json(body);
        if(!target)
        {
            return res.send("Invalid email !");
        }
        if(target.password===body.password)
        {
            res.send("Sign in successfull !");
            console.log("Sign in successfull !")
            console.log(`target : ${typeof(target)} and body : ${typeof(body)}`)
        }else{
            res.send("invalid password !");
            console.log("invalid password !");
            console.log(`target : ${typeof(target)} and body : ${typeof(body)}`)
            
        }
       
    }catch(err)
    {
        console.log("error alach : ",err);
    }
}

module.exports = {
    collect,
    validate
}

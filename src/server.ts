import express from "express";

const app = express();
 
app.get ('/health', (req,res) => {
res.send({
message: 'hello'}) .status(200)
})  

export{app}
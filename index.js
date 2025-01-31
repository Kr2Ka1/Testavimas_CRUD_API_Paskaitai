const { request } = require("express");

console.log('test');


//express - expreso serveris
//pg - integracija su PSql duombaze
//dotenv - prisijungimo duomenų prisidėjimui duonbazei

const express = require('express');//require pasiima iš modules express
const app = express();

//prisijungiama prie duombazės



app.use(express.json()); // request'am ir respons'am
//Apsirašyti ROUTES - kelius
//   /products - route mums grąžina visus produktus
//   /products/:id - route mums grąžina 1 produktą
//   /products/create - route sukurs produktą
//   /products/update/:id - route redaguos produktą
//   /products/delete/:id - ištrins produktą


//Aprašyti ROUTES - kelias
// GET        /products - route mums grąžina visus produktus
// GET        /products/:id - route mums grąžina 1 produktą
// POST       /products/create - route sukurs produktą
// PUT/PATCH  /products/update/:id - route redaguos produktą
// DELETE     /products/delete/:id - ištrins produktą


//req - request
//res - response
//localhost:3000/products
//{message: 'Sėkmingai pasiekiamas produktų puslapis'} status kodas 200
app.get('/products', async(req, res)=> {
    //neapibrėžta klaida 400 kodą, jeigu nepavyksta prisijungti prie duombazės 500
    try{
        res.status(200).json({message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch(err){
        res.status(400).json({error: 'error'});
    }
    
});





const port = 3000;
app.listen(port, () =>{
    console.log(`Server ir running on ${port}`);
    
});
const { request } = require("express");

console.log('test');


//express - expreso serveris
//pg - integracija su PSql duombaze
//dotenv - prisijungimo duomenų prisidėjimui duonbazei

const express = require('express');//require pasiima iš modules express
const app = express();
const pool = require('./database');

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

//Aprašyti ROUTES - kelias
// GET        /users - route mums grąžina visus produktus
// GET        /users/:id - route mums grąžina 1 produktą
// POST       /users/create - route sukurs produktą
// PUT/PATCH  /users/update/:id - route redaguos produktą
// DELETE     /users/delete/:id - ištrins produktą


app.get('/users', async(req, res)=> {
    //neapibrėžta klaida 400 kodą, jeigu nepavyksta prisijungti prie duombazės 500
    //select * from users
 
    try{
        const results = await pool.query("select * from users");

        res.status(200).json(results.rows);
    }
    catch(err){
        res.status(400).json({error: 'error'});
    }
    
});

// GET        /users/:id - route mums grąžina 1 produktą
app.get('/users/:id', async(req, res)=> {
    try{
        const id = req.params.id;
        const results = await pool.query(`select * from users where id=$1`,[id]);
        res.status(200).json(results.rows);
    }
    catch(err){
        res.status(400).json({error: 'error'});
    }
    
});

// POST       /users/create - route sukurs produktą
app.post('/users', async(req, res)=> {
    try{
        const {id, username, password} = req.body;
        //insert into users (id, username, "password") values(1000, 'idetasPerInsert', 'idetasPerInsert')
        const results = await pool.query(`insert into users (id,username,"password") values (${id}, '${username}', '${password}') returning*`);
        res.status(201).json(results.rows[0]);
    }
    catch(err){
        res.status(400).json({error: 'error'});
    }
    
});


// PUT/PATCH  /users/update/:id - route redaguos produktą
app.put('/users/:id', async(req, res)=> {
    try{
        const id = req.params.id;
        const {username, password} = req.body;
        const results = await pool.query(`update users set username = '${username}', "password" = '${password}' where id = ${id} returning*`);
        res.status(200).json(results.rows[0]);
    }
    catch(err){
        res.status(400).json({error: 'error'});
    }
    
});


// DELETE     /users/delete/:id - ištrins produktą

app.delete('/users/:id', async(req, res)=> {
    try{
        const id = req.params.id;
      
        const results = await pool.query(`delete from users where id = ${id}`);
        res.status(200).json({message: 'Elementas sėkmingai ištrintas'});
    }
    catch(err){
        res.status(400).json({error: 'error'});
    }
    
});

// -------------------------------------------------------------------------



app.get('/productsnd', async(req, res)=> {
    
    try{
        const results = await pool.query('select * from productsnd');

        res.status(200).json(results.rows);
    }
    catch(err){
        res.status(400).json({error: 'error'});
    }
    
});


app.get('/productsnd/:id', async(req, res)=> {
    try{
        const id = req.params.id;
        const results = await pool.query(`select * from productsnd where id=$1`,[id]);
        res.status(200).json(results.rows[0]);
    }
    catch(err){
        res.status(400).json({error: 'error'});
    }
    
});

app.post('/productsnd', async(req, res)=> {
    try{
        const {title,description,price} = req.body;
        const results = await pool.query(`insert into productsnd (title,description,price) values ('${title}', '${description}', ${price}) returning*`);
        res.status(201).json(results.rows[0]);
    }
    catch(err){
        res.status(400).json({error: 'error'});
    }
    
});

app.put('/productsnd/:id', async(req, res)=> {
    try{
        const id = req.params.id;
        const {title,description,price} = req.body;
        const results = await pool.query(`update productsnd set title = '${title}', "description" = '${description}', "price" =  ${price} where id = ${id} returning*`);
        res.status(200).json(results.rows[0]);
    }
    catch(err){
        res.status(400).json({error: 'error'});
    }
    
});

app.delete('/productsnd/:id', async(req, res)=> {
    try{
        const id = req.params.id;
      
        const results = await pool.query(`delete from productsnd where id = ${id}`);
        res.status(200).json({message: 'Elementas sėkmingai ištrintas'});
    }
    catch(err){
        res.status(400).json({error: 'error'});
    }
    
});







const port = 3000;
app.listen(port, () =>{
    console.log(`Server ir running on ${port}`);
    
});


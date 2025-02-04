//atsakingas už prisijungimą prie duombazės

//imk duomenis iš env failo
require('dotenv').config();

const { Pool } = require('pg'); //npm i pg/ atsakingas užprisijungimą prie DB
const pool = new Pool({
    user: process.env.PG_USER, //postgres
    host: process.env.PG_HOST,//localhost
    database: process.env.PG_DATABASE,//postgres
    password: process.env.PG_PASSWORD,//root
    port: process.env.PG_PORT //5432
});

pool.on('error', (err, client) => {
    console.error('Something ir wrong', err);
    process.exit(-1);
});

//visą failą galime naudoti kaip modulį
module.exports = pool;
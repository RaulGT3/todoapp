const express = require('express')
const { Client, Connection } = require('pg')

const app = express()
const client = new Client({
    user:"postgres",
    password:"23Raul",
    host: "localhost",
    port: 3000 ,
    database:"postgres",



});
app.use((req, res, next) => {
    res. header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header ("Access-Control-Allow-Methods", "POST, PUT, DELETE, OPTIONS, GET");
    next();
    });
    app.use(express.json());
    app.use(express.urlencoded ({ extended: false })) ;
connect();
async function connect(){;
    try{
        await client.connect();
        console.log('cobbected');

    }catch(e){
        console.error('connection failed ${e}');
    }
}


app.get("/todo", async (req, res) => {
    try {
        const results = await client.query("select * from todos");
        res.json(results.rows);
    } catch (e) {
        console.log("Error:", e);
        res.status(500).json({ error: "Database error" });
    }
});

app.post("/todo", async (req, res) => {
    try {

        const result = await client.query("INSERT INTO todos (title) VALUES ($1)", [
            req.body.todo,
        ]);

        res.json({ status: "success" });
    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({ error: "Database error" });
    }
});
app.delete("/todo/:id", async (req, res) => {
    try {
        const todoID = req.params.id;
        
        const result = await client.query("DELETE FROM todos WHERE id = $1",[todoID])
        res.json({ status: "success" });
    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({ error: "Database error" });
    }
});
app.listen(4000, () => console.log("lisining"));
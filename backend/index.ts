import express from "express"
import cors from "cors"
import { Database } from "sqlite3"
import { PromissingSQLite3 } from "promissing-sqlite3/lib"
import login from "./functions/login"
import recieveOrders from "./functions/recieveOrders"

var app = express()

app.use(cors({
    origin: "*"
}))

app.use(express.json()) 

const db = new PromissingSQLite3(new Database("./Database.db"))

db.execFile("./sql/NewTable.sql")

login(app, db)
recieveOrders(app, db)

app.listen(8003, 
    () => console.log("App live on http://localhost:8003")
);
import express from "express"
import cors from "cors"
import { Database } from "sqlite3"
import { PromissingSQLite3 } from "promissing-sqlite3/lib"
import login from "./functions/login"
import recieveOrders from "./functions/recieveOrders"
import sendAllOrders from "./functions/sendAllOrders"
import schedule from 'node-schedule';

var app = express()

app.use(cors({
    origin: "*"
}))

app.use(express.json()) 

const db = new PromissingSQLite3(new Database("./Database.db"))

db.execFile("./sql/NewTable.sql")

schedule.scheduleJob({hour: 0, minute: 0}, () => {
    console.log('All Doeners have been deleted');
    db.execFile("./sql/clearOrders.sql")
  });

login(app, db)
recieveOrders(app, db)
sendAllOrders(app, db)

app.listen(80, 
    () => console.log("App live on http://localhost:80")
);
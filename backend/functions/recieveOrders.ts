import { PromissingSQLite3 } from "promissing-sqlite3/lib"
import { Express } from "express";
import checkApiKey from "./checkApiKey";


const recieveOrders = (app: Express, db: PromissingSQLite3) => {
    app.post('/api/sendOrder', async (req, res) => {

        if(!await checkApiKey(db, req.body.uid, req.body.apiKey)){
            res.status(401).json({error: "Not autorized"})
            return
        }

        if(req.body.type == null || req.body.option == null || req.body.message == null){
            res.status(400).json({Problem: "you did not specifie all of the required arguments"})
            return
        }

        try {
            await db.execPrepFile("./sql/order.sql", 
            req.body.uid,
            req.body.type,
            req.body.option,
            req.body.message
        )
        } catch (e) {
            res.status(500).json({
                Problem: "a query on the database could not have been executed",
                fullError: e
            })
            return
        }
        

        res.status(201).json({order: "send sucessfully"})
    })
}

export default recieveOrders
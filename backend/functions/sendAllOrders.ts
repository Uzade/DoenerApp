import { PromissingSQLite3 } from "promissing-sqlite3/lib"
import { Express } from "express";

const sendAllOrders = (app: Express, db: PromissingSQLite3) => {
    app.get('/api/allOrders', async (_req, res) => {

        try{
            const orders = await db.allFile("./sql/getAllOrders.sql")
            res.status(200).json(orders)
            
        } catch (e) {
            res.status(500).json({
                Problem: "a query on the database could not have been executed",
                fullError: e
            })
            return
        }

    })
}

export default sendAllOrders
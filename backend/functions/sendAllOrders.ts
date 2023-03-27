import { PromissingSQLite3 } from "promissing-sqlite3/lib"
import { Express } from "express";

const sendAllOrders = (app: Express, db: PromissingSQLite3) => {
    app.get('/allOrders', async (_req, res) => {

        const orders = await db.allFile("./sql/getAllOrders.sql")

        res.status(200).json(orders)

    })
}

export default sendAllOrders
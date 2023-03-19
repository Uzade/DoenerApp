import { Express } from "express";
import { PromissingSQLite3 } from "promissing-sqlite3/lib";
import generateApiKey from 'generate-api-key/dist';
import getOauthData from "./getOauthData";
import getUserData from "./getUserData";

const login = (app: Express, db: PromissingSQLite3) => {
    app.get("/redirect", async (req, res) => {

        const code = req.query.code
        console.log("got request", code)
        
        const oauthData = await getOauthData(code as string)

        const user = await getUserData(oauthData.data.token_type, oauthData.data.access_token)

        console.log(user.data)

        const apiKey = generateApiKey({
            method: "string",
            min: 34,
            max: 61
        })

        db.execPrepFile("./sql/login.sql", user.data.id, apiKey, apiKey)

        res.status(200).json({
            uid: user.data.id,
            apiKey: apiKey
        });
    })
}

export default login
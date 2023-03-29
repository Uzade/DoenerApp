import { Express } from "express";
import { PromissingSQLite3 } from "promissing-sqlite3/lib";
import generateApiKey from 'generate-api-key/dist';
import getOauthData from "./getOauthData";
import getUserData from "./getUserData";
import { AxiosResponse } from "axios";

const login = (app: Express, db: PromissingSQLite3) => {
    app.get("/redirect", async (req, res) => {

        const code = req.query.code
        let user: AxiosResponse<any, any>
        
        if(code == null){
            res.status(400).json({Problem: "please specify a valid discord OAuth-code"})
            return
        }
        
        try {
            const oauthData = await getOauthData(code as string)
            user = await getUserData(oauthData.data.token_type, oauthData.data.access_token)
        } catch (e) {
            res.status(400).json({
                Problem: "A connection to the Discord server could not have been established",
                fullError: e
            })
            return
        }

        const apiKey = generateApiKey({
            method: "string",
            min: 34,
            max: 61
        })

        try{
            await db.execPrepFile("./sql/login.sql", user.data.id, apiKey, apiKey)
        } catch(e){
            res.status(500).json({
                Problem: "Internal database error",
                fullError: e
            })
            return
        }

        res.status(200).json({
            uid: user.data.id,
            apiKey: apiKey
        });
    })
}

export default login
import express from "express"
import cors from "cors"
import axios from "axios"
import { clientId, clientSecret, frontedUrl } from "./config.json"
import { Database } from "sqlite3";
import { PromissingSQLite3 } from "promissing-sqlite3/lib";
import generateApiKey from 'generate-api-key/dist';

var app = express();

app.use(cors({
    origin: "*"
}))

app.use(express.json()) 

const db = new PromissingSQLite3(new Database("./Database.db"))

db.execFile("./sql/NewTable.sql")

app.get("/redirect", async (req, res) => {

    const code = req.query.code
    console.log("got request", code)
    
    const oauthData = await axios({
        method: "post",
        url: "https://discord.com/api/oauth2/token",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
            client_id: clientId,
			client_secret: clientSecret,
			code,
			grant_type: 'authorization_code',
			redirect_uri: frontedUrl,
			scope: 'identify',
        }
    })

    const user = await axios({
        method: "get",
        url: "https://discord.com/api/users/@me",
        headers: {
            authorization: `${oauthData.data.token_type} ${oauthData.data.access_token}`,
        },
    })

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

app.listen(8003, 
    () => console.log("App live on http://localhost:8003")
);
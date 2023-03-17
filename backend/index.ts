import express from "express"
import cors from "cors"
import axios from "axios"
import { clientId, clientSecret, frontedUrl } from "./config.json"

var app = express();

app.use(cors({
    origin: "*"
}))

app.use(express.json()) 

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

    res.status(200).json(user.data);
})

app.listen(8003, 
    () => console.log("App live on http://localhost:8003")
);
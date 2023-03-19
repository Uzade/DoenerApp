import axios from "axios"
import { clientId, clientSecret, frontedUrl } from "./../config.json"

const getOauthData = async (code: string) => {
    return await axios({
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
}

export default getOauthData
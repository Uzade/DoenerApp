import axios from "axios"

const getUserData = async (token_type: any, access_token: any) => {
    return await axios({
        method: "get",
        url: "https://discord.com/api/users/@me",
        headers: {
            authorization: `${token_type} ${access_token}`,
        },
    })
}

export default getUserData
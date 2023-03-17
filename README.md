# DoenerApp
An app to order Doener in bulk 

## Backend
written with express in node typescript.

run the command `npm run setup` to generate all needed files.
Then insert the client secret and client id retrieved from your [discord application](https://discord.com/developers/applications) into the `config.json` file.

The [discord login link](https://discord.com/api/oauth2/authorize?client_id=1085908235829121085&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2F&response_type=code&scope=identify) will redirect you to `[localhost:5173](http://localhost:5173/)` where the main page will be hosted. The request has a code as a param. You can use this code to start a get request to the backend `/redirect` URI. This will reply with the discord user name and the api key used to send futher requests.
The response may include further information soon like profil picture hash if needed for frontend.

Orders can be placed via the `/sendOrder` endpoint with a post request (not implemented yet). The body needs to contain:
```
uid: string,
apiKey: string,
type: string,
option: string,
message: string
```

All orders can be retrieved from the `/getOrders` endpoint. There is no authentification required

## Frontend
there is no frontend atm.
Complete this if you implement the frontend.
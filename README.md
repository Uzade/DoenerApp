# DoenerApp
An app to order Doener in bulk 

## Backend
written with express in node typescript.

run the command `npm run setup` to generate all needed files.
Then insert the client secret and client id retrieved from your [discord application](https://discord.com/developers/applications) into the `config.json` file.

The [discord login link](https://discord.com/oauth2/authorize?client_id=1077497141741764608&redirect_uri=http%3A%2F%2Flocalhost%3A8003%2Fredirect&response_type=code&scope=identify) will redirect you to `localhost:8003` where the body contains the `uid` and `apiKey` required to send further requests.

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
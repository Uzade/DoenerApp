import { PromissingSQLite3 } from "promissing-sqlite3/lib"


const checkApiKey = async (db: PromissingSQLite3, uid: string, apiKey: string) => {
    const dbResult = await db.getPrepFile("./sql/getUser.sql", uid)

    if(dbResult == null){
        return false
    }

    if(dbResult.apiKey != apiKey){
        return false
    }

    return true
}

export default checkApiKey
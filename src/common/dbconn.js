import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = 'mongodb+srv://ev3_express:cvOLuUD2NEApmqNK@cluster-express.bsd1utn.mongodb.net/?appName=cluster-express'

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export default client 
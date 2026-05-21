import { ObjectId } from "mongodb"
import client from "../common/dbconn.js"
import { Actor } from "./actor.js"
import { Pelicula } from "../pelicula/pelicula.js"


const actorCollection = client.db('cine-db').collection('actores')
const peliculaCollection = client.db('cine-db').collection('peliculas')

async function handleInsertActorRequest(req, res) {
    let data = req.body

    try {

        let pelicula = await peliculaCollection.findOne({nombre: data.nombrePelicula})

        if (!pelicula) return res.status(404).send('No se encontró la película')

        let actor = Actor

        actor.idPelicula = pelicula._id
        actor.nombre = data.nombre
        actor.edad = data.edad
        actor.estaRetirado = data.estaRetirado
        actor.premios = data.premios

        let result = await actorCollection.insertOne(actor)
        if (!result.acknowledged) return res.status(400).send('Error al guardar registro')

        return res.status(201).send(result)

    }
    catch (e) {
        return res.status(500).send({
            error: e.message
        })
    }
}

async function handleGetActoresRequest(req, res) {
    await actorCollection.find({}).toArray()
    .then((data) => {
        return res.status(200).send(data)
    })
    .catch((e) => {
        return res.status(500).send({error: e})
    })
}

async function handleGetActorByIdRequest(req, res) {
    
    let id = req.params.id

    try {

        let oid = ObjectId.createFromHexString(id)

        await actorCollection.findOne({_id: oid})
        .then((data) => {

            if (data === null) return res.status(404).send('ID mal formado')

            return res.status(200).send(data)
        })
        .catch((e) => {
            return res.status(500).send({error: e.code})
        })

    }catch (e) {
        return res.status(400).send('ID mal formado')
    }

}

async function handleGetActoresByPeliculaIdRequest(req, res) {

    let id = req.params.id

    try {  

        let oid = ObjectId.createFromHexString(id)

        let data = await actorCollection.find({idPelicula: oid}).toArray()

        if (data.length === 0) return res.status(404).send('No se encontraron actores para la película')

        return res.status(200).send(data)
     }
    catch (e) {
        return res.status(400).send('ID mal formado')
    }
}

export default {
    handleGetActorByIdRequest,
    handleGetActoresRequest,
    handleInsertActorRequest,
    handleGetActoresByPeliculaIdRequest
}
import { BSON, BSONType, ObjectId } from "mongodb"

export const Actor = {
    _id: ObjectId,
    idPelicula: BSONType.String,
    nombre: BSONType.String,
    edad: BSONType.Int,
    estaRetirado: BSONType.Boolean,
    premios: BSONType.Array
}
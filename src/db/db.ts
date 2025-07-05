import mongoose from "mongoose";

const mongoURI =
  "mongodb://mongo:UPwxPyeWplkCSPGnodXDLCcTpdrPuZoI@gondola.proxy.rlwy.net:43414";
const dbName = "FORMULARIOS"; // Revertimos a FORMULARIO como la base de datos principal

export async function connectDB() {
  try {
    await mongoose.connect(mongoURI, { dbName: dbName });
    console.log(`Conectado exitosamente a la base de datos ${dbName}!`);
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1); // Salir de la aplicación si la conexión falla
  }
}

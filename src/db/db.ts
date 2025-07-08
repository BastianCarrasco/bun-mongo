import mongoose from "mongoose";
import "dotenv/config";

const mongoURI: string =
  process.env.MONGO_URI || "mongodb://localhost:27017/test_default_db";
const dbName: string = process.env.DB_NAME || "default_db_name";

export async function connectDB() {
  try {
    console.log(`Intentando conectar a MongoDB en: ${mongoURI}`);
    console.log(`Usando la base de datos: ${dbName}`);

    await mongoose.connect(mongoURI, {
      dbName: dbName,
      // Opciones recomendadas para Mongoose 6+ que ya no son necesarias
      // pero a veces se ven en código antiguo y es bueno saberlo:
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true, // para findOneAndUpdate y findOneAndRemove
      // useFindAndModify: false, // para findOneAndUpdate y findOneAndRemove
    });

    console.log(`Conectado exitosamente a la base de datos "${dbName}"!`);
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    // Es una buena práctica lanzar el error para que un manejador de errores
    // de nivel superior (si existe) pueda capturarlo, o para que el proceso
    // de la aplicación se detenga correctamente si la conexión a la DB es crítica.
    process.exit(1); // Salir de la aplicación si la conexión falla
  }
}

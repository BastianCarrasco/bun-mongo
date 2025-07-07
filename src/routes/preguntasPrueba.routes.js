import { Elysia, t } from "elysia";
import mongoose from "mongoose"; // Importa mongoose para acceder a la conexión

// Nombre de la colección que vamos a usar
const COLLECTION_NAME = "Prueba Preguntas Empresas"; // <-- ¡CAMBIADO AQUÍ!

export const preguntaPruebaRoutes = new Elysia({ prefix: "/preguntas" })
  .get(
    "/",
    async () => {
      try {
        // Asegúrate de que la conexión esté establecida
        if (mongoose.connection.readyState !== 1) {
          // readyState 1 significa 'conectado'
          throw new Error("No conectado a MongoDB");
        }

        const db = mongoose.connection.db; // Accede a la base de datos conectada
        const collection = db.collection(COLLECTION_NAME); // Accede directamente a la colección por su nombre

        const preguntas = await collection.find({}).toArray(); // Encuentra todos los documentos y conviértelos a un array
        return preguntas;
      } catch (error) {
        console.error("Error al obtener preguntas:", error);
        // Usar Response para enviar un estado HTTP 500 y un mensaje de error
        return new Response("Error interno del servidor al obtener preguntas", {
          status: 500,
        });
      }
    },
    {
      detail: {
        tags: ["Preguntas"],
        summary: `Obtener todas las preguntas de '${COLLECTION_NAME}' (sin modelo)`,
        description: `Recupera una lista de todas las preguntas directamente de la colección '${COLLECTION_NAME}'.`,
      },
      response: {
        200: t.Array(t.Any()),
        500: t.String(),
      },
    }
  )
  .post(
    "/",
    async ({ body, set }) => {
      try {
        if (mongoose.connection.readyState !== 1) {
          throw new Error("No conectado a MongoDB");
        }

        const db = mongoose.connection.db;
        const collection = db.collection(COLLECTION_NAME); // Accede directamente a la colección por su nombre

        const result = await collection.insertOne(body); // Inserta el JSON tal cual
        if (result.acknowledged) {
          set.status = 201; // Estado HTTP 201 Created
          // Devuelve el ID insertado junto con el cuerpo de la solicitud
          return { _id: result.insertedId, ...body };
        } else {
          // Si la inserción no fue reconocida (raro con insertOne exitoso, pero buena práctica)
          set.status = 500;
          return "Error al insertar la pregunta: Operación no reconocida.";
        }
      } catch (error) {
        console.error("Error al crear pregunta:", error);
        set.status = 500;
        return "Error interno del servidor al crear pregunta.";
      }
    },
    {
      body: t.Any(), // Acepta cualquier objeto JSON como cuerpo de la solicitud
      detail: {
        tags: ["Preguntas"],
        summary: `Crear una nueva pregunta en '${COLLECTION_NAME}' (sin modelo)`,
        description: `Crea una nueva pregunta con cualquier estructura JSON y la guarda en la colección '${COLLECTION_NAME}'.`,
      },
      response: {
        201: t.Any(),
        500: t.String(),
      },
    }
  );

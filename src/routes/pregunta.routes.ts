// src/routes/pregunta.routes.ts
import { Elysia } from "elysia";
import {
  getAllPreguntas,
  createPregunta,
  getPreguntaById,
  updatePregunta,
  deletePregunta,
} from "../controllers/pregunta.controller";

const preguntaRoutes = new Elysia({ prefix: "/preguntas" }) // Las rutas serán /preguntas/...
  .get("/", getAllPreguntas, {
    detail: {
      summary: "Obtener todas las preguntas",
      description:
        "Retorna una lista de todas las preguntas en la base de datos.",
      tags: ["Preguntas"],
    },
  })
  .post("/", createPregunta, {
    detail: {
      summary: "Crear una nueva pregunta",
      description: "Crea un nuevo registro de pregunta y respuesta.",
      tags: ["Preguntas"],
      request: {
        body: {
          properties: {
            pregunta: { type: "string", example: "¿Qué es Bun?" },
            respuesta: {
              type: "string",
              example: "Bun es un runtime JavaScript...",
            },
            fecha: { type: "string", example: "05-07-2025" },
          },
          required: ["pregunta", "respuesta", "fecha"],
        },
      },
      responses: {
        201: {
          description: "Pregunta creada exitosamente.",
        },
      },
    },
  })
  .get("/:id", getPreguntaById, {
    detail: {
      summary: "Obtener pregunta por ID",
      description: "Retorna una pregunta específica por su ID.",
      tags: ["Preguntas"],
      // *** CAMBIO AQUÍ ***
      parameters: [
        {
          in: "path", // Indica que el parámetro está en la ruta
          name: "id", // El nombre del parámetro en la URL (:id)
          schema: {
            type: "string",
            description: "ID de la pregunta",
          },
          required: true, // Este parámetro es obligatorio
        },
      ],
      responses: {
        200: { description: "Pregunta encontrada." },
        404: { description: "Pregunta no encontrada." },
      },
    },
  })
  .put("/:id", updatePregunta, {
    detail: {
      summary: "Actualizar una pregunta",
      description: "Actualiza una pregunta existente por su ID.",
      tags: ["Preguntas"],
      // *** CAMBIO AQUÍ ***
      parameters: [
        {
          in: "path",
          name: "id",
          schema: {
            type: "string",
            description: "ID de la pregunta a actualizar",
          },
          required: true,
        },
      ],
      request: {
        body: {
          properties: {
            pregunta: { type: "string", example: "¿Qué es Elysia?" },
            respuesta: {
              type: "string",
              example: "Elysia es un framework web para Bun.",
            },
            fecha: { type: "string", example: "05-07-2025" },
          },
        },
      },
      responses: {
        200: { description: "Pregunta actualizada exitosamente." },
        404: { description: "Pregunta no encontrada." },
      },
    },
  })
  .delete("/:id", deletePregunta, {
    detail: {
      summary: "Eliminar una pregunta",
      description: "Elimina una pregunta de la base de datos por su ID.",
      tags: ["Preguntas"],
      // *** CAMBIO AQUÍ ***
      parameters: [
        {
          in: "path",
          name: "id",
          schema: {
            type: "string",
            description: "ID de la pregunta a eliminar",
          },
          required: true,
        },
      ],
      responses: {
        204: { description: "Pregunta eliminada exitosamente." },
        404: { description: "Pregunta no encontrada." },
      },
    },
  });

export default preguntaRoutes;

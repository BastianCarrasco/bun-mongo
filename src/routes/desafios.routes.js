import { Elysia, t } from "elysia";
import {
  getAllInscripcionesDesafios,
  createDesafioInscripcion,
} from "../controllers/desafios.controller.js";

const inscripcionesDesafiosRoutes = new Elysia({ prefix: "/desafios" }) // Prefijo para todas las rutas de académicos
  .post(
    "/inscripcion",
    async ({ body, set }) => createDesafioInscripcion(body, set),
    {
      body: t.Any(),

      detail: {
        tags: ["Desafíos"],
        summary: "Inscribir un nuevo desafío",
        description: "Registra los datos de desafíos.",
      },
      response: {
        201: t.Object({ message: t.String(), data: t.Any() }),
        400: t.Object({
          error: t.String(),
          details: t.Optional(t.Array(t.String())),
        }),
        409: t.Object({ error: t.String() }),
        500: t.Object({ error: t.String() }),
      },
    }
  )
  .get("/inscripciones", async ({ set }) => getAllInscripcionesDesafios(set), {
    detail: {
      tags: ["Desafíos"],
      summary: "Obtener todas las inscripciones de desafíos",
      description: "Recupera una lista de todas las inscripciones de desafíos.",
    },
    response: {
      200: t.Object({ message: t.String(), data: t.Array(t.Any()) }),
      500: t.String(),
    },
  });

export default inscripcionesDesafiosRoutes;

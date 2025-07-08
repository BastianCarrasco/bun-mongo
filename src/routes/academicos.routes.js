import { Elysia, t } from "elysia";
import {
  getAllInscripcionesAcademicos,
  createAcademicoInscripcion
} from "../controllers/academicos.controller.js";

const inscripcionesAcademicosRoutes = new Elysia({ prefix: "/academicos" }) // Prefijo para todas las rutas de académicos
  .post(
    "/inscripcion",
    async ({ body, set }) => createAcademicoInscripcion(body, set),
    {
      body: t.Any(),

      detail: {
        tags: ["Académicos"],
        summary: "Inscribir un nuevo académico/a o investigador/a",
        description:
          "Registra los datos de contacto y capacidades de un académico interesado en colaborar con la PUCV.",
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
  .get(
    "/inscripciones",
    async ({ set }) => getAllInscripcionesAcademicos(set),
    {
      detail: {
        tags: ["Académicos"],
        summary: "Obtener todas las inscripciones de académicos",
        description:
          "Recupera una lista de todas las inscripciones de académicos y sus colaboraciones.",
      },
      response: {
        200: t.Object({ message: t.String(), data: t.Array(t.Any()) }),
        500: t.String(),
      },
    }
  );

export default inscripcionesAcademicosRoutes;

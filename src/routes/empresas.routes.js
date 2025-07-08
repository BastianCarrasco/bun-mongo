import { Elysia, t } from "elysia";
import {
  createInscripcionEmpresa,
  getAllInscripcionesEmpresas,
} from "../controllers/empresas.controller.js";

const inscripcionesEmpresasRoutes = new Elysia({ prefix: "/empresas" })
  .post(
    "/inscripcion",
    async ({ body, set }) => createInscripcionEmpresa(body, set),
    {
      body: t.Any(),
      detail: {
        tags: ["Empresas"],
        summary: "Inscribir una nueva empresa u organización",
        description:
          "Registra los datos de contacto y desafíos de una empresa interesada en colaborar con la PUCV.",
      },
      response: {
        201: t.Object({
          message: t.String(),
          data: t.Any(),
        }),
        400: t.Object({
          error: t.String(),
          details: t.Optional(t.Array(t.String())),
        }),
        409: t.Object({
          error: t.String(),
        }),
        500: t.Object({
          error: t.String(),
        }),
      },
    }
  )
  .get("/inscripciones", async ({ set }) => getAllInscripcionesEmpresas(set), {
    detail: {
      tags: ["Empresas"],
      summary: "Obtener todas las inscripciones de empresas",
      description:
        "Recupera una lista de todas las empresas y organizaciones inscritas en la plataforma.",
    },
    response: {
      200: t.Object({
        // Respuesta exitosa
        message: t.String(),
        data: t.Array(t.Any()), // Representa un array de objetos, sin especificar su estructura interna detallada
      }),
      500: t.Object({
        // Error del servidor
        error: t.String(),
      }),
    },
  });

export default inscripcionesEmpresasRoutes;

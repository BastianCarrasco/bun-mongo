// En tu archivo de rutas (por ejemplo, routes/inscripcionesEmpresasRoutes.js)
import { Elysia, t } from "elysia";
import {
  createInscripcionEmpresa,
  getAllInscripcionesEmpresas,
  getInscripcionEmpresaById,
  updateInscripcionEmpresa,
  deleteInscripcionEmpresa,
  getDesafioEmpresas, // Importado
} from "../controllers/empresas.controller.js";

const inscripcionesEmpresasRoutes = new Elysia({ prefix: "/empresas" })
  .post(
    "desafios/inscripcion",
    async ({ body, set }) => createInscripcionEmpresa(body, set),
    {
      body: t.Object({
        nombre: t.Optional(t.String()),
        apellido: t.Optional(t.String()),
        // CAMBIO AQUÍ: Eliminar format: "email" para permitir cadena vacía, y opcional
        correoElectronico: t.Optional(t.String()),
        numeroTelefono: t.Optional(t.String()),
        empresaOrganizacion: t.Optional(t.String()),
        areaTrabajo: t.Optional(t.Array(t.String())),
        // CAMBIO AQUÍ: Eliminar format: "uri" para permitir cadena vacía, y opcional
        contactoWeb: t.Optional(t.String()),
        vinculoPucv: t.Optional(t.Array(t.String())),
        actividadesServicios: t.Optional(t.String()),
        desafio1: t.Optional(t.String()),
        desafio2: t.Optional(t.String()),
        desafio3: t.Optional(t.String()),
        interesInformacion: t.Optional(t.Boolean()),
        validar: t.Optional(t.Boolean()),
        link: t.Optional(t.String()), // <--- AÑADIDO: link en el nivel raíz para POST
        front: t.Optional(
          t.Object({
            contexto: t.Optional(t.String()),
            extra: t.Optional(
              t.Object({
                titulo: t.Optional(t.String()),
                datos: t.Optional(t.Array(t.String())),
                // ELIMINADO: link ya no está dentro de 'extra'
                // link: t.Optional(t.String()),
              })
            ),
            desafio_Texto: t.Optional(t.String()),
            desafio_1: t.Optional(
              t.Object({
                titulo: t.Optional(t.String()),
                descripcion: t.Optional(t.String()),
              })
            ),
            desafio_2: t.Optional(
              t.Object({
                titulo: t.Optional(t.String()),
                descripcion: t.Optional(t.String()),
              })
            ),
            desafio_3: t.Optional(
              t.Object({
                titulo: t.Optional(t.String()),
                descripcion: t.Optional(t.String()),
              })
            ),
            // ELIMINADO: link ya no está directamente dentro de 'front'
            // link: t.Optional(t.String()),
          })
        ),
      }),
      detail: {
        tags: ["Empresas"],
        summary: "Inscribir una nueva empresa u organización y sus desafios",
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
    // Nota: 't.Array(t.Any())' es muy permisivo. Para producción, sería bueno
    // definir un esquema más específico aquí también si getAllInscripcionesEmpresas
    // devuelve la estructura completa del modelo.
    response: {
      200: t.Array(t.Any()),
      500: t.Object({
        error: t.String(),
      }),
    },
  })
  .get(
    "/inscripcion/:id",
    async ({ params: { id }, set }) => getInscripcionEmpresaById(id, set),
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ["Empresas"],
        summary: "Obtener una inscripción de empresa por ID",
        description:
          "Recupera los detalles de una empresa inscrita utilizando su ID único.",
      },
      // De nuevo, 't.Any()' es permisivo.
      response: {
        200: t.Any(),
        400: t.Object({
          error: t.String(),
        }),
        404: t.Object({
          error: t.String(),
        }),
        500: t.Object({
          error: t.String(),
        }),
      },
    }
  )
  .put(
    "/inscripcion/:id",
    async ({ params: { id }, body, set }) =>
      updateInscripcionEmpresa(id, body, set),
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        nombre: t.Optional(t.String()),
        apellido: t.Optional(t.String()),
        // CAMBIO AQUÍ: Eliminar format: "email" si quieres permitir cadena vacía
        correoElectronico: t.Optional(t.String()),
        numeroTelefono: t.Optional(t.String()),
        empresaOrganizacion: t.Optional(t.String()),
        areaTrabajo: t.Optional(t.Array(t.String())),
        // CAMBIO AQUÍ: Eliminar format: "uri" si quieres permitir cadena vacía
        contactoWeb: t.Optional(t.String()),
        vinculoPucv: t.Optional(t.Array(t.String())),
        actividadesServicios: t.Optional(t.String()),
        desafio1: t.Optional(t.String()),
        desafio2: t.Optional(t.String()),
        desafio3: t.Optional(t.String()),
        interesInformacion: t.Optional(t.Boolean()),
        validar: t.Optional(t.Boolean()),
        link: t.Optional(t.String()), // <--- AÑADIDO: link en el nivel raíz para PUT
        front: t.Optional(
          // El objeto 'front' en sí es opcional
          t.Object({
            // Si 'front' existe, debe ser un objeto con...
            contexto: t.Optional(t.String()),
            extra: t.Optional(
              // 'extra' es opcional
              t.Object({
                // Si 'extra' existe, debe ser un objeto con...
                titulo: t.Optional(t.String()),
                datos: t.Optional(t.Array(t.String())),
              })
            ),
            desafio_Texto: t.Optional(t.String()),
            desafio_1: t.Optional(
              // 'desafio_1' es opcional
              t.Object({
                // Si 'desafio_1' existe, debe ser un objeto con...
                titulo: t.Optional(t.String()),
                descripcion: t.Optional(t.String()),
              })
            ),
            desafio_2: t.Optional(
              t.Object({
                titulo: t.Optional(t.String()),
                descripcion: t.Optional(t.String()),
              })
            ),
            desafio_3: t.Optional(
              t.Object({
                titulo: t.Optional(t.String()),
                descripcion: t.Optional(t.String()),
              })
            ),
          })
        ),
      }),
      detail: {
        tags: ["Empresas"],
        summary: "Actualizar una inscripción de empresa por ID",
        description:
          "Actualiza los datos de una empresa inscrita utilizando su ID único. Solo los campos proporcionados en el cuerpo de la petición serán modificados.",
      },
      response: {
        200: t.Any(),
        400: t.Object({
          error: t.String(),
          details: t.Optional(t.Array(t.String())),
        }),
        404: t.Object({
          error: t.String(),
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
  .delete(
    "/inscripcion/:id",
    async ({ params: { id }, set }) => deleteInscripcionEmpresa(id, set),
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ["Empresas"],
        summary: "Eliminar una inscripción de empresa por ID",
        description: "Elimina una empresa inscrita de la base de datos.",
      },
      response: {
        200: t.Any(),
        400: t.Object({
          error: t.String(),
        }),
        404: t.Object({
          error: t.String(),
        }),
        500: t.Object({
          error: t.String(),
        }),
      },
    }
  )
  .get("/empresas-desafios-ON", async ({ set }) => getDesafioEmpresas(set), {
    detail: {
      tags: ["Empresas"],
      summary: "Obtener información de desafíos y front de todas las empresas",
      description:
        "Recupera la organización, el objeto 'front' completo y el link de nivel raíz de todas las empresas inscritas que estén validadas.",
    },
    response: {
      200: t.Array(
        t.Object({
          _id: t.Any(), // Considera t.String() si siempre lo conviertes.
          empresaOrganizacion: t.String(),
          actividadesServicios: t.Optional(t.String()),
          front: t.Object({
            contexto: t.Optional(t.String()),
            extra: t.Optional(
              t.Object({
                titulo: t.Optional(t.String()),
                datos: t.Optional(t.Array(t.String())),
                // ELIMINADO: link ya no está dentro de 'extra'
                // link: t.Optional(t.String()),
              })
            ),
            desafio_Texto: t.Optional(t.String()),
            desafio_1: t.Optional(
              t.Object({
                titulo: t.Optional(t.String()),
                descripcion: t.Optional(t.String()),
              })
            ),
            desafio_2: t.Optional(
              t.Object({
                titulo: t.Optional(t.String()),
                descripcion: t.Optional(t.String()),
              })
            ),
            desafio_3: t.Optional(
              t.Object({
                titulo: t.Optional(t.String()),
                descripcion: t.Optional(t.String()),
              })
            ),
            // ELIMINADO: link ya no está directamente dentro de 'front'
            // link: t.Optional(t.String()),
          }),
          link: t.Optional(t.String()), // <--- CORRECTO: link en el nivel raíz
          validar: t.Boolean(),
        })
      ),
      500: t.Object({
        error: t.String(),
      }),
    },
  });

export default inscripcionesEmpresasRoutes;

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
    "/inscripcion",
    async ({ body, set }) => createInscripcionEmpresa(body, set),
    {
      body: t.Object({
        nombre: t.Optional(t.String()),
        apellido: t.Optional(t.String()),
        // CAMBIO AQUÍ: Eliminar format: "email" para permitir cadena vacía
        correoElectronico: t.Optional(t.String()),
        numeroTelefono: t.Optional(t.String()),
        empresaOrganizacion: t.Optional(t.String()),
        areaTrabajo: t.Optional(t.Array(t.String())),
        // CAMBIO AQUÍ: Eliminar format: "uri" para permitir cadena vacía
        contactoWeb: t.Optional(t.String()),
        vinculoPUCV: t.Optional(t.Array(t.String())),
        actividadesServicios: t.Optional(t.String()),
        desafio1: t.Optional(t.String()),
        desafio2: t.Optional(t.String()),
        desafio3: t.Optional(t.String()),
        interesInformacion: t.Optional(t.Boolean()),
        Validar: t.Optional(t.Boolean()),
        front: t.Optional(
          t.Object({
            contexto: t.Optional(t.String()),
            extra: t.Optional(
              t.Object({
                titulo: t.Optional(t.String()),
                datos: t.Optional(t.Array(t.String())),
                link: t.Optional(t.String()),
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
          })
        ),
      }),
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
  // ... (el resto de tus rutas GET, PUT, DELETE, /desafios siguen igual) ...
  .get("/inscripciones", async ({ set }) => getAllInscripcionesEmpresas(set), {
    detail: {
      tags: ["Empresas"],
      summary: "Obtener todas las inscripciones de empresas",
      description:
        "Recupera una lista de todas las empresas y organizaciones inscritas en la plataforma.",
    },
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
        correoElectronico: t.Optional(t.String({ format: "email" })),
        numeroTelefono: t.Optional(t.String()),
        empresaOrganizacion: t.Optional(t.String()),
        areaTrabajo: t.Optional(t.Array(t.String())),
        contactoWeb: t.Optional(t.String({ format: "uri" })),
        vinculoPUCV: t.Optional(t.Array(t.String())),
        actividadesServicios: t.Optional(t.String()),
        desafio1: t.Optional(t.String()),
        desafio2: t.Optional(t.String()),
        desafio3: t.Optional(t.String()),
        interesInformacion: t.Optional(t.Boolean()),
        Validar: t.Optional(t.Boolean()),
        front: t.Optional(
          t.Object({
            contexto: t.Optional(t.String()),
            extra: t.Optional(
              t.Object({
                titulo: t.Optional(t.String()),
                datos: t.Optional(t.Array(t.String())),
                link: t.Optional(t.String()), // Sin formato URI estricto para permitir vacío
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
        "Recupera la organización, el objeto 'front' completo y el link directo de 'front' de todas las empresas inscritas.",
    },
    response: {
      200: t.Array(
        t.Object({
          _id: t.Any(),
          empresaOrganizacion: t.String(),
          actividadesServicios: t.Optional(t.String()),
          front: t.Object({
            contexto: t.Optional(t.String()),
            extra: t.Optional(
              t.Object({
                titulo: t.Optional(t.String()),
                datos: t.Optional(t.Array(t.String())),
                // Si `link` también puede estar dentro de `extra`, mantenlo aquí.
                // De lo contrario, si solo está en el nivel superior de `front`, puedes eliminarlo de `extra`.
                link: t.Optional(t.String()),
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
            // ¡AGREGA ESTO! Si front.link es un campo directo de 'front'
            link: t.Optional(t.String()),
          }),
          // Este `link` de nivel superior ya está bien si quieres redundancia o una referencia directa
          link: t.Optional(t.String()),
        })
      ),
      500: t.Object({
        error: t.String(),
      }),
    },
  });

export default inscripcionesEmpresasRoutes;

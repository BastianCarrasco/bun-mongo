import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { connectDB } from "../src/db/db";
import inscripcionesEmpresasRoutes from "./routes/empresas.routes.js";
import inscripcionesAcademicosRoutes from "./routes/academicos.routes.js";
import { cors } from "@elysiajs/cors";

const app = new Elysia();

// Conectar a la base de datos al iniciar la aplicación
connectDB();
app.use(cors());

// Configurar Swagger/OpenAPI
app.use(
  swagger({
    path: "/swagger",
    documentation: {
      info: {
        title: "API de OpenFIN",
        version: "1.0.0",
        description:
          "API para la plataforma OpenFIN, gestionando inscripciones y datos de prueba.", // <-- Descripción general
      },
      tags: [
        {
          name: "Empresas",
          description:
            "Operaciones relacionadas con la inscripción de empresas y organizaciones.",
        },
        {
          name: "Académicos",
          description:
            "Operaciones relacionadas con la inscripción de investigadores y académicos.",
        }, // ¡NUEVO TAG!
        {
          name: "Preguntas",
          description: "Operaciones de prueba para preguntas de formularios.",
        },
      ],
    },
  })
);

// Ruta de bienvenida general
app.get("/", () => "¡Bienvenido a tu API de OpenFIN con Bun!");

// --- MODULARIZACIÓN DE RUTAS BAJO UN ÚNICO PREFIJO /api ---
app.use(
  new Elysia({ prefix: "/api" }) // Todas las rutas definidas DENTRO de este `use` tendrán el prefijo /api

    .use(inscripcionesEmpresasRoutes) // Monta las rutas de empresas (serán /api/empresas/...)
    .use(inscripcionesAcademicosRoutes)
);
// --- FIN MODULARIZACIÓN ---

app.listen(3000, () => {
  console.log("Servidor Bun corriendo en http://localhost:3000");
  console.log(
    "Documentación Swagger disponible en http://localhost:3000/swagger"
  );
});

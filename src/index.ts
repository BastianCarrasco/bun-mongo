// src/index.ts
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { config } from "./config";
import connectDB from "./db";
import { preguntaRoutes } from "./routes"; // Importa las rutas de pregunta

const app = new Elysia();

// Conecta a la base de datos al iniciar
connectDB();

app
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "API de Formularios y Preguntas",
          version: "1.0.0",
          description:
            "API RESTful para gestionar preguntas y respuestas de formularios.",
        },
        tags: [
          {
            name: "Usuarios",
            description: "Operaciones relacionadas con usuarios",
          },
          {
            name: "Preguntas",
            description: "Operaciones relacionadas con preguntas y respuestas",
          }, // Añade este tag
        ],
      },
    })
  )
  .get("/", () => "Bienvenido a mi API con Elysia!")
  // Registra tus módulos de rutas

  .use(preguntaRoutes) // ¡REGISTRA TUS RUTAS DE PREGUNTAS AQUÍ!
  .listen(config.PORT, () => {
    console.log(
      `🦊 Elysia está corriendo en http://${app.server?.hostname}:${config.PORT}`
    );
    console.log(
      `📚 Documentación Swagger UI en http://${app.server?.hostname}:${config.PORT}/docs`
    );
  });

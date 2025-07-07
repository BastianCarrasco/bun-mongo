import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { connectDB } from "../src/db/db";

import { preguntaPruebaRoutes } from "./routes/preguntasPrueba.routes";
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
        title: "API de Preguntas del Formulario",
        version: "1.0.0",
        description: "API para gestionar preguntas de formularios MongoDB.",
      },
      tags: [
        {
          name: "Preguntas",
          description: "Operaciones relacionadas con preguntas",
        },
      ],
    },
  })
);

// Ruta de bienvenida general
app.get("/", () => "¡Bienvenido a tu API de Preguntas con Bun!");

// Modulariza tus rutas

app.use(preguntaPruebaRoutes);

app.listen(3000, () => {
  console.log("Servidor Bun corriendo en http://localhost:3000");
  console.log(
    "Documentación Swagger disponible en http://localhost:3000/swagger"
  );
});

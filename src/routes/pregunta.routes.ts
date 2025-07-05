import { Elysia, t } from "elysia";
import { Pregunta } from "../models/pregunta.model";

export const preguntaRoutes = (app: Elysia) =>
  app.group("/preguntas", (app) =>
    app
      .get(
        "/",
        async () => {
          try {
            const preguntas = await Pregunta.find();
            return preguntas;
          } catch (error: any) {
            console.error("Error al obtener las preguntas:", error);
            return new Response(JSON.stringify({ error: error.message }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }
        },
        {
          detail: {
            summary: "Obtiene todas las preguntas",
            tags: ["Preguntas"],
            responses: {
              200: {
                description: "Lista de todas las preguntas",
              },
              500: {
                description: "Error interno del servidor",
              },
            },
          },
        }
      )
      .post(
        "/",
        async ({ body }) => {
          try {
            const nuevaPregunta = new Pregunta(body);
            await nuevaPregunta.save();
            return {
              message: "Pregunta creada exitosamente",
              pregunta: nuevaPregunta,
            };
          } catch (error: any) {
            console.error("Error al crear la pregunta:", error);
            return new Response(JSON.stringify({ error: error.message }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }
        },
        {
          body: t.Object({
            pregunta: t.String({
              description: "Texto de la pregunta",
              minLength: 5,
            }),
            tipo: t.String({
              description: "Tipo de pregunta (ej. 'texto', 'multiple_choice')",
              enum: ["texto", "multiple_choice"], // Mantengo estos tipos por ahora
            }),
            opciones: t.Optional(
              t.Array(t.String(), {
                description: "Opciones si es de tipo 'multiple_choice'",
              })
            ),
            respuesta: t.String({
              description: "La respuesta a la pregunta",
              minLength: 1,
            }), // Cambiado de respuestaCorrecta a respuesta
            fecha: t.String({
              description: "Fecha de la pregunta (formato 'DD-MM-YYYY')",
              // Puedes añadir un formato de regex si quieres validar el formato de fecha exacto
              pattern: "^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\\d{4})$",
            }), // Nuevo campo 'fecha'
          }),
          detail: {
            summary: "Crea una nueva pregunta",
            tags: ["Preguntas"],
            responses: {
              200: {
                description: "Pregunta creada exitosamente",
              },
              500: {
                description: "Error interno del servidor",
              },
            },
          },
        }
      )
  );

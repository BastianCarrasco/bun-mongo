// src/controllers/pregunta.controller.ts
import Pregunta, { IPregunta } from "../models/pregunta";
import { type Context } from "elysia"; // Importa el tipo Context de Elysia

// Obtener todas las preguntas
export const getAllPreguntas = async (ctx: Context) => {
  try {
    const preguntas = await Pregunta.find();
    return { success: true, data: preguntas };
  } catch (error: any) {
    ctx.set.status = 500;
    return { success: false, message: error.message };
  }
};

// Crear una nueva pregunta
export const createPregunta = async (
  ctx: Context<{ body: Omit<IPregunta, "_id" | "createdAt" | "updatedAt"> }>
) => {
  try {
    // Si 'fecha' viene como string y la quieres guardar como Date, haz:
    // const newPreguntaData = { ...ctx.body, fecha: new Date(ctx.body.fecha) };
    const newPregunta = await Pregunta.create(ctx.body);
    ctx.set.status = 201; // Created
    return { success: true, data: newPregunta };
  } catch (error: any) {
    ctx.set.status = 400; // Bad Request
    return { success: false, message: error.message };
  }
};

// Obtener una pregunta por ID
export const getPreguntaById = async (
  ctx: Context<{ params: { id: string } }>
) => {
  try {
    const pregunta = await Pregunta.findById(ctx.params.id);
    if (!pregunta) {
      ctx.set.status = 404; // Not Found
      return { success: false, message: "Pregunta no encontrada" };
    }
    return { success: true, data: pregunta };
  } catch (error: any) {
    ctx.set.status = 500;
    return { success: false, message: error.message };
  }
};

// Actualizar una pregunta
export const updatePregunta = async (
  ctx: Context<{
    params: { id: string };
    body: Partial<Omit<IPregunta, "_id" | "createdAt" | "updatedAt">>;
  }>
) => {
  try {
    const updatedPregunta = await Pregunta.findByIdAndUpdate(
      ctx.params.id,
      ctx.body,
      { new: true }
    );
    if (!updatedPregunta) {
      ctx.set.status = 404;
      return {
        success: false,
        message: "Pregunta no encontrada para actualizar",
      };
    }
    return { success: true, data: updatedPregunta };
  } catch (error: any) {
    ctx.set.status = 400;
    return { success: false, message: error.message };
  }
};

// Eliminar una pregunta
export const deletePregunta = async (
  ctx: Context<{ params: { id: string } }>
) => {
  try {
    const deletedPregunta = await Pregunta.findByIdAndDelete(ctx.params.id);
    if (!deletedPregunta) {
      ctx.set.status = 404;
      return {
        success: false,
        message: "Pregunta no encontrada para eliminar",
      };
    }
    ctx.set.status = 204; // No Content
    return { success: true, message: "Pregunta eliminada exitosamente" };
  } catch (error: any) {
    ctx.set.status = 500;
    return { success: false, message: error.message };
  }
};

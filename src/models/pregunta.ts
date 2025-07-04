// src/models/Pregunta.ts
import { Schema, model, Document } from "mongoose";

// Interfaz para el documento de Pregunta
export interface IPregunta extends Document {
  pregunta: string;
  respuesta: string;
  fecha: string; // O Date si prefieres manejarla como objeto Date
}

// Esquema de Mongoose para la colección 'Preguntas'
const PreguntaSchema = new Schema<IPregunta>({
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true },
  fecha: { type: String, required: true }, // Podrías usar 'Date' y convertirla si viene como string
});

// Modelo de Mongoose
const Pregunta = model<IPregunta>("Pregunta", PreguntaSchema, "Preguntas"); // 'Preguntas' es el nombre de la colección en MongoDB

export default Pregunta;

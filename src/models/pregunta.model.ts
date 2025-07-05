import mongoose from "mongoose";

// Define una interfaz para la forma de tus documentos Pregunta (opcional pero recomendado para TypeScript)
export interface IPregunta extends mongoose.Document {
  pregunta: string;
  tipo: string; // Todavía es útil para diferenciar tipos de preguntas
  opciones?: string[]; // Puede estar vacío si no es de opción múltiple
  respuesta: string; // Cambiado de 'respuestaCorrecta' a 'respuesta'
  fecha: string; // Nuevo campo 'fecha'
}

const preguntaSchema = new mongoose.Schema(
  {
    pregunta: { type: String, required: true },
    tipo: { type: String, required: true }, // Aunque tu ejemplo no tiene 'tipo', lo mantendremos ya que lo definiste como necesario. Si no lo usas, puedes hacerlo opcional o eliminarlo.
    opciones: [{ type: String }], // Array de strings, puede ser vacío
    respuesta: { type: String, required: true }, // 'respuesta' es ahora requerido según el ejemplo
    fecha: { type: String, required: true }, // 'fecha' es ahora requerido
  },
  { collection: "Preguntas" } // Asegúrate de que el nombre de la colección sea correcto
);

export const Pregunta = mongoose.model<IPregunta>("Pregunta", preguntaSchema);

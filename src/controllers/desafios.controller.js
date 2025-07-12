import DesafioInscripcion from "../models/DesafioInscripcion.js";

export const createDesafioInscripcion = async (body, set) => {
  try {
    const nuevaInscripcion = new DesafioInscripcion(body);
    await nuevaInscripcion.save();
    set.status = 201; // Created
    return {
      message: "Inscripción de desafio guardada exitosamente",
      data: nuevaInscripcion,
    };
  } catch (error) {
    console.error("Error al guardar la inscripción de desafio:", error);
    if (error.code === 11000) {
      // Duplicate key error
      set.status = 409; // Conflict
      return {
        error:
          "El correo electrónico ya está registrado. Verifique sus datos.",
      };
    }
    if (error.name === "ValidationError") {
      // Mongoose validation error
      set.status = 400; // Bad Request
      const errors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      return { error: "Error de validación", details: errors };
    }
    set.status = 500; // Internal Server Error
    return {
      error:
        "Error interno del servidor al procesar la inscripción de desafio.",
    };
  }
};

export const getAllInscripcionesDesafios = async (set) => {
  try {
    const inscripciones = await DesafioInscripcion.find();
    return { message: 'Inscripciones de desafios obtenidas exitosamente', data: inscripciones };
  } catch (error) {
    console.error('Error al obtener inscripciones de desafios:', error);
    set.status = 500;
    return { error: 'Error interno del servidor al obtener las inscripciones de desafios.' };
  }
};

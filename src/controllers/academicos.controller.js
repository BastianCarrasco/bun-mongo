import AcademicoInscripcion from "../models/AcademicoInscripcion.js";

export const createAcademicoInscripcion = async (body, set) => {
  try {
    const nuevaInscripcion = new AcademicoInscripcion(body);
    await nuevaInscripcion.save();
    set.status = 201; // Created
    return {
      message: "Inscripción de académico guardada exitosamente",
      data: nuevaInscripcion,
    };
  } catch (error) {
    console.error("Error al guardar la inscripción de académico:", error);
    if (error.code === 11000) {
      // Duplicate key error
      set.status = 409; // Conflict
      return {
        error:
          "El correo electrónico ya está registrado para un académico. Verifique sus datos.",
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
        "Error interno del servidor al procesar la inscripción de académico.",
    };
  }
};

export const getAllInscripcionesAcademicos = async (set) => {
  try {
    const inscripciones = await AcademicoInscripcion.find();
    return { message: 'Inscripciones de académicos obtenidas exitosamente', data: inscripciones };
  } catch (error) {
    console.error('Error al obtener inscripciones de académicos:', error);
    set.status = 500;
    return { error: 'Error interno del servidor al obtener las inscripciones de académicos.' };
  }
};

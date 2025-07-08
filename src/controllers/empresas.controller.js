import EmpresaInscripcion from "../models/EmpresaInscripcion.js";

export const createInscripcionEmpresa = async (body, set) => {
  try {
    const nuevaInscripcion = new EmpresaInscripcion(body);
    await nuevaInscripcion.save();
    set.status = 201;
    return {
      message: "Inscripción de empresa guardada exitosamente",
      data: nuevaInscripcion,
    };
  } catch (error) {
    console.error("Error al guardar la inscripción:", error);
    if (error.code === 11000) {
      set.status = 409;
      return {
        error: "El correo electrónico ya está registrado. Verifique sus datos.",
      };
    }
    if (error.name === "ValidationError") {
      set.status = 400;
      const errors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      return { error: "Error de validación", details: errors };
    }
    set.status = 500;
    return { error: "Error interno del servidor al procesar la inscripción." };
  }
};

export const getAllInscripcionesEmpresas = async (set) => {
  try {
    const inscripciones = await EmpresaInscripcion.find();
    return { message: 'Inscripciones de empresas obtenidas exitosamente', data: inscripciones };
  } catch (error) {
    console.error('Error al obtener inscripciones:', error);
    set.status = 500;
    return { error: 'Error interno del servidor al obtener las inscripciones.' };
  }
};

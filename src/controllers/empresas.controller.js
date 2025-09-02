import EmpresaInscripcion from "../models/EmpresaInscripcion.js";

// CREATE: Crear una nueva inscripción de empresa
export const createInscripcionEmpresa = async (body, set) => {
  try {
    // Cuando creamos una nueva inscripción, si el 'link' viene en el body,
    // Mongoose lo mapeará correctamente al campo 'link' de nivel raíz
    // gracias a la actualización del esquema.
    const nuevaInscripcion = new EmpresaInscripcion(body);
    await nuevaInscripcion.save();
    set.status = 201; // Creado
    return {
      message: "Inscripción de empresa guardada exitosamente",
      data: nuevaInscripcion,
    };
  } catch (error) {
    console.error("Error al guardar la inscripción:", error);
    if (error.code === 11000) {
      set.status = 409; // Conflicto
      return {
        error: "El correo electrónico ya está registrado. Verifique sus datos.",
      };
    }
    if (error.name === "ValidationError") {
      set.status = 400; // Petición incorrecta
      const errors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      return { error: "Error de validación", details: errors };
    }
    set.status = 500; // Error interno del servidor
    return { error: "Error interno del servidor al procesar la inscripción." };
  }
};

// READ ALL: Obtener todas las inscripciones de empresas
export const getAllInscripcionesEmpresas = async (set) => {
  try {
    // No necesita cambios, find() recuperará todos los campos, incluido 'link' en la raíz.
    const inscripciones = await EmpresaInscripcion.find();
    set.status = 200; // OK
    return inscripciones;
  } catch (error) {
    console.error("Error al obtener inscripciones:", error);
    set.status = 500; // Error interno del servidor
    return {
      error: "Error interno del servidor al obtener las inscripciones.",
    };
  }
};

// READ ONE: Obtener una inscripción de empresa por ID
export const getInscripcionEmpresaById = async (id, set) => {
  try {
    // No necesita cambios, findById() recuperará todos los campos, incluido 'link' en la raíz.
    const inscripcion = await EmpresaInscripcion.findById(id);
    if (!inscripcion) {
      set.status = 404; // No encontrado
      return { error: "Inscripción de empresa no encontrada." };
    }
    set.status = 200; // OK
    return inscripcion;
  } catch (error) {
    console.error(`Error al obtener inscripción con ID ${id}:`, error);
    if (error.name === "CastError") {
      set.status = 400; // Petición incorrecta (ID inválido)
      return { error: "ID de inscripción inválido." };
    }
    set.status = 500; // Error interno del servidor
    return { error: "Error interno del servidor al obtener la inscripción." };
  }
};

// UPDATE: Actualizar una inscripción de empresa por ID
export const updateInscripcionEmpresa = async (id, body, set) => {
  try {
    // Si el 'link' viene en el 'body' de la actualización,
    // findByIdAndUpdate lo aplicará correctamente al campo 'link' de nivel raíz.
    const inscripcionActualizada = await EmpresaInscripcion.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!inscripcionActualizada) {
      set.status = 404; // No encontrado
      return { error: "Inscripción de empresa no encontrada para actualizar." };
    }
    set.status = 200; // OK
    return inscripcionActualizada;
  } catch (error) {
    console.error(`Error al actualizar inscripción con ID ${id}:`, error);
    if (error.name === "CastError") {
      set.status = 400; // Petición incorrecta (ID inválido)
      return { error: "ID de inscripción inválido." };
    }
    if (error.code === 11000) {
      set.status = 409; // Conflicto
      return {
        error: "El correo electrónico ya está registrado. Verifique sus datos.",
      };
    }
    if (error.name === "ValidationError") {
      set.status = 400; // Petición incorrecta
      const errors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      return { error: "Error de validación", details: errors };
    }
    set.status = 500; // Error interno del servidor
    return {
      error: "Error interno del servidor al actualizar la inscripción.",
    };
  }
};

// DELETE: Eliminar una inscripción de empresa por ID
export const deleteInscripcionEmpresa = async (id, set) => {
  try {
    // No necesita cambios, findByIdAndDelete funciona con la estructura actual.
    const inscripcionEliminada = await EmpresaInscripcion.findByIdAndDelete(id);

    if (!inscripcionEliminada) {
      set.status = 404; // No encontrado
      return { error: "Inscripción de empresa no encontrada para eliminar." };
    }
    set.status = 200; // OK
    return inscripcionEliminada;
  } catch (error) {
    console.error(`Error al eliminar inscripción con ID ${id}:`, error);
    if (error.name === "CastError") {
      set.status = 400; // Petición incorrecta (ID inválido)
      return { error: "ID de inscripción inválido." };
    }
    set.status = 500; // Error interno del servidor
    return { error: "Error interno del servidor al eliminar la inscripción." };
  }
};

// GET DESAFIO EMPRESAS (ya lo habíamos actualizado, solo para confirmar)
export const getDesafioEmpresas = async () => {
  // Ya no recibimos 'set' aquí
  try {
    const inscripciones = await EmpresaInscripcion.find(
      { validado: true },
      {
        _id: 1,
        nombreEmpresa: 1,
        actividadesServicios: 1,
        front: 1,
        link: 1, // Asegura que 'link' de nivel raíz se proyecte
      }
    );

    const dataConFrontInfo = inscripciones.map((inscripcion) => {
      // Asegurarse de que `inscripcion.front` siempre sea un objeto para el esquema
      // Aunque en el tipo de Elysia se permite Optional, al mapear, es bueno asegurar.
      // Si el `front` no existe, se retornará `undefined` aquí, lo cual es compatible con `t.Optional(t.Object(...))`.
      return {
        _id: inscripcion._id.toString(),
        nombreEmpresa: inscripcion.nombreEmpresa,
        actividadesServicios: inscripcion.actividadesServicios,
        front: inscripcion.front, // Accede al objeto 'front' completo
        link: inscripcion.link, // Accede a 'link' de nivel raíz
        validado: true, // Sabemos que son validados por la consulta
      };
    });

    return dataConFrontInfo; // Solo retorna el arreglo
  } catch (error) {
    console.error("Error al obtener información específica:", error);
    // Lanza el error para que Elysia lo capture en la ruta
    throw new Error(
      "Error interno del servidor al obtener la información específica de empresas."
    );
  }
};

import EmpresaInscripcion from "../models/EmpresaInscripcion.js";

// CREATE: Crear una nueva inscripción de empresa
export const createInscripcionEmpresa = async (body, set) => {
  try {
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
      // Error de duplicado (ej. correo electrónico único)
      set.status = 409; // Conflicto
      return {
        error: "El correo electrónico ya está registrado. Verifique sus datos.",
      };
    }
    if (error.name === "ValidationError") {
      // Error de validación de Mongoose
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
    const inscripciones = await EmpresaInscripcion.find();
    set.status = 200; // OK
    return inscripciones; // <-- ¡Cambiado! Retorna el array directamente
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
    const inscripcion = await EmpresaInscripcion.findById(id);
    if (!inscripcion) {
      set.status = 404; // No encontrado
      return { error: "Inscripción de empresa no encontrada." };
    }
    set.status = 200; // OK
    return inscripcion; // <-- ¡Cambiado! Retorna el objeto directamente
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
    const inscripcionActualizada = await EmpresaInscripcion.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true } // `new: true` devuelve el documento actualizado; `runValidators: true` ejecuta validaciones del esquema
    );

    if (!inscripcionActualizada) {
      set.status = 404; // No encontrado
      return { error: "Inscripción de empresa no encontrada para actualizar." };
    }
    set.status = 200; // OK
    return inscripcionActualizada; // <-- ¡Cambiado! Retorna el objeto directamente
  } catch (error) {
    console.error(`Error al actualizar inscripción con ID ${id}:`, error);
    if (error.name === "CastError") {
      set.status = 400; // Petición incorrecta (ID inválido)
      return { error: "ID de inscripción inválido." };
    }
    if (error.code === 11000) {
      // Error de duplicado (ej. correo electrónico único)
      set.status = 409; // Conflicto
      return {
        error: "El correo electrónico ya está registrado. Verifique sus datos.",
      };
    }
    if (error.name === "ValidationError") {
      // Error de validación de Mongoose
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
    const inscripcionEliminada = await EmpresaInscripcion.findByIdAndDelete(id);

    if (!inscripcionEliminada) {
      set.status = 404; // No encontrado
      return { error: "Inscripción de empresa no encontrada para eliminar." };
    }
    set.status = 200; // OK (o 204 No Content si no se devuelve cuerpo)
    return inscripcionEliminada; // <-- ¡Cambiado! Retorna el objeto directamente
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

export const getDesafioEmpresas = async (set) => {
  try {
    const inscripciones = await EmpresaInscripcion.find(
      { Validar: true }, // <-- ¡CAMBIO CLAVE AQUÍ!
      {
        empresaOrganizacion: 1, // Incluir el nombre de la empresa/organización
        actividadesServicios: 1, // Agregado previamente
        front: 1, // Incluir el objeto 'front' completo
        _id: 0, // Excluir el ID del documento
      }
    );

    // Mapear para asegurar que el 'link' de 'front' se extraiga
    // y para que la estructura devuelta sea consistente.
    const dataConFrontInfo = inscripciones.map((inscripcion) => {
      return {
        empresaOrganizacion: inscripcion.empresaOrganizacion,
        actividadesServicios: inscripcion.actividadesServicios,
        front: inscripcion.front, // Objeto front completo (contiene desafio_1, _2, _3, link, etc.)
        link: inscripcion.front?.link, // Vuelve a ser directamente front.link
      };
    });

    set.status = 200;
    return dataConFrontInfo; // Retorna directamente el array
  } catch (error) {
    console.error("Error al obtener información específica:", error);
    set.status = 500;
    return {
      error:
        "Error interno del servidor al obtener la información específica de empresas.",
    };
  }
};

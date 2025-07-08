import mongoose from "mongoose";

const EmpresaInscripcionSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true, // Elimina espacios en blanco al inicio/final
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    correoElectronico: {
      type: String,
      required: true,
      unique: true, // Asegura que no haya correos duplicados
      trim: true,
      lowercase: true, // Guarda el correo en minúsculas
      match: [/\S+@\S+\.\S+/, "Por favor, use un correo electrónico válido"], // Validación regex
    },
    numeroTelefono: {
      type: String,
      required: true,
      trim: true,
    },
    empresaOrganizacion: {
      type: String,
      required: true,
      trim: true,
    },
    areaTrabajo: {
      type: String,
      required: true,
      trim: true,
    },
    contactoWeb: {
      type: String,
      required: true,
      trim: true,
    },
    vinculoPUCV: {
      type: [String], // Array de strings
      default: [], // Por defecto, es un array vacío
    },
    actividadesServicios: {
      type: String,
      trim: true,
      default: "",
    },
    desafio1: {
      type: String,
      trim: true,
      default: "",
    },
    desafio2: {
      type: String,
      trim: true,
      default: "",
    },
    desafio3: {
      type: String,
      trim: true,
      default: "",
    },
    interesInformacion: {
      type: String,
      enum: ["si", "no", ""], // Solo permite 'si', 'no' o vacío
      default: "",
    },
  },
  {
    timestamps: true, // Agrega `createdAt` y `updatedAt` automáticamente
  }
);

// Crea el modelo a partir del esquema. Si el modelo ya existe, lo usa.
const EmpresaInscripcion =
  mongoose.models.EmpresaInscripcion ||
  mongoose.model("EmpresaInscripcion", EmpresaInscripcionSchema);

export default EmpresaInscripcion;

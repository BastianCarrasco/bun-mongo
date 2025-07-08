import mongoose from "mongoose";

const AcademicoInscripcionSchema = new mongoose.Schema(
  {
    nombreApellido: {
      type: String,
      required: true,
      trim: true,
    },
    correoElectronico: {
      type: String,
      required: true,
      unique: true, // Asegura que no haya correos duplicados
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Por favor, use un correo electrónico válido"],
    },
    unidadAcademica: {
      type: String,
      required: true,
      trim: true,
    },
    otraUnidad: {
      // Campo condicional, solo se requiere si unidadAcademica es "Otra..."
      type: String,
      trim: true,
      default: "",
    },
    capacidadesID: {
      type: String,
      required: true,
      trim: true,
    },
    acompanante: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true, // Agrega `createdAt` y `updatedAt` automáticamente
  }
);

// Crea el modelo a partir del esquema. Si el modelo ya existe, lo usa.
const AcademicoInscripcion =
  mongoose.models.AcademicoInscripcion ||
  mongoose.model("AcademicoInscripcion", AcademicoInscripcionSchema);

export default AcademicoInscripcion;

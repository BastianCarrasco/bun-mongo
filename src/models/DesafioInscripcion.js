import mongoose from "mongoose";

const DesafioInscripcionSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio."],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres."],
      maxlength: [50, "El nombre no puede exceder los 50 caracteres."],
    },
    apellido: {
      type: String,
      required: [true, "El apellido es obligatorio."],
      trim: true,
      minlength: [2, "El apellido debe tener al menos 2 caracteres."],
      maxlength: [50, "El apellido no puede exceder los 50 caracteres."],
    },
    correoElectronico: {
      type: String,
      required: [true, "El correo electrónico es obligatorio."],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Por favor, ingrese un correo electrónico válido.",
      ],
      maxlength: [
        100,
        "El correo electrónico no puede exceder los 100 caracteres.",
      ],
    },
    // Ahora 'unidadAcademica' contendrá el nombre real de la unidad,
    // ya sea una de las predefinidas o la que el usuario escribió en "Otra..."
    unidadAcademica: {
      type: String,
      required: [true, "La unidad académica es obligatoria."],
      trim: true,
      maxlength: [
        100,
        "La unidad académica no puede exceder los 100 caracteres.",
      ],
    },
    // campo 'otraUnidad' ha sido ELIMINADO de este esquema
    desafioInteres: {
      type: String,
      required: [true, "El desafío de interés es obligatorio."],
      enum: {
        values: ["Desafío CMF", "Desafío NANOTC", "Desafío Abierto"],
        message: "El desafío de interés no es válido.",
      },
      trim: true,
    },
    capacidadesDesafio: {
      type: String,
      required: [true, "La descripción de capacidades es obligatoria."],
      trim: true,
      maxlength: [
        1000,
        "La descripción de capacidades no puede exceder los 1000 caracteres.",
      ],
    },
  },
  {
    timestamps: true,
  }
);

// ¡IMPORTANTE! ELIMINAMOS el middleware pre('validate') relacionado con 'otraUnidad'
// ya que ya no es un campo en el esquema ni necesitamos esa validación condicional aquí.

const DesafioInscripcion =
  mongoose.models.DesafioInscripcion ||
  mongoose.model("DesafioInscripcion", DesafioInscripcionSchema);

export default DesafioInscripcion;

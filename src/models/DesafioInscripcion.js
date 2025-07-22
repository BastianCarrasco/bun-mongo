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
    unidadAcademica: {
      type: String,
      required: [true, "La unidad académica es obligatoria."],
      trim: true,
      maxlength: [
        100,
        "La unidad académica no puede exceder los 100 caracteres.",
      ],
    },
    desafioInteres: {
      type: [String], // CAMBIO AQUÍ: Ahora es un arreglo de Strings
      required: [true, "El desafío de interés es obligatorio."],
      enum: {
        values: ["Desafío CMF", "Desafío NANOTC", "Desafío Abierto"],
        message: "Uno o más desafíos de interés no son válidos.",
      },
      // Nueva validación para asegurar que el arreglo no esté vacío
      validate: {
        validator: function (arr) {
          return arr && arr.length > 0;
        },
        message: "Debe seleccionar al menos un desafío de interés.",
      },
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

const DesafioInscripcion =
  mongoose.models.DesafioInscripcion ||
  mongoose.model("DesafioInscripcion", DesafioInscripcionSchema);

export default DesafioInscripcion;

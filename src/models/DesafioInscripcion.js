import mongoose from "mongoose";

const DesafioInscripcionSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio."],
      trim: true,
      maxlength: [50, "El nombre no puede exceder los 50 caracteres."],
    },
    apellido: {
      type: String,
      required: [true, "El apellido es obligatorio."],
      trim: true,
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
      type: [String], // <--- AHORA ES UN ARRAY DE STRINGS
      required: [true, "Debe seleccionar al menos un desafío."],
      // Validator para asegurar que los strings en el array sean de las opciones válidas.
      // Las opciones deben coincidir con las del frontend: "Desafío CMF", "Desafío NANOTC", "Desafío Abierto (Otro desafío en colaboración con la industria)"
      validate: {
        validator: function (v) {
          const validOptions = [
            "Desafío CMF",
            "Desafío NANOTC",
            "Desafío Abierto (Otro desafío en colaboración con la industria)",
          ];
          // Se asegura que 'v' sea un array, que no esté vacío y que todos sus elementos sean strings válidos
          return (
            Array.isArray(v) &&
            v.length > 0 &&
            v.every((val) => validOptions.includes(val))
          );
        },
        message: (props) =>
          `${props.value} contiene uno o más desafíos no válidos o el array está vacío.`,
      },
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

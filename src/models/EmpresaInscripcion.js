import mongoose from "mongoose";

const EmpresaInscripcionSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      default: "",
    },
    apellido: {
      type: String,
      trim: true,
      default: "",
    },
    correoElectronico: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Por favor, use un correo electrónico válido"],
      default: "",
    },
    numeroTelefono: {
      type: String,
      trim: true,
      default: "",
    },
    nombreEmpresa: {
      type: String,
      trim: true,
      default: "",
    },
    areaTrabajo: {
      type: [String],
      default: [],
    },
    contactoWeb: {
      type: String,
      trim: true,
      default: "",
    },
    vinculoPucv: {
      type: [String],
      default: [],
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
    masInformacion: {
      type: Boolean,
      default: false,
    },
    validado: {
      type: Boolean,
      default: false,
    },
    // <--- MOVIDO AQUÍ: link en el nivel raíz del esquema
    link: {
      type: String,
      trim: true,
      default: "",
    },
    front: {
      contexto: {
        type: String,
        trim: true,
        default: "",
      },
      extra: {
        titulo: {
          type: String,
          trim: true,
          default: "",
        },
        datos: {
          type: [String],
          default: [],
        },
        // ELIMINADO: link ya no está dentro de 'extra'
      },
      // ELIMINADO: link ya no está directamente dentro de 'front'
      desafio_Texto: {
        type: String,
        trim: true,
        default: "",
      },
      desafio_1: {
        titulo: {
          type: String,
          trim: true,
          default: "",
        },
        descripcion: {
          type: String,
          trim: true,
          default: "",
        },
      },
      desafio_2: {
        titulo: {
          type: String,
          trim: true,
          default: "",
        },
        descripcion: {
          type: String,
          trim: true,
          default: "",
        },
      },
      desafio_3: {
        titulo: {
          type: String,
          trim: true,
          default: "",
        },
        descripcion: {
          type: String,
          trim: true,
          default: "",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const EmpresaInscripcion =
  mongoose.models.EmpresaInscripcion ||
  mongoose.model("empresas_desafios", EmpresaInscripcionSchema);

export default EmpresaInscripcion;

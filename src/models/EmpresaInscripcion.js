import mongoose from "mongoose";

const EmpresaInscripcionSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      // required: true, // ELIMINADO
      trim: true,
      default: "", // Asegura que siempre tenga un valor por defecto si no se proporciona
    },
    apellido: {
      type: String,
      // required: true, // ELIMINADO
      trim: true,
      default: "", // Asegura que siempre tenga un valor por defecto
    },
    correoElectronico: {
      type: String,
      // required: true, // ELIMINADO
      // unique: true, // Considera si `unique` tiene sentido si el campo puede estar vacío. Mongoose maneja los vacíos como únicos si hay varios. Si puede haber muchos vacíos, quita `unique`.
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Por favor, use un correo electrónico válido"],
      default: "", // Asegura que siempre tenga un valor por defecto
    },
    numeroTelefono: {
      type: String,
      // required: true, // ELIMINADO
      trim: true,
      default: "", // Asegura que siempre tenga un valor por defecto
    },
    empresaOrganizacion: {
      type: String,
      // required: true, // ELIMINADO
      trim: true,
      default: "", // Asegura que siempre tenga un valor por defecto
    },
    areaTrabajo: {
      type: [String],
      // required: true, // ELIMINADO
      default: [], // Asegura que siempre sea un array por defecto
    },
    contactoWeb: {
      type: String,
      // required: true, // ELIMINADO
      trim: true,
      default: "", // Asegura que siempre tenga un valor por defecto
    },
    vinculoPUCV: {
      type: [String],
      default: [], // Ya tiene default, bueno para no ser obligatorio
    },
    actividadesServicios: {
      type: String,
      trim: true,
      default: "", // Ya tiene default
    },
    desafio1: {
      type: String,
      trim: true,
      default: "", // Ya tiene default
    },
    desafio2: {
      type: String,
      trim: true,
      default: "", // Ya tiene default
    },
    desafio3: {
      type: String,
      trim: true,
      default: "", // Ya tiene default
    },
    interesInformacion: {
      type: Boolean,
      default: false, // Ya tiene default
    },
    Validar: {
      type: Boolean,
      default: false, // Ya tiene default
    },
    front: {
      contexto: {
        type: String,
        trim: true,
        default: "", // Ya tiene default
      },
      extra: {
        titulo: {
          type: String,
          trim: true,
          default: "", // Ya tiene default
        },
        datos: {
          type: [String],
          default: [], // Ya tiene default
        },
      },
      link: {
        type: String,
        trim: true,
        default: "", // Ya tiene default
      },
      desafio_Texto: {
        type: String,
        trim: true,
        default: "", // Ya tiene default
      },
      desafio_1: {
        titulo: {
          type: String,
          trim: true,
          default: "", // Ya tiene default
        },
        descripcion: {
          type: String,
          trim: true,
          default: "", // Ya tiene default
        },
      },
      desafio_2: {
        titulo: {
          type: String,
          trim: true,
          default: "", // Ya tiene default
        },
        descripcion: {
          type: String,
          trim: true,
          default: "", // Ya tiene default
        },
      },
      desafio_3: {
        titulo: {
          type: String,
          trim: true,
          default: "", // Ya tiene default
        },
        descripcion: {
          type: String,
          trim: true,
          default: "", // Ya tiene default
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
  mongoose.model("EmpresaInscripcion", EmpresaInscripcionSchema);

export default EmpresaInscripcion;

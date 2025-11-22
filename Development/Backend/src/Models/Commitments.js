// Importa o Mongoose.
const mongoose = require("mongoose");

// Define o schema para o Compromisso.
const CommitmentSchema = new mongoose.Schema(
  {
    // 'name': O nome do compromisso, (ex: 'Dentista', 'Reunião'). É obrigatório.
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // 'date': A data do compromisso. Será armazenada como um objeto Date nativo do JavaScript.
    date: {
      type: Date,
      required: true,
    },

    // 'time': A hora do compromisso. Será armazenada como uma string (ex: '14:30').
    // Embora possa ser incluido no campo 'date', mantemos separado para facilitar a validação, é o formato de entrada no forntend.
    time: {
      type: String,
      required: true,
    },

    // 'user': O campo mais importante. Cria uma 'referência' (relação) ao Model 'User'.
    // 'type' mongoose.Schema.Types.ObjectId indica que o valor será o ID de outro documento.
    // 'ref: 'User'' indica que esse ID aponta para um documento na coleção 'users', isso garante que cada compromisso pertença a um único usuário

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    // Novamente, adiciona timestamps de criação e atulizarção.
    timestamps: true,
  }
);

// Cria e exporta o Modal 'Commitment'. O nome da coleção no Mongo será 'commitments'.
module.exports = mongoose.model("Commitment", CommitmentSchema);

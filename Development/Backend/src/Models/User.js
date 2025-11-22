// Importa o módulo Mongoose para interagir com o MonogoBD de froma estruturada.
const mongoose = require("mongoose");

// Importa o Bcrypt para realizar o hashing de seguro da senha.
const bcrypt = require("bcrypt");

// Define o Schema (esquema) para o documento de Usuário no MongoBD.
const UserSchema = new mongoose.Schema(
  {
    // Ocampo 'email é obrigatório (required: true), é único (unique: true)
    // para garantir quee não haja duplicidade, e será armazenado como string.
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // O campo 'password' é  obrigatório e armazena a string do hash da senha.
    password: {
      type: String,
      required: true,
    },
  },

  {
    // Adiciona automaticamente campos 'createdAt' e 'updatedAt' para rastrear a criação/modificação.
    timestamps: true,
  }
);

// MIDDLEWARE (Pré-Save): Roda ANTES de salvar o usuário no banco de dados.
// Usamos a função 'pre' do mongoose. O primeiro argumento e 'save', a operação que vai dispara essa função.
UserSchema.pre("save", async function (next) {
  // 'this' refere-se ao documento (usuário) que está preste a ser salvo.
  // 'isModified' ('password') verifica se o campo 'password' foi alterado.
  // Isso é importante para não hashear uma senha que já está hasheada (ex: ao atualizar o email).
  if (!this.isModified("password")) {
    // Se a senha não foi modificada, passa para o próximo middleeare/operação.
    return next();
  }

  try {
    // 'bcrypt.genSalt' gera um 'salt' (uma string aleatória) que será misturada à senha
    // antes de hashear. Onúmeor '10' é o 'custo do processamento'  (quando maior, mais seguro, mas mais lento). É bom um valor equilibrado
    const salt = await bcrypt.genSalt(10);
    // 'bcrupt.hash' aplica a função de hash á senha atual ('this.password') usando o 'salt'.
    // Isso cria um hash de uma via (impossível reverter).
    this.password = await bcrypt.hash(this.password, salt);
    // Chama 'next()' para continuar o processo de salvamento (agora com a senha haseada).
    next();
  } catch (error) {
    // Se houver uum erro durante o hashing, passa  erro para o Express.
    next(error);
  }
});

// Método personalizado: Adicionar uma função ao Schema para comara a senha fornecida no login.
// com o hash salvi no banco.

UserSchema.methods.matchPassword = async function (enterePassword) {
  // 'this.password' é o hash salvo no BD. 'enterPassword' é a senha que o usuário digitou no login.
  // 'bcrypt.compare' compara a string de texto puro com o hash.
  // O processo de comparação também é de uma via (não desfaz o hash salvo) e é seguro.
  return await bcrypt.compare(enterePassword, this.password);
};

// Cria e exporta o Model 'User' a partir do nosso schema. O nome da coleção no Mongo será 'users.
module.exports = mongoose.model("User", Userschema);

// Importa o módulo Mongoose para interagir com o MonogoBD de froma estruturada.
const mongoose = require('mongoose');

// Importa o Bcrypt para realizar o hashing de seguro da senha.
const bcrypt = require('bcrypt');

// Define o Schema (esquema) para o documento de Usuário no MongoBD.
const UserSchema = new mongoose.Schema({
    // Ocampo 'email é obrigatório (required: true), é único (unique: true) 
    // para garantir quee não haja duplicidade, e será armazenado como string.
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    // O campo 'password' é  obrigatório e armazena a string do hash da senha.
    password:{
        type: String,
        required: true
    } 

 }, {
    // Adiciona automaticamente campos 'createdAt' e 'updatedAt' para rastrear a criação/modificação.
    timestamps: true
 });

 // MIDDLEWARE (Pré-Save): Roda ANTES de salvar o usuário no banco de dados. 
 // Usamos a função 'pre' do mongoose. O primeiro argumento e 'save', a operação que vai dispara essa função.
 UserSchema.pre('save', async function(next){
    // 'this' refere-se ao documento (usuário) que está preste a ser salvo.
    // 'isModified' ('password') verifica se o campo 'password' foi alterado. 
    // Isso é importante para não hashear uma senha que já está hasheada (ex: ao atualizar o email).
    if(!this.isModified('password')){
        // Se a senha não foi modificada, passa para o próximo middleeare/operação.
        return next();   }
  }
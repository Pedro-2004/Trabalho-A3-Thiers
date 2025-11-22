// Importa o mongoose.
const mongoose = require("mongoose");

// Função assíncrona para conectar com o banco de dados.
// por que 'async/await' ? Porque a conexão como o banco é uma operaçõa dE
// I/O (Input/Output) que leva tempo. Usar 'async/await' permite que o node.js
// continue processando outrs requisições (Non-Blocking I/O) enquando espera a resposta do bancoo de dados,
// tornando a aplicação mais eficiente.
const connectDB = async () => {
  try {
    // 'mongoose.connect' tenta estabelecer a conexão usando a URI do nosso .env.
    // O método 'await' PAUSA a aexecução desta função especifica até que a conexão seja bem-sucedida ou falhe.
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // Se a coneção for bem-sucedida, imprimir uma mensagem no console.
    // 'conn.connection.host' mostra o host que foi conectado (útil para debug).
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    // Se a conexão falhar (ex: URI errada, banco offiline), imprimir o erro.
    console.error(`Erro de coneção com o MongoDB: ${error.message}`);
    // 'process.exit(1) encerra a aplicação Node.js com um código de erro (1).
    // Não faz sentido rodar a aplicação sem o banco de dados.
    process.exit(1);
  }
};

// Exporta a função para que ela possa ser chamada no arquivo principal (server.js).
module.exports = connectDB;

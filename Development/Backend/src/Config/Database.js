/* src/config/database.js
   Responsável por conectar o servidor ao MongoDB usando Mongoose.
   Exporta uma função async connectDatabase() que:
   - lê MONGO_URL de process.env
   - tenta conectar e loga sucesso/erro
   - é chamada no início do server.js
*/

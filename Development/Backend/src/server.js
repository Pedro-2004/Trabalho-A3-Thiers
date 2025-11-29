// 1. Importações Essenciais:
// dotenv: Carrega variáveis do arquivo .env. Deve ser a primeira linha.
require("dotenv").config();
// express: O framework web.
const express = require("express");
// connectDB: Nossa função de conexão com o MongoDB.
const connectDB = require("./Config/Database");
// cors: Middleware para permitir requisições do frontend.
const cors = require("cors");

// Importa as rotas:
const authRoutes = require("./Routes/AuthRoutes");
const commitmentRoutes = require("./Routes/CommitmentRoutes");

// 2. Conexão com o Banco de Dados:
connectDB();

// 3. Configuração do Express:
// 'express()' cria a instância principal da aplicação Express.
const app = express();

// 4. Middlewares de Aplicação:
// app.use() registra um middleware (uma função que será executada em toda requisição).

// CORS - Configurações para que o seu Frontend React possa se comunicar com este Backend.
// Em desenvolvimento, 'origin: '*' (qualquer origem) é comum.
// Em produção, você DEVE limitar a URL do seu frontend (ex: 'https://seusite.com').
app.use(cors());

// express.json() - Middleware essencial para o Express entender o CORPO da requisição
// que é enviado em formato JSON (req.body) - o que seu frontend envia.
app.use(express.json());

// 5. Definição das Rotas:
// app.use('/caminho', router) - Define o prefixo da URL para um grupo de rotas.
// As rotas dentro de authRoutes.js começarão com '/api/auth'.
// Ex: POST para /api/auth/register
app.use("/api/auth", authRoutes);

// As rotas de compromissos começarão com '/api/commitments'.
// Ex: GET para /api/commitments
app.use("/api/commitments", commitmentRoutes);

// 6. Início do Servidor:
// process.env.PORT pega o valor do .env (se não existir, usa 3000 como padrão).
const PORT = process.env.PORT || 3000;

// app.listen(port, callback) - Inicia o servidor HTTP e o faz 'escutar' requisições.
// O Node.js usa o modelo de I/O Não-Bloqueante e o Event Loop.
// 🧠 Conceito: O Event Loop é o coração do Node. Ele permite que o Node lide com
// múltiplas conexões concorrentes sem usar threads pesados (como em Java).
// Quando há uma operação LENTA (I/O, ex: leitura de disco, requisição de BD),
// o Node a transfere e continua executando outras tarefas. Quando a operação lenta
// termina, o Event Loop a coloca na fila de volta. Isso é o 'Non-Blocking I/O'.
app.listen(PORT, () => {
  console.log(
    `Servidor rodando em modo ${
      process.env.NODE_ENV || "Desenvolvimento"
    } na porta ${PORT}`
  );
  console.log(`Acesse: http://localhost:${PORT}`);
});

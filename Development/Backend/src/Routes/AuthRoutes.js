// Importa o módulo Router do Express. O Router é uma mini-aplicação Express.
const express = require("express");
// Importa as funções do nosso Controller.
const { registerUser, loginUser } = require("../Controllers/AuthController");

// Cria uma nova instância do Router.
const router = express.Router();

// Rota POST para '/register'.
// Método HTTP POST: Usado para CRIAR um novo recurso.
// Endpoint: /api/auth/register (o prefixo '/api/auth' será definido no server.js).
// Lógica: Chama a função registerUser que pega o email/senha do req.body e cria o usuário.
router.post("/register", registerUser);

// Rota POST para '/login'.
// Método HTTP POST: Usado para enviar credenciais e RECEBER o token (não CRIA um novo recurso).
// Lógica: Chama a função loginUser que verifica as credenciais e retorna o token JWT.
router.post("/login", loginUser);

// Exporta o router para ser usado no server.js.
module.exports = router;

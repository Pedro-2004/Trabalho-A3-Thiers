// Importa o JWT para verificar tokens.
const jwt = require('jsonwebtoken');

// Importa o Model de Usuário para encontra o usuário pelo ID no token.
const User = require('../Models/User');

// Função de Middleware para proteger rotas.
// Uma função de middleware sempre recebe (req, res, next).
// 'next' é uma função que chamamos para ir para o próximo passo (controller ou próximo middleware).
const protect = async (req, res, next) => {
    let token; // Variável para armazenar o token JWT.

    // 1. Checa se o token está presente no hader da requisição. 
    // O padrão é 'Authorization: Bearer <token_aqui>' 'req.headers.authorization' é a string inteira.
    if (req.headers,authorization && )
}
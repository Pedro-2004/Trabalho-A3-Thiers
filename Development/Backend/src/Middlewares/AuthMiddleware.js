// Importa o JWT para decodificar o token.
const jwt = require("jsonwebtoken");
// Importa o Model de Usuário para encontrar o usuário pelo ID no token.
const User = require("../models/User");

// Função de Middleware para proteger rotas.
// Uma função de middleware sempre recebe (req, res, next).
// 'next' é a função que chamamos para ir para o próximo passo (controller ou próximo middleware).
const protect = async (req, res, next) => {
  let token; // Variável para armazenar o token JWT.

  // 1. Checa se o token está presente no header da requisição.
  // O padrão é 'Authorization: Bearer <token_aqui>'
  // 'req.headers.authorization' é a string inteira.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Tenta obter o token:
      // 'split(' ')' divide a string no espaço. Ex: ['Bearer', '<token_aqui>']
      // '[1]' pega o segundo elemento, que é o token puro.
      token = req.headers.authorization.split(" ")[1];

      // 2. Decodifica e verifica o token.
      // 'jwt.verify(token, secret)' garante que o token foi assinado por nós
      // e que não expirou.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Encontra o usuário no banco de dados.
      // O payload do nosso token (que criamos no authController) tem o ID do usuário.
      // 'User.findById(decoded.id)' busca o usuário pelo ID.
      // '.select('-password')' remove o campo 'password' do objeto retornado por segurança.
      req.user = await User.findById(decoded.id).select("-password");

      // 4. Se tudo deu certo, chama 'next()'.
      // Isso passa o controle para o *controller* da rota,
      // e agora o controller tem acesso a 'req.user' (o usuário logado).
      next();
    } catch (error) {
      // Se o token for inválido, expirado ou houver outro erro JWT/BD.
      console.error(error);
      // Retorna um erro 401 (Não Autorizado) com uma mensagem.
      return res.status(401).json({ message: "Não autorizado, token falhou." });
    }
  }

  // Se não houver token no header.
  if (!token) {
    res.status(401).json({ message: "Não autorizado, sem token." });
  }
};

// Exporta o middleware para ser usado nas rotas.
module.exports = { protect };

// Importa o User Model.
const User = require("../models/User");
// Importa o JWT.
const jwt = require("jsonwebtoken");

// Função auxiliar para gerar o token JWT (para reutilização de código).
const generateToken = (id) => {
  // 'jwt.sign' cria o token. Recebe:
  // 1. O payload: o dado que estará DENTRO do token (aqui, o ID do usuário).
  // 2. O segredo (JWT_SECRET): a chave que só nós temos para assinar o token.
  // 3. Opções: 'expiresIn' define a validade (boa prática de segurança).
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // 30 dias de validade.
  });
};

// Controller para registrar um novo usuário (POST /api/auth/register).
const registerUser = async (req, res) => {
  // 1. Desestruturação: Extrai 'email' e 'password' do corpo da requisição (req.body).
  // O Express e os middlewares já processaram o JSON enviado pelo frontend.
  const { email, password } = req.body;

  // 2. Validação Mínima: Checa se os campos estão preenchidos.
  if (!email || !password) {
    // Erro 400 (Bad Request) - Requisição inválida.
    return res
      .status(400)
      .json({ message: "Por favor, preencha todos os campos." });
  }

  // 3. Validação de Duplicidade: Verifica se o usuário já existe no banco.
  // 'User.findOne' busca o primeiro documento que satisfaz a condição (email).
  const userExists = await User.findOne({ email });

  if (userExists) {
    // Erro 400 (Bad Request).
    return res.status(400).json({ message: "Usuário já existe." });
  }

  // 4. Criação do Usuário.
  // 'User.create' usa o Schema do Mongoose. O middleware 'pre('save')' no User.js
  // hasheará a senha automaticamente ANTES de salvar.
  const user = await User.create({
    email,
    password,
  });

  // 5. Resposta: Se a criação foi um sucesso.
  if (user) {
    // Código 201 (Created) - Indica que um novo recurso foi criado.
    res.status(201).json({
      _id: user._id, // ID do novo usuário.
      email: user.email, // Email do novo usuário.
      // Gera o token JWT e o envia para o frontend (para guardar e usar em rotas protegidas).
      token: generateToken(user._id),
    });
  } else {
    // Erro 400 se a criação falhar por algum motivo interno (raro).
    res.status(400).json({ message: "Dados de usuário inválidos." });
  }
};

// Controller para fazer login (POST /api/auth/login).
const loginUser = async (req, res) => {
  const { email, password } = req.body; // Extrai email e senha.

  // 1. Busca o usuário pelo email.
  const user = await User.findOne({ email });

  // 2. Verifica se o usuário existe E se a senha confere.
  // 'user.matchPassword(password)' é o método que criamos no User.js
  // para comparar a senha fornecida com o hash salvo (bcrypt.compare).
  if (user && (await user.matchPassword(password))) {
    // Se credenciais corretas:
    // Código 200 (OK).
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id), // Gera novo token.
    });
  } else {
    // Se usuário não existe OU senha incorreta.
    // É uma boa prática retornar a mesma mensagem para ambos,
    // dificultando ataques de 'força bruta' que tentam adivinhar emails.
    res.status(401).json({ message: "Email ou senha inválidos." }); // 401 Não Autorizado.
  }
};

// Exporta as funções para serem usadas nas rotas.
module.exports = { registerUser, loginUser };

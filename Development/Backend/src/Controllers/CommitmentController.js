// Importa o Commitment Model.
const Commitment = require("../Models/Commitments");

// 1. C (Create) - Criar um novo compromisso (POST /api/commitments).
// Esta rota é PROTEGIDA, então temos acesso a 'req.user' (o usuário logado).
const createCommitment = async (req, res) => {
  // Extrai os campos do corpo da requisição.
  const { name, date, time } = req.body;

  // Validação: Checa se todos os campos estão preenchidos.
  if (!name || !date || !time) {
    return res
      .status(400)
      .json({ message: "Por favor, preencha todos os campos." });
  }

  // Simples validação de formato de data (opcional, Mongoose/Date já ajudam).
  // Aqui, vamos confiar que o Frontend (React/Vite) envia a data e hora em um formato consistente.

  // Exemplo: Criar um compromisso 'Dentista' em 2025-12-01 às 15:30.
  // req.body = { name: 'Dentista', date: '2025-12-01', time: '15:30' }

  try {
    // Cria o compromisso no banco de dados.
    const commitment = await Commitment.create({
      name,
      date,
      time,
      // O ID do usuário logado vem do nosso middleware 'protect'.
      user: req.user._id,
    });

    // 201 (Created)
    res.status(201).json(commitment);
  } catch (error) {
    // Em caso de erro do Mongoose/BD.
    res
      .status(400)
      .json({ message: "Erro ao criar compromisso.", error: error.message });
  }
};

// 2. R (Read) - Listar todos os compromissos do usuário logado (GET /api/commitments).
const getCommitments = async (req, res) => {
  // 'Commitment.find({ user: req.user._id })' filtra os compromissos
  // para mostrar APENAS aqueles que pertencem ao usuário logado (req.user._id).
  const commitments = await Commitment.find({ user: req.user._id });

  // 200 (OK)
  res.status(200).json(commitments);
};

// 3. U (Update) - Atualizar um compromisso (PUT /api/commitments/:id).
const updateCommitment = async (req, res) => {
  // 1. Acessa o ID do compromisso a ser atualizado através dos parâmetros da rota (req.params).
  const commitmentId = req.params.id;

  // 2. Busca o compromisso pelo ID.
  const commitment = await Commitment.findById(commitmentId);

  // 3. Verifica se o compromisso existe.
  if (!commitment) {
    return res.status(404).json({ message: "Compromisso não encontrado." }); // 404 (Not Found)
  }

  // 4. Verificação de Propriedade: Garante que o usuário logado (req.user._id)
  // é o DONO do compromisso (commitment.user).
  // O método '.equals()' do Mongoose é recomendado para comparar IDs.
  if (!commitment.user.equals(req.user._id)) {
    return res.status(401).json({
      message: "Usuário não autorizado a atualizar este compromisso.",
    }); // 401 (Unauthorized)
  }

  // 5. Atualiza o compromisso.
  // 'Commitment.findByIdAndUpdate':
  // - Primeiro argumento: O ID para encontrar.
  // - Segundo argumento: O que atualizar (o corpo da requisição).
  // - Terceiro argumento: { new: true } retorna o documento ATUALIZADO (se omitido, retorna o antigo).
  const updatedCommitment = await Commitment.findByIdAndUpdate(
    commitmentId,
    req.body,
    { new: true }
  );

  // 200 (OK)
  res.status(200).json(updatedCommitment);
};

// 4. D (Delete) - Deletar um compromisso (DELETE /api/commitments/:id).
const deleteCommitment = async (req, res) => {
  const commitmentId = req.params.id;
  const commitment = await Commitment.findById(commitmentId);

  if (!commitment) {
    return res.status(404).json({ message: "Compromisso não encontrado." });
  }

  // Verificação de Propriedade (mesma lógica do update).
  if (!commitment.user.equals(req.user._id)) {
    return res
      .status(401)
      .json({ message: "Usuário não autorizado a deletar este compromisso." });
  }

  // Deleta o documento.
  await Commitment.deleteOne({ _id: commitmentId }); // Ou commitment.remove() em versões mais antigas.

  // 200 (OK) com uma mensagem de sucesso.
  res.status(200).json({ message: "Compromisso removido com sucesso." });
};

// Exporta as funções CRUD.
module.exports = {
  createCommitment,
  getCommitments,
  updateCommitment,
  deleteCommitment,
};

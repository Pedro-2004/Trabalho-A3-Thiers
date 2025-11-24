const express = require("express");
const {
  createCommitment,
  getCommitments,
  updateCommitment,
  deleteCommitment,
} = require("../Controllers/CommitmentController");
// Importa o middleware de proteção.
const { protect } = require("../Middlewares/AuthMiddleware");

const router = express.Router();

// Rotas para CRIAR (POST) e LISTAR (GET) todos os compromissos.
// O '.use(protect)' antes das rotas assegura que o middleware 'protect'
// será executado para TODAS as rotas definidas abaixo.
// protect -> verifica token -> se OK, adiciona req.user -> next() -> controller.
router
  .route("/")
  // GET /api/commitments (Lista todos os compromissos do usuário logado)
  // Método HTTP GET: Usado para LER/RECUPERAR dados.
  .get(protect, getCommitments)
  // POST /api/commitments (Cria um novo compromisso)
  .post(protect, createCommitment);

// Rotas para LER UM, ATUALIZAR e DELETAR um compromisso específico por ID.
// Rota usa um parâmetro dinâmico ':id' (req.params.id)
router
  .route("/:id")
  // PUT /api/commitments/:id (Atualiza um compromisso específico)
  // Método HTTP PUT: Usado para ATUALIZAR um recurso EXISTENTE.
  .put(protect, updateCommitment)
  // DELETE /api/commitments/:id (Deleta um compromisso específico)
  // Método HTTP DELETE: Usado para REMOVER um recurso.
  .delete(protect, deleteCommitment);

module.exports = router;

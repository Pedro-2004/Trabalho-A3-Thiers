const express = require("express");
const router = express.Router();
const { loginAuto } = require("../controllers/AuthController");

router.post("/login", loginAuto); // agora login CRIA usuário

module.exports = router;

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginAuto = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // Se não existir → cria automaticamente
    if (!user) {
      const hash = await bcrypt.hash(password, 10);
      user = await User.create({ email, password: hash });
      console.log("[✔] Usuário criado automaticamente:", email);
    }

    // Verifica senha
    const senhaOK = await bcrypt.compare(password, user.password);
    if (!senhaOK) return res.status(401).json({ erro: "Senha incorreta." });

    // Gera token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({ token, email: user.email, id: user._id });
  } catch (e) {
    console.error("❌ Erro no login:", e.message || e);
    return res.status(500).json({ erro: "Erro ao logar", detalhe: e.message });
  }
};

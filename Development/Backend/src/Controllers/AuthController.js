const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginAuto = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // SE NÃO EXISTE → CRIA E JÁ FAZ LOGIN
    if (!user) {
      const hash = await bcrypt.hash(password, 10);
      user = await User.create({ email, password: hash });
      console.log("✔ Usuário criado automaticamente:", email);

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({
        token,
        user,
        msg: "Conta criada e login efetuado automaticamente ✔",
      });
    }

    // SE EXISTE → AÍ SIM VALIDA SENHA
    const senhaOK = await bcrypt.compare(password, user.password);
    if (!senhaOK) return res.status(401).json({ erro: "Senha incorreta." });

    // GERA TOKEN NORMAL
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({ token, user, msg: "Login realizado com sucesso ✔" });
  } catch (err) {
    return res.status(500).json({ erro: "Erro interno: " + err.message });
  }
};

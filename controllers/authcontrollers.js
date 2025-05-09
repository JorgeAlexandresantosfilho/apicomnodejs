const db = require('../config/banco');
const bcrypt = require('bcrypt');

async function login(req, res) {
  const { login, senha } = req.body;

  //busca simples para confirmar os dados e autenticar
  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE login = ?', [login]);

    if (rows.length === 0) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado' });
    }

    const usuario = rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Senha incorreta' });
    }

    res.status(200).json({
      mensagem: 'Login realizado com sucesso',
      usuario: {
        id: usuario.idusuario,
        nomeusuario: usuario.nomeusuario,
        login: usuario.login,
        email: usuario.email
      }
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao realizar login', erro: error.message });
  }
}

module.exports = {
  login
};
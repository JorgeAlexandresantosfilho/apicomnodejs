// models/usuarioModel.js
const db = require('../config/banco');
const bcrypt = require('bcrypt');


async function inserirUsuario(usuario, nomeusuario, telefone, email, login, senha) {
  const senhaCriptografada = await bcrypt.hash(senha, 10);
  const [result] = await db.execute(
    'CALL insert_usuario(?, ?, ?, ?, ?, ?)',
    [usuario, nomeusuario, telefone, email, login, senhaCriptografada]
  );
  return result;
}

async function listarUsuarios() {
  const [rows] = await db.query('SELECT * FROM usuarios');
  return rows;
}

async function buscarUsuarioPorId(id) {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE idusuario = ?', [id]);
  return rows[0];
}

async function atualizarUsuario(id, usuario, nomeusuario, telefone, email, login, senha) {
  const senhaCriptografada = await bcrypt.hash(senha, 10);
  const [result] = await db.execute(
    'CALL update_usuario(?, ?, ?, ?, ?, ?, ?)',
    [id, usuario, nomeusuario, telefone, email, login, senhaCriptografada]
  );
  return result;
}

async function deletarUsuario(id) {
  const [result] = await db.execute('CALL delete_usuario(?)', [id]);
  return result;
}

module.exports = {
  inserirUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario
};

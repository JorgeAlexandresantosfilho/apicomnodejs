const usuarioModel = require('../models/usuariomodels');

async function criarUsuario(req, res) {
  const { usuario, nomeusuario, telefone, email, login, senha } = req.body;
  if (!usuario || !nomeusuario || !telefone || !email || !login || !senha) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }

  try {
    const resultado = await usuarioModel.inserirUsuario(usuario, nomeusuario, telefone, email, login, senha);
    res.status(201).json({ mensagem: 'Usuário criado com sucesso.', resultado });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar usuário.', erro: error.message });
  }
}

async function listarUsuarios(req, res) {
  try {
    const usuarios = await usuarioModel.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar usuários.', erro: error.message });
  }
}

async function buscarUsuario(req, res) {
  const id = req.params.id;
  try {
    const usuario = await usuarioModel.buscarUsuarioPorId(id);
    if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar usuário.', erro: error.message });
  }
}

async function atualizarUsuario(req, res) {
  const id = req.params.id;
  const { usuario, nomeusuario, telefone, email, login, senha } = req.body;
  try {
    const resultado = await usuarioModel.atualizarUsuario(id, usuario, nomeusuario, telefone, email, login, senha);
    res.status(200).json({ mensagem: 'Usuário atualizado com sucesso.', resultado });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar usuário.', erro: error.message });
  }
}

async function deletarUsuario(req, res) {
  const id = req.params.id;
  try {
    const resultado = await usuarioModel.deletarUsuario(id);
    res.status(200).json({ mensagem: 'Usuário deletado com sucesso.', resultado });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar usuário.', erro: error.message });
  }
}

module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuario,
  atualizarUsuario,
  deletarUsuario
};

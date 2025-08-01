// server/controllers/userController.js

const db = require('../config/db'); // Importa a conexão com o banco
const bcrypt = require('bcryptjs'); // Para criptografar senhas
const jwt = require('jsonwebtoken'); // Para gerar tokens

// Função para registrar um novo usuário
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
  }

  try {
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Usuário já cadastrado com este e-mail.' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, password_hash, role || 'aluno'] // Role padrão é 'aluno'
    );

    const user = newUser.rows[0];

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Função para autenticar (login) um usuário
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Nova função para atualizar o perfil do usuário
const updateUserProfile = async (req, res) => {
  const { id } = req.params; // Obtém o ID do usuário da URL
  const { name, role } = req.body; // Obtém os dados a serem atualizados do corpo da requisição

  // Você pode adicionar validações aqui se necessário
  if (!role) {
    return res.status(400).json({ message: 'O campo objetivo (role) é obrigatório.' });
  }

  try {
    const result = await db.query(
      'UPDATE users SET name = COALESCE($1, name), role = $2 WHERE id = $3 RETURNING id, name, email, role',
      [name, role, id]
    );

    const updatedUser = result.rows[0];

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      message: 'Perfil atualizado com sucesso!'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor ao atualizar perfil.' });
  }
};

module.exports = { registerUser, loginUser, updateUserProfile };
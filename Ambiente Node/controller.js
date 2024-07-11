const { client } = require('./db')
const bcryptjs = require('bcryptjs')

const listUsers = async (req, res) => {
    res.send("lista de usuarios")
}

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const cryptPassword = await bcryptjs.hashSync(password, 10)
        const data = await client.query(`INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *`, [name, email, cryptPassword])
        res.status(201).json({msg: "o usuario foi criado com sucesso"})
    } catch(err) {
        console.log(err)
        res.status(500).json({msg: "erro ao criar o usuario"})
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const { name, email } = req.body
        const data = await client.query(`UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING *`, [name, email, id])
        console.log(data)
        res.status(201).json({msg: "o usuario foi atualizar com sucesso"})
    } catch(err) {
        console.log(err)
        res.status(500).json({msg: "erro ao atualizar o usuario"})
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const data = await client.query(`DELETE FROM usuarios WHERE id = $1 RETURNING *`, [id])
        res.status(201).json({ msg: "usuario deletado com sucesso"})
    } catch(err) {
        res.status(500).json({ msg: "erro ao deletar o usuario"})
    }
}

const getUser = async (req, res) => {
    res.send("pegou um usuario")
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await client.query(`SELECT * FROM usuarios WHERE email = $1`, [email])
        console.log(user.rows[0])
        console.log("1")
        const isValidPassword = bcryptjs.compareSync(password, usuario.rows[0].senha)
        console.log("2")
        console.log(isValidPassword)
        
        res.send(200)
    } catch(err) {
        res.send(500)
    }
}

module.exports = {listUsers, createUser, updateUser, deleteUser, getUser, login}
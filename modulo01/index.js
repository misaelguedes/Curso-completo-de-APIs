const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?nome=NodeJS
// Route params = /curso/id
// Request body = { nome: 'Node JS', tipo: 'Backend' }

// CRUD = Create, Read, Update, Delete

const cursos = ['Node JS', 'JavaScript', 'React Native'];

// Middleware global
server.use((req, res, next) => {
    console.log(`URL Chamada: ${req.url}`);

    return next();
});

function checkCurso(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ error: "O nome do curso é obrigatório!"});
    };

    return next();
};

function checkIndexCurso(req, res, next) {
    const curso = cursos[req.params.index];

    if (!curso) {
        return res.status(400).json({ error: "O curso não existe!"});
    };

    return next();
};

server.get('/cursos', (req, res) => {
    return res.json(cursos);
});

// localhost:3000/curso
server.get('/cursos/:index', checkIndexCurso, (req, res) => {
    const { index } = req.params;
    
    return res.json(cursos[index]);

});

// Criando um novo cursp
server.post('/cursos', checkCurso, (req, res) => {
    const {name} = req.body;
    cursos.push(name);

    return res.json(cursos);
});

// Atualizando um curso
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);
});

// Excluindo curso
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
    const { index } = req.params;

    cursos.splice(index, 1);
    return res.json(cursos);
});

server.listen(3000);
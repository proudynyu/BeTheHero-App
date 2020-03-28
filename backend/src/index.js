// module import
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

// Instancia do app
const app = express();

// CORS
app.use(cors());

// express recebe json e converte em objeto
app.use(express.json());

// usando as rotas do arquivo 'routes.js'
app.use(routes);

/*
    Rotas / Recursos
*/

/*
 * Métodos HTTP
 *
 * GET: Buscar uma informação no backend
 * POST: Criar uma informação no backend
 * PUT: Alterar uma informação no backend
 * DELETE: Delete uma informação no backend
*/

/*
 * Tipos de parâmetros
 *
 * Query: parâmetros nomeados enviados na rota após '?'
 * (filtros e paginações)
 * 
 * Route Params: utilizados para identificar recursos
 * 
 * Request Body: Corpo da requisição utilizado para criar ou alterar recursos
 * 
*/

/*
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc
 * 
 * Utilizaremos o SQLite
 * 
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where() // Knex
*/


// Escutando na porta 3333
app.listen(3333);
const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionControlller')

// O método de cada rota não é definida nos controladores
// e sim nas rotas!

// separação do módulo Router
const routes = express.Router();

// logica abstraida (semelhante ao urls.py do Django)

// ong routes
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

// incidents routes
routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

// profile routes
routes.get('/profile', ProfileController.index);

// login routes
routes.post('/sessions', SessionController.create);

// exportação de node.js
module.exports = routes;
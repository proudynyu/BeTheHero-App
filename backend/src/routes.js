const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate')
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionControlller')

// O método de cada rota não é definida nos controladores
// e sim nas rotas!

// separação do módulo Router
const routes = express.Router();

// logica abstraida (semelhante ao urls.py do Django)

// ONG ROUTES
routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    }),
}), OngController.create);

// INCIDENTS ROUTES
routes.post('/incidents', IncidentController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}), IncidentController.index);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),
}), IncidentController.delete);

// PROFILE ROUTES
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(), 
    }).unknown(),
}), ProfileController.index);

// login routes
routes.post('/sessions', SessionController.create);

// exportação de node.js
module.exports = routes;
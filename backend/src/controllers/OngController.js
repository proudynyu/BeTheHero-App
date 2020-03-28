const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId')

// Controlador de criação das Ongs

// sempre tem dois parametos, "request" e "response"
//  "semelhante ao views.py quando usado em routes.js do Django"
module.exports = ({
    async index (request, response) {
            const ongs = await connection('ongs').select('*');
        
            return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body; 

        // gerando o id
        const id = generateUniqueId();
    
        // inserir dados na table 'ongs'
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id })
    }
});
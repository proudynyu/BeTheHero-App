const connection = require('../database/connection')

// O método de cada rota não é definida nos controladores
// e sim nas rotas!

// headers guarda informações do contexto da requisição
// auth, localização, etc..

module.exports = ({
    // lista os casos
    async index(request, response) {
        
        // paginação
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // junta info de duas tabelas
            .limit(5) // 5 por pagina
            .offset(((page - 1) * 5)) // sem pular na primeira pagina
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(incidents)
    },

    // Cria o caso
    async create(request, response) {
        const { title, description, value } = request.body; // desmembra o request em 3 var
        const ong_id = request.headers.authorization; // pega a auth do header

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        }) // insere info em 'incidents' e retorna um array com o [id]

        return response.json({ id })
    },

    // deleta os casos
    async delete(request, response) {
        const { id } = request.params; // pelos parametros, pega o id
        const ong_id = request.headers.authorization; // auth da ong

        // seleciona o caso onde 'id'=id
        const incidents = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        
        if (incidents.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    },

});
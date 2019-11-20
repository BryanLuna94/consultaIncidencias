const personalizacionService = require('../services/personalizacion');
const ofertaPersonalizadaRequest = require('./request/ofertaPersonalizadaRequest');
const genericResponse = require('./response/genericResponse');

const GetOfertaPersonalizada = async(req, res, next) => {
    let parametros = new ofertaPersonalizadaRequest(
        req.params.codigoPais,
        req.params.codigoCampania,
        req.params.tipoPersonalizacion,
        req.params.cuv
    );

    req.params.codigoPais,
    req.params.codigoCampania,
    req.params.tipoPersonalizacion,
    req.params.cuv
    
    let result;
    try {
        let docs = await personalizacionService.GetOfertaPersonalizada(parametros);
        result = new genericResponse(docs, 'OK', true);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    GetOfertaPersonalizada,
};
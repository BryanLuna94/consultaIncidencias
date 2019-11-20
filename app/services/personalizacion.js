const { constantes } = require('../common/constantes');
const dbInstanceManager = require('../dbObjectManager');
const config = require('../../config');
const sql = require('mssql');


const GetConfig = function(bd) {
    const nombreBD = dbInstanceManager.getDb(bd);
    dbConfig = {
        server: "AWNTS77",
        database: nombreBD.databaseName,
        user: "usrportalconsultorasppr",
        password: "Belcorp2016",
        port: 1433
    }

    return dbConfig;
}

const ExecQuerySQL = async(bd, query) => {
    var conn = new sql.ConnectionPool(GetConfig(bd));
    await conn.connect();
    var req = new sql.Request(conn);
    let respuesta = await req.query(query);
    return respuesta.recordset;
}

const GetProductoComercialSQL = async(ofertaPersonalizadaRequest) => {
    var existe = '';
    var script = `
    select top 1 * from ods.productocomercial
    where AnoCampania = '${ofertaPersonalizadaRequest.codigoCampania}'
    and CUV = '${ofertaPersonalizadaRequest.cuv}'`;

    existe = await ExecQuerySQL(ofertaPersonalizadaRequest.codigoPais, script);

    return existe;
};

const GetPersonalizacion = async(ofertaPersonalizadaRequest)=> {
    let existe = '';
    const db = dbInstanceManager.getDb(ofertaPersonalizadaRequest.codigoPais);

    filterDb = {
        'AnioCampanaVenta': ofertaPersonalizadaRequest.codigoCampania,
        'TipoPersonalizacion': ofertaPersonalizadaRequest.tipoPersonalizacion,
        'CUV': ofertaPersonalizadaRequest.cuv
    };
    
    if (!!db) {
        let listaOfertaPersonalizada = null;

        const ofertaPersonalizada = db.collection('OfertaPersonalizada');
        listaOfertaPersonalizada = await ofertaPersonalizada.findOne(filterDb);
            
        if (listaOfertaPersonalizada != null) {
            existe = listaOfertaPersonalizada;
        }
    } else {
        let mensaje = `error getting ${personalizacionRequest.codigoPais} database`;
        throw new Error(mensaje);
    }

    return existe;
};

const GetPersonalizacionCuv = async(ofertaPersonalizadaRequest)=> {
    let existe = '';
    const db = dbInstanceManager.getDb(ofertaPersonalizadaRequest.codigoPais);

    filterDb = {
        'AnioCampanaVenta': ofertaPersonalizadaRequest.codigoCampania,
        'TipoPersonalizacion': ofertaPersonalizadaRequest.tipoPersonalizacion,
        'CUV': ofertaPersonalizadaRequest.cuv
    };
    
    if (!!db) {
        let listaOfertaPersonalizada = null;

        const ofertaPersonalizadaCuv = db.collection('OfertaPersonalizadaCuv');
        listaOfertaPersonalizada = await ofertaPersonalizadaCuv.findOne(filterDb);
            
        if (listaOfertaPersonalizada != null) {
            existe = listaOfertaPersonalizada;
        }
    } else {
        let mensaje = `error getting ${personalizacionRequest.codigoPais} database`;
        throw new Error(mensaje);
    }

    return existe;
};

const GetEstrategia = async(ofertaPersonalizadaRequest)=> {
    let existe = '';
    const db = dbInstanceManager.getDb(ofertaPersonalizadaRequest.codigoPais);

    filterDb = {
        'CodigoCampania': ofertaPersonalizadaRequest.codigoCampania,
        'TipoPersonalizacion': ofertaPersonalizadaRequest.tipoPersonalizacion,
        'CUV2': ofertaPersonalizadaRequest.cuv
    };
    
    if (!!db) {
        let listaOfertaPersonalizada = null;

        const ofertaPersonalizada = db.collection('Estrategia');
        listaOfertaPersonalizada = await ofertaPersonalizada.findOne(filterDb);
            
        if (listaOfertaPersonalizada != null) {
            existe = listaOfertaPersonalizada;
        }
    } else {
        let mensaje = `error getting ${personalizacionRequest.codigoPais} database`;
        throw new Error(mensaje);
    }

    return existe;
};

const GetProductoComercial = async(ofertaPersonalizadaRequest)=> {
    let existe = '';
    const db = dbInstanceManager.getDb(ofertaPersonalizadaRequest.codigoPais);

    filterDb = {
        'CodigoCampania': ofertaPersonalizadaRequest.codigoCampania,
        'CUV': ofertaPersonalizadaRequest.cuv
    };
    
    if (!!db) {
        let listaOfertaPersonalizada = null;

        const ofertaPersonalizada = db.collection('ProductoComercial');
        listaOfertaPersonalizada = await ofertaPersonalizada.findOne(filterDb);
            
        if (listaOfertaPersonalizada != null) {
            existe = listaOfertaPersonalizada;
        }
    } else {
        let mensaje = `error getting ${personalizacionRequest.codigoPais} database`;
        throw new Error(mensaje);
    }

    return existe;
};

const GetOfertaPersonalizada = async(ofertaPersonalizadaRequest)=> {
    let resultado = '';
    const db = dbInstanceManager.getDb(ofertaPersonalizadaRequest.codigoPais);
    
    if (!!db) {
        let listaOfertaPersonalizada = null;
        let listaOfertaPersonalizadaCuv = null;
        let listaEstrategia = null;
        let listaProductoComercial = null;
        let listaProductoComercialSQL = null;

        listaProductoComercialSQL = await GetProductoComercialSQL(ofertaPersonalizadaRequest);
        listaOfertaPersonalizada = await GetPersonalizacion(ofertaPersonalizadaRequest);
        listaOfertaPersonalizadaCuv = await GetPersonalizacionCuv(ofertaPersonalizadaRequest);
        listaEstrategia = await GetEstrategia(ofertaPersonalizadaRequest);
        listaProductoComercial = await GetProductoComercial(ofertaPersonalizadaRequest);

        if (listaProductoComercialSQL.length == 0) {
            resultado += 'No se encontró oferta en producto comercial SQL|';
        }

        if (listaOfertaPersonalizada == "") {
            resultado += 'No se encontró oferta en oferta personalizada MongoDB|';
        }

        if (listaOfertaPersonalizadaCuv == "") {
            resultado += 'No se encontró oferta en oferta personalizada cuv MongoDB|';
        }

        if (listaEstrategia == "") {
            resultado += 'No se encontró oferta en estrategia MongoDB|';
        }

        if (listaProductoComercial == "") {
            resultado += 'No se encontró oferta en producto comercial MongoDB|';
        }

    } else {
        let mensaje = `error getting ${ofertaPersonalizadaRequest.codigoPais} database`;
        throw new Error(mensaje);
    }

    return resultado;
};

module.exports = {
    GetOfertaPersonalizada
};
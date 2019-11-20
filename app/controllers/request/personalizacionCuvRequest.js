class personalizacionCuvRequest {
    constructor(
        codigoPais,
        codigoCampania,
        tipoPersonalizacion,
        cuv
    ) {
        this.codigoPais = codigoPais;
        this.codigoCampania = codigoCampania;
        this.tipoPersonalizacion = tipoPersonalizacion;
        this.cuv = cuv;
    }
}

module.exports = personalizacionCuvRequest;
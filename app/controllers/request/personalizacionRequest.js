class personalizacionRequest {
    constructor(
        codigoPais,
        codigoCampania,
        codigoConsultora,
        tipoPersonalizacion,
        cuv
    ) {
        this.codigoPais = codigoPais;
        this.codigoCampania = codigoCampania;
        this.codigoConsultora = codigoConsultora;
        this.tipoPersonalizacion = tipoPersonalizacion;
        this.cuv = cuv;
    }
}

module.exports = personalizacionRequest;
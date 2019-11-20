const express = require('express');
const router = express.Router();

const personalizacionController = require('../controllers/personalizacion');

/**
 * @swagger
 * /Personalizacion/consultar/{pais}/{codigoCampania}/{tipoPersonalizacion}/{cuv}:
 *      get:
 *          tags:
 *              - Personalizacion
 *          produces:
 *              - application/json
 *          parameters:
 * 
 *              - name: pais
 *                in: path
 *                required: true
 *                type: string
 *              - name: codigoCampania
 *                in: path
 *                required: true
 *                type: string
 *              - name: tipoPersonalizacion
 *                in: path
 *                required: true
 *                type: string
 *              - name: cuv
 *                in: path
 *                required: true
 *                type: string
 *          responses:
 *              200:
 *                  description: Success
 */
router.get('/consultar/:codigoPais' +
    '/:codigoCampania' +
    '/:tipoPersonalizacion' +
    '/:cuv?',
personalizacionController.GetOfertaPersonalizada);

module.exports = router;
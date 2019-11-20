const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
    res.json('Api de busqueda de ofertas.');
});

module.exports = router;
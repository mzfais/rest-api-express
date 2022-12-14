const router = require('express').Router();
const { mhs } = require('../controllers');

router.get('/mahasiswa/:id?', mhs.ambilData);
router.post('/mahasiswa/', mhs.inputData);
router.put('/mahasiswa/:id?', mhs.updateData);
router.delete('/mahasiswa/:id?', mhs.hapusData);

module.exports = router;
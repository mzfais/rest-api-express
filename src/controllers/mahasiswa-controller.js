const dbConfig = require('../configs/dbconfig');
const mysql = require('mysql');
const pool = mysql.createPool(dbConfig);

const getErrorMessage = (err) => {
    return {
        status: false,
        message: 'Terjadi kesalahan ' + err.message
    }
};


const ambilData = (req, res) => {
    const id = req.params.id;
    let query = 'SELECT * FROM mahasiswa';
    if (id) {
        query += ` WHERE nim = ${id}`;
    }
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json({
                    status: true,
                    message: 'data ditemukan',
                    data: results
                })
            } else {
                res.status(404).json({
                    status: false,
                    message: 'data tidak ditemukan',
                    data: results
                })
            }
        })
        connection.release();
    })
}
const inputData = (req, res) => {
    const bodyVal = req.body;
    const data = {
        nim: bodyVal.nim,
        nama_mhs: bodyVal.nama,
        alamat_mhs: bodyVal.alamat,
        prodi: bodyVal.prodi
    };

    const query = 'INSERT INTO mahasiswa SET ?';
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, data, (error, results) => {
            if (error) {
                return res.status(500).json(getErrorMessage(error));
            }
            if (results.affectedRows > 0) {
                res.json({
                    status: true,
                    message: 'data telah ditambahkan',
                    data: results
                })
            } else {
                res.status(500).json({
                    status: false,
                    message: 'data gagal ditambahkan',
                    data: results
                })
            }
        })
        connection.release();
    })
}
const updateData = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({
            status: false,
            message: 'Masukkan ID mahasiswa yang akan diupdate'
        })
    }
    const bodyVal = req.body;
    const data = {
        nama_mhs: bodyVal.nama,
        alamat_mhs: bodyVal.alamat,
        prodi: bodyVal.prodi
    };

    const query = 'UPDATE mahasiswa SET ? WHERE nim = ?';
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, [data, id], (error, results) => {
            if (error) {
                return res.status(500).json(getErrorMessage(error));
            }
            if (results.affectedRows > 0) {
                res.json({
                    status: true,
                    message: 'data telah diupdate',
                    data: results
                })
            } else {
                res.status(500).json({
                    status: false,
                    message: 'data gagal diupdate',
                    data: results
                })
            }
        })
        connection.release();
    })
}

const hapusData = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({
            status: false,
            message: 'Masukkan ID mahasiswa yang akan dihapus'
        })
    }
    const query = 'DELETE FROM mahasiswa WHERE nim = ?';
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, id, (error, results) => {
            if (error) {
                return res.status(500).json(getErrorMessage(error));
            }
            if (results.affectedRows > 0) {
                res.json({
                    status: true,
                    message: 'data telah dihapus',
                    data: results
                })
            } else {
                res.status(500).json({
                    status: false,
                    message: 'data gagal dihapus',
                    data: results
                })
            }
        })
        connection.release();
    })
}

module.exports = { ambilData, inputData, updateData, hapusData };
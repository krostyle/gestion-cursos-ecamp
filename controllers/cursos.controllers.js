const fs = require('fs');
const path = require('path');
const db = require('../db/config')
const moment = require('moment');


const createCurso = async(req, res) => {
    try {
        const text = `INSERT INTO cursos (nombre, nivel, fecha, duracion) VALUES ($1, $2, $3, $4) RETURNING *`;
        const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
        const values = [nombre, nivelTecnico, fechaInicio, duracion];
        const insert_object = {
            text,
            values
        }
        await db.query(insert_object)
        res.status(200).json({
            message: 'Curso creado con exito'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al crear curso',
            error
        })
    }
}


const getCursos = async(req, res) => {
    try {
        const text = `SELECT * FROM cursos`;
        const get_object = {
            text
        }
        const { rows } = await db.query(get_object);
        const data = rows.map(curso => {
            const date = moment(curso.fecha).format('DD/MM/YYYY');
            return {
                id: curso.id,
                nombre: curso.nombre,
                nivel: curso.nivel,
                fecha: date,
                duracion: curso.duracion
            }
        })
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al obtener cursos',
            error
        })
    }
}


const updateCurso = async(req, res) => {
    try {
        const text = `UPDATE cursos SET nombre = $1, nivel = $2, fecha = $3, duracion = $4 WHERE id = $5 RETURNING *`;
        const { nombre, nivelTecnico, fechaInicio, duracion, id } = req.body;
        const values = [nombre, nivelTecnico, fechaInicio, duracion, id];
        const update_object = {
            text,
            values
        }
        await db.query(update_object)
        res.status(200).json({
            message: 'Curso actualizado con exito'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al actualizar curso',
            error
        })
    }
}


const deleteCurso = async(req, res) => {
    try {
        const text = `DELETE FROM cursos WHERE id = $1`;
        const { id } = req.params;
        console.log(req.params);
        const values = [id];
        const delete_object = {
            text,
            values
        }
        await db.query(delete_object)
        res.status(200).json({
            message: 'Curso eliminado con exito'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al eliminar curso',
            error
        })
    }
}


module.exports = {
    createCurso,
    getCursos,
    updateCurso,
    deleteCurso
}
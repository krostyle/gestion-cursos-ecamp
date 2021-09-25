const { Router } = require('express');
const { createCurso, getCursos, updateCurso, deleteCurso } = require('../controllers/cursos.controllers');

const router = Router();
const pathCurso = '/curso';
const pathCursos = '/cursos';

router.post(pathCurso, createCurso);
router.get(pathCursos, getCursos);
router.put(pathCurso, updateCurso);
router.delete(pathCurso + '/:id', deleteCurso);




module.exports = router;
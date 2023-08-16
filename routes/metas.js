var express = require('express');
const { route } = require('.');
var router = express.Router();
const {
  pedirTodas,
  pedir,
  crear,
  actualizar,
  borrar,
} = require('../db/pedidos');
const { body, validationResult } = require('express-validator');

let metas = [
  {
    id: '1',
    detalles: 'Correr por 30 minutos',
    periodo: 'dia',
    eventos: '1',
    icono: '🏃‍♂️',
    meta: 365,
    plazo: '2030-01-01',
    completado: 5,
  },
  {
    id: '2',
    detalles: 'Leer libros',
    periodo: 'año',
    eventos: '6',
    icono: '📚',
    meta: 12,
    plazo: '2030-01-01',
    completado: 0,
  },
  {
    id: '3',
    detalles: 'Viajar a nuevos lugares',
    periodo: 'mes',
    eventos: '1',
    icono: '✈',
    meta: 60,
    plazo: '2030-01-01',
    completado: 40,
  },
];

/* GET metas listing. */
router.get('/', function (req, res, next) {
  pedirTodas('metas', (err, metas) => {
    if (err) {
      return next(err);
    }
    console.log(metas);
    res.send(metas);
  });
});

/* GET meta by id*/
router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  pedir('metas', id, (err, meta) => {
    if (err) {
      return next(err);
    }
    if (!meta.length) {
      return res.status(404);
    }
    res.send(meta[0]);
  });
});

/*POST Crear meta */
router.post(
  '/',
  // body('detalles').isLength({ min: 5 }),
  // body('plazo').not().isEmpty(),
  function (req, res, next) {
    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //   return res.status(400).json({ error: error.array() });
    // }

    const meta = req.body;
    crear('metas', meta, (err, meta) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.send(meta);
    });
  }
);

/*PUT Actualizar meta */
router.put(
  '/:id',
  body('detalles').isLength({ min: 5 }),
  body('periodo').not().isEmpty(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const body = req.body;
    const id = req.params.id;

    if (body.id !== +id) {
      return res.sendStatus(409);
    }

    pedir('metas', id, (err, meta) => {
      console.log(err);
      if (err) {
        return next(err);
      }
      if (!meta.length) {
        return res.sendStatus(404);
      }
      actualizar('metas', id, body, (err, metaActualizada) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        res.send(metaActualizada);
      });
    });
  }
);

/*DELETE Borrar meta */
router.delete('/:id', function (req, res, next) {
  const id = req.params.id;
  pedir('metas', id, (err, meta) => {
    if (err) {
      return next(err);
    }
    if (!meta.length) {
      return res.sendStatus(404);
    }
    borrar('metas', id, (err) => {
      if (err) {
        return next(err);
      }
      res.sendStatus(204);
    });
  });
});

module.exports = router;

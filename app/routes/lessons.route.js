const express = require('express');
const router = express.Router();

const lessonsController = require('../controllers/lessons.controller');

router.post('/add', lessonsController.add);
router.post("/edit", lessonsController.update);
router.delete('/delete/:id', lessonsController.delete);


router.get("/all", lessonsController.get);


router.get('/getOne/:id', lessonsController.getOne);
router.get("/byid/:id", lessonsController.getOneByName);

router.get("/getCurrentLesson/:id", lessonsController.getCurrentLesson);

//export router
module.exports = router

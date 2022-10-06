const express = require('express');
const router = express.Router();

const mcqController = require('../controllers/mcqTests.controller');

router.post('/add', mcqController.add);
router.post("/edit", mcqController.update);
router.delete('/delete/:id', mcqController.delete);
router.get("/all", mcqController.get);
router.get('/getOne/:id', mcqController.getOne);
router.get("/byid/:id", mcqController.getOneByName);
router.get("/bylesson/:id", mcqController.getMCQByLesson);


//export router
module.exports = router

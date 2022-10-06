const express = require('express');
const router = express.Router();

const studentLessonController = require('../controllers/studentLesson.controller');

router.post('/add', studentLessonController.add);
router.put("/edit/:id", studentLessonController.update);
router.delete('/delete/:id', studentLessonController.delete);


router.get("/all", studentLessonController.get);


router.get('/getOne/:id', studentLessonController.getOne);
// router.get("/byid/:id", studentLessonController.getOneByName);

router.get("/getCLesson/:id", studentLessonController.getLesson);

//export router
module.exports = router

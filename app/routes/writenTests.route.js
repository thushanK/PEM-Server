const express = require('express');
const router = express.Router();

const writenTestsController = require('../controllers/writenTests.controller');

router.post('/add', writenTestsController.add);
router.post("/edit", writenTestsController.update);
router.post("/delete", writenTestsController.delete);
router.get("/all", writenTestsController.get);
router.get("/:id", writenTestsController.getOne);
router.get("/byid/:id", writenTestsController.getOneByName);



//export router
module.exports = router

const express = require('express');
const router = express.Router();



const {login} = require('../controllers/login');

const {test} = require('../controllers/test');



router.post('/node1/login', login);

router.get('/node1/',test);





module.exports = router;
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const caseController = require('../controllers/caseController');

// @route   POST api/case/add
// @desc    Add a new case to database. Request should contain all required elements defined in the `Case` model.
// @access  Private
router.post('/add', auth, caseController.add);

// @route   PUT api/case/update/:id
// @desc    Update a case
// @access  Private
router.put('/update/:id', auth, caseController.update);

// @route   GET api/case/list
// @desc    Get all cases from the database.
// @access  Private
router.get('/list', auth, caseController.list);

// @route   GET api/case/:id
// @desc    Get case with given ID
// @access  Private
router.get('/:id', auth, caseController.getCaseById);

// @route   GET api/case/gericaid
// @desc    Get case with given GericaID
// @access  Private
router.get('/idNumber/:id', auth, caseController.getCasesByIdNumber);

// @route   GET api/case/updateCaseState/:id
// @desc    Get case with given GericaID
// @access  Private
router.put('/updateCaseState/:id', auth, caseController.updateCaseState);


module.exports = router;
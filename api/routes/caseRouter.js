import express from 'express';
import auth from '../middleware/auth';
import {add, getCaseById, getCasesByIdNumber, list, update, updateCaseState} from '../controllers/caseController';

const caseRouter = express.Router();

// @route   POST api/case/add
// @desc    Add a new case to database. Request should contain all required elements defined in the `Case` model.
// @access  Private
caseRouter.post('/add', auth, add);

// @route   PUT api/case/update/:id
// @desc    Update a case
// @access  Private
caseRouter.put('/update/:id', auth, update);

// @route   GET api/case/list
// @desc    Get all cases from the database.
// @access  Private
caseRouter.get('/list/:state/:isChildrenCase', auth, list);

// @route   GET api/case/:id
// @desc    Get case with given ID
// @access  Private
caseRouter.get('/:id', auth, getCaseById);

// @route   GET api/case/idNumber
// @desc    Get case with given idNumber
// @access  Private
caseRouter.get('/idNumber/:id', auth, getCasesByIdNumber);

// @route   GET api/case/updateCaseState/:id
// @desc    Get case with given idNumber
// @access  Private
caseRouter.put('/updateCaseState/:id', auth, updateCaseState);

export default caseRouter;
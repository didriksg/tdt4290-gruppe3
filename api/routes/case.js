const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const sort = require('../utils/sortCasesByPriority');

// User model
const Case = require('../models/Case');

// @route   POST api/case/add
// @desc    Add a new case to database. Request should contain all required elements defined in the `Case` model.
// @access  Private
router.post('/add', auth, (req, res) => {
    // Extract data from request's body.
    const gericaNumber = req.body.gericaNumber;
    const priority = req.body.priority;
    const isChildrenCase = req.body.isChildrenCase;
    const startupDate = req.body.startupDate;
    const registeredDate = req.body.registeredDate;
    const category = req.body.category;
    const district = req.body.district;
    const description = req.body.description;
    const referredFrom = req.body.referredFrom;
    const important = req.body.important;

    // Check if all required fields are provided.
    if (gericaNumber === undefined
        || priority === undefined
        || isChildrenCase === undefined
        || startupDate === undefined
        || registeredDate === undefined
        || category === undefined
        || district === undefined
    ) {
        return res.status(400)
            .json({msg: 'Please enter all required fields.'});
    }

    const newCase = new Case({
        gericaNumber,
        priority,
        isChildrenCase,
        startupDate,
        registeredDate,
        category,
        district,
        'important': important,
        'description': description,
        'referredFrom': referredFrom,
    });

    // Save case.
    newCase.save()
        .then((c) => {
            return res.status(200)
                .json({
                    _id: c._id,
                    msg: 'Case saved to database.',
                });
        })
        .catch(() => {
            return res.status(500)
                .json({msg: 'Failed saving case to database'});
        });
});

// @route   PUT api/case/update
// @desc    Update a case
// @access  Private
router.put('/update/:id', auth, (req, res) => {
    // Extract ID
    const id = req.params.id;

    // Check if an ID was provided.
    if (id === undefined) {
        res.status(400)
            .json({msg: 'No correct ID was provided'});
    }

    Case.findById(id)
        .then((result) => {
            if (result === null || result === undefined) {
                throw result;
            }

            const gericaNumber = req.body.gericaNumber;
            const description = req.body.description;
            const district = req.body.district;
            const priority = req.body.priority;
            const isChildrenCase = req.body.isChildrenCase;
            const startupDate = req.body.startupDate;
            const category = req.body.category;
            const state = req.body.state;
            const important = req.body.important;
            const userResponsible = req.body.userResponsible;
            const referredFrom = req.body.referredFrom;

            // Update database entry.
            result.gericaNumber = gericaNumber === undefined ? result.gericaNumber : gericaNumber;
            result.description = description === undefined ? result.description : description;
            result.district = district === undefined ? result.district : district;
            result.priority = priority === undefined ? result.priority : priority;
            result.isChildrenCase = isChildrenCase === undefined ? result.isChildrenCase : isChildrenCase;
            result.startupDate = startupDate === undefined ? result.startupDate : startupDate;
            result.category = category === undefined ? result.category : category;
            result.state = state === undefined ? result.state : state;
            result.userResponsible = userResponsible === undefined ? result.userResponsible : userResponsible;
            result.important = important === undefined ? result.important : important;
            result.referredFrom = referredFrom === undefined ? result.referredFrom : referredFrom;
            result.lastChanged = Date.now();

            // Save changes.
            result.save()
                .then(() => {
                    res.status(200)
                        .json({msg: 'Case updated.'})
                })
                .catch(() => {
                    res.status(500)
                        .json({msg: 'Error updating case.'})
                });
        })
        .catch(() => {
            res.status(404)
                .json({msg: 'Case not found.'});
        });
});

// @route   GET api/case/list
// @desc    Get all cases from the database.
// @access  Private
router.get('/list', auth, (req, res) => {
    Case.find()
        .then((cases) => {
            if (cases === null || cases.length === 0) {
                res.status(404)
                    .json({msg: 'No cases was found.'});
                return;
            }

            // Sort cases by priorirty, then importance.
            const sortedCases = sort(cases);
            res.status(200)
                .json(cases);
        })
        .catch(() => {
            res.status(500)
                .json({msg: 'There was a problem getting the cases from the database.'});
        });
});

// @route   GET api/case/:id
// @desc    Get case with given ID
// @access  Private
router.get('/:id', auth, (req, res) => {
    // Extract ID
    const id = req.params.id;
    console.log(req.params);

    // Check if an ID was provided.
    if (id === undefined) {
        res.status(400)
            .json({msg: 'No correct ID was provided'});
    }

    // Extract case with given ID. Set a 404 state if no ID was found.
    Case.findById(id)
        .then((matchedCase) => {
            res.status(200)
                .json({
                    case: matchedCase,
                });
        })
        .catch(() => {
            res.status(404)
                .json({msg: 'Case with provided ID was not found.'});
        });
});


module.exports = router;
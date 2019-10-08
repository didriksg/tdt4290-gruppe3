const auth = require('../middleware/auth');
const sort = require('../utils/sortCasesByPriority');

// Case model
const Case = require('../models/Case');

/**
 * Add a new case to the database.
 **/
exports.add = function addNewCase(req, res) {
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
};

/**
 * Update an existing case by its ID. All fields are optional, and only provided fields are updated.
 **/
exports.update = function updateCaseById(req, res) {
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
                        .json({
                            "caseId": result._id,
                        })
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
};

/**
 * Get all the cases currently existing in the database.
 **/
exports.list = function listAllCases(req, res) {
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
};

/**
 * Get a single case based on its ID.
 **/
exports.getCaseById = function getCaseById(req, res) {
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
};

/**
 * Get all cases with the provided gerica ID.
 **/
exports.getCasesByGericaId = function getCasesByGericaId(req, res) {
    // Extract ID
    console.log(req.params);

    const id = req.params.id;

    // Check if an ID was provided.
    if (id === undefined) {
        res.status(400)
            .json({msg: 'No correct ID was provided'});
    }

    // Extract case with given ID. Set a 404 state if no ID was found.
    Case.find({gericaNumber: id})
        .then((casesWithGericaId) => {
            res.status(200)
                .json({
                    casesWithGericaId,
                });
        })
        .catch(() => {
            res.status(404)
                .json({msg: 'Case with provided ID was not found.'});
        });
};

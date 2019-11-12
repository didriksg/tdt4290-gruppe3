import sort from '../utils/sortCasesByPriority';
import {getWeek} from '../utils/dateUtils';
import {priorityToWaitingTimeInDays} from '../config/definitions'
// Case model
import Case from '../models/Case';

/**
 * Add a new case to the database.
 **/
export const add = function addNewCase(req, res) {
    // Extract data from request's body.
    const idNumber = req.body.id;
    const priority = req.body.priority;
    const isChildrenCase = req.body.isChildrenCase;
    const startupDate = req.body.startDate;
    const registeredDate = req.body.registeredDate;
    const category = req.body.category;
    const district = req.body.district;
    const referredFrom = req.body.referral;
    const important = false;

    // Check if all required fields are provided.
    if (idNumber === undefined
        || priority === undefined
        || isChildrenCase === undefined
        || startupDate === undefined
        || registeredDate === undefined
        || category === undefined
        || district === undefined
    ) {
        res.status(400)
            .json({msg: 'Please enter all required fields.'});
    }

    const newCase = new Case({
        idNumber: idNumber,
        priority,
        isChildrenCase,
        startupDate,
        registeredDate,
        category,
        district,
        'important': important,
        'referredFrom': referredFrom,
    });

    // Save case.
    newCase.save()
        .then((c) => {
            res.status(200)
                .json({
                    _id: c._id,
                    msg: 'Case saved to database.',
                });
        })
        .catch(() => {
            res.status(500)
                .json({msg: 'Failed saving case to database'});
        });
};

/**
 * Update an existing case by its ID. All fields are optional, and only provided fields are updated.
 **/
export const update = function updateCaseById(req, res) {
    // Extract ID
    const id = req.params.id;

    // Check if an ID was provided.
    if (id === undefined) {
        res.status(400)
            .json({msg: 'No correct ID was provided'});
    }

    Case.findById(id)
        .then((result) => {
            if (result === null) {
                throw result;
            }

            if (result.state === 2) {
                return res.status(405)
                    .json({msg: 'A finished case cannot be updated'});
            }

            const state = req.body.state;
            if (state !== undefined) {
                return res.status(400)
                    .json({msg: 'Case state is updated with a separate route'});
            }

            const idNumber = req.body.idNumber;
            const description = req.body.description;
            const district = req.body.district;
            const priority = req.body.priority;
            const isChildrenCase = req.body.isChildrenCase;
            const startupDate = req.body.startupDate;
            const category = req.body.category;
            const important = req.body.important;
            const userResponsible = req.body.userResponsible;
            const referredFrom = req.body.referredFrom;


            // Update database entry.
            result.idNumber = idNumber === undefined ? result.idNumber : idNumber;
            result.description = description === undefined ? result.description : description;
            result.district = district === undefined ? result.district : district;
            result.priority = priority === undefined ? result.priority : priority;
            result.isChildrenCase = isChildrenCase === undefined ? result.isChildrenCase : isChildrenCase;
            result.startupDate = startupDate === undefined ? result.startupDate : startupDate;
            result.category = category === undefined ? result.category : category;
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
export const list = function listAllCases(req, res) {
    const state = req.params.state;
    const isChildrenCase = req.params.isChildrenCase;

    let query;
    if (state === '0' && isChildrenCase !== undefined) {
        query = {state: state, isChildrenCase: isChildrenCase}
    } else {
        query = {state: state}
    }

    Case.find(query).lean()
        .then((cases) => {

            if (cases === null || cases.length === 0) {
                res.status(404)
                    .json({msg: 'No cases was found.'});
                return;
            }

            // Select only cases with a provided state. These must be either 0, 1 or 2.
            if (state !== undefined && state !== '' && [0, 1, 2].includes(state)) {
                cases = cases.filter(c => c.state === state);
            }

            // Sort cases by startup date, priority, then importance.

            // Replace date with week or month.
            if (isChildrenCase === 'true') {
                cases.forEach((c) => {
                    const startup = new Date(c.startupDate);
                    const registered = new Date(c.registeredDate);

                    c.modifiedStartupDate = {date: startup.getMonth(), year: startup.getFullYear()};
                    c.modifiedRegisteredDate = {date: registered.getMonth(), year: registered.getFullYear()};
                });
            } else {
                cases.forEach((c) => {
                    c.modifiedStartupDate = {date: getWeek(c.startupDate), year: c.startupDate.getFullYear()};
                    c.modifiedRegisteredDate = {date: getWeek(c.registeredDate), year: c.registeredDate.getFullYear()};
                })
            }

            const sortedCases = sort(cases);

            res.status(200)
                .json(sortedCases);
        })
        .catch(() => {
            res.status(500)
                .json({msg: 'There was a problem getting the cases from the database.'});
        });
};

/**
 * Get a single case based on its ID.
 **/
export const getCaseById = function getCaseById(req, res) {
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
export const getCasesByIdNumber = function getCasesByIdNumber(req, res) {
    // Extract ID
    const id = req.params.id;

    // Check if an ID was provided.
    if (id === undefined) {
        return res.status(400)
            .json({msg: 'No ID was provided'});
    }

    // Extract case with given ID. Set a 404 state if no ID was found.
    Case.find({idNumber: id})
        .then((c) => {
            res.status(200)
                .json({
                    cases: c,
                });
        })
        .catch(() => {
            res.status(404)
                .json({msg: 'Case with provided ID was not found.'});
        });
};

export const updateCaseState = function updateCaseState(req, res) {
    // Extract needed info from the request.
    const id = req.params.id;
    const newState = req.body.state;
    const userId = req.body.user_id;

    if (id === undefined) {
        return res.status(400)
            .json({msg: 'No ID was provided'})
    }

    // Find case with provided ObjectId.
    Case.findById(id)
        .then((c) => {
            if (c === null) {
                return res.status(404)
                    .json({msg: 'No case with given ID was found'})
            }

            // Get the current state of the found case.
            const currentState = c.state;

            // Changing the state of an 'Finished' case is not allowed.
            if (currentState === 2) {
                return res.status(405)
                    .json({msg: 'A finished case cannot be updated'});
            }

            // Check if state change is legal
            switch (newState) {
                case 0: {
                    // Remove the currently responsible user when going from 'Active' to 'Available'.
                    if (currentState === 1) {
                        c.userResponsible = null;
                    }
                    break;
                }
                case 1: {
                    // Assign a new user to a case when going from 'Available' to 'Active'
                    if (currentState === 0) {
                        c.userResponsible = userId
                    }
                    break;
                }
                case 2: {
                    // Changing from 'Available' to 'Finished' is not allowed.
                    if (currentState === 0) {
                        return res.status(405)
                            .json({msg: `Changing from state ${currentState} to ${newState} is not allowed`});
                    }
                    break;
                }
                default: {
                    return res.status(400)
                        .json({msg: 'Provided state does not exist'});
                }
            }

            // If we get this far, the state change is considered valid.
            c.state = newState;
            c.lastChanged = Date.now();

            c.save()
                .then(() => {
                    res.status(200)
                        .json({
                            msg: 'Case updated successfully',
                            "caseId": c._id,
                        })
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500)
                        .json({msg: 'Error updating case.'})
                });
        });
};


export const getWaitingTime = function getWaitingTime(req, res) {
    const priority = req.params.priority;
    const district = req.params.district;
    const isChildrenCase = req.params.isChildrenCase;

    if (priority === null
        || priority === undefined
        || district === undefined
        || district === null
        || isChildrenCase === undefined
        || isChildrenCase === null
    ) {
        return res.status(400)
            .json({
                msg: 'Vennligst oppgi all påkrevd informasjon.'
            })
    }

    const waitingTime = priorityToWaitingTimeInDays[priority];
    return res.status(200)
        .json({
            waitingTimeInDays: {waitingTime}
        });
};

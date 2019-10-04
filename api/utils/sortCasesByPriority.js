const firstBy = require('thenby/thenBy.module');


/**
 * Sort an array of cases based on agreed upon order.
 * @param cases Array containing cases.
 */
const sort = function sortCasesByPriority(cases) {
    const sortedCases = cases.sort(
        firstBy((c) => {
            return c.startupDate;
        })
            .thenBy((c) => {
                return c.priority;
            })
            .thenBy((c) => {
                return !c.important;
            })
    );
};


module.exports = sort;
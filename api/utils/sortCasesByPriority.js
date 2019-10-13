import firstBy from 'thenby/thenBy.module'

/**
 * Sort an array of cases based on agreed upon order.
 * @param cases Array containing cases.
 * @param doFilter Only show unstarted cases.
 */
const sort = function sortCasesByPriority(cases, doFilter) {
    let filteredCases;

    if (doFilter) {
        filteredCases = cases.filter((c) => {
            return c.state === 0;
        });
    } else {
        filteredCases = cases;
    }

    const sortedCases = filteredCases.sort(
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

    return sortedCases;
};

export default sort;

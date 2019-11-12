import firstBy from 'thenby/thenBy.module'

/**
 * Sort an array of cases based on agreed upon order.
 * @param cases Array containing cases.
 * @param doFilter Only show unstarted cases.
 */
const sort = function sortCasesByPriority(cases) {
    // let importantCases = [];
    // console.log(cases.length);
    // const copiedCases = [...cases];
    // for (let i = 0; i < cases.length -1; i++) {
    //     if (cases[i].important === true) {
    //         importantCases.push(cases[i]);
    //         copiedCases.splice(i, 1);
    //     }
    // }
    //
    // console.log(importantCases.length);
    // console.log(copiedCases.length);

    return cases.sort(
        firstBy((c) => {
            return !c.important
        })
            .thenBy((c) => {
                return c.modifiedStartupDate.year;
            })
            .thenBy((c) => {
                return c.modifiedStartupDate.date;
            })
            .thenBy((c) => {
                return c.priority;
            })
    );

};

export default sort;

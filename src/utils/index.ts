export const queryParser = (query: any, allowedParameters: string[]) => {
    let filter = {};
    for (const key in query) {
        if (allowedParameters.includes(key)) {
            filter = {...filter, [key]: query[key]};
        }
    }
    return filter;
}


export const hashTimePoint = (timePoint) => {
    const [hours, minutes] = timePoint.split(':').map(Number);
    return hours * 3 + minutes / 20; 
}

export function mergeArrays(arrays) {
    // Use reduce to concatenate all inner arrays into one outer array
    return arrays.reduce((acc, current) => acc.concat(current), []);
}
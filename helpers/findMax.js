export function findMaxId(array, property) {
    // Check if the array is empty
    if (array.length === 0) {
        return null;
    }

    // Use reduce to find the object with the maximum value
    return array.reduce((maxObj, obj) => {
        return obj[property] > maxObj[property] ? obj : maxObj;
    }, array[0]);
}
import { dehashTimepoint } from "./dehashTimePoint";

export const createDateTimeObject = (date, time) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    time = dehashTimepoint(time);
    // Parse time
    const [hour, minute] = time.split(":");

    // Create a new Date object
    const dateTimeObj = new Date(year, month, day, hour, minute);

    return dateTimeObj;
};

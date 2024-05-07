export const addMinutesToTimeString = (timeString, minutesToAdd) => {
    // Parse the time string
    let [hour, minute] = timeString.split(":").map(Number);

    // Add minutes
    let newMinute = (minute + minutesToAdd) % 60;
    let newHour = hour + Math.floor((minute + minutesToAdd) / 60);

    // Format the new time
    let newTimeString = `${newHour < 10 ? "0" + newHour : newHour}:${newMinute < 10 ? "0" + newMinute : newMinute}`;

    return newTimeString;
}

export function dehashTimepoint(number) {
    // Calculate the hours and minutes
    const hours = Math.floor(number / 3); // Each 3 numbers represent 1 hour starting from 08:00
    const minutes = (number % 3) * 20; // Each number represents 20 minutes

    // Format the hours and minutes as strings
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // Combine hours and minutes into a timepoint string
    const timepoint = `${formattedHours}:${formattedMinutes}`;

    return timepoint;
}


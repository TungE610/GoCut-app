export const isInSameWeek = (date1, date2) => {
    // Get the ISO week numbers of the dates
    const week1 = getISOWeek(date1);
    const week2 = getISOWeek(date2);
    
    // Get the years of the dates
    const year1 = date1.getFullYear();
    const year2 = date2.getFullYear();
    
    // Compare week numbers and years
    return week1 === week2 && year1 === year2;
}

const getISOWeek = (date) => {
    const d = new Date(date);

    d.setHours(0, 0, 0, 0);

    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);

    const yearStart = new Date(d.getFullYear(), 0, 1);

    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}
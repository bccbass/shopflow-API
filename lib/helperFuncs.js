const addDays = (days, date = new Date(Date.now())) => {
    // let result = new Date(date);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

export { addDays }
const addDays = (days, date = Date.now()) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];
}

export { addDays }
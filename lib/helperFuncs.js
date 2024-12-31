const addDays = (days, date = new Date(Date.now())) => {
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

const localDate = (date, locale='en-AU', incYear=true) => {
    const formattedDate = new Date(date).toLocaleString(locale, {
        day: "numeric",
        month: "numeric",
        year: incYear ? "numeric" : null,
      })
    return formattedDate == 'Invalid Date' ? '' : formattedDate
}



export { addDays, localDate }
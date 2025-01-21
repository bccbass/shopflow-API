const addDays = (days, date = new Date(Date.now())) => {
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

const localDate = (date, incYear=true, locale='en-AU') => {
    const formattedDate = new Date(date).toLocaleString(locale, {
        day: "numeric",
        month: "numeric",
        year: incYear ? "numeric" : null,
      })
    return formattedDate == 'Invalid Date' ? '' : formattedDate
}

const getDay = (date, locale='en-AU') => {
    const formattedDate = new Date(date).toLocaleString(locale, {
          weekday: 'long',
          month: 'long',
          day: 'numeric'
 })
    return formattedDate == 'Invalid Date' ? '' : formattedDate
}


export { addDays, localDate, getDay }
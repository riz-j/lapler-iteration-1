export function dateParser(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const readableDate = date.toLocaleDateString('en-UK', options);
    return readableDate;
}

export function dateTimeParser(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric' 
    }
    const readableDateTime = date.toLocaleDateString('en-UK', options);
    return readableDateTime;
}
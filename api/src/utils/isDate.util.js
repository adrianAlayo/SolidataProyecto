function isValidDate(input) {
    const date = new Date(input);
    return date instanceof Date && !isNaN(date);
}
module.exports = isValidDate;
function isValidPhone(phone) {
    const phoneStr = String(phone);
    return /^\d{10,11}$/.test(phoneStr);
}

module.exports = isValidPhone;
function isString(name){
    if (!name || typeof name !== "string" || name.trim() === "") {
        return false;
    }
    return true;
}

module.exports = isString;
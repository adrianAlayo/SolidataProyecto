function VerifyCamp(name,email){
    // Verifica que ambos campos existan y sean cadenas no vacías
    if (!name || !email) return false;  // si alguno es undefined, null o string vacío

    if (typeof name !== "string" || typeof email !== "string") return false;

    return true;
}

module.exports = VerifyCamp;
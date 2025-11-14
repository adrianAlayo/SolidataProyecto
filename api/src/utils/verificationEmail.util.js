function VerificationEmail(email) {
    if (email.startsWith('.') || email.startsWith('@')) return false;
    const atCount = (email.match(/@/g) || []).length;
    if (atCount !== 1) return false;
    if (email.endsWith('.')) return false;
    const domainPart = email.split('@')[1];
    return domainPart.includes('.');
}
module.exports = VerificationEmail;
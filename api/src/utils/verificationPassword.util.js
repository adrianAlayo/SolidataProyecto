function VerificationPass(pass) {
    let hasUppercase = false, hasLowercase = false, hasNumber = false;
    for (let c of pass) {
        if (c >= "A" && c <= "Z") hasUppercase = true;
        else if (c >= "a" && c <= "z") hasLowercase = true;
        else if (c >= "0" && c <= "9") hasNumber = true;
    }
    return hasUppercase && hasLowercase && hasNumber && pass.length >= 8;
}

module.exports = VerificationPass;
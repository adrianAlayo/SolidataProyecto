const USER = require("../models/user");
const INSTITUTION = require("../models/institution");

const IsString = require('../utils/isString.util');
const IsDate = require('../utils/isDate.util');

async function DataValidateDonation(req, res, next) {
    try {
        const {
            note,
            donation_date,
            responsable_user_id,
            donor_id,
            receiver_institution_id
        } = req.body;

        // VALIDACIÓN DE CAMPOS
        if (!IsString(note) || !IsString(donation_date)) {
            return res.status(400).send({
                message: "note y donation_date deben ser textos válidos."
            });
        }

        if (!IsDate(donation_date)) {
            return res.status(400).send({
                message: "donation_date debe tener formato YYYY-MM-DD."
            });
        }

        if (typeof donor_id !== "number" || typeof responsable_user_id !== "number" || typeof receiver_institution_id !== "number"
        ) {
            return res.status(400).send({
                message: "Los campos ID deben ser números."
            });
        }

        // RESPONSABLE → debe ser operador o admin
        const userFound = req.user_find;
        if (!userFound || !userFound.rol) {
            return res.status(401).json({ message: "Usuario no autenticado o sin rol." });
        }
        if (userFound.rol !== 1 && userFound.rol !== 3) {
            return res.status(403).json({ message: "No tiene permisos para registrar donaciones. (Se requiere rol Admin u Operador)." });
        }

        // VALIDACIÓN DEL DONADOR
        const donor = await USER.findByPk(donor_id);

        if (!donor) {
            return res.status(404).json({ message: "El donante (usuario) no existe." });
        }
        console.log(donor)
        
        // Si el usuario es "institución" (role_id === 4), verificar su institutionType
        if (donor.role_id === 4) {
            // debe tener institución asociada
            if (!donor.institution_id) {
                return res.status(400).json({ message: "El usuario donante no tiene institución asociada." });
            }
            const institutionDonor = await INSTITUTION.findByPk(donor.institution_id)
            if (!institutionDonor) {
                return res.status(400).json({ message: "No se pudo obtener la institución del donante." });
            }
            if (institutionDonor.institutionType !== "Donor" && institutionDonor.institutionType !== "Both") {
                return res.status(400).json({ message: "La institución asociada no puede donar (debe ser 'Donor' o 'Both')." });
            }
        } else if (donor.role_id === 5) {
            // voluntario ok
        } else {
            return res.status(400).json({ message: "El usuario indicado no está autorizado para ser donante." });
        }

        // VALIDACIÓN DEL RECEPTOR (institución receptora)
        const receiver = await INSTITUTION.findByPk(receiver_institution_id);
        if (!receiver) {
            return res.status(404).json({ message: "La institución receptora no existe." });
        }
        if (receiver.institutionType !== "Recipient" && receiver.institutionType !== "Both") {
            return res.status(400).json({ message: "La institución receptora no puede recibir donaciones (debe ser 'Recipient' o 'Both')." });
        }

        next();

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({ message: "Error interno en validar donación." });
    }
}

module.exports = DataValidateDonation;

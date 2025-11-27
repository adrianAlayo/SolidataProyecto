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

        if (!userFound)
            return res.status(401).send({ message: "Usuario no autenticado." });

        if (userFound.role_id !== 1 && userFound.role_id !== 3) {
            return res.status(403).send({
                message: "No tiene permisos para registrar donaciones."
            });
        }

        // VALIDACIÓN DEL DONADOR
        const donor = await USER.findByPk(donor_id, {
            include: {
                model: INSTITUTION,
                attributes: ["id", "institutionType"]
            }
        });

        if (!donor)
            return res.status(404).send({ message: "El donante no existe." });

        // CASO 1: Institución (role_id = 4)
        if (donor.role_id === 4) {
            if (!donor.INSTITUTION){
                return res.status(400).send({ message: "El usuario no tiene institución asociada." });
            }
            const type = donor.INSTITUTION.institutionType;

            if (type !== "Donor" && type !== "Both") {
                return res.status(400).send({
                    message: "La institución no puede donar (solo Donor o Both)."
                });
            }
        }
        // CASO 2: Voluntario (role_id = 5)
        else if (donor.role_id === 5) {
            
        }
        // CASO 3: Otro rol → no puede donar
        else {
            return res.status(400).send({
                message: "Este usuario no tiene permisos para donar."
            });
        }

        // VALIDACIÓN DEL RECEPTOR
        const receiverInstitution = await INSTITUTION.findByPk(receiver_institution_id);

        if (!receiverInstitution)
            return res.status(404).send({ message: "La institución receptora no existe." });

        if (receiverInstitution.institutionType !== "Recipient" &&
            receiverInstitution.institutionType !== "Both") {
            return res.status(400).send({
                message: "Esta institución no puede recibir donaciones."
            });
        }

        next();

    } catch (err) {
        console.error("Error en validar donación:", err.message);
        res.status(500).send({ message: "Error interno en validar donación." });
    }
}

module.exports = DataValidateDonation;

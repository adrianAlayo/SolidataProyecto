const USER = require("../models/user");
const INSTITUTION = require("../models/institution");
const ROLE = require("../models/role");

const IsString = require('../utils/isString.util');
const IsDate = require('../utils/isDate.util');

async function DataValidateDonation(req, res, next) {
    try {
        const {
            receiver_institution_id,
            donorType,
            donor_id,
            note,
            donation_date
        } = req.body;

        // VALIDACION DE CAMPOS
        if (!IsString(donorType) || !IsString(note) || !IsString(donation_date)) {
            return res.status(400).send({
                message: "Los campos donorType, note y donation_date deben ser textos válidos."
            });
        }

        if (donorType !== "Institution" && donorType !== "User") {
            return res.status(400).send({
                message: "donorType debe ser 'Institution' o 'User'."
            });
        }

        if (!IsDate(donation_date)) {
            return res.status(400).send({
                message: "donation_date debe ser una fecha válida (YYYY-MM-DD)."
            });
        }

        if (typeof receiver_institution_id !== "number" || typeof donor_id !== "number") {
            return res.status(400).send({
                message: "institution_id y donor_id deben ser números."
            });
        }


        // VALIDACION DEL RESPONSABLE
        const userFound = req.user_find;   // viene del token
        if (!userFound || !userFound.roleName) {
            return res.status(403).send({ message: "No se pudo identificar el rol del usuario responsable." });
        }

        const userRole = await ROLE.findOne({
            where: { name: userFound.roleName }
        });

        if (!userRole) {
            return res.status(404).send({ message: "El rol del usuario no existe en la base de datos." });
        }

        // Solo operadores pueden registrar donaciones (role_id = 3)
        if (userRole.id !== 3 || userRole.id !== 1) {
            return res.status(403).send({
                message: "No tiene permisos para registrar donaciones. Se requiere rol 'Operador'."
            });
        }


        //       VALIDACION DEL DONANTE
        if (donorType === "Institution") {
            const existInstitution = await INSTITUTION.findByPk(donor_id);

            if (!existInstitution) {
                return res.status(404).send({ message: "La institución donante no existe." });
            }

            if (existInstitution.institutionType !== "Donor" &&
                existInstitution.institutionType !== "Both") {
                return res.status(400).send({
                    message: "Esta institución no puede donar. Solo las de tipo 'Donor' o 'Both'."
                });
            }
        }
        if (donorType === "User") {
            const existUser = await USER.findByPk(donor_id, {
                include: { model: ROLE }
            });

            if (!existUser) {
                return res.status(404).send({ message: "El usuario donante no existe." });
            }

            if (existUser.Role.id !== 5) { // rol Donador
                return res.status(400).send({
                    message: "El usuario no puede donar porque no posee el rol de 'Donador'."
                });
            }
        }


        // VALIDACIÓN DEL RECEPTOR
        const receiverInstitution = await INSTITUTION.findByPk(receiver_institution_id);

        if (!receiverInstitution) {
            return res.status(404).send({ message: "La institución receptora no existe." });
        }

        if (receiverInstitution.institutionType !== "Recipient" &&
            receiverInstitution.institutionType !== "Both") {
            return res.status(400).send({
                message: "La institución no puede recibir donaciones. Debe ser tipo 'Recipient' o 'Both'."
            });
        }

        // Si todo está OK → sigue el flujo
        next();

    } catch (err) {
        console.error("Error en middleware DataValidateDonation:", err);
        res.status(500).send({
            message: "Error inesperado en validación de datos de la donación.",
            error: err.message
        });
    }
}

module.exports = DataValidateDonation;

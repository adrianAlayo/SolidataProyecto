const USER = require('../models/user');
const DONATION = require('../models/donation');
const INSTITUTION = require('../models/institution');

const IsString = require('../utils/isString.util');
const { where } = require('sequelize');


const createDonation = async (req, res) => {
    try {
        const { note, donation_date, responsable_user_id, donor_id, receiver_institution_id } = req.body;

        const existDonation = await DONATION.findOne({
            where: {
                donation_date,
                donor_id,
                receiver_institution_id
            }
        });

        if (existDonation) {
            return res.status(400).send({
                message: "Ya existe una donación con las mismas características."
            });
        }

        const newDonation = await DONATION.create({
            note,
            donation_date,
            responsable_user_id,
            donor_id,
            receiver_institution_id
        });

        return res.status(200).json({
            message: "Donación creada con éxito.",
            data: newDonation
        });

    } catch (err) {
        console.error("Error al crear donación:", err);
        res.status(500).send({ message: "Error interno al crear la donación." });
    }
};
const getDonation = async (req, res) => {
    try {
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const donation = await DONATION.findByPk(id, {
            include: [
                { model: USER, as: "responsable", attributes: ["first_name", "last_name","email"] },
                { model: USER, as: "donor", attributes: ["first_name", "last_name","email"] },
                { model: INSTITUTION, as: "receiver_institution", attributes: [, "name"] }
            ]
        });

        if (!donation) {
            return res.status(404).send({ message: "Donación no encontrada." });
        }

        return res.status(200).json({
            message: "Se encontro la donacion",
            data: donation
        });

    } catch (err) {
        console.error("Error al obtener donación:", err.message);
        res.status(500).send({ message: "Error al obtener donación." });
    }
};
const getDonations = async (_req, res) => {
    try {
        const list = await DONATION.findAll({
            include: [
                { model: USER, as: "responsable", attributes: ["id", "name"] },
                { model: USER, as: "donor", attributes: ["id", "name"] },
                { model: INSTITUTION, as: "receiverInstitution", attributes: ["id", "name"] }
            ],
            order: [["donation_date", "DESC"]]
        });

        if(list.length === 0 && !list){
            return res.status(404).send({message: "No se encontraron donaciones"})
        }

        return res.status(200).json({
            message: "Se encontraron las donaciones",
            data: list
        });

    } catch (err) {
        console.error("Error al obtener donaciones:", err);
        res.status(500).send({ message: "Error al obtener donaciones." });
    }
};
const getDonationsByResponsable = async (req, res) => {
    try {
        let { responsable_user_id } = req.params;

        if (!responsable_user_id || isNaN(Number(responsable_user_id))) {
            return res.status(400).json({ message: "ID inválido." });
        }
        responsable_user_id = Number(responsable_user_id);

        const list = await DONATION.findAll({
            where: { responsable_user_id }
        });

        if(list.length === 0 && !list){
            return res.status(404).send({message: "No se encontraron donaciones"})
        }
        return res.status(200).json({
            message: "Se encontraron donaciones de un mismo responsable",
            data: list
        });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({ message: "Error al obtener donaciones por responsable." });
    }
};
const getDonationsByDonor = async (req, res) => {
    try {
        let { donor_id } = req.params;

        if (!donor_id || isNaN(Number(donor_id))) {
            return res.status(400).json({ message: "ID inválido." });
        }
        donor_id = Number(donor_id);

        const list = await DONATION.findAll({
            where: { donor_id }
        });

        if(list.length === 0 && !list){
            return res.status(404).send({message: "No se encontraron donaciones"})
        }
        return res.status(200).json({
            message: "Se encontraron las donaciones de un mismo donador",
            data: list
        });

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({ message: "Error al obtener donaciones por donador." });
    }
};
const getDonationsByVolunteerDonor = async (req, res) => {
    try {
        let { donor_id } = req.params;

        if (!donor_id || isNaN(Number(donor_id))) {
            return res.status(400).json({ message: "ID inválido." });
        }
        donor_id = Number(donor_id);

        const user = await USER.findByPk(donor_id);

        if (!user || user.role_id !== 5) {
            return res.status(400).send({ message: "El usuario no es un voluntario." });
        }

        const list = await DONATION.findAll({
            where: { donor_id }
        }); 

        if(list.length === 0 && !list){
            return res.status(404).send({message: "No se encontraron donaciones"})
        }

        return res.status(200).json({
            message: "Se encontraron donaciones de un mismo voluntario",
            data: list
        });

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({ message: "Error al obtener donaciones de voluntario." });
    }
};
const getDonationsByInstitutionDonor = async (req, res) => {
    try {
        let { donor_id } = req.params;

        if (!donor_id || isNaN(Number(donor_id))) {
            return res.status(400).json({ message: "ID inválido." });
        }
        donor_id = Number(donor_id);

        const user = await USER.findByPk(donor_id, {
            include: INSTITUTION
        });

        if (!user || user.role_id !== 4) {
            return res.status(400).send({ message: "El usuario no es una institución." });
        }

        const list = await DONATION.findAll({
            where: { donor_id }
        });

        if(list.length === 0 && !list){
            return res.status(404).send({message: "No se encontraron donaciones"})
        }

        return res.status(200).json({
            message: "Se encotnraron donaciones de una misma institucion donadora",
            data: list
        });

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({ message: "Error al obtener donaciones de institución." });
    }
};
const getDonationsByReceiver = async (req, res) => {
    try {
        let { receiver_institution_id } = req.params;

        if (!receiver_institution_id || isNaN(Number(receiver_institution_id))) {
            return res.status(400).json({ message: "ID inválido." });
        }
        receiver_institution_id = Number(receiver_institution_id);

        const list = await DONATION.findAll({
            where: { receiver_institution_id }
        });


        if(list.length === 0 && !list){
            return res.status(404).send({message: "No se encontraron donaciones"})
        }

        return res.status(200).json({
            message: "Se encontraron las donaciones solamente de un receptor en especifico",
            data:list
        });

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({ message: "Error al obtener donaciones por receptor." });
    }
};
const updateDonation = async (req, res) => {
    try {
        const { donation_id } = req.params.id;

        if (!donation_id || isNaN(Number(donation_id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        donation_id = Number(donation_id);

        // Buscar donación
        const donation = await DONATION.findByPk(donation_id);
        if (!donation){
            return res.status(404).send({ message: "La donación no existe." });
        }
        const {
            note,
            donation_date,
            responsable_user_id,
            donor_id,
            receiver_institution_id
        } = req.body;

        const updateFields = {};


        // VALIDAR ROL DEL USUARIO QUE HACE EL CAMBIO
        const userFound = req.user_find;
        if (!userFound)
            return res.status(401).send({ message: "Usuario no autenticado." });

        if (userFound.role_id !== 1 && userFound.role_id !== 3) {
            return res.status(403).send({
                message: "No tiene permisos para actualizar donaciones."
            });
        }

        // NOTE
        if (note !== undefined) {
            if (!IsString(note)) {
                return res.status(400).send({ message: "note debe ser texto." });
            }
            updateFields.note = note;
        }

        // DONATION_DATE
        if (donation_date !== undefined) {
            if (!IsString(donation_date) || !IsDate(donation_date)) {
                return res.status(400).send({
                    message: "donation_date debe ser fecha válida YYYY-MM-DD."
                });
            }
            updateFields.donation_date = donation_date;
        }

        // RESPONSABLE_USER_ID
        if (responsable_user_id !== undefined) {
            if (typeof responsable_user_id !== "number") {
                return res.status(400).send({
                    message: "responsable_user_id debe ser número."
                });
            }
            updateFields.responsable_user_id = responsable_user_id;
        }

        // DONOR_ID
        if (donor_id !== undefined) {

            if (typeof donor_id !== "number")
                return res.status(400).send({ message: "donor_id debe ser número." });

            const donor = await USER.findByPk(donor_id, {
                include: {
                    model: INSTITUTION,
                    attributes: ["id", "institutionType"]
                }
            });

            if (!donor)
                return res.status(404).send({ message: "El donante no existe." });

            // Institución (role_id = 4)
            if (donor.role_id === 4) {
                if (!donor.INSTITUTION) {
                    return res.status(400).send({ message: "La institución del donante no existe." });
                }

                const type = donor.INSTITUTION.institutionType;

                if (type !== "Donor" && type !== "Both") {
                    return res.status(400).send({
                        message: "La institución ingresada no puede donar (solo Donor o Both)."
                    });
                }
            }
            else if (donor.role_id === 5) {
                // nada, permitido
            }
            // Otros → no puede donar
            else {
                return res.status(400).send({
                    message: "Este usuario ingreado no pude ser donante no puede ser donante."
                });
            }

            updateFields.donor_id = donor_id;
        }

        // RECEIVER_INSTITUTION_ID
        if (receiver_institution_id !== undefined) {

            if (typeof receiver_institution_id !== "number") {
                return res.status(400).send({
                    message: "receiver_institution_id debe ser número."
                });
            }

            const receiver = await INSTITUTION.findByPk(receiver_institution_id);
            if (!receiver)
                return res.status(404).send({ message: "La institución receptora no existe." });

            if (receiver.institutionType !== "Recipient" &&
                receiver.institutionType !== "Both") {
                return res.status(400).send({
                    message: "La institución no puede recibir donaciones."
                });
            }

            updateFields.receiver_institution_id = receiver_institution_id;
        }

        // Si no enviaron nada
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).send({
                message: "Debe enviar al menos un campo para actualizar."
            });
        }

        await donation.update(updateFields);

        return res.status(200).json({
            message: "Donación actualizada correctamente.",
            data: donation
        });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).send({ message: "Error al actualizar donación." });
    }
};
const updateDonationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if(status !== "Scheduled" && status !== "Delivered" && status !== "Not Delivered"){
            return res.status(404).send({message:"Tiene que elegir un estado valido 'Scheduled', 'Delivered' o 'Not Delivered'. "})
        }

        const donation = await DONATION.findByPk(id);

        if (!donation) {
            return res.status(404).send({ message: "Donación no encontrada." });
        }

        const updateDonation = await DONATION.update(
            {status: status},
            {
                where:{
                    id: id
                }
            }
        )

        if(!updateDonation){
            return res.status(404).send({message: "No se pudo actualizar la donacion"})
        }
        return res.status(200).json({
            message: "Estado actualizado.",
            data: updateDonation
        });

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({ message: "Error al actualizar estado de donación." });
    }
};
const deleteDonation = async (req, res) => {
    try {
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const donation = await DONATION.findByPk(id);
        if (!donation) return res.status(404).send({ message: "Donación no encontrada." });

        await donation.destroy();

        return res.status(200).send({ message: "Donación eliminada con éxito." });

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({ message: "Error al eliminar donación." });
    }
};



// EXPORTAR TODOS
module.exports = {
    createDonation, // body
    getDonation, // params
    getDonations, //
    getDonationsByResponsable, // params
    getDonationsByDonor, // params
    getDonationsByVolunteerDonor, //params
    getDonationsByInstitutionDonor, //params
    getDonationsByReceiver, // params
    updateDonation, // params
    updateDonationStatus, // params y body
    deleteDonation // params
};

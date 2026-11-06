const USER = require('../models/user');
const DONATION = require('../models/donation');
const INSTITUTION = require('../models/institution');
const DONATIONITEM = require('../models/donationItem');

const IsString = require('../utils/isString.util');
const IsDate = require('../utils/isDate.util')
const TransformDate = require('../utils/transformDate.util');
const { where, Op } = require('sequelize');


const createDonation = async (req, res) => {
    try {
        // responsables lo saco del token
        const responsable_user = req.user_find;
        if (!responsable_user || !responsable_user.id) {
            return res.status(401).json({ message: "Usuario no autenticado." });
        }

        const {
            note,
            donation_date, // puede incluir hora o no
            donor_id,
            receiver_institution_id
        } = req.body;

        if (!donation_date || !IsDate(donation_date) || !Number.isInteger(Number(donor_id)) || Number(donor_id) <= 0 || !Number.isInteger(Number(receiver_institution_id)) || Number(receiver_institution_id) <= 0) {
            return res.status(400).json({ message: "Indique fecha válida, donante y una institución receptora." });
        }

        // Evitar duplicados: mismo donor_id + misma receiver + misma fecha (día)
        const start = TransformDate.startOfDay(donation_date);
        const end = TransformDate.endOfDay(donation_date);

        const existDonation = await DONATION.findOne({
            where: {
                donor_id: Number(donor_id),
                receiver_institution_id: Number(receiver_institution_id),
                donation_date: {
                    [Op.between]: [start, end]
                }
            }
        });

        if (existDonation) {
            return res.status(409).json({ message: "Ya existe una donación para ese donante y receptor en la misma fecha." });
        }

        const newDonation = await DONATION.create({
            note,
            donation_date,
            donor_id: Number(donor_id),
            receiver_institution_id: Number(receiver_institution_id),
            responsable_user_id: responsable_user.id
        });

        return res.status(201).json({
            message: "Donación creada con éxito.",
            data: newDonation
        });
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({ message: "Error al intentar crear una donacion." });
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
                { model: 
                    USER, as: "responsable", 
                    attributes: ["first_name", "last_name","email"] },
                { 
                    model: 
                    USER, as: "donor", 
                    attributes: ["first_name", "last_name","email"] },
                { 
                    model: 
                    INSTITUTION, as: "receiver_institution", attributes: ["name"] }
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
                { 
                    model: 
                    USER, as: "responsable", 
                    attributes: ["id", "first_name","last_name"] },
                { 
                    model: 
                    USER, as: "donor", 
                    attributes: ["id", "first_name","last_name"] },
                { 
                    model: 
                    INSTITUTION, as: "receiver_institution", attributes: ["id", "name"] }
            ],
            order: [["donation_date", "DESC"]]
        });

        return res.status(200).json({
            message: "Se encontraron las donaciones",
            data: list
        });

    } catch (err) {
        console.error("Error al obtener donaciones:", err.message);
        res.status(500).send({ message: "Error al obtener donaciones." });
    }
};
const getDonationsByResponsable = async (req, res) => {
    try {
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }
        id = Number(id);

        const list = await DONATION.findAll({
            where: { 
                responsable_user_id: id 
            }

        });

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
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }
        id = Number(id);

        const list = await DONATION.findAll({
            where: { 
                donor_id: id 
            }
        });

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
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }
        id = Number(id);

        const user = await USER.findByPk(id);

        if (!user || user.role_id !== 5) {
            return res.status(400).send({ message: "El usuario no es un voluntario." });
        }

        const list = await DONATION.findAll({
            where: { 
                donor_id: id 
            }
        }); 

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
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }
        id = Number(id);

        const user = await USER.findByPk(id, {
            include: INSTITUTION
        });

        if (!user || user.role_id !== 4) {
            return res.status(400).send({ message: "El usuario no es una institución." });
        }

        const list = await DONATION.findAll({
            where: { 
                donor_id: id 
            }
        });

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
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }
        id = Number(id);

        const list = await DONATION.findAll({
            where: { 
                receiver_institution_id: id 
            }
        });


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
        let { donation_id } = req.params;

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
            donor_id,
            receiver_institution_id
        } = req.body;

        const updateFields = {};


        // VALIDAR ROL DEL USUARIO QUE HACE EL CAMBIO
        const userFound = req.user_find;
        if (!userFound)
            return res.status(401).send({ message: "Usuario no autenticado." });

        if (userFound.rol !== 1 && userFound.rol !== 3) {
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

        // DONOR_ID
        if (donor_id !== undefined) {
            if (!Number.isInteger(Number(donor_id)) || Number(donor_id) <= 0) {
                return res.status(400).send({ message: "donor_id debe ser número." });
            }

            const donor = await USER.findByPk(Number(donor_id));

            if (!donor)
                return res.status(404).send({ message: "El donante no existe." });

            // Institución (role_id = 4)
            if (donor.role_id === 4) {
                if (!donor.institution_id) {
                    return res.status(400).send({ message: "La institución del donante no existe." });
                }
                const institution = await INSTITUTION.findByPk(donor.institution_id)
                if (!institution) return res.status(400).send({ message: "La institución del donante no existe." });
                const type = institution.institutionType;

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

            updateFields.donor_id = Number(donor_id);
        }

        // RECEIVER_INSTITUTION_ID
        if (receiver_institution_id !== undefined) {

            if (!Number.isInteger(Number(receiver_institution_id)) || Number(receiver_institution_id) <= 0) {
                return res.status(400).send({
                    message: "receiver_institution_id debe ser número."
                });
            }

            const receiver = await INSTITUTION.findByPk(Number(receiver_institution_id));
            if (!receiver)
                return res.status(404).send({ message: "La institución receptora no existe." });

            if (receiver.institutionType !== "Recipient" &&
                receiver.institutionType !== "Both") {
                return res.status(400).send({
                    message: "La institución no puede recibir donaciones."
                });
            }

            updateFields.receiver_institution_id = Number(receiver_institution_id);
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

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) return res.status(400).json({ message: "ID inválido." });
        if (req.user_find?.rol !== 1 && req.user_find?.rol !== 3) return res.status(403).json({ message: "No tiene permisos para actualizar donaciones." });

        const donation = await DONATION.findByPk(Number(id));
        if (!donation) {
            return res.status(404).send({ message: "Donación no encontrada." });
        }

        if(status !== "Scheduled" && status !== "Delivered" && status !== "Not Delivered"){
            return res.status(404).send({message:"Tiene que elegir un estado valido 'Scheduled', 'Delivered' o 'Not Delivered'. "})
        } 

        await donation.update({ status });

        return res.status(200).json({
            message: "Estado actualizado."
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

        const transaction = await DONATION.sequelize.transaction();
        try {
            await DONATIONITEM.destroy({ where: { donation_id: id }, transaction });
            await donation.destroy({ transaction });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }

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

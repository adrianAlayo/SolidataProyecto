const USER = require('../models/user');
const INSTITUTION = require('../models/institution');
const IsDate = require('../utils/isDate.util');

module.exports = async function validateDonation(req, res, next) {
  try {
    const role = req.user_find?.rol;
    if (role !== 1 && role !== 3) {
      return res.status(403).json({ message: 'No tiene permisos para registrar donaciones.' });
    }

    const { donation_date, donor_id, receiver_institution_id, note } = req.body;
    if (!donation_date || !IsDate(donation_date) || !donor_id || !receiver_institution_id || !Number.isInteger(Number(donor_id)) || !Number.isInteger(Number(receiver_institution_id)) || Number(donor_id) <= 0 || Number(receiver_institution_id) <= 0) {
      return res.status(400).json({ message: 'Indique una fecha válida, un donante y una institución receptora.' });
    }
    if (note !== undefined && typeof note !== 'string') {
      return res.status(400).json({ message: 'La nota debe ser texto.' });
    }

    const donor = await USER.findByPk(Number(donor_id));
    if (!donor || (donor.role_id !== 4 && donor.role_id !== 5)) {
      return res.status(400).json({ message: 'El donante debe ser una institución donante o un voluntario.' });
    }
    if (donor.role_id === 4) {
      const donorInstitution = await INSTITUTION.findByPk(donor.institution_id);
      if (!donorInstitution || !['Donor', 'Both'].includes(donorInstitution.institutionType)) {
        return res.status(400).json({ message: 'La institución seleccionada no puede donar.' });
      }
    }

    const receiver = await INSTITUTION.findByPk(Number(receiver_institution_id));
    if (!receiver || !['Recipient', 'Both'].includes(receiver.institutionType)) {
      return res.status(400).json({ message: 'Seleccione una institución receptora válida.' });
    }

    req.donationDonor = donor;

    next();
  } catch (error) {
    console.error('Error al validar donación:', error.message);
    return res.status(500).json({ message: 'No se pudo validar la donación.' });
  }
};

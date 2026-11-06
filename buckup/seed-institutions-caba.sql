-- Instituciones ficticias opcionales para probar los marcadores del mapa en CABA.
-- Las ubicaciones son localidades, no direcciones exactas. El mapa las mostrará
-- como aproximadas al centro de cada localidad tras ejecutar “Revisar direcciones”.
-- Ejecutar solo sobre una base de prueba ya inicializada.

INSERT INTO "Institutions" (name, location, "institutionType", status)
VALUES
  ('Comedor Comunitario Puentes de Barracas', 'Barracas, Ciudad Autónoma de Buenos Aires', 'Recipient', 'Active'),
  ('Centro Vecinal La Esperanza de La Boca', 'La Boca, Ciudad Autónoma de Buenos Aires', 'Recipient', 'Active'),
  ('Merendero Ronda de Flores', 'Flores, Ciudad Autónoma de Buenos Aires', 'Recipient', 'Active'),
  ('Asociación Solidaria Parque Patricios', 'Parque Patricios, Ciudad Autónoma de Buenos Aires', 'Recipient', 'Active'),
  ('Centro Comunitario Los Aromos de Mataderos', 'Mataderos, Ciudad Autónoma de Buenos Aires', 'Recipient', 'Active')
ON CONFLICT (name) DO NOTHING;

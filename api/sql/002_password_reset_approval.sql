-- Agrega el estado para solicitar y habilitar el cambio de contraseña.
ALTER TABLE public."Users"
    ADD COLUMN IF NOT EXISTS password_reset_requested boolean NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS password_reset_approved boolean NOT NULL DEFAULT false;

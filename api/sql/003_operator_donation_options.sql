-- Permite que el Operador cargue donantes e instituciones al crear una donación.
-- Ejecutar una vez en bases existentes; se puede repetir sin duplicar permisos.
BEGIN;

INSERT INTO public."RolePermissions" ("role_id", "permission_id")
SELECT role_row.id, permission_row.id
FROM public."Roles" AS role_row
JOIN public."Permissions" AS permission_row ON TRUE
JOIN public."Entities" AS entity_row ON entity_row.id = permission_row.entity_id
JOIN public."Actions" AS action_row ON action_row.id = permission_row.action_id
WHERE role_row.name = 'Operador'
  AND (
    (entity_row.name = 'USERS' AND action_row.name = 'READ')
    OR
    (entity_row.name = 'INSTITUTIONS' AND action_row.name = 'READ')
  )
ON CONFLICT DO NOTHING;

COMMIT;

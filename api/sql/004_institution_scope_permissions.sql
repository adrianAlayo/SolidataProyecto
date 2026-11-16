-- Permisos de consulta necesarios para que instituciones vean articulos e items
-- relacionados con sus necesidades y entregas. El backend aplica filtro por institución.
-- El Coordinador supervisa estados/asignaciones; el Operador registra donaciones e ítems.
BEGIN;

INSERT INTO public."RolePermissions" ("role_id", "permission_id")
SELECT r.id, p.id
FROM public."Roles" r
JOIN public."Permissions" p ON TRUE
JOIN public."Entities" e ON e.id = p.entity_id
JOIN public."Actions" a ON a.id = p.action_id
WHERE r.name = 'Institución'
  AND ((e.name = 'ARTICLES' AND a.name = 'READ')
    OR (e.name = 'DONATIONITEMS' AND a.name = 'READ'))
ON CONFLICT DO NOTHING;

DELETE FROM public."RolePermissions" rp
USING public."Roles" r, public."Permissions" p, public."Entities" e, public."Actions" a
WHERE rp.role_id = r.id AND rp.permission_id = p.id
  AND p.entity_id = e.id AND p.action_id = a.id
  AND ((r.name = 'Operador'
        AND ((e.name = 'DONATIONS' AND a.name = 'CHANGE_STATUS')
          OR (e.name = 'INSTITUTIONNEEDS' AND a.name = 'APPROVE')))
    OR (r.name = 'Coordinador'
        AND ((e.name = 'DONATIONS' AND a.name = 'CREATE')
          OR (e.name = 'DONATIONITEMS' AND a.name = 'CREATE'))));

COMMIT;

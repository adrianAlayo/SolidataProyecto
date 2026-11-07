const permission = (entity, action) => ({ entity, action });

export const hasPermission = (permissions, entity, action) => {
  const normalize = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  return (permissions || []).some((item) =>
    normalize(item.entity) === normalize(entity) && normalize(item.action) === normalize(action)
  );
};

export const hasAnyPermission = (permissions, required = []) =>
  required.some(({ entity, action }) => hasPermission(permissions, entity, action));

export const PATH_PERMISSIONS = {
  "/admin/users/create": [permission("USERS", "CREATE")],
  "/admin/users/update": [permission("USERS", "UPDATE")],
  "/admin/users/delete": [permission("USERS", "DELETE")],
  "/admin/users/assignRol": [permission("ROLES", "ASSIGN")],
  "/admin/articles": [permission("ARTICLES", "READ"), permission("ARTICLES", "UPDATE"), permission("ARTICLES", "DELETE")],
  "/admin/articles/create": [permission("ARTICLES", "CREATE")],
  "/admin/roles/create": [permission("ROLES", "CREATE")],
  "/admin/roles/update": [permission("ROLES", "UPDATE")],
  "/admin/roles/delete": [permission("ROLES", "DELETE")],
  "/admin/donations/history": [permission("DONATIONS", "READ")],
  "/admin/deliveries": [permission("DONATIONS", "READ")],
  "/admin/donations/create": [permission("DONATIONS", "CREATE")],
  "/admin/donations/items": [permission("DONATIONITEMS", "READ")],
  "/admin/donations/items/create": [permission("DONATIONITEMS", "CREATE")],
  "/admin/institutions": [permission("INSTITUTIONS", "READ")],
  "/register/institution": [permission("INSTITUTIONS", "CREATE")],
  "/admin/needs": [
    permission("INSTITUTIONNEEDS", "READ"),
    permission("INSTITUTIONNEEDS", "CREATE"),
    permission("INSTITUTIONNEEDS", "UPDATE"),
    permission("INSTITUTIONNEEDS", "APPROVE"),
    permission("INSTITUTIONNEEDS", "DELETE")
  ],
  "/admin/inventory": [permission("INVENTORIES", "READ")],
  "/admin/inventories/create": [permission("INVENTORIES", "CREATE")],
  "/admin/inventories/update": [permission("INVENTORIES", "UPDATE")],
  "/admin/inventories/delete": [permission("INVENTORIES", "DELETE")],
  "/admin/reports": [
    permission("DONATIONS", "READ"),
    permission("INVENTORIES", "READ"),
    permission("USERS", "READ")
  ],
  "/admin/HighLow": [permission("USERS", "APPROVE")],
  "/admin/password-reset-requests": []
};

export const canAccessPath = (permissions, path) =>
  hasAnyPermission(permissions, PATH_PERMISSIONS[path] || []);

export const filterMenuByPermissions = (items, permissions, roleId) =>
  items.flatMap((item) => {
    if (item.adminOnly && Number(roleId) !== 1) return [];
    if (item.always) return [item];
    if (Array.isArray(item.children)) {
      const children = filterMenuByPermissions(item.children, permissions, roleId);
      return children.length ? [{ ...item, children }] : [];
    }
    if (item.adminOnly) return Number(roleId) === 1 ? [item] : [];
    return hasAnyPermission(permissions, item.requiredPermissions || []) ? [item] : [];
  });

export const homeForRole = (roleId) => ({
  1: "/admin/home",
  2: "/operator/home",
  3: "/admin/home",
  4: "/institution/home",
  5: "/en-desarrollo/Inicio de voluntario"
}[Number(roleId)] || "/");

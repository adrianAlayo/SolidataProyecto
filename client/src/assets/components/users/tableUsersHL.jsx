import React, { useCallback, useEffect, useState } from "react";
import Notification from "../Notification";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Typography, TextField
} from "@mui/material";

import { 
    getUsers,
    disableUser,
    activeUser
} from "../../services/user.service";
import TablePager from "../TablePager.jsx";

export default function UsersTable() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [query, setQuery] = useState("");
    const filteredUsers = users.filter((user) => `${user.first_name} ${user.last_name} ${user.email} ${user.phone || ""}`.toLowerCase().includes(query.toLowerCase()));
    const pageUsers = filteredUsers.slice(page * pageSize, (page + 1) * pageSize);

    // Notificaciones
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifMsg, setNotifMsg] = useState("");
    const [notifType, setNotifType] = useState("success");

    const showNotification = (message, type = "success") => {
        setNotifMsg(message);
        setNotifType(type);
        setNotifOpen(true);
    };

    const loadUsers = useCallback(async () => {
        try {
            const data = await getUsers();
            setUsers(data.data || []);
        } catch (error) {
            console.error("Error cargando usuarios", error);
            setNotifMsg("Error cargando usuarios");
            setNotifType("error");
            setNotifOpen(true);
        }
    }, []);

    useEffect(() => { loadUsers(); }, [loadUsers]);

    const handleActivate = async () => {
        try {
            const res = await activeUser(selectedUser.id);
            showNotification(res.message || "Usuario activado correctamente", "success");
            await loadUsers();
            setSelectedUser(null);
        } catch (error) {
            showNotification(
                error.response?.data?.message || "Error al activar usuario",
                "error"
            );
        }
    };


    const handleDisable = async () => {
        try {
            const res = await disableUser(selectedUser.id);
            showNotification(res.message || "Usuario desactivado correctamente", "success");
            await loadUsers();
            setSelectedUser(null);
        } catch (error) {
            showNotification(
                error.response?.data?.message || "Error al desactivar usuario",
                "error"
            );
        }
    };


    return (
        <Paper sx={{ maxWidth: 1120, mx: "auto", mt: 3, p: { xs: 1.5, sm: 2.5 }, borderRadius: 3, border: "1px solid #e5ebe6", boxShadow: "0 12px 32px #18331a0d" }}>
            <Typography variant="h5" sx={{ mb: 0.5, color: "#294333", fontWeight: 700 }}>
                Altas y bajas de usuarios
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "#7b897f" }}>Buscá por nombre, email o teléfono y elegí un registro para cambiar su estado.</Typography>
            <TextField fullWidth size="small" label="Buscar usuario" value={query} onChange={(event) => { setQuery(event.target.value); setPage(0); }} sx={{ mb: 2 }} />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Estado</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {pageUsers.map((u) => (
                            <TableRow
                                key={u.id}
                                hover
                                onClick={() => setSelectedUser(u)}
                                selected={selectedUser?.id === u.id}
                                sx={{ cursor: "pointer" }}
                            >
                                <TableCell>{u.id}</TableCell>
                                <TableCell>{u.first_name} {u.last_name}</TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell>{u.phone}</TableCell>
                                <TableCell>
                                    {u.is_active ? "Activo" : "Inactivo"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {filteredUsers.length === 0 ? <Typography sx={{ p: 2, color: "#7b897f" }}>No hay usuarios que coincidan con la búsqueda.</Typography> : <TablePager count={filteredUsers.length} page={page} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={(size) => { setPageSize(size); setPage(0); }} />}

            {selectedUser && (
                <div style={{ marginTop: "15px", display: "flex", gap: "12px" }}>
                    
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleActivate}
                    >
                        Activar
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDisable}
                    >
                        Desactivar
                    </Button>

                </div>
            )}

            {/* Notificación */}
            <Notification
                open={notifOpen}
                onClose={() => setNotifOpen(false)}
                message={notifMsg}
                type={notifType}
            />
        </Paper>
    );
}

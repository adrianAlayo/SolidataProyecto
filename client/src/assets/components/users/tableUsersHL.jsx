import React, { useEffect, useState } from "react";
import Notification from "../Notification";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Typography
} from "@mui/material";

import { 
    getUsers,
    disableUser,
    activeUser
} from "../../services/user.service";

export default function UsersTable() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    // Notificaciones
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifMsg, setNotifMsg] = useState("");
    const [notifType, setNotifType] = useState("success");

    const showNotification = (message, type = "success") => {
        setNotifMsg(message);
        setNotifType(type);
        setNotifOpen(true);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        try {
            const data = await getUsers();
            setUsers(data.data || []);
        } catch (error) {
            console.error("Error cargando usuarios", error);
            showNotification("Error cargando usuarios", "error");
        }
    }

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
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Lista de Usuarios
            </Typography>

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
                        {users.map((u) => (
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

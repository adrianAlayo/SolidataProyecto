import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton
} from "@mui/material";
import { Menu, ExpandLess, ExpandMore } from "@mui/icons-material";
import "./SideMenu.css";

export default function Sidebar({ mode = "admin" }) {
  const [open, setOpen] = useState(false);
  const [openForms, setOpenForms] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  // MENÚS SEGÚN USUARIO
  const menuAdmin = [
    { label: "Home" },
    { label: "Historial" },
    { label: "Solicitud" },
    {
      label: "Formularios",
      children: ["Existencia", "Negación"]
    }
  ];

  const menuEmployee = [
    { label: "Home" },
    { label: "Historial" },
    {
      label: "Formularios",
      children: ["Registro Donaciones", "Registro Donantes"]
    }
  ];

  const menu = mode === "admin" ? menuAdmin : menuEmployee;

  return (
    <>
      {/* BOTÓN HAMBURGUESA */}
      <IconButton onClick={toggleDrawer} className="sidebar-toggle" >
        <Menu />
      </IconButton>

      {/* SIDEBAR DESPLEGABLE */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <div className="sidebar-container">
          <List>
            {menu.map((item) => (
              <div key={item.label}>
                {!item.children ? (
                  <ListItemButton onClick={() => console.log(item.label)}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ) : (
                  <>
                    <ListItemButton onClick={() => setOpenForms(!openForms)}>
                      <ListItemText primary={item.label} />
                      {openForms ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={openForms} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.children.map((sub) => (
                          <ListItemButton key={sub} sx={{ pl: 4 }}>
                            <ListItemText primary={sub} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </>
                )}
              </div>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
}

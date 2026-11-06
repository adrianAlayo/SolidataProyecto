import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
} from "@mui/material";
import { Menu, ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import menuData from "./SideMenuData";
import "./SideMenu.css";

export default function SideMenu() {
  const [open, setOpen] = useState(false);

  // Estado dinámico para submenús (almacena qué ítems están abiertos)
  const [openMap, setOpenMap] = useState({});

  const navigate = useNavigate();
  const toggleDrawer = () => setOpen(!open);

  // --- Manejar apertura/cierre dinámico ---
  const toggleItem = (id) => {
    setOpenMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // --- Render recursivo para soportar submenús infinitos ---
  const renderMenu = (items, parentId = "") => (
    <List component="div" disablePadding>
      {items.map((item) => {
        const hasChildren = Array.isArray(item.children);
        const itemId = parentId ? `${parentId}/${item.label}` : item.label;

        return (
          <div key={itemId}>
            <ListItemButton
              sx={{ pl: parentId ? 4 : 2 }}
              onClick={() => {
                if (hasChildren) {
                  toggleItem(itemId);
                } else {
                  navigate(item.path);
                }
              }}
            >
              <ListItemText primary={item.label} />
              {hasChildren &&
                (openMap[itemId] ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            {/* Submenús */}
            {hasChildren && (
              <Collapse in={!!openMap[itemId]} timeout="auto" unmountOnExit>
                {renderMenu(item.children, itemId)}
              </Collapse>
            )}
          </div>
        );
      })}
    </List>
  );

  return (
    <>
      {/* BOTÓN HAMBURGUESA */}
      <IconButton onClick={toggleDrawer} className="sidebar-toggle" aria-label="Abrir menú lateral">
        <Menu />
      </IconButton>

      {/* SIDEBAR */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <div className="sidebar-container">{renderMenu(menuData)}</div>
      </Drawer>
    </>
  );
}

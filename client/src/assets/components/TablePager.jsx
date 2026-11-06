import { useEffect } from "react";
import "./TablePager.css";

export default function TablePager({ count, page, pageSize, onPageChange, onPageSizeChange }) {
  const pages = Math.max(1, Math.ceil(count / pageSize));
  useEffect(() => { if (page >= pages) onPageChange(pages - 1); }, [page, pages, onPageChange]);
  const first = count ? page * pageSize + 1 : 0;
  const last = Math.min((page + 1) * pageSize, count);
  return <div className="tablePager"><span>{first}–{last} de {count}</span><label>Filas <select aria-label="Filas por página" value={pageSize} onChange={(event) => onPageSizeChange(Number(event.target.value))}><option value={5}>5</option><option value={10}>10</option><option value={15}>15</option><option value={20}>20</option></select></label><button type="button" disabled={page === 0} onClick={() => onPageChange(page - 1)}>Anterior</button><span>Página {page + 1} de {pages}</span><button type="button" disabled={page + 1 >= pages} onClick={() => onPageChange(page + 1)}>Siguiente</button></div>;
}

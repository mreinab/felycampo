'use client';

/* ============================================================
   ADMIN SIDEBAR — Fely Campo
   Navegación fija del panel interno. El grupo "Productos" se
   auto-expande cuando la ruta activa cae dentro de /admin/productos.
   ============================================================ */

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Palette,
  Star,
  Package,
  MessageCircle,
  Tag,
  Shirt,
  FileText,
  Newspaper,
  Boxes,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import styles from './AdminSidebar.module.css';

const enlaces = [
  { href: '/admin', label: 'Dashboard', icono: LayoutDashboard },
  {
    label: 'Productos',
    icono: ShoppingBag,
    base: '/admin/productos',
    hijos: [
      { href: '/admin/productos/pret-a-porter', label: 'Prêt-à-porter' },
      { href: '/admin/productos/atelier', label: 'Atelier' },
      { href: '/admin/productos/archivo', label: 'Archive/Colecciones' },
    ],
  },
  { href: '/admin/diseno', label: 'Diseño', icono: Palette },
  { href: '/admin/resenas', label: 'Reseñas', icono: Star },
  { href: '/admin/pedidos', label: 'Pedidos', icono: Package },
  { href: '/admin/consultas', label: 'Consultas/Citas', icono: MessageCircle },
  { href: '/admin/categorias', label: 'Categorías', icono: Tag },
  { href: '/admin/materiales', label: 'Materiales', icono: Shirt },
  { href: '/admin/contenido', label: 'Contenido', icono: FileText },
  { href: '/admin/blog', label: 'Blog', icono: Newspaper },
  { href: '/admin/stock', label: 'Stock', icono: Boxes },
  { href: '/admin/extras', label: 'Extras', icono: Sparkles },
];

function AdminSidebar() {
  const pathname = usePathname();
  const [productosAbierto, setProductosAbierto] = useState(pathname.startsWith('/admin/productos'));

  return (
    <nav className={styles.sidebar} aria-label="Navegación del panel">
      <Link href="/admin" className={styles.marca}>Fely Campo</Link>

      <ul className={styles.lista}>
        {enlaces.map((item) => {
          if (item.hijos) {
            const activo = pathname.startsWith(item.base);
            const Icono = item.icono;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  className={`${styles.itemGrupo} ${activo ? styles.activo : ''}`}
                  aria-expanded={productosAbierto}
                  onClick={() => setProductosAbierto((valor) => !valor)}
                >
                  <Icono className={styles.icono} aria-hidden="true" />
                  <span className={styles.label}>{item.label}</span>
                  <ChevronDown className={`${styles.chevron} ${productosAbierto ? styles.chevronAbierto : ''}`} aria-hidden="true" />
                </button>
                {productosAbierto && (
                  <ul className={styles.sublista}>
                    {item.hijos.map((hijo) => (
                      <li key={hijo.href}>
                        <Link
                          href={hijo.href}
                          className={`${styles.subitem} ${pathname === hijo.href ? styles.activo : ''}`}
                        >
                          {hijo.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          }

          const Icono = item.icono;
          const activo = pathname === item.href;
          return (
            <li key={item.href}>
              <Link href={item.href} className={`${styles.item} ${activo ? styles.activo : ''}`}>
                <Icono className={styles.icono} aria-hidden="true" />
                <span className={styles.label}>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <Link href="/" className={styles.verWeb}>Ver web pública</Link>
    </nav>
  );
}

export default AdminSidebar;

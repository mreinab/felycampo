'use client';

/* ============================================================
   ADMIN SIDEBAR — Fely Campo
   Navegación fija del panel interno. Los 3 tipos de producto son ítems de
   primer nivel, no un submenú colapsable "Productos" que los contiene —
   Prêt-à-porter/Atelier están en el grupo "Productos", Runway
   (`tipo: 'archivo'` internamente, ver mockData.js) vive solo en su propio
   grupo "Colecciones". Cada uno conserva su propio desplegable de
   categorías (chevron aparte, igual que antes).
   ============================================================ */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCategorias } from './Categorias';
import { codigoTemporada } from '@/components/admin/mockData';
import {
  Home,
  Palette,
  Star,
  Package,
  MessageCircle,
  Tag,
  Shirt,
  Layers,
  FileText,
  Newspaper,
  Boxes,
  Sparkles,
  ChevronDown,
  Scissors,
  Archive,
  Heart,
  PartyPopper,
  Users,
  BarChart3,
  Settings,
  Mail,
  MessageCircleQuestionMark,
} from 'lucide-react';
import styles from './AdminSidebar.module.css';

const grupos = [
  {
    titulo: null,
    items: [
      { href: '/admin', label: 'Home', icono: Home },
    ],
  },
  {
    titulo: 'Ventas',
    items: [
      {
        href: '/admin/pedidos', label: 'Pedidos', icono: Package, nuevos: 3,
      },
      {
        href: '/admin/consultas-precio', label: 'Consultas', icono: MessageCircleQuestionMark, nuevos: 2,
      },
      { href: '/admin/metricas', label: 'Métricas', icono: BarChart3 },
    ],
  },
  {
    titulo: 'Productos',
    items: [
      {
        href: '/admin/productos/pret-a-porter', label: 'Prêt-à-porter', icono: Shirt, tipo: 'pret-a-porter',
      },
      {
        href: '/admin/productos/atelier', label: 'Atelier', icono: Scissors, tipo: 'atelier',
      },
      { href: '/admin/categorias', label: 'Categorías', icono: Tag },
      { href: '/admin/stock', label: 'Stock', icono: Boxes },
      { href: '/admin/materiales', label: 'Tus Materiales', icono: Layers },
    ],
  },
  {
    titulo: 'Colecciones',
    items: [
      {
        href: '/admin/colecciones/runway', label: 'Runway', icono: Archive, tipo: 'archivo',
      },
      {
        href: '/admin/colecciones/novia', label: 'Novia', icono: Heart, tipo: 'novia',
      },
      {
        href: '/admin/colecciones/fiesta', label: 'Fiesta', icono: PartyPopper, tipo: 'fiesta',
      },
    ],
  },
  {
    titulo: 'Clientes',
    items: [
      { href: '/admin/clientes', label: 'Clientes', icono: Users },
      { href: '/admin/newsletter', label: 'Newsletter', icono: Mail },
      { href: '/admin/resenas', label: 'Reseñas', icono: Star },
      { href: '/admin/consultas', label: 'Consultas/Citas', icono: MessageCircle },
    ],
  },
  {
    titulo: 'Contenido',
    items: [
      { href: '/admin/diseno', label: 'Diseño', icono: Palette },
      { href: '/admin/contenido', label: 'Contenido', icono: FileText },
      { href: '/admin/blog', label: 'Blog', icono: Newspaper },
    ],
  },
  {
    titulo: 'Sistema',
    items: [
      { href: '/admin/extras', label: 'Extras', icono: Sparkles },
      { href: '/admin/settings', label: 'Settings', icono: Settings },
    ],
  },
];

const itemsConCategorias = grupos.flatMap((grupo) => grupo.items).filter((item) => item.tipo);

export function AdminMarca() {
  return (
    <Link href="/admin" className={styles.marca}>
      <Image
        src="/img/logo/felycampo-admin-logo.jpg"
        alt="Fely Campo"
        width={44}
        height={44}
        className={styles.marcaLogo}
        priority
      />
      <div className={styles.marcaTexto}>
        <p className={styles.marcaNombre}>Admin Panel</p>
        <p className={styles.marcaSubtitulo}>Fely Campo</p>
      </div>
    </Link>
  );
}

function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoriaActiva = searchParams.get('categoria');
  const { categorias } = useCategorias();
  const [subAbiertos, setSubAbiertos] = useState(() => {
    const itemActivo = itemsConCategorias.find((item) => pathname === item.href);
    return itemActivo ? { [itemActivo.href]: true } : {};
  });

  useEffect(() => {
    const itemActivo = itemsConCategorias.find((item) => pathname === item.href);
    if (itemActivo) setSubAbiertos((actual) => (actual[itemActivo.href] ? actual : { ...actual, [itemActivo.href]: true }));
  }, [pathname]);

  function renderEnlace(item) {
    if (item.tipo) {
      const Icono = item.icono;
      const categoriasItem = (categorias[item.tipo] || []).filter((c) => c.visible);
      const enRuta = pathname === item.href;
      const tieneCategorias = categoriasItem.length > 0;
      const subAbierto = Boolean(subAbiertos[item.href]);
      return (
        <li key={item.href}>
          <div className={`${styles.item} ${enRuta && !categoriaActiva ? styles.activo : ''}`}>
            <Link
              href={item.href}
              className={styles.itemEnlace}
              onClick={() => {
                if (tieneCategorias) setSubAbiertos((actual) => ({ ...actual, [item.href]: true }));
              }}
            >
              <Icono className={styles.icono} aria-hidden="true" />
              <span className={styles.label}>{item.label}</span>
            </Link>
            {tieneCategorias && (
              <button
                type="button"
                className={styles.chevronBoton}
                aria-expanded={subAbierto}
                aria-label={`${subAbierto ? 'Ocultar' : 'Mostrar'} categorías de ${item.label}`}
                onClick={() => setSubAbiertos((actual) => ({ ...actual, [item.href]: !actual[item.href] }))}
              >
                <ChevronDown className={`${styles.chevron} ${subAbierto ? styles.chevronAbierto : ''}`} aria-hidden="true" />
              </button>
            )}
          </div>
          {tieneCategorias && subAbierto && (
            <ul className={styles.sublista}>
              {categoriasItem.map((cat) => {
                const hrefCategoria = `${item.href}?categoria=${cat.id}`;
                const activo = enRuta && categoriaActiva === cat.id;
                return (
                  <li key={cat.id}>
                    <Link
                      href={hrefCategoria}
                      className={`${styles.subitem} ${activo ? styles.activo : ''}`}
                    >
                      <span>{cat.temporada ? `${cat.nombre} (${codigoTemporada(cat.temporada)})` : cat.nombre}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      );
    }

    const Icono = item.icono;
    const activo = item.href === '/admin'
      ? pathname === '/admin'
      : (pathname === item.href || pathname.startsWith(`${item.href}/`));
    return (
      <li key={item.href}>
        <Link href={item.href} className={`${styles.item} ${activo ? styles.activo : ''}`}>
          <Icono className={styles.icono} aria-hidden="true" />
          <span className={styles.label}>{item.label}</span>
          {item.nuevos > 0 && <span className={styles.contador}>{item.nuevos}</span>}
        </Link>
      </li>
    );
  }

  return (
    <nav className={styles.sidebar} aria-label="Navegación del panel">
      <div className={styles.lista}>
        {grupos.map((grupo, indice) => (
          <div key={grupo.titulo || `grupo-${indice}`} className={styles.grupo}>
            {grupo.titulo && <p className={styles.tituloGrupo}>{grupo.titulo}</p>}
            <ul className={styles.grupoLista}>
              {grupo.items.map((item) => renderEnlace(item))}
            </ul>
          </div>
        ))}
      </div>

      <Link href="/" className={styles.verWeb}>Ver web pública</Link>
    </nav>
  );
}

export default AdminSidebar;

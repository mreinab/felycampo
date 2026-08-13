'use client';

/* ============================================================
   ADMIN SIDEBAR — Fely Campo
   Navegación fija del panel interno. El grupo "Productos" se
   auto-expande al entrar en /admin/productos, pero nunca se cierra
   solo al navegar a otra sección — solo el usuario lo cierra, con el
   toggle del propio grupo.
   ============================================================ */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCategorias } from './Categorias';
import {
  Home,
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
  Scissors,
  Archive,
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
      {
        label: 'Productos',
        icono: ShoppingBag,
        base: '/admin/productos',
        hijos: [
          {
            href: '/admin/productos/pret-a-porter', label: 'Prêt-à-porter /Tienda online', icono: Shirt, tipo: 'pret-a-porter',
          },
          {
            href: '/admin/productos/atelier', label: 'Atelier', icono: Scissors, tipo: 'atelier',
          },
          {
            href: '/admin/productos/archivo', label: 'Archive/Colecciones', icono: Archive, tipo: 'archivo',
          },
        ],
      },
      { href: '/admin/categorias', label: 'Categorías', icono: Tag },
      { href: '/admin/stock', label: 'Stock', icono: Boxes },
      { href: '/admin/analiticas', label: 'Analíticas', icono: BarChart3 },
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
      { href: '/admin/materiales', label: 'Materiales', icono: Shirt },
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

const hijosConSubmenu = grupos
  .flatMap((grupo) => grupo.items)
  .filter((item) => item.hijos)
  .flatMap((item) => item.hijos);

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
  const [productosAbierto, setProductosAbierto] = useState(pathname.startsWith('/admin/productos'));
  const [subAbiertos, setSubAbiertos] = useState(() => {
    const hijoActivo = hijosConSubmenu.find((hijo) => pathname === hijo.href);
    return hijoActivo ? { [hijoActivo.href]: true } : {};
  });

  useEffect(() => {
    if (pathname.startsWith('/admin/productos')) setProductosAbierto(true);
    const hijoActivo = hijosConSubmenu.find((hijo) => pathname === hijo.href);
    if (hijoActivo) setSubAbiertos((actual) => (actual[hijoActivo.href] ? actual : { ...actual, [hijoActivo.href]: true }));
  }, [pathname]);

  function renderEnlace(item) {
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
              {item.hijos.map((hijo) => {
                const IconoHijo = hijo.icono;
                const categoriasHijo = (categorias[hijo.tipo] || []).filter((c) => c.visible);
                const enRutaHijo = pathname === hijo.href;
                const tieneCategorias = categoriasHijo.length > 0;
                const subAbierto = Boolean(subAbiertos[hijo.href]);
                return (
                  <li key={hijo.href}>
                    <div className={`${styles.subitem} ${enRutaHijo && !categoriaActiva ? styles.activo : ''}`}>
                      <Link href={hijo.href} className={styles.subitemEnlace}>
                        <IconoHijo className={styles.iconoSub} aria-hidden="true" />
                        <span className={styles.label}>{hijo.label}</span>
                      </Link>
                      {tieneCategorias && (
                        <button
                          type="button"
                          className={styles.chevronBoton}
                          aria-expanded={subAbierto}
                          aria-label={`${subAbierto ? 'Ocultar' : 'Mostrar'} categorías de ${hijo.label}`}
                          onClick={() => setSubAbiertos((actual) => ({ ...actual, [hijo.href]: !actual[hijo.href] }))}
                        >
                          <ChevronDown className={`${styles.chevron} ${subAbierto ? styles.chevronAbierto : ''}`} aria-hidden="true" />
                        </button>
                      )}
                    </div>
                    {tieneCategorias && subAbierto && (
                      <ul className={styles.sublista}>
                        {categoriasHijo.map((cat) => {
                          const hrefCategoria = `${hijo.href}?categoria=${cat.id}`;
                          const activo = enRutaHijo && categoriaActiva === cat.id;
                          return (
                            <li key={cat.id}>
                              <Link
                                href={hrefCategoria}
                                className={`${styles.subitem} ${activo ? styles.activo : ''}`}
                              >
                                <span>{cat.nombre}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
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

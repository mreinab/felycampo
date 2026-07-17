// Navbar.jsx

'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ShoppingBag } from 'lucide-react';
import styles from './Navbar.module.css';
import { PanelLateral } from '../../ui';
import NavbarPanelLateralContent from './NavbarPanelLateralContent';

// Enlaces con submenú (Atelier, Prêt-à-porter — coinciden con las
// categorías reales del sitemap). El resto son enlaces simples, sin panel.
// Los labels viven en messages/{locale}.json bajo el namespace "nav" —
// aquí solo se guarda la estructura (hrefs, claves de traducción, imagen).
const SUBMENU_STRUCTURE = {
  atelier: {
    items: [
      { key: 'novias', href: '/atelier/novias' },
      { key: 'fiesta', href: '/atelier/fiesta' },
    ],
    image: '/img/styleguide/punto-venta.webp',
  },
  pretAPorter: {
    items: [
      { key: 'vestidos', href: '/pret-a-porter/vestidos' },
      { key: 'faldas', href: '/pret-a-porter/faldas' },
    ],
    image: '/img/styleguide/prod-tarjeta.webp',
  },
  elMundoDeFely: {
    items: [
      { key: 'historia', href: '/about/fely-campo' },
      { key: 'archivo', href: '/archivo' },
      { key: 'runway', href: '/archivo/runway' },
    ],
    image: '/img/styleguide/prod-tarjeta-relacionado.webp',
  },
  visitanos: {
    items: [
      { key: 'salamanca', href: '/visitenos/salamanca' },
      { key: 'madrid', href: '/visitenos/madrid' },
      { key: 'oviedo', href: '/visitenos/oviedo' },
      { key: 'puntosDeVenta', href: '/visitenos' },
      { key: 'reservarCita', href: '/visitenos/cita' },
    ],
    image: '/img/styleguide/prod-tarjeta-hover.webp',
  },
};

const NAV_ITEMS = [
  { key: 'atelier', href: '/atelier', submenu: 'atelier' },
  { key: 'pretAPorter', href: '/pret-a-porter', submenu: 'pretAPorter' },
  { key: 'elMundoDeFely', href: '/el-mundo-de-fely', submenu: 'elMundoDeFely' },
  { key: 'visitanos', href: '/visitenos', submenu: 'visitanos' },
];

const CLOSE_DELAY_MS = 200;
const SCROLL_THRESHOLD_PX = 50;

function Navbar({ transparent = false }) {
  const t = useTranslations('nav');
  const locale = useLocale();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [lastSubmenu, setLastSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [headerHovered, setHeaderHovered] = useState(false);
  const closeTimeout = useRef(null);
  const headerLeaveTimeout = useRef(null);

  useEffect(() => () => {
    clearTimeout(closeTimeout.current);
    clearTimeout(headerLeaveTimeout.current);
  }, []);

  // Solo importa combinado con la prop "transparent" (ver Navbar.module.css):
  // decide si el fondo pasa de transparente a blanco al hacer scroll.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openSubmenu = (key) => {
    clearTimeout(closeTimeout.current);
    setActiveSubmenu(key);
    setLastSubmenu(key);
  };

  const scheduleSubmenuClose = () => {
    clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setActiveSubmenu(null), CLOSE_DELAY_MS);
  };

  const cancelSubmenuClose = () => clearTimeout(closeTimeout.current);

  // Cierre inmediato (sin el retardo anti-parpadeo de scheduleSubmenuClose):
  // es un clic explícito del usuario sobre el overlay, no un hover-out.
  const closeSubmenu = () => {
    clearTimeout(closeTimeout.current);
    setActiveSubmenu(null);
  };

  // El logo cambia de tamaño con el hover (isLight/solido más abajo), y
  // eso mueve el propio elemento que se está hovereando: al encoger, el
  // cursor puede quedar fuera de él, lo que dispara un mouseleave, que
  // lo vuelve a agrandar, que lo vuelve a poner bajo el cursor... Con
  // retardo antes de confirmar la salida (igual que scheduleSubmenuClose)
  // se corta ese bucle.
  const handleHeaderMouseEnter = () => {
    clearTimeout(headerLeaveTimeout.current);
    setHeaderHovered(true);
  };

  const handleHeaderMouseLeave = () => {
    headerLeaveTimeout.current = setTimeout(() => setHeaderHovered(false), CLOSE_DELAY_MS);
  };

  const displayedSubmenu = lastSubmenu && SUBMENU_STRUCTURE[lastSubmenu];

  // Todos los enlaces internos del Navbar llevan el locale activo por
  // delante (/es/atelier, /en/atelier...) para que navegar por el sitio
  // no resetee el idioma elegido — el middleware, si no, redirigiría
  // cualquier ruta sin prefijo al locale por defecto (es).
  const withLocale = (href) => (href === '/' ? `/${locale}` : `/${locale}${href}`);

  // El fondo se vuelve sólido por scroll O por hover (antes esto último
  // era un :hover puro en CSS). Ahora lo llevamos a JS porque el logo
  // (un <img src>, no se puede tintar con CSS) tiene que cambiar de
  // imagen exactamente a la vez que el fondo y el texto.
  const solido = scrolled || headerHovered;
  const isLight = transparent && !solido;

  const headerClass = [
    styles.header,
    transparent && styles.transparent,
    transparent && solido && styles.opaco,
    isLight && styles.light,
  ].filter(Boolean).join(' ');

  const navLogoClassName = isLight ? `${styles.navLogo} ${styles.navLogoGrande}` : styles.navLogo;

  return (
    <>
    <header
      className={headerClass}
      onMouseEnter={handleHeaderMouseEnter}
      onMouseLeave={handleHeaderMouseLeave}
    >
      <div className={styles.navRow}>

        {/* Botón hamburguesa — solo visible en móvil. Es el mismo botón que
            cierra el menú: las dos barras rotan hasta formar una X. Sigue
            siendo clicable con el menú abierto porque el panel móvil
            arranca debajo de .navRow, no lo tapa (ver .sobreNavbar en
            PanelLateral.module.css). */}
        <button
          type="button"
          className={styles.navToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? t('aria.cerrarMenu') : t('aria.abrirMenu')}
          aria-expanded={mobileMenuOpen}
        >
          <span className={`${styles.navToggleBar} ${mobileMenuOpen ? styles.navToggleBarTopOpen : styles.navToggleBarTop}`} />
          <span className={`${styles.navToggleBar} ${mobileMenuOpen ? styles.navToggleBarBottomOpen : styles.navToggleBarBottom}`} />
        </button>

        {/* Enlaces — solo visibles en escritorio. Los que tienen submenú
            lo abren al hacer hover (con retardo de cierre anti-parpadeo). */}
        <nav className={styles.navLinks}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={withLocale(item.href)}
              className={styles.navLink}
              onMouseEnter={() => item.submenu && openSubmenu(item.submenu)}
              onMouseLeave={() => item.submenu && scheduleSubmenuClose()}
            >
              {t(`links.${item.key}`)}
            </a>
          ))}
        </nav>

        {/* Logo, siempre visible, centrado */}
        <a href={withLocale('/')} className={styles.navLogoLink}>
          <img
            src={isLight ? '/img/logo/logo-white-felycampo.png' : '/img/logo/logo-felycampo.png'}
            alt="Fely Campo"
            className={navLogoClassName}
          />
        </a>

        {/* Utilidades — escritorio: texto completo */}
        <div className={styles.navActions}>
          <a href={withLocale('/wishlist')} className={styles.navLink}>{t('actions.wishlist')}</a>
          <a href={withLocale('/mi-cuenta')} className={styles.navLink}>{t('actions.miCuenta')}</a>
          <a href={withLocale('/carrito')} className={styles.navLink}>{t('actions.carrito')}</a>
        </div>

        {/* Utilidades — móvil: solo el icono del carrito, el resto vive en el menú hamburguesa */}
        <a href={withLocale('/carrito')} className={styles.navActionsMobile} aria-label={t('aria.carrito')}>
          <ShoppingBag className={styles.cartIcon} strokeWidth={1.5} />
        </a>
      </div>
    </header>

      {/* Submenú de escritorio: mismo panel lateral que el menú móvil,
          por debajo del navbar (z-index menor que el header). Fuera del
          <header> a propósito: si estuviera dentro, el z-index del header
          no serviría de nada — solo importa frente a elementos hermanos. */}
      <PanelLateral
        abierto={!!activeSubmenu}
        onMouseEnter={cancelSubmenuClose}
        onMouseLeave={scheduleSubmenuClose}
        onCerrar={closeSubmenu}
      >
        {displayedSubmenu && (
          <NavbarPanelLateralContent submenuKey={lastSubmenu} submenu={displayedSubmenu} />
        )}
      </PanelLateral>

      {/* Menú móvil: mismo panel lateral, pero a pantalla completa por
          debajo del navRow y solo con la lista de enlaces. Se cierra con
          el propio botón hamburguesa/X del header, no tiene botón de
          cerrar propio. */}
      <PanelLateral abierto={mobileMenuOpen} sobreNavbar onCerrar={() => setMobileMenuOpen(false)}>
        <nav className={styles.mobileMenu}>
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={withLocale(item.href)} className={styles.mobileMenuLink}>
              {t(`links.${item.key}`)}
            </a>
          ))}
          <div className={styles.mobileMenuDivider} />
          <a href={withLocale('/wishlist')} className={styles.mobileMenuLink}>{t('actions.wishlist')}</a>
          <a href={withLocale('/mi-cuenta')} className={styles.mobileMenuLink}>{t('actions.miCuenta')}</a>
        </nav>
      </PanelLateral>
    </>
  );
}

export default Navbar;

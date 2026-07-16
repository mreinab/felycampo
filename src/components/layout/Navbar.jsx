// Navbar.jsx

'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ShoppingBag } from 'lucide-react';
import styles from './Navbar.module.css';
import PanelLateral from './PanelLateral';

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
      { key: 'noviasSalamanca', href: '/visitenos/novias-salamanca' },
      { key: 'fiestaSalamanca', href: '/visitenos/fiesta-salamanca' },
      { key: 'showroomMadrid', href: '/visitenos/showroom-madrid' },
      { key: 'fiestaOviedo', href: '/visitenos/fiesta-oviedo' },
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

function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [lastSubmenu, setLastSubmenu] = useState(null);
  const closeTimeout = useRef(null);

  useEffect(() => () => clearTimeout(closeTimeout.current), []);

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

  const displayedSubmenu = lastSubmenu && SUBMENU_STRUCTURE[lastSubmenu];

  // Todos los enlaces internos del Navbar llevan el locale activo por
  // delante (/es/atelier, /en/atelier...) para que navegar por el sitio
  // no resetee el idioma elegido — el middleware, si no, redirigiría
  // cualquier ruta sin prefijo al locale por defecto (es).
  const withLocale = (href) => (href === '/' ? `/${locale}` : `/${locale}${href}`);

  const otherLocale = locale === 'es' ? 'en' : 'es';

  const switchLocale = () => {
    const segments = pathname.split('/');
    segments[1] = otherLocale;
    router.replace(segments.join('/'));
  };

  return (
    <>
    <header className={styles.header}>
      <div className={styles.navRow}>

        {/* Botón hamburguesa — solo visible en móvil */}
        <button
          className={styles.navToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? t('aria.cerrarMenu') : t('aria.abrirMenu')}
        >
          ☰
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
            src="/img/logo/logo-felycampo.png"
            alt="Fely Campo"
            className={styles.navLogo}
          />
        </a>

        {/* Utilidades — escritorio: texto completo */}
        <div className={styles.navActions}>
          <a href={withLocale('/wishlist')} className={styles.navLink}>{t('actions.wishlist')}</a>
          <a href={withLocale('/mi-cuenta')} className={styles.navLink}>{t('actions.miCuenta')}</a>
          <a href={withLocale('/carrito')} className={styles.navLink}>{t('actions.carrito')}</a>
          <button className={styles.languageSelector} onClick={switchLocale}>
            {locale.toUpperCase()}
          </button>
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
      >
        {displayedSubmenu && (
          <div className={styles.submenuContent}>
            <ul className={styles.submenuList}>
              {displayedSubmenu.items.map((link) => (
                <li key={link.href}>
                  <a href={withLocale(link.href)} className={styles.submenuLink}>
                    {t(`submenus.${lastSubmenu}.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
            <div className={styles.submenuImage}>
              <img src={displayedSubmenu.image} alt="" />
            </div>
          </div>
        )}
      </PanelLateral>

      {/* Menú móvil: mismo panel lateral, pero a pantalla completa
          (por encima del navbar) y solo con la lista de enlaces. */}
      <PanelLateral
        abierto={mobileMenuOpen}
        onCerrar={() => setMobileMenuOpen(false)}
        mostrarCerrar
        sobreNavbar
      >
        <nav className={styles.mobileMenu}>
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={withLocale(item.href)} className={styles.mobileMenuLink}>
              {t(`links.${item.key}`)}
            </a>
          ))}
          <div className={styles.mobileMenuDivider} />
          <a href={withLocale('/wishlist')} className={styles.mobileMenuLink}>{t('actions.wishlist')}</a>
          <a href={withLocale('/mi-cuenta')} className={styles.mobileMenuLink}>{t('actions.miCuenta')}</a>
          <button className={styles.languageSelectorMobile} onClick={switchLocale}>
            {locale.toUpperCase()}
          </button>
        </nav>
      </PanelLateral>
    </>
  );
}

export default Navbar;

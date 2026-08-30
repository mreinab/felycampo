// NavbarPanelLateralContent.jsx

'use client';

import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import styles from './NavbarPanelLateralContent.module.css';

/**
 * Lista de sub-enlaces del submenú de escritorio, dentro del
 * .contenido con padding de PanelLateral. Los dos MediaLink van
 * aparte (ver NavbarPanelLateralCards) — fuera de .contenido, para
 * poder ocupar el ancho completo del panel (ver PanelLateral "debajo"
 * en Navbar.jsx). Específico del Navbar (sabe de locales, traducciones
 * y la forma de SUBMENU_STRUCTURE) — a diferencia de MediaLink y
 * PanelLateral, que son genéricos y viven en ui/.
 */
function NavbarPanelLateralContent({ submenuKey, submenu }) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const withLocale = (href) => (href === '/' ? `/${locale}` : `/${locale}${href}`);

  return (
    <ul className={styles.submenuList}>
      {submenu.items.map((link) => {
        const esTodos = link.key === 'verTodos';
        // "Ver todos" solo va subrayado cuando esa es la página actual
        // (ej. /tienda exacto) — el resto del tiempo se comporta
        // como el resto de enlaces (subrayado solo al hover).
        const esActivo = esTodos && pathname === withLocale(link.href);
        const clase = esTodos
          ? `${styles.submenuLinkTodos} ${esActivo ? styles.submenuLinkTodosActivo : ''}`
          : styles.submenuLink;

        return (
          <li key={link.href}>
            <a href={withLocale(link.href)} className={clase}>
              {t(`submenus.${submenuKey}.${link.key}`)}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default NavbarPanelLateralContent;

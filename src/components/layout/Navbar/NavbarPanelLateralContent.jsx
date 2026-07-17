// NavbarPanelLateralContent.jsx

'use client';

import { useLocale, useTranslations } from 'next-intl';
import { MediaLink } from '../../ui';
import styles from './NavbarPanelLateralContent.module.css';

/**
 * Contenido del submenú de escritorio dentro del panel lateral: lista de
 * sub-enlaces + dos MediaLink. Específico del Navbar (sabe de locales,
 * traducciones y la forma de SUBMENU_STRUCTURE) — a diferencia de
 * MediaLink y PanelLateral, que son genéricos y viven en ui/.
 */
function NavbarPanelLateralContent({ submenuKey, submenu }) {
  const t = useTranslations('nav');
  const locale = useLocale();

  const withLocale = (href) => (href === '/' ? `/${locale}` : `/${locale}${href}`);

  return (
    <div className={styles.submenuContent}>
      <ul className={styles.submenuList}>
        {submenu.items.map((link) => (
          <li key={link.href}>
            <a href={withLocale(link.href)} className={styles.submenuLink}>
              {t(`submenus.${submenuKey}.${link.key}`)}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.submenuCards}>
        {submenu.items.slice(0, 2).map((item) => (
          <MediaLink
            key={item.key}
            href={withLocale(item.href)}
            image={submenu.image}
            label={t(`submenus.${submenuKey}.${item.key}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default NavbarPanelLateralContent;

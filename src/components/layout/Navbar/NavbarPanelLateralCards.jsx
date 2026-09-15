// NavbarPanelLateralCards.jsx

'use client';

import { useLocale, useTranslations } from 'next-intl';
import { MediaLink } from '../../ui';
import styles from './NavbarPanelLateralContent.module.css';

/**
 * Los MediaLink del submenú de escritorio — se pasan como "debajo" a
 * PanelLateral (ver Navbar.jsx), fuera de .contenido, así ocupan el
 * ancho completo del panel en vez del hueco recortado por su padding
 * lateral. "submenu.cards" (1 o 2, ver SUBMENU_STRUCTURE en Navbar.jsx)
 * decide cuántas y con qué imagen/enlace propios cada una — una sola
 * card ocupa todo el ancho (variante "ancho", mismo .card flex:1 de
 * MediaLink, sin necesitar CSS aparte). Mismo criterio que
 * NavbarPanelLateralContent: sabe de locales, traducciones y la forma
 * de SUBMENU_STRUCTURE.
 */
function NavbarPanelLateralCards({ submenuKey, submenu }) {
  const t = useTranslations('nav');
  const locale = useLocale();

  const withLocale = (href) => (href === '/' ? `/${locale}` : `/${locale}${href}`);
  const unica = submenu.cards.length === 1;

  return (
    <div className={styles.submenuCards}>
      {submenu.cards.map((card) => (
        <MediaLink
          key={card.key}
          href={withLocale(card.href)}
          image={card.image}
          label={t(`submenus.${submenuKey}.${card.labelKey || card.key}`)}
          variante={unica ? 'ancho' : undefined}
        />
      ))}
    </div>
  );
}

export default NavbarPanelLateralCards;

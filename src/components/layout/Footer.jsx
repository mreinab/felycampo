/* ============================================================
   FOOTER — Fely Campo
   ============================================================ */

import styles from './Footer.module.css';

/**
 * Pie de página de toda la web pública. 4 columnas + newsletter.
 */
function Footer() {
  const columnas = [
    { titulo: 'Atención cliente', enlaces: ['Envíos', 'Devoluciones', 'Guía de cuidados', 'Contacto', 'FAQ'] },
    { titulo: 'Fely Campo', enlaces: ['About', 'Responsabilidad', 'Puntos de venta', 'Trabaja con nosotras'] },
    { titulo: 'Síguenos', enlaces: ['Instagram', 'YouTube', 'TikTok'] },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {columnas.map((col) => (
          <div key={col.titulo}>
            <h3 className={styles.titulo}>{col.titulo}</h3>
            <ul className={styles.lista}>
              {col.enlaces.map((e) => (
                <li key={e}><a href="#" className={styles.enlace}>{e}</a></li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className={styles.parrafo}>
            Suscríbete a nuestra newsletter. Sé la primera en descubrir nuevas colecciones.
          </p>
          <input type="email" placeholder="nombre@email.com" className={styles.input} />
        </div>
      </div>

      <div className={styles.legal}>
        <span className={styles.copy}>Fely Campo 2026 ©</span>
        <div className={styles.legalLista}>
          <a href="#" className={styles.legalEnlace}>Términos y condiciones</a>
          <a href="#" className={styles.legalEnlace}>Política de cookies</a>
          <a href="#" className={styles.legalEnlace}>Política de privacidad</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

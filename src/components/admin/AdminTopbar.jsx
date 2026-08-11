import styles from './AdminTopbar.module.css';

/**
 * Cabecera fija del panel — sin lógica de sesión real, "Jaume" es un
 * placeholder del usuario admin conectado.
 */
function AdminTopbar() {
  return (
    <header className={styles.topbar}>
      <p className={styles.titulo}>Panel de administración</p>
      <div className={styles.usuario}>
        <span className={styles.avatar}>JC</span>
        <span>Jaume Campo</span>
      </div>
    </header>
  );
}

export default AdminTopbar;

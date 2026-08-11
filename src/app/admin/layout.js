/* ============================================================
   LAYOUT RAÍZ DEL PANEL ADMIN — Fely Campo
   "admin" es un segmento hermano de "[locale]", no un hijo — así que
   es su propio root layout independiente (define <html>/<body> igual
   que [locale]/layout.js), en vez de heredar el next-intl provider,
   Navbar y Footer del sitio público. Patrón soportado por Next.js:
   "multiple root layouts" cuando no hay app/layout.js compartido.
   Solo Español — sin next-intl, sin prefijo de idioma en la URL.
   ============================================================ */

import '@/styles/global.css';
import { AdminSidebar, AdminTopbar, ToastProvider } from '@/components/admin';
import styles from './layout.module.css';

export const metadata = {
  title: 'Panel de administración · Fely Campo',
  description: 'Gestión interna de producto, pedidos, diseño de landing y contenido de Fely Campo.',
};

export default function AdminLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ToastProvider>
          <div className={styles.shell}>
            <AdminSidebar />
            <div className={styles.principal}>
              <AdminTopbar />
              <main className={styles.contenido}>{children}</main>
            </div>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}

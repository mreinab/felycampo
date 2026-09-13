/* ============================================================
   RESPONSABILIDAD (manifiesto sostenible) — Fely Campo.
   Ruta: /responsabilidad — enlazada desde el footer como
   "Sostenibilidad" (ver Footer.jsx).
   Mismo diseño que /sobre-fely (ver ese page.js/page.module.css):
   hero a 80vh a ancho completo (RunwayMediaLateral, data-navbar-hero
   para que el Navbar transparente se vuelva sólido al salir de él,
   ver RUTAS_CON_PRODUCT_HERO en ../layout.js) → CabeceraSeccion
   (eyebrow "Manifiesto sostenible" + título, namespace "responsabilidad"
   en messages/{locale}.json) → RunwayDescripcion con el texto íntegro
   del manifiesto (RESPONSABILIDAD.texto en responsabilidad.js, texto
   largo y propio de esta página).
   ============================================================ */

import { RunwayDescripcion, RunwayMediaLateral } from '@/components/layout';
import { CabeceraSeccion } from '@/components/ui';
import { RESPONSABILIDAD } from './responsabilidad';
import styles from './page.module.css';

export default async function Pagina({ params }) {
  const { locale } = await params;

  return (
    <section>
      <div className={styles.hero} data-navbar-hero>
        <RunwayMediaLateral medio={{ src: RESPONSABILIDAD.heroImagen }} alt="Fely Campo" />
      </div>

      <CabeceraSeccion subtitleKey="responsabilidad.eyebrow" titleKey="responsabilidad.titulo" />

      <RunwayDescripcion texto={RESPONSABILIDAD.texto[locale]} />
    </section>
  );
}

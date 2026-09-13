// AtelierDetalle.jsx

/* ============================================================
   FICHA DE ATELIER — Fely Campo. Plantilla compartida por
   /atelier-fiesta/salamanca, /madrid y /oviedo (ver esos page.js,
   cada uno solo pasa su entrada de atelieres.js) — mismo patrón que
   ListadoUbicaciones.jsx + ubicaciones.js en visita-fely-campo/.

   Orden fijo, igual en las 3 fichas (ver atelieres.js para el porqué
   de cada dato — los pasos 2b/3b son opcionales, solo Madrid trae
   contenido por ahora):
   1. .hero + .textoDescripcion — mismo patrón que la ficha de
      colección de Runway (ver
      /colecciones-fely-campo/[coleccion]/page.js): hero de foto a
      ancho completo y 80vh (RunwayMediaLateral, data-navbar-hero para
      que el Navbar se vuelva sólido al salir de él — en vez de
      ProductHero, que usábamos antes aquí) + .textoRow (dos textos a
      tamaño h1 en fila, eyebrow / nombre de la ciudad, en vez de
      nombre/temporada de una colección — eyebrow es por ficha, no
      compartido: "Atelier" en Salamanca/Oviedo, "Atelier & Showroom"
      en Madrid, ver messages/{locale}.json "atelierFiesta.{id}.eyebrow")
      + RunwayDescripcion (datos.descripcion, el texto completo de la
      ficha en un único párrafo justificado — en vez de la
      CabeceraSeccion con la que arrancaba esta plantilla). "heroMedio"
      es imagen o vídeo según la ficha (ver RunwayMediaLateral.jsx) —
      Madrid usa vídeo aquí, Salamanca/Oviedo imagen (ver atelieres.js).
   2. Elemento a sangre parcial (90vh, 16/9, ver .video en
      page.module.css) — igual que el hero, imagen o vídeo según
      datos.medioSuperior.tipo (Madrid: imagen horizontal aquí, ya que
      su vídeo está arriba en el hero; Salamanca/Oviedo: al revés).
   2b. datos.secciones — imagen + texto en zigzag, cada una con su
      propio título (ver .seccion/.seccionInvertida en page.module.css)
      — vacío en Salamanca/Oviedo. Único contenido de cuerpo aparte de
      la descripción de cabecera: antes había además un .bloque fijo a
      dos columnas que no alternaba de lado como estas — se quitó (ver
      comentario en atelieres.js).
   3. Dirección + teléfono + WhatsApp + "Pedir cita" (Boton, mismo
      componente que el resto del sitio) — busca la sede en
      visita-fely-campo/ubicaciones.js por "datos.id" (misma fuente que
      ListadoUbicaciones.jsx, sin duplicar los datos de contacto aquí),
      mismo patrón que .info ahí (dirección y WhatsApp subrayados
      siempre, teléfono en texto plano).
   4. .imagenes — cuadrícula de 5 fotos que caben sin scroll en
      escritorio; en mobile (ver media query en page.module.css) pasa a
      carrusel horizontal (CarruselImagenes de @/components/ui,
      compartido con /talleres-fely-campo, con scroll por rueda del
      ratón), último elemento de la página.

   Server Component — "atelierFiesta"/"visitenos" se resuelven con
   getTranslations (versión servidor de next-intl, no el hook
   useTranslations que usa CabeceraSeccion) porque ya no hay ningún
   Client Component propio aquí arriba; el único trocito interactivo
   (el carrusel del paso 4, solo activo en mobile) sigue viviendo en
   CarruselImagenes.jsx, aparte — Boton también es 'use client', pero
   solo por el onClick genérico que admite, no por nada que usemos
   aquí (solo href). Los pasos 2/2b/3/4 aparecen con scroll (<EnVista>,
   @/components/ui — envoltorio 'use client' de @/hooks/useEnVista
   para poder usarlo desde este Server Component sin convertirlo
   entero a cliente). */

import { getTranslations } from 'next-intl/server';
import { RunwayMediaLateral, RunwayDescripcion } from '@/components/layout';
import { CarruselImagenes, Boton, EnVista } from '@/components/ui';
import { UBICACIONES } from '../visita-fely-campo/ubicaciones';
import styles from './page.module.css';

async function AtelierDetalle({ datos, locale }) {
  const t = await getTranslations('atelierFiesta');
  const tVisitenos = await getTranslations('visitenos');
  const nombreCiudad = t(`${datos.id}.titulo`);
  const ubicacion = UBICACIONES.find((candidata) => candidata.id === datos.id);

  // Mismo criterio que ListadoUbicaciones.jsx: un solo teléfono → "Telf";
  // dos → "Telf" (fijo) y "Móvil", cada uno en su propia línea.
  const etiquetasTelefono = [tVisitenos('telf'), tVisitenos('movil')];
  const lineaContacto = ubicacion?.telefonos
    .map((telefono, indiceTelefono) => `${etiquetasTelefono[indiceTelefono] || tVisitenos('telf')}: ${telefono}`)
    .join('\n');
  const whatsappHref = ubicacion && `https://wa.me/${ubicacion.whatsapp.replace(/\D/g, '')}`;

  return (
    <section>
      <div className={styles.hero} data-navbar-hero>
        <RunwayMediaLateral medio={datos.heroMedio} alt={nombreCiudad} />
      </div>

      <div className={styles.textoDescripcion}>
        <div className={styles.textoRow}>
          <p className={styles.eyebrowGrande}>{t(`${datos.id}.eyebrow`)}</p>
          <p className={styles.ciudad}>{nombreCiudad}</p>
        </div>

        <RunwayDescripcion texto={datos.descripcion[locale]} />
      </div>

      <div className="contenedor">
        {datos.medioSuperior.tipo === 'video' ? (
          <video
            src={datos.medioSuperior.src}
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <EnVista as="img" src={datos.medioSuperior.src} alt="" className={styles.video} />
        )}

        {datos.secciones.map((seccion, indice) => (
          <EnVista
            key={seccion.titulo[locale]}
            className={`${styles.seccion} ${indice % 2 === 1 ? styles.seccionInvertida : ''}`}
          >
            <div className={styles.bloqueImagen}>
              <img src={seccion.imagen} alt="" className={styles.bloqueImg} />
            </div>
            <div className={styles.seccionTexto}>
              <p className={styles.seccionTitulo}>{seccion.titulo[locale]}</p>
              {seccion.texto[locale].map((parrafo, indiceParrafo) => (
                <p key={indiceParrafo}>{parrafo}</p>
              ))}
            </div>
          </EnVista>
        ))}

        {ubicacion && (
          <EnVista className={styles.cita}>
            <a href="#" target="_blank" rel="noopener noreferrer" className={styles.direccionCita}>
              {ubicacion.direccion.join(', ')}
            </a>
            <p className={styles.telefonoCita}>{lineaContacto}</p>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={styles.whatsappCita}>
              {tVisitenos('whatsapp')}: {ubicacion.whatsapp}
            </a>
            <Boton
              href={`/${locale}/visita-fely-campo/cita?ubicacion=${datos.id}`}
              variante="solido"
              tamano="m"
              className={styles.botonCita}
            >
              {tVisitenos('pedirCita')}
            </Boton>
          </EnVista>
        )}

        <CarruselImagenes className={styles.imagenes}>
          {[0, 1, 2, 3, 4].map((indice) => (
            <EnVista key={indice} className={styles.marco}>
              <img
                src={datos.imagenesTira[indice % datos.imagenesTira.length]}
                alt=""
                className={styles.imagen}
              />
            </EnVista>
          ))}
        </CarruselImagenes>
      </div>
    </section>
  );
}

export default AtelierDetalle;

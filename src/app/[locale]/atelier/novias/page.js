import BloqueSeccion from '@/components/layout/BloqueSeccion';

export default async function Pagina({ params }) {
  const { locale } = await params;

  return (
    <BloqueSeccion
      imagen="/img/novias-sección-FelyCampo2.jpg"
      titulo="Atelier Novia"
      texto="Reserva tu cita y vive un día único en el Atelier Novia Fely Campo en Salamanca o en Madrid. Disfruta del asesoramiento personalizado de nuestra diseñadora"
      enlace="Reserva tu cita"
      href={`/${locale}/visitenos/cita`}
    />
  );
}

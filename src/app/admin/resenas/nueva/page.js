'use client';

import { BotonVolver } from '@/components/admin';
import FormularioResena from '@/components/admin/FormularioResena';

export default function NuevaResenaPage() {
  return (
    <div>
      <BotonVolver href="/admin/resenas" />
      <FormularioResena />
    </div>
  );
}

'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { BotonVolver } from '@/components/admin';
import { resenasMock } from '@/components/admin/mockData';
import FormularioResena from '@/components/admin/FormularioResena';

export default function EditarResenaPage({ params }) {
  const { id } = use(params);
  const resena = resenasMock.find((r) => r.id === id);

  if (!resena) notFound();

  return (
    <div>
      <BotonVolver href="/admin/resenas" />
      <FormularioResena resenaExistente={resena} />
    </div>
  );
}

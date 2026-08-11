'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { blogMock } from '@/components/admin/mockData';
import FormularioBlog from '@/components/admin/FormularioBlog';

export default function EditarEntradaBlogPage({ params }) {
  const { id } = use(params);
  const entrada = blogMock.find((e) => e.id === id);

  if (!entrada) notFound();

  return <FormularioBlog entradaExistente={entrada} />;
}

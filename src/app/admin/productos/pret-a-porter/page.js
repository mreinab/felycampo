'use client';

import { Shirt } from 'lucide-react';
import ListaProductos from '@/components/admin/ListaProductos';

export default function ProductosPretAPorterPage() {
  return (
    <ListaProductos
      tipoFijo="pret-a-porter"
      titulo="Prêt-à-porter"
      agruparPorCategoria
      iconoCategoria={Shirt}
    />
  );
}

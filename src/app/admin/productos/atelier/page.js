'use client';

import { Scissors } from 'lucide-react';
import ListaProductos from '@/components/admin/ListaProductos';

export default function ProductosAtelierPage() {
  return (
    <ListaProductos
      tipoFijo="atelier"
      titulo="Atelier"
      agruparPorCategoria
      iconoCategoria={Scissors}
    />
  );
}

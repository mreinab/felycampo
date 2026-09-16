'use client';

import ListaProductos from '@/components/admin/ListaProductos';

// cat7 Tops y Camisas / cat8 Chaquetas y Abrigos / cat2 Faldas / cat36
// Pantalones / cat1 Vestidos — ids fijados en mockData.js
// categoriasMock['pret-a-porter'].
const IMAGENES_CATEGORIA = {
  cat7: '/img/admin/pret-a-porter/cover-tops-y-camisas-admin-felycampo.jpg',
  cat8: '/img/admin/pret-a-porter/cover-abrigos-chaquetas-admin-felycampo.jpg',
  cat2: '/img/admin/pret-a-porter/faldas-admin-felycampo.jpg',
  cat36: '/img/admin/pret-a-porter/pantalones-admin-felycampo.jpg',
  cat1: '/img/admin/pret-a-porter/vestidos-admin-felycampo.jpg',
};

export default function ProductosPretAPorterPage() {
  return (
    <ListaProductos
      tipoFijo="pret-a-porter"
      titulo="Prêt-à-porter"
      agruparPorCategoria
      imagenesCategoria={IMAGENES_CATEGORIA}
    />
  );
}

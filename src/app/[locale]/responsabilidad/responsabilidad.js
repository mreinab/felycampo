/* Contenido de /responsabilidad (manifiesto sostenible) — ver page.js.
   Bilingüe ({es, en}), mismo criterio que atelierIndex.js/sobreFely.js:
   texto largo y propio de esta página, no encaja en el formato de
   clave corta de messages/{locale}.json (ahí solo viven "eyebrow" y
   "titulo", ver namespace "responsabilidad").
   "texto": los 6 párrafos del encargo, unidos con "\n\n" — mismo
   patrón que ATELIER_INDEX.descripcion (RunwayDescripcion solo admite
   un "texto", ver white-space:pre-line en RunwayDescripcion.module.css). */

export const RESPONSABILIDAD = {
  heroImagen: '/img/atelier/ateliernovia-lamedida-felycampo-2.webp',
  texto: {
    es: [
      'En Fely Campo el diseño es la manera en la que nos comunicamos con el mundo, por lo que tenemos el compromiso de aportar un impacto positivo a las personas y al planeta.',
      'Apostamos por el slowfashion a través de la durabilidad de las prendas y del valor de la moda de autor 100% hecha en España. Nuestro compromiso es de sostenibilidad social además de medioambiental.',
      'Pretendemos generar un impacto positivo en nuestra comunidad y creemos en las personas como principales agentes de cambio; por lo que promovemos la igualdad de género y la inclusión en el lugar de trabajo para crear un equipo que inspire a las personas.',
      'La mujer es el centro que inspira nuestra firma, pero también el que la crea. Fely Campo trabaja con cooperativas de mujeres del medio rural de Castilla y León para la confección de sus prendas, garantizando así un producto fabricado íntegramente en España, que favorece la producción local y la no despoblación de las zonas rurales además de la calidad y el saber hacer de la alta costura.',
      'Impulsamos un consumo responsable, creando prendas de alta calidad, con diseños con esencia atemporal y versátiles para poder ser utilizados en diferentes ocasiones. Creamos la mayoría de nuestras piezas elaboradas exclusivamente para el cliente, fabricación made to order, evitando la generación de residuos y stock. Además de incluir en nuestras colecciones, cada vez más fibras de origen natural o recicladas en los tejidos con los que diseñamos.',
      'Además, Fely Campo colabora activamente en diferentes iniciativas solidarias o preocupadas por inspirar el papel de la mujer en nuestra sociedad como Programa Promociona, Colaboración con AECC Salamanca, etc.',
    ].join('\n\n'),
    en: [
      'At Fely Campo, design is how we communicate with the world — which is why we are committed to making a positive impact on people and the planet.',
      'We champion slow fashion through the durability of our garments and the value of designer fashion 100% made in Spain. Our commitment is to social as well as environmental sustainability.',
      'We aim to create a positive impact in our community, and we believe people are the main agents of change — which is why we promote gender equality and inclusion in the workplace, to build a team that inspires people.',
      'Women are the heart that inspires our house, and also the hands that build it. Fely Campo works with women\'s cooperatives in rural Castilla y León to make our garments, guaranteeing a product made entirely in Spain that supports local production and helps prevent rural depopulation — alongside the quality and craftsmanship of haute couture.',
      'We promote responsible consumption, creating high-quality garments with a timeless, versatile design that can be worn on different occasions. Most of our pieces are made exclusively for the client — made-to-order production — avoiding waste and excess stock. We are also including more natural-origin and recycled fibres in the fabrics we design with, season after season.',
      'Fely Campo also actively collaborates with different solidarity initiatives focused on inspiring the role of women in our society, such as Programa Promociona and our partnership with AECC Salamanca, among others.',
    ].join('\n\n'),
  },
};

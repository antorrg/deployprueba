import {
  Province,
  Category,
  Product,
  Provider,
  CategoryPost,
  Post,
  CategoryProvider,
  Commerce,
  ImagesConfig,
  CategoryImg,
} from "../../db.js";

const reinit = async (req, res) => {
  const provincesArray = [
    { idProvince: 1, descProvince: "Buenos Aires" },
    { idProvince: 2, descProvince: "CABA" },
    { idProvince: 3, descProvince: "Catamarca" },
    { idProvince: 4, descProvince: "Chaco" },
    { idProvince: 5, descProvince: "Chubut" },
    { idProvince: 6, descProvince: "Córdoba" },
    { idProvince: 7, descProvince: "Corrientes" },
    { idProvince: 8, descProvince: "Entre Ríos" },
    { idProvince: 9, descProvince: "Formosa" },
    { idProvince: 10, descProvince: "Jujuy" },
    { idProvince: 11, descProvince: "La Pampa" },
    { idProvince: 12, descProvince: "La Rioja" },
    { idProvince: 13, descProvince: "Mendoza" },
    { idProvince: 14, descProvince: "Misiones" },
    { idProvince: 15, descProvince: "Neuquén" },
    { idProvince: 16, descProvince: "Río Negro" },
    { idProvince: 17, descProvince: "Salta" },
    { idProvince: 18, descProvince: "San Juan" },
    { idProvince: 19, descProvince: "San Luis" },
    { idProvince: 20, descProvince: "Santa Cruz" },
    { idProvince: 21, descProvince: "Santa Fe" },
    { idProvince: 22, descProvince: "Santiago del Estero" },
    { idProvince: 23, descProvince: "Tierra del Fuego" },
    { idProvince: 24, descProvince: "Tucumán" },
  ];

  const providersArray = [
    {
      razonsocial: "BlueBlood SA",
      fantasia: "Idrogeno",
      direccion: "Calle xxx",
      ciudad: "Rosario",
      telefono: "5434100000",
      email: "idrogeno@idgn.com",
      idProvince: 21,
      idCategory: 1,
    },
    {
      razonsocial: "Batuk algo SA",
      fantasia: "Batuk",
      direccion: "Avellaneda xxx",
      ciudad: "CABA",
      telefono: "5411000000",
      email: "batuk@batuk.com",
      idProvince: 2,
      idCategory: 2,
    },
  ];
  const categoriesImages = [
    { descCategory: "blog" },
    { descCategory: "carrusel" },
    { descCategory: "principal" },
    { descCategory: "servicios" },
  ];

  const tipsMecanica = [
    {
      titlePost: "Elige el Aceite Correcto",
      textPost:
        "Escoger el aceite adecuado para tu vehículo es crucial. Consulta el manual del propietario para conocer la viscosidad y especificaciones recomendadas. Además, considera factores como el clima y el kilometraje del motor para garantizar un rendimiento óptimo y una mayor vida útil del motor.",
      idCategory: 1,
      published: true,
      viewFavPost: true,
      imgPost: [
        "https://firebasestorage.googleapis.com/v0/b/boscarol-f2a0a.appspot.com/o/blog%2Flos-mejores-aceites-para-motor.jpg?alt=media&token=8efad536-49b1-419e-b84b-bcc41d93ecd5",
      ],
      datePost: new Date(),
    },
    {
      titlePost: "Presión de Neumáticos",
      textPost:
        "Seguridad en la Carretera: Mantener la presión adecuada en los neumáticos no solo mejora la eficiencia del combustible, sino que también garantiza un mejor agarre y maniobrabilidad. Consulta la etiqueta de presión en la puerta del conductor y verifica la presión de los neumáticos regularmente, especialmente antes de viajes largos.",
      idCategory: 2,
      published: true,
      viewFavPost: true,
      imgPost: [
        "https://firebasestorage.googleapis.com/v0/b/boscarol-f2a0a.appspot.com/o/blog%2Fpresion-neumaticos-3-e1589185063995.jpg?alt=media&token=c00d8a4b-613a-4255-9a4f-8079c04f234e",
      ],
      datePost: new Date(),
    },
    {
      titlePost: "Evita el Desgaste Prematuro del Motor",
      textPost:
        "Cambiar regularmente el aceite del motor es esencial para prevenir el desgaste prematuro y mantener el motor funcionando sin problemas. Programa cambios de aceite según las recomendaciones del fabricante y utiliza productos de calidad para prolongar la vida útil de tu motor y evitar costosas reparaciones.",
      idCategory: 3,
      published: true,
      viewFavPost: true,
      imgPost: [
        "https://firebasestorage.googleapis.com/v0/b/boscarol-f2a0a.appspot.com/o/blog%2Fcambio_aceite.jpg?alt=media&token=36529fb0-9691-4a5d-856c-e5d07720cbe3",
      ],
      datePost: new Date(),
    },

    {
      titlePost: "Mantén la Temperatura Óptima",
      textPost:
        "La elección del refrigerante adecuado es vital para evitar problemas de sobrecalentamiento en tu automóvil. Verifica regularmente el nivel de agua refrigerante y asegúrate de que esté en la proporción correcta con el anticongelante. Esto ayudará a prevenir daños costosos en el sistema de enfriamiento.",
      idCategory: 1,
      published: true,
      viewFavPost: true,
      imgPost: [
        "https://firebasestorage.googleapis.com/v0/b/boscarol-f2a0a.appspot.com/o/blog%2Frefrigerante.jpg?alt=media&token=d154c523-da23-47b8-b958-1258c236b843",
      ],
      datePost: new Date(),
    },
    {
      titlePost: "Frenos, tu seguridad",
      textPost:
        "Revisa regularmente el estado de los frenos y cambia las pastillas y discos según las indicaciones del fabricante. Un sistema de frenos en buen estado no solo garantiza tu seguridad, sino que también evita daños costosos en otros componentes del vehículo.",
      idCategory: 1,
      published: true,
      viewFavPost: false,
      imgPost: [
        "https://firebasestorage.googleapis.com/v0/b/boscarol-f2a0a.appspot.com/o/blog%2Ffrenos01.jpg?alt=media&token=5ea95d24-b93b-43c0-89ec-ef519db34254",
      ],
      datePost: new Date(),
    },
    {
      titlePost: "Cambio de filtros",
      textPost:
        "Mantén tu Motor Limpio. No olvides cambiar los filtros de aire y de combustible periódicamente. Un filtro obstruido reduce la eficiencia del motor y puede causar daños internos. Mantén un calendario de cambio de filtros para garantizar un rendimiento óptimo y una mayor durabilidad del motor.",
      idCategory: 3,
      published: true,
      viewFavPost: false,
      imgPost: [
        "https://firebasestorage.googleapis.com/v0/b/boscarol-f2a0a.appspot.com/o/blog%2Ffiltro-de-gasolina.jpg?alt=media&token=60914b8a-243e-4eb3-a4bd-e6f15be55169",
      ],
      datePost: new Date(),
    },
    {
      titlePost: "Inspección de luces",
      textPost:
        "Visibilidad y Seguridad. Verifica regularmente el funcionamiento de todas las luces exteriores e interiores, incluyendo faros, luces de freno, intermitentes y luces de marcha atrás. Reemplaza cualquier bombilla fundida de inmediato para garantizar una buena visibilidad en la carretera y reducir el riesgo de accidentes.",
      idCategory: 3,
      published: true,
      viewFavPost: false,
      imgPost: [
        "https://firebasestorage.googleapis.com/v0/b/boscarol-f2a0a.appspot.com/o/blog%2Ffaros.jpg?alt=media&token=34ae4df5-ab5f-488f-8c70-30c2598656e0",
      ],
      datePost: new Date(),
    },
    {
      titlePost: "Post no publicado",
      textPost:
        "Este post no debería renderizarse porque está como published: false. Solo debería verse en dashboard de admin para que puedan editarlo y publicarlo cuando lo desean",
      idCategory: 3,
      published: false,
      viewFavPost: false,
      imgPost: [
        "https://firebasestorage.googleapis.com/v0/b/boscarol-f2a0a.appspot.com/o/blog%2Ffaros.jpg?alt=media&token=34ae4df5-ab5f-488f-8c70-30c2598656e0",
      ],
      datePost: new Date(),
    },
  ];

  try {
    //vaciar y rellenar Modelo CategoryImg
    await CategoryImg.destroy({ where: {} });
    await CategoryImg.bulkCreate(categoriesImages);

    //vaciar y rellenar Modelo Province
    await Province.destroy({ where: {} });
    await Province.bulkCreate(provincesArray);

    //vaciar y rellenar Modelo Client
    // await Client.destroy({ where: {}, truncate: true });
    //carga de registros a Client
    // await Client.create({
    //   razonsocial: "Cliente nro 01",
    //   fantasia: "",
    //   direccion: "Calle Uno Nro 1000",
    //   ciudad: "San Criatóbal",
    //   idProvince: 21,
    //   telefono: "543408",
    //   email: "",
    // });
    // await Client.create({
    //   razonsocial: "Cliente nro 02",
    //   fantasia: "",
    //   direccion: "Alguna calle",
    //   ciudad: "San Criatóbal",
    //   idProvince: 21,
    //   telefono: "543408666666",
    //   email: "",
    // });

    //vaciar y rellenar Comemrce
    await Commerce.destroy({ where: {} });
    await Commerce.create({
      razonsocial: "Boscarol Ariel A. y Pablo A.",
      fantasia: "Boscarol Hnos.",
      direccion: "Güemes 853",
      ciudad: "San Cristóbal",
      idProvince: 21,
      telefono: "54 3408 427110",
      email: "boscarolhnos@gmail.com",
      instagram: "https://www.instagram.com/",
      facebook: "https://www.facebook.com/",
      otro: "",
      celular: "54 3408 675420",
      isMyCommerce: true,
      datePost: new Date(),
    });

    //crear categorías y subcategorías de Productos
    await Category.destroy({ where: {} });
    await Category.create({
      name: "Aceites",
      description: "Aceites lubricantes",
    });
    await Category.create({
      name: "Motor",
      description: "Repuestos de motores",
    });
    await Category.create({
      name: "Tren delantero",
      description: "Repuestos relacionados con el tren delantero",
    });
    await Category.create({
      name: "Aceites sintéticos",
      description: "Línea de aceites sintéticos",
      parentId: 1,
    });
    await Category.create({
      name: "Correas de distribución",
      description: "Correas de distribución para motores",
      parentId: 2,
    });

    //vaciar y rellenar Product
    await Product.destroy({ where: {} });
    await Product.create({
      nameProduct: "Aceite SAE15W40 x 1 lt",
      descProduct: "Aceite SAE15W40 envase por litro marca XXX",
      subcategoryId: 4,
      stock: 2,
    });
    await Product.create({
      nameProduct: "Aceite SAE20W50",
      descProduct: "Aceite SAE20W50 envase por litro marca YYY",
      subcategoryId: 4,
      stock: 1,
    });

    //vaciar y crear Proveedores y sus Categorías
    await CategoryProvider.create({ descCategory: "Genéricos" });
    await CategoryProvider.create({ descCategory: "Aceites" });
    await Provider.destroy({ where: {} });
    await Provider.bulkCreate(providersArray);

    //vaciar y crear Categorias de Post, y Posts
    await CategoryPost.destroy({ where: {} });
    await CategoryPost.bulkCreate([
      { descCategory: "Aceites" },
      { descCategory: "Sevice periódico" },
      { descCategory: "Refrigerantes" },
    ]);

    await Post.bulkCreate(tipsMecanica);

    console.log("okey bien");
    res.status(200).json({ message: "Todo ok" });
  } catch (error) {
    res.status(400).json({ error: error.message }); //"ocurrió algún error"
  }
};

export default reinit;

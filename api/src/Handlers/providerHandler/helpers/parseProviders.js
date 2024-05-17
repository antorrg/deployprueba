
const parseProvider =  (data, isA) => {
    return isA? data.map((dat)=> provClean(dat))
    : provClean(data);
}

const provClean = (d)=>{
    const categoryProvidersP = d.CategoryProviders.map((cat) => (
        //id: cat.idCategory,
         cat.descCategory
    ));
    return {
        id: d.id,
        razonsocial: d.razonsocial,
        fantasia: d.fantasia,
        contacto: d.contacto,
        direccion: d.direccion,
        ciudad: d.ciudad,
        telefono: d.telefono,
        email: d.email,
        otro: d.otro,
        img: d.img,
        deletedAt: d.deletedAt,
        province: d.Province.descProvince,
        provinceId: d.ProvinceIdProvince,
        categoryProviders: categoryProvidersP.join(', ')
    };
}
export default parseProvider;

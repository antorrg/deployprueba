

const dataParsed = (data, isSingle) => {
    return isSingle ? data.map((dat)=> parseInt(dat, 10))
                   : parseInt(data, 10);
       }
   
 
export default dataParsed;

//si la info esta en un array seria: dataParsed(xxx, true)
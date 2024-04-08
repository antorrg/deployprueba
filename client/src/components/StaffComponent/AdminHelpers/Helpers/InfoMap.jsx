
const infoSelect = (info)=>{
  return info?.map((data)=>({
    id:data.id,
    name: data.patent ?? data.name,
  }))

}

const roles = (role) => {
  switch (role) {
      case 0:
          return 'Admin';
      case 2:
          return 'Mecanico';
      case 9:
          return 'Superadmin';
      default:
          return 'User';
  }
};
 const estado = (info)=>{
  if(info){
    return 'Activo';
  } return 'Bloqueado'
 }

const allowing =(inf1, inf2)=>{
  let result = false;
  let userId= inf1 && inf1.id;
  let editId= inf2 && inf2.id;
  if(!userId || !editId){result = false;}
  else if(userId ===editId){
    result= true;
  }else{result = false}
  return result;
}
export {
  infoSelect,
  roles,
  estado,
  allowing
}
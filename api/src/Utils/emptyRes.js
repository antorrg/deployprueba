 import dotenv from 'dotenv'
 dotenv.config()
 const {DEFAULT_IMG_VEHICULO}= process.env;

 const emptyResServ = ()=>{
    return [
        {
          "id": false,
          "type": "No hay datos",
          "detail": "Aun no hay datos",
          "date_in": "Aun no hay datos",
          "date_out": "Aun no hay datos",
          "observations": "Aun no hay datos",
          "picture": "Aun no hay datos",
          "enable": true,
          "deletedAt": false,
          "createdAt": "Aun no hay datos",
          "updatedAt": "Aun no hay datos",
          "CarId": "4f81eda9-2389-4a92-a743-0caa593598c1"
        },
      ]
 };

 const emptyResCar = ()=>{
  return [
    {
      "id": "false",
      "patent": "Aun no hay vehiculos",
      "mark": "Aun no hay datos",
      "model": "Aun no hay vehiculos",
      "year": "Aun no hay vehiculos",
      "motorNum": "Aun no hay vehiculos",
      "chassisNum": "Aun no hay vehiculos",
      "observations": "Aun no hay vehiculos",
      "picture": `${DEFAULT_IMG_VEHICULO}`,
      "enable": true,
      "deletedAt": false,
      "createdAt": "2024-04-08T21:06:28.714Z",
      "updatedAt": "2024-04-08T21:06:28.714Z",
      "Users": [
        {
          "name": "Aun no hay datos",
          "id": "Aun no hay datos"
        }
      ]
    }
    ]
}


 const emptyResCommerce = ()=>{
  return [
    {
    "razonsocial": "...",
    "fantasia": "...",
    "direccion": "...",
    "ciudad": "...",
    "telefono": "...",
    "celular": "",
    "email": "",
    "instagram": "",
    "facebook": "",
    "otro": "",
    "idProvince": 21,
    "Province": {
      "descProvince": "...",
    },
  }
]
 }
 export {
  emptyResServ,
  emptyResCar,
  emptyResCommerce
};

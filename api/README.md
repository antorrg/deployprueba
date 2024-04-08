# HELP-SERVER

Proyecto con Base de datos PostgresSQL. Iniciado el día 06/03/2024

Estas son las rutas y sus respectivas caracteristicas:

## Usuarios

### Creación de Usuario

- Método: `POST`
- Ruta: `/user/create`
- Descripción: Crea un nuevo usuario.
- Parámetros:
  - `email` (string): Correo electrónico del usuario.
  - `name` (string): Nombre y apellido del usuario o razón social.
  - `typeId` (string): Tipo de identificacion (DNI, CUIT, etc).
  - `numberId` (string): Número de documento.
  - `country` (string): País del usuario.
    > Nota: Tanto el password como la imagen de usuario son colocados por default en el momento de la creación (Variables de entorno en el backend)

### Inicio de Sesión de Usuario

- Método: `POST`
- Ruta: `/user/login`
- Descripción: Inicia sesión para obtener un token de acceso.
- Parámetros:
  - `email` (string): Correo electrónico del usuario.
  - `password` (string): Contraseña del usuario.

### Obtener Todos los Usuarios (necesita permiso de moderator o admin)

- Método: `GET`
- Ruta: `/user`
- Descripción: Obtiene la lista de todos los usuarios.

### Editar usuarios:(Necesita validacion)

- Método: `PUT`
- Ruta: `/user/:id`
- Descripción: Edita cualquier usuario, cambia sus permisos y puede bloquearlo y desbloquearlo.
- Parámetros:
  - email: `string`
  - password: `string`
  - pictuer: `string`
  - name: `string`
  - typeId: `string`
  - numberId: `string`
  - country: `string`
  - role (selecciona)
  - enable (selecciona)

> Nota: Cada usuario en particular puede editar su propio perfil desde la sección "configuración".

# Rutas de vehículos
### ('car' y 'service')
Estas dos rutas corresponden a las tablas Car y Service de la base de datos.

La tabla Car tiene una relación de `muchos a muchos` con la tabla User, de manera que un usuario puede tener varios vehículos y un vehículo puede tener varios usuarios (como por ejemplo el caso de una empresa, que es la propietaria, pero tiene un chofer que es el responsable del vehículo).

La tabla Service tiene una relación de `uno a muchos` con la tala Car, dado que un vehiculo puede tener muchos services pero cada service corresponde solo a un vehículo.

A cada tabla corresponde una ruta, a fin de separar las responsabilidades; de modo que tendremos las rutas de `car` y `service`.
<br>

### Creación de vehículo

- Método: `POST`
- Ruta: `/car`
- Descripción: Crea un nuevo registro para un vehículo.
- Parámetros:
  - `idUser` (string): Id del usuario al que se le asigna el vehiculo.
  - `patent` (string): Patente del vehículo.
  - `mark` (string): Marca del automotor.
  - `model` (string): Modelo (esto incluye también el tipo).
  - `year` (DATE): Formato de fecha.
  - `motorNum` (string): Numero o código de identidad del motor.
  - `chassisNum` (string): Numero o código de identidad del chasis.
  - `observations` (text): Detalles relevantes a tener en cuenta en la descripción del vehiculo.
  - `picture` (string): Una imagen del vehiculo.

### Obtener Todos los Vehículos (necesita permiso de admin)

- Método: `GET`
- Ruta: `/car`
- Descripción: Obtiene la lista de todos los vehículos.

### Obtener Vehículos por patente (query)

- Método: `GET`
- Ruta: `/car?patent=xxxxx`
- Descripción: Obtiene el vehículo.
### Obtener Vehículos por Id 

- Método: `GET`
- Ruta: `/car/:id`
- Descripción: Obtiene uno o varios vehículos.

> Esta ruta se puede utilizar tanto en user como en los demás roles.


### Editar vehículo: (Necesita validacion)

- Método: `PUT`
 - Ruta: `/car/:id`
- Descripción: Edita cualquier usuario, cambia sus permisos y puede bloquearlo y desbloquearlo.
- Parámetros:
  - patente: `string`
  - marca: `string`
  - modelo: `string`
  - año: `string`
  - motorNum: `string`
  - chassisNum: `string`
  - observations: `string`
  - picture (selecciona)
  - enable (selecciona)
  - deletedAt (selecciona)


<br>

### Creación de servicio

- Método: `POST`
- Ruta: `/service`
- Descripción: Crea un nuevo registro para un vehículo.
- Parámetros:
  - `type` (string): Tipo de servicio prestado.
  - `detail` (text): Detalle del servicio.
  - `dateIn` (string): Fecha de ingreso.
  - `dateOut` (string): Fecha de entrega.
  - `Observations` (TEXT): Observaciones (detalles del trabajo)
  - `picture` (string): Una imagen del vehículo servicio etc.

### Obtener Todos los Servicios (necesita permiso de admin)

- Método: `GET`
- Ruta: `/service`
- Descripción: Obtiene la lista de todos los servicos.

### Obtener Servicios por patente de vehiculo (query) (necesita permiso de admin)
- Método: `GET`
- Ruta: `/service?search=carId`
- Descripción: Obtiene la lista de servicios de un vehiculo.

### Obtener Servicio por Id 

- Método: `GET`
- Ruta: `/service/:id`
- Descripción: Obtiene uno o varios vehículos.

> Esta ruta se puede utilizar tanto en user como en los demás roles.


### Editar Servicio:(Necesita validacion)

- Método: `PUT`
 - Ruta: `/service/:id`
- Descripción: Edita los servicios añade o corrige detalles.
- Parámetros:
  - `type` (string): Tipo de servicio prestado.
  - `detail` (text): Detalle del servicio.
  - `dateIn` (string): Fecha de ingreso.
  - `dateOut` (string): Fecha de entrega.
  - `Observations` (TEXT): Observaciones (detalles del trabajo)
  - `picture` (string): Una imagen del vehículo servicio etc.

### BREVE RESUMEN, SEGUIRÉ AMPLIANDO...

Posteriormente se verá la posibilidad de que en la web se muestren los productos
que se vendern el el taller, como aceites, correas, etc... se agruparán en categorías
Por lo que existe un `Modelo Category, y otro Modelo Product`
También podrán llevar un Modelo de sus proveedores, es decir los mayoristas a donde
ellos compran los productos que utilizan y venden en el taller
Por lo que existe un `Modelo Provider y otro modelo Province` el proveedor tiene sus datos
como ser su nro de TE, localidad, y la provincia.

### Ruta /reinit

Lo que hace esta ruta, es cargar las provincias en la tabla correspondiente, agregar
algunas categorías, algunos productos, y Proveedores. Cuando necesitemos hacer un
`force:true` luego desde, por ejemplo, Insomnia, podremos darle a esta ruta para que
realice estas cargas para tener de ejemplo.


### Post y CategoryPost

Son los modelos y rutas para el blog, las estoy editando...

### Sigue editando...

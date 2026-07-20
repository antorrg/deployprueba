// ? o    o        8              .oPYo.
// ? 8    8        8              8
// ? o8oooo8 .oPYo. 8 .oPYo.       `Yooo. .oPYo. oPYo. o    o .oPYo. oPYo.
// ? 8    8 8oooo8 8 8     8  ooooo   `8 8oooo8 8  `' Y.  .P 8oooo8 8  `'
// ? 8    8 8.     8 8     8           8 8.     8     `b..d' 8.     8
// ? 8    8 `Yooo' 8 8YooP'      `YooP' `Yooo' 8      `YP'  `Yooo' 8
// ? :..:::..:.....:. 8 ....::.....::.....:..::::::...:::.....:..::::
// ?* ::::::::::::::: 8 :::: 06/03/2024 :::::::::::::::::::::::::::::
//* :::::::::::::::::..:::::Version 2 ::::::::::::::::::::::::::::::
//* ::::::::::::::::::Actualizado el 18/08/2024:::::::::::::::::::::
//* ::::::::::::::::::Corregida el 07/04/2026:::::::::::::::::::::::

import app from './src/server.js'
import { startUp } from './src/Configs/database.js'
// import { appUserTable } from './src/Utils/SUcreate-protect/index.js'
// import fillTables from './data/initialFunctions/fillTables.js'
import env from './src/Configs/envConfig.js'


console.log(getPasswordFromDbUrl(env.DatabaseUrl))
async function serverBootstrap () {
  try {
    await startUp()
    app.listen(env.Port, () => {
      console.log(`El server está corriendo 🚴 🏃 en el puerto: ${env.Port};\nEl server esta en ${env.Status}!!\n¡Por ahora todo bien! 😉`)
    })
    // await appUserTable()
    // await fillTables();
  } catch (error) {
    console.error('Error initializing app: ', error)
    process.exit(1)
  }
}
serverBootstrap()

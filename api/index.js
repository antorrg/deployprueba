//? o    o        8              .oPYo.
//? 8    8        8              8
//? o8oooo8 .oPYo. 8 .oPYo.       `Yooo. .oPYo. oPYo. o    o .oPYo. oPYo.
//? 8    8 8oooo8 8 8     8  ooooo   `8 8oooo8 8  `' Y.  .P 8oooo8 8  `'
//? 8    8 8.     8 8     8           8 8.     8     `b..d' 8.     8
//? 8    8 `Yooo' 8 8YooP'      `YooP' `Yooo' 8      `YP'  `Yooo' 8
//? :..:::..:.....:. 8 ....::.....::.....:..::::::...:::.....:..::::
//?* ::::::::::::::: 8 :::: 06/03/2024 :::::::::::::::::::::::::::::
//* :::::::::::::::::..:::::Version 2 ::::::::::::::::::::::::::::::
//* ::::::::::::::::::Actualizado el 18/08/2024:::::::::::::::::::::

import app from "./src/server.js";
import { sequelize } from "./src/db.js";
import { appUserTable } from "./src/Utils/SUcreate-protect/index.js";
import fillTables from "./data/initialFunctions/fillTables.js";
import env from './src/envConfig.js'


app.listen(env.Port, async () => {
  try {
    await sequelize.sync({ force: false});
    await appUserTable();
    await fillTables();
    console.log(`El server está corriendo 🚴 🏃 en el puerto: ${env.Port};
    El server esta ${env.Status}!!
    ¡Por ahora todo bien! 😉`);
  } catch (error) {
    console.error("Error syncing database", error);
  }
});

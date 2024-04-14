const corsConfig = (req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept, Authorization, x-access-token"
  );
  res.header(
    "Access-Control-Allow-Methods",
    " GET, POST, OPTIONS, PATCH, PUT, DELETE, PATCH"
  );
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

export default corsConfig;

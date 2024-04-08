import dotenv from 'dotenv'
dotenv.config();

const corsConfig = (req, res, next) => {

  res.header("Access-Control-Allow-Origin",  process.env.URL_CORS);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept, Authorization, x-access-token"
  );
  res.header(
    "Access-Control-Allow-Methods",
    " GET, POST, OPTIONS, PATCH, PUT, DELETE, PATCH"
  );
  
    next();
  
};

export default corsConfig;

import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext/AuthContext";
import style from "./LoginLinks.module.css";

const LoginLinks = () => {
  const { authenticated, user } = useAuth();

  return (
    <div>
      {authenticated ? (
        user.role === 1 ? null : (
          <Link to="/login">
            {user.role === 0 || user.role === 2 ? (
              <a className={style.out} aria-current="page" href="#">
                Crear usuario
              </a>
            ) : (
              <a className={style.out} aria-current="page" href="#">
                Ingresar
              </a>
            )}
          </Link>
        )
      ) : null
      // <Link to="/login">
      //   <a className={style.ingresar} aria-current="page" href="#">
      //     Ingres
      //   </a>
      // </Link>
      }
      <br></br>
      {authenticated ? (
        <Link to={`/home/user/${user.id}?type=user`}>
          <a className={style.in} aria-current="page" href="#">
            Perfil
          </a>
        </Link>
      ) : null}
    </div>
  );
};

export default LoginLinks;

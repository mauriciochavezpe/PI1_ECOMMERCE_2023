import React, { useEffect } from "react";
import { getMyUser } from "../store/slice/sliceUserLogin";
import { useDispatch, useSelector } from "react-redux";
import { oauth2 } from "../util/oAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLogin, isUserAdmin, value } = useSelector(
    (state) => state.userLogin
  );

  // Obtener la URL actual
  const url = window.location.href;

  // Crear un objeto URL
  const urlObj = new URL(url);

  // Obtener el valor del parámetro "code"
  const code = urlObj.searchParams.get("code");

  const initAuth2 = (code) => {
    let objCurrent = {};
    if (code) {
      if (!localStorage.getItem("TOKEN_COGNITO")) {
        objCurrent.code = code;
      } else {
        let data = localStorage.getItem("TOKEN_COGNITO");
        objCurrent = JSON.parse(data);
        objCurrent.code = code;
      }
      // if (!objCurrent.oauth2) {
      localStorage.setItem("TOKEN_COGNITO", JSON.stringify(objCurrent));
      oauth2();
      // }
    }
  };

  useEffect(() => {
    initAuth2(code);
    if(isLogin){
      navigate("/");

    }
  }, []);

  return (
    <>
      <p>{isLogin ? "Estas logeado" : "no estas logeado"}</p>
    </>
  );
};

export default Login;

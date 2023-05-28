import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const LoginProccess = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .get(`http://localhost:8000/users/${userName}/`)
        .then(() => {
            toast.success("Вы успешно вошли в свой аккаунт!");
            setTimeout(() => {
              navigate("/");
            }, 2000);
        })
        .catch(() => {
          toast.error("Пользователь не найден");
        });
    }
  };


  const validate = () => {
    let result = true;
    if (userName === "" || userName === null) {
      result = false;
      alert("Заполните никнейм");
    }
    if (pass === "" || pass === null) {
      result = false;
      alert("Заполните пароль");
    }
    return result;
  };

  return (
    <div className="text-center mx-auto mt-20 p-5 bg-slate-100 max-w-lg shadow-lg shadow-cyan-500/50 rounded-2xl">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <h1 className="">Login</h1>
      <div className="flex flex-col gap-y-1">
        <label>
          <input
            className="border-2"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            type="text"
          />
        </label>
        <label>
          <input
            className="border-2"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
          />
        </label>
      </div>
      <div className="flex justify-center gap-x-1">
        <button onClick={LoginProccess}>Войти</button>
        <span>/</span>
        <button>
          <Link to="/register">Регистрация</Link>
        </button>
      </div>
    </div>
  );
};

export default Login;

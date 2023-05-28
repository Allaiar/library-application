//Импорты
import "./style.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Books from "./pages/Books";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import OneBigBook from "./pages/OneBigBook";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [books, setBooks] = useState([]); //Массив книг
  //Запрос данных с помощью useEffect
  useEffect(() => {
    axios
      .get("http://localhost:8000/books")
      .then((res) => setBooks(res.data))
      .catch(() => toast.error("Ошибка сервера"));
  }, []);

  return (
    <Routes>
      <Route path="/OneBigBook/:id" element={<OneBigBook books={books} />} />
      {/*Ссылка для страницы отдельной книги*/}
      <Route path="/" element={<Books />} />
      {/*Ссылка на страницу книг*/}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

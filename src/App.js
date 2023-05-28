//Импорты
import "./style.css";
import { useEffect , useState } from "react";
import { Route, Routes } from "react-router-dom";
import Books from "./pages/Books";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import OneBigBook from "./pages/OneBigBook";

function App() {
  const [posts, setPosts] = useState([]);//Массив книг
  //Запрос данных с помощью useEffect    
  useEffect(() => {
    axios
      .get("http://localhost:8000/posts")
      .then((res) => setPosts(res.data))
      .catch(() => toast.error("Ошибка сервера"));
  }, []);

  return (
    <Routes>
      <Route path="/OneBigBook/:id" element={<OneBigBook posts={posts} />} />{/*Ссылка для страницы отдельной книги*/}
      <Route path="/" element={<Books />} />{/*Ссылка на страницу книг*/}
    </Routes>
  );
}

export default App;

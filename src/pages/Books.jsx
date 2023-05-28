//Импорты
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Books = () => {
  //State компоненты
  const [books, setbooks] = useState([]); //Массив книг
  const [author, setAuthor] = useState(""); //Автор книги
  const [status, setStatus] = useState("Не прочитано"); //Статус книги
  const [title, setTitle] = useState(""); //Название книги
  const [edit, setEdit] = useState(""); //Для редактирования
  const [body, setBody] = useState(""); //Содержание книги

  //Запрос данных с помощью useEffect
  useEffect(() => {
    axios
      .get("http://localhost:8000/books")
      .then((res) => setbooks(res.data))
      .catch(() => toast.error("Ошибка сервера"));
  }, []);

  //Удаление книги
  const deleteBook = (id) => {
    axios.delete(`http://localhost:8000/books/${id}`).then(() => {
      const newbooks = books.filter((book) => book.id !== id);
      setbooks(newbooks);
      toast.info("Вы успешно удалили книгу");
    });
  };

  //Создание новой книги
  const createBook = () => {
    axios
      .post("http://localhost:8000/books", {
        title: title,
        author: author,
        body: body,
        status: status,
      })
      .then((res) => {
        toast.info("Вы создали книгу");
        const bookListItem = res.data;
        setbooks([bookListItem, ...books]);
        setStatus("");
        setTitle("");
        setAuthor("");
        setBody("");
      });
  };

  //Редактирование книги
  const editBooks = (id) => {
    axios
      .put(`http://localhost:8000/books/${id}`, {
        author: author,
        title: title,
        status: status,
        body: body,
      })
      .then(() => {
        const editBook = books.map((book) =>
          book.id === id ? { ...book, title: title, author: author } : book
        );
        toast.info("Изменения прошли успешно");
        setbooks(editBook);
        setEdit("");
        setAuthor("");
        setTitle("");
        setBody("");
      });
  };

  return (
    <div className="flex flex-col">
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
        theme="dark"
      />
      <div className="flex justify-end gap-x-1 mr-10 my-2">
        <button>
        <Link to="/register">Register</Link>
        </button>
        <span>/</span>
        <button>
          <Link to="/login">Login</Link>
        </button>
      </div>
      <div className="create-bar flex justify-center my-2">
        <div className="flex flex-col justify-center">
          <div className="flex justify-center gap-x-1">
            <label className="flex flex-col font-medium text-xs">
              <p>Author</p>
              <input
                className="input border-2 border-slate-600 text-sm"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </label>
            <label className="flex flex-col font-medium text-xs">
              <p>Name</p>
              <input
                className="input2 input border-2 border-slate-600 text-sm"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
          <form className="flex mt-1">
            <input
              type="checkbox"
              value="Читаю"
              checked={status === "Читаю"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <p className="font-medium text-xs">Читаю</p>
          </form>
          <form className="flex">
            <input
              type="checkbox"
              value="Отложено"
              checked={status === "Отложено"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <p className="font-medium text-xs">Отложено</p>
          </form>
          <form className="flex">
            <input
              type="checkbox"
              value="Прочитано"
              checked={status === "Прочитано"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <p className="font-medium text-xs">Прочитано</p>
          </form>
          <form className="flex">
            <input
              type="checkbox"
              value="Запланировано"
              checked={status === "Запланировано"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <p className="font-medium text-xs">Запланировано</p>
          </form>
          <button
            className="create font-medium text-xl flex"
            onClick={createBook}
          >
            Создать
          </button>
        </div>
      </div>
      <div className="mx-auto">
        {books.map((book) => (
          <div
            className="book rounded-2xl pt-2 my-5 max-w-sm bg-slate-400"
            key={book.id}
          >
            {edit === book.id ? (
              <div className="ml-3 pb-3">
                <p>Внесите изменения:</p>
                <div className="flex gap-x-1">
                  <label className="flex flex-col font-medium text-xs">
                    <p>Author</p>
                    <input
                      className="input border-2 border-slate-600 text-sm"
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </label>
                  <label className="flex flex-col font-medium text-xs">
                    <p>Name</p>
                    <input
                      className="input2 input border-2 border-slate-600 text-sm"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </label>
                </div>
                <form className="flex mt-1">
                  <input
                    type="checkbox"
                    value="Читаю"
                    checked={status === "Читаю"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <p className="font-medium text-xs">Читаю</p>
                </form>
                <form className="flex">
                  <input
                    type="checkbox"
                    value="Отложено"
                    checked={status === "Отложено"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <p className="font-medium text-xs">Отложено</p>
                </form>
                <form className="flex">
                  <input
                    type="checkbox"
                    value="Прочитано"
                    checked={status === "Прочитано"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <p className="font-medium text-xs">Прочитано</p>
                </form>
                <form className="flex">
                  <input
                    type="checkbox"
                    value="Запланировано"
                    checked={status === "Запланировано"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <p className="font-medium text-xs">Запланировано</p>
                </form>
                <button
                  className="font-medium text-xl"
                  onClick={() => editBooks(book.id)}
                >
                  Сохранить
                </button>
              </div>
            ) : (
              <div
                className="flex justify-center mx-auto flex-col bg-slate-400 max-w-sm rounded-2xl pt-2"
                key={book.id}
              >
                <Link
                  className="mx-auto pl-5 pr-5"
                  to={`/OneBigBook/${book.id}`}
                >
                  <h5 className="font-medium">{book.title}</h5>
                  <h3 className="text-right italic max-w-sm">{book.author}</h3>
                </Link>
                <div className="mx-auto my-5">
                  <button className="mr-2" onClick={() => deleteBook(book.id)}>
                    Удалить
                  </button>
                  <button className="edit" onClick={() => setEdit(book.id)}>
                    Изменить
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;

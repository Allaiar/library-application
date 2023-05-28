import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function OneBigBook({ posts }) {
  //Вытаскиваем id из url с помощью useParams
  const { id } = useParams();
  //Пост с id
  const post = posts[id];
  // Если пост не найден выводим сообщение о загрузке
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        className="flex justify-center 
        mx-auto flex-col 
        bg-slate-400
         max-w-sm rounded-2xl 
         my-5 pr-6 pb-3"
        key={post.id}
      >
      <button className="text-left mb-2 ml-2 mt-1">
        <Link className="" to="/">
          ←Назад
        </Link>
      </button>
      <div className="ml-6">
        <h5 className="font-medium text-center mb-2">{post.title}</h5>
        <h5 className="italic mb-2">{post.body}</h5>
        <h3 className="italic text-right text-slate-600">{post.author}</h3>
      </div>
      </div>
    </div>
  );
}

export default OneBigBook;

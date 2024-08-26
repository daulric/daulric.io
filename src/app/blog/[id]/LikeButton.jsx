"use client"
import { useState, useEffect } from "react";
import axios from "axios"

export default function LikeButton({id}) {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
      axios.get(`/blog/${id}/likes`)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }
          return response.data;
        })
        .then((likes_data) => {
          setLikes(likes_data.likes);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }, [id]);

    const setLike = (increment) => {
      axios.post(`/blog/${id}/likes`, {
          increment: increment,
      }).then((response) => response.data).then((data) => {
        if (data.success === true) {
          if (increment === true) {
            setLikes(likes + 1);
            setLiked(increment);
          } else if (increment === false) {
            setLikes(likes - 1);
            setLiked(increment);
          }
        }
      }).catch((error) => console.log(error));
    }

    const handleLike = () => {
      if (!liked) {
        setLike(true)
      } else {
        setLike(false)
      }
    };
  
    return (
      <button
        onClick={handleLike}
        className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
          liked ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
        } hover:bg-blue-500 transition duration-300`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
        <span>{likes}</span>
      </button>
    );
  }
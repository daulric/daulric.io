"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function LikeButton({ id }) {
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
          setLiked(true);
        } else if (increment === false) {
          setLikes(likes - 1);
          setLiked(false);
        }
      }
    }).catch((error) => console.log(error));
  }

  const handleLike = () => {
    setLike(!liked);
  };

  return (
    <Button
      onClick={handleLike}
      variant={liked ? "default" : "outline"}
      size="sm"
      className={`
        flex items-center space-x-2 transition-all duration-300
        ${liked 
          ? 'bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90' 
          : 'hover:bg-primary/10 dark:hover:bg-primary/30 dark:text-foreground'
        }
      `}
    >
      <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
      <span>{likes}</span>
    </Button>
  );
}
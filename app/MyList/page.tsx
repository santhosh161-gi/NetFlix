"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TMDBItem } from "@/type/tmdb";
import {
  getmyList,
  removeFromMyListById,
} from "@/lib/myList";

const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE;

const MyListPage = () => {
  const [myList, setMyList] = useState<TMDBItem[]>([]);

  // load list
  useEffect(() => {
    setMyList(getmyList());
  }, []);

  const handleRemove = (id: number) => {
    removeFromMyListById(id);
    setMyList((prev) => prev.filter((item) => item.id !== id));
  };

  if (myList.length === 0) {
    return (
      <div className="px-20 py-10">
        <h1 className="text-3xl font-bold text-white mb-6">My List</h1>
        <p className="text-white text-center">
          No movies in your list yet.
        </p>
      </div>
    );
  }

  return (
    <div className="px-20 py-20">
      <h1 className="text-3xl font-bold text-white mb-6">My List</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {myList.map((movie) => (
          <div key={movie.id} className="w-[240px]">
            <div className="relative h-[140px] w-full rounded-md overflow-hidden bg-black">
              <Image
                src={`${IMAGE_BASE}${movie.backdrop_path || movie.poster_path}`}
                alt={movie.title || movie.name || ""}
                fill
                className="object-cover"
              />
            </div>

            <div className="text-white mt-2">
              <h2 className="text-lg font-bold">
                {movie.title || movie.name}
              </h2>
              <p className="text-sm text-gray-400">
                {movie.release_date || movie.first_air_date}
              </p>
            </div>

            <button
              onClick={() => handleRemove(movie.id)}
              className="mt-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListPage;

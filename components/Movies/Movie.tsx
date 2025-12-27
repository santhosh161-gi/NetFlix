"use client";

import React, { useEffect, useState } from "react";
import { TMDBItem } from "@/type/tmdb";
import { FaAngleRight } from "react-icons/fa";
import Image from "next/image";
import Details from "./Details";

const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const Movie = () => {
  const [movies, setMovies] = useState<TMDBItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<TMDBItem | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <p className="text-white px-6">Loading movies...</p>;
  }

  return (
    <>
      {/* TITLE */}
      <div className="px-6 sm:px-10 md:px-20 mb-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          Movies <FaAngleRight />
        </h1>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6 sm:px-10 md:px-20 transition-all duration-300 ease-in-out py-10 ">
        {movies.map((movie) => {
          const imagePath =
            movie.poster_path && IMAGE_BASE
              ? `${IMAGE_BASE}${movie.poster_path}`
              : "/placeholder.jpg";

          return (
            <div
              key={movie.id}
              className="relative h-[300px] rounded-lg overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-105 transform hover:translate-y-[-10px]" onClick={() => setSelectedItem(movie)}
            >
              <Image
                src={imagePath}
                alt={movie.title || movie.name || "Movie"}
                height={300}
                width={200}
                className="object-cover transition-transform duration-300 rounded-lg group-hover:scale-110  transform hover:translate-y-[-10px]"
              />
            </div>
          );
        })}
      </div>
      
      {/* ================= DETAILS MODAL ================= */}
      {selectedItem && (
        <Details
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
};

export default Movie;

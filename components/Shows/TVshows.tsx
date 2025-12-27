"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaAngleRight } from "react-icons/fa";
import Details from "./Details";
import { TMDBItem } from "@/type/tmdb";



const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

type TVShow = {
  id: number;
  name: string;
  poster_path: string | null;
};

const TVshows = ({ name }: { name: string }) => {
    // type assertion
    
  const [tvshows, setTvshows] = useState<TMDBItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTVShow, setSelectedTVShow] = useState<TMDBItem | null>(null);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        setTvshows(data.results || []);
      } catch (error) {
        console.error("Failed to fetch TV shows", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, []);

  if (loading) return <p className="text-white px-6">Loading TV Shows...</p>;

  return (
    <>
      {/* Title */}
      <div className="px-6 sm:px-10 md:px-20 mb-2">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          {name} <FaAngleRight />
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 py-10 px-6 sm:px-10 md:px-20">
        {tvshows.map((tvshow) => {
          const imagePath =
            tvshow.poster_path && IMAGE_BASE
              ? `${IMAGE_BASE}${tvshow.poster_path}`
              : "/placeholder.jpg";

          return (
            <div
              key={tvshow.id}
              className="hover:scale-110 transition cursor-pointer group relative "
              onClick={() => setSelectedTVShow(tvshow)}
            >
              <Image
                src={imagePath}
                alt={tvshow.name || tvshow.title || ""}
                width={200}
                height={300}
                className="rounded-lg object-cover w-full h-full group-hover:opacity-100 transition-opacity duration-300"
              />
              
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedTVShow && (
        <Details
          tvshow={selectedTVShow}
          onClose={() => setSelectedTVShow(null)}
        />
      )}
    </>
  );
};

export default TVshows;


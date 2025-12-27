"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { addToMyList } from "@/lib/myList";
import { TMDBItem } from "@/type/tmdb";





const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE;

const Details = ({
  tvshow,
  onClose,
}: {
  tvshow: TMDBItem;   
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // ✅ ESC key close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!tvshow.poster_path) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center "
      onClick={onClose} // ✅ background click
    >
      <div
        ref={modalRef}
        className="relative w-[80%] h-[80%] bg-[#181818] rounded-lg p-4"
        onClick={(e) => e.stopPropagation()} // prevent close on modal click
      >
        {/* CLOSE BUTTON */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-white hover:scale-110 transition"
        >
          ✕
        </button>

        {/* IMAGE */}
       <div className="w-full h-full flex flex-row gap-6 px-6">
  {/* LEFT : POSTER */}
  <div className="relative w-[300px] h-full flex-shrink-0">
    <Image
      src={`${IMAGE_BASE}${tvshow.poster_path}`}
      alt={tvshow.name || "TV Show"}
      fill
      className="object-contain rounded-lg"
    />
  </div>

  {/* RIGHT : DETAILS */}
  <div className="flex-1 flex flex-col justify-start text-white px-4 mt-10">
    {/* TITLE */}
    <h2 className="text-4xl font-bold mb-2">
      {tvshow.title || tvshow.name || "TV Show"}
    </h2>

    {/* DATE */}
    <p className="text-sm text-gray-300 mb-4">
      {tvshow.release_date || tvshow.first_air_date}
    </p>

    {/* OVERVIEW */}
    <p className="text-base leading-relaxed text-gray-200">
      {tvshow.overview}
    </p>

    {/* ACTIONS (optional – Netflix style) */}
    <div className="flex gap-4 mt-6">
      <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-red-600">
        ▶ Play
      </button>
      <button className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600" onClick={() => addToMyList(tvshow)} >
        + My List 
      </button>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Details;
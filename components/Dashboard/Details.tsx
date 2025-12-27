"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { addToMyList } from "@/lib/myList";
import { TMDBItem } from "@/type/tmdb";

const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE;

type Props = {
  item: TMDBItem;
  onClose: () => void;
};

const Details = ({ item, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // ✅ ESC key close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!item.poster_path) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-[80%] h-[80%] bg-[#181818] rounded-lg p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-white hover:scale-110 transition"
        >
          ✕
        </button>

        {/* CONTENT */}
        <div className="w-full h-full flex flex-row gap-6 px-6">
          {/* LEFT : POSTER */}
          <div className="relative w-[300px] h-full flex-shrink-0">
            <Image
              src={
                IMAGE_BASE && item.poster_path
                  ? `${IMAGE_BASE}${item.poster_path}`
                  : "/placeholder.jpg"
              }
              alt={item.title || item.name || "TMDB Item"}
              fill
              className="object-contain rounded-lg"
            />
          </div>

          {/* RIGHT : DETAILS */}
          <div className="flex-1 flex flex-col text-white px-4 mt-10">
            {/* TITLE */}
            <h2 className="text-4xl font-bold mb-2">
              {item.title || item.name}
            </h2>

            {/* DATE */}
            <p className="text-sm text-gray-300 mb-4">
              {item.release_date || item.first_air_date}
            </p>

            {/* OVERVIEW */}
            <p className="text-base leading-relaxed text-gray-200">
              {item.overview}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-4 mt-6">
              <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-red-600">
                ▶ Play
              </button>

              <button
                className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600"
                onClick={() => addToMyList(item)}
              >
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




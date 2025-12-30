"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  FaAngleRight,
  FaBookmark,
  FaChevronLeft,
  FaChevronRight,
  FaPlayCircle,
} from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";

import Details from "./Details";
import { TMDBItem } from "@/type/tmdb";
import { addToMyList, isInMyList, removeFromMyList } from "@/lib/myList";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE;

const CARD_WIDTH = 260;

const Gems = ({ name }: { name: string }) => {
  const [movies, setMovies] = useState<TMDBItem[]>([]);
  const [hoveredItem, setHoveredItem] = useState<TMDBItem | null>(null);
  const [hoverRect, setHoverRect] = useState<DOMRect | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TMDBItem | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch(console.error);
  }, []);

  const closeHover = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHovering(false);
      setHoveredItem(null);
    }, 150);
  };

  const isDesktop = () => window.innerWidth >= 768;

  return (
    <>
      {/* ================= ROW ================= */}
      <div className="w-full relative">
        {/* TITLE */}
        <div className="px-4 sm:px-10 md:px-20 mb-2">
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            {name} <FaAngleRight />
          </h1>
        </div>

        {/* CAROUSEL */}
        <div className="relative px-4 sm:px-10 md:px-20">
          {/* LEFT BUTTON (VISIBLE ON MOBILE) */}
          <button
            onClick={() =>
              scrollRef.current?.scrollBy({
                left: -CARD_WIDTH,
                behavior: "smooth",
              })
            }
            className="
              absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40
              bg-black/70 text-white p-2 rounded-full
            "
          >
            <FaChevronLeft size={20} />
          </button>

          {/* RIGHT BUTTON (VISIBLE ON MOBILE) */}
          <button
            onClick={() =>
              scrollRef.current?.scrollBy({
                left: CARD_WIDTH,
                behavior: "smooth",
              })
            }
            className="
              absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40
              bg-black/70 text-white p-2 rounded-full
            "
          >
            <FaChevronRight size={20} />
          </button>

          {/* ITEMS CONTAINER (NO OVERFLOW) */}
          <div
            ref={scrollRef}
            className="
              flex gap-3 sm:gap-4
              py-6 sm:py-10
              overflow-hidden
              scroll-smooth
            "
          >
            {movies.map((item) => {
              const imagePath =
                IMAGE_BASE && (item.backdrop_path || item.poster_path)
                  ? `${IMAGE_BASE}${item.backdrop_path || item.poster_path}`
                  : "/placeholder.jpg";

              return (
                <div
                  key={item.id}
                  className="w-[170px] sm:w-[220px] md:w-[250px] flex-shrink-0 cursor-pointer"
                  onMouseEnter={(e) => {
                    if (!isDesktop()) return;

                    if (hoverTimeout.current)
                      clearTimeout(hoverTimeout.current);

                    setIsHovering(true);
                    setHoveredItem(item);
                    setHoverRect(e.currentTarget.getBoundingClientRect());
                  }}
                  onMouseLeave={() => {
                    if (!isDesktop()) return;
                    closeHover();
                  }}
                >
                  <div
                    className="
                      relative
                      h-[95px] sm:h-[120px] md:h-[140px]
                      w-full
                      rounded-md
                      overflow-hidden
                      bg-black
                    "
                    onClick={() => setSelectedItem(item)}
                  >
                    <Image
                      src={imagePath}
                      alt={item.title || item.name || "TMDB item"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= HOVER PREVIEW (DESKTOP ONLY) ================= */}
      {hoveredItem &&
        hoverRect &&
        isHovering &&
        createPortal(
          <div
            style={{
              top: hoverRect.top - 50,
              left: hoverRect.left,
              width: hoverRect.width,
            }}
            className="fixed z-[9999] bg-[#181818] rounded-lg shadow-2xl scale-110 hidden md:block"
            onMouseEnter={() => {
              if (hoverTimeout.current)
                clearTimeout(hoverTimeout.current);
              setIsHovering(true);
            }}
            onMouseLeave={closeHover}
          >
            {/* IMAGE */}
            <div
              className="relative h-[150px] cursor-pointer"
              onClick={() => setSelectedItem(hoveredItem)}
            >
              <Image
                src={
                  hoveredItem.backdrop_path && IMAGE_BASE
                    ? `${IMAGE_BASE}${hoveredItem.backdrop_path}`
                    : "/placeholder.jpg"
                }
                alt={hoveredItem.title || hoveredItem.name || ""}
                fill
                className="object-cover"
              />
            </div>

            {/* DETAILS */}
            <div className="p-4 text-white">
              <p className="font-semibold mb-2">
                {hoveredItem.title || hoveredItem.name}
              </p>

              <div className="flex gap-3">
                <button className="bg-white text-black p-2 rounded-full">
                  <FaPlayCircle />
                </button>

                <button className="bg-gray-700 p-2 rounded-full">
                  <CiBoxList />
                </button>

                <button
                  className={`bg-gray-700 p-2 rounded-full hover:bg-gray-600 ${
                    isInMyList(hoveredItem)
                      ? "text-[#e50914]"
                      : "text-white"
                  }`}
                  onClick={() => {
                    if (isInMyList(hoveredItem)) {
                      removeFromMyList(hoveredItem);
                    } else {
                      addToMyList(hoveredItem);
                    }
                  }}
                >
                  <FaBookmark />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

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

export default Gems;




















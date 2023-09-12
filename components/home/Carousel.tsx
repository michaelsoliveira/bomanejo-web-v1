import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';

// Data
import data from './images.json';

import RecursiveTimeout from './recursiveTimeout';

const AUTOPLAY_INTERVAL = 6000

export const Carousel = function Carousel() {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  const autoplay = useCallback(() => {
    if (
        carousel.current !== null &&
        carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
      ) {
        setCurrentIndex((prevState) => prevState + 1);
      } else {
        setCurrentIndex(0)
      }
  }, [currentIndex]);

  // returns the play and stop methods
  const { play, stop } = RecursiveTimeout(autoplay, AUTOPLAY_INTERVAL);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction: any) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    play()
  }, [play])

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="carousel flex flex-row  w-full my-4 mx-auto border border-green-700">
      {/* <h2 className="text-4xl leading-8 font-semibold my-4 text-gray-800">
        Recursos
      </h2> */}
      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top left w-full h-full">
          <button
            onClick={movePrev}
            className="hover:bg-green-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('prev')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="hover:bg-green-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('next')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative flex overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          <div className="flex"
            onMouseOver={stop}
            onMouseLeave={play}
          >
            {data.resources.map((resource, index) => {
              return (
                <div
                  key={index}
                  className="carousel-item relative w-96 h-96 snap-start"
                >
                  <a
                    href={resource.link}
                    className="aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                  >
                    <Image
                      src={resource.imageUrl || ''}
                      alt={resource.title}
                      //layout='fill'
                      width={400}
                      height={400}
                      className="aspect-square hidden"
                    />
                  </a>
                  <a
                    href={resource.link}
                    className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-70 bg-green-800/75 z-10"
                  >
                    <h3 className="text-white py-6 px-3 mx-auto text-center text-xl">
                      {resource.title}
                    </h3>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { OrbitControls, ScrollControls, Sky, Stars, StatsGl } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { Overlay } from "./portfolio/Overlay";
import Loader from "./portfolio/Loader";
// import MyBG from "./portfolio/MyBG";
import 'flowbite'
import { Bg } from "./portfolio/Bg";

export default function App() {
  const [isControlling, setIsControlling] = useState<boolean>(false);
  const [isShowStats, setIsShowStats] = useState<boolean>(false);
  const [isZooming, setIsZooming] = useState<boolean>(false);

  useEffect(() => {
    const divTouch = document.querySelector('canvas')?.nextElementSibling as HTMLElement;
    !isControlling && divTouch && divTouch.style.removeProperty('touch-action');
  }, [isControlling])

  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 8], zoom: 2 }} >
        {isShowStats && <StatsGl />}
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={1} />
          <Stars radius={30} depth={50} count={1000} factor={4} saturation={1} fade speed={.3} />
          <ScrollControls pages={5} damping={0.12}>
            <Overlay />
            {/* <Overlay /> */}
            {/* <MyBG /> */}
            {isControlling && <OrbitControls enableZoom={isZooming} autoRotate />}
            <Bg />
            <Sky sunPosition={[100, 20, 100]} distance={99999999} />
          </ScrollControls>
        </Suspense>
      </Canvas>
      <nav className="absolute top-0 right-0 backdrop-blur-sm rounded m-5 gap-3 flex flex-col">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={isShowStats} onChange={
            () => setIsShowStats((prev: any) => {
              prev && setIsControlling(false);
              return !prev;
            })
          } />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
          <span className="ml-3 text-sm font-medium text-white">Stats</span>
        </label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" onChange={() =>
            setIsControlling((prev: any) => {
              prev && setIsZooming(false);
              return !prev;
            })} checked={isControlling} />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
          <span className="ml-3 text-sm font-medium text-white">Control</span>
        </label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" onChange={() => setIsZooming((prev: any) => {
            !prev && setIsControlling(true);
            return !prev;
          })} checked={isZooming} />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
          <span className="ml-3 text-sm font-medium text-white">Zoom</span>
        </label>
      </nav>
    </>
  );
}

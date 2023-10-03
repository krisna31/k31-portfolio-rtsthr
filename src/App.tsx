import { OrbitControls, ScrollControls, Sky, Stars } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Overlay } from "./portfolio/Overlay";
import Loader from "./portfolio/Loader";
import MyBG from "./portfolio/MyBG";
import 'flowbite'

export default function App() {
  // const [isControlling, setIsControlling] = useState<boolean>(true);
  // const [isShowStats, setIsShowStats] = useState<boolean>(false);
  // const [isZooming, setIsZooming] = useState<boolean>(false);


  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 8], zoom: 2 }} >
        {/* {isShowStats && <StatsGl />} */}
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={1} />
          <Stars radius={30} depth={50} count={1000} factor={4} saturation={1} fade speed={.3} />
          <OrbitControls enableZoom={false} autoRotate />
          <ScrollControls pages={5} damping={0.12}>
            {/* <Overlay isControlling={isControlling} setIsControlling={setIsControlling} isZooming={isZooming} setIsZooming={setIsZooming} isShowStats={isShowStats} setIsShowStats={setIsShowStats} /> */}
            <Overlay />
            <MyBG />
            <Sky sunPosition={[100, 20, 100]} distance={99999999} />
          </ScrollControls>
        </Suspense>
      </Canvas>

    </>
  );
}

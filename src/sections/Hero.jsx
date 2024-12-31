import { PerspectiveCamera } from '@react-three/drei'
import React, { Suspense, useState } from 'react'
import CanvasLoader from '../component/CanvasLoader'
import { Canvas } from '@react-three/fiber';
// import {Leva, useControls} from "leva";
import { useMediaQuery } from 'react-responsive';
import { calculateSizes } from '../constants/index.js';
import HackerRoom from '../component/HackerRoom';
import HeroCamera from '../component/HeroCamera.jsx';
import Button from '../component/Button.jsx';

const Hero = () => {
    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024});

    const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section className='min-h-screen w-full flex flex-col relative'>
        <div className='w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3'>
            <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
                Hi, I am Gunesh <span className="waving-hand">👋</span>
            </p>
            <p className='hero_tag text-gray_gradient text-center'>Building Robots using ROS2</p>
        </div>
        
        <div className='w-full h-full absolute inset-0'>
            {/* <Leva /> */}
            <Canvas className="w-full h-full">
                <Suspense fallback={<CanvasLoader />}>
                    <PerspectiveCamera makeDefault position={[0, 0, 20]} />
                    <HeroCamera>
                        <HackerRoom 
                            //scale={0.07} 
                            position={sizes.deskPosition} 
                            rotation={[0, -Math.PI, 0]}
                            scale={sizes.deskScale}
                            // position={[x.positionX, x.positionY, x.positionZ]} 
                            // rotation={[x.rotationX, x.rotationY, x.rotationZ]}
                            // scale={[x.scale, x.scale, x.scale]}
                        />
                    </HeroCamera>
                    <ambientLight intensity={1} />
                    <directionalLight position={[10, 10, 10]} intensity={0.5} />
                </Suspense>
            </Canvas>
        </div>

        <div className='absolute bottom-7 left-0 right-0 w-full z-10 c-space'>
            <a href='#contact' className='w-fit'>
                <Button name="Let's work together!" isBeam containerClass="sm:w-fit w-full sm:min-w-9" />
            </a>
        </div>
    </section>
  )
}

export default Hero
import { PerspectiveCamera } from '@react-three/drei';
import React, { Suspense } from 'react';
import CanvasLoader from '../component/CanvasLoader';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { calculateSizes } from '../constants/index.js';
import RaspberryPi from '../component/RaspberryPi';
import ArduinoUno from '../component/ArduinoUno';

const Robots_Components = () => {
    
    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

    const sizes = calculateSizes(isSmall, isMobile, isTablet);

    return (
        <section className="c-space my-20">
            <p className="head-text">Main Brain of my Robots 🧠</p>
            <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
                <div className="xl:col-span-2 xl:row-span-3">
                    <div className="grid-container">
                        <div className="w-full sm:h-[266px] h-fit">
                            <Canvas className="w-full h-full">
                                <Suspense fallback={<CanvasLoader />}>
                                    <PerspectiveCamera makeDefault position={[0, 0, 20]} />
                                    <group>
                                        <RaspberryPi 
                                            scale={0.115}
                                            rotation={[0, 0, 1]} 
                                            position={[0, 1.5, 0]}
                                        />
                                    </group>
                                    <ambientLight intensity={2} />
                                    <directionalLight position={[10, 10, 10]} intensity={0.5} />
                                </Suspense>
                            </Canvas>
                        </div>
                        <div>
                            <p className="grid-headtext">Raspberry Pi</p>
                            <p className="grid-subtext">Raspberry Pi is the main process or the brain of my robots. It is a comupter in a very small form-factor.</p>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-2 xl:row-span-3">
                    <div className="grid-container">
                        <div className="w-full sm:h-[266px] h-fit">
                            <Canvas className="w-full h-full">
                                <Suspense fallback={<CanvasLoader />}>
                                    <PerspectiveCamera makeDefault position={[0, 0, 20]} />
                                    <group>
                                        <ArduinoUno 
                                            scale={0.115}
                                            rotation={[0, 0.5, 1]}
                                            position={[0, -1, 0]} 
                                        />
                                    </group>
                                    <ambientLight intensity={2} />
                                    <directionalLight position={[10, 10, 10]} intensity={0.5} />
                                </Suspense>
                            </Canvas>
                        </div>
                        <div>
                            <p className="grid-headtext">Arduino Uno</p>
                            <p className="grid-subtext">Its a microcontroller which controls the movement of the robot. The commands to it is given by Raspberry Pi according to the suitable conditions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Robots_Components;

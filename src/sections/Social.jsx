import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import Linkedin from '../component/Linkedin';
import CanvasLoader from '../component/CanvasLoader'; // Ensure you have this component for fallback loading
import Youtube from '../component/Youtube';

const Social = () => {
  return (
    <div className="social-section w-full h-full">
        <div className="w-full text-white-600 text-center">
        <p className="head-text">Social</p>
            <Canvas className="w-full h-full">
                <Suspense fallback={<CanvasLoader />}>
                <PerspectiveCamera makeDefault position={[0, 0, 35]} />
                <group>
                    <Linkedin 
                    position={[25, 0, 0]}
                    rotation={[Math.PI/2, 0, 0]}
                    scale={3}
                    />
                    <Youtube
                    position={[-25, -18, 0]}
                    rotation={[0, 0, 0]}
                    scale={1.5}
                    />
                </group>
                <ambientLight intensity={2} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                </Suspense>
            </Canvas>
        </div>
    </div>
  );
}

export default Social;

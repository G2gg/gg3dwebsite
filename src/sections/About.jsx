import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import React, { Suspense, useState } from 'react';
import CanvasLoader from '../component/CanvasLoader'; // Make sure the path is correct
import { Canvas } from '@react-three/fiber';
import Globe from 'react-globe.gl';
import Button from '../component/Button'; // Make sure the path is correct
import Robot_arm from '../component/Robot_arm'; // Make sure the path is correct
import Breadboard from '../component/Breadboard';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('guneshguptag@gmail.com');
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />
            <div>
              <p className="grid-headtext">Hi, I’m Gunesh Gupta</p>
              <p className="grid-subtext">
                I am pursuing B.Tech. in Computer Science and Engineering with a specialization in IoT and Robotics at Bennett University.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <div className='canvas-container' >
              <Canvas className="w-full h-full">
                  <Suspense fallback={<CanvasLoader />}>
                    <PerspectiveCamera makeDefault position={[0, 0, 20]} />
                    <group>
                      <Robot_arm 
                        position={[0, -8, 0]}
                        scale={1.4}
                      />
                    </group>
                    <ambientLight intensity={2} />
                    <directionalLight position={[10, 10, 10]} intensity={0.5} />
                  </Suspense>
                </Canvas>
            </div>
            <div>
              <p className="grid-headtext">My Passion for Robotics</p>
              <p className="grid-subtext">
                I love learning about the mechanical aspects of robotics and then programming them from the basics.
                Programming for robots isn&apos;t just my profession—it&apos;s my passion.
                I enjoy exploring new technologies and enhancing my skills.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[{ lat: 29.9362, lng: 78.0685, text: "I'm here!!", color: 'black', size: 20 }]}
              />
            </div>
            <div>
              <p className="grid-headtext">I’m very flexible with time zone communications & locations</p>
              <p className="grid-subtext">I&apos;m based in Haridwar, Uttarakhand, India and open to taking robotics-based internships.</p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="xl:col-span-2 xl:row-span-3 h-full">
            <div className="grid-container h-full flex flex-col justify-between">
              <div className="w-full sm:h-[266px] h-full">
                <Canvas className="w-full h-full">
                  <Suspense fallback={<CanvasLoader />}>
                    <PerspectiveCamera makeDefault position={[0, 0, 20]} />
                    <group>
                      <Breadboard 
                        position={[0, 0, 0]}
                        rotation={[1.3, 0, 0]}
                        scale={0.5}
                      />
                    </group>
                    <ambientLight intensity={2} />
                    <directionalLight position={[10, 10, 10]} intensity={0.5} />
                  </Suspense>
                  <OrbitControls enableZoom={true} />
                </Canvas>
              </div>
              <div className="mt-auto">
                <p className="grid-headtext">Tech Stack</p>
                <p className="grid-subtext">
                  Proficient in coding for microcontrollers such as Arduino and ESP32. 
                  I have built robots using SLAM (Simultaneous Localization and Mapping) with ROS2 Humble and Gazebo.
                  My projects also show hands-on simulation experience with manipulator robots.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />
            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <div className="copy-container" onClick={handleCopy}>
                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">guneshguptag@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

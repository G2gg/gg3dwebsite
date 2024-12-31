import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Youtube = (props) => {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF('models/logo_youtube.glb');

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01; // Adjust the speed as needed
    }
  });

  const handleClick = () => {
    window.open('https://www.youtube.com/@playwitharduino4218', '_blank'); // The URL you want to navigate to
  };

  const handlePointerOver = (event) => {
    event.stopPropagation();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (event) => {
    event.stopPropagation();
    document.body.style.cursor = 'default';
  };

  return (
    <group
      ref={groupRef}
      {...props}
      dispose={null}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <group rotation={[Math.PI / 2, 0, 0]}>
        <group rotation={[-Math.PI, 0, 0]}>
          <group rotation={[0, 0, -2.356]}>
            <group position={[-35.718, -35.469, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes['Line048_02_-_Default_0'].geometry}
                material={materials['02_-_Default']}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes['Line048_13_-_Default_0'].geometry}
                material={materials['13_-_Default']}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('models/logo_youtube.glb');

export default Youtube;

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';

const Linkedin = (props) => {
  const groupRef = useRef();
//   const navigate = useNavigate();
  const { nodes, materials } = useGLTF('models/linkdin_logo.glb');

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.01; // Adjust the speed as needed
    }
  });

  const handleClick = () => {
    window.open('https://www.linkedin.com/in/gunesh-gupta/', '_blank'); // The URL you want to navigate to
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
    <group ref={groupRef} {...props} dispose={null} onClick={handleClick} className="pointer-cursor" onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      <group position={[0, -0.016, 0]} scale={0.158}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials['Material.007']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials['Material.006']}
        />
      </group>
    </group>
  );
};

useGLTF.preload('models/linkdin_logo.glb');

export default Linkedin;

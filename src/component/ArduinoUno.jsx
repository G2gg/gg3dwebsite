import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Arduino = (props) => {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF('models/arduinoUno.glb');
  
  // State for hover and click interactions
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    previousMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      e.stopPropagation();

      // Calculate mouse movement
      const deltaX = (e.clientX - previousMouseRef.current.x) / 100;
      // Only update the y-axis rotation
      rotationRef.current.y += deltaX;

      // Update previous mouse position
      previousMouseRef.current = { x: e.clientX, y: e.clientY };

      // Apply rotation to the group
      if (groupRef.current) {
        groupRef.current.rotation.y = rotationRef.current.y;
      }
    }
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
  };

  // Add and remove pointer move and up listeners
  useEffect(() => {
    const handleGlobalPointerUp = () => setIsDragging(false);
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointermove', handlePointerMove);
    
    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [isDragging]);

  // Rotate the model continuously when hovered
  useEffect(() => {
    let animationFrameId;
    if (isHovered && !isDragging) {
      const rotate = () => {
        if (groupRef.current) {
          groupRef.current.rotation.y += 0.01;
        }
        animationFrameId = requestAnimationFrame(rotate);
      };
      rotate();
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging]);

  return (
    <group 
      ref={groupRef} 
      {...props} 
      dispose={null}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <group position={[-6.005, 5.132, 12.455]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Arduino_Blue2_FiberGlass_0.geometry}
          material={materials.FiberGlass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Arduino_Blue2_Metal_0.geometry}
          material={materials.Metal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Arduino_Blue2_Back_0.geometry}
          material={materials.Back}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Arduino_Blue2_LED_0.geometry}
          material={materials.material}
        />
      </group>
    </group>
  );
};

useGLTF.preload('models/arduinoUno.glb');

export default Arduino;

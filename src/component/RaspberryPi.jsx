import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const RaspberryPi = (props) => {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF('models/raspberry.glb');
  
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
    <group {...props} dispose={null}>
      <group 
        ref={groupRef}
        position={[-18.193, 12.471, -1.917]} 
        rotation={[-1.278, -0.539, 0.426]}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.rpi_L}
          position={[-66.955, -48.678, -43.703]}
        />
      </group>
    </group>
  );
};

useGLTF.preload('models/raspberry.glb');

export default RaspberryPi;

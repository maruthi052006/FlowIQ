import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const Bars: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null)

  const heights = [1.2, 2.5, 1.8, 3.2, 2.1, 4.0, 3.5]
  const colors = ['#8B5CF6', '#14B8A6', '#F59E0B', '#3B82F6', '#EC4899', '#6366F1', '#10B981']

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.2
    }
  })

  return (
    <group ref={groupRef} position={[-2, -1, 0]}>
      {heights.map((h, i) => (
        <Float key={i} speed={1.5} floatIntensity={0.2}>
          <mesh position={[i * 0.7, h / 2, 0]}>
            <boxGeometry args={[0.4, h, 0.4]} />
            <meshStandardMaterial color={colors[i]} roughness={0.3} metalness={0.7} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export const DashboardChart3D: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[180px]">
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Bars />
      </Canvas>
    </div>
  )
}

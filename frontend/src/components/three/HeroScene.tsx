import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, RoundedBox, Sphere, Torus, Environment } from '@react-three/drei'
import { ParticleField } from './ParticleField'
import * as THREE from 'three'

const FloatingNodes: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Node 1: Trigger */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-2.5, 1, 0]}>
          <RoundedBox args={[1.2, 1.2, 1.2]} radius={0.2} smoothness={4}>
            <meshStandardMaterial color="#6D28D9" roughness={0.2} metalness={0.8} />
          </RoundedBox>
        </mesh>
      </Float>

      {/* Node 2: Logic */}
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[0, -0.5, 1]}>
          <Torus args={[0.7, 0.25, 16, 32]}>
            <meshStandardMaterial color="#14B8A6" roughness={0.1} metalness={0.9} />
          </Torus>
        </mesh>
      </Float>

      {/* Node 3: AI Engine */}
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[2.5, 1.2, -0.5]}>
          <Sphere args={[0.8, 32, 32]}>
            <meshStandardMaterial color="#F59E0B" roughness={0.3} emissive="#D97706" emissiveIntensity={0.3} />
          </Sphere>
        </mesh>
      </Float>
    </group>
  )
}

export const HeroScene: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[400px] relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        className="w-full h-full"
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />
        <ParticleField count={2000} />
        <FloatingNodes />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

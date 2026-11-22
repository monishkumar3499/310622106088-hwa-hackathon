"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import * as THREE from "three"

type TentProps = {
  colour?: string
  size?: "small" | "medium" | "large"
}

const scaleBySize: Record<string, number> = { small: 0.8, medium: 1, large: 1.25 }

function TentFabric({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02
    }
  })
  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[2, 1.6, 1.6]} />
      <meshStandardMaterial color={color} roughness={0.8} metalness={0.1} />
    </mesh>
  )
}

function TentRoof({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02
    }
  })
  return (
    <group rotation={[0, 0, 0]}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.1, 1.8]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.5, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.25, 0.9]}>
        <boxGeometry args={[2.2, 0.5, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh castShadow receiveShadow position={[1.1, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.5, 1.8]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh castShadow receiveShadow position={[-1.1, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.5, 1.8]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </mesh>
    </group>
  )
}

function MeshWindow({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[0.7, 0.7]} />
      <meshStandardMaterial color="#e0f2fe" transparent opacity={0.6} />
    </mesh>
  )
}

function DogBed({ color }: { color: string }) {
  return (
    <group position={[0, 0.05, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.12, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.04, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
    </group>
  )
}

function ChewToy({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <icosahedronGeometry args={[0.06, 0]} />
      <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
  )
}

export function Tent3D({ colour = "#d97706", size = "medium" }: TentProps) {
  const s = scaleBySize[size]
  const [hovered, setHovered] = useState(false)

  return (
    <group
      scale={[s, s, s]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
      <spotLight position={[-5, 8, 5]} intensity={0.8} castShadow penumbra={0.5} />
      <Stars radius={50} depth={50} count={400} factor={4} saturation={0} />

      <mesh castShadow receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#f3f4f6" roughness={1} />
      </mesh>

      <TentFabric color={colour} />
      <TentRoof color={colour === "#d97706" ? "#b45309" : "#78350f"} />

      <MeshWindow position={[-0.95, 0.1, 0.81]} />
      <MeshWindow position={[0.95, 0.1, 0.81]} />
      <MeshWindow position={[0, 0.1, -0.81]} rotation={[0, Math.PI, 0]} />

      <DogBed color="#fbbf24" />
      <ChewToy position={[-0.4, 0.02, -0.5]} color="#ef4444" />
      <ChewToy position={[0.4, 0.02, -0.4]} color="#10b981" />
      <ChewToy position={[-0.2, 0.02, -0.6]} color="#f59e0b" />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={hovered}
        autoRotate={!hovered}
        autoRotateSpeed={1}
        maxPolarAngle={Math.PI / 2 - 0.1}
        minDistance={3}
        maxDistance={9}
      />
    </group>
  )
}

export function Hero3D() {
  const [mounted, setMounted] = useState(false)
  const size = typeof window !== "undefined" ? window.innerWidth : 1024
  const tentSize = size < 640 ? "small" : size < 1024 ? "medium" : "large"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">H</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            A real home for your dog
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-slate-50">
      <Canvas
        shadows
        camera={{ position: [0, 2, 6], fov: 45 }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <Tent3D colour="#d97706" size={tentSize as "small" | "medium" | "large"} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 flex items-end justify-center pb-16 px-4 text-center pointer-events-none">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg">
          A real home<span className="text-orange-500"> for your dog</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-100 mt-3 max-w-xl mx-auto drop-shadow drop-shadow-black/40">
          Everyday comfort or royal luxury — mesh airflow, food feeder, water tank, AI comfort.
        </p>
      </div>
    </div>
  )
}

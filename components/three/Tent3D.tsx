"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Stars, Text } from "@react-three/drei"
import * as THREE from "three"

type TentProps = {
  colour?: string
  size?: "small" | "medium" | "large"
  interactive?: boolean
}

const scaleBySize: Record<string, number> = { small: 0.7, medium: 1, large: 1.3 }

const COLOURS = {
  sand: "#e6dcc8",
  navy: "#1e3a8a",
  olive: "#556b2f",
  rose: "#c08080",
}

function TentFabric({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.015
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.02
    }
  })
  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[2, 1.7, 1.7]} />
      <meshStandardMaterial
        color={color}
        roughness={0.85}
        metalness={0.05}
        flatShading
      />
    </mesh>
  )
}

function TentRoof({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.015
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.02
    }
  })
  return (
    <group ref={meshRef as any}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.3, 0.08, 1.9]} />
        <meshStandardMaterial
          color={color}
          roughness={0.75}
          metalness={0.02}
          flatShading
        />
      </mesh>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.3, 0.55, 0.1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.75}
          metalness={0.02}
          flatShading
        />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.275, 0.95]}>
        <boxGeometry args={[2.3, 0.55, 0.1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.75}
          metalness={0.02}
          flatShading
        />
      </mesh>
      <mesh castShadow receiveShadow position={[1.15, 0.55, 0]}>
        <boxGeometry args={[0.1, 0.55, 1.9]} />
        <meshStandardMaterial
          color={color}
          roughness={0.75}
          metalness={0.02}
          flatShading
        />
      </mesh>
      <mesh castShadow receiveShadow position={[-1.15, 0.55, 0]}>
        <boxGeometry args={[0.1, 0.55, 1.9]} />
        <meshStandardMaterial
          color={color}
          roughness={0.75}
          metalness={0.02}
          flatShading
        />
      </mesh>
    </group>
  )
}

function MeshWindow({
  position,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[0.75, 0.75]} />
      <meshStandardMaterial
        color="#bfdbfe"
        transparent
        opacity={0.55}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function DogBed({ color }: { color: string }) {
  return (
    <group position={[0, 0.08, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.55, 0.14, 24]} />
        <meshStandardMaterial
          color={color}
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.075, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 24]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.95}
          metalness={0}
        />
      </mesh>
    </group>
  )
}

function FoodBowl({ color }: { color: string }) {
  return (
    <group position={[0.6, 0.04, 0.4]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
        <meshStandardMaterial
          color="#94a3b8"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.08, 16]} />
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>
    </group>
  )
}

function WaterTank({ color }: { color: string }) {
  return (
    <group position={[-0.6, 0.06, 0.4]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.45, 0.3]} />
        <meshStandardMaterial
          color="#cbd5e1"
          roughness={0.2}
          metalness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
        <boxGeometry args={[0.28, 0.05, 0.28]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
    </group>
  )
}

function ChewToy({
  position,
  color,
}: {
  position: [number, number, number]
  color: string
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <icosahedronGeometry args={[0.07, 1]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
    </mesh>
  )
}

function Floor() {
  return (
    <mesh castShadow receiveShadow>
      <planeGeometry args={[12, 12]} />
      <meshStandardMaterial
        color="#f1f5f9"
        roughness={1}
        metalness={0}
      />
    </mesh>
  )
}

export function Tent3D({
  colour = "#e6dcc8",
  size = "medium",
  interactive = true,
}: TentProps) {
  const s = scaleBySize[size]
  const [hovered, setHovered] = useState(false)
  const cameraRef = useRef<THREE.Camera>(null)

  return (
    <group
      scale={[s, s, s]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <spotLight
        position={[-5, 8, 5]}
        intensity={1}
        castShadow
        penumbra={0.6}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <ambientLight intensity={0.3} />

      <Stars radius={60} depth={60} count={300} factor={3} saturation={0.1} />

      <Floor />

      <TentFabric color={colour} />
      <TentRoof color={colour} />

      <MeshWindow position={[-1.05, 0.15, 0.86]} />
      <MeshWindow position={[1.05, 0.15, 0.86]} />
      <MeshWindow position={[0, 0.15, -0.86]} rotation={[0, Math.PI, 0]} />

      <DogBed color="#fbbf24" />
      <FoodBowl color="#d97706" />
      <WaterTank color="#0ea5e9" />

      <ChewToy position={[-0.45, 0.05, -0.55]} color="#ef4444" />
      <ChewToy position={[0.45, 0.05, -0.45]} color="#10b981" />
      <ChewToy position={[-0.25, 0.05, -0.65]} color="#f59e0b" />

      {interactive && (
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={hovered}
          autoRotate={!hovered}
          autoRotateSpeed={1.5}
          maxPolarAngle={Math.PI / 2 - 0.1}
          minDistance={3}
          maxDistance={10}
          dampingFactor={0.05}
          enableDamping
        />
      )}
    </group>
  )
}

export function Hero3D() {
  const [mounted, setMounted] = useState(false)
  const [showModel, setShowModel] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setShowModel(true), 800)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return (
      <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-slate-50 flex items-center justify-center">
        <div className="text-center animate-pulse">
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
      {showModel && (
        <Canvas
          shadows
          camera={{ position: [0, 2.5, 7], fov: 40 }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Tent3D colour="#e6dcc8" size="medium" interactive={false} />
        </Canvas>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 flex items-end justify-center pb-20 px-4 text-center pointer-events-none">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg">
          A real home<span className="text-orange-500"> for your dog</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-100 mt-4 max-w-xl mx-auto drop-shadow drop-shadow-black/40">
          Everyday comfort or royal luxury - mesh airflow, food feeder, water tank, AI comfort.
        </p>
      </div>
    </div>
  )
}

export function ProductViewer3D({ colour = "#e6dcc8" }: { colour?: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="aspect-video bg-slate-100 rounded-2xl flex items-center justify-center">
        <div className="animate-pulse rounded-full w-16 h-16 bg-gray-300" />
      </div>
    )
  }

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
      <Canvas
        shadows
        camera={{ position: [0, 2.5, 6.5], fov: 40 }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <Tent3D colour={colour} size="large" interactive />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
        <span className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-slate-700 shadow-sm border border-white/50">
          3D Interactive Preview
        </span>
      </div>
    </div>
  )
}

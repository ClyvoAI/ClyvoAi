'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COLS = 28
const ROWS = 28
const SPACING = 1.4

function WaveTiles() {
  const meshRefs = useRef<THREE.Mesh[]>([])
  const timeRef = useRef(0)

  const tiles: { id: number; x: number; z: number }[] = []
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      tiles.push({ id: i * ROWS + j, x: (i - COLS / 2) * SPACING, z: (j - ROWS / 2) * SPACING })
    }
  }

  useFrame(() => {
    timeRef.current += 0.006
    meshRefs.current.forEach((mesh, idx) => {
      if (!mesh) return
      const tile = tiles[idx]
      mesh.position.y = Math.sin(timeRef.current + tile.x * 0.4 + tile.z * 0.4) * 1.5
    })
  })

  return (
    <>
      {tiles.map((tile, idx) => (
        <mesh
          key={tile.id}
          ref={el => { if (el) meshRefs.current[idx] = el }}
          position={[tile.x, 0, tile.z]}
        >
          <boxGeometry args={[1.1, 0.08, 1.1]} />
          <meshPhysicalMaterial
            color="#1c1c1c"
            emissive="#000000"
            emissiveIntensity={0}
            metalness={0.95}
            roughness={0.05}
            reflectivity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      ))}
      <ambientLight intensity={0.3} color="#ffffff" />
      <pointLight position={[0, 20, 0]} intensity={3} color="#ffffff" />
      <pointLight position={[0, 10, 10]} intensity={2} color="#e0e0e0" />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
    </>
  )
}

export default function GridWave() {
  return (
    <div
      className="fixed inset-0 pointer-events-none opacity-70"
      style={{ zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 18, 22], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false }}
      >
        <WaveTiles />
      </Canvas>
    </div>
  )
}

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Stars, Html } from '@react-three/drei'
import { useMemo } from 'react'

function FloatingCubes(){
  const cubes = useMemo(()=> Array.from({length: 12}).map((_,i)=> ({
    key: i,
    position: [(Math.random()-0.5)*6, (Math.random()-0.2)*2.5, (Math.random()-0.5)*4],
    scale: 0.2 + Math.random()*0.4
  })), [])
  return cubes.map(c => (
    <Float key={c.key} speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh position={c.position} scale={c.scale}>
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial metalness={0.6} roughness={0.2} />
      </mesh>
    </Float>
  ))
}

export default function Hero3D(){
  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] flex items-center">
      <Canvas camera={{ position: [0, 1.2, 5], fov: 55 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5,5,5]} intensity={1.0} />
        <FloatingCubes />
        <Stars radius={60} depth={40} count={8000} factor={4} saturation={0} fade />
        <OrbitControls enablePan={false} enableZoom={false} />
        <Html fullscreen className="pointer-events-none">
          <div className="w-full h-full flex items-center justify-center px-6">
            <div className="max-w-3xl w-full text-center">
              <h1 className="font-display tracking-wide2 uppercase text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight drop-shadow">
                Modern <span className="opacity-90">IT</span> Solutions
              </h1>
              <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg opacity-85 leading-relaxed mx-auto max-w-2xl">
                Build, deploy, and scale enterprise systems — secure, reliable, and beautiful.
              </p>
              <div className="mt-6 inline-flex gap-3 justify-center pointer-events-auto">
                <a href="/projects" className="px-5 py-2 rounded-xl bg-slate-100 text-slate-900 font-mono text-sm hover:opacity-90">
                  View Projects
                </a>
                <a href="/login" className="px-5 py-2 rounded-xl border border-slate-400/40 font-mono text-sm hover:bg-slate-800/40">
                  Demo Login
                </a>
              </div>
            </div>
          </div>
        </Html>
      </Canvas>
    </section>
  )
}


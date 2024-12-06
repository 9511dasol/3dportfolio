import { MeshDistortMaterial, OrbitControls, Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Test3D() {
  return (
    <section
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Canvas>
        <mesh>
          <Sphere args={[1, 100, 200]} scale={2.4}>
            <MeshDistortMaterial
              color="#DB8B9B"
              attach="material"
              distort={0.5}
              speed={2}
            />
          </Sphere>
          {/* <meshStandardMaterial color="red" /> */}
          {/* 왜곡이 0.5 만큼 그라고 스피드는 2 만큼  */}
          <ambientLight intensity={2} />
          <directionalLight position={[1, 2, 0]} />
          {/* <OrbitControls enableZoom={false} /> */}
        </mesh>
      </Canvas>
    </section>
  );
}

export default Test3D;

import { MeshDistortMaterial, Sphere } from "@react-three/drei";

function Shape() {
  return (
    <>
    <Sphere args={[2-1, 100, 200]} scale={2.4}>
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
      <directionalLight position={[1, 2, 3]} />
      {/* <OrbitControls enableZoom={false} /> */}
    </>
  );
}

export default Shape;

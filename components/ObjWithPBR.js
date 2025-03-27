import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader } from "three";

const ModelWithPBR = () => {
  // Load .obj model
  const obj = useLoader(OBJLoader, "/assets/avatar/base.obj");

  // Load PBR textures
  const [
    diffuseMap,
    metallicMap,
    normalMap,
    pbrMap,
    roughnessMap
  ] = useLoader(TextureLoader, [
    "/assets/avatar/texture_diffuse.png",
    "/assets/avatar/texture_metallic.png",
    "/assets/avatar/texture_normal.png",
    "/assets/avatar/texture_pbr.png",
    "/assets/avatar/texture_roughness.png"
  ]);

  // Apply materials to the model
  obj.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        map: diffuseMap,         // Base color
        metalnessMap: metallicMap, // Metallic properties
        normalMap: normalMap,     // Normal mapping
        aoMap: pbrMap,           // Ambient occlusion (if applicable)
        roughnessMap: roughnessMap, // Roughness properties
        metalness: 1,            // Adjust for best look
        roughness: 1
      });
    }
  });

  return <primitive object={obj} scale={1} />;
};

const ObjWithPBR = () => {
  return (
    <Canvas camera={{ position: [0, 1, 3] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={null}>
        <ModelWithPBR />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default ObjWithPBR;

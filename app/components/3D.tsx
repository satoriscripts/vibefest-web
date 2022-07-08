import { motion } from "framer-motion";
import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "../GLTFLoader";
import { MeshoptDecoder } from "../meshopt_decoder.module";
import { OrbitControls } from "../OrbitControls";

export default function ThreeJSRender(this: any) {
  useEffect(() => {
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    var scene = new THREE.Scene();
    var loader = new GLTFLoader()
      .setCrossOrigin("anonymous")
      .setMeshoptDecoder(MeshoptDecoder);

    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    window.addEventListener("resize", onWindowResize, false);
    renderer.setSize(window.innerWidth, window.innerHeight);
    const container = document.getElementById("container");
    // document.body.appendChild(renderer.domElement);
    // use ref as a mount point of the Three.js scene instead of the document.body
    container?.appendChild(renderer.domElement);
    // var geometry = new THREE.BoxGeometry(1, 1, 1);
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // var cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
    camera.position.z = -20;
    camera.position.y = 20;
    renderer.physicallyCorrectLights = false;
    renderer.outputEncoding = THREE.sRGBEncoding;

    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;

    // @ts-ignore
    loader.load("/vibefest_flower.gltf", function (gltf) {
      const flower = gltf.scene;

      flower.scale.set(2, 2, 2);
      scene.add(flower);

      var animate = function () {
        requestAnimationFrame(animate);
        // flower.rotation.y += 0.005;
        // camera.position.x += 0.05;
        // camera.position.z += 0.05;
        // @ts-ignore
        controls.update();

        renderer.render(scene, camera);
      };
      animate();
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      id="container"
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "-99999",
      }}
    />
  );
}

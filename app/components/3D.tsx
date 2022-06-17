import { useEffect } from "react";
import * as THREE from "three";

export default function ThreeJSRender(this: any) {
  useEffect(() => {
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    var scene = new THREE.Scene();
    // const loader = new GLTFLoader();

    // loader.load("");
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
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 2;
    var animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return (
    <div
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

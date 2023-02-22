import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

export function render3dChart(allData) {
  const canvas = document.querySelector("canvas.webgl");
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    canvas: canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const cameraOffset = 10;
  let camera = new THREE.OrthographicCamera(
    -cameraOffset,
    cameraOffset,
    cameraOffset,
    -cameraOffset,
    1,
    1000
  );

  // Add debug controls
  const gui = new dat.GUI();

  scene.add(new THREE.GridHelper(100, 100));
  camera.position.set(-10, 20, 10);
  camera.zoom = 1;
  // camera.lookAt(20, 1, -10);
  camera.updateProjectionMatrix();

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 11, 0);

  const allColors = [
    0xfeffc8, 0xfffec0, 0xfffcb7, 0xfffaaf, 0xfff7a7, 0xfff39f, 0xffef96,
    0xffeb8e, 0xffe686, 0xffe17e, 0xffdb75, 0xffd56d, 0xffce65, 0xffc75c,
    0xffc054, 0xffb84c, 0xffaf44, 0xffa63b, 0xff9d33, 0xff932b, 0xff8922,
    0xff7e1a, 0xff7312, 0xff670a, 0xff5b01, 0xf85100, 0xf04700, 0xe83e00,
    0xdf3600, 0xd72e00,
  ];

  const svgList = document.querySelectorAll("svg");
  const loader = new SVGLoader();
  const fontLoader = new FontLoader();
  const textMaterial = new THREE.MeshStandardMaterial(0xffffff);

  for (let i = 0; i < svgList.length; i++) {
    const svgData = loader.parse(svgList[i].outerHTML);
    const shape = svgData.paths[0].toShapes(true)[0];

    const geometry2 = new THREE.ExtrudeGeometry(shape, {
      steps: 2,
      depth: 16,
    });

    const cubeMaterial = new THREE.MeshStandardMaterial({
      color: allColors[svgList.length - i - 1],
      // color: 0xffffff,
    });

    let mesh = new THREE.Mesh(geometry2, cubeMaterial);
    scene.add(mesh);
    mesh.scale.set(0.01, 0.01, 0.01);
    mesh.rotation.set(0, Math.PI, Math.PI);
    mesh.position.set(0, 15, -10 + i / 3);

    mesh.castShadow = true; //default is false
    mesh.receiveShadow = true;

    fontLoader.load("fonts/ibm_plex.json", (font) => {
      const textGeometry = new TextGeometry(allData[i].Country.toUpperCase(), {
        font: font,
        size: 0.15,
        height: 0.04,
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.geometry.computeBoundingBox();
      textMesh.geometry.translate(-textMesh.geometry.boundingBox.max.x, 0, 0);
      textMesh.rotation.set(-Math.PI / 2, 0, 0);
      textMesh.position.set(-0.2, 0.1, -10 + i / 3);

      scene.add(textMesh);
    });

    fontLoader.load("fonts/ibm_plex.json", (font) => {
      const popuCount = allData[i]["Values"][57]["Count"];
      console.log(popuCount / 150000000);
      const popuCountFormatted = (popuCount / 1000000).toFixed(2) + "M";

      const textGeometry = new TextGeometry(popuCountFormatted.toString(), {
        font: font,
        size: 0.18,
        height: 0.01,
        curveSegments: 1,
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);

      textMesh.position.set(5, Math.pow(popuCount / 150000, 0.3), -10 + i / 3);
      scene.add(textMesh);
    });
  }

  const allPoints = [
    [new THREE.Vector3(-1, 1, -10.2), new THREE.Vector3(0, 1, -10.2)],
    [new THREE.Vector3(-1, 5, -10.2), new THREE.Vector3(0, 5, -10.2)],
    [new THREE.Vector3(-1, 10, -10.2), new THREE.Vector3(0, 10, -10.2)],
    [new THREE.Vector3(-1, 15, -10.2), new THREE.Vector3(3.5, 15, -10.2)],
    [new THREE.Vector3(6, 16, -10.2), new THREE.Vector3(6, 16, -3)],
    [new THREE.Vector3(5, 5, 0), new THREE.Vector3(5, 5, 1)],
    [new THREE.Vector3(5, 2, 0), new THREE.Vector3(5, 2, 1)],
  ];

  const lineMaterial = new THREE.LineDashedMaterial({
    color: 0xffffff,
    linewidth: 1,
    dashSize: 0.1,
    gapSize: 0.1,
  });

  for (let i = 0; i < allPoints.length; i++) {
    const dataPoints = allPoints[i];
    const lineGeom = new THREE.BufferGeometry().setFromPoints(dataPoints);
    const line = new THREE.Line(lineGeom, lineMaterial);
    line.computeLineDistances();
    scene.add(line);
  }

  const normalLineMaterial = new THREE.LineBasicMaterial(0xffffff);
  // Axis Lines
  for (let i = 0; i < 11; i++) {
    const points = [];
    let lineZEnd = i === 0 || i === 10 ? 1.5 : 0.5;
    const xOffset = 2;

    points.push(new THREE.Vector3(i / xOffset, 0, -0.2));
    points.push(new THREE.Vector3(i / xOffset, 0, lineZEnd));

    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      normalLineMaterial
    );
    line.computeLineDistances();
    scene.add(line);
  }

  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(5, 30, 31);

  const spotLight2 = new THREE.SpotLight(0xffffff, 0.8);
  spotLight2.position.set(-25, 3, 2);

  const spotLight3 = new THREE.SpotLight(0xffffff, 0.2);
  spotLight3.position.set(6, 14, 35);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // spotLight.castShadow = true;
  spotLight2.castShadow = true;
  spotLight3.castShadow = true;

  spotLight3.shadow.mapSize.width = 1024;
  spotLight3.shadow.mapSize.height = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.mapSize.width = 1024;
  spotLight2.shadow.mapSize.height = 1024;
  spotLight2.shadow.mapSize.width = 1024;

  scene.add(spotLight);
  scene.add(spotLight2);
  scene.add(spotLight3);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}

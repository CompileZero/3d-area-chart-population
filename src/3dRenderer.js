import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

export function render3dChart(allData) {
  console.log(allData);
  const canvas = document.querySelector("canvas.webgl");
  const scene = new THREE.Scene();
  // scene.add(new THREE.GridHelper(100, 100));

  // Debug
  const gui = new dat.GUI();

  let camera = new THREE.OrthographicCamera(
    -15, //left,
    15, //right,
    15, //top,
    -15, //bottom,
    0.01, //near,
    1000 //far
  );
  camera.position.set(-3, 3, -60); // position camera
  // camera.lookAt(40, 40, 40); // have camera look at 0,0,0
  // const camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);

  // const ambientLight = new THREE.AmbientLight(0xffffff); // soft white light
  // scene.add(ambientLight);

  // const HemisphereLight = new THREE.HemisphereLight(0xffffbb, 0xffffff, 3);
  // scene.add(HemisphereLight);
  // gui.add(HemisphereLight, "intensity").min(-10).max(10).step(0.01);

  const dirLight = new THREE.DirectionalLight(0xaabbff, 0.3);
  dirLight.position.set(-10, 10, -2.6);
  scene.add(dirLight);

  gui.add(dirLight.position, "x").min(-10).max(10).step(0.01);
  gui.add(dirLight.position, "y").min(-10).max(10).step(0.01);
  gui.add(dirLight.position, "z").min(-10).max(20).step(0.01);
  gui.add(dirLight, "intensity").min(0).max(5).step(0.01);

  const dirLightHelper = new THREE.PointLightHelper(dirLight, 1);
  scene.add(dirLightHelper);

  const dirLight2 = new THREE.DirectionalLight(0xaabbff, 0.3);
  dirLight2.position.set(15, 10, -2.6);
  scene.add(dirLight2);

  gui.add(dirLight2.position, "x").min(-10).max(10).step(0.01);
  gui.add(dirLight2.position, "y").min(-10).max(10).step(0.01);
  gui.add(dirLight2.position, "z").min(-10).max(20).step(0.01);
  gui.add(dirLight2, "intensity").min(0).max(5).step(0.01);

  const dirLight2Helper = new THREE.PointLightHelper(dirLight2, 1);
  scene.add(dirLight2Helper);

  const dirLight3 = new THREE.DirectionalLight(0xaabbff, 0.3);
  dirLight3.position.set(0, 0, 0);
  scene.add(dirLight3);

  gui.add(dirLight3.position, "x").min(-10).max(10).step(0.01);
  gui.add(dirLight3.position, "y").min(-10).max(10).step(0.01);
  gui.add(dirLight3.position, "z").min(-10).max(20).step(0.01);
  gui.add(dirLight3, "intensity").min(0).max(5).step(0.01);

  const dirLight3Helper = new THREE.PointLightHelper(dirLight3, 1);
  scene.add(dirLight3Helper);

  //Create a DirectionalLight and turn on shadows for the light
  // const light2 = new THREE.DirectionalLight(0xffbc8f, 1);
  // light2.position.set(-10, 3.6, 12); //default; light shining from top
  // light2.castShadow = true; // default false
  // light2.shadow.radius = 4;
  // light2.shadow.bias = 0;
  // scene.add(light2);

  // //Set up shadow properties for the light
  // light2.shadow.mapSize.width = 512; // default
  // light2.shadow.mapSize.height = 512; // default
  // light2.shadow.camera.near = 0.5; // default
  // light2.shadow.camera.far = 500; // default

  // gui.add(light2.shadow.mapSize, "width").min(0).max(1000).step(1);
  // gui.add(light2.shadow.mapSize, "height").min(0).max(1000).step(1);
  // gui.add(light2.shadow.camera, "near").min(-10).max(100).step(0.01);
  // gui.add(light2.shadow.camera, "far").min(0).max(30).step(0.01);
  // gui.add(light2.shadow, "radius").min(0).max(30).step(0.1);
  // gui.add(light2.shadow, "bias").min(-10).max(30).step(0.1);

  // const pointLightHelper2 = new THREE.PointLightHelper(light2, 1);
  // scene.add(pointLightHelper2);

  // gui.add(light2.position, "x").min(-10).max(10).step(0.01);
  // gui.add(light2.position, "y").min(-10).max(10).step(0.01);
  // gui.add(light2.position, "z").min(-10).max(100).step(0.01);
  // gui.add(light2, "intensity").min(0).max(30).step(0.01);

  const planegeometry = new THREE.PlaneGeometry(10, 30);
  const material = new THREE.ShadowMaterial();
  material.opacity = 0.2;
  const plane = new THREE.Mesh(planegeometry, material);
  plane.position.set(3, 0, 0);
  plane.rotation.set(-Math.PI / 2, 0, 0);
  // plane.castShadow = true; //default is false

  plane.receiveShadow = true;
  scene.add(plane);

  const planegeometry2 = new THREE.PlaneGeometry(10, 14);
  const material2 = new THREE.ShadowMaterial();
  material2.opacity = 0.2;
  const plane2 = new THREE.Mesh(planegeometry2, material2);
  plane2.position.set(3, 7, -14);
  plane2.rotation.set(0, 0, 0);
  // plane2.castShadow = true; //default is false

  plane2.receiveShadow = true;
  scene.add(plane2);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    canvas: canvas,
    antialias: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.renderSingleSided = false; // default is true
  // renderer.shadowMap.type = THREE.VSMShadowMap;

  renderer.setSize(window.innerWidth, window.innerWidth);

  document.body.appendChild(renderer.domElement);

  camera.position.z = 5;

  const controls = new OrbitControls(camera, renderer.domElement);

  const fontLoader = new FontLoader();

  const loader = new SVGLoader();
  let mesh;

  // Get SVG's markup
  const allSvgs = document.querySelectorAll("svg");

  const allColors = [
    0xfffffe, 0xfffff4, 0xfffeea, 0xfffde0, 0xfffbd6, 0xfff8cc, 0xfff6c2,
    0xfff2b8, 0xffeeae, 0xffeaa4, 0xffe59a, 0xffe090, 0xffda86, 0xffd37c,
    0xffcc72, 0xffc567, 0xffbd5d, 0xffb453, 0xffab49, 0xffa23f, 0xff9835,
    0xff8d2b, 0xff8221, 0xff7617, 0xff6a0d, 0xff5e03, 0xf85300, 0xee4900,
    0xe44000, 0xda3800,
  ];
  for (let i = 0; i < allSvgs.length; i++) {
    const svgMarkup = allSvgs[i].outerHTML;
    const svgData = loader.parse(svgMarkup);

    // Loop through all of the parsed paths

    const shapes = svgData.paths[0].toShapes(true);
    const shape = shapes[0];
    // Each path has array of shapes

    // Finally we can take each shape and extrude it
    shape.moveTo(0, 0);
    const cubeMaterial = new THREE.MeshLambertMaterial({
      color: allColors[allColors.length - i - 1],
      // roughness: 0,
      // metalness: 1,
    });
    const geometry2 = new THREE.ExtrudeGeometry(shape, {
      steps: 2,
      depth: 16,
      bevelEnabled: false,
      bevelThickness: 10,
      bevelSize: 5,
      bevelOffset: 0,
      bevelSegments: 10,
    });
    geometry2.computeVertexNormals();
    geometry2.boundingBox = true;

    // Create a mesh and add it to the group
    mesh = new THREE.Mesh(geometry2, cubeMaterial);
    mesh.scale.set(0.01, 0.01, 0.01);
    mesh.position.set(0, 15.5, -10 + i / 2);
    mesh.rotation.set(0, Math.PI, Math.PI);
    mesh.castShadow = true; //default is false

    mesh.receiveShadow = true;
    scene.add(mesh);

    console.log(geometry2);

    let parameters = mesh.geometry.parameters;
    let size = {
      width: parameters.width,
      height: parameters.height,
    };
    console.log("size", size);

    fontLoader.load("fonts/ibm_plex.json", (font) => {
      // console.log(font);
      const textGeometry = new TextGeometry(allData[i].Country.toUpperCase(), {
        font: font,
        size: 0.2,
        height: 0.01,
        curveSegments: 1,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 0.1,
        bevelOffset: 0,
      });
      const material = new THREE.MeshStandardMaterial(0xffffff);
      const textMesh = new THREE.Mesh(textGeometry, material);
      textMesh.geometry.computeBoundingBox();
      textMesh.geometry.translate(-textMesh.geometry.boundingBox.max.x, 0, 0);
      textMesh.rotation.set(-Math.PI / 2, 0, 0);
      textMesh.position.set(-0.1, 0.1, -10 + i / 2.02);
      textMesh.castShadow = true; //default is false
      textMesh.receiveShadow = true;
      scene.add(textMesh);
    });

    fontLoader.load("fonts/ibm_plex.json", (font) => {
      const popuCount = allData[i]["Values"][57]["Count"];
      console.log(popuCount / 150000000);
      const popuCountFormatted = (popuCount / 1000000).toFixed(2) + "M";
      // console.log(font);

      const textGeometry = new TextGeometry(popuCountFormatted.toString(), {
        font: font,
        size: 0.2,
        height: 0.01,
        curveSegments: 1,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 0.1,
        bevelOffset: 0,
      });
      const material = new THREE.MeshStandardMaterial(0xffffff);
      const textMesh = new THREE.Mesh(textGeometry, material);
      textMesh.geometry.computeBoundingBox();
      // textMesh.geometry.translate(-textMesh.geometry.boundingBox.max.x, 0, 0);
      textMesh.rotation.set(0, 0, 0);
      textMesh.position.set(
        5.3,
        2.5 + Math.sqrt(popuCount) / 2500,
        -10 + i / 2.02
      );
      textMesh.castShadow = true; //default is false
      textMesh.receiveShadow = true;
      scene.add(textMesh);
    });
  }

  //   controls.update();
  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
  }

  animate();
}

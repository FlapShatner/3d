import './style.css'
import { Color, MeshBasicMaterial } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg'),
})

// scene.background = new Color('red')
// scene.overrideMaterial = new MeshBasicMaterial({ color: 'green' })

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.set(10, 75, 160)

renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

const texture = new THREE.TextureLoader().load('/images/material_baseColor.png')

const material = new THREE.MeshStandardMaterial({ color: 0xff6347 })

const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

// Moon

const moonTexture = new THREE.TextureLoader().load('/images/moon.jpg')
const normalTexture = new THREE.TextureLoader().load('/images/normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshBasicMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
)

scene.add(moon)

moon.position.z = 30
moon.position.setX(-10)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20, 20, 20)

const ambientLight = new THREE.AmbientLight(0x404040)

scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('/images/space-nebula-pink.jpg')
scene.background = spaceTexture

//Avatar

const jordTexture = new THREE.TextureLoader().load('/images/jordan-face.jpeg')

const jord = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jordTexture }))

scene.add(jord)

function moveCamera() {
  const t = document.body.getBoundingClientRect().top
  moon.rotation.x += 0.05
  moon.rotation.y += 0.075
  moon.rotation.z += 0.05

  jord.rotation.y += 0.01
  jord.rotation.x += 0.01

  camera.position.z = t * -0.02
  camera.position.x = t * -0.0002
  camera.position.y = t * -0.0002
}

document.body.onscroll = moveCamera
moveCamera()

function animate() {
  requestAnimationFrame(animate)
  torus.rotation.x += 0.008
  torus.rotation.y += 0.007
  torus.rotation.z += 0.006

  controls.update()

  renderer.render(scene, camera)
}

animate()

import "./style.css"
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

// Setup

const canvas = document.querySelector("canvas.webgl")

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1,100)
camera.position.x = 0
camera.position.y = 10
camera.position.z = 20
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Light

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambientLight)

// Objects

// Floor

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20,20),
  new THREE.MeshStandardMaterial({color: 0xffffff})
)
floor.rotation.x = -Math.PI * 0.5
scene.add(floor)

// Seatings

const seating1 = new THREE.Group()
const seating2 = new THREE.Group()
scene.add(seating1,seating2)
seating1.position.y = 0.5
seating1.position.x = 1.5
seating2.position.y = 0.5
seating2.position.x = -1.5
for ( let i = 0 ; i < 2 ; i++){
  const standGeometry = new THREE.BoxGeometry(0.1,1,0.1)
  const steadMaterial = new THREE.MeshStandardMaterial({color:0xff00ff})
  const stand1 = new THREE.Mesh(
    standGeometry,
    steadMaterial
  )
  stand1.position.x = -1
  const stand2 = new THREE.Mesh(
    standGeometry,
    steadMaterial
  )
  stand2.position.x = 1
  const sittingPlate = new THREE.Mesh(
    new THREE.BoxGeometry(2.8,0.1,0.8),
    steadMaterial
  )
  sittingPlate.position.y = 0.5
  if (i == 0){
    seating1.add(stand1, stand2, sittingPlate)
  }else{
    seating2.add(stand1, stand2, sittingPlate)
  }
}

// Roof

const roof = new THREE.Group()
scene.add(roof)

const roofSideWallMaterial = new THREE.MeshStandardMaterial({color: 0xffaaff})
const roofSideWallGeometry = new THREE.BoxGeometry(0.2,4,2)
const leftWall = new THREE.Mesh(
  roofSideWallGeometry,
  roofSideWallMaterial
)
const rightWall = new THREE.Mesh(
  roofSideWallGeometry,
  roofSideWallMaterial
)
leftWall.position.y = 4/2
leftWall.position.x = -3.5
rightWall.position.y = 4/2
rightWall.position.x = 3.5
roof.add(leftWall)
roof.add(rightWall)

const roofBackWallMaterial = new THREE.MeshStandardMaterial({color: 0xffaaff})
const roofBackWallGeometry = new THREE.BoxGeometry(0.2,4,7)
const backWall = new THREE.Mesh(
  roofBackWallGeometry,
  roofBackWallMaterial
)
backWall.rotation.y = Math.PI * 0.5
backWall.position.z = -1
backWall.position.y = 4/2
roof.add(backWall)

const roofTop = new THREE.Mesh(
  new THREE.BoxGeometry(8,0.2,2.7001),
  new THREE.MeshStandardMaterial({color:0xff0011})
)
roofTop.position.y = 4
roofTop.position.z = 0.25
roof.add(roofTop)

// Render

const renderer = new THREE.WebGLRenderer({
  canvas:canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()

// Responsive

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})
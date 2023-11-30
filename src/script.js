import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js'
import * as dat from 'lil-gui'

THREE.ColorManagement.enabled = false

/**
 * 
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Galaxy
const parameters = {}
parameters.cardY = 0
parameters.cardX = 0
parameters.cardZ = 0
parameters.cardYRotate = 0
parameters.cardXRotate = 0
parameters.cardZRotate = 0


let geometry = null;
let material = null;
let points = null;

const generateCard = () => {
    if(points !== null){
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    const cardGeometry = new THREE.BoxGeometry(15, 20, 1)
    const cardMaterial = new THREE.MeshBasicMaterial({color: '#d9ccbd'})
    const cardMaterial2 = new THREE.MeshBasicMaterial({color: '#ff6030'})
    const pivotMaterial = new THREE.MeshBasicMaterial({color: '#FFC0CB'})
    const cardFirst = new THREE.Mesh(cardGeometry, cardMaterial)
    const cardSecond = new THREE.Mesh(cardGeometry, cardMaterial2)

    const pivotPointBoxGeometry = new THREE.BoxGeometry(1,1,1)

    const pivotPoint = new THREE.Mesh(pivotPointBoxGeometry, pivotMaterial)
    scene.add(pivotPoint)

    const textGeometry = new TextGeometry('Hello three.js!', {
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
    })

    scene.add(textGeometry)

    
    scene.add(cardFirst)
    scene.add(cardSecond)
    cardFirst.rotation.y += .5
    cardFirst.rotation.x += 0
    cardFirst.rotation.z += 0
    cardFirst.position.x += -14
    cardFirst.position.y += 0
    cardFirst.position.z += 3.5

    pivotPoint.rotation.y += -5
    pivotPoint.rotation.x += 0
    pivotPoint.rotation.z += 0
    pivotPoint.position.x += -8
    pivotPoint.position.y += -9
    pivotPoint.position.z += 0

    const firstCardPivotGroup = new THREE.Group()
    firstCardPivotGroup.add(cardFirst)
    firstCardPivotGroup.add(pivotPoint)
    scene.add(firstCardPivotGroup)
    
    firstCardPivotGroup.rotation.y += 0.1



}

    generateCard()
    /**
     * Sizes
    */


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 8
camera.position.z = 20
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

let time = Date.now()
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime
    
    console.log(deltaTime)
    
    // Render
    renderer.render(scene, camera)
    
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

}

tick()
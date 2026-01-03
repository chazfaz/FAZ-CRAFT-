import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/dist/cannon-es.js';
import { updateChunks } from './world.js';
import { initPlayer } from './player.js';
import { initUI, initInventory } from './ui.js';
import { updateMobs } from './mobs.js';

let scene, camera, renderer, world, clock, player, mobs = [];

try {
    // WebGL check
    if (!Detector.webgl) throw new Error('WebGL not supported');
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 30, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(10, 20, 10);
    scene.add(sun);

    world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });
    clock = new THREE.Clock();

    player = initPlayer(camera, world);
    initUI();
    initInventory();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
} catch (e) {
    document.getElementById('error-message').textContent = `Error: ${e.message}. Fallback mode: Basic view.`;
    document.getElementById('error-message').style.display = 'block';
}

function animate() {
    requestAnimationFrame(animate);
    const dt = clock.getDelta();

    world.step(1/60, dt, 3);
    updateChunks(player.position, scene, world);
    updateMobs(dt, mobs, player.position, scene, world);
    player.update(dt);

    camera.position.copy(player.position);
    camera.rotation.order = 'YXZ';
    camera.rotation.y = player.yaw;
    camera.rotation.x = player.pitch;

    renderer.render(scene, camera);
}

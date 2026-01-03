import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';

const loader = new THREE.TextureLoader();

// ... existing load function ...

const textures = {
    dirt: load('dirt.png', 0x8b4513),
    grass: load('grass_block_side.png', 0x55aa55),
    stone: load('stone.png', 0x666666),
    log: load('oak_log.png', 0x8b4513),
    leaves: load('oak_leaves.png', 0x228b22),
    coal: load('coal_ore.png', 0x333333),
    iron: load('iron_ore.png', 0xaaaaaa),
    gold: load('gold_ore.png', 0xffaa00),
    diamond: load('diamond_ore.png', 0x66ccff),
    water: load('water_still.png', 0x4444ff)
};

export const MATERIALS = {
    1: new THREE.MeshLambertMaterial({ map: textures.dirt }),
    2: grassMat, // array for faces
    3: new THREE.MeshLambertMaterial({ map: textures.stone }),
    4: new THREE.MeshLambertMaterial({ map: textures.log }),
    5: new THREE.MeshLambertMaterial({ map: textures.leaves, transparent: true, opacity: 0.8 }),
    6: new THREE.MeshLambertMaterial({ map: textures.coal }),
    7: new THREE.MeshLambertMaterial({ map: textures.iron }),
    8: new THREE.MeshLambertMaterial({ map: textures.gold }),
    9: new THREE.MeshLambertMaterial({ map: textures.diamond }),
    10: new THREE.MeshLambertMaterial({ map: textures.water, transparent: true, opacity: 0.7, side: THREE.DoubleSide })
};
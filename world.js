import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/dist/cannon-es.js';
import { MATERIALS } from './blocks.js';

const CHUNK_SIZE = 16;
const VIEW_DISTANCE = 8;
const WORLD_HEIGHT = 128;

const chunks = new Map(); // key: 'x_z' -> { mesh, physics, data: Uint8Array }

function generateChunk(cx, cz, scene, world) {
    const key = `${cx}_${cz}`;
    if (chunks.has(key)) return;

    const data = new Uint8Array(CHUNK_SIZE * WORLD_HEIGHT * CHUNK_SIZE);
    const positions = {1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: []}; // dirt, grass, stone, log, leaves, coal, iron, gold, diamond, water

    for (let lx = 0; lx < CHUNK_SIZE; lx++) {
        for (let lz = 0; lz < CHUNK_SIZE; lz++) {
            const gx = cx + lx;
            const gz = cz + lz;
            const h = getHeight(gx, gz);

            for (let ly = 0; ly < h; ly++) {
                let type = 3; // stone
                if (isCave(gx, ly, gz)) {
                    if (ly < 20) type = getOreType(gx, ly, gz); // ores in deep caves
                    else type = 0;
                } else if (ly === h - 1) type = 2; // grass
                else if (ly > h - 4) type = 1; // dirt

                if (type) positions[type].push(new THREE.Vector3(gx, ly, gz));
            }

            // Trees
            if (Math.random() < 0.05) placeTree(positions, gx, h, gz);

            // Water lakes
            if (Math.random() < 0.02) placeWater(positions, gx, h - 3, gz);
        }
    }

    const group = new THREE.Group();
    for (const [type, pos] of Object.entries(positions)) {
        if (pos.length === 0) continue;
        const mat = MATERIALS[type];
        const inst = new THREE.InstancedMesh(geo, mat, pos.length);
        pos.forEach((p, i) => inst.setMatrixAt(i, new THREE.Matrix4().setPosition(p.addScalar(0.5))));
        inst.instanceMatrix.needsUpdate = true;
        group.add(inst);
    }

    // Physics: basic ground shape
    const shape = new CANNON.Box(new CANNON.Vec3(CHUNK_SIZE/2, WORLD_HEIGHT/2, CHUNK_SIZE/2));
    const body = new CANNON.Body({ mass: 0, shape });
    body.position.set(cx + CHUNK_SIZE/2, WORLD_HEIGHT/2, cz + CHUNK_SIZE/2);
    world.addBody(body);

    chunks.set(key, { group, body, data });
    scene.add(group);
}

function getOreType(x, y, z) {
    const chance = Math.random();
    if (chance < 0.02) return 9; // diamond
    if (chance < 0.05) return 8; // gold
    if (chance < 0.1) return 7; // iron
    if (chance < 0.2) return 6; // coal
    return 0;
}

function placeWater(positions, gx, gy, gz) {
    for (let dx = -2; dx <= 2; dx++) for (let dz = -2; dz <= 2; dz++) {
        if (Math.random() < 0.6) {
            positions[10].push(new THREE.Vector3(gx + dx, gy, gz + dz));
        }
    }
}

// ... keep existing functions like updateChunks, getBlock, setBlock, isCave, getHeight, placeTree

// Add to updateChunks: add/remove physics bodies

chunks.set(key, { group, body, data });
world.addBody(chunk.body);

// In unload
world.removeBody(chunk.body);

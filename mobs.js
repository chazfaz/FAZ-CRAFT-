import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { getBlock } from './world.js';

// Simple A* pathfinding (grid-based)
function aStar(start, end) {
    // Implement A* with open/closed sets, g/h/f scores, 3D neighbors (no diagonal for simplicity)
    // Return path array or empty
}

export class Mob {
    constructor(type, pos, scene) {
        this.type = type;
        this.group = new THREE.Group();
        // Model from previous
        this.group.position.copy(pos);
        scene.add(this.group);

        this.path = [];
        this.state = 'idle';
    }

    update(dt, playerPos) {
        if (this.path.length === 0) this.path = aStar(this.group.position, playerPos);

        if (this.path.length) {
            const next = this.path[0];
            const dir = next.clone().sub(this.group.position).normalize();
            this.group.position.add(dir.multiplyScalar(dt * 3));
            if (this.group.position.distanceTo(next) < 0.1) this.path.shift();
        }
    }
}

// Spawn/update from previous
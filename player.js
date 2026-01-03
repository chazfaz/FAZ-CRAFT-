import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/dist/cannon-es.js';
import { getBlock } from './world.js';

export function initPlayer(camera, world) {
    const shape = new CANNON.Box(new CANNON.Vec3(0.3, 0.9, 0.3));
    const body = new CANNON.Body({ mass: 1, shape });
    body.position.set(0, 30, 0);
    world.addBody(body);

    let yaw = 0, pitch = 0;

    // Mobile joystick + jump from previous

    function update(dt) {
        // Movement, sprint, stamina from previous

        // Sync camera to body
        camera.position.copy(body.position);
        camera.rotation.order = 'YXZ';
        camera.rotation.y = yaw;
        camera.rotation.x = pitch;

        if (getBlock(body.position.x, body.position.y - 1, body.position.z) === 10) { // water
            body.velocity.scale(0.8); // drag
            body.velocity.y += 0.5 * dt; // buoyancy
        }
    }

    return update;
}
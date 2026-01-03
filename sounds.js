export const SOUNDS = {
    zombie: [
        new Audio('https://static.wiki.minecraft.net/minecraft-wiki/images/3/3a/Zombie_say1.ogg'),
        new Audio('https://static.wiki.minecraft.net/minecraft-wiki/images/3/3a/Zombie_say2.ogg'),
        // Add more
    ]
};

// In mob update, play random sound occasionally
if (Math.random() < 0.01) {
    const sound = SOUNDS[this.type][Math.floor(Math.random() * SOUNDS[this.type].length)];
    sound.play().catch(e => console.error('Audio error', e));
}
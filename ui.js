export function initUI() {
    // Hotbar from previous

    const inventory = Array(36).fill(null); // 9x4 slots
    const craftingGrid = Array(9).fill(null);
    let craftingOutput = null;

    const recipes = {
        'plank': { pattern: [['log']], output: 'plank', count: 4 },
        'stick': { pattern: [['plank'], ['plank']], output: 'stick', count: 4 },
        // Add more
    };

    const inventoryGrid = document.getElementById('inventory-grid');
    for (let i = 0; i < 36; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.draggable = true;
        // Drag-drop logic (use DataTransfer for item ID/count)
        inventoryGrid.addChild(slot);
    }

    const crafting = document.getElementById('crafting-grid');
    for (let i = 0; i < 9; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.addEventListener('drop', () => updateCrafting());
        crafting.addChild(slot);
    }

    document.getElementById('close-inventory').onclick = () => {
        document.getElementById('inventory-panel').style.display = 'none';
    };

    document.addEventListener('keydown', e => {
        if (e.code === 'KeyE') {
            const panel = document.getElementById('inventory-panel');
            panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
        }
    });

    function updateCrafting() {
        // Check grid against recipes, set output
        // ...
    }
}
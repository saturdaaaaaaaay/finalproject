/*
 * NPC's that trigger mini games class
 */

class Trigger {
    
    constructor(OBJECT, ITEM, ITEM_TEX) {
        this.item = ITEM;
        this.item_texture = ITEM_TEX;
        this.object = OBJECT;
        this.active = true;
    }
    
    getItem() {
        return this.item.name;
    }
    
    getTexture() {
        return this.item_texture;
    }
    
    giveItem() {
        this.setInactive();
        return this.item;
    }
    
    isActive() {
        return this.active;
    }
    
    setInactive() {
        this.active = false;
    }
    
}

/*
 * NPC's that trigger mini games class
 */

class Trigger {
    
    constructor(OBJECT, ITEM) {
        this.item = ITEM;
        this.object = OBJECT;
        this.active = true;
    }
    
    getItem() {
        return this.item.name;
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

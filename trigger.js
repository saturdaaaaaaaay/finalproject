/*
 * NPC's that trigger mini games class
 */

class Trigger {
    
    constructor(X, Y, ITEM) {
        this.item = ITEM;
        this.x_pos = X * TILE_SIZE;
        this.y_pos = Y * TILE_SIZE;
        this.sprite = this.createSprite();
        this.active = true;
    }
    
    createSprite() {
        //TODO use a texture
        return g.rectangle(
            100,
            100,
            "yellow",
            "black",
            0,
            this.x_pos,
            this.y_pos
        );
    }
    
    getItem() {
        return this.item.name;
    }
    
    giveItem() {
        this.setInactive();
        return this.item;
    }
    
    inWorld() {
        return this.world;
    }
    
    isActive() {
        return this.active;
    }
    
    setInactive() {
        this.active = false;
    }
    
}

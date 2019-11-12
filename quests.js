/*
 * Quest setup and Quest class definition
 */

 const QUEST_ACTIVE = 3000;
 const QUEST_AVAILABLE = 3001;
 const QUEST_COMPLETE = 3002;
 
 class Quest {

   constructor() {
     this.questItem = null;
     this.questState = QUEST_AVAILABLE;
   }

   changeState(NEW_STATE) {
     this.questState = NEW_STATE;
   }

   getItem() {
     return this.questItem;
   }

   getState() {
     return this.questState;
   }
 }
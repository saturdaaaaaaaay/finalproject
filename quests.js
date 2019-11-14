/*
 * Quest setup and Quest class definition
 */

 const QUEST_ACTIVE = 3000;
 const QUEST_AVAILABLE = 3001;
 const QUEST_COMPLETE = 3002;

 class Quest {

   constructor(questItem, questState) {
     this.questItem = questItem;
     this.questState = questState;
   }

   changeState(NEW_STATE) {
     this.questState = NEW_STATE;
   }

   getItem() {
     return this.questItem;
   }

   checkMatchingItem(item)
   {
     if (item.name = this.questItem.name)
     {
       this.changeState(QUEST_COMPLETE);
     }
   }

   getState() {
     return this.questState;
   }

   display()
   {
     let state = "";
     if (this.questState == QUEST_ACTIVE)
     {
       state = "still active"
     }
     else if (this.questState == QUEST_COMPLETE)
     {
       state = "completed";
     }
     return "Get " + this.questItem.name + "\t" + state;
   }
 }

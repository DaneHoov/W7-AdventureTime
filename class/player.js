const { Food } = require('./food');

class Player {
  constructor(name, startingRoom) {
    this.name = name;
    this.currentRoom = startingRoom;
    this.items = [];
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;
      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
          console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    // Picks up an item from the current room into the player's inventory
    const item = this.currentRoom.getItemByName(itemName)
    this.items.push(item)
  }

  dropItem(itemName) {
    // Drops an item the player is holding into their current room
   const i = this.items.findIndex(item => item.name === itemName)

   if(i !== -1) {
    const item = this.items.splice(i, 1)[0]
    this.currentRoom.items.push(item)
    console.log(`${this.name} dropped ${itemName}.`)
   }
   else {
    console.log('No items found')
   }
  }

  eatItem(itemName) {
    // Allow the player to eat food items, but not non-food items
    let item = this.getItemByName(itemName)
    if (item instanceof Food) {
      this.items.splice(this.items.indexOf(item), 1)
      console.log(`${this.name} eats ${itemName}`)
    }
    console.log(`That's not edible`)
  }

  getItemByName(name) {
    // Retrieves an item from a player's inventory by item name
    return this.items.find(item => item.name === name)
  }
}

module.exports = {
  Player
};

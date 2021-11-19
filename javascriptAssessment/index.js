//Task 1: Create global variables and import prompt input from package
const prompt = require('prompt-sync')({sigint: true});
 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const rowNum = 10, colNum = 10;

//Task 2: Create Field Class with constructor for the game
class Field
{
    constructor(field = [[]]) {
        this.field = Array(rowNum).fill(0).map(() => Array(colNum));
        this.locationX = 0;
        this.locationY = 0;
    // Set the "home" position
        this.field[0][0] = pathCharacter;
    }

    //Task 3: Create generateField Method in the Field Class to generate the rows and columns with fields.
    generateField(percentage = 0.3) {
        const field = new Array(rowNum).fill(0).map(el => new Array(colNum));
        for (let y = 0; y < rowNum; y++) {
            for (let x = 0; x < colNum; x++) {
                const prob = Math.random();
                this.field[y][x] = prob > percentage ? fieldCharacter : hole;

            }
        }
        //Set "hat" location
        const hatLocation = {
            x: Math.floor(Math.random() * colNum),
            y: Math.floor(Math.random() * rowNum)
          };
        //Make sure that "hat" is not at starting point
        while (hatLocation.x === 0 && hatLocation.y === 0) {
            hatLocation.x = Math.floor(Math.random() * colNum);
            hatLocation.y = Math.floor(Math.random() * rowNum);
          }
          field[hatLocation.y][hatLocation.x] = hat;
          return field;
        //Set "home" position before the game starts


    }

    //Task 4: Create runGame, print, askQuestion Methods for the game
    runGame() {
        //print the field
        console.log("Start Game");
        let playing = true;
        while(playing) {
        this.print();
        this.askQuestion();

        if (!this.isInBounds()) {
            console.log('Out of bounds, game over!');
            playing = false;
            break;
          } else if (this.isHole()) {
            console.log('Sorry, you fell in a hole!');
            playing = false;
            break;
          } else if (this.isHat()) {
            console.log('Congrats, you found your hat!');
            playing = false;
            break;
          }
          // Update the current location on the map
          this.field[this.locationY][this.locationX] = pathCharacter;
        }
         
    }

    print() {
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');

        console.log(displayString);
    }

    askQuestion() {
        const direction = prompt('Which way? ').toUpperCase();
        switch (direction) {
            //check if direction is U, D, L, R
            case 'U':
                this.locationY -=1;
                break;
            case 'D':
                this.locationY +=1;
                break;
            case 'L':
                this.locationX -=1;
                break;
            case 'R':
                this.locationX +=1;
                break;
            //check for boundaries
            //check if character falls into hole -game over
            //check if chracter gets the hat - game win
        }
    }

    isInBounds() {
        return (
          this.locationY >= 0 &&
          this.locationX >= 0 &&
          this.locationY < this.field.length &&
          this.locationX < this.field[0].length
        );
      }
    
      isHat() {
        return this.field[this.locationY][this.locationX] === hat;
      }
    
      isHole() {
        return this.field[this.locationY][this.locationX] === hole;
      }
    
      print() {
        const displayString = this.field.map(row => {
            return row.join('');
          }).join('\n');
        console.log(displayString);
      }
}

//Task 5: Instantiate Field Class to initialise constructor and generate rows and columns from the generateField Method. 
//Call runGame Method to run the game

const myfield = new Field();
myfield.generateField(0.3);
myfield.runGame();

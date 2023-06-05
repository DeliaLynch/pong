
class PlayerPaddle {
    constructor(startingY, divId) {
      this.Y = startingY;
      this.velocityY = 0;
      this.divId = divId;
    }

    refreshDisplay() {
      const top = this.Y;
      $(`#${this.divId}`).css("top", `${top}px`);
    }
  
    update() {
      this.Y += this.velocityY;
    }

    //player paddle movement code provided by the lovely Marcia Marques
    handleKeydown(key) {
      if (key === "up") {
        if(this.Y >= 0){
          this.Y -= 10;
        }
      }else if (key ==="down"){
        if(this.Y <= 390){
          this.Y += 10;
        }
      }
    }
}



//Attempted to increase paddle velocity, resulted in serious glitching
class ComputerPaddle{

    constructor(startingY, divId) {
        this.Y = startingY;
        this.velocityY = -1;
        this.divId = divId;
      }

      //reverses vertical direction of the computer paddle once Y coordinate passes threshold
      detectWallCollision(){
        if (this.Y < 0){
            this.velocityY += 1;}
        else if(this.Y > 390){
            this.velocityY -= 1;
        }
          }
        
      //pushes the new Y coordinates to the CSS
      refreshDisplay() {
          const top = this.Y;
          $(`#${this.divId}`).css("top", `${top}px`);
        }

        update() {
          this.Y += this.velocityY;
        }
}

//contains ball behavior as well as score data
//attempted to increase velocity, ball starting going through the paddles, not sure why
class Ball{
    constructor(startingX, startingY, divId){
        this.X = startingX;
        this.Y = startingY;
        this.divId = divId;
        this.velocityX = -1;
        this.velocityY = -1;
        this.playerScore = 10;
        this.computerScore = 10;
        this.playerWins = 0;
        this.computerWins = 0;
        this.message = "";
        this.scores = [];
        this.startTimer();
        this.winMessage = ["Even a broken clock is right twice a day.",
         "Wow! A point! How exciting.", "It's kinda sad you're wasting your time this way.",
        "This game is quite literally rigged in your favor. So shut up.",
         "You're probably gonna brag about this on social media like a loser.",
        "Don't humans need vitamin D or something? Go outside.",
        "While you're doing this, I stole all your credit card information. Was it worth it?",
        "Sorry, got bored. Was watching Vine.", 
        "See the reflection in the screen? That's the face of a nerd.", 
        "That one was only because I felt bad for you. Enjoy your pity point.",
        "Count your blessings Delia couldn't figure out how to make my paddle faster."];
        this.loseMessage = ["Is this your first time using a computer?",
      "It's ok! Pong is a notoriously complicated and difficult game.",
      "Is it too late to wager on this?", 
       "Pong is a 50 year old game. You would think humans would be better at this by now." , "*Yawn*",
      "Using the arrow keys must be tiring. I wouldn't know. I'm a computer.", "Let you win? I'm afraid I can't do that, Player.",
    "Even Joris could aim better than that.", "Maybe you should have your grandpa sub in for you.", 
    "This ain't beer pong.  Wise up, Charlie.", "Did you skip breakfast today?"];
    }

    startTimer(){
        this.startTime = Date.now();
        
    }

    endTimer(){
        let endTime = Date.now();
        let timeDiff = endTime = this.startTime;
        let seconds = Math.floor((timeDiff / 1000) % 60);
        let minutes = Math.floor((timeDiff / 1000 / 60) % 60);
        this.scores.push({minutes: minutes, seconds: seconds});
        console.log({minutes: minutes, seconds: seconds})

    }
    //detects UPPER and LOWER wall collisions and reverses Y velocity of ball
    detectWallCollision(){
        if (this.Y < 20){ 
            this.velocityY += 1;}
        else if(this.Y > 460){
            this.velocityY -= 1;
        }
          }

    //adjust ball CSS X and Y coordinates
    //Displays Scores and Wins on Scoreboard
    //Displays sassy win/lose message from the computer opponent
    refreshDisplay() {
    this.winMessage[Math.floor(Math.random()*this.winMessage.length)];
    const left = this.X - 20;
    const top = this.Y - 20;
    $(`#${this.divId}`).css("left", `${left}px`);
    $(`#${this.divId}`).css("top", `${top}px`);
    $("#playerScore").text(`Player Score: ${this.playerScore} `);
    $("#computerScore").text(`Computer Score: ${this.computerScore} `);
    $("#computerWins").text(`${this.computerWins} `);
    $("#playerWins").text(`${this.playerWins} `);
    $("#highScores").text(`${this.scores} `);
    $("#message").text(`${this.message} `);
      }

     
      update() {
        this.Y += this.velocityY;
        this.X += this.velocityX;
        /*BROKEN
        this.timer();*/
      
        
        
        //Detects when left side of ball touches left boundary
        //Player loses a point and ball resets to the center
        if (this.X < 20){
            this.X = 320;
            this.Y = 240;
            this.velocityX = -1;
            this.velocityY = -1;
            this.playerScore -= 1;
            this.message = this.loseMessage[Math.floor(Math.random()*this.loseMessage.length)];
            console.log(this.message);
            console.log('Computer: ' , String(this.computerScore) , ' Player: ', String(this.playerScore));
            
        }

        //Detects when right side of ball touches right boundary
        //Computer loses a point and ball resets to the center
        if (this.X > 620){
            this.X = 320;
            this.Y = 240;
            this.velocityX = -1;
            this.velocityY = -1;
            console.log("player point!");
            this.computerScore -= 1;
            this.message = this.winMessage[Math.floor(Math.random()*this.winMessage.length)];
            console.log(this.message);
            console.log('Computer: ' , String(this.computerScore) , ' Player: ', String(this.playerScore));
        }

        //Detects when player score reaches 0
        //resets the points back to 10 for a new game
        //records a win for the computer
        if (this.playerScore === 0){
          this.playerScore = 10;
          this.computerScore = 10;
          this.computerWins += 1;
          this.message = " ";
          this.startTimer()
          console.log("You lose!!");
        }

        //Detects when computer score reaches 0
        //resets the points back to 10 for a new game
        //records a win for the player
        if (this.computerScore === 0){
          this.playerScore = 10;
          this.computerScore = 10;
          this.playerWins += 1;
          this.message = " ";
          this.endTimer();
          this.startTimer()
          console.log("You Win!!");
          
        }
      }

}

$(document).ready(function () {
    let player = new PlayerPaddle(200, "playerPaddle");
    let computer = new ComputerPaddle(200, "computerPaddle");
    let ball = new Ball(320, 240, "ball");
  
    window.onkeydown = function(e){
      var kc = e.keyCode;
      e.preventDefault();

      if (kc === 38)  player.handleKeydown("up");
      else if (kc ===40)  player.handleKeydown("down");
    }


    function refreshAllDisplay() {
        player.refreshDisplay();
        computer.refreshDisplay();
        ball.refreshDisplay();
        computer.detectWallCollision();
        ball.detectWallCollision();
        
        }


    //Detection for bottom and top of paddles is glitching, not sure why
    function detectPaddleCollision(){
      //detect ball collision with side of computer paddle
      if (ball.X === 600 && (ball.Y - 20 >= computer.Y && ball.Y + 20 < (computer.Y + 90))){
        ball.velocityX -= 1;
      }


      //detect collision with top of computer paddle
      //GLITCHING
     if ((ball.X >= 600)  && ((ball.Y + 20) === computer.Y)){
      ball.velocityY -= 1;
     }

    

      //detect collision with bottom of computer paddle
      //GLITCHING
     if ((ball.X >= 600) && (ball.Y - 20 === computer.Y +90)){
      ball.velocityY -= 1;
     }

    

      //detect ball collision with side of player paddle
      if (ball.X === 40 && (ball.Y - 20 >= player.Y && ball.Y + 20 < (player.Y + 90))){
        ball.velocityX += 1;
      }

      //detect collision with bottom of player paddle
      //GLITCHING
      

      if ((ball.X <= 20)  && ((ball.Y - 20) === player.Y + 90)){
        ball.velocityY += 1;
       }
    
      //detect collision with top of player paddle
      //GLITCHING
      

      if ((ball.X <= 20)  && ((ball.Y + 20) === player.Y)){
        ball.velocityY -= 1;}
       
    }

    

    function oneFrame() {
        player.update();
        computer.update();
        ball.update();
        detectPaddleCollision();
        refreshAllDisplay();
        requestAnimationFrame(oneFrame);
        }

    function handleKeydown(evt) {
        player.handleKeydown(evt.key); 
        }
     
    $("#playfield").keydown(handleKeydown);
    requestAnimationFrame(oneFrame);
        });


  /* THINGS TO FIX
  1. Fix the timer so you can record high scores in the ball.scores array
  2. Fix the top and bottom paddle collision detection
  3. Increase the speed of the computer paddle and ball without the collision detection getting messed up
  4. Make the player paddle move more smoothly, without jumping up and down on the Y axis
  5. Create a paddle superclass with subclasses for computer and player
  6. Store comparison values as constants
  7. use the start and end timestamps of the game, 
  calculate the difference and convert it to minutes and seconds.
   Date.now() gives you the time in milliseconds since midnight of January 1, 1970, UTC.
   8. Display a message that the player won the game when they do
   9. Use jQuery to handle any events, and localStorage to remember scores
*/
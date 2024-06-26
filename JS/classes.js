class Snake {
  constructor(){
    this.snake = document.getElementById("snake");
    this.food = document.getElementById("food");
    this.cauda = [];
  };
};

class Move extends Snake {
  constructor(){
    super();
  };

  moveCauda() {
    if (this.cauda.length > 0) {
      for (let i = this.cauda.length - 1; i > 0; i--) {
        const segmentoAnterior = this.cauda[i - 1];
        const estilo = segmentoAnterior.style;
        this.cauda[i].style.left = estilo.left;
        this.cauda[i].style.top = estilo.top;
      }
  
      const cabeca = document.getElementById("snake");
      this.cauda[0].style.left = cabeca.style.left;
      this.cauda[0].style.top = cabeca.style.top;
    }
  };

  movimentacao() {
    this.moveCauda();
  
    switch (this.direcao) {
      case "right":
        this.snakeX += this.movimento;
        break;
      case "left":
        this.snakeX -= this.movimento;
        break;
      case "down":
        this.snakeY += this.movimento;
        break;
      case "up":
        this.snakeY -= this.movimento;
        break;
    };
  
    this.updateSnakePosition();
    this.checkCollision();
  };
};

class Interface extends Move {
  constructor(){
    super();
    this.snakeX = 150;
    this.snakeY = 150;
    this.foodX = 0;
    this.foodY = 0;
    this.movimento = 12;
    this.direcao = "";
    this.score = 0;
    this.scoreDisplay = document.getElementById("score");
  };

  updateFoodPosition() {
    this.foodX = Math.floor(Math.random() * 30) * 10;
    this.foodY = Math.floor(Math.random() * 30) * 10;
    this.food.style.left = this.foodX + "px";
    this.food.style.top = this.foodY + "px";
  };

  updateSnakePosition() {
    this.snake.style.left = this.snakeX + "px";
    this.snake.style.top = this.snakeY + "px";
  };


  checkCollision() {

    if (this.snakeX >= this.foodX - 8 && 
      this.snakeX <= this.foodX + 8 && 
      this.snakeY >= this.foodY - 8 && 
      this.snakeY <= this.foodY + 8) {
        
      this.score++;
      this.scoreDisplay.innerText = "Score: " + this.score;
      this.updateFoodPosition();
      this.cresceCauda();
    };
  
    for (let i = 0; i < this.cauda.length; i++) {
      const segmento = this.cauda[i];
      const segmentoX = parseInt(segmento.style.left);
      const segmentoY = parseInt(segmento.style.top);
  



      if (this.snakeX === segmentoX && this.snakeY === segmentoY) {
        this.gameOver();
      }
    };
  
    if (this.snakeX >= 300 || this.snakeX <= 0 || this.snakeY >= 300 || this.snakeY <= 0) {
      this.gameOver();
    };
  };

  cresceCauda() {
    const novaCauda = document.createElement("div");
    novaCauda.className = "cauda";
    this.cauda.push(novaCauda);
    this.snake.parentNode.appendChild(novaCauda); // Adicione a cauda como um filho do mesmo pai da cabeça
    const cabeca = document.getElementById("snake");
    const ultimaCauda = this.cauda[this.cauda.length - 1];
    let left = parseInt(ultimaCauda.style.left);
    let top = parseInt(ultimaCauda.style.top);
    novaCauda.style.left = left + "px";
    novaCauda.style.top = top + "px";
  };
  
  gameOver() {
    alert("Game Over! Your score is " + this.score);
    this.snakeX = 150;
    this.snakeY = 150;
    this.score = 0;
    this.direcao = "";
    this.updateFoodPosition();
    this.scoreDisplay.innerText = "Score: " + this.score;
  
    for (let i = 0; i < this.cauda.length; i++) {
      const segmento = this.cauda[i];
      segmento.remove();
    }
    this.cauda.length = 0;
  };

};
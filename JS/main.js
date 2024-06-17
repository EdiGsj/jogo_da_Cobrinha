class Game extends Interface {
    constructor(){    // Cria seu próprio Constructor
      super()         // Herda o constructor do pai
      this.init()
    }
  
    init(){
  
      this.updateFoodPosition(); 
      this.gameLoop = setInterval(() => {
        this.movimentacao();
      }, 100);
      
      document.addEventListener("keydown", (event) => {
        switch (event.key) {
          case "ArrowRight":
            if(this.direcao != "left"){
              this.direcao = "right"
            };
            break;
          case "ArrowLeft":
            if(this.direcao != "right"){
              this.direcao = "left"
            };
            break;
          case "ArrowDown":
            if(this.direcao != "up"){
              this.direcao = "down"
            };
            break; 
          case "ArrowUp":
            if(this.direcao != "down"){
              this.direcao = "up"
            };
            break;
        };
        this.snake.style.left = this.snakeX + "px";
        this.snake.style.top = this.snakeY + "px";
        this.checkCollision();
      });
    };
};
  
const game = new Game()
// Ao Instanciar uma classe, ela tem suas variáveis e funções inicializadas
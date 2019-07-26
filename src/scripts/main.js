const app = {
   init() {
      // IMAGES
      this.paperImg = document.querySelector(".paper")
      this.rockImg = document.querySelector(".rock")
      this.scissorsImg = document.querySelector(".scissors")
      this.images = [...document.querySelectorAll(".images img")]

      // SPANS
      this.playerChoice = document.querySelector(".playerChoice")
      this.AIChoice = document.querySelector(".computerChoice")
      this.games = document.querySelector(".games")
      this.wins = document.querySelector(".wins")
      this.draws = document.querySelector(".draws")
      this.losses = document.querySelector(".losses")
      this.stats = [this.games, this.wins, this.draws, this.losses]

      this.button = document.querySelector("button")
      this.title = document.querySelector(".title")

      this.button.addEventListener("click", () => this.startGame(this))

      this.getStorage()
      this.handlePlayerChoice()
   },

   getStorage() {
      this.stats.forEach(statsItem => this.setStatsText(statsItem.className))
   },

   setStatsText(item) {
      this[item].textContent = JSON.parse(localStorage.getItem(item)) || 0

   },

   handlePlayerChoice() {
      this.images.forEach((image => {
         image.addEventListener("click", e => {
            this.images.forEach(image => {
               image.style.transform = ""
            })
            this.playerChoice.textContent = e.target.dataset.type;
            this.AIChoice.textContent = ""
            image.style.transform = "scale(1.2)"
         })
      }))
   },

   handleAIChoice() {
      this.AIChoice.textContent = this.images[Math.floor(Math.random() * this.images.length)].dataset.type
   },

   setStorage(item) {
      localStorage.setItem(item, this[item].textContent)
   },

   startGame() {
      if (!this.playerChoice.textContent)
         return alert("What's your choice?")
      this.handleAIChoice()
      if (this.playerChoice.textContent === this.AIChoice.textContent) {
         this.title.textContent = "DRAW!"
         this.draws.textContent++
         this.setStorage('draws')
      } else if (this.playerChoice.textContent === "paper" && this.AIChoice.textContent === "rock" || this.playerChoice.textContent === "rock" && this.AIChoice.textContent === "scissors" || this.playerChoice.textContent === "scissors" && this.AIChoice.textContent === "paper") {
         this.title.textContent = "WIN! :D"
         this.wins.textContent++
         this.setStorage('wins')
      } else {
         this.title.textContent = "LOOOOSER! :("
         this.losses.textContent++
         this.setStorage('losses')
      }

      this.games.textContent++
      this.setStorage('games')

      this.button.setAttribute("disabled", "true");
      setTimeout(() => {
         this.title.textContent = "What's your choice?";
         this.AIChoice.textContent = "";
         this.button.removeAttribute("disabled");
      }, 1500)
   }
}

app.init()
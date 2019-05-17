const app = {
   init() {
      // IMAGES
      this.paperImg = document.querySelector(".paper")
      this.rockImg = document.querySelector(".rock")
      this.scissorsImg = document.querySelector(".scissors")
      this.images = [...document.querySelectorAll(".images img")]

      // SPANS
      this.playerChoiceSpan = document.querySelector(".playerChoice")
      this.AIChoiceSpan = document.querySelector(".computerChoice")
      this.games = document.querySelector(".games")
      this.wins = document.querySelector(".wins")
      this.draws = document.querySelector(".draws")
      this.losses = document.querySelector(".losses")

      this.button = document.querySelector("button")
      this.title = document.querySelector(".title")
      this.h2 = document.querySelector(".yourChoice")

      this.button.addEventListener("click", () => this.startGame(this))

      this.playerChoice()


   },

   playerChoice() {
      this.images.forEach((image => {
         image.addEventListener("click", e => {
            this.images.forEach(image => {
               image.style.transform = ""
            })
            this.playerChoiceSpan.textContent = e.target.className;
            this.AIChoiceSpan.textContent = ""
            image.style.transform = "scale(1.2)"
         })
      }))
   },

   AIChoice() {
      this.AIChoiceSpan.textContent = this.images[Math.floor(Math.random() * this.images.length)].className
   },

   startGame() {
      if (!this.playerChoiceSpan.textContent)
         return alert("What's your choice?")
      this.AIChoice()
      if (this.playerChoiceSpan.textContent === this.AIChoiceSpan.textContent) {
         this.title.textContent = "DRAW!"
         this.draws.textContent++
      } else if (this.playerChoiceSpan.textContent === "paper" && this.AIChoiceSpan.textContent === "rock" || this.playerChoiceSpan.textContent === "rock" && this.AIChoiceSpan.textContent === "scissors" || this.playerChoiceSpan.textContent === "scissors" && this.AIChoiceSpan.textContent === "paper") {
         this.title.textContent = "WIN! :D"
         this.wins.textContent++
      } else {
         this.title.textContent = "LOOOOSER! :("
         this.losses.textContent++
      }

      this.games.textContent++

      this.button.setAttribute("disabled", "true");
      this.button.classList.add("active")
      setTimeout(() => {
         this.title.textContent = "What's your choice?";
         this.AIChoiceSpan.textContent = "";
         this.button.removeAttribute("disabled");
         this.button.classList.remove("active")
      }, 1500)
   }
}

app.init()
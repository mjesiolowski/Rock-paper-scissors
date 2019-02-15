// IMAGES
const paperImg = document.querySelector(".paper");
const rockImg = document.querySelector(".rock");
const scissorsImg = document.querySelector(".scissors");
const images = [...document.querySelectorAll(".images img")];

// SPANS
const playerChoiceSpan = document.querySelector(".playerChoice");
const AIChoiceSpan = document.querySelector(".computerChoice");
let games = document.querySelector(".games")
let wins = document.querySelector(".wins")
let draws = document.querySelector(".draws")
let losses = document.querySelector(".losses")

const button = document.querySelector("button");
const h1 = document.querySelector("h1");
const h2 = document.querySelector(".yourChoice");

// PLAYER CHOICE

function playerChoice() {
   images.forEach((image => {
      image.addEventListener("click", function (e) {
         images.forEach(image => {
            image.style.transform = ""
         })
         playerChoiceSpan.textContent = e.target.className;
         AIChoiceSpan.textContent = ""
         image.style.transform = "scale(1.2)"
      })
   }))
}

// AI CHOICE

function AIChoice() {
   AIChoiceSpan.textContent = images[Math.floor(Math.random() * images.length)].className

}

// GAME RULES

function game() {
   if (!playerChoiceSpan.textContent)
      return alert("What's your choice?")
   AIChoice()
   if (playerChoiceSpan.textContent === AIChoiceSpan.textContent) {
      h1.textContent = "DRAW!"
      draws.textContent++
      games.textContent++
   } else if (playerChoiceSpan.textContent === "paper" && AIChoiceSpan.textContent === "rock" || playerChoiceSpan.textContent === "rock" && AIChoiceSpan.textContent === "scissors" || playerChoiceSpan.textContent === "scissors" && AIChoiceSpan.textContent === "paper") {
      h1.textContent = "WIN! :D"
      wins.textContent++
      games.textContent++
   } else {
      h1.textContent = "LOOOOSER! :("
      losses.textContent++
      games.textContent++
   }
   button.setAttribute("disabled", "true");
   button.classList.add("active")
   setTimeout(function () {
      h1.textContent = "What's your choice?";
      AIChoiceSpan.textContent = "";
      button.removeAttribute("disabled");
      button.classList.remove("active")
   }, 2000)


}


document.addEventListener("load", playerChoice())
button.addEventListener("click", game)
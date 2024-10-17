
import { powerUpIntervals, upgrades } from "./constants/upgrades.js";

//money per sec function
let money = 0;
let moneyPerSecond = 0;
let displayMoney = 0;
let moneyPerClick = 100;
const moneyElement = document.querySelector(".lev-count");
const moneyPerSecondElement = document.querySelector('.lev-per-sec');



const backgroundMusic=new Audio('audio/bgm.mp3')
backgroundMusic.volume=0.02;

const upgradeSound=new Audio('audio/upgrade.mp3')



// Update money display
function updateMoneyDisplay() {
  moneyElement.textContent = money.toFixed(2);
  moneyPerSecondElement.textContent = moneyPerSecond.toFixed(2);
  //   moneyElement.classList.add('animated');
  //   setTimeout(() => {
  //     moneyElement.classList.remove('animated');
  // }, 100); // Match this duration with your CSS animation duration
}

// Increment money by money per second
function incrementMoney() {
  money += moneyPerSecond / 10;
  updateMoneyDisplay();
}

function updateTitle() {
  document.title = `${Math.floor(money).toLocaleString()} лева`; // Update title with current money
}

let levImgContainter = document.querySelector('.lev-container')



function incrementLev(event) {
  money += moneyPerClick;
  updateMoneyDisplay();
  const clickingSound=new Audio('audio/click.mp3')
  clickingSound.volume=0.1
  clickingSound.play();
  const x = event.offsetX
  const y = event.offsetY

  const div = document.createElement('div')
  div.innerHTML = `
  <span style="display: flex; align-items: center;">
    +${Math.round(moneyPerClick)}
    <img src="images/1lv.png" alt="lew" style="width: 20px; height: 20px; margin-left: 5px;">
  </span>
`;
  div.style.cssText = `color: #D6ED17; position: absolute; top: ${y}px; left: ${x}px; font-size: 25px; pointer-events: none;`
  levImgContainter.appendChild(div)

  div.classList.add('fade-up')

  divTimeout(div)
}

const divTimeout = (div) => {
  setTimeout(() => {
    div.remove()
  }, 800)
}
// Run the increment function every second
setInterval(incrementMoney, 100);
setInterval(updateTitle, 1000);

function buyUpgrade(upgrade) {

  const mU = upgrades.find((u) => {
    if (u.name == upgrade) return u
  })

 
  if (money >= mU.parsedCost) {
    const upgradeSound=new Audio('audio/upgrade.mp3')
    upgradeSound.volume=0.01
    upgradeSound.play();
  

    

    money -= mU.parsedCost;
    mU.level.innerHTML++;

    mU.parsedCost *= mU.costMultiplier;
    mU.cost.innerHTML = mU.parsedCost.toFixed(2);
    moneyPerSecond += mU.mPS;
    updateMoneyDisplay();
  }
}

function save() {
  localStorage.clear()

  upgrades.map((upgrade) => {

    const obj = JSON.stringify({
      parsedLevel: parseFloat(upgrade.level.innerHTML),
      parsedCost: upgrade.parsedCost,
    })

    localStorage.setItem(upgrade.name, obj)

  })

  localStorage.setItem('mnPerClick', JSON.stringify(moneyPerClick))
  localStorage.setItem('mnPerSecond', JSON.stringify(moneyPerSecond))
  localStorage.setItem('money', JSON.stringify(money))
}

const saveButton = document.getElementById('saveButton');
const saveModal = document.getElementById('saveModal');
const confirmSave = document.getElementById('confirmSave');
const cancelSave = document.getElementById('cancelSave');

// When the "Save" button is clicked, show the modal
saveButton.addEventListener('click', function () {
  saveModal.style.display = 'block'; // Show the modal
});

// When the user clicks "Yes, Save", close the modal and confirm save
confirmSave.addEventListener('click', function () {
  saveModal.style.display = 'none'; // Hide the modal
  alert("Save confirmed!"); // You can replace this with actual save logic
  save()
});

// When the user clicks "Cancel", close the modal
cancelSave.addEventListener('click', function () {
  saveModal.style.display = 'none'; // Hide the modal
  alert("Save cancelled."); // Optionally show a message for cancellation
});

// Close the modal if the user clicks outside of the modal content
window.addEventListener('click', function (event) {
  if (event.target == saveModal) {
    saveModal.style.display = 'none';
  }
  if (event.target == loadModal) {
    loadModal.style.display = 'none';
  }
});

const loadButton = document.getElementById('loadButton');
const loadModal = document.getElementById('loadModal');
const confirmLoad = document.getElementById('confirmLoad');
const cancelLoad = document.getElementById('cancelLoad');

loadButton.addEventListener('click', function () {
  loadModal.style.display = 'block'; // Show the load modal
});

confirmLoad.addEventListener('click', function () {
  loadModal.style.display = 'none'; // Hide the modal
  alert("Load confirmed!"); // You can replace this with actual load logic
  load()
});

cancelLoad.addEventListener('click', function () {
  loadModal.style.display = 'none'; // Hide the modal
  alert("Load cancelled.");
});

function load() {
  upgrades.map((upgrade) => {
    const savedValues = JSON.parse(localStorage.getItem(upgrade.name))

    upgrade.parsedCost = savedValues.parsedCost

    upgrade.level.innerHTML = savedValues.parsedLevel
    upgrade.cost.innerHTML = upgrade.parsedCost.toFixed(2)
  })

  moneyPerClick = JSON.parse(localStorage.getItem('mnPerClick'))
  moneyPerSecond = JSON.parse(localStorage.getItem('mnPerSecond'))
  money = JSON.parse(localStorage.getItem('money'))

  moneyElement.textContent = money.toFixed(2);
  moneyPerSecondElement.textContent = moneyPerSecond.toFixed(2);
}

window.buyUpgrade = buyUpgrade;
window.save = save;
window.load = load;
window.incrementLev = incrementLev;


const buyBtn = document.querySelector(".buyMulti");
const sellBtn = document.querySelector(".sellMulti");
buyBtn.classList.add("active");
sellBtn.classList.add("disabled");
buyBtn.addEventListener("click", () => {
    buyBtn.classList.add("active");
    sellBtn.classList.add("disabled");
    sellBtn.classList.remove("active");
    buyBtn.classList.remove("disabled");
});

sellBtn.addEventListener("click", () => {
    sellBtn.classList.add("active");
    buyBtn.classList.add("disabled");
    buyBtn.classList.remove("active");
    sellBtn.classList.remove("disabled");
});

const btn1 = document.querySelector(".btn1");
btn1.classList.add("active");
const btn10 = document.querySelector(".btn10");
btn10.classList.add("disabled");
const btn100 = document.querySelector(".btn100");
btn100.classList.add("disabled");

function setActiveButton(activeBtn, disabledBtns) {
  activeBtn.classList.add("active");
  activeBtn.classList.remove("disabled");

  disabledBtns.forEach(btn => {
      btn.classList.remove("active");
      btn.classList.add("disabled");
  });
}

btn1.addEventListener("click", () => {
  setActiveButton(btn1, [btn10, btn100]);
});

btn10.addEventListener("click", () => {
  setActiveButton(btn10, [btn1, btn100]);
});

btn100.addEventListener("click", () => {
  setActiveButton(btn100, [btn1, btn10]);
});
//money per sec function
let money = 0;
let moneyPerSecond = 0;
let displayMoney = 0;
let moneyPerClick = 1;
const moneyElement = document.querySelector(".lev-count");
const moneyPerSecondElement = document.querySelector('.lev-per-sec');

// Update money display
function updateMoneyDisplay() {
  moneyElement.textContent = money.toFixed(2);
  moneyPerSecondElement.textContent = moneyPerSecond.toFixed(2);
  moneyElement.classList.add('animated');
  setTimeout(() => {
    moneyElement.classList.remove('animated');
}, 100); // Match this duration with your CSS animation duration
}

// Increment money by money per second
function incrementMoney() {
  money += moneyPerSecond;
  updateMoneyDisplay();
}

function updateTitle() {
    document.title = `${Math.floor(money).toLocaleString()} лева`; // Update title with current money
  }

// Run the increment function every second
setInterval(incrementMoney, 1000);
setInterval(updateTitle, 1000);


let lev = document.querySelector(".lev-count")
let parsedLev=parseFloat(lev.innerHTML)

let upgradeCostLev2=10;

let lev2Level=document.querySelector(".level-lev-2")
const upgradeCostLev2Element = document.querySelector('.lev-cost-2');



function updateUpgradeLev2Display() {
    upgradeCostLev2Element.textContent = upgradeCostLev2.toFixed(2);
  }


function incrementLev(){
    money+=moneyPerClick;
    updateMoneyDisplay();
    }

function buy2Leva(){
    if(money>=upgradeCostLev2){
        money-=upgradeCostLev2
        upgradeCostLev2*=1.04

        lev2Level.innerHTML++
        moneyPerSecond += 2; // Increment money per second by 2
        updateMoneyDisplay();
        updateUpgradeLev2Display()

    }
}

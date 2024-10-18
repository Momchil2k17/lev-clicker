
import { defaultUpgradeValues } from "./constants/defaultValues.js";
import { powerUpIntervals, upgrades } from "./constants/upgrades.js";

//money per sec function
let money = 0;
let moneyPerSecond = 0;
let displayMoney = 0;
let moneyPerClick = 100;
const moneyElement = document.querySelector(".lev-count");
const moneyPerSecondElement = document.querySelector('.lev-per-sec');



const backgroundMusic = new Audio('audio/bgm.mp3')
backgroundMusic.volume = 0.02;

const upgradeSound = new Audio('audio/upgrade.mp3')



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
  updateUpgradeAffordability();
}

function updateTitle() {
  document.title = `${Math.floor(money).toLocaleString()} лева`; // Update title with current money
}

let levImgContainter = document.querySelector('.lev-container')



function incrementLev(event) {
  money += moneyPerClick;
  updateMoneyDisplay();
  const clickingSound = new Audio('audio/click.mp3')
  clickingSound.volume = 0.1
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

function setUpgradeInfo(){
  if(getActiveButton() === 'buy'){
    if(getActiveButtonForNums() === 1){
      upgrades.map((upgrade) => {
        upgrade.cost.innerHTML = upgrade.parsedCost.toFixed(2);
      });
    }
    else if(getActiveButtonForNums() === 10){
      upgrades.map((upgrade) => {
        upgrade.cost.innerHTML = (upgrade.parsedCost * upgrade.costMultiplier ** 10).toFixed(2);
      });
    }
    else if(getActiveButtonForNums() === 100){
      upgrades.map((upgrade) => {
        upgrade.cost.innerHTML = (upgrade.parsedCost * upgrade.costMultiplier ** 100).toFixed(2);
      });
    }
  } else {
    // Logic for selling (showing sell price)
    const sellPriceMultiplier = 0.25; // 50% refund value
    if(getActiveButtonForNums() === 1){
      upgrades.map((upgrade) => {
        upgrade.cost.innerHTML = (upgrade.parsedCost/upgrade.costMultiplier * sellPriceMultiplier).toFixed(2);
      });
    }
    else if(getActiveButtonForNums() === 10){
      upgrades.map((upgrade) => {
        upgrade.cost.innerHTML = (upgrade.parsedCost * upgrade.costMultiplier ** 9 * sellPriceMultiplier).toFixed(2);
      });
    }
    else if(getActiveButtonForNums() === 100){
      upgrades.map((upgrade) => {
        upgrade.cost.innerHTML = (upgrade.parsedCost * upgrade.costMultiplier ** 99 * sellPriceMultiplier).toFixed(2);
      });
    }
  }
  updateUpgradeAffordability();
}
function updateUpgradeAffordability() {
  upgrades.forEach((upgrade) => {
    let totalCost =  upgrade.parsedCost * upgrade.costMultiplier ** (getActiveButtonForNums() - 1);
    const upgradeElement = document.getElementById(`${upgrade.name}-upgrade`); // Assuming this refers to the DOM element of the upgrade
    const upgradeCost = upgrade.parsedCost;
    
    if(getActiveButton() === 'buy'){
    // Check if the player can afford this upgrade
    if (money >= totalCost) {
      upgradeElement.classList.remove('disabled');
    } else {
      upgradeElement.classList.add('disabled');
    }
  }else{
    if (upgrade.level.textContent >= getActiveButtonForNums()) {
      upgradeElement.classList.remove('disabled');
  } else {
      upgradeElement.classList.add('disabled');
  }
  }
  });
}
function buyUpgrade(upgrade) {
  const isBuying = getActiveButton() === 'buy';
  const multiplier = getActiveButtonForNums();
  const mU = upgrades.find((u) => {
    if (u.name == upgrade) return u
  })

  if (isBuying) {
    // Buying logic (you already have this)
    let totalCost = mU.parsedCost * mU.costMultiplier ** (multiplier - 1);
    if (money >= totalCost) {
      const upgradeSound = new Audio('audio/upgrade.mp3');
      upgradeSound.volume = 0.01;
      upgradeSound.play();

      money -= totalCost;
      mU.level.innerHTML = parseInt(mU.level.innerHTML) + multiplier;
      mU.parsedCost *= mU.costMultiplier ** multiplier;
      mU.cost.innerHTML = mU.parsedCost.toFixed(2);
      moneyPerSecond += mU.mPS * multiplier;
      updateMoneyDisplay();
    }
  }else {
    // Selling logic
    const currentLevel = parseInt(mU.level.innerHTML);
    
    if (currentLevel >= multiplier) {
      const sellPriceMultiplier = 0.25; // Sell back at 50% of the current cost
      let totalSellValue = (mU.parsedCost * mU.costMultiplier ** (multiplier - 1)) * sellPriceMultiplier;

      money += totalSellValue;
      mU.level.innerHTML = currentLevel - multiplier;
      mU.parsedCost /= mU.costMultiplier ** multiplier;
      mU.cost.innerHTML = mU.parsedCost.toFixed(2);
      moneyPerSecond -= mU.mPS * multiplier;
      updateMoneyDisplay();
    }else {
    alert(`You don't have enough upgrades to sell ${multiplier} units.`);
  } 
  }
  updateUpgradeAffordability();
  setUpgradeInfo()
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

function setActiveButton(activeBtn, disabledBtns) {
  activeBtn.classList.add("active");
  activeBtn.classList.remove("disabled");

  disabledBtns.forEach(btn => {
    btn.classList.remove("active");
    btn.classList.add("disabled");
  });
}
function setActiveButton2(activeBtn, disabledBtns) {
  activeBtn.classList.add("active");
  activeBtn.classList.remove("disabled");

    disabledBtns.classList.remove("active");
    disabledBtns.classList.add("disabled");
}

const buyBtn = document.querySelector(".buyMulti");
const sellBtn = document.querySelector(".sellMulti");
buyBtn.classList.add("active");
sellBtn.classList.add("disabled");
buyBtn.addEventListener("click", () => {
  setActiveButton2(buyBtn,sellBtn)
  setUpgradeInfo()
});

sellBtn.addEventListener("click", () => {
  setActiveButton2(sellBtn,buyBtn)
  setUpgradeInfo()
});
function getActiveButton() {
  if (buyBtn.classList.contains('active')) {
      return 'buy';
  } else if (sellBtn.classList.contains('active')) {
      return 'sell';
  }
  return null; // No button is active
}

const btn1 = document.querySelector(".btn1");
btn1.classList.add("active");
const btn10 = document.querySelector(".btn10");
btn10.classList.add("disabled");
const btn100 = document.querySelector(".btn100");
btn100.classList.add("disabled");
setUpgradeInfo()




btn1.addEventListener("click", () => {
      setActiveButton(btn1, [btn10, btn100]);
      setUpgradeInfo()
    });
    
    btn10.addEventListener("click", () => {
      setActiveButton(btn10, [btn1, btn100]);
      setUpgradeInfo()
    });
    
    btn100.addEventListener("click", () => {
      setActiveButton(btn100, [btn1, btn10]);
      setUpgradeInfo()
    });
    function getActiveButtonForNums() {
      if (btn1.classList.contains('active')) {
          return 1;
      } else if (btn10.classList.contains('active')) {
          return 10;
      } else if (btn100.classList.contains('active')) {
          return 100;
      }
      return null; // No button is active
  }


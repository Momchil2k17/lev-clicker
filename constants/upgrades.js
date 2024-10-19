import { defaultUpgradeValues } from "./defaultValues.js";

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-'); // Replace spaces with hyphens
}

function createUpgrades() {
    const upgradesContainer = document.getElementById('upgrades-container')
    const template = document.getElementById('upgrade-template').textContent
  
    defaultUpgradeValues.forEach((obj) => {
      let html = template;
      const slugifiedName = slugify(obj.name);
      Object.keys(obj).forEach((key) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, obj[key])
      });
      upgradesContainer.innerHTML += html
    })
  }
  createUpgrades()
  
export const upgrades = [
    {
        name: '10st',
        bgname:'Десет стотинки',
        cost: document.querySelector('.lev-cost-10st'),
        parsedCost: parseFloat(document.querySelector(".lev-cost-10st").innerHTML),
        level: document.querySelector(".level-lev-10st"),
        costMultiplier: 1.12,
        mPS: 0.1
      },
  
    {
      name: '20st',
      bgname:'Двадесет стотинки',
      cost: document.querySelector('.lev-cost-20st'),
      parsedCost: parseFloat(document.querySelector(".lev-cost-20st").innerHTML),
      level: document.querySelector(".level-lev-20st"),
      costMultiplier: 1.12,
      mPS: 0.2
    },
    {
      name: '2lv',
      bgname:'Два лева',
      cost: document.querySelector('.lev-cost-2lv'),
      parsedCost: parseFloat(document.querySelector(".lev-cost-2lv").innerHTML),
      level: document.querySelector(".level-lev-2lv"),
      costMultiplier: 1.12,
      mPS: 2
    },
  
  ]

  export const powerUpIntervals = [10, 20, 30, 50, 70, 100, 150, 200, 250, 300]
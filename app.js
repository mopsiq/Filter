let obj = {
  "companyName": "ATX Corporation",
  "homeTown": "London",
  "formed": 2016,
  "active": true,
  "members": [
    {
      name: "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": [
        "Radiation resistance",
        "Turning tiny",
        "Radiation blast"
      ]
    },
    {
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ]
    },
    {
      "name": "Spider-Man",
      "age": 24,
      "secretIdentity": "Piter Parker",
      "powers": [
        "Release of spiders",
        "Radiation blast",
        "Superhuman reflexes"
      ]
    },
    {
      "name": "Leo",
      "age": 30,
      "secretIdentity": "Leonardo",
      "powers": [
        "Rage",
        "Radiation blast",
        "Superhuman reflexes"
      ]
    },
    {
      "name": "Batman",
      "age": 32,
      "secretIdentity": "Bruse Wayne",
      "powers": [
        "Rage",
        "Intelligence",
        "Superhuman reflexes"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Immortality",
        "Heat Immunity",
        "Inferno",
        "Teleportation",
        "Interdimensional travel"
      ]
    }
  ]
};


let arrNames = getArrayParams(obj, 'name');
let arrAges = getArrayParams(obj, 'age');
let arrIdentity = getArrayParams(obj, 'secretIdentity');
let moreInfo = getArrayParams(obj);
// Elements
let list = document.getElementById('fullList');
let sort = document.getElementById('fullSort');
let blockItem = document.querySelectorAll('.block__inner');

function getArrayParams(object, param) {
    let array = [];
    
    if(arguments.length == 2) {
        for(let key in object) {
            if(Array.isArray(object[key])) {
                for(let value of Object.values(object[key])) {
                    array.push(value[param])
                }
            }
        }
    } else {
        for(let i in object) {
           if(!Array.isArray(object[i])) {
               array.push(i.toLowerCase() + ': ' + object[i])
           }
        }
    }

    return array
};
    
function fillingBlock(array, block) {
    let result = [];

    for(let i= 0; i <= array.length; i++) {
        let newItem = document.createElement('div');
        newItem.className = "block__item"
        newItem.textContent = array[i];
        result.push(newItem);
    }
    block.append(...result)
};
    
function checkingBlocks(elem, array, attribute) {

    if(elem.getAttribute('dataset') == attribute) {
       for(let i = 0; i <= array.length; i++) {
           elem.children[i].textContent = array[i];
          
           
           if(elem.children.length < array.length) {
                fillingBlock(array, elem)
           }
       }
   }     
};

// Проверка и перебор элементов, для удобства влаживаем всё в массив
function newSortingElements(element, mode) {
    // mode: 1 = A-Z
    // mode: 2 = Z-A
    let newArray = [];
    
    for(let i = 0; i < element.children.length; i++) {
        if(element.children[i].textContent !== '') {
            newArray.push(element.children[i].textContent)
        }
    }
    if(mode == 1) {
        if(newArray.every((a) => isNaN(+a))) {
            newArray = newArray.sort();
        }
        newArray = newArray.sort((a, b) => a - b);
    } 
    
    if(mode == 2) {
        if(newArray.every((a) => isNaN(+a))) {
            newArray = newArray.sort().reverse();;
        }
        newArray = newArray.sort((a, b) => b - a);
    }
    
    
    for(let i = 0; i < newArray.length; i++) {
        element.children[i].textContent = newArray[i];
    }
    
}



document.addEventListener('DOMContentLoaded', () => {

    blockItem.forEach((item) =>  {
       checkingBlocks(item, arrNames, 'var1');
       checkingBlocks(item, arrAges, 'var2');
       checkingBlocks(item, arrIdentity, 'var3');
       checkingBlocks(item, moreInfo, 'var4');
    });
    
    list.addEventListener('change', function(item) {
        blockItem.forEach((item, index) => {
            let currentIt = item;
            if(currentIt.getAttribute('dataset') != this.value) {
                currentIt.classList.add('hidden')
                sort.removeAttribute('disabled')                
            } 
            else {
                // Сортировка
                sort.addEventListener('change', () => {
                    if(sort.options[sort.selectedIndex].value == 'sort1') {
                        list.append(newSortingElements(currentIt, 1))
                    }
                    if(sort.options[sort.selectedIndex].value == 'sort2') {
                        list.append(newSortingElements(currentIt, 2))
                    }
                });
                currentIt.classList.remove('hidden')
            }
            
            // Возвращаясь на главную страницу элементы приобретают прежний вид
            if(this.value == 'var0') {
                sort.setAttribute('disabled', 'disabled')
                currentIt.classList.remove('hidden')
                checkingBlocks(currentIt, arrNames, 'var1');
                checkingBlocks(currentIt, arrAges, 'var2');
                checkingBlocks(currentIt, arrIdentity, 'var3');
                checkingBlocks(currentIt, moreInfo, 'var4');
            }
            

        });
    });
    
});
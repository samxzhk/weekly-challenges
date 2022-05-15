
function ColorsRandom()
{

};
ColorsRandom.prototype = 
{
    constructor:ColorsRandom,
    getRandom: getRandom = num => Math.floor(Math.random() * (num + 1)),
    randomHex: function randomHex()
{
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let string = '#';
    for(let i = 0; i < 6; i++)
    {
        string = string + hex[Math.floor(Math.random() * hex.length)];
    }

    return string;
},
    randomHsl:
function randomHsl()
{
    const hue =this.getRandom(360);
    const saturation =this.getRandom(100);
    const lightness = this.getRandom(100);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
},
    randomRgb:function randomRgb()
{
    const red = this.getRandom(255);
    const green = this.getRandom(255);
    const blue = this.getRandom(255);
    return `rgb(${red}, ${green}, ${blue})`;
}
}

function getChoice(element)
{
    for(let i = 0; i < element.length; i++)
    {
        if(element[i].checked)
        {
            return element[i].id;
        }
    }
    return 'hex';
}

function generateColors(num, func)
{
    let colorsArr = [];
    for(let i = 0; i < num; i++)
    {
        let color = func();
        colorsArr.push(color);
    }

    return colorsArr;
}

function generateCards(arr)
{
    const container = document.querySelector('.colors-container');
    container.innerHTML = '';
    function createCards(arr)
    {
        let cardsArr = []
        for(let i = 0; i < arr.length; i++)
        {
            let div = document.createElement('div');
            div.innerHTML = 
            ` <div class="color-item">
            <div class="color"></div>
            <div class="color-name">
                <p>${arr[i]}</p>
            </div>
        </div>`;
         div.querySelector('.color').style.backgroundColor = arr[i];      
         cardsArr.push(div);  
        }
        return cardsArr
    }
    const cards = createCards(arr);
    cards.map(item => container.appendChild(item));
}

function getRandomColor()
{
    const cr = new ColorsRandom();
    const choice = getChoice(document.querySelectorAll('.types input'));
    
    const objFunc = {'hsl': cr.randomHsl, 'hex':cr.randomHex, 'rgb': cr.randomRgb};
    const selectFunc = objFunc[choice];
    const howManyColors = (document.querySelector("#color-quantity").value) || 5;
    const colorsArr = generateColors(parseInt(howManyColors), selectFunc);
    generateCards(colorsArr);
}

const button = document.querySelector('#generate-btn');
button.addEventListener('click', getRandomColor);

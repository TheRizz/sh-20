//esversion: 6

// old options
const options = [
    "one", "two", "three", "sus", "woah", "nice shot", "jump", "roast a weenie", "hot diggity",
    "buttered toast", "pogo to the pizza hut", "play a video game with your toes", "learn a parlor trick",
    "bake a cake", "what a save", "no problem", "great clear", "watch an anime", "make a banana split",
    "start a youtube", "learn to knit", "challenge another to an arm wrestling match", "pet a dog",
    "pet a cat", "smile at a passerby", "learn a new language", "eat some ramen",
    "order takeout and support a local business", "buy a new pair of shoes", "paint a portrait of a vase",
    "watch some twitch", "call an old friend", "bust a big ol nut", "find a cat"
];
Object.freeze(options);

const optionslong = [
    "loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooong",
    "loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong long long loooooooooooooooooooooooooooooooooooooooong",
    "loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong words loooooooooooooooooooooooooooooooooooooooong",
    "loooooooooooooooooooooooooooooooooooooooong words loooooooooooooooooooooooooooooooooooooooong",
    "loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooong loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong",
    "loooooooooooooooooooooooooooooooooooooooong words words loooooooooooooooooooooooooooooooooooooooong",
    "loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong,",
    "looooooooooooooooooooooooooooooooooooooooooooooooooooooooooong,",
    "loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong,",
    "loooooooooooooooooooooooooooooooooooooooong,",
    "loooooooooooooooooooooooooooooooooooooooong,",
    "loooooooooooooooooooooooooooooooooooooooong,"
]

// Fun little life options
const life = [
    "fly a kite", "go for a run", "go for a walk", "Roast a weenie", "go shopping", "order takeout",
    "watch an anime", "challenge another to an arm wrestling match", "pet a dog", "pet a cat", 
    "watch cat videos", "read a few pages of a book", "clean up your room", "make your bed",
    "doodle", "set up a boardgame night", "practice an instrument", "breathe some fresh air", 
    "dive down a youtube rabbit hole", "explore your town on google maps, street view", "do a barrell roll",
    "re-visit an old video game", "call a friend", "text a friend", "check your email", "organize ",
    "write a short story"
];
Object.freeze(life);

// Learn a skill
const learn = [
    "learn a parlor trick", "learn 20 words in a new language", "learn to knit",
    "learn how to spin your pen", "learn how to tie a necktie (properly)",
    "learn how to play a short song on an insturment", "learn how to whistle", "learn a magic trick",
    "learn how to softboil an egg", "learn some keyboard shortcuts", "learn how to surf", 
    "learn how to skateboard", "memorize a poem", "memorize a song", "learn how to change your oil",
    "learn how to change your oil"

];
Object.freeze(learn);


// covid
const covid = [
    "call an old friend" , "order takeout and support a local business", 
];
Object.freeze(covid);

// Exercise
// "Do "
const exercise1 = [
    "one ","two ","three ","four ","five ","six ", "seven ", "eight ", "nine ", "ten "
]

const exercise2 = [
    "push-ups ", "sit ups ", "jumping jacks "
]

// Doodle
const doodle1 = [
    "Draw a picture using only"
]

const doodle2 = ["nonagons","octagons","heptagons","hexagons","triangles","scalene triangles",
               "right triangles","parallelograms","rhombus","squares","pentagons","circles",
               "ovals","hearts","crosses","arrows","cubes(3d)","cylinders","stars","crescents",
               "humanoid figures", "your best idea of what egyptian hieroglyphics look like",
               "numerical characters", "alphabetical characters"
]
// "and" then call doodle2 a second time

const doodle3 = [
    "with the following colors",
]

const doodle4 = [
    "red", "orange", "yellow", "green", "blue", "purple"
]

const timer = [
    "You have one minute." , "You have two minutes.", "You have three minutes.", "You have four minutes.", 
    "You have five minutes.", "You have six minutes.", "You have seven minutes.", "You have eight minutes.",
    "You have nine minutes.",  "You have ten minutes."
]

//2 factor randomization
var first_cv = [""]

const second_lf = {
    "fly a kite": ["until...", "and..."],
    "challenge another to an arm wrestling match": ["but with your non-dominant hand.", "but only use two fingers"],
    "pet a dog": [],
}

var first_pick = life[0];
var second_pick = second_lf[first_pick][Math.floor(Math.random()*2)];
console.log(first_pick, second_pick);




//{1, 1, 2, 2, 3, 3}
class RandomBag {
    constructor(min = 0, max, repeat=1) {
        this.min = min;
        this.max = max;
        this.n = max - min + 1; // number of distinct items
        this.repeat = repeat;
        this.bag = [];

        this.refillBag();
    }

    refillBag() {
        this.bag = [];
        // Fill bag w/ two of each number
        for (let i = 0; i < this.n; ++i) {
            for (let j = 0; j < this.repeat; ++j) {
                this.bag.push(this.min + i);
            }
        }
    }
    
    refillLeftovers(arr) {
        for (let num of arr)
            this.bag.push(num);
    }

    // draw() {
    //     if (this.bag.length === 0)
    //         this.refillBag();
    //     const index = Math.random() * this.bag.length;
    //     return this.bag.splice(index, 1)[0];
    // }

    draw(n) {
        let index;
        let elements = [];

        for(let i = 0; i < n; i++){
            if (this.bag.length === 0)
                this.refillBag();
            index = Math.random() * this.bag.length;
            elements.push(this.bag.splice(index, 1)[0]);
        }
        //console.log(elements);
        return elements;
    }

    size(){
        return this.bag.length;
    }
}

// // Testing the old bag
// var test_bag = new RandomBag(0, 1, 3);
// for (let i = 0; i < 20; ++i)
//     console.log(test_bag.draw());


var randNum = Math.floor((Math.random() * optionslong.length));

var bag = new RandomBag(0, colorOptions.length - 1);
var ten_choices = [];

function addRandomizer() {
    var rand = document.getElementById("random");
    if(rand != null){
    
        rand.addEventListener("click", function (event) {
        event.preventDefault();

        //document.getElementById("option").innerText = options[bag.draw()];
        
        var times = Math.random()%10 + 40;
        //var inc = Math.random()%10;
        var speed = 10;
        
        var cells = document.getElementsByClassName('carousel__cell');
        console.log(cells);
        var itemsnum = bag.draw(cells.length);
        //options[bag.drawTen()]

        //ADDITONAL TEMP CODE TO START TRIPLE SPINNERS
        var cellbatchs = document.getElementsByClassName('carousel');

        for(let cellbatch = 0; cellbatch < cellbatchs.length; cellbatch++)
        {
            var cells = cellbatchs[cellbatch].getElementsByClassName('carousel__cell');
            for(let cell = 0; cell < cells.length; cell++){
                const c = Math.floor(Math.random() * colorOptions.length); //[0, 1) * 4   [0, 3.99999]  [0, 3]
                cells[cell].style.backgroundColor = colorOptions[c][1];
                cells[cell].innerText = colorOptions[c][0];
                console.log(cell);
            }
        }

        //===========================================

        //for(let cell = 0; cell < cells.length; cell++){
        //    const c = Math.floor(Math.random() * colorOptions.length); //[0, 1) * 4   [0, 3.99999]  [0, 3]
        //    cells[cell].style.backgroundColor = colorOptions[c][1];
        //    cells[cell].innerText = colorOptions[c][0];
        //    console.log(cell);
        //}

        for(i = 0; i< times; i++)
        {
            speed-=0.15;
            selectedIndex--;
            rotateCarousel(speed);
        }

        var currIndex = Math.floor(Math.abs(selectedIndex))%9;
        //document.getElementsByClassName('carousel__cell').forEach( (elem) => {
        //    elem.className += " " + 'carousel__cel_stop_top';
        //});


        cells[(currIndex + 1) % cells.length].style.textShadow = '0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135';
        cells[currIndex].style.textShadow = '2px 2px 2px black';
        cells[(currIndex + cells.length - 1) % cells.length].style.textShadow = '0px 1px 0px #999, 0px -2px 0px #888, 0px -3px 0px #777, 0px -4px 0px #666, 0px -5px 0px #555, 0px -6px 0px #444, 0px -7px 0px #333, 0px -8px 7px #001135';

        document.getElementById("option").innerText = cells[currIndex].innerText;

        //document.getElementById('audio').setAttribute('src', 'audio/SW.mp3');
        //document.getElementById('audio').play();
        })
    }
    // "Fun with Math" =====================================================================================
    var randmath = document.getElementById('randommath');
    if(randmath != null){
        randmath.addEventListener("click", function(event){
            event.preventDefault();
            var operatorvals = ['+', '-',];

            var times = Math.random()%10 + 40;
            var speed = 10;

            console.log("step1");
            var cellbatchs = document.getElementsByClassName('carousel');

            for(let cellbatch = 0; cellbatch < cellbatchs.length; cellbatch++)
            {
                console.log("step2");
                var cells = cellbatchs[cellbatch].getElementsByClassName('carousel__cell');
                var nums = [0,0];
                var operatorv = '+';
                for(let cell = 0; cell < cells.length; cell++){
                    const c = Math.floor(Math.random() * colorOptions.length); //[0, 1) * 4   [0, 3.99999]  [0, 3]
                    cells[cell].style.backgroundColor = colorOptions[c][1];
                    console.log("step3");
                    if(cellbatch == 1){
                        const o = Math.floor(Math.random() * operatorvals.length);
                        cells[cell].innerText = operatorvals[o];
                        //operatorv = operatorvals[o];
                    }
                    else{
                        const o = Math.floor(Math.random() * 51);
                        cells[cell].innerText = o;
                        //if(cellbatch == 0)
                        //    nums[0] = o;
                        //else
                    }
                }
            }

            for(i = 0; i< times; i++)
            {
                speed-=0.15;
                selectedIndex--;
                rotateCarousel(speed);
            }

            var currIndex = Math.floor(Math.abs(selectedIndex))%9;
            //document.getElementsByClassName('carousel__cell').forEach( (elem) => {
            //    elem.className += " " + 'carousel__cel_stop_top';
            //});


            cells[(currIndex + 1) % cells.length].style.textShadow = '0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135';
            cells[currIndex].style.textShadow = '2px 2px 2px black';
            cells[(currIndex + cells.length - 1) % cells.length].style.textShadow = '0px 1px 0px #999, 0px -2px 0px #888, 0px -3px 0px #777, 0px -4px 0px #666, 0px -5px 0px #555, 0px -6px 0px #444, 0px -7px 0px #333, 0px -8px 7px #001135';

            document.getElementById("option").innerText = cells[currIndex].innerText;
        })
    }
}
// "End of Fun with Math" ==============================================================================
addRandomizer();

//stuff to do during quarantine

const options = [
    "one", "two", "three", "sus", "woah", "nice shot", "jump", "roast a weenie", "hot diggity",
    "buttered toast", "pogo to the pizza hut", "play a video game with your toes", "learn a parlor trick",
    "bake a cake", "what a save", "no problem", "great clear", "watch an anime", "make a banana split",
    "start a youtube", "learn to knit", "challenge another to an arm wrestling match", "pet a dog",
    "pet a cat", "smile at a passerby", "learn a new language", "eat some ramen",
    "order takeout and support a local business", "buy a new pair of shoes", "paint a portrait of a vase",
    "watch some twitch", "call an old friend", "bust a big ol nut", "find a cat"
];
var first_cv = [""]

// Fun little life options
var life = ["fly a kite", "go for a run", "go for a walk", "Roast a weenie", "go shopping", "order takeout",
            "learn a parlor trick", "watch an anime", "challenge another to an arm wrestling match", "pet a dog", 
            "pet a cat", "watch cat videos", 
];

// Learn a skill
var learn = [
    "learn a parlor trick", "learn 20 words in a new language", "learn to knit",
    "learn how to spin your pen", "learn how to tie a necktie (properly)",
    "learn to play a short song on an insturment", "learn how to whistle", "learn a magic trick",
    "learn how to softboil an egg", ""

]


const second_lf = {
    "Fly a kite": ["until...", "and..."],
    "challenge another to an arm wrestling match": ["but with your non-dominant hand.", "but only use two fingers"],
    "pet a dog": [],
}

var first_pick = life[0];
var second_pick = second_lf[first_pick][Math.floor(Math.random()*2)];
console.log(first_pick, second_pick);


Object.freeze(options);


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

    draw() {
        if (this.bag.length === 0)
            this.refillBag();
        const index = Math.random() * this.bag.length;
        return this.bag.splice(index, 1)[0];
    }
}

// // Testing the old bag
// var test_bag = new RandomBag(0, 1, 3);
// for (let i = 0; i < 20; ++i)
//     console.log(test_bag.draw());


var randNum = Math.floor((Math.random() * options.length));

var bag = new RandomBag(0, options.length - 1);

function addRandomizer() {
    var rand = document.getElementById("random");
    rand.addEventListener("click", function (event) {
        event.preventDefault();

        document.getElementById("option").innerText = options[bag.draw()];
        
        document.getElementById('audio').setAttribute('src', 'audio/SW.mp3');
        document.getElementById('audio').play();
    })
}

addRandomizer();
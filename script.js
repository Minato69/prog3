var side = 25;
var xotArr = []; //խոտերի զանգված
var eatArr = []; //խոտակերների զանգված
var predatorArr = []
var necromancerArr = []
var zombieArr = []

function genetareMatrix(lengthY, lengthX, number) {

    let matrix = [];

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    for (let y = 0; y < lengthY; y++) {
        matrix.push([]);
        for (let x = 0; x < lengthX; x++) {
            let randomCount = getRandomInt(number);
            matrix[y].push(randomCount);
        }
    }
    return matrix;

}

let matrix = genetareMatrix(30, 30, 6);



function setup() {
    noStroke();
    frameRate(3);
    createCanvas(matrix[0].length * side, matrix.length * side); //կտավի չափերը դնել մատրիցայի չափերին համապատասխան
    background('#acacac');

    //Կրկնակի ցիկլը լցնում է օբյեկտներով խոտերի և խոտակերների զանգվածները
    //հիմնվելով մատրիցի վրա 
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                xotArr.push(grass);
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                var necromancer = new Necromanser (x, y);
                necromancerArr.push(necromancer);
            } 
            else if (matrix[y][x] == 5) {
                var zombie1 = new zombie (x, y);
               zombieArr.push(zombie1);
            }   
        }
    }
}

//draw ֆունկցիան գծում է «կադրերը», վարկյանում 60 կադր արագությամբ
//եթե տրված չէ այլ կարգավորում frameRate ֆունկցիայի միջոցով
//draw ֆունկցիան ինչ որ իմաստով անվերջ կրկնություն է (цикл, loop)
function draw() {
    //Գծում է աշխարհը, հիմվելով matrix-ի վրա
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 2) {
                fill("orange");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 3) {
                fill("red");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 4) {
                fill("black");
                rect(j * side, i * side, side, side);
            }  
            else if (matrix[i][j] == 5) {
                fill("blue");
                rect(j * side, i * side, side, side);
            }  
        }
    }


    //յուրաքանչյուր խոտ փորձում է բազմանալ
    for (var i in xotArr) {
        xotArr[i].mul();
    }

    //յուրաքանչյուր խոտակեր փորձում է ուտել խոտ
    for (var i in eatArr) {
        eatArr[i].eat();
    }

    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in necromancerArr) {
        necromancerArr[i].eat();
    }        
}
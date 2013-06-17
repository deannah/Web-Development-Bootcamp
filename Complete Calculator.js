// Day 5, trying to make a calculator from previous work
var calculatorModule = (function () {
    var exports = {};

    // todos: are the class=# necessary on the row divs created in setup_calculator()? ->probably not?
    // you need a button to switch back from the grapher.
    // also, I'm commenting toggle right now so that you can edit them both together.
    // support for parentheses. Also trig functions and shit. basically, basic calc --> scientific calc.
    // from simple calc: taking the answer and doing functional things when user presses additional buttons.
    // negate button functionality: this may require reworking most of the 


function calculate(text){
    var pattern = /\d*\.?\d+|\+|\u2212|\u00D7|\u00F7|\(|\)|\w*\(/g;
    var tokens = text.match(pattern);
    try{
        var val = evaluate(tokens);
        if(tokens.length > 0) throw "ill-formed expression";
        return String(val);
    }
    catch(err){
        return err;
    }
}

function read_operand(array) {
    // Interprets the first token of the array as a number or parentheses
    // Also deals with negative numbers
    try {
        var num = 1;
        if (array[0] == "(") {
            array.shift();
            num = evaluate(array);
            if (array[0] == ")") array.shift();
            else throw new Error("Missing Parenthesis");
        }
        else {
            if (array[0] == "-") num = -1;
            num *= parseInt(array[0], 10);
            if (isNaN(num)) throw new Error ("number expected");
            array.shift();
        }
        return num;
    }
    catch (err) {
        return err.message;
    }
}

function evaluate(array) {
    // attempts to solve entered problem
    try {
        if (array.length === 0) throw new Error("missing operand");
        var value = read_operand(array);
        while (array.length !== 0) {
            var operator = array[0];
            array.shift();
            if (array.length === 0) throw new Error ("missing operand");
            var temp = read_operand(array);
            if (operator == "+") value += temp;
            else if (operator == "\u2212") value -= temp;
            else if (operator == "\u00D7") value *= temp;
            else if (operator == "\u00F7") value /= temp;
            else throw new Error ("unrecognized operator");
            if (array[0] == ")") return value;
        }
        return value;
    }
    catch (err) {
        return err.message;
    }
}

    // var toggle = function () {
    //     var grapher = $(".grapher");
    //     if (grapher.css("left") === "8px") {
    //         grapher.animate({"left" : "-415px"}, 100);
    //     }
    //     else {
    //         grapher.animate({"left" : "8px"}, 100);
    //     }
    // };

    function setup_grapher() {
        var div = $(".calculator");
        var graphDiv = $("<div class='grapher background'></div>");
        
        var canvasDiv = $("<div class='canvas'></div>");
        var canvas = $("<canvas class='screen'></canvas>");
        canvasDiv.append(canvas);
        
        var functionDiv = $("<div class='function'></div>");
        var functionText = $("<text>f(x): </text>");
        var functionInput = $("<input type:'text' class:'functionInput'></input>");
        var plotButton = $("<button class:'plotButton tallButton'>Plot</button>");
        functionDiv.append(functionText, functionInput, plotButton);
        
        var xDiv = $("<div class='x'></div>");
        var minxText = $("<text>min x: </text>");
        var minxInput = $("<input type:'text' class:'minx'></input>");
        var maxxText = $("<text>max x: </text>");
        var maxxInput = $("<input type:'text' class:'maxx'></input>");
        xDiv.append(minxText, minxInput, maxxText, maxxInput);
        
        
        graphDiv.append(canvasDiv, functionDiv, xDiv);
        div.append(graphDiv);
    }

    function setup_calculator(div) { //for the simple, apple calculator
        
        var simpleCalc = $("<div class='simple background'></div>");
        
        var screenDiv = $("<div class='screen'></div>");
        var expressionDiv = $("<div class='expression'></div>");
        var answerDiv = $("<div class='answer'></div>");
        screenDiv.append(expressionDiv, answerDiv);
        
        // Do I want a row0 here, with the M buttons? Probably not. But perhaps something else.
        
        var row0 = $("<div class='row' class='1'></div>");
        var graphButton = $("<button class='graphButton'>Graphing Calculator</button>");
        row0.append(graphButton);
        
        var row1 = $("<div class='row' class='1'></div>");
        var clearButton =$("<button class='clearButton'>C</button>");
        var negateButton = $("<button class='negateButton'>&#177;</button>");
        var divideButton = $("<button class='operationButton'>&divide;</button>");
        var timesButton = $("<button class='operationButton'>&times;</button>");
        row1.append(clearButton, negateButton, divideButton, timesButton);
        
        var row2 = $("<div class='row' class='2'></div>");
        var sevenButton = $("<button class='numberButton'>7</button>");
        var eightButton = $("<button class='numberButton'>8</button>");
        var nineButton = $("<button class='numberButton'>9</button>");
        var minusButton = $("<button class='operationButton'>&minus;</button>");
        row2.append(sevenButton, eightButton, nineButton, minusButton);
        
        var row3 = $("<div class='row' class='3'></div>");
        var fourButton = $("<button class='numberButton'>4</button>");
        var fiveButton = $("<button class='numberButton'>5</button>");
        var sixButton = $("<button class='numberButton'>6</button>");
        var plusButton = $("<button class='operationButton'>+</button>");
        row3.append(fourButton, fiveButton, sixButton, plusButton);
        
        var row4 = $("<div class='row' class='4'></div>");
        var oneButton = $("<button class='numberButton'>1</button>");
        var twoButton = $("<button class='numberButton'>2</button>");
        var threeButton = $("<button class='numberButton'>3</button>");
        var equalsButton = $("<button class='tallButton'>=</button>");
        row4.append(oneButton, twoButton, threeButton, equalsButton);
        
        var row5 = $("<div class='row' class='5'></div>");
        var zeroButton = $("<button class='wideButton numberButton'>0</button>");
        var periodButton = $("<button class='numberButton'>.</button>");
        row5.append(zeroButton, periodButton);
        
        $(simpleCalc).append(screenDiv, row0, row1, row2, row3, row4, row5);
        $(div).append(simpleCalc);
        
        graphButton.on("click", function() {
            setup_grapher();
            //toggle();
        });
        
        $('.numberButton').on("click", function() {
            var prevAnswer = $(".answer");
            var expression= $(".expression");
            if (prevAnswer.text() !== "") {
                prevAnswer.text("");
                expression.text("");
            }
            var expText = expression.text();
            var input = $(this).text();
            expression.text(expText + input);
        });
        
        $('.operationButton').on("click", function() {
            var answer = $(".answer");
            var prevAnswer = answer.text();
            var expression= $(".expression");
            if (prevAnswer !== "") {
                expression.text(prevAnswer);
                answer.text("");
            }
            var input = $(this).text();
            var expText = expression.text();
            expression.text(expText + input);
        });
        
        clearButton.on("click", function() {
            var expression= $(".expression");
            expression.text("");
            $(".answer").text("");
        });
        
        $('.tallButton').on("click", function() {
            var expression= $(".expression");
            var expText = expression.text();
            var answer = calculate(expText);
            var ansDiv = $(".answer");
            ansDiv.text(answer);
        });
        
        // $('.negateButton').on("click", function () {
        //     var expression= $(".expression");
        //     var expText = expression.text();
        //     expression.text(expText + "\u00D7" + "-1");
        //     var answer = calculate(expression.text());
        //     expression.text(answer);
        // });
        
        // var buttons = [clearButton, negateButton, divideButton, timesButton, sevenButton, eightButton, nineButton, minusButton, fourButton, fiveButton, sixButton, plusButton, oneButton, twoButton, threeButton, equalsButton, zeroButton, periodButton];
        
        // function pushButton(but) {
            
        // }
        
        // for(var i=0; i<buttons.length; i++) {
        //     var thisbutton = buttons[i];
        //     thisbutton.on("click", pushButton(thisbutton));
        //     }
        }
    

    $(document).ready(function () {
        $(".calculator").each(function() {
            setup_calculator(this); //will probably later add a setup_initial to display just a button they can click on to open up a calculator.
        });
    });
    

    //exports.foo = foo; will allow foo to be accessed outside of the module.
    return exports
}());
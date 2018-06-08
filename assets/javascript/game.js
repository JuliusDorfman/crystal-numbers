$(document).ready(function() {
    //variable below randomly generates number between 3 and 6. This will ultimately decide how many crystal buttons will populate the page.

    init();

    function init() {
        // Initialize our global variables that will be accessed later
        let difficultyLevel = 0;
        let goalNum = 0;
        let crystalValues = [];
        let gameCrystals = [];
        let lossCounter = 0;
        let winCounter = 0;

        const crystalImages = {
            img: ['./assets/images/red.jpg',
                './assets/images/green.jpg',
                './assets/images/grey.jpg',
                './assets/images/fuzzy.jpg',
                './assets/images/clear.jpg',
                './assets/images/blue.jpg',
            ]
        };
        // Crystal Constructor/Function
        function gameCrystal(gameCrystalValue, gameCrystalImage) {
            this.gameCrystalValue = gameCrystalValue;
            this.gameCrystalImage = gameCrystalImage;
        }
        // Random number function that will be called in other functions
        function getRandomNumber(min, max) {
            return (Math.floor(Math.random() * (max - min + 1)) + min);
        };

        // Generate Random Number of Crystals MIN: 3 MAX: 6
        generateNumberOfCrystals = function() {
            difficultyLevel = 0;
            difficultyLevel = getRandomNumber(3, 6);
            this.difficultyLevel = difficultyLevel;
        };

        // Generate Goal Number
        generateGoalNum = function() {
            goalNum = getRandomNumber(75, 100);
            this.goalNum = goalNum;
            $('.goal-number').text(goalNum);
            $('.added-value').text(0);
        };

        // Generate a series of random numbers up to the number of crystals that were generated.
        generateCrystalValues = function() {
            this.crystalValues = []
            for (let i = 0; i < this.difficultyLevel; i++) {
                let aCrystalValue = getRandomNumber(3, 13)
                crystalValues.push(aCrystalValue);
            }
        };

        // function that will put our previously generated data together
        generateGameCrystals = function() {
            this.gameCrystals = [];
            for (let j = 0; j < this.difficultyLevel; j++) {
                let newCrystal = new gameCrystal(crystalValues[j], crystalImages.img[j]);
                gameCrystals.push(newCrystal);
            };
        }

        // Render our Crystals to the DOM
        renderCrystals = function() {
            $('#crystals').empty()
            for (let k = 0; k < this.difficultyLevel; k++) {
                let crystalURL = "'" + gameCrystals[k].gameCrystalImage + "'";
                let tempCrystalVal = "'" + gameCrystals[k].gameCrystalValue + "'";
                let renderedCrystal = '<image src=' + crystalURL + 'val=' + tempCrystalVal + 'alt="crystal' + k + '" />';
                let crystalWrapper = '<div className="on-crystal-click"></div>';
                $(crystalWrapper).append(renderedCrystal).appendTo('#crystals')
            }
        }

        nextRound = function() {
            difficultyLevel = 0;
            goalNum = 0;
            crystalValues = [];
            gameCrystals = [];
            generateNumberOfCrystals()
            generateGoalNum();
            generateCrystalValues();
            generateGameCrystals();
            renderCrystals();
        }

        generatePlayScript = function() {
            let addedNumber = 0;
            console.log("generatePlay this.goalNum", goalNum)
            $('.crystals-parent').on('click', 'img', function() {
                let clickedVal = parseInt($(this).attr('val'))
                addedNumber += clickedVal
                $('.added-value').text(addedNumber);
                console.log("clicked", clickedVal)
                console.log("added", addedNumber)
                console.log("this.goal", goalNum)
                if (addedNumber === goalNum) {
                    alert("You Win")
                    addedNumber = 0;
                    $('.added-value').text(addedNumber);
                    winLoss("win")
                    nextRound();
                }
                if (addedNumber > goalNum) {
                    alert("You Lose with a Goal Haul of " + addedNumber)
                    addedNumber = 0;
                    $('.added-value').text(addedNumber);
                    winLoss("loss")
                    nextRound();
                }
            });
        };

        winLoss = function(condition) {
            if (condition === "win") {
                winCounter = winCounter + 1;
                $('.win-counter').text(winCounter)
                console.log("winCounter", winCounter)
            }
            if (condition === "loss") {
                lossCounter = lossCounter + 1;
                $('.loss-counter').text(lossCounter)
                console.log("lossCounter", lossCounter)
            }
        };

        generateNumberOfCrystals()
        generateGoalNum();
        generateCrystalValues();
        generateGameCrystals();
        renderCrystals();
        generatePlayScript();
    };
});
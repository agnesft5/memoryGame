document.addEventListener('DOMContentLoaded', () => {

    let cardArray = [
        {
            name: "pink-fly",
            img: "assets/pink-fly.png",
            pos: "first"
        },
        {
            name: "pink-fly",
            img: "assets/pink-fly.png",
            pos: "second"
        },
        {
            name: "blue-tentacles",
            img: "assets/blue-tentacles.png",
            pos: "first"
        },
        {
            name: "blue-tentacles",
            img: "assets/blue-tentacles.png",
            pos: "second"
        },
        {
            name: "fredddy-mercury",
            img: "assets/fredddy-mercury.png",
            pos: "first"
        },
        {
            name: "fredddy-mercury",
            img: "assets/fredddy-mercury.png",
            pos: "second"
        },
        {
            name: "green-angry-monster",
            img: "assets/green-angry-monster.png",
            pos: "first"
        },
        {
            name: "green-angry-monster",
            img: "assets/green-angry-monster.png",
            pos: "second"
        },
        {
            name: "green-elvis",
            img: "assets/green-elvis.png",
            pos: "first"
        },
        {
            name: "green-elvis",
            img: "assets/green-elvis.png",
            pos: "second"
        },
        {
            name: "pink-happy-monster",
            img: "assets/pink-happy-monster.png",
            pos: "first"
        },
        {
            name: "pink-happy-monster",
            img: "assets/pink-happy-monster.png",
            pos: "second"
        },
        {
            name: "sully",
            img: "assets/sully.png",
            pos: "first"
        },
        {
            name: "sully",
            img: "assets/sully.png",
            pos: "second"
        },
        {
            name: "two-headed-monster",
            img: "assets/two-headed-monster.png",
            pos: "first"
        },
        {
            name: "two-headed-monster",
            img: "assets/two-headed-monster.png",
            pos: "second"
        },
    ]

    const cardsContainer = document.querySelector('#col__container');
    const result = document.querySelector('#result');
    const message = document.querySelector('.message');

    let printCard = []
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];


  
    //create board
    function createBoard() {
        localStorage.setItem('cardArray', JSON.stringify(cardArray));
        printCard = localStorage.getItem('cardArray');
        printCard = JSON.parse(printCard)
        printCard.sort(() => 0.5 - Math.random());
        for (let i = 0; i < printCard.length; i++) {
            var cardCol = document.createElement('div');
            cardCol.classList.add('col-3', 'p-0', 'm-0', 'card__display');
            cardCol.setAttribute('id', 'cardCol')
            var card = document.createElement('img');
            card.setAttribute('src', 'assets/pizza600.png');
            card.setAttribute('data-id', i)
            card.classList.add('card__width', 'card__behaviour')
            card.addEventListener('click', flipCard)
            cardCol.appendChild(card);
            cardsContainer.appendChild(cardCol)
        }
    }

    //reload
    function reload() {
        const wraper = document.querySelector('#col__container');
        wraper.innerHTML = "";
        result.textContent = "";
        message.textContent = "";
        alreadyClicked = "false";
        included = "false"
        cardsWon = [];
        printCard = undefined
        cardsChosen = [];
        cardsChosenId = [];
        
        createBoard();
    }

    //check for match
    function checkForMatch() {
        let cards = document.querySelectorAll('img');
        let optionOneId = cardsChosenId[0];
        let optionTwoId = cardsChosenId[1];

        let nameChosen = cardsChosen[0]['name'];
        let included;
        let alreadyClicked;

        if (cardsWon.length > 0) {
            console.log('cardWon exists')
            for (let cardWon of cardsWon) {
                console.log(cardWon)
                console.log(nameChosen)
                if (cardWon.includes(nameChosen)) {
                    included = true;
                } else {
                    included = false;
                }
            }
        } else {
            console.log('cardWon does not exists')
            included = false;
        }

        console.log(cardsChosen[0]['name'], '1')
        console.log(cardsChosen[1]['name'], '2')

        //No coincideixen
        if (cardsChosen[0]['name'] != cardsChosen[1]['name'] && included == false) {
            console.log('primer')
            cards[optionOneId].setAttribute('src', 'assets/pizza600.png');
            cards[optionTwoId].setAttribute('src', 'assets/pizza600.png');
            message.textContent = "Try again!"
            setTimeout(() => {
                message.textContent = ""
            }, 500)
            // No coincideixen però ja han estat clickades i han entrat al won
            for (let i = 0; i < cardsChosen[0]['name'].length; i++) {
                let index = cardsChosen[0]['name'].length - 1
                if (cardsChosen[0]['name'][index] > 0) {
                    alreadyClicked = true
                    cards[optionOneId].setAttribute('src', 'assets/blank.png');
                    cards[optionTwoId].setAttribute('src', 'assets/blank.png');
                    message.textContent = "Already found!"
                    setTimeout(() => {
                        message.textContent = ""
                    }, 500)
                }
            }
            //No coincideixen, no estan dins de cards won i no han estat clickades abans
        } else if (cardsChosen[0]['name'] != cardsChosen[1]['name'] && included == true && alreadyClicked == false) {
            console.log('segon')
            cards[optionOneId].setAttribute('src', 'assets/pizza600.png');
            cards[optionTwoId].setAttribute('src', 'assets/pizza600.png');
            message.textContent = "Try again"
            setTimeout(() => {
                message.textContent = ""
            }, 500)
            //Coincideixen, no son la mateixa carta i no estan al cards won
        } else if (cardsChosen[0]['name'] === cardsChosen[1]['name'] && cardsChosen[0]['pos'] != cardsChosen[1]['pos'] && included == false) {
            console.log('tercer')
            cards[optionOneId].setAttribute('src', 'assets/blank.png');
            cards[optionTwoId].setAttribute('src', 'assets/blank.png');
            cardsWon.push(cardsChosen);
            message.textContent = "You've found a pair!"
            if (cardsWon.includes(cardsChosen)) {
                //Un cop dins de carts won li canviem la imatge per blank
                for (let won of cardsWon) {
                    let name = won[0]['name']
                    for (let i = 0; i < printCard.length; i++) {
                        let card = printCard[i]
                        if (card['name'] == name) {
                            printCard[i]['img'] = 'assets/blank.png';
                            printCard[i]['name'] = `${printCard[i]['name']}${i + 1}`
                        }
                    }
                }
            }
            setTimeout(() => {
                message.textContent = ""
            }, 500)
            //Són la mateixa carta que a més ja ha estat clickada i està dins del won
        } else if (cardsChosen[0]['name'] === cardsChosen[1]['name'] && cardsChosen[0]['pos'] === cardsChosen[1]['pos'] && included == false && alreadyClicked == true) {
            console.log('quart')
            cards[optionOneId].setAttribute('src', 'assets/blank.png');
            cards[optionTwoId].setAttribute('src', 'assets/blank.png');
            message.textContent = "Already found"
            setTimeout(() => {
                message.textContent = ""
            }, 500)
        } //Ja han estat trobades i estan dins del won
        else if (cardsChosen[0]['name'] != cardsChosen[1]['name'] && alreadyClicked == true) {
            console.log('cinquè')
            cards[optionOneId].setAttribute('src', 'assets/blank.png');
            cards[optionTwoId].setAttribute('src', 'assets/blank.png');
            message.textContent = "Already found"
            setTimeout(() => {
                message.textContent = ""
            }, 500)
        }
        cardsChosen = [];
        cardsChosenId = [];
        result.textContent = cardsWon.length;
        if (cardsWon.length == printCard.length / 2) {
            message.textContent = "Congratulations! You've found them all!"
            alreadyClicked = "";
            included = ""
            setTimeout(() => {
                message.textContent = "Play again"
                message.classList.add('clickable');
                message.addEventListener('click', reload)
            }, 2000)
        } else {
        }
    }

    //flip card
    function flipCard() {
        var cardId = this.getAttribute('data-id');
        cardsChosen.push({ name: printCard[cardId]['name'], pos: printCard[cardId]['pos'] });
        cardsChosenId.push(cardId);
        this.setAttribute('src', printCard[cardId]['img']);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }




    createBoard();
})


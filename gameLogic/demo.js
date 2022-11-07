class game {
    difficulty
    tableSize
    wrongSolution
    gameFinished
    bulbLocation
    blackSquareLocation
    timeCount
    constructor(difficulty, tableSize, timeCount, wrongSolution, gameFinished, bulbLocation, blackSquareLocation) {
        this.difficulty = difficulty;
        this.tableSize = tableSize;
        this.wrongSolution = (wrongSolution === undefined) ? true : wrongSolution
        this.gameFinished = (gameFinished === undefined) ? false : gameFinished
        this.timeCount = (timeCount === undefined) ? 0 : timeCount
        this.bulbLocation = (bulbLocation === undefined) ? this.createArray2(tableSize) : bulbLocation
        if (blackSquareLocation === undefined) {
            this.blackSquareLocation = this.createArray(tableSize);
            this.createSquares(this.difficulty, this.blackSquareLocation);
        }
        else {
            this.blackSquareLocation = blackSquareLocation
        }
        setInterval(autoSave, 1000);
    }

    createArray(size) {
        let x = []

        for (let i = 0; i < size; i++) {
            x[i] = new Array(size)
            for (let j = 0; j < size; j++) {
                x[i][j] = -1
            }
        }

        return x
    }
    createArray2(size) {
        let x = []

        for (let i = 0; i < size; i++) {
            x[i] = new Array(size)
            for (let j = 0; j < size; j++) {
                x[i][j] = 0
            }
        }

        return x
    }
    createSquares(type, arr) {
        if (type === 'easy') {
            arr[0][3] = 1;
            arr[1][1] = 0;
            arr[1][5] = 2;
            arr[3][0] = -2;
            arr[3][3] = -2;
            arr[3][6] = -2;
            arr[5][1] = -2;
            arr[5][5] = 2;
            arr[6][3] = 0;

        }
        else if (type === 'advanced') {
            arr[0][2] = 0;
            arr[0][4] = -2;
            arr[2][0] = -2;
            arr[2][2] = -2;
            arr[2][4] = 3;
            arr[2][6] = -2;
            arr[3][3] = 1;
            arr[4][0] = 2;
            arr[4][2] = -2;
            arr[4][4] = -2;
            arr[4][6] = -2;
            arr[6][2] = -2;
            arr[6][4] = 2;
        }
        else if (type === 'extreme') {
            arr[0][1] = -2;
            arr[1][5] = 3;
            arr[1][7] = 3;
            arr[1][9] = -2;
            arr[2][1] = 0;
            arr[2][2] = -2;
            arr[2][7] = -2;
            arr[3][4] = -2;
            arr[4][1] = 1;
            arr[4][4] = -2;
            arr[4][5] = 1;
            arr[4][6] = -2;
            arr[5][3] = -2;
            arr[5][4] = -2;
            arr[5][5] = -2;
            arr[5][8] = 3;
            arr[6][5] = -2;
            arr[7][2] = 1;
            arr[7][7] = 0;
            arr[7][8] = -2;
            arr[8][0] = 3;
            arr[8][2] = -2;
            arr[8][4] = 0;
            arr[9][8] = 0;
        }
    }
    light(i, j) {
        let tempBulbLocation = this.bulbLocation
        let tempBlackSquareLocation = this.blackSquareLocation
        foo()
        function foo(k = j + 1) {
            if (k < tempBulbLocation.length && tempBlackSquareLocation[i][k] === -1) {
                if (!(tempBulbLocation[i][k] > 0)) {
                    table.rows[i].cells[k].style.backgroundColor = 'yellow'
                }
                setTimeout(() => foo(k + 1), 150)
            }
            else
                gameWon(myGame)
        }

        foo1()
        function foo1(k = j - 1) {
            if (k >= 0 && tempBlackSquareLocation[i][k] === -1) {
                if (!(tempBulbLocation[i][k] > 0)) { table.rows[i].cells[k].style.backgroundColor = 'yellow' }
                setTimeout(() => foo1(k - 1), 150)
            }
            else
                gameWon(myGame)
        }

        foo2()
        function foo2(k = i + 1) {
            if (k < tempBlackSquareLocation.length && tempBlackSquareLocation[k][j] === -1) {
                if (!(tempBulbLocation[k][j] > 0)) { table.rows[k].cells[j].style.backgroundColor = 'yellow' }
                setTimeout(() => foo2(k + 1), 150)
            }
            else
                gameWon(myGame)
        }

        foo3()
        function foo3(k = i - 1) {
            if (k >= 0 && tempBlackSquareLocation[k][j] === -1) {
                if (!(tempBulbLocation[k][j] > 0)) { table.rows[k].cells[j].style.backgroundColor = 'yellow' }
                setTimeout(() => foo3(k - 1), 150)
            }
            else
                gameWon(myGame)
        }
        gameWon(myGame)

        this.bulbLocation[i][j] = 1
    }
    unLight(i, j) {
        let k = j + 1
        while (k < this.blackSquareLocation.length && this.blackSquareLocation[i][k] === -1) {
            if (!(this.bulbLocation[i][k] > 0))
                table.rows[i].cells[k].style.backgroundColor = 'rgb(207, 207, 207)'
            k++
        }
        k = j - 1
        while (k >= 0 && this.blackSquareLocation[i][k] === -1) {
            if (!(this.bulbLocation[i][k] > 0))
                table.rows[i].cells[k].style.backgroundColor = 'rgb(207, 207, 207)'
            k--
        }

        k = i + 1
        while (k < this.blackSquareLocation.length && this.blackSquareLocation[k][j] === -1) {
            if (!(this.bulbLocation[k][j] > 0))
                table.rows[k].cells[j].style.backgroundColor = 'rgb(207, 207, 207)'
            k++
        }
        k = i - 1
        while (k >= 0 && this.blackSquareLocation[k][j] === -1) {
            if (!(this.bulbLocation[k][j] > 0))
                table.rows[k].cells[j].style.backgroundColor = 'rgb(207, 207, 207)'
            k--
        }
        this.bulbLocation[i][j] = 0
        table.rows[i].cells[j].style.backgroundColor = 'rgb(207, 207, 207)'
        for (let g = 0; g < this.bulbLocation.length; g++) {
            for (let gg = 0; gg < this.bulbLocation[0].length; gg++) {
                if (this.bulbLocation[g][gg] === 1)
                    this.light(g, gg)
            }
        }
    }
    check(i, j) {
        let firstS = false  //up side
        let cor1 = []
        let secondS = false //left side
        let cor2 = []
        let thirdS = false //down side
        let cor3 = []
        let fourthS = false //right side
        let cor4 = []

        if (i > 0 && this.blackSquareLocation[i - 1][j] > -1) {
            firstS = true
            cor1.push(i - 1)
            cor1.push(j)
        }
        if (j > 0 && this.blackSquareLocation[i][j - 1] > -1) {
            secondS = true
            cor2.push(i)
            cor2.push(j - 1)
        }
        if (i < this.blackSquareLocation.length - 1 && this.blackSquareLocation[i + 1][j] > -1) {
            thirdS = true
            cor3.push(i + 1)
            cor3.push(j)
        }
        if (j < this.blackSquareLocation.length - 1 && this.blackSquareLocation[i][j + 1] > -1) {
            fourthS = true
            cor4.push(i)
            cor4.push(j + 1)
        }

        //first check
        if (firstS) {
            let count = 0
            let ii = cor1[0]
            let jj = cor1[1]

            if (ii > 0)
                count += this.bulbLocation[ii - 1][jj]
            if (jj > 0)
                count += this.bulbLocation[ii][jj - 1]
            if (ii < this.bulbLocation.length - 1)
                count += this.bulbLocation[ii + 1][jj]
            if (jj < this.bulbLocation.length - 1)
                count += this.bulbLocation[ii][jj + 1]

            if (count >= this.blackSquareLocation[ii][jj]) return false
        }

        //second check
        if (secondS) {
            let count = 0
            let ii = cor2[0]
            let jj = cor2[1]

            if (ii > 0)
                count += this.bulbLocation[ii - 1][jj]
            if (jj > 0)
                count += this.bulbLocation[ii][jj - 1]
            if (ii < this.bulbLocation.length - 1)
                count += this.bulbLocation[ii + 1][jj]
            if (jj < this.bulbLocation.length - 1)
                count += this.bulbLocation[ii][jj + 1]

            if (count >= this.blackSquareLocation[ii][jj]) return false
        }

        //third check
        if (thirdS) {
            let count = 0
            let ii = cor3[0]
            let jj = cor3[1]


            if (ii > 0)
                count += this.bulbLocation[ii - 1][jj]
            if (jj > 0)
                count += this.bulbLocation[ii][jj - 1]
            if (ii < this.bulbLocation.length - 1)
                count += this.bulbLocation[ii + 1][jj]
            if (jj < this.bulbLocation.length - 1)
                count += this.bulbLocation[ii][jj + 1]
            if (count >= this.blackSquareLocation[ii][jj]) return false
        }

        //fourth check
        if (fourthS) {
            let count = 0
            let ii = cor4[0]
            let jj = cor4[1]

            if (ii > 0)
                count += this.bulbLocation[ii - 1][jj]
            if (jj > 0)
                count += this.bulbLocation[ii][jj - 1]
            if (ii < this.bulbLocation.length - 1)
                count += this.bulbLocation[ii + 1][jj]
            if (jj < this.bulbLocation.length - 1)
                count += this.bulbLocation[ii][jj + 1]

            if (count >= this.blackSquareLocation[ii][jj]) return false

        }

        return true
    }
    removeRed() {
        for (let i = 0; i < this.blackSquareLocation.length; i++) {
            for (let j = 0; j < this.blackSquareLocation.length; j++) {
                if (this.bulbLocation[i][j] > 0) {
                    table.rows[i].cells[j].style.backgroundColor = 'rgb(207, 207, 207)'
                }
            }
        }
        this.wrongSolution = false
        for (let i = 0; i < this.blackSquareLocation.length; i++) {
            for (let j = 0; j < this.blackSquareLocation.length; j++) {
                if (this.bulbLocation[i][j] > 0) {
                    let k = j + 1
                    while (k < this.blackSquareLocation.length && this.blackSquareLocation[i][k] === -1) {
                        if (this.bulbLocation[i][k] > 0) {
                            table.rows[i].cells[k].style.backgroundColor = 'rgb(255, 0, 0)'
                            this.wrongSolution = true
                        }
                        k++
                    }
                    k = j - 1
                    while (k >= 0 && this.blackSquareLocation[i][k] === -1) {
                        if (this.bulbLocation[i][k] > 0) {
                            this.wrongSolution = true
                            table.rows[i].cells[k].style.backgroundColor = 'rgb(255, 0, 0)'
                        }
                        k--
                    }

                    k = i + 1
                    while (k < this.blackSquareLocation.length && this.blackSquareLocation[k][j] === -1) {
                        if (this.bulbLocation[k][j] > 0) {
                            this.wrongSolution = true
                            table.rows[k].cells[j].style.backgroundColor = 'rgb(255, 0, 0)'
                        }
                        k++
                    }
                    k = i - 1
                    while (k >= 0 && this.blackSquareLocation[k][j] === -1) {
                        if (this.bulbLocation[k][j] > 0) {
                            this.wrongSolution = true
                            table.rows[k].cells[j].style.backgroundColor = 'rgb(255, 0, 0)'
                        }
                        k--
                    }
                }
            }
        }
    }
}
const input = document.querySelector('#sizeOfMap')
const playButton = document.querySelector('#playButton')
const inputPart = document.querySelector('#inputPart')
const table = document.querySelector('#gameTable');
const winText = document.createElement('h1')
const loadButton = document.querySelector('#loadGame')

let myGame

loadButton.addEventListener('click', function () {
    let tempObj = JSON.parse(localStorage.getItem('lastGame'))
    startTimer(tempObj.timeCount)
    myGame = new game(tempObj.difficulty, tempObj.tableSize, tempObj.timeCount, tempObj.wrongSolution, tempObj.gameFinished, tempObj.bulbLocation, tempObj.blackSquareLocation)
    inputPart.style.display = 'none'
    document.querySelector('#gamePart').style.display = 'block'

    createTable(myGame)
    myGame.removeRed()
    for (let g = 0; g < myGame.bulbLocation.length; g++) {
        for (let gg = 0; gg < myGame.bulbLocation[0].length; gg++) {
            if (myGame.bulbLocation[g][gg] === 1) {
                table.rows[g].cells[gg].innerHTML = `<i class="fa fa-lightbulb-o" style="font-size: 30px; color: yellow; transition-duration:.6s;"></i>`
                myGame.light(g, gg)
            }
        }
    }
})

playButton.addEventListener('click', function () {
    let size
    username = document.querySelector('#username').value
    difficulty = input.value

    if (input.value === 'easy' || input.value === 'advanced') {
        size = 7
    }
    else if (input.value === 'extreme') {
        size = 10
    }
    else {
        alert('This feature is not released yet(')
        return
    }
    inputPart.style.display = 'none'
    document.querySelector('#gamePart').style.display = 'block'

    myGame = new game(difficulty, size, undefined, undefined, undefined, undefined, undefined);
    startTimer(0)

    createTable(myGame)
})

// bulb inserting //
table.addEventListener('click', function (e) {
    gameWon(myGame)

    if (!myGame.gameFinished && (e.target.matches('td') || e.target.matches('i'))) {

        let col
        let row
        if (e.target.matches('td')) {
            col = e.target.cellIndex
            row = e.target.parentNode.rowIndex
        }
        else {
            col = e.target.parentNode.cellIndex
            row = e.target.parentNode.parentNode.rowIndex
        }

        if (myGame.blackSquareLocation[row][col] === -1) {
            if (e.target.matches('td') && e.target.innerHTML === '') {
                if (!myGame.check(row, col)) {

                    table.rows[row].cells[col].classList.add('highlight')
                    setTimeout(() => { table.rows[row].cells[col].classList.remove('highlight') }, 500);

                    return
                }

                e.target.innerHTML = `<i class="fa fa-lightbulb-o" style="font-size: 30px; color: yellow; transition-duration:.6s;"></i>`

                myGame.light(row, col)
            }
            else if (e.target.matches('i')) {
                e.target.parentNode.innerHTML = ''
                myGame.unLight(row, col)
            }
            else {
                e.target.innerHTML = ''
                myGame.unLight(row, col)
            }
            myGame.removeRed()
        }
    }
    if (gameWon(myGame)) {
        score = totalSeconds
        winText.innerHTML = `Hey ${username} congrats, your score is ${score}s`
        winText.classList.add('winStyle')
        winText.style.display = 'block'
        document.querySelector('body').appendChild(winText)
        console.log(JSON.stringify(myGame))
        // myGame.timeCount = totalSeconds
        localStorage.setItem('lastGame', JSON.stringify(myGame))
        console.log((JSON.parse(localStorage.getItem('lastGame'))));
    }
    else {
        winText.style.display = 'none'
    }
})

function createTable(obj) {
    let tbody = document.createElement('tbody')
    let size = obj.tableSize
    for (let i = 0; i < size; i++) {
        const row = document.createElement('tr')
        for (let j = 0; j < size; j++) {
            const col = document.createElement('td')
            col.classList.add('tableDesing')

            if (obj.blackSquareLocation[i][j] !== -1) {
                if (obj.blackSquareLocation[i][j] !== -2) {
                    col.innerHTML = obj.blackSquareLocation[i][j]
                    col.style.color = 'white'
                }
                col.style.backgroundColor = 'black'
            }

            row.appendChild(col);
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
}

function gameWon(gameObj) {
    if (gameObj.wrongSolution) {
        gameObj.gameFinished = false;
        return false;
    }

    let countBulb = 0
    let countBlSquare = 0
    let litSquares = 0
    for (let i = 0; i < gameObj.blackSquareLocation.length; i++) {
        for (let j = 0; j < gameObj.blackSquareLocation.length; j++) {
            if (gameObj.bulbLocation[i][j] > 0) countBulb++;
            if (gameObj.blackSquareLocation[i][j] !== -1) countBlSquare++;
            if (table.rows[i].cells[j].style.backgroundColor === 'yellow') litSquares++
        }
    }
    gameObj.gameFinished = countBulb + litSquares === (gameObj.blackSquareLocation.length * gameObj.blackSquareLocation.length - countBlSquare)
    return gameObj.gameFinished;
}
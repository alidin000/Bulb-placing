const saveButton = document.querySelector('#save')
const exitButton = document.querySelector('#exit')
const restartButton = document.querySelector('#restart')

const scoreBoard = document.querySelector('#showTable')
const table2 = document.querySelector('#scorePart')

const savedGamePart = document.querySelector('#tableLocations')
const savedGamesButton = document.querySelector('#savedGames')
const exitButtonFromSaved = document.querySelector('#exitFromSaved')

exitButtonFromSaved.addEventListener('click',function(){
    document.querySelector('#savedGamesPart').style.display = 'none'
    inputPart.style.display = 'block'
    document.getElementById('showTable').style.display = 'inline-block'
})

savedGamesButton.addEventListener('click', function () {
    let user = document.querySelector('#username').value

    if (localStorage.getItem(user) === null) {
        alert('You do not have saved games or write your name correctly')
        return
    }

    let tempArr = JSON.parse(localStorage.getItem(user))

    inputPart.style.display = 'none'
    document.getElementById('showTable').style.display = 'none'

    document.querySelector('#savedGamesPart').style.display = 'block'

    for (let i = 0; i < tempArr.length; i++) {
        let div1 = document.createElement('div')
        let play = document.createElement('button')
        let ptag = document.createElement('p')
        ptag.innerHTML = i
        ptag.style.display = 'none'
        div1.classList.add('map')
        play.innerHTML = `Load`
        play.style = "font-size: 2em;"
        play.type = 'submit'
        play.addEventListener('click', doIt)
        createTableView(tempArr[i].blackSquareLocation, tempArr[i].bulbLocation, div1)
        div1.appendChild(play)
        div1.appendChild(ptag)
        savedGamePart.appendChild(div1)
    }

    function doIt(e) {
        let tt = parseInt(e.target.nextElementSibling.innerHTML)
        document.querySelector('#savedGamesPart').style.display = 'none'
        let user = document.querySelector('#username').value
        let tempObj = JSON.parse(localStorage.getItem(user))[tt]
        startTimer(tempObj.timeCount)
        myGame = new game(tempObj.difficulty, tempObj.tableSize, tempObj.timeCount, tempObj.wrongSolution, tempObj.gameFinished, tempObj.bulbLocation, tempObj.blackSquareLocation, tempObj.username)
        inputPart.style.display = 'none'
        document.getElementById('showTable').style.display = 'none'
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
    }

})

restartButton.addEventListener('click', function () {
    myGame = new game(myGame.difficulty, table.rows.length, undefined, undefined, undefined, undefined, undefined, myGame.username);
    clearInterval(helperFunc)
    startTimer(0)
    table.innerHTML = ''
    createTable(myGame)
    winText.innerHTML = ''
    if (confirm('Do you want to save the game?')) {
        saveButton.click()
    }
})
exitButton.addEventListener('click', function () {
    inputPart.style.display = 'block'
    document.getElementById('showTable').style.display = 'inline-block'
    document.querySelector('#gamePart').style.display = 'none'
    table.innerHTML = ''
    clearInterval(helperFunc)
    winText.innerHTML = ''
    if (confirm("Do you want to save the game?")) {
        saveButton.click()
    }
})

saveButton.addEventListener('click', function () {
    if (localStorage.getItem(myGame.username) === null)
        localStorage.setItem(myGame.username, '[]')

    let tempO = JSON.parse(localStorage.getItem(myGame.username))

    tempO.push(myGame)

    localStorage.setItem(myGame.username, JSON.stringify(tempO))
})

scoreBoard.addEventListener('click', function () {
    if (scoreBoard.innerHTML === 'Scoreboard') {
        scoreBoard.innerHTML = 'collapse'
        table2.style.display = 'flex'
        let scores = JSON.parse(localStorage.getItem('scores'))
        let size = scores.length
        const tbody = document.querySelector('tbody')
        for (let i = 0; i < size; i++) {
            const row = document.createElement('tr')
            const col = document.createElement('td')
            const div = document.createElement('div')
            div.classList.add('scoreboard-team')
            const span = document.createElement('span')
            span.classList.add('scoreboard-team-logo-text')
            span.innerHTML = scores[i].name
            col.classList.add('scoreboard-team')
            col.appendChild(div)
            col.appendChild(span)

            const col2 = document.createElement('td')
            col2.classList.add('scoreboard-score')
            col2.innerHTML = scores[i].map

            const col3 = document.createElement('td')
            col3.classList.add('scoreboard-score')
            col3.innerHTML = scores[i].score

            row.appendChild(col);
            row.appendChild(col2);
            row.appendChild(col3);

            tbody.appendChild(row);
        }

        table2.appendChild(tbody);
    }
    else {
        scoreBoard.innerHTML = 'Scoreboard'
        table2.style.display = 'none'
        const tbody = document.querySelector('tbody')
        tbody.innerHTML = ''
    }

})

function createTableView(blackSquareLocation, bulbLocation, divv) {
    let table = document.createElement('table')
    let tbody = document.createElement('tbody')
    let size = blackSquareLocation.length
    for (let i = 0; i < size; i++) {
        const row = document.createElement('tr')
        for (let j = 0; j < size; j++) {
            const col = document.createElement('td')
            col.classList.add('tableDesing')

            if (blackSquareLocation[i][j] !== -1) {
                if (blackSquareLocation[i][j] !== -2) {
                    col.innerHTML = blackSquareLocation[i][j]
                    col.style.color = 'white'
                }
                col.style.backgroundColor = 'black'
            }
            else if (bulbLocation[i][j] === 1) {
                col.innerHTML = `<i class="fa fa-lightbulb-o" style="font-size: 30px; color: yellow; transition-duration:.6s;"></i>`
            }

            row.appendChild(col);
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    divv.append(table)
}

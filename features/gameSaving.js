const saveButton = document.querySelector('#save')
const exitButton = document.querySelector('#exit')
const restartButton = document.querySelector('#restart')

const scoreBoard = document.querySelector('#showTable')
const table2 = document.querySelector('#scorePart')

const savedGamePart = document.querySelector('#tableLocations')
const savedGamesButton = document.querySelector('#savedGames')

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

    // <div class="map">
    //     <div class="visual"></div>
    //     <p>Game 1</p>
    // </div>

    for (let i = 0; i < tempArr.length; i++) {
        let div1 = document.createElement('div')
        let div2 = document.createElement('div')
        let p = document.createElement('p')
        div1.classList.add('map')
        div2.classList.add('visual')
        p.innerHTML = `${(i + 1)} saved game`

        createTableView(tempArr[i].blackSquareLocation, tempArr[i].bulbLocation, div2)
        div1.appendChild(div2)
        div1.appendChild(p)
        savedGamePart.appendChild(div1)
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

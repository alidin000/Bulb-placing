class map {
    difficulty
    tableSize
    squareLocation
    constructor(difficulty, tableSize, squareLocation) {
        this.difficulty = difficulty
        this.tableSize = tableSize
        this.squareLocation = squareLocation
    }
}

// for divs //
document.getElementById("playButton").addEventListener("click", e => {
    document.querySelectorAll(".main-item").forEach(menuItem => {
        menuItem.classList.add("hide");
    })
    initialize()
    document.querySelector(".choose-game-section").classList.remove("hide");
    document.querySelector(".map-creation").classList.add("hide");
})

document.getElementById("customMapsButton").addEventListener("click", e => {
    document.querySelectorAll(".main-item").forEach(menuItem => {
        menuItem.classList.add("hide");
    })

    document.querySelector(".your-custom-maps").classList.remove("hide");
})

document.getElementById("latestGamesButton").addEventListener("click", e => {
    document.querySelectorAll(".main-item").forEach(menuItem => {
        menuItem.classList.add("hide");
    })
    document.querySelector('#savedMaps').innerHTML = ''
    createTableView()
    document.querySelector(".latest-games").classList.remove("hide");
})

document.getElementById("scoresButton").addEventListener("click", (e) => {
    document.querySelectorAll(".main-item").forEach((menuItem) => {
        menuItem.classList.add("hide");
    });

    document.querySelector(".score-board").classList.remove("hide");

    let scoresSection = document.getElementById("scores");
    scoresSection.innerHTML = ""
    let scoreBoard2 = localStorage.getItem("scores") === null ? '[]' : localStorage.getItem("scores");
    scoreBoard2 = JSON.parse(scoreBoard2);

    //sorting asc
    scoreBoard2.sort(function (a, b) {
        return a.score - b.score;
    });

    scoreBoard2.forEach((scr) => {
        let score = document.createElement("div");
        score.classList.add("score");
        score.setAttribute("data-id", scr.uniqueId);

        let lefty = document.createElement("div");
        lefty.classList.add("left");

        let namy = document.createElement("div");
        let namyspan = document.createElement("span");
        namyspan.innerText = "Name: ";
        let namyp = document.createElement("p");
        namyp.innerText = scr.name;
        namy.appendChild(namyspan);
        namy.appendChild(namyp);
        namyp.classList.add("name");

        let mapy = document.createElement("div");
        let mapyspan = document.createElement("span");
        let mapyp = document.createElement("p");
        mapy.appendChild(mapyspan);
        mapy.appendChild(mapyp);
        mapyspan.innerText = "Map: ";
        mapy.classList.add("mapy");
        mapyp.innerText = scr.map;

        lefty.appendChild(namy);
        lefty.append(mapy);

        let righty = document.createElement("div");
        righty.classList.add("righty");
        righty.innerText = scr.score + " sec";
        score.appendChild(lefty);
        score.appendChild(righty);
        scoresSection.appendChild(score);
    });
});

// custom map creation part //
document.querySelector('#tsize').addEventListener('input', e => {
    document.querySelector(".createTable").innerHTML = ""
    let size = document.querySelector("#tsize").value
    let tbody = document.createElement('tbody')
    for (let i = 0; i < size; i++) {
        const row = document.createElement('tr')
        for (let j = 0; j < size; j++) {
            const col = document.createElement('td')
            col.innerHTML = " "
            row.appendChild(col);
        }
        tbody.appendChild(row);
    }
    document.querySelector(".createTable").appendChild(tbody)
})

document.querySelector('.createTable').addEventListener('click', function (e) {
    if (e.target.matches('td')) {
        if (e.target.innerHTML == ' ' && e.target.style.backgroundColor !== 'black') {
            e.target.style.backgroundColor = 'black'
        } else if (e.target.style.backgroundColor === 'black') {
            if (e.target.innerHTML === " ")
                e.target.innerHTML = 0;
            else if (e.target.innerHTML === '4') {
                e.target.innerHTML = " ";
                e.target.style.backgroundColor = 'white'
            }
            else {
                e.target.innerHTML = parseInt(e.target.innerHTML) + 1
            }
        }
    }
})

document.querySelector('#reset').addEventListener('click', function (e) {
    document.querySelector(".createTable").innerHTML = ""
    let size = document.querySelector("#tsize").value
    let tbody = document.createElement('tbody')
    for (let i = 0; i < size; i++) {
        const row = document.createElement('tr')
        for (let j = 0; j < size; j++) {
            const col = document.createElement('td')
            col.innerHTML = " "
            row.appendChild(col);
        }
        tbody.appendChild(row);
    }
    document.querySelector(".createTable").appendChild(tbody)
})

document.querySelector('#create').addEventListener('click', function (e) {
    let squares = []
    const custTable = document.querySelector('.createTable');
    for (let i = 0; i < custTable.rows.length; i++) {
        squares[i] = []
        for (let j = 0; j < custTable.rows[i].childNodes.length; j++) {
            if (custTable.rows[i].childNodes[j].innerHTML !== ' ') {
                squares[i][j] = parseInt(custTable.rows[i].childNodes[j].innerHTML)
            }
            else {
                if (custTable.rows[i].childNodes[j].style.backgroundColor === 'black') {
                    squares[i][j] = -2
                }
                else {
                    squares[i][j] = -1
                }
            }
        }
    }
    let custMap = new map("custom", custTable.rows.length, squares)
    if (localStorage.getItem('savedMaps') === null)
        localStorage.setItem('savedMaps', '[]')

    let tempO = JSON.parse(localStorage.getItem('savedMaps'))

    tempO.push(custMap)

    localStorage.setItem('savedMaps', JSON.stringify(tempO))
    document.getElementById("playButton").click()
})
initialize()

// aux functions
function initialize() {
    const customMaps = document.querySelectorAll('.custom-maps')

    // begginer map table view
    const beg = document.querySelector('#beginner');
    beg.innerHTML = ''
    let squareLocationBeg = new Array(7);
    let bulbLocationBeg = new Array(7);

    for (let i = 0; i < squareLocationBeg.length; i++) {
        squareLocationBeg[i] = new Array(7)
        bulbLocationBeg[i] = new Array(7)
        for (let j = 0; j < 7; j++) {
            squareLocationBeg[i][j] = -1
            bulbLocationBeg[i][j] = -1
        }
    }
    squareLocationBeg[0][3] = 1;
    squareLocationBeg[1][1] = 0;
    squareLocationBeg[1][5] = 2;
    squareLocationBeg[3][0] = -2;
    squareLocationBeg[3][3] = -2;
    squareLocationBeg[3][6] = -2;
    squareLocationBeg[5][1] = -2;
    squareLocationBeg[5][5] = 2;
    squareLocationBeg[6][3] = 3;

    tableView(squareLocationBeg, bulbLocationBeg, beg)

    //advanced

    const advg = document.querySelector('#advanced');
    advg.innerHTML = ''
    let squareLocationAdvg = new Array(7);
    let bulbLocationAdvg = new Array(7);

    for (let i = 0; i < squareLocationAdvg.length; i++) {
        squareLocationAdvg[i] = new Array(7)
        bulbLocationAdvg[i] = new Array(7)
        for (let j = 0; j < 7; j++) {
            squareLocationAdvg[i][j] = -1
            bulbLocationAdvg[i][j] = -1
        }
    }
    squareLocationAdvg[0][2] = 0;
    squareLocationAdvg[0][4] = -2;
    squareLocationAdvg[2][0] = -2;
    squareLocationAdvg[2][2] = -2;
    squareLocationAdvg[2][4] = 3;
    squareLocationAdvg[2][6] = -2;
    squareLocationAdvg[3][3] = 1;
    squareLocationAdvg[4][0] = 2;
    squareLocationAdvg[4][2] = -2;
    squareLocationAdvg[4][4] = -2;
    squareLocationAdvg[4][6] = -2;
    squareLocationAdvg[6][2] = -2;
    squareLocationAdvg[6][4] = 2;
    tableView(squareLocationAdvg, bulbLocationAdvg, advg)

    //extreme
    const ext = document.querySelector('#extreme');
    ext.innerHTML =''
    let squareLocationExt = new Array(10);
    let bulbLocationExt = new Array(10);

    for (let i = 0; i < squareLocationExt.length; i++) {
        squareLocationExt[i] = new Array(10)
        bulbLocationExt[i] = new Array(10)
        for (let j = 0; j < 10; j++) {
            squareLocationExt[i][j] = -1
            bulbLocationExt[i][j] = -1
        }
    }
    squareLocationExt[0][1] = -2;
    squareLocationExt[1][5] = 3;
    squareLocationExt[1][7] = 2;
    squareLocationExt[1][9] = -2;
    squareLocationExt[2][1] = 0;
    squareLocationExt[2][2] = -2;
    squareLocationExt[2][7] = -2;
    squareLocationExt[3][4] = -2;
    squareLocationExt[4][1] = 1;
    squareLocationExt[4][4] = -2;
    squareLocationExt[4][5] = 1;
    squareLocationExt[4][6] = -2;
    squareLocationExt[5][3] = -2;
    squareLocationExt[5][4] = -2;
    squareLocationExt[5][5] = -2;
    squareLocationExt[5][8] = 3;
    squareLocationExt[6][5] = -2;
    squareLocationExt[7][2] = 1;
    squareLocationExt[7][7] = 0;
    squareLocationExt[7][8] = -2;
    squareLocationExt[8][0] = 3;
    squareLocationExt[8][2] = -2;
    squareLocationExt[8][4] = 0;
    squareLocationExt[9][8] = 0;
    tableView(squareLocationExt, bulbLocationExt, ext)


    let createdMaps

    if (localStorage.getItem('savedMaps') === null) {
        createdMaps = []
    }
    else {
        createdMaps = JSON.parse(localStorage.getItem('savedMaps'))
    }

    let k = 0
    customMaps.forEach(element => {
        element.innerHTML = ""
        for (let index = 0; index < createdMaps.length; index++) {
            let div = document.createElement('div')
            let div2 = document.createElement('div')
            let p = document.createElement('p')
            p.innerHTML = "Map " + (index + 1)
            div.classList.add("map")
            div.classList.add("tableView")
            div.setAttribute('data-type', 'custom')
            div2.classList.add("visual")

            let bulbLocation = []
            for (let t = 0; t < createdMaps[index].tableSize; t++) {
                bulbLocation[t] = []
                for (let j = 0; j < createdMaps[index].tableSize; j++) {
                    bulbLocation[t][j] = 0
                }
            }
            // console.log(bulbLocation);
            tableView(createdMaps[index].squareLocation, bulbLocation, div2)

            div.appendChild(div2)
            div.appendChild(p)
            element.appendChild(div)

            // adding event listener to each map //
            div.addEventListener("click", (e) => {
                document.querySelectorAll(".hovered").forEach((hovered) => {
                    hovered.classList.remove("hovered");
                });
                div.classList.add("hovered");
            });
        }
        if (k > 0) {
            let div = document.createElement('div')
            let div2 = document.createElement('div')
            let p = document.createElement('p')
            let p2 = document.createElement('p')
            p2.innerHTML = "+"
            p.innerHTML = "Create map"
            div.classList.add("map")
            div2.classList.add("visual")
            div2.id = 'createMapButton'
            div2.appendChild(p2)
            div.appendChild(div2)
            div.appendChild(p)
            element.appendChild(div)


            div2.addEventListener("click", e => {
                document.querySelectorAll(".main-item").forEach(menuItem => {
                    menuItem.classList.add("hide");
                })
                document.querySelector(".map-creation").classList.remove("hide")
                document.querySelector(".createTable").innerHTML = ""
                let size = document.querySelector("#tsize").value
                let tbody = document.createElement('tbody')
                for (let i = 0; i < size; i++) {
                    const row = document.createElement('tr')
                    for (let j = 0; j < size; j++) {
                        const col = document.createElement('td')
                        col.innerHTML = " "
                        row.appendChild(col);
                    }
                    tbody.appendChild(row);
                }
                document.querySelector(".createTable").appendChild(tbody)
            })
        }
        k++
    });
}
function createTableView() {

    let user = document.getElementById("playNameInput").value;

    if (localStorage.getItem(user) === null) {
        document.getElementById('info').innerHTML = 'You do not have any saved games or you did not enter your username correctly!'
        return
    }
    document.getElementById('info').innerHTML = ''
    let tempArr = JSON.parse(localStorage.getItem(user))
    for (let x = 0; x < tempArr.length; x++) {
        let div1 = document.createElement('div')
        let play = document.createElement('button')
        let remove = document.createElement('button')
        let ptag = document.createElement('p')
        div1.classList.add('map')
        div1.classList.add('tableView')
        ptag.innerHTML = x
        ptag.style.display = 'none'

        div1.classList.add('map')
        play.innerHTML = `Load`
        play.style = "font-size: 1.5em;"
        play.type = 'submit'
        play.addEventListener('click', doIt)
        play.classList.add('button')
        play.classList.add('savedGButtons')

        remove.innerHTML = `Remove`
        remove.style = "font-size: 1.5em;"
        remove.type = 'submit'
        remove.addEventListener('click', function (e) {
            let tt = parseInt(e.target.previousElementSibling.innerHTML)

            let user = document.querySelector('#playNameInput').value
            let tempObj = JSON.parse(localStorage.getItem(user))
            tempObj.splice(tt, 1);
            localStorage.setItem(user, JSON.stringify(tempObj))
            document.getElementById("latestGamesButton").click()
        })
        remove.classList.add('button')
        remove.classList.add('savedGButtons')
        tableView(tempArr[x].blackSquareLocation, tempArr[x].bulbLocation, div1)

        div1.appendChild(play)
        div1.appendChild(ptag)
        div1.appendChild(remove)
        document.querySelector('#savedMaps').appendChild(div1)
    }



    function doIt(e) {
        let tt = parseInt(e.target.nextElementSibling.innerHTML)

        let user = document.querySelector('#playNameInput').value
        let tempObj = JSON.parse(localStorage.getItem(user))[tt]

        document.querySelectorAll(".main-item").forEach((menuItem) => {
            menuItem.classList.add("hide");
        });
        document.getElementById("play-screen").classList.remove("hide");

        document.querySelectorAll(".hovered").forEach((hovered) => {
            hovered.classList.remove("hovered");
        });
        document.querySelector(".playerName").querySelector("p").innerText =
            user == "" ? "Undefined" : user;

        clearInterval(helperFunc)
        startTimer(tempObj.timeCount)
        table.innerHTML = ""
        myGame = new game(tempObj.difficulty, tempObj.tableSize, tempObj.timeCount, tempObj.wrongSolution, tempObj.gameFinished, tempObj.bulbLocation, tempObj.blackSquareLocation, tempObj.username)

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
}

function tableView(blackSquareLocation, bulbLocation, divv) {
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

// adding hovered to able to choose a map  //
document.querySelectorAll(".map").forEach((gameMap) => {
    gameMap.addEventListener("click", (e) => {
        document.querySelectorAll(".hovered").forEach((hovered) => {
            hovered.classList.remove("hovered");
        });
        gameMap.classList.add("hovered");
    });
});


// button eventListeners
const saveButton = document.querySelector('#saveButton')
const exitButton = document.querySelector('#exitButton')
const restartButton = document.querySelector('#restartButton')

restartButton.addEventListener('click', function () {
    myGame = new game(myGame.difficulty, table.rows.length, undefined, undefined, undefined, undefined, undefined, myGame.username);
    clearInterval(helperFunc)
    startTimer(0)
    table.innerHTML = ''
    createTable(myGame)
    if (confirm('Do you want to save the game?')) {
        saveButton.click()
    }
})

exitButton.addEventListener('click', function () {
    document.getElementById("playButton").click()
    clearInterval(helperFunc)
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
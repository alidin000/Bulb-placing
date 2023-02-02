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
    document.querySelector(".map-creation").classList.add("hide")
})


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
    let table = document.querySelector('.createTable');

    for (let i = 0; i < table.rows.length; i++) {
        squares[i] = []
        for (let j = 0; j < table.rows[i].childNodes.length; j++) {
            if (table.rows[i].childNodes[j].innerHTML !== ' ') {
                squares[i][j] = parseInt(table.rows[i].childNodes[j].innerHTML)
            }
            else {
                if (table.rows[i].childNodes[j].style.backgroundColor === 'black') {
                    squares[i][j] = -2
                }
                else {
                    squares[i][j] = -1
                }
            }
        }
    }
    let custMap = new map("custom", table.rows.length, squares)
    if (localStorage.getItem('savedGames') === null)
        localStorage.setItem('savedGames', '[]')

    let tempO = JSON.parse(localStorage.getItem('savedGames'))

    tempO.push(custMap)

    localStorage.setItem('savedGames', JSON.stringify(tempO))
    document.getElementById("playButton").click()
})
initialize()
function initialize()
{
    const customMaps = document.querySelectorAll('.custom-maps')
    let createdMaps = JSON.parse(localStorage.getItem('savedGames'))
    let i = 0
    customMaps.forEach(element => {
        element.innerHTML =""
        for (let index = 0; index < createdMaps.length; index++) {
            let div = document.createElement('div')
            let div2 = document.createElement('div')
            let p = document.createElement('p')
            p.innerHTML = "Map " + (index + 1)
            div.classList.add("map")
            div.setAttribute('data-type','custom')
            div2.classList.add("visual")
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
        if(i > 0)
        {
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
        i++
    });
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

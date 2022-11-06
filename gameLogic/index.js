const input = document.querySelector('#sizeOfMap')
const playButton = document.querySelector('#playButton')
const inputPart = document.querySelector('#inputPart')
const table = document.querySelector('#gameTable');
const winText = document.createElement('h1')

winText.innerHTML = 'You won'
winText.classList.add('winStyle')

// 
let difficulty
let tableSize
let wrongSolution = false

//easy map
let bulbLocation = createArray2(7);
let blackSquareLocation = createArray(7);
createSquares('easy', blackSquareLocation)
//advanced map
let bulbLocationAd = createArray2(7);
let blackSquareLocationAd = createArray(7);
createSquares('advanced', blackSquareLocationAd)

//extreme map
let bulbLocationEx = createArray2(10);
let blackSquareLocationEx = createArray(10);
createSquares('extreme', blackSquareLocationEx)

//initializing functions
//if count = -1 no squares, if count = -2 square with infinite count 
function createSquares(type, arr) {
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
    else {
        // console.log('not working');
    }
}
// array for squares
function createArray(size) {
    let x = []

    for (let i = 0; i < size; i++) {
        x[i] = new Array(size)
        for (let j = 0; j < size; j++) {
            x[i][j] = -1
        }
    }

    return x
}
// array for bulbs
function createArray2(size) {
    let x = []

    for (let i = 0; i < size; i++) {
        x[i] = new Array(size)
        for (let j = 0; j < size; j++) {
            x[i][j] = 0
        }
    }

    return x
}

//   <--game functions-->  //

// lighting squares //
function light(i, j) {
    let tempArr
    let tempArr2
    if (difficulty === 'extreme') {
        tempArr = blackSquareLocationEx
        tempArr2 = bulbLocationEx
    }
    else if (difficulty === 'advanced') {
        tempArr = blackSquareLocationAd
        tempArr2 = bulbLocationAd
    }
    else {
        tempArr = blackSquareLocation
        tempArr2 = bulbLocation
    }

    let k = j + 1
    while (k < tempArr.length && tempArr[i][k] === -1) {
        if (!(tempArr2[i][k] > 0)) {
            table.rows[i].cells[k].style.backgroundColor = 'yellow'
        }
        k++
    }
    k = j - 1
    while (k >= 0 && tempArr[i][k] === -1) {
        if (!(tempArr2[i][k] > 0)) { table.rows[i].cells[k].style.backgroundColor = 'yellow' }
        k--
    }
    k = i + 1
    while (k < tempArr.length && tempArr[k][j] === -1) {
        if (!(tempArr2[k][j] > 0)) { table.rows[k].cells[j].style.backgroundColor = 'yellow' }
        k++
    }
    k = i - 1
    while (k >= 0 && tempArr[k][j] === -1) {
        if (!(tempArr2[k][j] > 0)) { table.rows[k].cells[j].style.backgroundColor = 'yellow' }
        k--
    }
    tempArr2[i][j] = 1
}

// unlighting squares //
function unLight(i, j) {
    let tempArr
    let tempArr2
    if (difficulty === 'extreme') {
        tempArr = blackSquareLocationEx
        tempArr2 = bulbLocationEx
    }
    else if (difficulty === 'advanced') {
        tempArr = blackSquareLocationAd
        tempArr2 = bulbLocationAd
    }
    else {
        tempArr = blackSquareLocation
        tempArr2 = bulbLocation
    }

    let k = j + 1
    while (k < tempArr.length && tempArr[i][k] === -1) {
        if (!(tempArr2[i][k] > 0))
            table.rows[i].cells[k].style.backgroundColor = 'rgb(207, 207, 207)'
        k++
    }
    // console.log('1 loop');
    k = j - 1
    while (k >= 0 && tempArr[i][k] === -1) {
        if (!(tempArr2[i][k] > 0))
            table.rows[i].cells[k].style.backgroundColor = 'rgb(207, 207, 207)'
        k--
    }
    // console.log('2 loop');

    k = i + 1
    while (k < tempArr.length && tempArr[k][j] === -1) {
        if (!(tempArr2[k][j] > 0))
            table.rows[k].cells[j].style.backgroundColor = 'rgb(207, 207, 207)'
        k++
    }
    // console.log('3 loop');
    k = i - 1
    while (k >= 0 && tempArr[k][j] === -1) {
        if (!(tempArr2[k][j] > 0))
            table.rows[k].cells[j].style.backgroundColor = 'rgb(207, 207, 207)'
        k--
    }
    // console.log('4 loop');
    tempArr2[i][j] = 0
    table.rows[i].cells[j].style.backgroundColor = 'rgb(207, 207, 207)'
    for (let g = 0; g < tempArr2.length; g++) {
        for (let gg = 0; gg < tempArr2[0].length; gg++) {
            if (tempArr2[g][gg] === 1)
                light(g, gg)
        }
    }
}

// bulb count check //
function check(i, j) {

    let tempArr
    let tempArr2

    let firstS = false  //up side
    let cor1 = []
    let secondS = false //left side
    let cor2 = []
    let thirdS = false //down side
    let cor3 = []
    let fourthS = false //right side
    let cor4 = []

    if (difficulty === 'extreme') {
        tempArr = blackSquareLocationEx
        tempArr2 = bulbLocationEx
    }
    else if (difficulty === 'advanced') {
        tempArr = blackSquareLocationAd
        tempArr2 = bulbLocationAd
    }
    else {
        tempArr = blackSquareLocation
        tempArr2 = bulbLocation
    }

    if (i > 0 && tempArr[i - 1][j] > -1) {
        firstS = true
        cor1.push(i - 1)
        cor1.push(j)
    }
    if (j > 0 && tempArr[i][j - 1] > -1) {
        secondS = true
        cor2.push(i)
        cor2.push(j - 1)
    }
    if (i < tempArr.length - 1 && tempArr[i + 1][j] > -1) {
        thirdS = true
        cor3.push(i + 1)
        cor3.push(j)
    }
    if (j < tempArr.length - 1 && tempArr[i][j + 1] > -1) {
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
            count += tempArr2[ii - 1][jj]
        if (jj > 0)
            count += tempArr2[ii][jj - 1]
        if (ii < tempArr2.length - 1)
            count += tempArr2[ii + 1][jj]
        if (jj < tempArr2.length - 1)
            count += tempArr2[ii][jj + 1]

        if (count >= tempArr[ii][jj]) return false
    }

    //second check
    if (secondS) {
        let count = 0
        let ii = cor2[0]
        let jj = cor2[1]

        if (ii > 0)
            count += tempArr2[ii - 1][jj]
        if (jj > 0)
            count += tempArr2[ii][jj - 1]
        if (ii < tempArr2.length - 1)
            count += tempArr2[ii + 1][jj]
        if (jj < tempArr2.length - 1)
            count += tempArr2[ii][jj + 1]

        if (count >= tempArr[ii][jj]) return false
    }

    //third check
    if (thirdS) {
        let count = 0
        let ii = cor3[0]
        let jj = cor3[1]


        if (ii > 0)
            count += tempArr2[ii - 1][jj]
        if (jj > 0)
            count += tempArr2[ii][jj - 1]
        if (ii < tempArr2.length - 1)
            count += tempArr2[ii + 1][jj]
        if (jj < tempArr2.length - 1)
            count += tempArr2[ii][jj + 1]
        if (count >= tempArr[ii][jj]) return false
    }

    //fourth check
    if (fourthS) {
        let count = 0
        let ii = cor4[0]
        let jj = cor4[1]

        if (ii > 0)
            count += tempArr2[ii - 1][jj]
        if (jj > 0)
            count += tempArr2[ii][jj - 1]
        if (ii < tempArr2.length - 1)
            count += tempArr2[ii + 1][jj]
        if (jj < tempArr2.length - 1)
            count += tempArr2[ii][jj + 1]

        if (count >= tempArr[ii][jj]) return false

    }

    return true
}


// coloring it red when bulb is in the wrong place //
function removeRed() {
    let tempArr
    let tempArr2
    if (difficulty === 'extreme') {
        tempArr = blackSquareLocationEx
        tempArr2 = bulbLocationEx
    }
    else if (difficulty === 'advanced') {
        tempArr = blackSquareLocationAd
        tempArr2 = bulbLocationAd
    }
    else {
        tempArr = blackSquareLocation
        tempArr2 = bulbLocation
    }

    for (let i = 0; i < tempArr.length; i++) {
        for (let j = 0; j < tempArr.length; j++) {
            if (tempArr2[i][j] > 0) {
                table.rows[i].cells[j].style.backgroundColor = 'rgb(207, 207, 207)'
            }
        }
    }
    wrongSolution = false
    for (let i = 0; i < tempArr.length; i++) {
        for (let j = 0; j < tempArr.length; j++) {
            if (tempArr2[i][j] > 0) {
                let k = j + 1
                while (k < tempArr.length && tempArr[i][k] === -1) {
                    if (tempArr2[i][k] > 0) {
                        table.rows[i].cells[k].style.backgroundColor = 'rgb(255, 0, 0)'
                        wrongSolution = true
                    }
                    k++
                }
                k = j - 1
                while (k >= 0 && tempArr[i][k] === -1) {
                    if (tempArr2[i][k] > 0) {
                        wrongSolution = true
                        table.rows[i].cells[k].style.backgroundColor = 'rgb(255, 0, 0)'
                    }
                    k--
                }

                k = i + 1
                while (k < tempArr.length && tempArr[k][j] === -1) {
                    if (tempArr2[k][j] > 0) {
                        wrongSolution = true
                        table.rows[k].cells[j].style.backgroundColor = 'rgb(255, 0, 0)'
                    }
                    k++
                }
                k = i - 1
                while (k >= 0 && tempArr[k][j] === -1) {
                    if (tempArr2[k][j] > 0) {
                        wrongSolution = true
                        table.rows[k].cells[j].style.backgroundColor = 'rgb(255, 0, 0)'
                    }
                    k--
                }
            }
        }
    }
}

// check for game finish // 
function gameWon() {
    if (wrongSolution) return false;
    // console.log("working");
    let tempArr
    let tempArr2
    if (difficulty === 'extreme') {
        tempArr = blackSquareLocationEx
        tempArr2 = bulbLocationEx
    }
    else if (difficulty === 'advanced') {
        tempArr = blackSquareLocationAd
        tempArr2 = bulbLocationAd
    }
    else {
        tempArr = blackSquareLocation
        tempArr2 = bulbLocation
    }
    let countBulb = 0
    let countBlSquare = 0
    let litSquares = 0
    for (let i = 0; i < tempArr.length; i++) {
        for (let j = 0; j < tempArr.length; j++) {
            if (tempArr2[i][j] > 0) countBulb++;
            if (tempArr[i][j] !== -1) countBlSquare++;
            if(table.rows[i].cells[j].style.backgroundColor ==='yellow') litSquares++
        }
    }
    // console.log(countBulb+ "  " + (tempArr.length * tempArr.length - countBlSquare));
    return countBulb + litSquares === (tempArr.length * tempArr.length - countBlSquare)
}

// creating table //
playButton.addEventListener('click', function () {
    let size
    difficulty = input.value
    if(input.value === 'easy' || input.value === 'advanced')
    {
        size = 7
    }
    else if(input.value ==='extreme')
    {
        size = 10
    }
    else 
    {
        alert('This feature is not released yet(')
        return
    }
    inputPart.style.display = 'none'
    document.querySelector('#gamePart').style.display = 'block'

    setInterval(setTime, 1000);

    let tbody = document.createElement('tbody')
    tableSize = size
    if (size === 7) {
        if(difficulty === 'easy')
        {
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
    
                    row.appendChild(col);
                }
                tbody.appendChild(row);
            }
        }
        else 
        {
            for (let i = 0; i < size; i++) {
                const row = document.createElement('tr')
                for (let j = 0; j < size; j++) {
                    const col = document.createElement('td')
                    col.classList.add('tableDesing')
    
                    if (blackSquareLocationAd[i][j] !== -1) {
                        if (blackSquareLocationAd[i][j] !== -2) {
                            col.innerHTML = blackSquareLocationAd[i][j]
                            col.style.color = 'white'
                        }
                        col.style.backgroundColor = 'black'
                    }
    
                    row.appendChild(col);
                }
                tbody.appendChild(row);
            }
        }
    }
    else if (size === 10) {
        for (let i = 0; i < size; i++) {
            const row = document.createElement('tr')
            for (let j = 0; j < size; j++) {
                const col = document.createElement('td')
                col.classList.add('tableDesing')

                if (blackSquareLocationEx[i][j] !== -1) {
                    if (blackSquareLocationEx[i][j] !== -2) {
                        col.innerHTML = blackSquareLocationEx[i][j]
                        col.style.color = 'white'
                    }
                    col.style.backgroundColor = 'black'
                }

                row.appendChild(col);
            }
            tbody.appendChild(row);
        }
    }
    table.appendChild(tbody);
})

// bulb inserting //
table.addEventListener('click', function (e) {
    if (e.target.matches('td') || e.target.matches('i')) {

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

        if (difficulty === 'easy' && blackSquareLocation[row][col] === -1) {
            if (e.target.matches('td') && e.target.innerHTML === '') {
                if (!check(row, col))  {

                    table.rows[row].cells[col].classList.add('highlight')
                    setTimeout(() => {  table.rows[row].cells[col].classList.remove('highlight')}, 500);
                    
                    return
                }
        
                e.target.innerHTML = `<i class="fa fa-lightbulb-o" style="font-size: 30px; color: yellow; transition-duration:.6s;"></i>`

                // console.log("reached here");
                light(row, col)
                // console.log("and finished");
            }
            else if (e.target.matches('i')) {
                e.target.parentNode.innerHTML = ''
                unLight(row, col)
            }
            else {
                e.target.innerHTML = ''
                unLight(row, col)
            }
        }else if(difficulty === 'advanced' && blackSquareLocationAd[row][col] === -1)
        {
            if (e.target.matches('td') && e.target.innerHTML === '') {
                if (!check(row, col))  {

                    table.rows[row].cells[col].classList.add('highlight')
                    setTimeout(() => {  table.rows[row].cells[col].classList.remove('highlight')}, 500);
                    
                    return
                }
        
                e.target.innerHTML = `<i class="fa fa-lightbulb-o" style="font-size: 30px; color: yellow; transition-duration:.6s;"></i>`

                // console.log("reached here");
                light(row, col)
                // console.log("and finished");
            }
            else if (e.target.matches('i')) {
                e.target.parentNode.innerHTML = ''
                unLight(row, col)
            }
            else {
                e.target.innerHTML = ''
                unLight(row, col)
            }
        }
        else if (difficulty === 'extreme' && blackSquareLocationEx[row][col] === -1) {
            if (e.target.matches('td') && e.target.innerHTML === '') {
                if (!check(row, col))  {

                    table.rows[row].cells[col].classList.add('highlight')
                    setTimeout(() => {  table.rows[row].cells[col].classList.remove('highlight')}, 500);
                    
                    return
                }
                e.target.innerHTML = `<i class="fa fa-lightbulb-o" style="font-size: 30px; color: yellow; transition-duration:.6s;"></i>`
                light(row, col)
            }
            else if (e.target.matches('i')) {
                e.target.parentNode.innerHTML = ''
                unLight(row, col)
            }
            else {
                e.target.innerHTML = ''
                unLight(row, col)
            }
        }
        removeRed()
    }
    if(gameWon())
    {
        gameFinished = true
        winText.style.display = 'block'
        document.querySelector('body').appendChild(winText)
    }
    else 
    {
        winText.style.display = 'none'
    }
})

const saveButton = document.querySelector('#save')
const exitButton = document.querySelector('#exit')
const scoreBoard = document.querySelector('#showTable')
const table2 = document.querySelector('#scorePart')

exitButton.addEventListener('click',function(){
    inputPart.style.display = 'block'
    document.getElementById('showTable').style.display = 'inline-block'
    document.querySelector('#gamePart').style.display = 'none'
    table.innerHTML = ''
    clearInterval(helperFunc)
})

saveButton.addEventListener('click',function(){
    if (localStorage.getItem(myGame.username) === null)
            localStorage.setItem(myGame.username, '[]')

        let tempO = JSON.parse(localStorage.getItem(myGame.username))

        tempO.push(myGame)

        localStorage.setItem(myGame.username, JSON.stringify(tempO))
})

scoreBoard.addEventListener('click',function(){
    if(scoreBoard.innerHTML === 'Scoreboard')
    {
        scoreBoard.innerHTML = 'collapse'
        table2.style.display = 'flex'
        let scores = JSON.parse(localStorage.getItem('scores'))
        let size = scores.length
        const tbody = document.querySelector('tbody')
        for (let i = 0; i < size; i++) {
            const row = document.createElement('tr')
            const col = document.createElement('td')
            const div=document.createElement('div')
            div.classList.add('scoreboard-team')
            const span = document.createElement('span')
            span.classList.add('scoreboard-team-logo-text')
            span.innerHTML = scores[i].name
            col.classList.add('scoreboard-team')
            col.appendChild(div)
            col.appendChild(span)
            const col2 = document.createElement('td')
            col2.classList.add('scoreboard-score')
            col2.innerHTML = scores[i].score

            row.appendChild(col);
            row.appendChild(col2);

            tbody.appendChild(row);
        }

        table2.appendChild(tbody);
    }
    else
    {
        scoreBoard.innerHTML = 'Scoreboard'
        table2.style.display = 'none'
        const tbody = document.querySelector('tbody')
        tbody.innerHTML =''
    }
    
})

function autoSave()
{
    saveButton.click()
}
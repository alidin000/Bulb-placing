const saveButton = document.querySelector('#save')

saveButton.addEventListener('click',function(){
    if (localStorage.getItem(myGame.username) === null)
            localStorage.setItem(myGame.username, '[]')

        let tempO = JSON.parse(localStorage.getItem(myGame.username))

        tempO.push(myGame)

        localStorage.setItem(myGame.username, JSON.stringify(tempO))
})

function autoSave()
{
    saveButton.click()
}
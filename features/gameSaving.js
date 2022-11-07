const saveButton = document.querySelector('#save')

saveButton.addEventListener('click',function(){
    localStorage.setItem('lastGame',JSON.stringify(myGame))
})

function autoSave()
{
    saveButton.click()
}
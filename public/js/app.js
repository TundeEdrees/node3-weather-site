console.log('Clientside javaScript file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})
// fetch('http://localhost:3000/weather?address=').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
// messageOne.textContent='From Javascript'

weatherform.addEventListener('submit',(e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const location=search.value

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent=data.error
        }
        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })
})
})

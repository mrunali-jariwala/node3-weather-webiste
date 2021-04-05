console.log('Client side script run')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = searchElement.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather/json?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                return
            }

            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })
})
const inputName = document.querySelector('.inputDivName')
const inputPwd = document.querySelector('.inputDivPwd')
const windowDiv = document.querySelector('.auth-window')



const handleFetchAuth = () => {
  const name = inputName.value
  const pwd = inputPwd.value

  if (!name || !pwd) {
   return renderResponse('Data is missing')
  }

const url = `http://localhost:3000/auth`

const obj = {
  name: name,
  pwd: pwd
}

fetch(url, {
method: 'POST',
headers: {
  'Content-Type': 'application/json;charset=utf-8'
},
body: JSON.stringify(obj)
})
.then((response) => {
  return response.json()
})
.then((data) => {
  renderResponse(data)
})
}



function renderResponse(data) {
  const pDiv = document.createElement('div')
  pDiv.classList.add('pResDiv')
  pDiv.innerHTML = `<p>${data}</p>`
  windowDiv.appendChild(pDiv)

  setTimeout(() => {
    windowDiv.removeChild(pDiv)
  }, 2000)
}
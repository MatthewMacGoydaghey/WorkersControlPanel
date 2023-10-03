const inputName = document.querySelector('.inputDivName')
const inputEmail = document.querySelector('.inputDivEmail')
const inputPwd = document.querySelector('.inputDivPwd')
const inputPos = document.querySelector('.posButton')


const handleFetchReg = async () => {
  url = 'http://localhost:3000/reg'

const name = inputName.value
const email = inputEmail.value
const pwd = inputPwd.value
const pos = inputPos.innerHTML


if (!name || !pwd || !email) {
  return console.log("Data missing")
}
const obj = {
  "name": name,
  "email": email,
  "pwd": pwd,
  "pos": pos
}
  fetch(url, {
    method: "POST",
    credentials: "include",
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(obj)
  })
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    console.log(data)
  })


  inputName.value = ''
  inputEmail.value = ''
  inputPwd.value = ''
  inputPos.innerHTML = 'Set'
}



const handlePosForm = (method, response) => {
  if (method === "OPEN") {
    const posForm = document.createElement('div')
    posForm.classList.add('posForm')
    posForm.innerHTML = `
   <p class="posTitle">Choose position:</p>
   <div onclick="handlePosForm('CLOSE', 'Admin')" class="posDiv">Administrator</div>
   <div onclick="handlePosForm('CLOSE', 'Engineer')" class="posDiv">Engineer</div>
   <div onclick="handlePosForm('CLOSE', 'IT specialist')" class="posDiv">IT specialist</div>
   <div onclick="handlePosForm('CLOSE', 'Manager')" class="posDiv">Manager</div>
   <div onclick="handlePosForm('CLOSE', 'Worker')" class="posDiv">Worker</div>
  </div>
  `
    document.body.appendChild(posForm)
  
    } else if (method === "CLOSE") {
      const posForm = document.querySelector('.posForm')
      document.body.removeChild(posForm)
      const posButton = document.querySelector('.posButton')
      posButton.innerHTML = response
    }
  }

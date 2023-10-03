const body = document.querySelector('body')
const workerDiv = document.querySelector('.worker-div')
url = `http://localhost:3000/workersCP`

const getWorkers = async () => {

fetch(url, {
  method: "POST",
  credentials: "include",
headers: {
  'Content-Type': 'application/json;charset=utf-8'
},
body: JSON.stringify({obj: "None"})
})
.then((response) => {
  return response.json()
})
.then((data) => {
  renderWorkers(data)
  console.log(data)
})
}

getWorkers()


const getWorker = async (workerName) => { 
  fetch(url, {
    method: "POST",
    credentials: "include",
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({"name": workerName})
  })
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    renderUpdateForm(data, "OPEN")
  })
}


const renderWorkers = (workers) => {
  let id = 1;
  let HTML = ''
  for (let worker of workers) {
    let color = ''
    if (worker.Status === 'Offline') {
      color = 'red'
    } else {
      color = "green"
    }
    HTML += `<div class="worker">
    <div class="id-div">${id}</div>
    <div class="name-div">${worker.Name}</div>
    <div class="email-div">${worker.Email}</div>
    <div class="position-div">${worker.Position}</div>
    <div class="status-div"><span class="${color}">${worker.Status}</span></div>
    <div class="action-div">
    <button onclick="getWorker('${worker.Name}')" class="update-button"></button>
    <button onclick="deleteWorker('${worker.Name}')" class="delete-button"></button>
    </div>
    </div>`
    id++
  }
  workerDiv.innerHTML = HTML
}



const renderUpdateForm = async (worker, method) => {
  if (method === "OPEN") {
  console.log(`Update form of worker ${worker.Name} opened`)
  const background = document.createElement('div')
  const updateForm = document.createElement('div')
  background.classList.add('background')
  updateForm.classList.add('updateForm')
 updateForm.innerHTML = `
 <p class="updateTitle">Update form</p>
 <div class="updateFormInputsDiv">
 <input type="text" placeholder="Worker name" class="updateFormNameInput">
 <input type="text" placeholder="Worker email" class="updateFormEmailInput">
</div>
<div class="updateFormPositionDiv">
 <p class="posP">Position:</p>
 <button onclick="handlePosForm('OPEN')" class="posButton">Set</button>
</div>
<button onclick="updateWorker('${worker.Name}')" class="saveButton">Save changes</button>`
  document.body.appendChild(background)
  document.body.appendChild(updateForm)

const nameInput = document.querySelector(".updateFormNameInput")
const emailInput = document.querySelector(".updateFormEmailInput")

nameInput.value = `${worker.Name}`
emailInput.value = `${worker.Email}`
  } else if (method === "CLOSE") {
    const background = document.querySelector('.background')
    const updateForm = document.querySelector('.updateForm')
    document.body.removeChild(background)
    document.body.removeChild(updateForm)
  }
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



const deleteWorker = async (workerName) => {
  fetch(url, {
    method: "DELETE",
    credentials: "include",
headers: {
  'Content-Type': 'application/json;charset=utf-8'
},
body: JSON.stringify({name: workerName})
  })
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    console.log(data)
    getWorkers()
  })
}


const updateWorker = async (workerName) => {

const nameInput = document.querySelector(".updateFormNameInput")
const emailInput = document.querySelector(".updateFormEmailInput")
const posInput = document.querySelector('.posButton')
updName = nameInput.value
updEmail = emailInput.value
updPos = posInput.innerHTML
const obj = {
  name: workerName,
  updName: updName,
  updEmail: updEmail,
  updPos: updPos
}
  fetch(url, {
    method: "PUT",
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
    getWorkers()
  })
  renderUpdateForm(workerName, "CLOSE")
}

const wall = document.querySelector('.wall-left')


const logout = () => {
  const url = `http://localhost:3000/auth`
  fetch(url, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    const p = document.createElement('div')
    p.innerHTML = `${data}`
    wall.appendChild(p)

    setTimeout(() => {
      wall.removeChild(p)
    }, 1000)
    
  })
}
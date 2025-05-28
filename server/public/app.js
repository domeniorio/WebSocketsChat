const wsocket = io('http://localhost:3000')

const pageStartup = () => {
  const div =document.getElementById("dynamictext")
  if(!div){
    console.log("culo")
    return
  }
  const form = document.createElement("form")
  form.id = 'form'
  const textInput = document.createElement("input")
  textInput.type = 'text'
  textInput.placeholder = 'inserisci il messaggio'
  textInput.id = 'input'
  const button = document.createElement('button')
  button.innerText = 'send'
  const ul = document.createElement('ul')
  const paragraph = document.createElement('p')
  paragraph.id = 'activity'
  div.appendChild(form)
  form.appendChild(textInput)
  form.appendChild(button)
  div.appendChild(ul)
  div.appendChild(paragraph)
  

  const sendMsg = (e) => {
    e.preventDefault()
    if (input.value){
      wsocket.emit('message', input.value)
      input.value = ''
    }
    input.focus()
  }
  form.addEventListener('submit', sendMsg)


  const input = document.getElementById('input')
  const activity = document.getElementById('activity')



//listening for messages

  wsocket.on("message", (data) => {
    activity.textContent = ''
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
  })

  input.addEventListener('keypress', () => wsocket.emit('activity', wsocket.id))

  let activityTimer
  wsocket.on('activity', (name) =>{
    activity.textContent = `${name} sta scrivendo...`
    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => activity.textContent='', 2000)
  })
}

document.body.onload = pageStartup

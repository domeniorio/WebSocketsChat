
const pageStartup = () => {
  const div =document.getElementById("dynamictext");
  if(!div){
    console.log("culo");
    return
  }
  const form = document.createElement("form");
  form.id = 'form';
  const textInput = document.createElement("input");
  textInput.type = 'text';
  textInput.placeholder = 'inserisci il messaggio';
  textInput.id = 'input';
  const button = document.createElement('button');
  button.innerText = 'send';
  const ul = document.createElement('ul');
  div.appendChild(form);
  form.appendChild(textInput);
  form.appendChild(button);
  div.appendChild(ul);
  form.addEventListener('submit', sendMsg);
}


document.body.onload = pageStartup;

const wsocket = new WebSocket('ws:localhost:3000');
const sendMsg = (e) => {
  e.preventDefault();
  const input = document.getElementById('input');
  if (input.value){
    wsocket.send(input.value);
    input.value = '';
  }
  input.focus();
}


//listening for messages

//({data}) destructuring dell'oggetto message, estraggo il campo data
wsocket.addEventListener("message", ({data}) => {
  const li = document.createElement('li');
  li.textContent = data;
  document.querySelector('ul').appendChild(li);
})

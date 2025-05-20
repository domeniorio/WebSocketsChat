
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
  div.appendChild(textInput);
  div.appendChild(button);
  div.appendChild(ul);
}


document.body.onload = pageStartup;

const wsocket = new WebSocket('ws:localhost:3000');
const sendMsg = (e) => {
  e.preventDefault();
  const input = document.getElementById('input');
  if (input.value){
    socket.send(input.value);
    input.value = '';
  }
  input.focus();
}

document.getElementById('form')
    .addEventListener('submit', sendMsg);
 

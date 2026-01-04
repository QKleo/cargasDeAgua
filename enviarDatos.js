
const endPoint="https://script.google.com/macros/s/AKfycbxXLKfojEtApZREYlj5XfQRzuKqKhui1QZl-l8F5pdb9rfeZ3EuA87OARmQ4ETJddNZUg/exec"

function enviar() {
  const data = {
    dominio: document.getElementById('dominio').value,
    cargadero: document.getElementById('cargadero').value,
    m3: document.getElementById('m3').value,
    chofer: localStorage.getItem('user') || 'demo',
    fecha: new Date().toLocaleString() // opcional: guardar fecha/hora
  };

  fetch(endPoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(r => r.text())
  .then(res => alert("Registro enviado: " + res))
  .catch(err => alert("Error: " + err));
}
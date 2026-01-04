
const endPoint="https://script.google.com/macros/s/AKfycbxmrLYRZOvHp5fEmagYlMAeuP0nXIGq3KW86wXWydg_--pA7VLBMSPgnknPGxfoetWCmQ/exec";
async function enviar() {
  const data = {
    dominio: document.getElementById('dominio').value,
    cargadero: document.getElementById('cargadero').value,
    m3: document.getElementById('m3').value,
    chofer: localStorage.getItem('user') || 'demo',
    fecha: new Date().toLocaleString() // opcional: guardar fecha/hora
  };

   try {
        const res = await fetch(endPoint, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        //const data = await res.json();
       // console.log("Respuesta del servidor:", data);
        console.log("Carga enviada:", data); //ver en consola
        alert("carga enviada.");
      } catch (err) {
        console.error("Error enviando.......:", err);
        alert("No se pudo enviar. Queda activo hasta nuevo intento.");
        return; // no limpiar estado si falla envío
      }};
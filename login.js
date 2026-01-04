

const API_URL ="https://script.google.com/macros/s/AKfycbwhFD9C_jar4k4H7m2PIt_3HAXuPKQ71r2eOHn_Vls8ueSYVBxvaBaq44M0cZc6_nAC/exec"; 


window.onload = async function() {
      const usuarioGuardado = localStorage.getItem("user");
      const passwordGuardado = localStorage.getItem("pass");
     
      // mostrarResumen();
      if (usuarioGuardado && passwordGuardado) {
        //mostrarLoading(true);
       spinner(true);



        const valido = await validarUsuario(usuarioGuardado, passwordGuardado);
        // Ocultar spinner y texto
        spinner(false);


        if (valido) {
         // mostrarBienvenida(usuarioGuardado);
          
            document.getElementById("welcomeMsg").textContent =
            `¡Bienvenido ${usuarioGuardado}! Que tengas un gran reparto 🚚💧`;



            document.getElementById("login").style.display = "none";
            document.getElementById("form").style.display = "block";
          
          
        } else {
          // sesión inválida: limpiar y mostrar login
          login();
          alert("Tu usuario ya no está activo o credenciales cambiaron.");
          
        }
      }
    };

async function login() {
  const usuario = document.getElementById("user").value.trim();
  const password = document.getElementById("pass").value.trim();
  const loader = document.getElementById("loader");



  if (!usuario || !password) {
    alert("Ingresa usuario y contraseña");
    return;
  }
  // Mostrar spinner
    spinner(true);

  const valido = await validarUsuario(usuario, password);
    // Ocultar spinner
    spinner(false);

  if (valido) {
    localStorage.setItem("user", usuario);
    localStorage.setItem("pass", password);

     // Mostrar mensaje motivador
       document.getElementById("welcomeMsg").textContent =
      `¡Bienvenido ${usuario}! Que tengas un gran reparto 🚚💧`;



    document.getElementById("login").style.display = "none";
    document.getElementById("form").style.display = "block";
  } else {
    limpiarLogin();
    alert("Usuario o contraseña inválidos, o usuario inactivo.");
  }
}

async function validarUsuario(usuario, password) {
  try {
    const res = await fetch(API_URL + "?tipo=usuarios");
    const data = await res.json();
    const chofer = data.find(c => String(c.usuario) === usuario && String(c.password) === password);
    return !!(chofer && String(chofer.activo).toUpperCase() === "SI");
  } catch (err) {
    console.error("Error validando usuario:", err);
    limpiarLogin();
    return false;
  }
}
function logout(showLogin = true) {
      localStorage.removeItem("user");
      localStorage.removeItem("pass");
      
     
      if (showLogin) document.getElementById("form").style.display = "none";
        document.getElementById("login").style.display = "block";
        limpiarLogin();
      
    }

function spinner(value) {

    let interval;
    if (value) {
        loader.style.display = "block";
        loadingText.style.display = "block";

    // Array de mensajes motivadores
    const mensajes = ["Validando…", "Conectando…", "Listo 🚀"];
    let i = 0;
    interval = setInterval(() => {
        loadingText.textContent = mensajes[i];
        i = (i + 1) % mensajes.length;
        }, 500);
       
    } else {
         clearInterval(interval);
        loader.style.display = "none";
        loadingText.style.display = "none";
    }};

function limpiarLogin() {
      document.getElementById("user").value = '';
      document.getElementById("pass").value = '';
    }
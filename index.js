let resultadoComidas = "";
let resultadoIngredientes = "";
let resultados = [];
let favoritos = [];
let fav = "";

function comidas() {
  resultadoComidas = "";
  let comidas = document.getElementById("dropComidas").value;
  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?type=${comidas}&apiKey=be7ff33424a54fedab328d37807f4202`
  )
    .then(function respuesta(respuesta) {
      return respuesta.json();
    })
    .then(function datos(datos) {
      resultados = datos.results;
      for (let i = 0; i < datos.results.length; i++) {
        resultadoComidas += `
        <div class="card" id="${datos.results[i].title}">
        <img src="${datos.results[i].image}" alt="${datos.results[i].title}">
        <div class="container">
        <h4>${datos.results[i].title}</h4>
        <p><b>Identificador:</b> ${datos.results[i].id}</p>
        <p><b>Tipo de comida:</b> ${comidas}</p>
        <div><button id="fav" onclick="guardar(${i})">❤️</button></div>
            </div>
        </div>`;
      }
      document.getElementById("resultadoComidas").innerHTML = resultadoComidas;
    });
}

function ingredientes() {
  resultadoIngredientes = "";
  let ingredientes = document.getElementById("inputIngredientes").value;
  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?&apiKey=be7ff33424a54fedab328d37807f4202&includeIngredients=${ingredientes}`
  )
    .then(function respuesta(respuesta) {
      return respuesta.json();
    })
    .then(function datos(datos) {
      resultados = datos.results;
      for (let i = 0; i < datos.results.length; i++) {
        resultadoIngredientes += `
        <div class="card" id="${datos.results[i].title}">
          <img src="${datos.results[i].image}" alt="${datos.results[i].title}">
          <div class="container">
          <h4>${datos.results[i].title}</h4>
          <p><b>Identificador:</b> ${datos.results[i].id}</p>
          <p><b>Esta comida incluye:</b> ${ingredientes}</p>
          <div><button id="fav" onclick="guardar(${i})">❤️</button></div>
              </div>
          </div>`;
      }
      document.getElementById(
        "resultadoIngredientes"
      ).innerHTML = resultadoIngredientes;
    });
}

function guardar(indice) {
  let favorito = {
    image: resultados[indice].image,
    title: resultados[indice].title,
    id: resultados[indice].id,
  };
  favoritos.push(favorito);
  localStorage.setItem("favs", JSON.stringify(favoritos));
}

function favoritosRecuperados() {
  let recuperarFav = JSON.parse(localStorage.getItem("favs"));
  for (let i = 0; i < recuperarFav.length; i++) {
    fav += `<div class="card" id="${recuperarFav[i].title}">
    <img src="${recuperarFav[i].image}" alt="${recuperarFav[i].title}">
    <div class="container">
    <h4>${recuperarFav[i].title}</h4>
    <p>Identificador: ${recuperarFav[i].id}</p>
    </div></div>`;
  }
  document.getElementById("favoritos").innerHTML = fav;
}



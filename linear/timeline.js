// FUNÇÃO URL GET

$_GET = [];
(function(){
    corte = window.location.href.toString().indexOf('?');
    if (corte > 0) {
        argumento = window.location.href.toString().substring(corte + 1);
        argumentos = argumento.split('&');
        for (arg in argumentos){
            let argCorte = argumentos[arg].indexOf('=');
            $_GET[argumentos[arg].substring(0,argCorte)] = argumentos[arg].substring(argCorte + 1);
        }
    } 
})();


let arr = [];
let actualpage = 0;
let arrtitulo = [];
let arrcolorfg = [];
let arrcolorbg = [];
let para = 0;
let vai = "";

if ($_GET['s'] != "" && typeof $_GET['s'] != "undefined" && $_GET['s'] != null) {
    actualpage = parseInt($_GET['s']);
}

let estilo = document.createElement('link');
estilo.setAttribute('rel', 'stylesheet');
estilo.setAttribute('type', 'text/css');
estilo.setAttribute('href', "https://slidelines.vercel.app/linear/timeline.css" );
document.lastChild.appendChild(estilo);

if ($_GET['theme'] != "" && typeof $_GET['theme'] != "undefined") {
    let estilo2 = document.createElement('link');
    estilo2.setAttribute('rel', 'stylesheet');
    estilo2.setAttribute('type', 'text/css');
    estilo2.setAttribute('href', $_GET['theme']);
    document.lastChild.appendChild(estilo2);
}

let frontpage = document.createElement('div');
frontpage.setAttribute('id', 'frontslide');
frontpage.setAttribute('class', 'frontpageinicial');
document.lastChild.appendChild(frontpage);

let minimalnav = document.createElement('div');
minimalnav.setAttribute('id', 'minimaln');
document.lastChild.appendChild(minimalnav);

let indicenav = document.createElement('div');
indicenav.setAttribute('id', 'indice');
document.lastChild.appendChild(indicenav);


// FUNÇÃO DE FETCH DE ARQUIVO JSON

arquivojson = $_GET['file'];
fetch(arquivojson).then(response => response.json()).then((dados) => {

    // document.getElementById("frontslide").style.width = (dados.length * 100) + "vw";

    let code = "";
    dados.map((d,i) => {

        arrtitulo[i] = d.titulo;
        arrcolorfg[i] = d.frente;
        arrcolorbg[i] = d.fundo;
        
        if (d.tipo == "imagem" || d.link.toString().match(/(\.png|\.jpg|\.svg)/i)) {
            code += `<div style='background-color: ${d.fundo};'><div style='background-color: ${d.fundo}; background-image: url(${d.link});'></div></div>`;
        } else if (d.link.toString().match(/\.md/i)) {
            code += `<div style='background-color: ${d.fundo};'><iframe frameborder=0 src='https://www.ranoya.com/aulas/tryit/markdown2/slimTransp.html?embed=plain&file=${d.link}'></iframe></div>`;
        } else {
            code += `<div style='background-color: ${d.fundo};'><iframe frameborder=0 src='${d.link}'></iframe></div>`;
        }

    });

    document.getElementById("frontslide").innerHTML = code;


});

document.addEventListener("wheel", (event) => {

    document.getElementById("frontslide").scrollLeft += event.deltaY;

    let posicao = parseInt(document.getElementById("frontslide").scrollLeft / window.innerWidth);
    
    document.getElementById("minimaln").innerHTML = arrtitulo[posicao];
    document.getElementById("minimaln").style.color = arrcolorfg[posicao];
    document.getElementById("indice").innerHTML = posicao + 1;
    document.getElementById("indice").style.color = arrcolorbg[posicao];
    document.getElementById("indice").style.backgroundColor = arrcolorfg[posicao];

});

document.getElementById("frontslide").addEventListener("scroll", (event) => {

    let posicao = parseInt(document.getElementById("frontslide").scrollLeft / window.innerWidth);
    document.getElementById("minimaln").innerHTML = arrtitulo[posicao];
    document.getElementById("minimaln").style.color = arrcolorfg[posicao];
    document.getElementById("indice").innerHTML = posicao + 1;
    document.getElementById("indice").style.color = arrcolorbg[posicao];
    document.getElementById("indice").style.backgroundColor = arrcolorfg[posicao];

});



let interpolate = function () {
    
    if (document.getElementById("frontslide").scrollLeft > para - 4) {
        document.getElementById("frontslide").scrollLeft = document.getElementById("frontslide").scrollLeft - 5;
    }

    if (document.getElementById("frontslide").scrollLeft < para + 4) {
        document.getElementById("frontslide").scrollLeft = document.getElementById("frontslide").scrollLeft + 5;
    }

    if (document.getElementById("frontslide").scrollLeft >= para - 2.5 && document.getElementById("frontslide").scrollLeft <= para + 2.5) {

        document.getElementById("frontslide").scrollLeft = para;

        if (typeof vai != "undefined" && vai != null) {
            clearInterval(vai);
        }
    }
}

var keymapping = {};
onkeydown = onkeyup = function(e){
  e = e || event;
  keymapping[e.keyCode] = e.type == 'keydown';
    
  let posicao = parseInt(document.getElementById("frontslide").scrollLeft / window.innerWidth);

  // Exemple of two keys together
  if (keymapping[39]) {
      keymapping[39] = false; // always set them to false to release
      
      let onde = window.innerWidth * (posicao + 1);
      para = onde;
      vai = setInterval(interpolate,1);
      //document.getElementById("frontslide").scrollLeft = onde;
  }
    
  if (keymapping[40]) {
      keymapping[40] = false; // always set them to false to release
      
      let onde = window.innerWidth * (posicao + 1);
      para = onde;
      vai = setInterval(interpolate,1);
      //document.getElementById("frontslide").scrollLeft = onde;
  }
    
  if (keymapping[37]) {
      keymapping[37] = false; // always set them to false to release
      
      let onde = window.innerWidth * (posicao - 1);
      para = onde;
      vai = setInterval(interpolate,1);
      //document.getElementById("frontslide").scrollLeft = onde;
  }

  if (keymapping[38]) {
      keymapping[38] = false; // always set them to false to release
      
      let onde = window.innerWidth * (posicao - 1);
      para = onde;
      vai = setInterval(interpolate,1);
      //document.getElementById("frontslide").scrollLeft = onde;
  }  
}

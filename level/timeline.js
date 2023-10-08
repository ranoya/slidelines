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
let rodandoajeita = false;

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

let indicenav = document.createElement('div');
indicenav.setAttribute('id', 'indice');
document.lastChild.appendChild(indicenav);


if ((window.navigator.platform.toString().indexOf("Win") >= 0 || window.navigator.platform.toString().indexOf("Linux") >= 0) || (typeof $_GET['fixascroll'] != "undefined" && $_GET['fixascroll'] != null && $_GET['fixascroll'] != "")) {

    let restora = `
    <style>

        ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        background-color: var(--base-background, #ffffff);
        }

        ::-webkit-scrollbar-track {
        background: var(--base-background, #ffffff);
        }

        ::-webkit-scrollbar:hover {
        background-color: var(--palco-c1, #afb9bb);
        }

        ::-webkit-scrollbar-thumb {
        background: var(--timeline-text-color, #777777);
        }

        ::-webkit-scrollbar-thumb:hover {
        background: var(--timeline-text-over, #ff0000);
        }

        :root {
        --slide-altura: calc(100vh - 70px);
        }

        #frontslide {
            overflow-x: scroll;
        }

    </style>

    `;

    document.write(restora);

}


// FUNÇÃO DE FETCH DE ARQUIVO JSON

arquivojson = $_GET['file'];
fetch(arquivojson).then(response => response.json()).then((dados) => {

    // document.getElementById("frontslide").style.width = (dados.length * 100) + "vw";

    let tituloscode = "";
    let contat = 0;
    let i=0;
    while (i < dados.length) {
        
        let tituloatual = dados[i].titulo;
        let contat = 0;

        for (let k = i; k < dados.length; k++) {
            
            if (dados[k].titulo == dados[i].titulo) {
                contat++;
            }

        }

        tituloscode += `<div class="track" style='position: sticky; height: 60px; top: 0; left: 0; margin-left: ${i * 100}vw; z-index: ${200 + i}; width: ${contat * 100}vw; background-color: ${dados[i].titulofundo}; color: ${dados[i].titulofrente}'>${tituloatual}</div>`;

        i = i + contat;

    }



    let code = "";
    dados.map((d,i) => {

        arrcolorfg[i] = d.frente;
        arrcolorbg[i] = d.fundo;
        
        if (d.tipo == "imagem" || d.link.toString().match(/(\.png|\.jpg|\.svg)/i)) {
            code += `<div class='slidewrap' style='background-color: ${d.fundo};'>

            <div class='slideitself' style='background-color: ${d.fundo}; background-image: url(${d.link});'></div></div>`;
        } else if (d.link.toString().match(/\.md/i)) {
            code += `<div class='slidewrap' style='background-color: ${d.fundo};'>
            
            <iframe class='slideitself' frameborder=0 src='https://www.ranoya.com/aulas/tryit/markdown2/slimTransp.html?embed=plain&file=${d.link}'></iframe></div>`;
        } else {
            code += `<div class='slidewrap' style='background-color: ${d.fundo};'>
        
            <iframe class='slideitself' frameborder=0 src='${d.link}'></iframe></div>`;
        }

    });

    document.getElementById("frontslide").innerHTML = tituloscode + code;

});



document.addEventListener("wheel", (event) => {

    if (!rodandoajeita) {
        ajeita();
    }
    
    clearTimeout(vai);

    document.getElementById("frontslide").scrollLeft += event.deltaY;

    let posicao = parseInt(document.getElementById("frontslide").scrollLeft / window.innerWidth);
    
    document.getElementById("minimaln").innerHTML = arrtitulo[posicao];
    document.getElementById("minimaln").style.color = arrcolorfg[posicao];
    document.getElementById("indice").innerHTML = posicao + 1;
    document.getElementById("indice").style.color = arrcolorbg[posicao];
    document.getElementById("indice").style.backgroundColor = arrcolorfg[posicao];

    vai = setTimeout(parou, 600);
    
});

let parou = function () {
    ajeita("finaliza");
}

let ajeita = function (fecha) {
    
    rodandoajeita = true;

    if (fecha == "finaliza") {
        rodandoajeita = false;
    }

    let sl = document.getElementsByClassName("slidewrap");

    let slit = document.getElementsByClassName("slideitself"); 

    if (typeof $_GET['noredux'] == "undefined" || $_GET['noredux'] == null || $_GET['noredux'] == "") {

        for (let i = 0; i < sl.length; i++) {
            sl[i].classList.remove("fullfrontslide");
        }

        for (let i = 0; i < slit.length; i++) {
            slit[i].classList.remove("fullslide");
        }
    }

    if (document.getElementById("frontslide").scrollLeft % window.innerWidth < 150) {

        document.getElementById("frontslide").scrollLeft = document.getElementById("frontslide").scrollLeft - (document.getElementById("frontslide").scrollLeft % window.innerWidth);
    }

    

        if (document.getElementById("frontslide").scrollLeft % window.innerWidth == 0) {
            for (let i = 0; i < sl.length; i++) {
                sl[i].classList.add("fullfrontslide");
            }

            for (let i = 0; i < slit.length; i++) {
                slit[i].classList.add("fullslide");
            }
        }
        
    

}

document.getElementById("frontslide").addEventListener("scroll", (event) => {

    if (!rodandoajeita) {
        ajeita();
    }
    
    clearTimeout(vai);

    let posicao = parseInt(document.getElementById("frontslide").scrollLeft / window.innerWidth);
    document.getElementById("minimaln").innerHTML = arrtitulo[posicao];
    document.getElementById("minimaln").style.color = arrcolorfg[posicao];
    document.getElementById("indice").innerHTML = posicao + 1;
    document.getElementById("indice").style.color = arrcolorbg[posicao];
    document.getElementById("indice").style.backgroundColor = arrcolorfg[posicao];

    document.getElementById("frontslide").classList.remove("fullfrontslide");

    vai = setTimeout(parou, 600);

});




var keymapping = {};
onkeydown = onkeyup = function(e){
  e = e || event;
  keymapping[e.keyCode] = e.type == 'keydown';
    
  let posicao = parseInt(document.getElementById("frontslide").scrollLeft / window.innerWidth);

  clearTimeout(vai);

  // Exemple of two keys together
  if (keymapping[39]) {
      keymapping[39] = false; // always set them to false to release
      
      ajeita();

      let onde = window.innerWidth * (posicao + 1);
  
      document.getElementById("frontslide").scrollTo({
        left: onde,
        behavior: "smooth",
      });

       vai = setTimeout(parou, 600);
  }
    
  if (keymapping[40]) {
      keymapping[40] = false; // always set them to false to release
      
      ajeita();

      let onde = window.innerWidth * (posicao + 1);
  
      document.getElementById("frontslide").scrollTo({
        left: onde,
        behavior: "smooth",
      });

      vai = setTimeout(parou, 600);
  }
    
  if (keymapping[37]) {
      keymapping[37] = false; // always set them to false to release
      
      ajeita();

      let onde = window.innerWidth * (posicao - 1);
      
      document.getElementById("frontslide").scrollTo({
        left: onde,
        behavior: "smooth",
      });

      vai = setTimeout(parou, 600);
  }

  if (keymapping[38]) {
      keymapping[38] = false; // always set them to false to release
      
      ajeita();

      let onde = window.innerWidth * (posicao - 1);
    
      document.getElementById("frontslide").scrollTo({
        left: onde,
        behavior: "smooth",
      });

      vai = setTimeout(parou, 600);
  }  
}

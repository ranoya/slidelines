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
let lobody = document.getElementById("frontslide");

let vai = "";

if ($_GET['s'] != "" && typeof $_GET['s'] != "undefined" && $_GET['s'] != null) {
    actualpage = parseInt($_GET['s']);
}

let estilo = document.createElement('link');
estilo.setAttribute('rel', 'stylesheet');
estilo.setAttribute('type', 'text/css');
estilo.setAttribute('href', "https://slidelines.vercel.app/level/timeline.css" );
document.lastChild.appendChild(estilo);

if ($_GET['theme'] != "" && typeof $_GET['theme'] != "undefined") {
    let estilo2 = document.createElement('link');
    estilo2.setAttribute('rel', 'stylesheet');
    estilo2.setAttribute('type', 'text/css');
    estilo2.setAttribute('href', $_GET['theme']);
    document.lastChild.appendChild(estilo2);
}


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
        background-color: var(--timeline-text-over, #ff0000);
        }

        ::-webkit-scrollbar-thumb {
        background: var(--timeline-text-color, #777777);
        }

        ::-webkit-scrollbar-thumb:hover {
        background: var(--timeline-text-over, #ff0000);
        }

        #frontslide {
            overflow-x: scroll;
        }

        .slides {
            height: calc(100vh - (3 * var(--track-height, 60px)) - 10px);

        }

        .slidewrap {
            height: calc(100vh - (3 * var(--track-height, 60px)) - 10px);
        }

    </style>

    `;

    lobody.innerHTML += restora;

}


// FUNÇÃO DE FETCH DE ARQUIVO JSON

let arquivojson = "https://opensheet.elk.sh/10UW1pPs4BfNC7q0U4grAEBW8NicLP4evtPLoLyPtY1A/Example";

if (typeof $_GET['file'] != "undefined" && $_GET['file'] != null && $_GET['file'] != "") {
    arquivojson = $_GET['file'];
}

fetch(arquivojson).then(response => response.json()).then((dados) => {

    // document.getElementById("frontslide").style.width = (dados.length * 100) + "vw";

    let tituloscode = ``;
    let contat = 0;
    let i = 0;
    while (i < dados.length) {
        
        let tituloatual = dados[i].titulo;
        let contat = 0;

        for (let k = i; k < dados.length; k++) {
            
            if (dados[k].titulo == dados[i].titulo) {
                contat++;
            } else {
                break;
            }

        }

        tituloscode += `<div class="track" style='display: inline-block; position: sticky; margin: 0; padding: 0; top: 0; left: 0; width: 100vw; margin-right: ${(contat - 1) * 100}vw; z-index: ${200 + i}; background-color: ${dados[i].titulofundo}; color: ${dados[i].titulofrente}'><span style='margin-left: var(--meta-margins, 30px);'>${tituloatual}</span></div>`;

        i = i + contat;

    }


    lobody.innerHTML += `<div id='tracktitulos' class='fulltrack' style='width: ${dados.length * 100}vw;'>${tituloscode}</div>`;

    let subtituloscode = ``;
    contat = 0;
    i = 0;
    while (i < dados.length) {
        
        let subtituloatual = dados[i].subtitulo;
        let contat = 0;

        for (let k = i; k < dados.length; k++) {
            
            if (dados[k].subtitulo == dados[i].subtitulo) {
                contat++;
            } else {
                break;
            }

        }

        subtituloscode += `<div class="track" style='display: inline-block; position: sticky; margin: 0; padding: 0; top: 0; left: 0; width: 100vw; margin-right: ${(contat - 1) * 100}vw; z-index: ${200 + i}; background-color: ${dados[i].subtitulofundo}; color: ${dados[i].subtitulofrente}'><span style='margin-left: var(--meta-margins, 30px);'>${subtituloatual}</span></div>`;

        i = i + contat;

    }


    lobody.innerHTML += `<div id='tracksubtitulos' class='fulltrack' style='width: ${dados.length * 100}vw;'>${subtituloscode}</div>`;


    let topicoscode = ``;
    contat = 0;
    i = 0;
    while (i < dados.length) {
        
        let subtituloatual = dados[i].topicos;
        let contat = 0;

        for (let k = i; k < dados.length; k++) {
            
            if (dados[k].topicos == dados[i].topicos) {
                contat++;
            } else {
                break;
            }

        }

        topicoscode += `<div class="track" style='display: inline-block; position: sticky; margin: 0; padding: 0; top: 0; left: 0; width: 100vw; margin-right: ${(contat - 1) * 100}vw; z-index: ${200 + i}; background-color: ${dados[i].fundo}; color: ${dados[i].frente}'><span style='margin-left: var(--meta-margins, 30px);'>${subtituloatual}</span></div>`;

        i = i + contat;

    }


    lobody.innerHTML += `<div id='tracktopicos' class='fulltrack' style='width: ${dados.length * 100}vw;'>${topicoscode}</div>`;

    let slidescode = ``;


    i = 0;
    while (i < dados.length) {

        arrcolorfg[i] = dados[i].fundo;
        arrcolorbg[i] = dados[i].frente;
                
        if (dados[i].tipo == "imagem" || dados[i].link.toString().match(/(\.png|\.jpg|\.svg)/i)) {
            slidescode += `<div class='slidewrap' style='background-color: ${dados[i].fundo};'>

            <div class='slideitself' style='background-color: ${dados[i].fundo}; background-image: url(${dados[i].link});'></div></div>`;
        } else if (dados[i].link.toString().match(/\.md/i)) {
            slidescode += `<div class='slidewrap' style='background-color: ${dados[i].fundo};'>
            
            <iframe class='slideitself' frameborder=0 src='https://www.ranoya.com/aulas/tryit/markdown2/slimTransp.html?embed=plain&file=${dados[i].link}'></iframe></div>`;
        } else {
            slidescode += `<div class='slidewrap' style='background-color: ${dados[i].fundo};'>
        
            <iframe class='slideitself' frameborder=0 src='${dados[i].link}'></iframe></div>`;
        }

        i++;
    }

    lobody.innerHTML += `<div id='slides' class='slides' style='width: ${dados.length * 100}vw;'>${slidescode}</div>`;

});





document.addEventListener("wheel", (event) => {

    if (!rodandoajeita) {
        ajeita();
    }
    
    clearTimeout(vai);

    document.getElementById("frontslide").scrollLeft += event.deltaY;

    let posicao = parseInt(document.getElementById("frontslide").scrollLeft / window.innerWidth);
    
    document.getElementById("indice").innerHTML = posicao + 1;
    document.getElementById("indice").style.color = arrcolorfg[posicao];
    document.getElementById("indice").style.backgroundColor = arrcolorbg[posicao];

    vai = setTimeout(parou, 300);
    
});

let parou = function () {
    ajeita("finaliza");
}

let ajeita = function (fecha) {
    
    rodandoajeita = true;

    if (fecha == "finaliza") {
        rodandoajeita = false;
    }

 

    if (document.getElementById("frontslide").scrollLeft % window.innerWidth < window.innerWidth / 2.5) {
        
        let posicao = parseInt(document.getElementById("frontslide").scrollLeft / window.innerWidth);

        let onde = window.innerWidth * posicao;
  
        document.getElementById("frontslide").scrollTo({
            left: onde,
            behavior: "smooth",
        });

        // document.getElementById("frontslide").scrollLeft = document.getElementById("frontslide").scrollLeft - (document.getElementById("frontslide").scrollLeft % window.innerWidth);
    }

    if (document.getElementById("frontslide").scrollLeft % window.innerWidth > 600) {

        let posicao = parseInt(document.getElementById("frontslide").scrollLeft / window.innerWidth);

        let onde = window.innerWidth * (posicao + 1);
  
        document.getElementById("frontslide").scrollTo({
            left: onde,
            behavior: "smooth",
        });

        // document.getElementById("frontslide").scrollLeft = document.getElementById("frontslide").scrollLeft + (document.getElementById("frontslide").scrollLeft % window.innerWidth);
    }

    
}

document.getElementById("frontslide").addEventListener("scroll", (event) => {

    if (!rodandoajeita) {
        ajeita();
    }
    
    clearTimeout(vai);

    let posicao = parseInt(document.getElementById("frontslide").scrollLeft / window.innerWidth);

    document.getElementById("indice").innerHTML = posicao + 1;
    document.getElementById("indice").style.color = arrcolorfg[posicao];
    document.getElementById("indice").style.backgroundColor = arrcolorbg[posicao];

    vai = setTimeout(parou, 300);

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

       vai = setTimeout(parou, 300);
  }
    
  if (keymapping[34]) {
      keymapping[34] = false; // always set them to false to release
      
      ajeita();

      let onde = window.innerWidth * (posicao + 1);
  
      document.getElementById("frontslide").scrollTo({
        left: onde,
        behavior: "smooth",
      });

       vai = setTimeout(parou, 300);
  }
    
  if (keymapping[40]) {
      keymapping[40] = false; // always set them to false to release
      
      ajeita();

      let onde = window.innerWidth * (posicao + 1);
  
      document.getElementById("frontslide").scrollTo({
        left: onde,
        behavior: "smooth",
      });

      vai = setTimeout(parou, 300);
  }
    
  if (keymapping[37]) {
      keymapping[37] = false; // always set them to false to release
      
      ajeita();

      let onde = window.innerWidth * (posicao - 1);
      
      document.getElementById("frontslide").scrollTo({
        left: onde,
        behavior: "smooth",
      });

      vai = setTimeout(parou, 300);
  }

  if (keymapping[38]) {
      keymapping[38] = false; // always set them to false to release
      
      ajeita();

      let onde = window.innerWidth * (posicao - 1);
    
      document.getElementById("frontslide").scrollTo({
        left: onde,
        behavior: "smooth",
      });

      vai = setTimeout(parou, 300);
    }  
    
  if (keymapping[33]) {
      keymapping[33] = false; // always set them to false to release
      
      ajeita();

      let onde = window.innerWidth * (posicao - 1);
    
      document.getElementById("frontslide").scrollTo({
        left: onde,
        behavior: "smooth",
      });

      vai = setTimeout(parou, 300);
  }  
}



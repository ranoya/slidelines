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
let todosslides = [];
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
estilo.setAttribute('href', "https://slidelines.vercel.app/timelineh/timeline.css" );
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

let timeframe = document.createElement('div');
timeframe.setAttribute('id', 'tempo');
document.lastChild.appendChild(timeframe);

let nextnav = document.createElement('div');
nextnav.setAttribute('id', 'next');
nextnav.setAttribute('onclick', 'gonext()');
document.lastChild.appendChild(nextnav);

let prevnav = document.createElement('div');
prevnav.setAttribute('id', 'prev');
prevnav.setAttribute('onclick', 'goprev()');
document.lastChild.appendChild(prevnav);



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

    todosslides = dados;

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



    let anoscode = ``;
    contat = 0;
    i = 0;
    while (i < dados.length) {
        
        let tituloatual = dados[i].ano;
        let contat = 0;

        for (let k = i; k < dados.length; k++) {
            
            if (dados[k].ano == dados[i].ano) {
                contat++;
            } else {
                break;
            }

        }

        anoscode += `<div class="linhadotempo" style='display: inline-block; margin: 0; padding: 0; top: 0; left: 0; width: 5vw; margin-right: ${(contat - 1) * 5}vw; z-index: ${600 + i};'><span class='registroano'>${tituloatual}</span></div>`;

        i = i + contat;

    }

    document.getElementById("tempo").innerHTML = `<div id="fulltempo" style="width: ${i*5}vw;">${anoscode}</div>`;


    

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
                
        if (i > actualpage - 3 && i < actualpage + 3) {
        if (dados[i].tipo == "imagem" || dados[i].link.toString().match(/(\.png|\.jpg|\.svg)/i)) {
            slidescode += `<div id='allslides${i}' onclick="gonext()" class='slidewrap' style='cursos: pointer; background-color: ${dados[i].fundo};'>

            <div class='slideitself' style='background-color: ${dados[i].fundo}; background-image: url(${dados[i].link});'></div>

            </div>`;
        } else if (dados[i].link.toString().match(/\.md/i)) {
            slidescode += `<div id='allslides${i}' class='slidewrap' style='background-color: ${dados[i].fundo};'>

            <iframe class='slideitself' frameborder=0 src='https://www.ranoya.com/aulas/tryit/markdown2/slimTransp.html?embed=plain&file=${dados[i].link}'></iframe>
            
            </div>`;
        } else {
            slidescode += `<div id='allslides${i}' class='slidewrap' style='background-color: ${dados[i].fundo};'>

            <iframe class='slideitself' frameborder=0 src='${dados[i].link}'></iframe>
        
            </div>`;
        }
            
        } else {
            
            if (dados[i].tipo == "imagem" || dados[i].link.toString().match(/(\.png|\.jpg|\.svg)/i)) {
            slidescode += `<div id='allslides${i}' onclick="gonext()" class='slidewrap' style='cursos: pointer; background-color: ${dados[i].fundo};'>

            </div>`;
        } else if (dados[i].link.toString().match(/\.md/i)) {
            slidescode += `<div id='allslides${i}' class='slidewrap' style='background-color: ${dados[i].fundo};'>
            
            </div>`;
        } else {
            slidescode += `<div id='allslides${i}' class='slidewrap' style='background-color: ${dados[i].fundo};'>
        
            </div>`;
        }
    }

        i++;
    }

    lobody.innerHTML += `<div id='slides' class='slides' style='width: ${dados.length * 100}vw;'>${slidescode}</div>`;

});


const putslides = function (posicao) {

    actualpage = posicao;


    for (let i = 0; i < todosslides.length; i++) {

            if (i >= actualpage - 3 && i <= actualpage + 3 && document.getElementById('allslides' + i).innerHTML == "") {

                if (todosslides[i].tipo == "imagem" || todosslides[i].link.toString().match(/(\.png|\.jpg|\.svg)/i)) {
                    
                    document.getElementById('allslides' + i).innerHTML = `<div class='slideitself' style='background-color: ${todosslides[i].fundo}; background-image: url(${todosslides[i].link});'></div>`;
                } else if (todosslides[i].link.toString().match(/\.md/i)) {

                    document.getElementById('allslides' + i).innerHTML = `<iframe class='slideitself' frameborder=0 src='https://www.ranoya.com/aulas/tryit/markdown2/slimTransp.html?embed=plain&file=${todosslides[i].link}'></iframe>`;

                } else {
                    
                    document.getElementById('allslides' + i).innerHTML = `<iframe class='slideitself' frameborder=0 src='${todosslides[i].link}'></iframe>`;

                }

            }



            if (i < actualpage - 3 || i > actualpage + 3) {

                if (todosslides[i].tipo == "imagem" || todosslides[i].link.toString().match(/(\.png|\.jpg|\.svg)/i)) {
                    
                    document.getElementById('allslides' + i).innerHTML = ``;
                } else if (todosslides[i].link.toString().match(/\.md/i)) {

                    document.getElementById('allslides' + i).innerHTML = ``;

                } else {
                    
                    document.getElementById('allslides' + i).innerHTML = ``;
                    
                }

            }




        }

    
}



document.addEventListener("wheel", (event) => {

    if (typeof $_GET['allowverticalscroll'] != "undefined" && $_GET['allowverticalscroll'] != null && $_GET['allowverticalscroll'] != "") {

        let posicao = parseInt(document.getElementById("frontslide").scrollLeft / window.innerWidth);

        if (!rodandoajeita) {
            ajeita();
        }
    
        clearTimeout(vai);

        document.getElementById("frontslide").scrollLeft += event.deltaY;

        document.getElementById("tempo").scrollLeft += event.deltaY/5;

        
    
        document.getElementById("indice").innerHTML = posicao + 1;
        document.getElementById("indice").style.color = arrcolorfg[posicao];
        document.getElementById("indice").style.backgroundColor = arrcolorbg[posicao];

        document.documentElement.style.setProperty('--button-color', arrcolorbg[posicao]);
        document.documentElement.style.setProperty('--track-fg', arrcolorbg[posicao]);
        document.documentElement.style.setProperty('--track-bg', arrcolorfg[posicao]);

        vai = setTimeout(parou, 300);

        putslides(posicao);
        
    }
});

let parou = function () {
    ajeita("finaliza");
}

let ajeita = function (fecha) {
    
    rodandoajeita = true;

    if (fecha == "finaliza") {
        rodandoajeita = false;
    }

    let posicao = 0;


 

    if (document.getElementById("frontslide").scrollLeft % window.innerWidth < window.innerWidth / 2.5) {
        
        posicao = parseInt(document.getElementById("frontslide").scrollLeft / window.innerWidth);

        let onde = window.innerWidth * posicao;
  
        document.getElementById("frontslide").scrollTo({
            left: onde,
            behavior: "smooth",
        });

        document.getElementById("tempo").scrollTo({
            left: onde/20,
            behavior: "smooth",
        });

        // document.getElementById("frontslide").scrollLeft = document.getElementById("frontslide").scrollLeft - (document.getElementById("frontslide").scrollLeft % window.innerWidth);
    }

    if (document.getElementById("frontslide").scrollLeft % window.innerWidth > 600) {

        posicao = parseInt(document.getElementById("frontslide").scrollLeft / window.innerWidth);

        let onde = window.innerWidth * (posicao + 1);
  
        document.getElementById("frontslide").scrollTo({
            left: onde,
            behavior: "smooth",
        });

        document.getElementById("tempo").scrollTo({
            left: onde/20,
            behavior: "smooth",
        });

        // document.getElementById("frontslide").scrollLeft = document.getElementById("frontslide").scrollLeft + (document.getElementById("frontslide").scrollLeft % window.innerWidth);
    }

    putslides(posicao);

            
    if (!rodandoajeita) {
        ajeita();
    }

    
}

document.getElementById("frontslide").addEventListener("scroll", (event) => {

    if (!rodandoajeita) {
        ajeita();
    }
    
    clearTimeout(vai);

    let posicao = parseInt(document.getElementById("frontslide").scrollLeft / window.innerWidth);

    document.getElementById("tempo").scrollLeft = document.getElementById("frontslide").scrollLeft / 20;

    document.getElementById("indice").innerHTML = posicao + 1;
    document.getElementById("indice").style.color = arrcolorfg[posicao];
    document.getElementById("indice").style.backgroundColor = arrcolorbg[posicao];

    document.documentElement.style.setProperty('--button-color', arrcolorbg[posicao]);
    document.documentElement.style.setProperty('--track-fg', arrcolorbg[posicao]);
    document.documentElement.style.setProperty('--track-bg', arrcolorfg[posicao]);

    vai = setTimeout(parou, 300);

    putslides(posicao);

});

/*
document.getElementById("tempo").addEventListener("scroll", (event) => {

    if (!rodandoajeita) {
        ajeita();
    }
    
    clearTimeout(vai);

    document.getElementById("frontslide").scrollLeft = document.getElementById("frontslide").scrollLeft * 20;

    let posicao = parseInt(document.getElementById("frontslide").scrollLeft / window.innerWidth);

    document.getElementById("indice").innerHTML = posicao + 1;
    document.getElementById("indice").style.color = arrcolorfg[posicao];
    document.getElementById("indice").style.backgroundColor = arrcolorbg[posicao];

    document.documentElement.style.setProperty('--button-color', arrcolorbg[posicao]);
    document.documentElement.style.setProperty('--track-fg', arrcolorbg[posicao]);
    document.documentElement.style.setProperty('--track-bg', arrcolorfg[posicao]);

    vai = setTimeout(parou, 300);

    putslides(posicao);

});

*/




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

let gonext = function () {

    let posicao = parseInt(document.getElementById("frontslide").scrollLeft / window.innerWidth);

    ajeita();

      let onde = window.innerWidth * (posicao + 1);
  
      document.getElementById("frontslide").scrollTo({
        left: onde,
        behavior: "smooth",
      });

       vai = setTimeout(parou, 300);
    
}

let goprev = function () {

    let posicao = parseInt(document.getElementById("frontslide").scrollLeft / window.innerWidth);
    
    ajeita();

      let onde = window.innerWidth * (posicao - 1);
    
      document.getElementById("frontslide").scrollTo({
        left: onde,
        behavior: "smooth",
      });

      vai = setTimeout(parou, 300);
}


document.addEventListener("DOMContentLoaded", (e) => {

    let posicao = 0;

    document.getElementById("indice").innerHTML = posicao + 1;
    document.getElementById("indice").style.color = arrcolorfg[posicao];
    document.getElementById("indice").style.backgroundColor = arrcolorbg[posicao];

    document.documentElement.style.setProperty('--button-color', arrcolorbg[posicao]);
    document.documentElement.style.setProperty('--track-fg', arrcolorbg[posicao]);
    document.documentElement.style.setProperty('--track-bg', arrcolorfg[posicao]);


});

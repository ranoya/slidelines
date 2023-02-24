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

if ($_GET['s'] != "" && typeof $_GET['s'] != "undefined" && $_GET['s'] != null) {
    actualpage = parseInt($_GET['s']);
}

let estilo = document.createElement('link');
estilo.setAttribute('rel', 'stylesheet');
estilo.setAttribute('type', 'text/css');
estilo.setAttribute('href', "https://slidelines.vercel.app/timeline.css" );
document.lastChild.appendChild(estilo);

if ($_GET['theme'] != "" && typeof $_GET['theme'] != "undefined") {
    let estilo2 = document.createElement('link');
    estilo2.setAttribute('rel', 'stylesheet');
    estilo2.setAttribute('type', 'text/css');
    estilo2.setAttribute('href', $_GET['theme']);
    document.lastChild.appendChild(estilo2);
}

let bigslider = document.createElement('div');
bigslider.setAttribute('id', 'slider');
bigslider.setAttribute('class', 'sliderinicial');
document.lastChild.appendChild(bigslider);

let page1 = document.createElement('div');
page1.setAttribute('id', 'sliding1');
document.lastChild.appendChild(page1);

let page2 = document.createElement('div');
page2.setAttribute('id', 'sliding2');
page2.setAttribute('class', 'frontpageinicial');
document.lastChild.appendChild(page2);

let page3 = document.createElement('div');
page3.setAttribute('id', 'sliding3');
document.lastChild.appendChild(page3);

let frontpage = document.createElement('div');
frontpage.setAttribute('id', 'frontslide');
frontpage.setAttribute('class', 'frontpageinicial');
document.lastChild.appendChild(frontpage);

let metapage = document.createElement('div');
metapage.setAttribute('id', 'paginacao');
metapage.setAttribute('class', 'prabaixo');
document.lastChild.appendChild(metapage);

let metapage2 = document.createElement('div');
metapage2.setAttribute('id', 'titulodoslide');
metapage2.setAttribute('class', 'pracima');
document.lastChild.appendChild(metapage2);

let metapage3 = document.createElement('div');
metapage3.setAttribute('id', 'loslinks');
metapage3.setAttribute('class', 'pracima');
document.lastChild.appendChild(metapage3);


let metapage4 = document.createElement('div');
metapage4.setAttribute('id', 'setaesquerda');
metapage4.setAttribute('class', 'setas');
document.lastChild.appendChild(metapage4);


let metapage5 = document.createElement('div');
metapage5.setAttribute('id', 'setadireita');
metapage5.setAttribute('class', 'setas');
document.lastChild.appendChild(metapage5);


inserecoisacerta = function (oque, onde, tipo, fundo) {

    if (typeof tipo == "undefined") {
        tipo = "";
    }

    if (typeof fundo == "undefined") {
        fundo = "#FFFFFF";
    }

    if (tipo == "imagem" || oque.match(/(\.png|\.jpg|\.svg)/i)) {

        xpto = `<div onclick="forward()" style='width: 100%; height: 100%; background-color: ${fundo}; background-image: url(${oque}); background-position: center center; background-size: contain; background-repeat: no-repeat;'></div>`;
        document.getElementById(onde).innerHTML = xpto;

    } else if (oque.match(/\.md/i)) {

        xpto = `<iframe frameborder=0 style='width: 100vw;' src='https://www.ranoya.com/aulas/tryit/markdown2/slim.html?embed=plain&file=${oque}'></iframe>`;
        document.getElementById(onde).innerHTML = xpto;

    } else {
    
        xpto = `<iframe  style="width: 100vw;" frameborder=0 src="${oque}"></iframe>`;
        document.getElementById(onde).innerHTML = xpto;
    }

}

// FUNÇÃO DE FETCH DE ARQUIVO JSON

arquivojson = $_GET['file'];
fetch(arquivojson).then(response => response.json()).then((dados) => {
    
    if ($_GET['s'] != null && $_GET['s'] != "" && typeof $_GET['s'] != "undefined") {

        document.getElementById("slider").classList.remove('sliderinicial');
        document.getElementById("sliding2").classList.remove('frontpageinicial');
        document.getElementById("frontslide").classList.remove('frontpageinicial');
        document.getElementById("paginacao").classList.remove('prabaixo');
        document.getElementById("titulodoslide").classList.remove('pracima');
        document.getElementById("loslinks").classList.remove('pracima');
        
        
    } else {

       // com capa

    }

    arr = dados;
    
    inserecoisacerta(arr[actualpage].link, "sliding1", arr[actualpage].tipo, arr[actualpage].fundo);
    inserecoisacerta(arr[actualpage].link, "sliding2", arr[actualpage].tipo, arr[actualpage].fundo);
    inserecoisacerta(arr[actualpage + 1].link, "sliding3", arr[actualpage + 1].tipo, arr[actualpage + 1].fundo);
    inserecoisacerta(arr[actualpage].link, "frontslide", arr[actualpage].tipo, arr[actualpage].fundo);

    document.getElementById("paginacao").innerHTML = actualpage;
    document.getElementById("titulodoslide").innerHTML = arr[actualpage].titulo;
    document.getElementById("loslinks").innerHTML = arr[actualpage].menu;


    let innav = "<div class='bignav'>";
    for (let n = 1; n < arr.length; n++) {
        innav += `<a href='javascript:muda(${n});' class='navmenu ${arr[n].labeltype}' id='itemmenu${n}'><div class='bloquinhowrap ${arr[n].labeltype}'><div class='bloquinho ${arr[n].labeltype}'></div></div><div class="textmenu">${arr[n].labeltimeline}</div></a>`;
    }
    innav += "</div>";

    document.getElementById("slider").innerHTML = innav;

    
    document.getElementById("setaesquerda").innerHTML = `
    <a class='navmouse' href='javascript:rewind();'>
    <svg width='100%' viewBox="0 0 131 222" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M96.9218 215.896L6.05198 125.026C-1.70873 117.265 -1.70874 104.683 6.05198 96.9219L96.9218 6.05208C104.682 -1.70861 117.265 -1.7086 125.026 6.05211C132.787 13.8128 132.787 26.3954 125.026 34.1562C125.018 34.1645 125.009 34.1727 125.001 34.181L48.2081 110.974L125.026 187.792C132.787 195.552 132.787 208.135 125.026 215.896C117.265 223.656 104.682 223.656 96.9218 215.896Z" fill="var(--pagination-color, #777777)"/>
    </svg>
    </a>
    `;

    document.getElementById("setadireita").innerHTML = `
    <a class='navmouse' href='javascript:forward();'>
    <svg width="100%" viewBox="0 0 131 222" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.9247 6.05213L124.794 96.9219C132.555 104.683 132.555 117.265 124.794 125.026L33.9247 215.896C26.1639 223.656 13.5813 223.656 5.82061 215.896C-1.94012 208.135 -1.94012 195.552 5.82061 187.792C5.82891 187.783 5.83723 187.775 5.84552 187.767L82.6384 110.974L5.82061 34.1562C-1.94011 26.3955 -1.94011 13.8129 5.82061 6.05214C13.5813 -1.70858 26.164 -1.70859 33.9247 6.05213Z" fill="var(--pagination-color, #777777)"/>
    </svg>
    </a>
    `;

    

    document.getElementById("slider").focus();

    document.getElementsByClassName("bignav")[0].style.width = (arr.length * 33) + "px";



    acende(actualpage);
       
});







// ACENDE MENU CERTO

acende = function (n) {
    for (let z = 1; z < arr.length; z++) {
        if (z != n) {
            document.getElementById("itemmenu" + z).classList.remove("ligado");
        } else {
            document.getElementById("itemmenu" + z).classList.add("ligado");
        }
    }
}





// ACERTA FUNÇÃO
changeworking = false;

muda = function (wh) {

    if (!changeworking) {
        if (actualpage > wh) {
            rewind(wh);
        }

        if (actualpage < wh) {
            forward(wh);
        }
    }

    document.getElementById("slider").focus();
} 


// FUNÇÃO FORWARD

forward = function (hm) {


    document.getElementById("slider").classList.remove('sliderinicial');
    document.getElementById("sliding2").classList.remove('frontpageinicial');
    document.getElementById("frontslide").classList.remove('frontpageinicial');
    document.getElementById("paginacao").classList.remove('prabaixo');
    document.getElementById("titulodoslide").classList.remove('pracima');
    document.getElementById("loslinks").classList.remove('pracima');

    changeworking = true;
    if (hm == "" || typeof hm == "undefined" || hm == null) {

        hm = actualpage + 1;

    }

    
    
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    document.getElementById("slider").scrollLeft = (hm *33) - (w/2) + 15 ;

    if (hm < arr.length) {

        acende(hm);

        document.getElementById("frontslide").style.top = "-200vw";
        inserecoisacerta(arr[hm].link, "frontslide", arr[hm].tipo, arr[hm].fundo);

        //inserecoisacerta(arr[hm].link, "sliding3", arr[hm].tipo, arr[hm].fundo);

        setTimeout(function () {

            document.getElementById("sliding1").style.transition = "all .6s ease-in-out";
            document.getElementById("sliding2").style.transition = "all .6s ease-in-out";
            document.getElementById("sliding3").style.transition = "all .6s ease-in-out";
    
            document.getElementById("sliding1").style.left = "-200vw";
            document.getElementById("sliding2").style.left = "-100vw";
            document.getElementById("sliding3").style.left = 0;

        }, 25);

        setTimeout(function () {

            inserecoisacerta(arr[hm].link, "sliding2", arr[hm].tipo, arr[hm].fundo);
            actualpage = hm;
            document.getElementById("paginacao").innerHTML = actualpage;
            document.getElementById("titulodoslide").innerHTML = arr[hm].titulo;
            document.getElementById("loslinks").innerHTML = arr[hm].menu;

        }, 626);

        setTimeout(function () {

            document.getElementById("frontslide").style.top = "60px";

            document.getElementById("sliding1").style.transition = "none";
            document.getElementById("sliding2").style.transition = "none";
            document.getElementById("sliding3").style.transition = "none";

            document.getElementById("sliding1").style.left = "-100vw";
            document.getElementById("sliding2").style.left = 0;
            document.getElementById("sliding3").style.left = "100vw";

            changeworking = false;
            document.getElementById("slider").focus();

            inserecoisacerta(arr[hm].link, "sliding1", arr[hm-1].tipo, arr[hm-1].fundo);
            inserecoisacerta(arr[hm].link, "sliding3", arr[hm+1].tipo, arr[hm+1].fundo);

        }, 680);
        
    } 

    

}

rewind = function (hm) {

    if (hm === "" || typeof hm === "undefined" || hm === null) {

        hm = actualpage - 1;

    }
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    document.getElementById("slider").scrollLeft = (hm *33) - (w/2) + 15 ;
    

    

    if (hm > 0) {

        acende(hm);

        document.getElementById("frontslide").style.top = "-200vw";
        inserecoisacerta(arr[hm].link, "frontslide", arr[hm].tipo, arr[hm].fundo);

        //inserecoisacerta(arr[hm].link, "sliding1", arr[hm].tipo, arr[hm].fundo);

        setTimeout(function () {

            document.getElementById("sliding1").style.transition = "all .6s ease-in-out";
            document.getElementById("sliding2").style.transition = "all .6s ease-in-out";

            document.getElementById("sliding3").style.transition = "none";
            document.getElementById("sliding3").style.left = "-200vw";
         
        }, 2);


        setTimeout(function () {

            document.getElementById("sliding1").style.left = 0;
            document.getElementById("sliding2").style.left = "100vw";
            document.getElementById("sliding3").style.transition = "all .6s ease-in-out";
            document.getElementById("sliding3").style.left = "-100vw";

        }, 25);


        setTimeout(function () {

            inserecoisacerta(arr[hm].link, "sliding2", arr[hm].tipo, arr[hm].fundo);
            actualpage = hm;
            document.getElementById("paginacao").innerHTML = actualpage;
            document.getElementById("titulodoslide").innerHTML = arr[hm].titulo;
            document.getElementById("loslinks").innerHTML = arr[hm].menu;

        }, 640);


        setTimeout(function () {

            document.getElementById("frontslide").style.top = "60px";

            document.getElementById("sliding1").style.transition = "none";
            document.getElementById("sliding2").style.transition = "none";
            document.getElementById("sliding3").style.transition = "none";

            document.getElementById("sliding1").style.left = "-100vw";
            document.getElementById("sliding2").style.left = 0;
            document.getElementById("sliding3").style.left = "100vw";

            inserecoisacerta(arr[hm].link, "sliding1", arr[hm-1].tipo, arr[hm-1].fundo);
            inserecoisacerta(arr[hm].link, "sliding3", arr[hm+1].tipo, arr[hm+1].fundo);

            changeworking = false;
            document.getElementById("slider").focus();

        }, 680);
        
    } 
    

}


document.onkeydown = keydown;

        function keydown(evt) {

            console.log(evt.key);

            if (evt.key == "ArrowRight") {
            
                forward();
            }

            if (evt.key == "ArrowLeft") {
            
                rewind();
            }

            document.getElementById("slider").focus();


        }









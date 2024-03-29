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
let originalslidetopiccolor = "";
let originallittlemenucolor = "";
let originalpaginationcolor = "";
let originallittlemenuover = "";
let originalbackground = "";

if ($_GET['s'] != "" && typeof $_GET['s'] != "undefined" && $_GET['s'] != null) {
    actualpage = parseInt($_GET['s']);
}

let estilo = document.createElement('link');
estilo.setAttribute('rel', 'stylesheet');
estilo.setAttribute('type', 'text/css');
estilo.setAttribute('href', "https://slidelines.vercel.app/continuum/timeline.css" );
document.lastChild.appendChild(estilo);

if ($_GET['theme'] != "" && typeof $_GET['theme'] != "undefined") {
    let estilo2 = document.createElement('link');
    estilo2.setAttribute('rel', 'stylesheet');
    estilo2.setAttribute('type', 'text/css');
    estilo2.setAttribute('href', $_GET['theme']);
    document.lastChild.appendChild(estilo2);
}

let minimalnav = document.createElement('div');
minimalnav.setAttribute('id', 'minimaln');
document.lastChild.appendChild(minimalnav);

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
metapage4.setAttribute('class', 'setas prabaixo');
metapage4.setAttribute('onclick', 'rewind()');
document.lastChild.appendChild(metapage4);


let metapage5 = document.createElement('div');
metapage5.setAttribute('id', 'setadireita');
metapage5.setAttribute('class', 'setas prabaixo');
metapage5.setAttribute('onclick', 'forward()');
document.lastChild.appendChild(metapage5);




inserecoisacerta = function (oque, onde, tipo, fundo) {

    if (actualpage == 0) {
        document.getElementById("frontslide").style.cursor = "pointer";
    } else {
        document.getElementById("frontslide").style.cursor = "auto";
    }

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

        xpto = `<iframe frameborder=0 style='width: 100vw; top: 60px;position: relative;height: calc(100vh - 135px);' src='https://www.ranoya.com/aulas/tryit/markdown2/slimTransp.html?embed=plain&file=${oque}'></iframe>`;
        document.getElementById(onde).innerHTML = xpto;

    } else {
    
        xpto = `<iframe style="width: 100vw;position: relative;top: 60px;height: calc(100vh - 135px);background-color: ${fundo}" frameborder=0 src="${oque}"></iframe>`
        document.getElementById(onde).innerHTML = xpto;
    }

}

// FUNÇÃO DE FETCH DE ARQUIVO JSON

arquivojson = $_GET['file'];
fetch(arquivojson).then(response => response.json()).then((dados) => {
    
    if ($_GET['s'] != null && $_GET['s'] != "" && typeof $_GET['s'] != "undefined") {

        document.getElementById("sliding2").classList.remove('frontpageinicial');
        document.getElementById("frontslide").classList.remove('frontpageinicial');
        document.getElementById("paginacao").classList.remove('prabaixo');
        document.getElementById("setaesquerda").classList.remove('prabaixo');
        document.getElementById("setadireita").classList.remove('prabaixo');
        document.getElementById("titulodoslide").classList.remove('pracima');
        document.getElementById("loslinks").classList.remove('pracima');

        if (parseInt($_GET['s']) >= dados.length - 1) {
            document.getElementById("setadireita").style.display = "none";
        } else {
            document.getElementById("setadireita").style.display = "block";
        }

        if (parseInt($_GET['s']) <= 1) {
            document.getElementById("setaesquerda").style.display = "none";
        } else {
            document.getElementById("setaesquerda").style.display = "block";
        }
        
        
    } else {

       // com capa

    }

    arr = dados;
    originalslidetopiccolor = getComputedStyle(document.body).getPropertyValue('--slidetopic-color');
    originallittlemenucolor = getComputedStyle(document.body).getPropertyValue('--littlemenu-color');
    originalpaginationcolor = getComputedStyle(document.body).getPropertyValue('--pagination-color');
    originallittlemenuover = getComputedStyle(document.body).getPropertyValue('--littlemenu-over');
    originalbackground = getComputedStyle(document.body).getPropertyValue('--base-background');
 
   
    inserecoisacerta(arr[actualpage].link, "sliding1", arr[actualpage].tipo, arr[actualpage].fundo);
    inserecoisacerta(arr[actualpage].link, "sliding2", arr[actualpage].tipo, arr[actualpage].fundo);
    inserecoisacerta(arr[actualpage + 1].link, "sliding3", arr[actualpage + 1].tipo, arr[actualpage + 1].fundo);
    inserecoisacerta(arr[actualpage].link, "frontslide", arr[actualpage].tipo, arr[actualpage].fundo);

    document.getElementById("paginacao").innerHTML = actualpage;
    document.getElementById("titulodoslide").innerHTML = arr[actualpage].titulo;
    document.getElementById("loslinks").innerHTML = arr[actualpage].menu;

    document.getElementById("setaesquerda").innerHTML = `
    <svg width='100%' viewBox="0 0 131 222" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M96.9218 215.896L6.05198 125.026C-1.70873 117.265 -1.70874 104.683 6.05198 96.9219L96.9218 6.05208C104.682 -1.70861 117.265 -1.7086 125.026 6.05211C132.787 13.8128 132.787 26.3954 125.026 34.1562C125.018 34.1645 125.009 34.1727 125.001 34.181L48.2081 110.974L125.026 187.792C132.787 195.552 132.787 208.135 125.026 215.896C117.265 223.656 104.682 223.656 96.9218 215.896Z" fill="var(--pagination-color, #777777)"/>
    </svg>
    `;

    document.getElementById("setadireita").innerHTML = `
    <svg width="100%" viewBox="0 0 131 222" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.9247 6.05213L124.794 96.9219C132.555 104.683 132.555 117.265 124.794 125.026L33.9247 215.896C26.1639 223.656 13.5813 223.656 5.82061 215.896C-1.94012 208.135 -1.94012 195.552 5.82061 187.792C5.82891 187.783 5.83723 187.775 5.84552 187.767L82.6384 110.974L5.82061 34.1562C-1.94011 26.3955 -1.94011 13.8129 5.82061 6.05214C13.5813 -1.70858 26.164 -1.70859 33.9247 6.05213Z" fill="var(--pagination-color, #777777)"/>
    </svg>
    `;


    acende(actualpage);
       
});







// ACENDE MENU CERTO

acende = function (n) {
    for (let z = 1; z < arr.length; z++) {
        if (z != n) {
           //  document.getElementById("itemmenu" + z).classList.remove("ligado");
        } else {
           // document.getElementById("itemmenu" + z).classList.add("ligado");
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


} 


// FUNÇÃO FORWARD

forward = function (hm) {


    document.getElementById("sliding2").classList.remove('frontpageinicial');
    document.getElementById("frontslide").classList.remove('frontpageinicial');
    document.getElementById("paginacao").classList.remove('prabaixo');
    document.getElementById("setaesquerda").classList.remove('prabaixo');
    document.getElementById("setadireita").classList.remove('prabaixo');
    document.getElementById("titulodoslide").classList.remove('pracima');
    document.getElementById("loslinks").classList.remove('pracima');

    changeworking = true;
    if (hm == "" || typeof hm == "undefined" || hm == null) {

        hm = actualpage + 1;

    }

    
    
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;


    if (hm < arr.length) {


        if (hm >= arr.length - 1) {
            document.getElementById("setadireita").style.display = "none";
        } else {
            document.getElementById("setadireita").style.display = "block";
        }

        if (hm <= 1) {
            document.getElementById("setaesquerda").style.display = "none";
        } else {
            document.getElementById("setaesquerda").style.display = "block";
        }



        acende(hm);

        document.getElementById("frontslide").style.top = "-200vw";
        inserecoisacerta(arr[hm].link, "frontslide", arr[hm].tipo, arr[hm].fundo);

        //inserecoisacerta(arr[hm].link, "sliding3", arr[hm].tipo, arr[hm].fundo);

        setTimeout(function () {

            document.getElementById("sliding1").style.transition = "all .6s ease-in-out";
            document.getElementById("sliding2").style.transition = "all .6s ease-in-out";
            document.getElementById("sliding3").style.transition = "all .6s ease-in-out";
            document.getElementById("minimaln").style.transition = "all .6s ease-in-out";
            document.getElementById("minimaln").style.width = parseInt(((hm - 1) / (arr.length - 2)) * 100) + "%";
            document.getElementById("sliding1").style.left = "-200vw";
            document.getElementById("sliding2").style.left = "-100vw";
            document.getElementById("sliding3").style.left = 0;

            if (typeof arr[hm].fundo != "undefined" && arr[hm].fundo != "") {

                document.getElementsByTagName("html")[0].style.backgroundColor = arr[hm].fundo;
            } else {
                document.getElementsByTagName("html")[0].style.backgroundColor = originalbackground;
            }

            if (typeof arr[hm].frente != "undefined" && arr[hm].frente != "") {
                if (typeof arr[hm].fundo == "undefined" || arr[hm].fundo == "") {
                    arr[hm].fundo == "#FFFFFF";
                }
                document.querySelector(':root').style.setProperty('--slidetopic-color', arr[hm].frente);
                document.querySelector(':root').style.setProperty('--littlemenu-color', arr[hm].frente);
                document.querySelector(':root').style.setProperty('--pagination-color', arr[hm].frente);
                document.querySelector(':root').style.setProperty('--littlemenu-over', arr[hm].fundo);
            } else {
                document.querySelector(':root').style.setProperty('--slidetopic-color', originalslidetopiccolor);
                document.querySelector(':root').style.setProperty('--littlemenu-color', originallittlemenucolor);
                document.querySelector(':root').style.setProperty('--pagination-color', originalpaginationcolor);
                document.querySelector(':root').style.setProperty('--littlemenu-over', originallittlemenuover);
            }

            

        }, 25);

        setTimeout(function () {

            inserecoisacerta(arr[hm].link, "sliding2", arr[hm].tipo, arr[hm].fundo);
            actualpage = hm;
            document.getElementById("paginacao").innerHTML = actualpage;
            document.getElementById("titulodoslide").innerHTML = arr[hm].titulo;
            document.getElementById("loslinks").innerHTML = arr[hm].menu;

        }, 626);

        setTimeout(function () {

            document.getElementById("frontslide").style.top = "0";

            document.getElementById("sliding1").style.transition = "none";
            document.getElementById("sliding2").style.transition = "none";
            document.getElementById("sliding3").style.transition = "none";

            document.getElementById("sliding1").style.left = "-100vw";
            document.getElementById("sliding2").style.left = 0;
            document.getElementById("sliding3").style.left = "100vw";

            changeworking = false;


            inserecoisacerta(arr[hm-1].link, "sliding1", arr[hm-1].tipo, arr[hm-1].fundo);
            inserecoisacerta(arr[hm+1].link, "sliding3", arr[hm+1].tipo, arr[hm+1].fundo);

        }, 680);
        
    } 

    

}

rewind = function (hm) {

    if (hm === "" || typeof hm === "undefined" || hm === null) {

        hm = actualpage - 1;

    }
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    

    

    if (hm > 0) {

        if (hm >= arr.length - 1) {
            document.getElementById("setadireita").style.display = "none";
        } else {
            document.getElementById("setadireita").style.display = "block";
        }

        if (hm <= 1) {
            document.getElementById("setaesquerda").style.display = "none";
        } else {
            document.getElementById("setaesquerda").style.display = "block";
        }



        acende(hm);

        document.getElementById("frontslide").style.top = "-200vw";
        inserecoisacerta(arr[hm].link, "frontslide", arr[hm].tipo, arr[hm].fundo);

        //inserecoisacerta(arr[hm].link, "sliding1", arr[hm].tipo, arr[hm].fundo);

        setTimeout(function () {

            document.getElementById("sliding1").style.transition = "all .6s ease-in-out";
            document.getElementById("sliding2").style.transition = "all .6s ease-in-out";
            document.getElementById("minimaln").style.transition = "all .6s ease-in-out";
            document.getElementById("minimaln").style.width = parseInt(((hm - 1) / (arr.length - 2)) * 100) + "%";
            document.getElementById("sliding3").style.transition = "none";
            document.getElementById("sliding3").style.left = "-200vw";

            if (typeof arr[hm].fundo != "undefined" && arr[hm].fundo != "") {

                document.getElementsByTagName("html")[0].style.backgroundColor = arr[hm].fundo;
            } else {
                document.getElementsByTagName("html")[0].style.backgroundColor = originalbackground;
                    }
            
            if (typeof arr[hm].frente != "undefined" && arr[hm].frente != "") {
                if (typeof arr[hm].fundo == "undefined" || arr[hm].fundo == "") {
                    arr[hm].fundo == "#FFFFFF";
                }
                document.querySelector(':root').style.setProperty('--slidetopic-color', arr[hm].frente);
                document.querySelector(':root').style.setProperty('--littlemenu-color', arr[hm].frente);
                document.querySelector(':root').style.setProperty('--pagination-color', arr[hm].frente);
                document.querySelector(':root').style.setProperty('--littlemenu-over', arr[hm].fundo);
            } else {
                document.querySelector(':root').style.setProperty('--slidetopic-color', originalslidetopiccolor);
                document.querySelector(':root').style.setProperty('--littlemenu-color', originallittlemenucolor);
                document.querySelector(':root').style.setProperty('--pagination-color', originalpaginationcolor);
                document.querySelector(':root').style.setProperty('--littlemenu-over', originallittlemenuover);
            }
         
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

            document.getElementById("frontslide").style.top = "0";

            document.getElementById("sliding1").style.transition = "none";
            document.getElementById("sliding2").style.transition = "none";
            document.getElementById("sliding3").style.transition = "none";

            document.getElementById("sliding1").style.left = "-100vw";
            document.getElementById("sliding2").style.left = 0;
            document.getElementById("sliding3").style.left = "100vw";

            inserecoisacerta(arr[hm-1].link, "sliding1", arr[hm-1].tipo, arr[hm-1].fundo);
            inserecoisacerta(arr[hm+1].link, "sliding3", arr[hm+1].tipo, arr[hm+1].fundo);

            changeworking = false;

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

        }









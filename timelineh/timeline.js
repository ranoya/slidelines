const converter = new showdown.Converter({
  tables: true,
  simpleLineBreaks: true,
});

// FUNÇÃO URL GET

$_GET = [];
(function () {
  corte = window.location.href.toString().indexOf("?");
  if (corte > 0) {
    argumento = window.location.href.toString().substring(corte + 1);
    argumentos = argumento.split("&");
    for (arg in argumentos) {
      let argCorte = argumentos[arg].indexOf("=");
      $_GET[argumentos[arg].substring(0, argCorte)] = argumentos[arg].substring(
        argCorte + 1
      );
    }
  }
})();

// FUNÇÃO IMAGE FROM ALL SOURCES

const imagefromallsources = function (murl) {
  // FUNÇÃO IMAGE FROM ALL SOURCES

  let saida = murl;

  if (murl.match(/https:\/\/drive\.google\.com\/open\?(.*)\&/i)) {
    let complementa = murl.match(
      /https:\/\/drive\.google\.com\/open\?id=(.*)\&/i
    )[1];

    saida = "https://lh3.googleusercontent.com/d/" + complementa;
  }

  if (murl.match(/https:\/\/drive\.google\.com\/file\/d/i)) {
    let complementa = murl.match(
      /https:\/\/drive\.google\.com\/file\/d\/(.*)\/view/i
    )[1];

    saida = "https://lh3.googleusercontent.com/d/" + complementa;
  }

  if (murl.match(/https:\/\/drive\.google\.com\/uc\?export=view/i)) {
    let complementa = murl.match(/id=(.*)/i)[1];

    saida = "https://lh3.googleusercontent.com/d/" + complementa;
  }

  let nurl = murl.replace(/\&amp;/gi, "&");

  let video = nurl.match(
    /(http:|https:|)\/\/(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
  );

  if (typeof video != "undefined" && video != null) {
    saida = "https://img.youtube.com/vi/" + video[6] + "/0.jpg";
  }

  if (nurl.match(/\.png|\.svg|\.jpg|\.gif|.webp/i)) {
    saida = nurl;
  }

  return saida;
};

let arr = [];
let todosslides = [];
let actualpage = 0;
let arrtitulo = [];
let arrcolorfg = [];
let arrcolorbg = [];
let rodandoajeita = false;
let lobody = document.getElementById("frontslide");

let vai = setTimeout(function () {}, 0);

if (
  $_GET["s"] != "" &&
  typeof $_GET["s"] != "undefined" &&
  $_GET["s"] != null
) {
  actualpage = parseInt($_GET["s"]);
}

let estilo = document.createElement("link");
estilo.setAttribute("rel", "stylesheet");
estilo.setAttribute("type", "text/css");
estilo.setAttribute(
  "href",
  "https://slidelines.vercel.app/timelineh/timeline.css"
);
document.lastChild.appendChild(estilo);

if ($_GET["theme"] != "" && typeof $_GET["theme"] != "undefined") {
  let estilo2 = document.createElement("link");
  estilo2.setAttribute("rel", "stylesheet");
  estilo2.setAttribute("type", "text/css");
  estilo2.setAttribute("href", $_GET["theme"]);
  document.lastChild.appendChild(estilo2);
}

let indicenav = document.createElement("div");
indicenav.setAttribute("id", "indice");
document.lastChild.appendChild(indicenav);

let timeframe = document.createElement("div");
timeframe.setAttribute("id", "tempo");
document.lastChild.appendChild(timeframe);

let nextnav = document.createElement("div");
nextnav.setAttribute("id", "next");
nextnav.setAttribute("class", "setas");
nextnav.setAttribute("onclick", "gonext()");
document.lastChild.appendChild(nextnav);

let prevnav = document.createElement("div");
prevnav.setAttribute("id", "prev");
prevnav.setAttribute("class", "setas");
prevnav.setAttribute("onclick", "goprev()");
document.lastChild.appendChild(prevnav);

let backcontrol = document.createElement("div");
backcontrol.setAttribute("id", "backcontrol");
document.lastChild.appendChild(backcontrol);

let corbgtimelineoriginal = getComputedStyle(
  document.documentElement
).getPropertyValue("--timeline-tempo");
let corfgtimelineoriginal = getComputedStyle(
  document.documentElement
).getPropertyValue("--valor-tempo");

if (
  typeof $_GET["followbg"] != "undefined" &&
  $_GET["followbg"] != null &&
  $_GET["followbg"] != ""
) {
  document.documentElement.style.setProperty("--timeline-tempo", "transparent");
}

document.documentElement.style.setProperty("--valor-tempo", "transparent");
document.documentElement.style.setProperty(
  "--add-transparencia",
  "transparent"
);

document.getElementById("next").innerHTML = `
<svg width="100%" viewBox="0 0 131 222" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.9247 6.05213L124.794 96.9219C132.555 104.683 132.555 117.265 124.794 125.026L33.9247 215.896C26.1639 223.656 13.5813 223.656 5.82061 215.896C-1.94012 208.135 -1.94012 195.552 5.82061 187.792C5.82891 187.783 5.83723 187.775 5.84552 187.767L82.6384 110.974L5.82061 34.1562C-1.94011 26.3955 -1.94011 13.8129 5.82061 6.05214C13.5813 -1.70858 26.164 -1.70859 33.9247 6.05213Z" fill="var(--pagination-color, #777777)"></path>
    </svg>`;

document.getElementById("prev").innerHTML = `
<svg width="100%" viewBox="0 0 131 222" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M96.9218 215.896L6.05198 125.026C-1.70873 117.265 -1.70874 104.683 6.05198 96.9219L96.9218 6.05208C104.682 -1.70861 117.265 -1.7086 125.026 6.05211C132.787 13.8128 132.787 26.3954 125.026 34.1562C125.018 34.1645 125.009 34.1727 125.001 34.181L48.2081 110.974L125.026 187.792C132.787 195.552 132.787 208.135 125.026 215.896C117.265 223.656 104.682 223.656 96.9218 215.896Z" fill="var(--pagination-color, #777777)"></path>
    </svg>`;

if (
  window.navigator.platform.toString().indexOf("Win") >= 0 ||
  window.navigator.platform.toString().indexOf("Linux") >= 0 ||
  (typeof $_GET["fixascroll"] != "undefined" &&
    $_GET["fixascroll"] != null &&
    $_GET["fixascroll"] != "")
) {
  let v = `var(--base-background, #ffffff);`;

  if (
    typeof $_GET["bgscroll"] != "undefined" &&
    $_GET["bgscroll"] != null &&
    $_GET["bgscroll"] != ""
  ) {
    v = `var(--track-bg, #ffffff)`;
  }

  let restora = `
    <style>

        ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        background-color: var(--base-background, #ffffff);
        }

        ::-webkit-scrollbar-track {
        background: ${v};
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

        .slidewrap {
            height: calc(100vh - (3 * var(--track-height, 60px)) - var(--timeline-tempo-height)) !important;
        }

        #tempo {
            height: calc(var(--timeline-tempo-height) - 18px) !important;
            bottom: 10px !important;
        }

        #backcontrol {
            height: calc(var(--timeline-tempo-height) - 18px) !important;
            bottom: 10px !important;
        }

    </style>

    `;

  lobody.innerHTML += restora;
}

if (
  typeof $_GET["timeheight"] != "undefined" &&
  $_GET["timeheight"] != null &&
  $_GET["timeheight"] != ""
) {
  document.documentElement.style.setProperty(
    "--timeline-tempo-height",
    $_GET["timeheight"] + "px"
  );
}

if (
  typeof $_GET["followbg"] != "undefined" &&
  $_GET["followbg"] != null &&
  $_GET["followbg"] != ""
) {
  document.getElementById("tempo").style.display = "none";
} else {
  document.getElementById("tempo").style.display = "block";
}

// FUNÇÃO DE FETCH DE ARQUIVO JSON

let arquivojson =
  "https://docs.google.com/spreadsheets/d/10UW1pPs4BfNC7q0U4grAEBW8NicLP4evtPLoLyPtY1A/edit#gid=0";

if (
  typeof $_GET["file"] != "undefined" &&
  $_GET["file"] != null &&
  $_GET["file"] != ""
) {
  arquivojson = $_GET["file"];
}

const GoogleSheetCsvURL = function (url) {
  url = new URL(url);
  const id = url.pathname.split("/")[3];
  const gid = new URLSearchParams(url.hash.slice(1)).get("gid") || 0;
  return `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`;
};

fetch(GoogleSheetCsvURL(arquivojson))
  .then((response) => response.text())
  .then((csvdata) => {
    let total = csvdata.length;
    let changecsv = "";
    let quantquotes = 0;
    for (let r = 0; r < total; r++) {
      if (csvdata.substring(r, r + 1) == '"') {
        quantquotes++;
      }

      if (csvdata.substring(r, r + 1) == "\n" && quantquotes % 2 != 0) {
        changecsv = csvdata.substring(0, r) + " " + csvdata.substring(r + 1);
        csvdata = changecsv;
      }
    }

    let linhas = csvdata.split(/\r?\n|\r|\n/g);
    let linhadados = "";
    let valorfinal = "";
    let temp1 = "";
    let temp2 = "";

    let heads = linhas[0].split(",");

    let dados = [];

    for (let i = 1; i < linhas.length; i++) {
      dados[i - 1] = {};
      linhadados = linhas[i].split(
        /[,]{1}(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/
      );

      for (let k = 0; k < linhadados.length; k++) {
        linhadados[k].trim();

        if (linhadados[k].substring(0, 1) == '"') {
          temp1 = linhadados[k].substring(1, linhadados[k].length);
        } else {
          temp1 = linhadados[k];
        }

        if (temp1.substring(temp1.length - 2, temp1.length) == '"') {
          temp1 = temp1.substring(0, temp1.length - 2);
        }

        if (temp1.substring(temp1.length - 1, temp1.length) == '"') {
          temp2 = temp1.substring(0, temp1.length - 1);
        } else {
          temp2 = temp1;
        }

        valorfinal = temp2.replace(/""/g, '"');

        dados[i - 1][heads[k]] = valorfinal;
      }
    }

    document.getElementById("prev").style.display = "none";

    // document.documentElement.style.setProperty('--timeline-tempo', 'transparent');
    document.documentElement.style.setProperty("--valor-tempo", "transparent");

    if (
      typeof $_GET["followbg"] != "undefined" &&
      $_GET["followbg"] != null &&
      $_GET["followbg"] != ""
    ) {
      //document.documentElement.style.setProperty('--timeline-tempo', dados[0].fundo);
      document.documentElement.style.setProperty(
        "--timeline-tempo",
        "transparent"
      );

      if (
        typeof $_GET["startvisible"] != "undefined" &&
        $_GET["startvisible"] != null &&
        $_GET["startvisible"] != ""
      ) {
        document.documentElement.style.setProperty(
          "--valor-tempo",
          dados[0].frente
        );
        document.documentElement.style.setProperty(
          "--add-transparencia",
          "#00000001"
        );
        document.getElementById("tempo").style.display = "block";
      } else {
        document.documentElement.style.setProperty(
          "--valor-tempo",
          dados[0].fundo
        );
        document.documentElement.style.setProperty(
          "--add-transparencia",
          dados[0].fundo
        );
      }
    }

    document.documentElement.style.setProperty("--track-bg", dados[0].fundo);

    todosslides = dados;

    let tituloscode = ``;
    let contat = 1;
    let i = 0;
    while (i < dados.length) {
      let tituloatual = dados[i].titulo;

      tituloscode += `<div class="track" style='display: inline-block; position: sticky; margin: 0; padding: 0; top: 0; left: 0; width: 100vw; margin-right: 0; margin-left: ${
        (contat - 1) * 100
      }vw; z-index: ${200 + i}; background-color: ${
        dados[i].titulofundo
      }; color: ${
        dados[i].titulofrente
      }'><span style='margin-left: var(--meta-margins, 30px);'>${tituloatual}</span></div>`;

      contat = 0;

      for (let k = i; k < dados.length; k++) {
        if (dados[k].titulo == dados[i].titulo) {
          contat++;
        } else {
          break;
        }
      }

      i = i + contat;
    }

    lobody.innerHTML += `<div id='tracktitulos' class='fulltrack' style='width: ${
      dados.length * 100
    }vw;'>${tituloscode}</div>`;

    let anoscode = ``;

    let patternbg = ``;
    if (
      typeof $_GET["pattern"] != "undefined" &&
      $_GET["pattern"] != null &&
      $_GET["pattern"] != ""
    ) {
      patternbg = `background-size: 4px 4px;
    background-image: repeating-linear-gradient(45deg, var(--valor-tempo) 0, var(--valor-tempo) 0.4px, #DD000000 0, #00000000 50%); opacity: 0.5;`;
    }

    if (
      typeof $_GET["startmiddle"] != "undefined" &&
      $_GET["startmiddle"] != null &&
      $_GET["startmiddle"] != ""
    ) {
      anoscode += `<div class="linhadotempo nohover" style='display: inline-block; margin: 0; padding: 0; top: 0; left: 0; width: 50vw; margin-right: 0; z-index: 599; ${patternbg}'></div>`;
    } else {
      anoscode += `<div class="linhadotempo nohover" style='display: inline-block; margin: 0; padding: 0; top: 0; left: 0; width: var(--meta-margins, 30px); margin-right: 0; z-index: 599; ${patternbg}'></div>`;
    }

    contat = 0;
    i = 0;

    let milestone = "";

    while (i < dados.length) {
      milestone = "";

      let tituloatual = dados[i].ano;
      let contat = 0;

      for (let k = i; k < dados.length; k++) {
        if (dados[k].ano == dados[i].ano) {
          contat++;
        } else {
          break;
        }
      }

      if (
        typeof $_GET["milestone"] != "undefined" &&
        $_GET["milestone"] != null &&
        $_GET["milestone"] != ""
      ) {
        milestone = `display: block; position: absolute; z-index: 10000; width: calc(${
          contat * 5
        }vw - 30px); transform: translate(15px,0);`;
      }

      anoscode += `<div class="linhadotempo" id="reg${i}" onclick='nowgo(${i})' style='display: inline-block; margin: 0; padding: 0; top: 0; left: 0; width: calc(5vw - 1px); margin-right: ${
        (contat - 1) * 5
      }vw; z-index: ${
        600 + i
      };'><div class='registroano' style='${milestone}'>${tituloatual}</div></div>`;

      i = i + contat;
    }

    if (
      typeof $_GET["startmiddle"] != "undefined" &&
      $_GET["startmiddle"] != null &&
      $_GET["startmiddle"] != ""
    ) {
      anoscode += `
    <div class='linhadotempo nohover' style='display: inline-block; margin: 0; padding: 0; top: 0; width: calc(45vw - var(--meta-margins) - var(--back-control-width)); ${patternbg}'></div>
    `;
    } else {
      anoscode += `
    <div class='linhadotempo nohover' style='display: inline-block; margin: 0; padding: 0; top: 0; width: calc(94vw - var(--meta-margins) - var(--back-control-width)); ${patternbg}'></div>
    `;
    }

    document.getElementById(
      "tempo"
    ).innerHTML = `<div id="fulltempo" style="width: calc(${
      (i + 19) * 5
    }vw - var(--back-control-width));">${anoscode}</div>`;

    let subtituloscode = ``;
    contat = 1;
    i = 0;
    while (i < dados.length) {
      let subtituloatual = dados[i].subtitulo;

      subtituloscode += `<div class="track" style='display: inline-block; position: sticky; margin: 0; padding: 0; top: 0; left: 0; width: 100vw; margin-right: 0; margin-left: ${
        (contat - 1) * 100
      }vw; z-index: ${200 + i}; background-color: ${
        dados[i].subtitulofundo
      }; color: ${
        dados[i].subtitulofrente
      }'><span style='margin-left: var(--meta-margins, 30px);'>${subtituloatual}</span></div>`;

      contat = 0;

      for (let k = i; k < dados.length; k++) {
        if (dados[k].subtitulo == dados[i].subtitulo) {
          contat++;
        } else {
          break;
        }
      }

      i = i + contat;
    }

    lobody.innerHTML += `<div id='tracksubtitulos' class='fulltrack' style='width: ${
      dados.length * 100
    }vw;'>${subtituloscode}</div>`;

    let topicoscode = ``;
    contat = 1;
    i = 0;
    while (i < dados.length) {
      let subtituloatual = dados[i].topicos;

      topicoscode += `<div class="track" style='display: inline-block; position: sticky; margin: 0; padding: 0; top: 0; left: 0; width: 100vw; margin-right: 0; margin-left: ${
        (contat - 1) * 100
      }vw; z-index: ${200 + i}; background-color: ${dados[i].fundo}; color: ${
        dados[i].frente
      }'><span style='margin-left: var(--meta-margins, 30px);'>${subtituloatual}</span></div>`;

      contat = 0;

      for (let k = i; k < dados.length; k++) {
        if (dados[k].topicos == dados[i].topicos) {
          contat++;
        } else {
          break;
        }
      }

      i = i + contat;
    }

    lobody.innerHTML += `<div id='tracktopicos' class='fulltrack' style='width: ${
      dados.length * 100
    }vw;'>${topicoscode}</div>`;

    let slidescode = ``;

    i = 0;
    while (i < dados.length) {
      arrcolorfg[i] = dados[i].fundo;
      arrcolorbg[i] = dados[i].frente;

      if (i >= actualpage - 3 && i <= actualpage + 3) {
        if (
          dados[i].tipo == "imagem" ||
          dados[i].link.toString().match(/(\.png|\.jpg|\.svg)/i)
        ) {
          slidescode += `<div id='allslides${i}' onclick="gonext()" class='slidewrap' style='cursor: pointer; background-color: ${
            dados[i].fundo
          };'>

            <div class='slideitself' style='background-color: ${
              dados[i].fundo
            }; background-image: url(${imagefromallsources(
            dados[i].link
          )});'></div>

            </div>`;
        } else if (
          dados[i].link.toString().match(/\.md/i) &&
          dados[i].tipo != "texto"
        ) {
          slidescode += `<div id='allslides${i}' class='slidewrap' style='background-color: ${dados[i].fundo};'>

            <iframe class='slideitself' frameborder=0 src='https://www.ranoya.com/aulas/tryit/markdown2/slimTransp.html?embed=plain&file=${dados[i].link}'></iframe>
            
            </div>`;
        } else if (dados[i].tipo == "texto") {
          let text = dados[i].link;
          let code = converter.makeHtml(text);
          let book = "";
          if (dados[i].link.length < 3500) {
            book = "bookstyle";
          }

          slidescode += `<div id='allslides${i}' class='slidewrap' style='background-color: ${dados[i].fundo};'>
                <div class='slideitself markd'>
                    <div class='conteudomd ${book}'>${code}</div>
                    </div>
            </div>`;
        } else {
          slidescode += `<div id='allslides${i}' class='slidewrap' style='background-color: ${dados[i].fundo};'>

            <iframe class='slideitself' frameborder=0 src='${dados[i].link}'></iframe>
        
            </div>`;
        }
      } else {
        if (
          dados[i].tipo == "imagem" ||
          dados[i].link.toString().match(/(\.png|\.jpg|\.svg)/i)
        ) {
          slidescode += `<div id='allslides${i}' onclick="gonext()" class='slidewrap' style='cursor: pointer; background-color: ${dados[i].fundo};'></div>`;
        } else if (dados[i].link.toString().match(/\.md/i)) {
          slidescode += `<div id='allslides${i}' class='slidewrap' style='background-color: ${dados[i].fundo};'></div>`;
        } else if (dados[i].tipo == "texto") {
          slidescode += `<div id='allslides${i}' class='slidewrap' style='background-color: ${dados[i].fundo};'></div>`;
        } else {
          slidescode += `<div id='allslides${i}' class='slidewrap' style='background-color: ${dados[i].fundo};'></div>`;
        }
      }

      i++;
    }

    lobody.innerHTML += `<div id='slides' class='slides' style='width: ${
      dados.length * 100
    }vw;'>${slidescode}</div>`;

    setTimeout(acionagoto, 1000);
  });

const putslides = function (posicao) {
  actualpage = posicao;

  if (actualpage == 0) {
    document.getElementById("prev").style.display = "none";
    document.getElementById("next").style.display = "block";
  } else if (actualpage >= todosslides.length - 1) {
    document.getElementById("prev").style.display = "block";
    document.getElementById("next").style.display = "none";
  } else {
    document.getElementById("prev").style.display = "block";
    document.getElementById("next").style.display = "block";
  }

  // tentando resolver problema da cor do timeline no mobile
  document.documentElement.style.setProperty("--track-fg", arrcolorbg[posicao]);
  document.documentElement.style.setProperty("--track-bg", arrcolorfg[posicao]);

  for (let i = 0; i < todosslides.length; i++) {
    if (
      i >= actualpage - 3 &&
      i <= actualpage + 3 &&
      document.getElementById("allslides" + i).innerHTML == ""
    ) {
      if (
        todosslides[i].tipo == "imagem" ||
        todosslides[i].link.toString().match(/(\.png|\.jpg|\.svg)/i)
      ) {
        document.getElementById(
          "allslides" + i
        ).innerHTML = `<div class='slideitself' style='background-color: ${
          todosslides[i].fundo
        }; background-image: url(${imagefromallsources(
          todosslides[i].link
        )});'></div>`;
      } else if (todosslides[i].link.toString().match(/\.md/i)) {
        document.getElementById(
          "allslides" + i
        ).innerHTML = `<iframe class='slideitself' frameborder=0 src='https://www.ranoya.com/aulas/tryit/markdown2/slimTransp.html?embed=plain&file=${todosslides[i].link}'></iframe>`;
      } else if (todosslides[i].tipo == "texto") {
        let text = todosslides[i].link;
        let code = converter.makeHtml(text);
        let book = "";
        if (todosslides[i].link.length < 3500) {
          book = "bookstyle";
        }

        document.getElementById(
          "allslides" + i
        ).innerHTML = `<div id='allslides${i}' class='slidewrap' style='background-color: ${todosslides[i].fundo};'>

                    <div class='slideitself markd'>
                    <div class='conteudomd ${book}'>${code}</div>
                    </div>

                    </div>`;
      } else {
        document.getElementById(
          "allslides" + i
        ).innerHTML = `<iframe class='slideitself' frameborder=0 src='${todosslides[i].link}'></iframe>`;
      }
    }

    if (i < actualpage - 3 || i > actualpage + 3) {
      if (
        todosslides[i].tipo == "imagem" ||
        todosslides[i].link.toString().match(/(\.png|\.jpg|\.svg)/i)
      ) {
        document.getElementById("allslides" + i).innerHTML = ``;
      } else if (todosslides[i].link.toString().match(/\.md/i)) {
        document.getElementById("allslides" + i).innerHTML = ``;
      } else if (todosslides[i].tipo == "texto") {
        document.getElementById("allslides" + i).innerHTML = ``;
      } else {
        document.getElementById("allslides" + i).innerHTML = ``;
      }
    }

    resetahighlighttimeline();
    highlighttimeline(actualpage);
  }
};

let resetahighlighttimeline = function () {
  todoshighlights = document.getElementsByClassName("highlight");

  if (
    typeof todoshighlights != "undefined" &&
    todoshighlights != null &&
    todoshighlights != ""
  ) {
    for (let i = 0; i < todoshighlights.length; i++) {
      todoshighlights[i].classList.remove("highlight");
    }
  }
};

let highlighttimeline = function (n) {
  if (
    typeof document.getElementById("reg" + n) != "undefined" &&
    document.getElementById("reg" + n) != null &&
    document.getElementById("reg" + n) != ""
  ) {
    document.getElementById("reg" + n).classList.add("highlight");
  }
};

let mudaviatempo = false;

document.getElementById("tempo").onmouseover = function () {
  mudaviatempo = true;
};

document.getElementById("tempo").onmouseout = function () {
  mudaviatempo = false;
};

document.addEventListener("wheel", (event) => {
  if (
    typeof $_GET["allowverticalscroll"] != "undefined" &&
    $_GET["allowverticalscroll"] != null &&
    $_GET["allowverticalscroll"] != ""
  ) {
    let posicao = parseInt(
      document.getElementById("frontslide").scrollLeft / window.innerWidth
    );

    if (!rodandoajeita) {
      ajeita();
    }

    clearTimeout(vai);

    if (!mudaviatempo) {
      document.getElementById("frontslide").scrollLeft += event.deltaY;

      // let compensa = (todosslides.length + 22) / todosslides.length;
      // (20 * compensa)

      if (todosslides.length > 20) {
        document.getElementById("tempo").scrollLeft += event.deltaY / 20;
      }
    }

    document.getElementById("indice").innerHTML = posicao + 1;
    document.getElementById("indice").style.color = arrcolorfg[posicao];
    document.getElementById("indice").style.backgroundColor =
      arrcolorbg[posicao];

    document.documentElement.style.setProperty(
      "--button-color",
      arrcolorbg[posicao]
    );
    document.documentElement.style.setProperty(
      "--track-fg",
      arrcolorbg[posicao]
    );
    document.documentElement.style.setProperty(
      "--track-bg",
      arrcolorfg[posicao]
    );
    document.documentElement.style.setProperty(
      "--add-transparencia",
      "#00000001"
    );

    if (
      typeof $_GET["followbg"] != "undefined" &&
      $_GET["followbg"] != null &&
      $_GET["followbg"] != ""
    ) {
      //document.documentElement.style.setProperty('--timeline-tempo', arrcolorfg[posicao]);
      document.documentElement.style.setProperty(
        "--timeline-tempo",
        "transparent"
      );
      document.documentElement.style.setProperty(
        "--valor-tempo",
        arrcolorbg[posicao]
      );
    } else {
      document.documentElement.style.setProperty(
        "--timeline-tempo",
        corbgtimelineoriginal
      );
      document.documentElement.style.setProperty(
        "--valor-tempo",
        corfgtimelineoriginal
      );
    }

    vai = setTimeout(parou, 500);

    putslides(posicao);
  }
});

let parou = function () {
  ajeita("finaliza");
};

let ajeita = function (fecha) {
  rodandoajeita = true;

  if (fecha == "finaliza") {
    rodandoajeita = false;
  }

  let posicao = 0;

  if (
    document.getElementById("frontslide").scrollLeft % window.innerWidth <
    window.innerWidth / 2.5
  ) {
    posicao = parseInt(
      document.getElementById("frontslide").scrollLeft / window.innerWidth
    );

    let onde = window.innerWidth * posicao;

    document.getElementById("frontslide").scrollTo({
      left: onde,
      behavior: "smooth",
    });

    /*
        document.getElementById("tempo").scrollTo({
            left: onde/20,
            behavior: "smooth",
        });
        */

    // document.getElementById("frontslide").scrollLeft = document.getElementById("frontslide").scrollLeft - (document.getElementById("frontslide").scrollLeft % window.innerWidth);
  }

  if (
    document.getElementById("frontslide").scrollLeft % window.innerWidth >
    600
  ) {
    posicao = parseInt(
      document.getElementById("frontslide").scrollLeft / window.innerWidth
    );

    let onde = window.innerWidth * (posicao + 1);

    document.getElementById("frontslide").scrollTo({
      left: onde,
      behavior: "smooth",
    });

    /*
        document.getElementById("tempo").scrollTo({
            left: onde/20,
            behavior: "smooth",
        });
        */
  }

  putslides(posicao);

  if (!rodandoajeita) {
    ajeita();
  }
};

document.getElementById("frontslide").addEventListener("scroll", (event) => {
  document.getElementById("tempo").style.display = "block";

  if (!rodandoajeita) {
    ajeita();
  }

  clearTimeout(vai);

  let posicao = parseInt(
    document.getElementById("frontslide").scrollLeft / window.innerWidth
  );

  if (!mudaviatempo) {
    // let compensa = (todosslides.length + 22) / todosslides.length;
    // (20 * compensa)

    if (todosslides.length > 20) {
      document.getElementById("tempo").scrollLeft =
        document.getElementById("frontslide").scrollLeft / 20;
    }
  }

  document.getElementById("indice").innerHTML = posicao + 1;
  document.getElementById("indice").style.color = arrcolorfg[posicao];
  document.getElementById("indice").style.backgroundColor = arrcolorbg[posicao];

  document.documentElement.style.setProperty(
    "--button-color",
    arrcolorbg[posicao]
  );
  document.documentElement.style.setProperty("--track-fg", arrcolorbg[posicao]);
  document.documentElement.style.setProperty("--track-bg", arrcolorfg[posicao]);
  document.documentElement.style.setProperty(
    "--add-transparencia",
    "#00000001"
  );

  if (
    typeof $_GET["followbg"] != "undefined" &&
    $_GET["followbg"] != null &&
    $_GET["followbg"] != ""
  ) {
    //document.documentElement.style.setProperty('--timeline-tempo', arrcolorfg[posicao]);
    document.documentElement.style.setProperty(
      "--timeline-tempo",
      "transparent"
    );
    document.documentElement.style.setProperty(
      "--valor-tempo",
      arrcolorbg[posicao]
    );
  } else {
    document.documentElement.style.setProperty(
      "--timeline-tempo",
      corbgtimelineoriginal
    );
    document.documentElement.style.setProperty(
      "--valor-tempo",
      corfgtimelineoriginal
    );
  }

  vai = setTimeout(parou, 500);

  putslides(posicao);
});

document.getElementById("tempo").addEventListener("scroll", (event) => {
  if (mudaviatempo) {
    //let compensa = (todosslides.length + 22) / todosslides.length;
    // (20 * compensa)

    document.getElementById("frontslide").scrollLeft =
      document.getElementById("tempo").scrollLeft * 20;
  }
});

var keymapping = {};
onkeydown = onkeyup = function (e) {
  e = e || event;
  keymapping[e.keyCode] = e.type == "keydown";

  let posicao = parseInt(
    document.getElementById("frontslide").scrollLeft / window.innerWidth
  );

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
};

let gonext = function () {
  let posicao = 0;

  posicao = parseInt(
    document.getElementById("frontslide").scrollLeft / window.innerWidth
  );

  clearTimeout(vai);

  ajeita();

  let onde = window.innerWidth * (posicao + 1);

  document.getElementById("frontslide").scrollTo({
    left: onde,
    behavior: "smooth",
  });

  // no tablet ele tá se perdendo onde foi parar.
  posicao++;

  vai = setTimeout(parou, 300);
};

let goprev = function () {
  let posicao = 0;

  posicao = parseInt(
    document.getElementById("frontslide").scrollLeft / window.innerWidth
  );

  clearTimeout(vai);

  ajeita();

  let onde = window.innerWidth * (posicao - 1);

  document.getElementById("frontslide").scrollTo({
    left: onde,
    behavior: "smooth",
  });

  // no tablet ele tá se perdendo onde foi parar.
  posicao--;

  vai = setTimeout(parou, 300);
};

window.onmessage = function (e) {
  if (e.data == "p") {
    goprev();
  } else if (e.data == "n") {
    gonext();
  } else {
    nowgo(parseInt(e.data));
  }
};

document.addEventListener("DOMContentLoaded", (e) => {
  let posicao = 0;

  document.getElementById("indice").innerHTML = posicao + 1;
  document.getElementById("indice").style.color = arrcolorfg[posicao];
  document.getElementById("indice").style.backgroundColor = arrcolorbg[posicao];

  document.documentElement.style.setProperty(
    "--button-color",
    arrcolorbg[posicao]
  );
  document.documentElement.style.setProperty("--track-fg", arrcolorbg[posicao]);
  document.documentElement.style.setProperty("--track-bg", arrcolorfg[posicao]);
});

let acionagoto = function () {
  let onde = "";
  if (
    typeof $_GET["s"] != "undefined" &&
    $_GET["s"] != null &&
    $_GET["s"] != ""
  ) {
    for (let i = 0; i < todosslides.length; i++) {
      if (todosslides[i].id == $_GET["s"]) {
        onde = window.innerWidth * i;
        break;
      }
    }
    document.getElementById("frontslide").scrollLeft = window.innerWidth;

    setTimeout(function () {
      document.getElementById("frontslide").scrollLeft = onde;

      if (todosslides.length > 20) {
        document.getElementById("tempo").scrollLeft = onde / 20;
      }
      vai = setTimeout(parou, 500);
    }, 1000);
  }
};

let nowgo = function (sl) {
  let onde = window.innerWidth * sl;

  document.getElementById("frontslide").scrollTo({
    left: onde,
    behavior: "smooth",
  });

  if (todosslides.length > 20) {
    document.getElementById("tempo").scrollTo({
      left: onde / 20,
      behavior: "smooth",
    });
  }
};

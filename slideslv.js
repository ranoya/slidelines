// matrizes de controle de conteúdo para múltiplas instâncias

let timelinehactualarr = [];
let eventcontrolhstart = [];

// função criadora dos slides

let slidelvh = function (elid, arr, track1, track2, track3, snap) {
  let snapon = true;
  if (typeof snap != "undefined" && snap != "" && snap != null) {
    snapon = snap;
  }

  timelinehactualarr[elid] = [];
  timelinehactualarr[elid] = arr;
  eventcontrolhstart[elid] = true;

  slidestructure = document.getElementById(elid).innerHTML = timelineh(
    elid,
    arr,
    track1,
    track2,
    track3
  );

  if (snapon) {
    HsnapToGrid(elid);
  }
};

// função para mover até um ponto específico do scroll

let timelineh_moveto = function (who, where) {
  document.getElementById(who).scrollTo({
    left: where,
    behavior: "smooth",
  });

  clearTimeout(htlmhandl);
};

// função para lidar com o evento de scroll no elemento

let htlmhandl = "";
let timelineh_movehandler = function (who, arr) {
  clearTimeout(htlmhandl);

  let tlmdelta = document.getElementById(who).scrollLeft;

  let tamanhoslideindividual = parseFloat(
    document.querySelector("#" + who + " .slidelinelvh").scrollWidth /
      arr.length
  );

  let resto = parseFloat(tlmdelta % tamanhoslideindividual);

  if (resto <= parseInt(tamanhoslideindividual / 2) && resto > 5) {
    timelineh_moveto(who, tlmdelta - resto);
  }

  if (
    resto > tamanhoslideindividual - parseInt(tamanhoslideindividual / 2) &&
    resto < tamanhoslideindividual - 5
  ) {
    timelineh_moveto(who, tlmdelta + (tamanhoslideindividual - resto));
  }

  clearTimeout(htlmhandl);
};

// função de ajuste para mover até o ponto do slide

let HsnapToGrid = function (w) {
  if (eventcontrolhstart[w]) {
    eventcontrolhstart[w] = false;

    document.getElementById(w).onscroll = function (e) {
      clearTimeout(htlmhandl);
      htlmhandl = setTimeout(function () {
        timelineh_movehandler(w, timelinehactualarr[w]);
      }, 1000);
    };
  }
};

// função geradora do grid

let timelineh = function (id, arr, ano, titulo, conteudo) {
  timelinehactualarr[id] = arr;

  let html = "";
  let htmlfinal = "";

  html = `<div style='column-gap: 0 !important; display: grid !important; grid-auto-columns: 100% !important; width: 100% !important; grid-template-rows: 40px 40px 400px;' class='slidelinelvh'>`;
  htmlfinal = "";

  let qualano = "";
  let anoatual = "";
  let quantosblocos = 1;

  let qualtitulo = "";
  let tituloatual = "";
  let quantostitulos = 1;

  let htmlano = "";
  let htmltopico = "";
  let htmlcont = "";

  let ultimo = "";

  for (let k = 0; k < arr.length; k++) {
    ultimo = "";

    if (k == arr.length - 1) {
      ultimo = "ultimo";
    }

    anoatual = arr[k][ano];
    quantosblocos = 1;

    for (let s = k; s < arr.length; s++) {
      if (s < arr.length - 1) {
        if (arr[s + 1][ano] == anoatual) {
          quantosblocos++;

          if (s + 1 == arr.length) {
            ultimo = "ultimo";
          }
        } else {
          break;
        }
      }
    }

    if (anoatual != qualano) {
      htmlano += `<div class="slidelinelvh_track1 ${ultimo}" style="grid-row: 1; grid-column: span ${quantosblocos}"><div class="slidelinelvh_track1_cont" style="display: inline-block; position: sticky; left: 0;">${arr[k][ano]}</div></div>`;
    }

    qualano = anoatual;

    ultimo = "";

    if (k == arr.length - 1) {
      ultimo = "ultimo";
    }

    tituloatual = arr[k][titulo];
    quantostitulos = 1;

    for (let s = k; s < arr.length; s++) {
      if (s < arr.length - 1) {
        if (arr[s + 1][titulo] == tituloatual) {
          quantostitulos++;

          if (s + 1 == arr.length) {
            ultimo = "ultimo";
          }
        } else {
          break;
        }
      }
    }

    if (tituloatual != qualtitulo) {
      htmltopico += `<div class="slidelinelvh_track2 ${ultimo}" style="grid-row: 2; grid-column: span ${quantostitulos}"><div class="slidelinelvh_track2_cont" style="display: inline-block; position: sticky; left: 0;">${arr[k][titulo]}</div></div>`;
    }

    qualtitulo = tituloatual;
    ultimo = "";

    if (k == arr.length - 1) {
      ultimo = "ultimo";
    }

    htmlcont += `<div class="slidelinelvh_track3 ${ultimo}" style="grid-row: 3;"><div class="slidelinelvh_track3_cont" style="display: inline-block; position: sticky; left: 0;">${arr[k][conteudo]}</div></div>`;
  }

  html += htmlano + htmltopico + htmlcont + `</div>`;

  htmlfinal = html;

  return htmlfinal;
};

// matrizes de controle de conteúdo para múltiplas instâncias

let timelinevactualarr = [];
let eventcontrolvstart = [];

// função criadora dos slides

let slidelvv = function (elid, arr, track1, track2, track3, snap) {
  let snapon = true;
  if (typeof snap != "undefined" && snap != "" && snap != null) {
    snapon = snap;
  }

  timelinevactualarr[elid] = [];
  timelinevactualarr[elid] = arr;
  eventcontrolvstart[elid] = true;

  slidestructure = document.getElementById(elid).innerHTML = timelinev(
    elid,
    arr,
    track1,
    track2,
    track3
  );

  if (snapon) {
    VsnapToGrid(elid);
  }
};

// função para mover até um ponto específico do scroll

let timelinev_moveto = function (who, where) {
  document.getElementById(who).scrollTo({
    top: where,
    behavior: "smooth",
  });

  clearTimeout(vtlmhandl);
};

// função para lidar com o evento de scroll no elemento

let vtlmhandl = "";
let timelinev_movehandler = function (who, arr) {
  clearTimeout(vtlmhandl);

  let tlmdelta = document.getElementById(who).scrollTop;

  let tamanhoslideindividual = parseFloat(
    document.querySelector("#" + who + " .slidelinelvv").scrollHeight /
      arr.length
  );

  let resto = parseFloat(tlmdelta % tamanhoslideindividual);

  if (resto <= parseInt(tamanhoslideindividual / 2) && resto > 5) {
    timelinev_moveto(who, tlmdelta - resto);
  }

  if (
    resto > tamanhoslideindividual - parseInt(tamanhoslideindividual / 2) &&
    resto < tamanhoslideindividual - 5
  ) {
    timelinev_moveto(who, tlmdelta + (tamanhoslideindividual - resto));
  }

  clearTimeout(vtlmhandl);
};

// função de ajuste para mover até o ponto do slide

let VsnapToGrid = function (w) {
  if (eventcontrolvstart[w]) {
    eventcontrolvstart[w] = false;

    document.getElementById(w).onscroll = function (e) {
      clearTimeout(vtlmhandl);
      vtlmhandl = setTimeout(function () {
        timelinev_movehandler(w, timelinevactualarr[w]);
      }, 1000);
    };
  }
};

// função geradora do grid

let timelinev = function (id, arr, ano, titulo, conteudo) {
  timelinevactualarr[id] = arr;

  let html = "";
  let htmlfinal = "";

  html = `<div style='width: 100%; row-gap: 0 !important; display: grid !important; grid-template-columns: 200px 100px 1fr;' class='slidelinelvv'>`;
  htmlfinal = "";

  let qualano = "";
  let anoatual = "";
  let quantosblocos = 1;

  let qualtitulo = "";
  let tituloatual = "";
  let quantostitulos = 1;

  let ultimo = "";

  for (let k = 0; k < arr.length; k++) {
    ultimo = "";

    if (k == arr.length - 1) {
      ultimo = "ultimo";
    }

    anoatual = arr[k][ano];
    quantosblocos = 1;

    for (let s = k; s < arr.length; s++) {
      if (s < arr.length - 1) {
        if (arr[s + 1][ano] == anoatual) {
          quantosblocos++;

          if (s + 1 == arr.length) {
            ultimo = "ultimo";
          }
        } else {
          break;
        }
      }
    }

    if (anoatual != qualano) {
      html += `<div class="slidelinelvv_track1 ${ultimo}" style="grid-column: 1; grid-row: span ${quantosblocos}"><div class="slidelinelvv_track1_cont" style="display: inline-block; position: sticky; top: 0;">${arr[k][ano]}</div></div>`;
    }

    qualano = anoatual;

    ultimo = "";

    if (k == arr.length - 1) {
      ultimo = "ultimo";
    }

    tituloatual = arr[k][titulo];
    quantostitulos = 1;

    for (let s = k; s < arr.length; s++) {
      if (s < arr.length - 1) {
        if (arr[s + 1][titulo] == tituloatual) {
          quantostitulos++;

          if (s + 1 == arr.length) {
            ultimo = "ultimo";
          }
        } else {
          break;
        }
      }
    }

    if (tituloatual != qualtitulo) {
      html += `<div class="slidelinelvv_track2 ${ultimo}" style="grid-column: 2; grid-row: span ${quantostitulos}"><div class="slidelinelvv_track2_cont" style="display: inline-block; position: sticky; top: 0;">${arr[k][titulo]}</div></div>`;
    }

    qualtitulo = tituloatual;
    ultimo = "";

    if (k == arr.length - 1) {
      ultimo = "ultimo";
    }

    html += `<div class="slidelinelvv_track3 ${ultimo}" style="grid-column: 3;"><div class="slidelinelvv_track3_cont" style="display: inline-block; position: sticky; top: 0;">${arr[k][conteudo]}</div></div>`;
  }

  html += `</div>`;

  htmlfinal = html;

  return htmlfinal;
};

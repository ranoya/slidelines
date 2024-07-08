let timelineactualarr = [];
let eventcontrolstart = [];

let slidelvh = function (elid, arr, track1, track2, track3) {
  timelineactualarr[elid] = [];
  timelineactualarr[elid] = arr;
  eventcontrolstart[elid] = true;
};

let timelineh_moveto = function (who, where) {
  document.getElementById(who).scrollTo({
    left: where,
    behavior: "smooth",
  });

  clearTimeout(tlmhandl);
};

let tlmhandl = "";
let timelineh_movehandler = function (who, arr) {
  clearTimeout(tlmhandl);

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

  clearTimeout(tlmhandl);
};

let snapToGrid = function (w) {
  if (eventcontrolstart[w]) {
    eventcontrolstart[w] = false;

    document.documentGetElementById(w).onscroll = function (e) {
      clearTimeout(tlmhandl);
      tlmhandl = setTimeout(function () {
        timelineh_movehandler(w, timelineactualarr[w]);
      }, 1000);
    };
  }
};

let timelineh = function (id, arr, ano, titulo, conteudo) {
  timelineactualarr[id] = arr;

  let instancename = "";
  if (typeof instance != "undefined" && instance != "" && instance != null) {
    instancename = instance;
  }

  let html = "";
  let htmlfinal = "";

  html = `<div style='gap: 0 0 !important; display: grid !important; grid-auto-columns: 100% !important; width: 100% !important; grid-template-rows: 40px 40px 400px;' class='slidelinelvh'>`;
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
      htmlano += `<div class="slidelinelvh_track1 ${ultimo}" style="grid-row: 1; grid-column: span ${quantosblocos}"><span class="slidelinelvh_track1_cont">${arr[k][ano]}</span></div>`;
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
      htmltopico += `<div class="slidelinelvh_track2 ${ultimo}" style="grid-row: 2; grid-column: span ${quantostitulos}"><span class="slidelinelvh_track2_cont">${arr[k][titulo]}</span></div>`;
    }

    qualtitulo = tituloatual;
    ultimo = "";

    if (k == arr.length - 1) {
      ultimo = "ultimo";
    }

    htmlcont += `<div class="slidelinelvh_track3 ${ultimo}" style="grid-row: 3;"><span class="slidelinelvh_track3_cont}">${arr[k][conteudo]}</span></div>`;
  }

  html += htmlano + htmltopico + htmlcont + `</div>`;

  htmlfinal = html;

  return htmlfinal;
};

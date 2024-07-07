let timelinemoveto = function (who, where) {
  //console.log("indo para " + where);

  document.querySelector(who).scrollTo({
    left: where,
    behavior: "smooth",
  });

  clearTimeout(tlmhandl);
};

let tlmhandl = "";
let timelinemovehandler = function (who, arr) {
  clearTimeout(tlmhandl);

  let tlmdelta = document.querySelector(who).scrollLeft;

  let tamanhoslideindividual = parseFloat(
    (document.querySelector(who + " .timelineh").scrollWidth +
      document.querySelector(who + " .timelineh").scrollWidth * 0.0004) /
      arr.length
  );

  let resto = parseFloat(tlmdelta % tamanhoslideindividual);

  /*
  console.log(
    "o delta para o snap é: " +
      resto +
      " | " +
      tlmdelta +
      " | " +
      tamanhoslideindividual +
      " |- limite: " +
      (tamanhoslideindividual - 300) +
      " " +
      (tamanhoslideindividual - 5) +
      " -| " +
      " ? " +
      (resto > tamanhoslideindividual - 300) +
      " ? " +
      (resto < tamanhoslideindividual - 5)
  );

  */

  if (resto < parseInt(tamanhoslideindividual / 3) && resto > 5) {
    timelinemoveto(who, tlmdelta - resto);
  }

  if (
    resto > tamanhoslideindividual - parseInt(tamanhoslideindividual / 3) &&
    resto < tamanhoslideindividual - 5
  ) {
    timelinemoveto(who, tlmdelta + (tamanhoslideindividual - resto));
  }

  clearTimeout(tlmhandl);
};

let eventcontrolstart = true;
let snapToGrid = function (w, a) {
  if (eventcontrolstart) {
    eventcontrolstart = false;

    document.querySelector(w).onscroll = function (e) {
      // console.log("ativou");

      clearTimeout(tlmhandl);
      tlmhandl = setTimeout(function () {
        timelinemovehandler(w, a);
      }, 1000);
    };
  }
};

let timelineh = function (arr, ano, titulo, conteudo, instance) {
  let instancename = "";
  if (typeof instance != "undefined" && instance != "" && instance != null) {
    instancename = instance;
  }

  let html = "";
  let htmlfinal = "";

  html = `<div class='timelineh ${instancename}'>`;
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
      htmlano += `<div class="timelineh_ano ${ultimo} ${instancename}" style="grid-column: span ${quantosblocos}"><span class="timelineh_ano_cont ${instancename}">${arr[k][ano]}</span></div>`;
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
      htmltopico += `<div class="timelineh_topic ${ultimo} ${instancename}" style="grid-column: span ${quantostitulos}"><span class="timelineh_topic_cont ${instancename}">${arr[k][titulo]}</span></div>`;
    }

    qualtitulo = tituloatual;
    ultimo = "";

    if (k == arr.length - 1) {
      ultimo = "ultimo";
    }

    htmlcont += `<div class="timelineh_cont ${ultimo} ${instancename}"><span class="timelineh_cont_cont ${instancename}">${arr[k][conteudo]}</span></div>`;
  }

  html += htmlano + htmltopico + htmlcont + `</div>`;

  htmlfinal = html;

  return htmlfinal;
};

let eventcontrolstart = true;

let eventcontrol = function (w, nam) {
  if (eventcontrolstart) {
    document.querySelector(w).onscroll = function (e) {
      console.log(
        document.querySelector(w).getBoundingClientRect().left +
          " | " +
          document.querySelector(w).getBoundingClientRect().width
      );

      document.querySelector(w + " .timelineh " + nam).onscroll = function (e) {
        console.log(
          document
            .querySelector(w + " .timelineh " + nam)
            .getBoundingClientRect().left +
            " | " +
            document
              .querySelector(w + " .timelineh " + nam)
              .getBoundingClientRect().width
        );

        eventcontrolstart = false;
      };
    };
  }

  // window.addEventListener("resize", carregacoisas);
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

  let htmlano = `<div class="timelineh_ano_head ${instancename}"><span class="timelineh_ano_head_cont ${instancename}">${ano}</span></div>`;
  let htmltopico = `<div class="timelineh_topic_head ${instancename}"><span class="timelineh_topic_head_cont ${instancename}">${titulo}</span></div>`;
  let htmlcont = `<div class="timelineh_cont_head ${instancename}"><span class="timelineh_cont_head_cont ${instancename}">${conteudo}</span></div>`;

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

  htmlano += `<div class="timelineh_ano timelineh_ano_end ${instancename}"></div>`;
  htmltopico += `<div class="timelineh_topic timelineh_topic_end ${instancename}"></div>`;
  htmlcont += `<div class="timelineh_cont timelineh_cont_end ${instancename}"></div>`;

  html += htmlano + htmltopico + htmlcont + `</div>`;

  htmlfinal = html;

  return htmlfinal;
};

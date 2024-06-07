timelinev = function (arr, ano, titulo, conteudo) {
  let html = "";
  let htmlfinal = "";

  html = "<div class='timelinev'>";
  htmlfinal = "";

  let qualano = "";
  let anoatual = "";
  let quantosblocos = 1;

  let qualtitulo = "";
  let tituloatual = "";
  let quantostitulos = 1;

  html += `
    <div class="timelinev_ano_head"><span class="timelinev_ano_head_cont">${ano}</span></div>
    <div class="timelinev_topic_head"><span class="timelinev_topic_head_cont">${titulo}</span></div>
    <div class="timelinev_cont_head"><span class="timelinev_cont_head_cont">${conteudo}</span></div>
    `;

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
      html += `<div class="timelinev_ano ${ultimo}" style="grid-row: span ${quantosblocos}"><span class="timelinev_ano_cont">${arr[k][ano]}</span></div>`;
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
      html += `<div class="timelinev_topic ${ultimo}" style="grid-row: span ${quantostitulos}"><span class="timelinev_topic_cont">${arr[k][titulo]}</span></div>`;
    }

    qualtitulo = tituloatual;
    ultimo = "";

    if (k == arr.length - 1) {
      ultimo = "ultimo";
    }

    html += `<div class="timelinev_cont ${ultimo}"><span class="timelinev_cont_cont">${arr[k][conteudo]}</span></div>`;
  }

  html += `
    
    <div class="timelinev_ano timelinev_ano_end"></div>
    <div class="timelinev_topic timelinev_topic_end"></div>
    <div class="timelinev_cont timelinev_cont_end"></div>
    
  
    </div>`;

  htmlfinal = html;

  return htmlfinal;
};

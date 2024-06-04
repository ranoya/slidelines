timelinevalphabetic = function (arr, crit) {
  let listuniques = unique(arr, crit);
  listuniques.sort();

  let newarr = sortbylist(arr, listuniques, crit);

  return newarr;
};

timelinev = function (oldarr, ano, titulo, conteudo) {
  let arr = [];
  arr = timelinevalphabetic(oldarr, ano);

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
    <div class="timelinev_ano_head">${ano}</div>
    <div class="timelinev_topic_head">${titulo}</div>
    <div class="timelinev_cont_head">${conteudo}</div>
    `;

  for (let k = 0; k < arr.length; k++) {
    anoatual = arr[k][ano];
    quantosblocos = 1;

    for (let s = k; s < arr.length; s++) {
      if (s < arr.length - 1) {
        if (arr[s + 1][ano] == anoatual) {
          quantosblocos++;
        }
      }
    }

    if (anoatual != qualano) {
      html += `<div class="timeline_ano" style="grid-row: span ${quantosblocos}"><span class="numeroano">${arr[k][ano]}</span></div>`;
    }

    qualano = anoatual;

    tituloatual = arr[k][titulo];
    quantostitulos = 1;

    for (let s = k; s < arr.length; s++) {
      if (s < arr.length - 1) {
        if (arr[s + 1][titulo] == tituloatual) {
          quantostitulos++;
        }
      }
    }

    if (tituloatual != qualtitulo) {
      html += `<div class="timeline_titulo" style="grid-row: span ${quantostitulos}">${arr[k][titulo]}</div>`;
    }

    qualtitulo = tituloatual;

    html += `<div class="timelinev_cont_conteiner">${arr[k][conteudo]}</div>`;
  }

  html += "</div>";

  htmlfinal = html;

  return htmlfinal;
};

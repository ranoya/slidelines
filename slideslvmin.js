let timelinehactualarr=[],eventcontrolhstart=[],slidelvh=function(l,t,e,i,n,o){let r=!0;void 0!==o&&""!=o&&null!=o&&(r=o),timelinehactualarr[l]=[],timelinehactualarr[l]=t,eventcontrolhstart[l]=!0,slidestructure=document.getElementById(l).innerHTML=timelineh(l,t,e,i,n),r&&HsnapToGrid(l)},timelineh_moveto=function(l,t){document.getElementById(l).scrollTo({left:t,behavior:"smooth"}),clearTimeout(htlmhandl)},htlmhandl="",timelineh_movehandler=function(l,t){clearTimeout(htlmhandl);let e=document.getElementById(l).scrollLeft,i=parseFloat(document.querySelector("#"+l+" .slidelinelvh").scrollWidth/t.length),n=parseFloat(e%i);n<=parseInt(i/2)&&n>5&&timelineh_moveto(l,e-n),n>i-parseInt(i/2)&&n<i-5&&timelineh_moveto(l,e+(i-n)),clearTimeout(htlmhandl)},HsnapToGrid=function(l){eventcontrolhstart[l]&&(eventcontrolhstart[l]=!1,document.getElementById(l).onscroll=function(t){clearTimeout(htlmhandl),htlmhandl=setTimeout(function(){timelineh_movehandler(l,timelinehactualarr[l])},1e3)})},timelineh=function(l,t,e,i,n){timelinehactualarr[l]=t;let o="",r="";o="<div style='column-gap: 0 !important; display: grid !important; grid-auto-columns: 100% !important; width: 100% !important; grid-template-rows: 40px 40px 400px;' class='slidelinelvh'>",r="";let a="",s="",d=1,v="",c="",m=1,h="",u="",g="",p="";for(let _=0;_<t.length;_++){p="",_==t.length-1&&(p="ultimo"),s=t[_][e],d=1;for(let y=_;y<t.length;y++)if(y<t.length-1){if(t[y+1][e]==s)d++,y+1==t.length&&(p="ultimo");else break}s!=a&&(h+=`<div class="slidelinelvh_track1 ${p}" style="grid-row: 1; grid-column: span ${d}"><div class="slidelinelvh_track1_cont" style="display: inline-block; position: sticky; left: 0;">${t[_][e]}</div></div>`),a=s,p="",_==t.length-1&&(p="ultimo"),c=t[_][i],m=1;for(let $=_;$<t.length;$++)if($<t.length-1){if(t[$+1][i]==c)m++,$+1==t.length&&(p="ultimo");else break}c!=v&&(u+=`<div class="slidelinelvh_track2 ${p}" style="grid-row: 2; grid-column: span ${m}"><div class="slidelinelvh_track2_cont" style="display: inline-block; position: sticky; left: 0;">${t[_][i]}</div></div>`),v=c,p="",_==t.length-1&&(p="ultimo"),g+=`<div class="slidelinelvh_track3 ${p}" style="grid-row: 3;"><div class="slidelinelvh_track3_cont" style="display: inline-block; position: sticky; left: 0;">${t[_][n]}</div></div>`}return o+=h+u+g+"</div>",r=o},timelinevactualarr=[],eventcontrolvstart=[],slidelvv=function(l,t,e,i,n,o){let r=!0;void 0!==o&&""!=o&&null!=o&&(r=o),timelinevactualarr[l]=[],timelinevactualarr[l]=t,eventcontrolvstart[l]=!0,slidestructure=document.getElementById(l).innerHTML=timelinev(l,t,e,i,n),r&&VsnapToGrid(l)},timelinev_moveto=function(l,t){document.getElementById(l).scrollTo({top:t,behavior:"smooth"}),clearTimeout(vtlmhandl)},vtlmhandl="",timelinev_movehandler=function(l,t){clearTimeout(vtlmhandl);let e=document.getElementById(l).scrollTop,i=parseFloat(document.querySelector("#"+l+" .slidelinelvv").scrollHeight/t.length),n=parseFloat(e%i);n<=parseInt(i/2)&&n>5&&timelinev_moveto(l,e-n),n>i-parseInt(i/2)&&n<i-5&&timelinev_moveto(l,e+(i-n)),clearTimeout(vtlmhandl)},VsnapToGrid=function(l){eventcontrolvstart[l]&&(eventcontrolvstart[l]=!1,document.getElementById(l).onscroll=function(t){clearTimeout(vtlmhandl),vtlmhandl=setTimeout(function(){timelinev_movehandler(l,timelinevactualarr[l])},1e3)})},timelinev=function(l,t,e,i,n){timelinevactualarr[l]=t;let o="",r="";o="<div style='width: 100%; row-gap: 0 !important; display: grid !important; grid-template-columns: 200px 100px 1fr;' class='slidelinelvv'>",r="";let a="",s="",d=1,v="",c="",m=1,h="";for(let u=0;u<t.length;u++){h="",u==t.length-1&&(h="ultimo"),s=t[u][e],d=1;for(let g=u;g<t.length;g++)if(g<t.length-1){if(t[g+1][e]==s)d++,g+1==t.length&&(h="ultimo");else break}s!=a&&(o+=`<div class="slidelinelvv_track1 ${h}" style="grid-column: 1; grid-row: span ${d}"><div class="slidelinelvv_track1_cont" style="display: inline-block; position: sticky; top: 0;">${t[u][e]}</div></div>`),a=s,h="",u==t.length-1&&(h="ultimo"),c=t[u][i],m=1;for(let p=u;p<t.length;p++)if(p<t.length-1){if(t[p+1][i]==c)m++,p+1==t.length&&(h="ultimo");else break}c!=v&&(o+=`<div class="slidelinelvv_track2 ${h}" style="grid-column: 2; grid-row: span ${m}"><div class="slidelinelvv_track2_cont" style="display: inline-block; position: sticky; top: 0;">${t[u][i]}</div></div>`),v=c,h="",u==t.length-1&&(h="ultimo"),o+=`<div class="slidelinelvv_track3 ${h}" style="grid-column: 3;"><div class="slidelinelvv_track3_cont" style="display: inline-block; position: sticky; top: 0;">${t[u][n]}</div></div>`}return o+="</div>",r=o};
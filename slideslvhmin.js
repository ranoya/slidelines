let timelinehactualarr=[],eventcontrolhstart=[],slidelvh=function(l,t,e,i,n,o){let r=!0;void 0!==o&&""!=o&&null!=o&&(r=o),timelinehactualarr[l]=[],timelinehactualarr[l]=t,eventcontrolhstart[l]=!0,slidestructure=document.getElementById(l).innerHTML=timelineh(l,t,e,i,n),r&&snapToGrid(l)},timelineh_moveto=function(l,t){document.getElementById(l).scrollTo({left:t,behavior:"smooth"}),clearTimeout(tlmhandl)},tlmhandl="",timelineh_movehandler=function(l,t){clearTimeout(tlmhandl);let e=document.getElementById(l).scrollLeft,i=parseFloat(document.querySelector("#"+l+" .slidelinelvh").scrollWidth/t.length),n=parseFloat(e%i);n<=parseInt(i/2)&&n>5&&timelineh_moveto(l,e-n),n>i-parseInt(i/2)&&n<i-5&&timelineh_moveto(l,e+(i-n)),clearTimeout(tlmhandl)},snapToGrid=function(l){eventcontrolhstart[l]&&(eventcontrolhstart[l]=!1,document.getElementById(l).onscroll=function(t){clearTimeout(tlmhandl),tlmhandl=setTimeout(function(){timelineh_movehandler(l,timelinehactualarr[l])},1e3)})},timelineh=function(l,t,e,i,n){timelinehactualarr[l]=t;let o="";"undefined"!=typeof instance&&""!=instance&&null!=instance&&(o=instance);let r="",a="";r="<div style='gap: 0 0 !important; display: grid !important; grid-auto-columns: 100% !important; width: 100% !important; grid-template-rows: 40px 40px 400px;' class='slidelinelvh'>",a="";let d="",h="",s=1,m="",c="",v=1,u="",g="",_="",f="";for(let $=0;$<t.length;$++){f="",$==t.length-1&&(f="ultimo"),h=t[$][e],s=1;for(let p=$;p<t.length;p++)if(p<t.length-1){if(t[p+1][e]==h)s++,p+1==t.length&&(f="ultimo");else break}h!=d&&(u+=`<div class="slidelinelvh_track1 ${f}" style="grid-row: 1; grid-column: span ${s}"><div class="slidelinelvh_track1_cont">${t[$][e]}</div></div>`),d=h,f="",$==t.length-1&&(f="ultimo"),c=t[$][i],v=1;for(let y=$;y<t.length;y++)if(y<t.length-1){if(t[y+1][i]==c)v++,y+1==t.length&&(f="ultimo");else break}c!=m&&(g+=`<div class="slidelinelvh_track2 ${f}" style="grid-row: 2; grid-column: span ${v}"><div class="slidelinelvh_track2_cont">${t[$][i]}</div></div>`),m=c,f="",$==t.length-1&&(f="ultimo"),_+=`<div class="slidelinelvh_track3 ${f}" style="grid-row: 3;"><div class="slidelinelvh_track3_cont}">${t[$][n]}</div></div>`}return r+=u+g+_+"</div>",a=r};
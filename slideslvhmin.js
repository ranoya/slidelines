let timelinehactualarr=[],eventcontrolhstart=[],slidelvh=function(l,t,e,i,n,o){let r=!0;void 0!==o&&""!=o&&null!=o&&(r=o),timelinehactualarr[l]=[],timelinehactualarr[l]=t,eventcontrolhstart[l]=!0,slidestructure=document.getElementById(l).innerHTML=timelineh(l,t,e,i,n),r&&snapToGrid(l)},timelineh_moveto=function(l,t){document.getElementById(l).scrollTo({left:t,behavior:"smooth"}),clearTimeout(tlmhandl)},tlmhandl="",timelineh_movehandler=function(l,t){clearTimeout(tlmhandl);let e=document.getElementById(l).scrollLeft,i=parseFloat(document.querySelector("#"+l+" .slidelinelvh").scrollWidth/t.length),n=parseFloat(e%i);n<=parseInt(i/2)&&n>5&&timelineh_moveto(l,e-n),n>i-parseInt(i/2)&&n<i-5&&timelineh_moveto(l,e+(i-n)),clearTimeout(tlmhandl)},snapToGrid=function(l){eventcontrolhstart[l]&&(eventcontrolhstart[l]=!1,document.getElementById(l).onscroll=function(t){clearTimeout(tlmhandl),tlmhandl=setTimeout(function(){timelineh_movehandler(l,timelinehactualarr[l])},1e3)})},timelineh=function(l,t,e,i,n){timelinehactualarr[l]=t;let o="",r="";o="<div style='column-gap: 0 !important; display: grid !important; grid-auto-columns: 100% !important; width: 100% !important; grid-template-rows: 40px 40px 400px;' class='slidelinelvh'>",r="";let a="",s="",d=1,h="",c="",m=1,v="",u="",g="",p="";for(let _=0;_<t.length;_++){p="",_==t.length-1&&(p="ultimo"),s=t[_][e],d=1;for(let f=_;f<t.length;f++)if(f<t.length-1){if(t[f+1][e]==s)d++,f+1==t.length&&(p="ultimo");else break}s!=a&&(v+=`<div class="slidelinelvh_track1 ${p}" style="grid-row: 1; grid-column: span ${d}"><div class="slidelinelvh_track1_cont" style="display: inline-block; position: sticky; left: 0;">${t[_][e]}</div></div>`),a=s,p="",_==t.length-1&&(p="ultimo"),c=t[_][i],m=1;for(let y=_;y<t.length;y++)if(y<t.length-1){if(t[y+1][i]==c)m++,y+1==t.length&&(p="ultimo");else break}c!=h&&(u+=`<div class="slidelinelvh_track2 ${p}" style="grid-row: 2; grid-column: span ${m}"><div class="slidelinelvh_track2_cont" style="display: inline-block; position: sticky; left: 0;">${t[_][i]}</div></div>`),h=c,p="",_==t.length-1&&(p="ultimo"),g+=`<div class="slidelinelvh_track3 ${p}" style="grid-row: 3;"><div class="slidelinelvh_track3_cont" style="display: inline-block; position: sticky; left: 0;">${t[_][n]}</div></div>`}return o+=v+u+g+"</div>",r=o};
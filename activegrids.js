(function(l,s){var p={minWidth:true,width:60,defaultClass:"ags",find:".ags",gt:"gt",lt:"lt",maxCols:16,loading:false},z=s.documentElement,f={},k="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js",i=[],j,a,e="querySelectorAll",b="length",t="addEventListener",d="className",w="clearTimeout",q="setTimeout",r="onreadystatechange",v=function(B){var D,E;if(typeof B!=="undefined"&&!B.type){k=B.jquery||k;B=B||{};for(var C in p){if(!B.hasOwnProperty(C)){B[C]=p[C]}}i.push(B)}else{E=z.clientWidth;D=z.clientHeight;if(m){if(j!==D||a!==E){g(n)}j=D;a=E}}return false},n=function(){for(var B=0,C=i[b];B<C;B++){u(i[B])}},u=function(G){var C=G.find||"",K=s[e](C),U=K[b];K=[].slice.call(K,0)||[];if(!y){var R=f[C]||[];var S=K.slice(R[b]);f[C]=K;K=S}U=K[b];var F,L=G.width,J=G.gt,D=G.lt,P=(G.customClass||G.defaultClass)+"-";for(var Q=0;Q<U;Q++){F=K[Q];var H=F.offsetWidth,T=Math.floor((H-((G.minWidth)?0:1))/L),B=" "+F[d].replace(new RegExp(" "+P+"\\d+\\b| "+P+"gte?\\d+\\b| "+P+"lte?\\d+\\b","g"),""),M="",E="",O,N=0,I;if(!G.minWidth){T++}if(T===0){T=1}I=(J==="gte")?1:0;for(O=1;O<T+I;O++){M+=" "+P+J+O}I=(D==="lt")?1:0;for(O=T+I;O<=G.maxCols;O++){E+=" "+P+D+O}B=(B+M+" "+P+T+E).replace(/\s+/g," ");M="";E="";F[d]=B}},A,c=function(){n();A=l[q](c,76)},y=false,m=function(){y=true;l[w](A);n()},x=function(){var B=jQuery.noConflict();s[e]=B.find;B(function(){m()})},h=function(){if(s[e]&&s[t]){c()}else{if(typeof jQuery!=="undefined"){x()}else{(function(){var D="script",F=s.createElement(D),C=s.getElementsByTagName(D)[0],B,E="readyState";F.async=true;F[r]=F.onload=function(G){if(!B&&(!this[E]||this[E]==="complete"||this[E]==="loaded")){this[r]=null;B=1;x()}};F.src=k;C.parentNode.insertBefore(F,C)})()}}if(s.all&&!s.querySelector){z[d]=z[d]+" ielte7"}},o,g=function(C,B){l[w](o);o=l[q](function(){C()},100)};if(s[t]){s[t]("DOMContentLoaded",m,false)}h();l.activeGrids=v})(window,document);
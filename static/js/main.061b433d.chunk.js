(this["webpackJsonptable-maker-gui"]=this["webpackJsonptable-maker-gui"]||[]).push([[0],{119:function(e,t,n){},120:function(e,t,n){},408:function(e,t,n){"use strict";n.r(t);var c,a,o,r,i=n(0),l=n.n(i),j=n(11),b=n.n(j),u=(n(119),n(120),n(23)),s=n(24),d=n(21),O=n(12),p=(n(121),n(22)),h=n(108),x=n(7),m=(p.a.th(c||(c=Object(d.a)(["\n    background-color: pink;\n"]))),p.a.td(a||(a=Object(d.a)(["\n    padding: 0rem;\n"])))),g=p.a.tr(o||(o=Object(d.a)(["\n    padding: 0em;\n    margin: 0em;\n    // background-color: green;\n"]))),f=p.a.div(r||(r=Object(d.a)(["\n    display: flex;\n    // margin: 1rem;\n    flex-direction: horizontal;\n    \n    > * {\n        margin: 0.5rem;\n    }\n"]))),y=function(e){Object(h.init)((function(e){console.log(e)}));var t=Object(i.useState)([]),n=Object(s.a)(t,2),c=n[0],a=n[1],o=Object(i.useState)([]),r=Object(s.a)(o,2),l=r[0],j=(r[1],Object(i.useState)(0)),b=Object(s.a)(j,2),d=b[0],p=b[1],y=Object(i.useState)(!0),v=Object(s.a)(y,2),k=v[0],C=v[1],T=function(e,t){return e.map((function(e,n){return Object(x.jsx)(m,{children:Object(x.jsx)(O.TextField,{name:"table-cell-y".concat(t,"-x").concat(n),id:"table-cell-y".concat(t,"-x").concat(n),labelText:"","aria-label":"Input for row ".concat(t,", cell ").concat(n),onChange:function(e){return function(e,t,n){var o=Object(u.a)(c);o[t][n]=e.target.value,a(o),console.log({tableData:c})}(e,t,n)},textarea:!0})})}))};return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)("table",{children:[Object(x.jsx)("thead",{children:Object(x.jsx)("tr",{})}),Object(x.jsx)("tbody",{children:c.map((function(e,t){return Object(x.jsx)(g,{children:T(e,t)},"row"+t)}))})]}),Object(x.jsxs)("div",{children:["Row: ",l,", Col: ",d]}),Object(x.jsx)("div",{}),Object(x.jsxs)(f,{children:[Object(x.jsx)(O.Button,{buttonType:"primary",onClick:function(){var e=Object(u.a)(c),t=new Array(d).fill(null);e.push(t),a(e),console.log({tableData:c})},children:"Add Row"}),Object(x.jsx)(O.Button,{buttonType:"primary",onClick:function(){var e=Object(u.a)(c);e.pop(),a(e)},children:"Remove Row"}),Object(x.jsx)(O.Button,{buttonType:"primary",onClick:function(){p(d+1);Object(u.a)(c)},children:"Add Column"}),Object(x.jsx)(O.Button,{buttonType:"primary",onClick:function(){p(d-1)},children:"Remove Column"}),Object(x.jsx)(O.Button,{buttonType:"primary",onClick:function(){C(!k)},children:"Toggle Header"})]})]})};var v=function(){return Object(x.jsx)("div",{className:"App",children:Object(x.jsx)("header",{className:"App-header",children:Object(x.jsx)(y,{})})})},k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,412)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,o=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),o(e),r(e)}))};b.a.render(Object(x.jsx)(l.a.StrictMode,{children:Object(x.jsx)(v,{})}),document.getElementById("root")),k()}},[[408,1,2]]]);
//# sourceMappingURL=main.061b433d.chunk.js.map
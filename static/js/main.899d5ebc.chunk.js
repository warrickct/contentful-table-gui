(this["webpackJsonptable-maker-gui"]=this["webpackJsonptable-maker-gui"]||[]).push([[0],{119:function(e,t,n){},120:function(e,t,n){},408:function(e,t,n){"use strict";n.r(t);var c,a,i,r,l,o,b=n(0),s=n.n(b),u=n(12),j=n.n(u),d=(n(119),n(13)),O=(n(120),n(28)),h=n(23),f=n(10),x=(n(121),n(14)),m=n(49),p=n(7),g=(x.a.th(c||(c=Object(d.a)(["\n    background-color: pink;\n"]))),x.a.div(a||(a=Object(d.a)(["\n    width: 100%;\n    overflow-x: auto;\n    padding: 1rem;\n\n"])))),v=(x.a.td(i||(i=Object(d.a)(["\n    padding: 0rem;\n"]))),Object(x.a)(f.TableRow)(r||(r=Object(d.a)(["\n    background-color: ","\n"])),(function(e){return"true"===e.headers?"#e1e7eb":"white"}))),w=x.a.div(l||(l=Object(d.a)(["\n    display: flex;\n    // margin: 1rem;\n    flex-direction: horizontal;\n    \n    > * {\n        margin: 0.25rem;\n    }\n"]))),T=function(e){var t=Object(b.useState)([]),n=Object(h.a)(t,2),c=n[0],a=n[1],i=Object(b.useState)([]),r=Object(h.a)(i,2),l=r[0],o=(r[1],Object(b.useState)(0)),s=Object(h.a)(o,2),u=s[0],j=s[1],d=Object(b.useState)(!0),x=Object(h.a)(d,2),T=x[0],y=x[1];Object(m.init)((function(e){e.window.startAutoResizer();var t=e.field.getValue();l.length>0&&(a(t.tableData),t.useHeader!==T&&y(!T))}));var C=function(e){a(e),Object(m.init)((function(t){t.field.setValue({useHeader:T,tableData:e})}))},k=function(e,t){return e.map((function(e,n){return Object(p.jsx)(f.TableCell,{children:Object(p.jsx)(f.TextField,{name:"table-cell-y".concat(t,"-x").concat(n),id:"table-cell-y".concat(t,"-x").concat(n),labelText:"","aria-label":"Input for row ".concat(t,", cell ").concat(n),onChange:function(e){return function(e,t,n){var a=Object(O.a)(c);a[t][n]=e.target.value,C(a)}(e,t,n)},textarea:!0})})}))};return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(g,{children:Object(p.jsxs)(f.Table,{className:"table---fixed",children:[Object(p.jsx)(f.TableHead,{}),Object(p.jsx)(f.TableBody,{children:c.map((function(e,t){return Object(p.jsx)(v,{headers:"".concat(T&&0==t),children:k(e,t)},"row"+t)}))})]})}),Object(p.jsxs)(f.Subheading,{children:["Rows: ",c.length," Columns: ",u]}),Object(p.jsx)(w,{children:Object(p.jsx)(f.ToggleButton,{isActive:T,onToggle:function(){y(!T),C(c)},children:"Headers"})}),Object(p.jsxs)(w,{children:[Object(p.jsx)(f.Button,{buttonType:"primary",size:"small",onClick:function(){if(!(u<=0)){var e=Object(O.a)(c),t=new Array(u).fill(null);e.push(t),C(e)}},children:"Add Row"}),Object(p.jsx)(f.Button,{buttonType:"primary",size:"small",onClick:function(){if(!(c.length<=0)){var e=Object(O.a)(c);e.pop(),C(e)}},children:"Remove Row"})]}),Object(p.jsxs)(w,{children:[Object(p.jsx)(f.Button,{buttonType:"primary",size:"small",onClick:function(){j(u+1)},children:"Add Column"}),Object(p.jsx)(f.Button,{buttonType:"primary",size:"small",onClick:function(){u<=0||j(u-1)},children:"Remove Column"})]})]})},y=x.a.div(o||(o=Object(d.a)(["\n  overflow: hidden;\n  border-radius: 10px;\n"])));var C=function(){return Object(p.jsx)(y,{className:"App",children:Object(p.jsx)("header",{className:"App-header",children:Object(p.jsx)(T,{})})})},k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,412)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),i(e),r(e)}))};j.a.render(Object(p.jsx)(s.a.StrictMode,{children:Object(p.jsx)(C,{})}),document.getElementById("root")),k()}},[[408,1,2]]]);
//# sourceMappingURL=main.899d5ebc.chunk.js.map
(this["webpackJsonptable-maker-gui"]=this["webpackJsonptable-maker-gui"]||[]).push([[0],{119:function(e,n,t){},120:function(e,n,t){},408:function(e,n,t){"use strict";t.r(n);var c,a,i,l,r,o,s,u,d,b,j,f=t(0),h=t.n(f),O=t(14),x=t.n(O),g=(t(119),t(11)),p=(t(120),t(15)),m=t(24),v=t(10),y=(t(121),t(12)),w=t(49),T=t(7),k="#c3cfd5",C=Object(y.a)(v.Button)(c||(c=Object(g.a)(["\n    width: 25%%\n"]))),F=Object(y.a)(v.ToggleButton)(a||(a=Object(g.a)(["\n    margin: 0.25rem;\n    width: 35% !important;\n"]))),H=y.a.input(i||(i=Object(g.a)(["\n        display: none;\n"]))),z=y.a.label(l||(l=Object(g.a)(["\n    width: 25%;\n    color: white;\n    font-size: 0.875rem;\n    font-weight: 500;\n    font-size: 14px;\n    border: 1px solid #ccc;\n    border-radius: 0.25rem;\n    display: inline-block;\n    padding: 6px 12px;\n    cursor: pointer;\n    border-color: #2e75d4;\n    background-color: ",";\n"])),"rgb(46, 117, 212)"),D=Object(y.a)(v.TableHead)(r||(r=Object(g.a)(["\n        // th {\n        //     // background-color: ",";\n        // }\n"])),k),A=Object(y.a)(v.TableCell)(o||(o=Object(g.a)(["\n        padding 1rem;\n        display: flex;\n        align-items: center;\n        justify-content: center; \n        flex-direction: column;\n        ",";\n"])),(function(e){return e.useHeaderColor?"background-color: ".concat(k," !important;"):null})),B=Object(y.a)(v.Button)(s||(s=Object(g.a)(["\n    align-self: center;\n"]))),R=y.a.div(u||(u=Object(g.a)(["\n    width: 100%;\n    overflow-x: auto;\n    padding: 1rem;\n    display: flex;\n    flex-direction: row;\n"]))),S=Object(y.a)(v.TableRow)(d||(d=Object(g.a)(["\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n\n    :hover  {\n        background-color: unset !important;\n    }\n"]))),E=y.a.div(b||(b=Object(g.a)(["\n    width: 70%;\n    display: flex;\n    justify-content: center;\n    flex-direction: horizontal;\n    \n    > * {\n        margin: 0.25rem;\n    }\n"]))),P=function(e){var n=Object(f.useState)([]),t=Object(m.a)(n,2),c=t[0],a=t[1],i=Object(f.useState)(3),l=Object(m.a)(i,2),r=l[0],o=l[1],s=Object(f.useState)(!0),u=Object(m.a)(s,2),d=u[0],b=u[1],j=Object(f.useState)(!0),h=Object(m.a)(j,2),O=h[0],x=h[1];Object(f.useEffect)((function(){Object(w.init)((function(e){e.window.startAutoResizer();var n=e.field.getValue();n&&n.tableData&&n.useHeaders&&(a(n.tableData),b(n.useHeader))}))}),[]);var g=function(e){a(e),Object(w.init)((function(n){n.field.setValue({useHorizontalHeaders:d,useVerticalHeaders:O,tableData:e})}))},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!(c.length<=0)){var t=[];e=e||0,n=n||c.length;for(var a=function(e){var n=c[e];t.push(Object(T.jsx)(T.Fragment,{children:Object(T.jsxs)(S,{children:[k(n,e),Object(T.jsx)(A,{useHeaderColor:!1,children:Object(T.jsx)(v.Button,{"aria-label":"Delete row ".concat(e),icon:"Delete",onClick:function(){return V(e)}})})]},"row"+e)}))},i=e;i<n;i++)a(i);return t}},k=function(e,n){return e.map((function(e,t){var a=O&&0===t||0==n&&d;return Object(T.jsxs)(A,{useHeaderColor:a,children:[0===n?Object(T.jsx)(B,{icon:"Delete","aria-label":"Delete column ".concat(t),onClick:function(){return W(t)}}):null,Object(T.jsx)(v.TextField,{name:"table-cell-y".concat(n,"-x").concat(t),id:"table-cell-y".concat(n,"-x").concat(t),labelText:"",value:e,"aria-label":"Text field input for row ".concat(n,", cell ").concat(t),onChange:function(e){return function(e,n,t){var a=Object(p.a)(c);a[n][t]=e.target.value,g(a)}(e,n,t)},textarea:!0})]})}))},P=function(e){var n=0,t=e.split("\n").map((function(e){var t=e.split(",");return n=n<t.length?t.length:n,t}));o(n),g(t)},V=function(e){var n=Object(p.a)(c);n.splice(e,1),g(n)},W=function(e){var n=Object(p.a)(c);n.forEach((function(n){n.splice(e,1)})),o(r-1),g(n)};return Object(T.jsxs)(T.Fragment,{children:[Object(T.jsxs)(E,{children:[Object(T.jsx)(z,{htmlFor:"csv-file",children:"Import .csv"}),Object(T.jsx)(H,{id:"csv-file",onChange:function(e){return function(e){var n=e.target.files,t=new FileReader;t.onload=function(e){if(e&&e.target&&e.target.result){var n=e.target.result;console.log(typeof n),"string"==typeof n&&P(n)}},t.readAsText(n[0]),e.target.value=null}(e)},type:"file",accept:".csv"})]}),Object(T.jsxs)(E,{children:[Object(T.jsx)(F,{isActive:O,onToggle:function(){console.log({tableData:c}),x(!O),g(c)},children:"Vertical Headers"}),Object(T.jsx)(F,{isActive:d,onToggle:function(){console.log({tableData:c}),b(!d),g(c)},children:"Horizontal Headers"})]}),Object(T.jsxs)(E,{children:[Object(T.jsx)(C,{isFullWidth:!0,buttonType:"primary",size:"small",icon:"Plus",onClick:function(){if(!(r<=0)){var e=Object(p.a)(c),n=new Array(r).fill("");e.push(n),g(e)}},"aria-label":"Add new row",children:"Row"}),Object(T.jsx)(C,{isFullWidth:!0,buttonType:"primary",size:"small",icon:"Minus",onClick:function(){if(!(c.length<=0)){var e=Object(p.a)(c);e.pop(),g(e)}},"aria-label":"Remove end row",children:"Row"}),Object(T.jsx)(C,{isFullWidth:!0,buttonType:"primary",size:"small",icon:"Plus","aria-label":"Add new column",onClick:function(){var e=r+1;o(e);var n=Object(p.a)(c);n.forEach((function(t,c){if(t.length<e){var a=t.concat(new Array(e-t.length).fill(""));n[c]=a}})),g(n)},children:"Column"}),Object(T.jsx)(C,{isFullWidth:!0,buttonType:"primary",size:"small",icon:"Minus","aria-label":"Remove end column",onClick:function(){if(!(r<=0)){var e=r-1;o(e);var n=Object(p.a)(c);n.forEach((function(t,c){if(t.length>e){console.log("reducing column size");var a=t.slice(0,e);n[c]=a}})),g(n)}},children:"Column"})]}),Object(T.jsx)(R,{children:Object(T.jsx)(v.Table,{children:d?Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)(D,{children:y(0,1)}),Object(T.jsx)(v.TableBody,{children:y(1)})]}):Object(T.jsx)(v.TableBody,{children:y()})})}),Object(T.jsxs)(v.Subheading,{children:["Grid Dimensions: ",c.length," x ",r]}),Object(T.jsx)(v.HelpText,{children:"You can use basic text modifiers to alter text. bold: **your text**, strike through: ~~your text~~, underline: <u>your text</u>, links: [link title](link url)"})]})},V=y.a.div(j||(j=Object(g.a)(["\n  overflow: hidden;\n  border-radius: 10px;\n"])));var W=function(){return Object(T.jsx)(V,{className:"App",children:Object(T.jsx)("header",{className:"App-header",children:Object(T.jsx)(P,{})})})},I=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,412)).then((function(n){var t=n.getCLS,c=n.getFID,a=n.getFCP,i=n.getLCP,l=n.getTTFB;t(e),c(e),a(e),i(e),l(e)}))};x.a.render(Object(T.jsx)(h.a.StrictMode,{children:Object(T.jsx)(W,{})}),document.getElementById("root")),I()}},[[408,1,2]]]);
//# sourceMappingURL=main.89b8bfcf.chunk.js.map
(this["webpackJsonpkloop-forms"]=this["webpackJsonpkloop-forms"]||[]).push([[0],{114:function(e,t,n){e.exports=n(149)},119:function(e,t,n){},149:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(12),l=n.n(o),i=(n(119),n(42)),c=(n(55),n(26)),s=n(11),u=n(31),d=n.n(u),f=n(45),m=n(7),p=n(59),b=n.n(p);b.a.initializeApp({apiKey:"AIzaSyCCAhvWFvwuxDUXZ4aV-FhB_Dj-lp_frCw",authDomain:"electionsmonitor-5d008.firebaseapp.com",databaseURL:"https://electionsmonitor-5d008.firebaseio.com",projectId:"electionsmonitor-5d008",storageBucket:"electionsmonitor-5d008.appspot.com",messagingSenderId:"145410178875",appId:"1:145410178875:web:6cf434df68d3c65062811e",measurementId:"G-EXC8T9QXES"});var h=new b.a.auth.GoogleAuthProvider,g=function(){b.a.auth().signInWithPopup(h)},E=b.a,v=n(32),O=r.a.createContext(),w=function(e){var t=e.children,n=Object(a.useState)(null),o=Object(m.a)(n,2),l=o[0],i=o[1],c=Object(a.useState)(!0),s=Object(m.a)(c,2),u=s[0],d=s[1];return Object(a.useEffect)((function(){E.auth().onAuthStateChanged((function(e){i(e),d(!1);var t=E.firestore().collection("users").doc(e.uid);t.get().then((function(n){n&&n.exists?n.data().role&&t.set({name:e.displayName,role:n.data().role}):t.set({name:e.displayName,role:"independent"})}))}))}),[]),u?r.a.createElement(r.a.Fragment,null,"Loading..."):r.a.createElement(O.Provider,{value:{currentUser:l}},t)},j=n(181),y=n(201),x=Object(j.a)((function(e){return{root:{"& > *":{width:"40ch"}}}}));var S=function(e){var t=x(),n=r.a.useState(""),o=Object(m.a)(n,2),l=o[0],i=o[1],c=e.index,s=e.response;return Object(a.useEffect)((function(){s&&i(s)}),[s]),r.a.createElement("div",null,r.a.createElement("form",{noValidate:!0,autoComplete:"off"},r.a.createElement("h4",null,e.title),r.a.createElement(y.a,{className:t.root,id:"inputBox"+c,label:"\u041c\u043e\u0439 \u043e\u0442\u0432\u0435\u0442",value:l,onChange:function(t){i(t.target.value),e.returnAnswer(t.target.value,c,t.target.value)},disabled:!!e.locked})))},k=n(203),C=n(204),_=n(186),D=n(195),F=Object(j.a)((function(e){return{formControl:{minWidth:120}}}));function A(e){var t=F(),n=r.a.useState(""),o=Object(m.a)(n,2),l=o[0],i=o[1],c=r.a.useState(!1),s=Object(m.a)(c,2),u=s[0],d=s[1],f=e.index,p=e.response;Object(a.useEffect)((function(){p&&i(p)}),[p]);return r.a.createElement("div",null,r.a.createElement("h4",null,e.title),r.a.createElement(_.a,{className:t.formControl,disabled:!!e.locked},r.a.createElement(k.a,{id:"controlled-open-select-label"},"\u0412\u044b\u0431\u0440\u0430\u0442\u044c"),r.a.createElement(D.a,{labelId:"controlled-open-select-label",id:"select"+f,open:u,onClose:function(e){d(!1)},onOpen:function(e){d(!0)},value:l,onChange:function(t){i(t.target.value);var n=e.answers.indexOf(t.target.value);e.returnAnswer(t.target.value,f,n)}},r.a.createElement(C.a,{value:""},r.a.createElement("em",null,"None")),e.answers.map((function(e,t){return r.a.createElement(C.a,{key:t,value:e},e)})))))}var R=n(197),M=n(199),U=n(187);function q(e){var t=r.a.useState(""),n=Object(m.a)(t,2),o=n[0],l=n[1],i=e.index,c=e.response;Object(a.useEffect)((function(){c&&l(c)}),[c]);return r.a.createElement("div",null,r.a.createElement("h4",null,e.title),r.a.createElement(_.a,{const:"fieldset"},r.a.createElement(M.a,{"aria-label":e.title,name:e.title,value:o,onChange:function(t){l(t.target.value);var n=e.answers.indexOf(t.target.value);e.returnAnswer(t.target.value,i,n)}},e.answers.map((function(t,n){return r.a.createElement(U.a,{key:n,value:t,control:r.a.createElement(R.a,null),label:t,disabled:!!e.locked})})))))}var L=Object(j.a)((function(e){return{container:{display:"flex",flexWrap:"wrap"},textField:{marginLeft:e.spacing(1),marginRight:e.spacing(1),width:"auto"}}}));function I(e){var t=L(),n=r.a.useState(""),o=Object(m.a)(n,2),l=o[0],i=o[1],c=e.index,s=e.response;Object(a.useEffect)((function(){s&&i(s)}),[c,s]);return r.a.createElement("div",null,r.a.createElement("h4",null,e.title),r.a.createElement("form",{className:t.container,noValidate:!0},r.a.createElement(y.a,{id:"time"+c,label:"\u0412\u0440\u0435\u043c\u044f",type:"time",value:l,onChange:function(t){i(t.target.value),e.returnAnswer(t.target.value,c,t.target.value)},className:t.textField,InputLabelProps:{shrink:!0},InputProps:{disableUnderline:!0},disabled:!!e.locked})))}var N=Object(j.a)({root:{background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",border:0,borderRadius:3,boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",color:"white",height:48,padding:"0 30px"}});function z(e){N();var t=Object(a.useState)({}),n=Object(m.a)(t,2),o=n[0],l=n[1],i=Object(a.useState)({}),c=Object(m.a)(i,2),s=c[0],u=c[1],d={},f={},p=e.index,b=e.response;Object(a.useEffect)((function(){b&&l(b)}),[b]);var h=function(t){return function(n){(d=Object(v.a)({},o))[t]=n.target.value,l(d),f=Object(v.a)({},s);var a=e.answers.indexOf(n.target.value);f[t]=a,u(f),e.returnAnswer(d,p,f)}};return r.a.createElement("div",{className:"radioHorizontal"},r.a.createElement("h4",null,e.title),r.a.createElement("button",{onClick:function(){l({}),e.returnAnswer({},p)}},"clear"),r.a.createElement("div",{className:"question_item"},e.subquestion.map((function(t,n){return r.a.createElement("div",{className:"question_item_",key:n},r.a.createElement("p",null,t.q),r.a.createElement(_.a,{component:"fieldset"},r.a.createElement(M.a,{"aria-label":"position",name:"position",row:!0,value:o[n]?o[n]:"",onClick:h(n)},e.answers.map((function(t,n){return r.a.createElement(U.a,{key:n,value:t,control:r.a.createElement(R.a,{color:"primary"}),label:t,labelPlacement:"top",disabled:!!e.locked,style:{paddingLeft:5,paddingRight:5}})})))))}))))}var T=n(200),B=n(188),W=n(48),P=n.n(W),G=n(189),H=n(152),K=n(72),J=Object(s.i)((function(e){var t=Object(a.useState)([]),n=Object(m.a)(t,2),o=n[0],l=n[1],i=Object(a.useState)({}),c=Object(m.a)(i,2),u=c[0],p=c[1],b=Object(a.useState)({}),h=Object(m.a)(b,2),g=h[0],w=h[1],j=Object(a.useState)({}),y=Object(m.a)(j,2),x=y[0],k=y[1],C=Object(a.useState)(!1),_=Object(m.a)(C,2),D=_[0],F=_[1],R=Object(a.useState)(!1),M=Object(m.a)(R,2),U=M[0],L=M[1],N=Object(a.useState)(!1),W=Object(m.a)(N,2),J=W[0],Q=W[1],V=Object(a.useState)(!1),X=Object(m.a)(V,2),Y=X[0],Z=X[1],$=Object(a.useState)(!1),ee=Object(m.a)($,2),te=ee[0],ne=ee[1],ae=Object(a.useState)(!1),re=Object(m.a)(ae,2),oe=re[0],le=re[1],ie=Object(a.useState)(null),ce=Object(m.a)(ie,2),se=ce[0],ue=ce[1],de=Object(a.useState)(null),fe=Object(m.a)(de,2),me=fe[0],pe=fe[1],be=Object(a.useContext)(O).currentUser,he=Object(s.g)().form;Object(a.useEffect)((function(){var e=K.parse(window.location.search);console.log(e),e.url?fetch(e.url).then((function(e){return console.log("RESPONSE",e),e.json()})).then((function(t){console.log("DATA",t),t.forEach((function(t){t.path==="/"+he&&(ue(t),fetch(t.url).then((function(e){return e.json()})).then((function(t){l(t),le(!0),e.response&&ve(t,e),t.period&&Ee(t),console.log(t)})))}))})):console.log("ERROR: no url detected")}),[]);var ge=function(){var e=Object(f.a)(d.a.mark((function e(){var t,n,a,r,l,i;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=g,n=o.main_title,pe({answers:t,form_name:n}),a=K.parse(window.location.search),e.next=7,fetch(a.url);case 7:if(e.sent.ok){e.next=11;break}throw ne(!0),new Error("\u041e\u0442\u0432\u0435\u0442 \u0441\u0435\u0442\u0438 \u0431\u044b\u043b \u043d\u0435 ok.");case 11:r=E.firestore().collection("responses"),(l=r.doc(be.uid)).set({email:be.email}),i=l.collection("answers"),console.log(se),console.log(u),console.log(o.main_title),i.add({answers:u,form_name:o.main_title,form_url:se.url,date:new Date}).then((function(e){L(!0),Z(!0)})).catch((function(e){ne(!0),console.log(e)})),console.log("data uploaded"),ne(!0),e.next=27;break;case 23:e.prev=23,e.t0=e.catch(0),alert(e.t0),ne(!0);case 27:case"end":return e.stop()}}),e,null,[[0,23]])})));return function(){return e.apply(this,arguments)}}(),Ee=function(e){var t=new Date,n=new Date(e.period.start),a=new Date(e.period.finish);n>t&&e.period.before.nofill||n<t&&t<a&&e.period.in.nofill||t>a&&e.period.after.nofill?F(!0):F(!1),console.log("LOCKED ",D)},ve=function(e,t){var n=decodeURI(t.response),a=JSON.parse(n);k(a);for(var r=0,o=Object.entries(a);r<o.length;r++){var l=Object(m.a)(o[r],2),i=l[0],c=l[1],s=null;if(i===Object.keys(a)[0]&&Oe(c,i),"input"===e.questions[i].type)Oe(c,i);else if("time"===e.questions[i].type)Oe(c,i,c);else if("multiradio"===e.questions[i].type)for(var u=0,d=Object.entries(c);u<d.length;u++){var f=Object(m.a)(d[u],2),p=f[0],b=f[1],h=e.questions[i].answer.indexOf(b),E=Object(v.a)({},g[i]);E[p]=h,Oe(c,i,E)}else s=e.questions[i].answer.indexOf(c),Oe(c,i,s)}},Oe=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=Object(v.a)({},u);a[t]=e,p(a);var r=Object(v.a)({},g);r[t]=n,w(r)},we=function(e,t){"clickaway"!==t&&L(!1)},je=oe?o.questions.map((function(e,t){var n=x;return"input"===e.type?r.a.createElement(S,{key:t,index:t,title:e.title,response:n[t],returnAnswer:Oe,locked:D}):"select"===e.type?r.a.createElement(A,{key:t,index:t,title:e.title,response:n[t],answers:e.answer,returnAnswer:Oe,locked:D}):"radio"===e.type?r.a.createElement(q,{key:t,index:t,title:e.title,response:n[t],answers:e.answer,returnAnswer:Oe,locked:D}):"time"===e.type?r.a.createElement(I,{key:t,index:t,title:e.title,response:n[t],returnAnswer:Oe,locked:D}):"multiradio"===e.type?r.a.createElement(z,{key:t,index:t,title:e.title,response:n[t],subquestion:e.subquestion,answers:e.answer,returnAnswer:Oe,locked:D}):null})):null;return r.a.createElement("div",null,r.a.createElement(H.a,{variant:"h4",style:{padding:20},align:"center"},o.main_title),o.period?r.a.createElement("div",null,r.a.createElement("p",null,"\u041d\u0430\u0447\u0430\u043b\u043e: ",o.period.start),r.a.createElement("p",null,"\u041a\u043e\u043d\u0435\u0446: ",o.period.finish)):null,J?r.a.createElement(s.a,{to:"/ElectionsMonitoringForms/files"+window.location.search}):null,r.a.createElement("div",null,je,r.a.createElement("div",{style:{paddingTop:20,paddingBottom:20,textAlign:"center"}},r.a.createElement(G.a,{variant:"outlined",style:{borderWidth:2,borderColor:"#003366",color:"#003366",margin:10},disabled:!!D,onClick:ge},"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c"),Y?r.a.createElement(G.a,{variant:"outlined",style:{borderWidth:2,borderColor:"red",color:"red",margin:10},disabled:!!D,onClick:function(){return Q(!0)}},"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0435 \u0444\u0430\u0439\u043b\u043e\u0432"):null)),te?r.a.createElement("p",{style:{textAlign:"left"}},"\u041a\u043e\u0440\u043e\u0442\u043a\u0438\u0439 \u043e\u0442\u0432\u0435\u0442: ",JSON.stringify(me)):null,r.a.createElement(T.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:U,autoHideDuration:6e3,onClose:we,message:"\u0412\u0430\u0448 \u043e\u0442\u0432\u0435\u0442 \u043f\u0440\u0438\u043d\u044f\u0442",action:r.a.createElement(r.a.Fragment,null,r.a.createElement(B.a,{size:"small","aria-label":"close",color:"inherit",onClick:we},r.a.createElement(P.a,{fontSize:"small"})))}))})),Q=n(191),V=n(190),X=n(196),Y=n(192),Z=function(e){var t=Object(a.useState)([]),n=Object(m.a)(t,2),o=n[0],l=n[1],i=Object(a.useState)({}),c=Object(m.a)(i,2),u=c[0],d=c[1],f=Object(a.useState)(!1),p=Object(m.a)(f,2),b=p[0],h=p[1],g=Object(a.useState)(!1),v=Object(m.a)(g,2),w=v[0],j=v[1],y=Object(a.useState)(!0),x=Object(m.a)(y,2),S=x[0],k=x[1],C=Object(a.useState)([]),_=Object(m.a)(C,2),D=_[0],F=_[1],A=Object(a.useState)(null),R=Object(m.a)(A,2),M=R[0],U=R[1],q=Object(a.useState)(!1),L=Object(m.a)(q,2),I=L[0],N=L[1],z=Object(a.useState)(0),W=Object(m.a)(z,2),K=(W[0],W[1]),J=Object(a.useContext)(O).currentUser,V=Object(s.g)().id,X={},Z={},$=[];Object(a.useEffect)((function(){ee()}),[]);var ee=function(){var e=E.firestore().collection("responses").doc(J.uid).collection("answers");V?e.doc(V).get().then((function(e){d(e.data().answers),U(e.id),te(e.data())})):e.orderBy("date","desc").limit(1).get().then((function(e){e.forEach((function(e){console.log(e.id," => ",e.data()),e&&e.exists&&(d(e.data().answers),U(e.id),te(e.data()))}))}))},te=function(e){fetch(e.form_url).then((function(e){return e.json()})).then((function(t){console.log(t),l(t),t.period&&ne(t),ae(t,e.answers),console.log(u),F($),console.log($)}))},ne=function(e){var t=new Date,n=new Date(e.period.start),a=new Date(e.period.finish);n>t&&e.period.before.nofill||n<t&&t<a&&e.period.in.nofill||t>a&&e.period.after.nofill?h(!0):h(!1),console.log("LOCKED ",b)},ae=function(e,t){e.questions.forEach((function(e,n){e.attachMaterials&&("multiradio"===e.type?t[n]&&(console.log("ANS",t),Object.keys(t[n]).forEach((function(a){console.log(a),t[n][a]===e.subquestion[a].on&&(k(!1),$.push({title:e.subquestion[a].q,index:n,subindex:a}))}))):(k(!1),$.push({title:e.title,index:n})))}))},re=function(e,t){"clickaway"!==t&&j(!0)};return r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement(H.a,{variant:"h4",align:"center"},o.main_title),D.map((function(e,t){var n=e.title,a=e.index.toString(),o=e.subindex?e.subindex.toString():null;return r.a.createElement("div",{key:o?a+"."+o:a,style:{padding:20}},r.a.createElement(H.a,{variant:"body1",style:{fontSize:16,fontWeight:"bolder"}},n),r.a.createElement(Q.a,{container:!0,display:"flex",style:{paddingTop:10,paddingLeft:20}},r.a.createElement(H.a,{variant:"body1",style:{paddingRight:20}},"\u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043b\u044b"),r.a.createElement("input",{disabled:b,type:"file",name:"filefield",multiple:"multiple",onChange:function(e){return function(e,t,n,a){X[a]={file:e.target.files,index:t,subindex:n}}(e,a,o,t)}})),r.a.createElement(Q.a,{container:!0,style:{paddingTop:10,paddingLeft:20}},r.a.createElement(H.a,{variant:"body1",style:{paddingRight:20}},"\u0438\u043b\u0438 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 URL"),r.a.createElement("input",{type:"text",size:"40",onChange:function(e){return function(e,t,n,a){Z[a]={url:e.target.value,index:t,subindex:n}}(e,a,o,t)}})))})),S?r.a.createElement(H.a,{variant:"h6",align:"center"},"\u041a \u044d\u0442\u043e\u0439 \u0444\u043e\u0440\u043c\u0435 \u043d\u0435\u043b\u044c\u0437\u044f \u043f\u0440\u0438\u043b\u043e\u0436\u0438\u0442\u044c \u0444\u0430\u0439\u043b"):r.a.createElement("div",null,r.a.createElement(Q.a,{container:!0,justify:"center",style:{paddingTop:20,paddingBottom:20}},r.a.createElement(G.a,{variant:"contained",onClick:function(){var e=E.storage().ref().child(J.uid),t=0;K(0),N(!0),Object.values(X).forEach((function(e){Array.from(e.file).forEach((function(e){return t+=1}))})),Object.values(Z).forEach((function(e){return t+=1}));console.log("COUNT",t),Object.values(X).concat(Object.values(Z)).forEach((function(t,n){if(t.file&&Array.from(t.file).forEach((function(n){e.child(n.name).put(n).then((function(e){return e.ref.getDownloadURL()})).then((function(e){var n=E.firestore().collection("responses").doc(J.uid);j(!0);var a=n.collection("files");console.log("\u0424\u0430\u0439\u043b \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d"),a.add({filepath:e,answer_number:t.index,answer_id:M,answer_subnumber:t.subindex,form_name:o.main_title,date:new Date}).then((function(){return N(!1)})).catch((function(e){return alert(e)}))})).catch(console.error)})),t.url){var a=E.firestore().collection("responses").doc(J.uid);j(!0);var r=a.collection("files");console.log("\u0424\u0430\u0439\u043b \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d"),r.add({filepath:t.url,answer_number:t.index,answer_id:M,answer_subnumber:t.subindex,form_name:o.main_title,date:new Date}).then((function(){return N(!1)})).catch((function(e){return alert(e)}))}}))}},"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c")),r.a.createElement(Q.a,{container:!0,justify:"center"},I?r.a.createElement(Y.a,null):null)),r.a.createElement(T.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:w,autoHideDuration:5e3,onClose:re,message:"\u0412\u0430\u0448\u0438 \u0444\u0430\u0439\u043b\u044b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u044b",action:r.a.createElement(r.a.Fragment,null,r.a.createElement(B.a,{size:"small","aria-label":"close",color:"inherit",onClick:re},r.a.createElement(P.a,{fontSize:"small"})))}))},$=function(){var e=Object(a.useState)(null),t=Object(m.a)(e,2),n=t[0],o=t[1],l=Object(a.useContext)(O).currentUser;return Object(a.useEffect)((function(){var e=E.firestore().collection("responses").doc(l.uid);console.log(l.uid),e.collection("answers").orderBy("date","desc").get().then((function(e){var t=[];e.forEach((function(e){e&&e.exists&&t.push({id:e.id,data:e.data()})})),o(t)}))}),[l]),console.log(n),r.a.createElement(r.a.Fragment,null,r.a.createElement(H.a,{variant:"h4",align:"center"},"\u0418\u0441\u0442\u043e\u0440\u0438\u044f"),n?n.map((function(e){var t=new Date(1e3*Object(v.a)({},e.data.date).seconds),n=[t.getDate().toString().length<2?"0"+t.getDate():t.getDate(),(t.getMonth()+1).toString().length<2?"0"+(t.getMonth()+1):t.getMonth()+1,t.getFullYear()].join("/")+" "+[t.getHours().toString().length<2?"0"+t.getHours():t.getHours(),t.getMinutes().toString().length<2?"0"+t.getMinutes():t.getMinutes(),t.getSeconds().toString().length<2?"0"+t.getSeconds():t.getSeconds()].join(":").toString();return r.a.createElement(Q.a,{container:!0,alignItems:"center"},r.a.createElement(c.b,{to:"/ElectionsMonitoringForms/files/"+e.id+window.location.search,style:{flexGrow:1,paddingRight:20}},e.data.form_name),r.a.createElement("p",null,n))})):r.a.createElement(H.a,{variant:"h6",align:"center",style:{marginTop:20}},"\u041f\u0443\u0441\u0442\u043e"))},ee=n(72),te=function(e){var t=Object(a.useState)([]),n=Object(m.a)(t,2),o=n[0],l=n[1],i=Object(a.useState)({}),u=Object(m.a)(i,2),p=u[0],b=u[1],h=Object(a.useState)(null),g=Object(m.a)(h,2),v=g[0],w=g[1],j=Object(a.useState)(null),y=Object(m.a)(j,2),x=y[0],S=y[1],k=Object(a.useContext)(O).currentUser,C=Object(s.h)(),_=C.path,D=C.url;Object(a.useEffect)((function(){E.firestore().collection("users").doc(k.uid).get().then((function(e){return S(e.data().role)}));var e=ee.parse(window.location.search);console.log(e),e.url?fetch(e.url).then((function(e){return console.log("RESPONSE",e),e.json()})).then((function(e){console.log("DATA",e),l(e);var t=e.map(function(){var e=Object(f.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t.url).then((function(e){return e.json()})).then((function(e){return e}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());Promise.all(t).then((function(e){w(e),F(e)}))})):console.log("ERROR: no url detected")}),[]);var F=function(e){E.firestore().collection("responses").doc(k.uid).collection("files").get().then((function(t){var n={};e.forEach((function(e){return n[e.main_title]=0})),t.forEach((function(t){if(t&&t.exists){var a=t.data();e.forEach((function(e){a.form_name===e.main_title&&(n[e.main_title]+=1)}))}})),b(n)}))};return r.a.createElement(r.a.Fragment,null,r.a.createElement("br",null),v&&x?r.a.createElement("div",null,o.map((function(e,t){return console.log(e.role,x),function(e){var t=new Date,n=new Date(e.period.start),a=new Date(e.period.finish);return!!(n>t&&e.period.before.nofill)||(!!(n<t&&t<a&&e.period.in.nofill)||!!(t>a&&e.period.after.nofill))}(v[t])?null:x===e.role||"all"===e.role||"moderator"===x?r.a.createElement(Q.a,{key:t,container:!0,display:"flex",alignItems:"center"},r.a.createElement("li",null),r.a.createElement(c.b,{to:D+e.path+window.location.search,style:{flexGrow:1}},e.label),r.a.createElement("p",null,"\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e \u0444\u0430\u0439\u043b\u043e\u0432: ",p[v[t].main_title])):null})),r.a.createElement("br",null),r.a.createElement(s.d,null,r.a.createElement(s.b,{exact:!0,path:_},r.a.createElement($,null)),r.a.createElement(s.b,{path:_+"/:form"},r.a.createElement(J,null)))):null)},ne=Object(s.i)((function(e){e.history;var t=Object(a.useContext)(O).currentUser;Object(s.h)().url;return t?r.a.createElement(s.a,{to:"/ElectionsMonitoringForms/form"+window.location.search}):r.a.createElement("div",null,r.a.createElement(H.a,{align:"center",variant:"h4"},"\u0412\u043e\u0439\u0442\u0438 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430 Google"),r.a.createElement(Q.a,{container:!0,justify:"center",style:{marginTop:20}},r.a.createElement(G.a,{variant:"contained",onClick:g},"Sign-in with Google")))})),ae=Object(s.i)((function(e){var t=e.history;Object(a.useCallback)(function(){var e=Object(f.a)(d.a.mark((function e(n){var a,r,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),a=n.target.elements,r=a.email,o=a.password,e.prev=2,e.next=5,E.auth().createUserWithEmailAndPassword(r.value,o.value);case 5:t.push("/ElectionsMonitoringForms"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),alert(e.t0);case 11:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(t){return e.apply(this,arguments)}}(),[t]);return r.a.createElement("div",null,r.a.createElement("h1",null,"Sign up"),r.a.createElement("button",{onClick:g},"Sign-in with Google"))})),re=n(93),oe=function(e){var t=e.component,n=Object(re.a)(e,["component"]),o=Object(a.useContext)(O).currentUser;return r.a.createElement(s.b,Object.assign({},n,{render:function(e){return o?r.a.createElement(t,e):r.a.createElement(s.a,{to:"/ElectionsMonitoringForms/login"+window.location.search})}}))},le=n(90),ie=n(91),ce=n(94),se=n(92),ue=n(72),de=function(e){Object(ce.a)(n,e);var t=Object(se.a)(n);function n(){var e;Object(le.a)(this,n);for(var a=arguments.length,o=new Array(a),l=0;l<a;l++)o[l]=arguments[l];return(e=t.call.apply(t,[this].concat(o))).state={questions:[],main_title:"",answers:{},id:"",showAnswers:!1,period:null,locked:!1,showFileUpload:!1,fileInputs:[],snackbar:!1,uploadSuccsess:!1},e.downloadData=function(t){var n=ue.parse(window.location.search,{decode:!1});t?(console.log(n),fetch(t).then((function(e){return e.json()})).then((function(t){console.log(t),e.setState({questions:t.questions,main_title:t.main_title,period:t.period}),t.period&&e.timeManager(t),e.renderFiles(),e.setState({fileInputs:e.fileInputs}),console.log(e.fileInputs)}))):console.log("ERROR: no url detected")},e.loadAttachmentQuestions=function(){E.firestore().collection("responses").doc(e.context.currentUser.uid).collection("answers").orderBy("date","desc").limit(1).get().then((function(t){t.forEach((function(t){console.log(t.id," => ",t.data()),t&&t.exists&&(e.setState({answers:t.data().answers}),e.setState({id:t.id}),e.downloadData(t.data().form_url))}))})),e.setState({showFileUpload:!0})},e.timeManager=function(t){var n=new Date,a=new Date(t.period.start),r=new Date(t.period.finish);a>n&&t.period.before.nofill||a<n&&n<r&&t.period.in.nofill||n>r&&t.period.after.nofill?e.setState({locked:!0}):e.setState({locked:!1}),console.log("LOCKED ",e.state.locked)},e.fileInputs=[],e.renderFiles=function(){e.state.questions.forEach((function(t,n){t.attachMaterials&&("multiradio"===t.type?e.state.answers[n]&&Object.keys(e.state.answers[n]).forEach((function(a){console.log(a),e.state.answers[n][a]===t.subquestion[a].on&&e.fileInputs.push({title:t.subquestion[a].q,index:n,subindex:a})})):e.fileInputs.push({title:t.title,index:n}))}))},e.handleCloseSnackbar=function(t,n){"clickaway"!==n&&e.setState({snackbar:!1})},e.files={},e.filesData={},e.progress=0,e.handleFileChange=function(t,n,a,r){e.files[r]={file:t.target.files,index:n,subindex:a}},e.handleURLChange=function(t,n,a,r){e.filesData[r]={url:t.target.value,index:n,subindex:a}},e.uploadFiles=function(){var t=E.storage().ref().child(e.context.currentUser.uid);e.progress=0;var n=0;Object.values(e.files).forEach((function(e){Array.from(e.file).forEach((function(e){return n+=1}))})),Object.values(e.filesData).forEach((function(e){return n+=1})),console.log("COUNT",n),Object.values(e.files).concat(Object.values(e.filesData)).forEach((function(a,r){if(a.file&&Array.from(a.file).forEach((function(r){t.child(r.name).put(r).then((function(e){return e.ref.getDownloadURL()})).then((function(t){var r=E.firestore().collection("responses").doc(e.context.currentUser.uid).collection("files");e.setState({snackbar:!0}),console.log("\u0424\u0430\u0439\u043b \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d"),r.add({filepath:t,answer_number:a.index,answer_id:e.state.id,answer_subnumber:a.subindex,form_name:e.state.main_title,date:new Date}).then((function(){return e.progress+=1/n*100})).catch((function(e){return alert(e)}))})).catch(console.error)})),a.url){var o=E.firestore().collection("responses").doc(e.context.currentUser.uid).collection("files");e.setState({snackbar:!0}),o.add({filepath:a.url,answer_number:a.index,answer_id:e.state.id,answer_subnumber:a.subindex}).then((function(){return e.progress+=1/n*100})).catch((function(e){return alert(e)}))}}))},e.LinearProgressWithLabel=function(e){return r.a.createElement(X.a,{display:"flex",alignItems:"center"},r.a.createElement(X.a,{width:"100%",mr:1},r.a.createElement(V.a,Object.assign({variant:"determinate"},e))),r.a.createElement(X.a,{minWidth:35},r.a.createElement(H.a,{variant:"body2",color:"textSecondary"},"".concat(Math.round(e.value),"%"))))},e}return Object(ie.a)(n,[{key:"componentDidMount",value:function(){this.loadAttachmentQuestions()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(H.a,{variant:"h4",align:"center"},this.state.main_title),this.fileInputs.map((function(t,n){var a=t.title,o=t.index.toString(),l=t.subindex?t.subindex.toString():null;return r.a.createElement("div",{key:l?o+"."+l:o,style:{padding:20}},r.a.createElement(H.a,{variant:"body1",style:{fontSize:16,fontWeight:"bolder"}},a),r.a.createElement(Q.a,{container:!0,display:"flex",style:{paddingTop:10,paddingLeft:20}},r.a.createElement(H.a,{variant:"body1",style:{paddingRight:20}},"\u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043b\u044b"),r.a.createElement("input",{disabled:e.state.locked,type:"file",name:"filefield",multiple:"multiple",onChange:function(t){return e.handleFileChange(t,o,l,n)}})),r.a.createElement(Q.a,{container:!0,style:{paddingTop:10,paddingLeft:20}},r.a.createElement(H.a,{variant:"body1",style:{paddingRight:20}},"\u0438\u043b\u0438 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 URL"),r.a.createElement("input",{type:"text",size:"40",onChange:function(t){return e.handleURLChange(t,o,l,n)}})))})),r.a.createElement(Q.a,{container:!0,justify:"center",style:{paddingTop:20,paddingBottom:20}},r.a.createElement(G.a,{variant:"contained",onClick:this.uploadFiles},"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c")),r.a.createElement(this.LinearProgressWithLabel,{value:this.progress}),r.a.createElement(T.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:this.state.snackbar,autoHideDuration:5e3,onClose:this.handleCloseSnackbar,message:"\u0412\u0430\u0448\u0438 \u0444\u0430\u0439\u043b\u044b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u044b",action:r.a.createElement(r.a.Fragment,null,r.a.createElement(B.a,{size:"small","aria-label":"close",color:"inherit",onClick:this.handleCloseSnackbar},r.a.createElement(P.a,{fontSize:"small"})))}))}}]),n}(a.Component);de.contextType=O;var fe=n(193),me=n(194),pe=Object(j.a)((function(e){var t;return{app:(t={padding:"10px"},Object(i.a)(t,e.breakpoints.down("sm"),{width:"100%"}),Object(i.a)(t,e.breakpoints.up("sm"),{width:"70%"}),Object(i.a)(t,e.breakpoints.up("md"),{width:"50%"}),Object(i.a)(t,"title",{fontColor:"blue"}),t),appbar:{background:"transparent",boxShadow:"none"},title:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},avatar:{width:e.spacing(4),height:e.spacing(4)},toolbar:{padding:0}}})),be=function(){var e=Object(a.useContext)(O).currentUser,t=pe(),n="";return e&&e.email&&(n=e.email),r.a.createElement("div",null,r.a.createElement(fe.a,{position:"static",className:t.appbar},r.a.createElement(me.a,null,r.a.createElement(Q.a,{style:{flexGrow:1}},r.a.createElement("img",{src:"https://kloop.kg/wp-content/uploads/2017/01/kloop_transparent_site.png",alt:"Kloop.kg - \u041d\u043e\u0432\u043e\u0441\u0442\u0438 \u041a\u044b\u0440\u0433\u044b\u0437\u0441\u0442\u0430\u043d\u0430",style:{width:"180px",height:"auto"}})),r.a.createElement(H.a,{variant:"body1",style:{color:"#003366"}},n),e?r.a.createElement(G.a,{style:{marginLeft:10,fontSize:12},size:"small",variant:"outlined",color:"#003366",onClick:function(){return E.auth().signOut()}},"\u0432\u044b\u0445\u043e\u0434"):null)),r.a.createElement(Q.a,{container:!0,justify:"center"},r.a.createElement("div",{className:t.app},r.a.createElement(c.a,null,r.a.createElement("div",null,e?r.a.createElement("nav",null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(c.b,{to:"/ElectionsMonitoringForms/form"+window.location.search},"\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e")),r.a.createElement("li",null,r.a.createElement(c.b,{to:"/ElectionsMonitoringForms/files"+window.location.search},"\u0424\u043e\u0440\u043c\u0430 \u0434\u043b\u044f \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0438 \u0444\u0430\u0439\u043b\u043e\u0432")))):r.a.createElement(s.a,{to:"/ElectionsMonitoringForms/login"+window.location.search}),r.a.createElement(s.d,null,r.a.createElement(oe,{exact:!0,path:"/ElectionsMonitoringForms/form",component:te}),r.a.createElement(s.b,{path:"/ElectionsMonitoringForms/login",component:ne}),r.a.createElement(s.b,{path:"/ElectionsMonitoringForms/signup",component:ae}),r.a.createElement(s.b,{path:"/ElectionsMonitoringForms/form/:form"},r.a.createElement(J,null)),r.a.createElement(s.b,{exact:!0,path:"/ElectionsMonitoringForms/files",component:Object(s.i)(Z)}),r.a.createElement(s.b,{path:"/ElectionsMonitoringForms/files/:id",component:Object(s.i)(Z)})))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null,r.a.createElement(be,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},55:function(e,t,n){}},[[114,1,2]]]);
//# sourceMappingURL=main.b676ef90.chunk.js.map
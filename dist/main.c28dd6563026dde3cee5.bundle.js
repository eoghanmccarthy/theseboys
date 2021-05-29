!function(){"use strict";var e,t={7425:function(e,t,r){var a=r(7378),n=r(1542),l=r(65),s=r(6536),o=r(3282),c=r(5935),i=r.n(c),m=r(6552),u=r(5718),d=r(8055),p=r(5106),v=r(2052),f=r(3494),h=r(4965),g=r(58),y=r(8907);const E={s001:{id:"s001"},s002:{id:"s002"},s003:{id:"s003"},s004:{id:"s004"}};var b=(0,y.ZP)(((e,t)=>{const{type:r,payload:a}=t;switch(r){case"store/RESET":return E;case"song/SAVE_MASTER":e[a.songId]={...e[a.songId],master:a.data};break;case"song/SAVE_TRACK":const t={};a.data.effects.forEach((e=>{t[e.name]=e.get()})),e[a.songId]={...e[a.songId],tracks:{...e[a.songId].tracks,[a.trackId]:{...a.data,effects:t}}}}}),E);const w={key:"root",storage:f.Z,blacklist:["router"],version:0,stateReconciler:h.Z,migrate:(0,v.yv)({0:e=>({...e.app,master:{...e.app.master},tracks:{...e.app.tracks,t005:{...e.app.tracks.t005,instrument:{...e.app.tracks.t005.instrument,effects:{...e.app.tracks.t005.instrument.effects,Reverb:{decay:4,preDelay:.2,wet:.28}}}}}})},{debug:!1})};var k=r(6218),x=r(4206),N=r.n(x);const S=async()=>{const{data:e}=await N().get("http://eoghan.io/");return e};var C=r.p+"assets/6afcb252d35b92fae5f607e460966551.svg",I=r(42),q=r.n(I),$=({children:e,id:t,className:r})=>a.createElement("main",{id:t,className:q()("me__main",r)},e),A=r(9603),F=r(2569);const R=(e,t)=>[-(t-window.innerHeight/2)/20,(e-window.innerWidth/2)/20,1.1],V=(e,t,r)=>`perspective(600px) rotateX(${e}deg) rotateY(${t}deg) scale(${r})`;var D=({animate:e=!1,fill:t="var(--color-primary)",onClick:r})=>{const[n,l]=(0,F.q_)((()=>({xys:[0,0,1],config:{mass:5,tension:350,friction:40}})));return a.createElement(F.q.svg,(0,A.Z)({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 480 480",onMouseMove:({clientX:e,clientY:t})=>l({xys:R(e,t)}),onMouseLeave:()=>l({xys:[0,0,1]})},e&&{style:{transform:n.xys.interpolate(V)}},{onClick:()=>{"function"==typeof r&&r()}}),a.createElement("path",{fill:t,d:"M240 0c-132.5 0-240 107.5-240 240s107.5 240 240 240 240-107.5 240-240-107.5-240-240-240zm111.9 177.8c-17.4 11.3-35.5 21.8-43.1 43-4.6 12.6-9.5 24.9 2.6 36.3 2.8 2.7 5.7 6.4 6.4 10 .9 4.5 1.4 12-1 13.7-7.8 5.4-5.9 11.1-4.1 18.3 6.9 27.5 13.4 55.2 19.5 82.9.7 3.3-1.7 7.4-2.6 11.1-2.9-2.7-7.3-4.9-8.4-8.3-9.7-27.2-19.3-54.4-27.8-82-2.9-9.5-6.6-12.1-16.3-9.8l-36.6 5.8c-8.9 2.1-17.1 6.8-25.8 9.7-2.9 1-6.5-.1-9.8-.2.8-2.9.7-6.8 2.6-8.7 26.9-27.2 33.3-37.2 48.8-77.3-7.7-9-15.8-9.9-25.2-3.9-19.8 12.6-39.6 25.1-59.7 37.1-13.2 7.9-26.7 15.1-40.4 22.1-3 1.5-7.3.3-11 .3 1.2-3.7 1.3-8.6 3.8-10.9 27-24.6 58-42.6 92.1-55.5 2.4-.9 4.9-2 7.2-3.3 1.4-.8 2.6-2 5-4-12.2-5.7-21-14.8-34.9-14.7-5.1.1-10.5-5.4-15.4-8.8-1.1-.7-1.5-4.6-.7-5.2 1.7-1.5 4.9-3.1 6.6-2.5 10.3 3.7 20.5 7.9 30.6 12.2 4.6 2 9.4 4 13.2 7.1 7.6 6.2 12.8 2.5 18.9-2.6 14.9-12.5 23.9-25.4 17.9-47.2-4.8-17.6-3.6-36.9-5-55.4 1.1-.2 2.2-.4 3.3-.5 4.3 23.2 8.7 46.4 13 69.9 5.2-8.3 10.3-16.4 15.4-24.5.9-1.4 1.3-3.4 2.6-4.3 2.7-2 5.8-3.4 8.7-5.1.8 3.2 3.1 7 2.2 9.6-3.7 11.1-8.3 21.9-12.8 32.7-2.8 6.7-6 13.3-9 19.9l1.6 2.4c8.3-2.7 16.6-5.2 24.8-8.2 12.2-4.5 24.1-9.8 36.5-13.7 4-1.3 11.6-.9 13.2 1.5 3.9 6.2-2.7 8.3-6.9 11zM235 289.9c11.2-20.8 21.6-40.2 32.4-60.2 18.4 13.6 11.4 34.8 19.7 52.3-18 2.7-34.3 5.2-52.1 7.9zM292.2 238c-7.5-9.7-8.9-22.1-9-34.7 0-1.4 2.7-3.6 4.5-4.2 10.2-3.6 20.6-6.8 28.8-9.4-7.6 15.1-15.8 31.4-24.3 48.3z"}))},M=()=>{const e=(0,k.TH)(),t=(0,k.k6)();return a.createElement("footer",{className:"me__footer"},a.createElement(D,{fill:"var(--color-grey-800)",onClick:()=>t.push("/"===e.pathname?"/studio":"/")}))},O=()=>a.createElement(a.Fragment,null,a.createElement($,{className:"index"},a.createElement("div",null,a.createElement(D,{animate:!0,fill:"var(--color-primary)"})),a.createElement("div",{className:"social-links"},a.createElement("a",{href:"http://twitter.com/theseboys",target:"_blank"},a.createElement("img",{alt:"Twitter logo",style:{width:"24px",height:"24px"},src:C})),a.createElement("iframe",{scrolling:"no",frameBorder:"no",src:"https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2Ftheseboys&color=orange_white&size=24",style:{width:"24px",height:"24px"}}))),a.createElement(M,null)),T=r(2069);const L={pan:0,volume:4,mute:!1},_=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],z={i001:{id:"i001",name:"",notes:["C1"],instrument:"MembraneSynth",synth:{pitchDecay:.01,octaves:6,oscillator:{type:"square4"},envelope:{attack:.3,decay:.45,sustain:.1,release:.3}},effects:{Gain:{gain:2},EQ3:{high:-53.599999999999994,highFrequency:2500,low:-16.799999999999997,lowFrequency:400,mid:-53.599999999999994},Compressor:{threshold:-30,ratio:6,attack:1e-4,release:.1}},controls:{equaliser:{span:"1 / span 3",effects:["EQ3"]},compressor:{span:"5 / span 3",effects:["Compressor"]}}},i002:{id:"i002",name:"",notes:["C1"],instrument:"MembraneSynth",synth:{pitchDecay:.01,octaves:6,oscillator:{type:"square4"},envelope:{attack:.001,decay:.45,sustain:.1,release:.3}},effects:{Gain:{gain:2},EQ3:{high:4,highFrequency:2500,low:0,lowFrequency:400,mid:-12},Compressor:{threshold:-30,ratio:6,attack:1e-4,release:.1}},controls:{equaliser:{span:"1 / span 3",effects:["EQ3"]},compressor:{span:"5 / span 3",effects:["Compressor"]}}},i003:{id:"i003",name:"",notes:["C1"],instrument:"MetalSynth",synth:{harmonicity:12,resonance:1e3,modulationIndex:20,volume:-15,envelope:{attack:2,decay:.4,sustain:.512,release:.067}},effects:{Gain:{gain:2},EQ3:{high:7.200000000000003,highFrequency:2500,low:-22.39999999999999,lowFrequency:400,mid:0},Distortion:{distortion:1,oversample:"4x",wet:.09},Reverb:{decay:4,preDelay:.2,wet:.28},FeedbackDelay:{delayTime:.25,feedback:1/3,wet:.5,maxDelay:1}},controls:{equaliser:{span:"1 / span 3",effects:["EQ3"]},effects:{span:"5 / span 3",effects:["Distortion","Reverb","FeedbackDelay"]}}},i004:{id:"i004",name:"",instrument:"NoiseSynth",synth:{volume:-8,noise:{type:"white",playbackRate:5},envelope:{attack:.001,decay:.12,sustain:0,release:0}},effects:{EQ3:{high:8.799999999999995,highFrequency:2500,low:-60,lowFrequency:400,mid:-60},Filter:{Q:1,detune:0,frequency:12e3,gain:0,rolloff:-48,type:"lowpass"}},controls:{equaliser:{span:"1 / span 3",effects:["EQ3"]},filter:{span:"5 / span 2",effects:["Filter"]}}},i005:{id:"i005",name:"",instrument:"NoiseSynth",synth:{volume:-8,noise:{type:"white",playbackRate:5},envelope:{attack:.001,decay:.3,sustain:.002,release:.32}},effects:{EQ3:{high:8.799999999999995,highFrequency:2500,low:-60,lowFrequency:400,mid:-60},Filter:{Q:1,detune:0,frequency:11200,gain:0,rolloff:-48,type:"lowpass"},Reverb:{decay:4,preDelay:.2,wet:.28}},controls:{equaliser:{span:"1 / span 3",effects:["EQ3"]},filter:{span:"5 / span 2",effects:["Filter"]}}}};var W=r(3615);var Q=({from:[e,t]=[0,100],to:[r,a]=[0,100],clamp:n=!0})=>{const l=(a-r)/(t-e);return function(t){return function(e,t,r,a){return a?function(e,t,r){let a=r;return a<e&&(a=e),a>t&&(a=t),a}(e,t,r):r}(r,a,l*t+(-l*e+r),n)}},B=(e=[0,100],t,r=0)=>Q({to:e})(t),j=e=>{const t=document.querySelectorAll(`#${e}-steps .steps`);let r=[];for(let e=0;e<t.length;e++){let a=[];const n=t[e].querySelectorAll(".step");for(let e=0;e<n.length;e++)"on"===n[e].getAttribute("data-value")?a.push(1):a.push(0);r.push(a)}return r},P=(e,t,r)=>{if("string"!=typeof e)return!1;const a=document.querySelector(`#${e} .step.row-${t}-step-${r}`);return!!a&&"on"===a.getAttribute("data-value")},K=(e=[0,100],t)=>{const r=Q({from:e});return Math.round(r(t))};const J=-60,Z=20,G=-60;var U=(0,a.memo)((({className:e,width:t="100%",stroke:r="var(--color-bluegrey-600)",strokeWidth:n="4"})=>a.createElement("svg",{className:q()("svg-icon",e),width:t,viewBox:"0 0 30 30",xmlns:"http://www.w3.org/2000/svg"},a.createElement("polyline",{points:"0,10 15,20 30,10",fill:"transparent",stroke:r,strokeWidth:n})))),H=(0,a.memo)((({className:e,width:t="100%",fill:r="var(--color-bluegrey-600)",stroke:n="var(--color-bluegrey-600)",strokeWidth:l="0"})=>a.createElement("svg",{className:q()("svg-icon",e),width:t,viewBox:"0 0 300 300",xmlns:"http://www.w3.org/2000/svg"},a.createElement("circle",{cx:"150",cy:"150",r:"150",fill:r,stroke:n,strokeWidth:l})))),X=(0,a.memo)((({className:e,width:t="100%",stroke:r="var(--color-bluegrey-600)",strokeWidth:n="4"})=>a.createElement("svg",{className:q()("svg-icon",e),width:t,viewBox:"0 0 30 30",xmlns:"http://www.w3.org/2000/svg"},a.createElement("line",{x1:"0",y1:"15",x2:"30",y2:"15",fill:"transparent",stroke:r,strokeWidth:n})))),Y=(0,a.memo)((({className:e,width:t="100%",fill:r="var(--color-bluegrey-600)",stroke:n="var(--color-bluegrey-600)",strokeWidth:l="0"})=>a.createElement("svg",{className:q()("svg-icon",e),width:t,viewBox:"0 0 300 300",xmlns:"http://www.w3.org/2000/svg"},a.createElement("polygon",{points:"75, 25 300, 150 75, 275",fill:r,stroke:n,strokeWidth:l})))),ee=(0,a.memo)((({className:e,width:t="100%",stroke:r="var(--color-bluegrey-600)",strokeWidth:n="4"})=>a.createElement("svg",{className:q()("svg-icon",e),width:t,viewBox:"0 0 30 30",xmlns:"http://www.w3.org/2000/svg"},a.createElement("line",{x1:"15",y1:"0",x2:"15",y2:"30",fill:"transparent",stroke:r,strokeWidth:n}),a.createElement("line",{x1:"0",y1:"15",x2:"30",y2:"15",fill:"transparent",stroke:r,strokeWidth:n})))),te=(0,a.memo)((({className:e,width:t="100%",fill:r="var(--color-bluegrey-600)",stroke:n="var(--color-bluegrey-600)",strokeWidth:l="0"})=>a.createElement("svg",{className:q()("svg-icon",e),width:t,viewBox:"0 0 300 300",xmlns:"http://www.w3.org/2000/svg"},a.createElement("rect",{width:"300",height:"300",fill:r,stroke:n,strokeWidth:l}))));const re=(0,a.memo)((({children:e,id:t,testId:r,isDisabled:n=!1,className:l,role:s="button",type:o="button",size:c=48,shape:i="circle",variant:m,...u})=>a.createElement("button",(0,A.Z)({id:t,"data-testid":r,disabled:n,className:q()("tb-button",{[`size-${c}`]:c&&"text"!==m,[i]:i&&"text"!==m,[m]:m,disabled:n},l),role:s,type:o},u),e)));var ae=re;re.propTypes={size:(0,W.oneOf)([24,28,32,36,40,44,48]),shape:(0,W.oneOf)(["circle","rounded"])};var ne=(0,a.memo)((({children:e,id:t,orient:r="vertical"})=>a.createElement("div",{id:t,className:q()("controller",{[r]:r})},e))),le=(0,a.memo)((({id:e,orient:t="vertical",label:r,step:n=1,min:l=0,max:s=100,initialValue:o,toFixed:c=0,onChange:i})=>{(0,a.useEffect)((()=>{m(o)}),[o]);const m=t=>{var r,a;if(!("number"!=typeof t||t<l||t>s)){var n;if(null===(r=document.querySelectorAll(`#${e} .control`))||void 0===r||r.forEach((e=>e.setAttribute("value",`${t}`))),null===(a=document.querySelector(`#${e} span.value`))||void 0===a||a.setAttribute("value",t.toFixed(c)),t>l&&t<s)null===(n=document.querySelectorAll(`#${e} .control`))||void 0===n||n.forEach((e=>e.classList.contains("alert")&&e.classList.remove("alert")));else if(t===l){var o;null===(o=document.querySelector(`#${e} .control.dec`))||void 0===o||o.classList.add("alert")}else if(t===s){var m;null===(m=document.querySelector(`#${e} .control.inc`))||void 0===m||m.classList.add("alert")}i(t)}};return a.createElement(ne,{id:e,orient:t},a.createElement("label",{className:"label"},r),a.createElement("div",{className:"controls"},a.createElement(ae,{className:"control dec",size:28,onClick:e=>{const t=parseFloat(e.target.value)-n;t<l||m(t)}},a.createElement(X,{width:"72%"})),a.createElement(ae,{className:"control inc",size:28,onClick:e=>{const t=parseFloat(e.target.value)+n;t>s||m(t)}},a.createElement(ee,{width:"72%"}))),a.createElement("span",{className:"value"}))})),se=(0,a.memo)((({children:e,orientation:t="horizontal"})=>a.createElement("div",{className:q()("controller-group",{[t]:t})},e)));const oe=(0,a.memo)((0,a.forwardRef)((({id:e,testId:t,className:r,orient:n="horizontal",isDisabled:l=!1,step:s=.1,min:o=0,max:c=1,onChange:i,...m},u)=>a.createElement("input",(0,A.Z)({ref:u,id:e,"data-testid":t,className:q()("tb-slider",{[`orient-${n}`]:n,disabled:l},r),disabled:l,orient:n,type:"range",step:s,max:c,min:o,onChange:i},m)))));var ce=oe;oe.propTypes={orient:W.string,isDisabled:W.bool,step:W.number,max:W.number,min:W.number,onChange:W.func.isRequired};var ie=(0,a.memo)((({id:e,orient:t="vertical",label:r,step:n=.1,min:l=0,max:s=1,initialValue:o,toFixed:c=0,onChange:i})=>{const m=(0,a.useRef)(null),u=(0,a.useRef)(null);(0,a.useEffect)((()=>{d(o)}),[o]);const d=(e,t=!0)=>{null==m||!m.current||null==u||!u.current||"number"!=typeof e||e<l||e>s||(t&&(m.current.value=`${e}`),u.current.setAttribute("value",e.toFixed(c)),i(e))};return a.createElement(ne,{id:e,orient:t},a.createElement("label",{className:"label"},r),a.createElement("div",{className:"controls"},a.createElement(ce,{ref:m,className:"control",orient:t,step:n,min:l,max:s,onChange:e=>d(parseFloat(e.target.value),!1),onKeyDown:e=>{switch(e.key){case"q":d(l);break;case"w":d(s);break;case"e":d(o)}}})),a.createElement("span",{ref:u,className:"value"}))})),me=(0,a.memo)((({trackId:e,trackNumber:t,channel:r,onSample:n})=>e&&r?a.createElement("div",{id:`${e}-controls`,className:"track-controls"},a.createElement(se,null,a.createElement(ae,{id:`${e}-sample`,size:32,onClick:n},t),a.createElement(ae,{className:q()({alert:r.muted}),size:32,onClick:e=>{r.set({mute:!r.muted}),e.target.classList.toggle("alert")}},"M")),a.createElement(se,null,a.createElement(le,{id:`${e}-volume`,orient:"horizontal",label:"VOL",initialValue:K([G,20],r.get().volume)??0,onChange:e=>r.set({volume:B([G,20],e)})}),a.createElement(le,{id:`${e}-pan`,orient:"horizontal",label:"PAN",step:.1,min:-1,max:1,toFixed:1,initialValue:r.get().pan??0,onChange:e=>r.set({pan:e})}),a.createElement(ae,{size:36,onClick:t=>{var r;null===(r=document.querySelector(`#${e}-effects`))||void 0===r||r.classList.toggle("hidden"),t.target.classList.toggle("rotated")}},a.createElement(U,{width:"60%"})))):null)),ue=(0,a.memo)((({trackId:e,stepValue:t,rowIndex:r,stepIndex:n})=>e&&"number"==typeof r&&"number"==typeof n?a.createElement("span",{className:`step ${e}-step row-${r}-step-${n}`,"data-value":t?"on":"off","data-status":"idle",onClick:()=>{const t=document.querySelector(`.step.${e}-step.row-${r}-step-${n}`);t&&("off"===t.getAttribute("data-value")?t.setAttribute("data-value","on"):t.setAttribute("data-value","off"))}},a.createElement("svg",{className:"step-zone",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 30 30"}),a.createElement("svg",{className:"step-icon off",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 30 30"},a.createElement("circle",{cx:"15",cy:"15",r:"5"})),a.createElement("svg",{className:"step-icon on",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 30 30"},a.createElement("circle",{cx:"15",cy:"15",r:"15"}))):null)),de=(0,a.memo)((({trackId:e,numberOfSteps:t=16,initialValue:r})=>e&&Array.isArray(r)?a.createElement("div",{className:"step-sequencer"},r.map(((r,n)=>Array.isArray(r)?a.createElement("div",{key:n,style:{gridTemplateColumns:`repeat(${t},1fr)`},className:`steps ${e}-steps-${n}`},r.map(((t,r)=>a.createElement(ue,{key:r,trackId:e,stepValue:t,rowIndex:n,stepIndex:r})))):null))):null)),pe=(0,a.memo)((({trackId:e,numSteps:t=16,initialValue:r})=>a.createElement("div",{id:`${e}-steps`,className:"track-steps"},a.createElement(de,{trackId:e,numberOfSteps:t,initialValue:r})))),ve=(0,a.memo)((({children:e,trackId:t})=>a.createElement("div",{id:`${t}-effects`,className:"track-effects"},e))),fe=(0,a.memo)((({style:e={},children:t,span:r,title:n=""})=>a.createElement("div",{style:{gridColumn:r,...e},className:"effects-group"},a.createElement("div",{className:"controls"},t),n?a.createElement("div",{className:"label"},a.createElement("div",null),a.createElement("span",null,n),a.createElement("div",null)):null))),he=(0,a.memo)((({trackId:e,compressor:t})=>e&&t?a.createElement(a.Fragment,null,a.createElement(ie,{id:`${e}-compressor-ratio`,label:"RAT",step:1,min:1,max:20,initialValue:t.get().ratio??1,onChange:e=>t.set({ratio:e})}),a.createElement(ie,{id:`${e}-compressor-attack`,label:"ATK",step:.001,toFixed:3,initialValue:t.get().attack??0,onChange:e=>t.set({attack:e})}),a.createElement(ie,{id:`${e}-compressor-release`,label:"REL",step:.001,toFixed:3,initialValue:t.get().release??0,onChange:e=>t.set({release:e})})):null)),ge=(0,a.memo)((({trackId:e,envelope:t})=>e&&t?a.createElement(a.Fragment,null,a.createElement(ie,{id:`${e}-envelope-attack`,label:"ATK",step:.001,max:2,toFixed:3,initialValue:t.get().attack??0,onChange:e=>t.set({attack:e})}),a.createElement(ie,{id:`${e}-envelope-decay`,label:"DEC",step:.001,max:2,toFixed:3,initialValue:t.get().decay??0,onChange:e=>t.set({decay:e})}),a.createElement(ie,{id:`${e}-envelope-sustain`,label:"SUS",step:.001,toFixed:3,initialValue:t.get().sustain??0,onChange:e=>t.set({sustain:e})}),a.createElement(ie,{id:`${e}-envelope-release`,label:"REL",step:.001,max:2,toFixed:3,initialValue:t.get().release??0,onChange:e=>t.set({release:e})})):null)),ye=(0,a.memo)((({trackId:e,eq3:t})=>e&&t?a.createElement(a.Fragment,null,a.createElement(ie,{id:`${e}-eq3-low`,label:"LOW",step:1,max:100,initialValue:K([J,Z],t.get().low)??0,onChange:e=>t.set({low:B([J,Z],e)})}),a.createElement(ie,{id:`${e}-eq3-mid`,label:"MID",step:1,max:100,initialValue:K([J,Z],t.get().mid)??0,onChange:e=>t.set({mid:B([J,Z],e)})}),a.createElement(ie,{id:`${e}-eq3-high`,label:"HIG",step:1,max:100,initialValue:K([J,Z],t.get().high)??0,onChange:e=>t.set({high:B([J,Z],e)})})):null)),Ee=(0,a.memo)((({trackId:e,filter:t})=>e&&t?a.createElement(ie,{id:`${e}-filter-frequency`,label:"FRQ",step:100,min:1e3,max:15e3,initialValue:t.get().frequency??1e3,onChange:e=>t.set({frequency:e})}):null)),be=(0,a.memo)((({trackId:e,distortion:t})=>e&&t?a.createElement(ie,{id:`${e}-distortion-wet`,label:"DIS",step:1,max:100,initialValue:K([0,1],t.get().wet)??0,onChange:e=>t.set({wet:B([0,1],e)})}):null)),we=(0,a.memo)((({trackId:e,reverb:t})=>e&&t?a.createElement(ie,{id:`${e}-reverb-wet`,label:"WET",step:1,max:100,initialValue:K([0,1],t.get().wet)??0,onChange:e=>t.set({wet:B([0,1],e)})}):null)),ke=(0,a.memo)((({trackId:e,delay:t})=>e&&t?a.createElement(ie,{id:`${e}-delay-wet`,label:"DEL",step:1,max:100,initialValue:K([0,1],t.get().wet)??0,onChange:e=>t.set({wet:B([0,1],e)})}):null));const xe=(0,a.memo)((0,a.forwardRef)((({songId:e,trackId:t,trackNumber:r,channel:n,instrument:s,notes:o,synth:c,stepCount:i,steps:m,effects:u,controls:d,...p},v)=>{var f;const h=(0,l.I0)(),g=`${i}n`,y=(e=>{const t=[];for(let r=0;r<e;r++)t.push(r);return t})(i),E=(0,a.useRef)(),b=(0,a.useRef)(new T.$W(n??{})),w=(0,a.useRef)(Object.entries(u??{}).map((([e,t])=>((e,t={})=>({EQ3:new T.Fl(t),Gain:new T.S9(t),Reverb:new T.E8(t),FeedbackDelay:new T.wm(t),Distortion:new T.df(t),PitchShift:new T.yW(t),Compressor:new T.dL(t),Filter:new T.wn(t)}[e]))(e,t)))),k=(0,a.useRef)(((e,t={})=>({MembraneSynth:new T.CF(t),MetalSynth:new T._T(t),NoiseSynth:new T.fR(t)}[e]))(s,c).chain(b.current,...w.current,T.o6));(0,a.useEffect)((()=>(E.current=new T.T9(N,y,g).start(0),()=>{null!=E&&E.current&&E.current.dispose()})),[]);const x=(e,t,r,a)=>{null!=k&&k.current&&("NoiseSynth"!==k.current.name?k.current.triggerAttackRelease(e[0],t,r,a):k.current.triggerAttackRelease(t,r,a))},N=(e,r)=>{((e,t=[],r,a,n,l)=>{Array.isArray(t)||(t=[]);const s=Math.max(1,t.length);let o=[];const c=0===n?1:.75;for(let r=0;r<s;r++)if(P(e,r,n))if(Array.isArray(t)&&t.length){const e=t[r];o.push(e)}else l(null,c);o.length&&l(o,c),T.hG.schedule((()=>{((e,t,r)=>{const a=document.getElementsByClassName(`step ${e}-step`);if(a)for(let e=0;e<a.length;e++)(e-r)%t==0?a[e].setAttribute("data-status","current"):a[e].setAttribute("data-status","idle")})(e,r,n)}),a)})(t,o,i,e,r,((t,r)=>x(t,g,e,r)))};return(0,a.useImperativeHandle)(v,(()=>({save(){h({type:"song/SAVE_TRACK",payload:{songId:e,trackId:t,data:{channel:b.current.get(),steps:j(t),synth:k.current.get(),effects:w.current}}})}}))),a.createElement("div",{id:t,className:"track"},a.createElement(me,{trackId:t,trackNumber:r,channel:null==b?void 0:b.current,onSample:()=>x(o,g)}),a.createElement(pe,{trackId:t,numSteps:i,initialValue:m}),a.createElement(ve,{trackId:t},Object.entries(d??{}).map((([e,r],n)=>a.createElement(fe,{key:n,span:r.span,title:e},r.effects.map(((e,r)=>{const n=w.current.find((t=>t.name===e));if(n)return"EQ3"===e?a.createElement(ye,{key:r,trackId:t,eq3:n}):"Compressor"===e?a.createElement(he,{key:r,trackId:t,compressor:n}):"Filter"===e?a.createElement(Ee,{key:r,trackId:t,filter:n}):"Distortion"===e?a.createElement(be,{key:r,trackId:t,distortion:n}):"Reverb"===e?a.createElement(we,{key:r,trackId:t,reverb:n}):"FeedbackDelay"===e?a.createElement(ke,{key:r,trackId:t,delay:n}):void 0}))))),a.createElement(fe,{span:"9 / span 4",title:"envelope"},a.createElement(ge,{trackId:t,envelope:null==k||null===(f=k.current)||void 0===f?void 0:f.envelope}))))})));var Ne=xe;xe.propTypes={songId:W.string.isRequired,trackId:W.string.isRequired,trackNumber:W.number.isRequired,instrument:W.string.isRequired,stepCount:W.number.isRequired};const Se=(0,a.createContext)();var Ce=({children:e})=>{const t=(0,a.useRef)(new T.KN({mimeType:"video/webm"}));(0,a.useEffect)((()=>{T.o6.connect(t.current)}),[]);const r=()=>(0,T.Sy)().state,n=()=>(0,T.h4)().state,l=()=>{var e;return null==t||null===(e=t.current)||void 0===e?void 0:e.state},s=async()=>{"running"!==r()&&await(0,T.BL)(),r();const e=document.querySelector("#master");var a;"stopped"===n()&&"on"!==e.getAttribute("data-recorder")&&(T.J7.start(),null===(a=e.querySelector("button.play"))||void 0===a||a.classList.add("active"),e.setAttribute("data-playback","started"),n(),"stand-by"===e.getAttribute("data-recorder")&&"stopped"===l()&&(t.current.start(),e.setAttribute("data-recorder","on")))},o=()=>{const e=document.querySelector("#master");var t,r;"started"===n()&&(T.J7.stop(),e.setAttribute("data-playback","stopped"),null===(t=e.querySelector("button.play"))||void 0===t||t.classList.remove("active"),n()),"stand-by"===e.getAttribute("data-recorder")&&(e.setAttribute("data-recorder","off"),null===(r=e.querySelector("button.record"))||void 0===r||r.classList.remove("alert"))},c=()=>{const e=document.querySelector("#master");var t,r;"stopped"===n()&&("off"===e.getAttribute("data-recorder")?(e.setAttribute("data-recorder","stand-by"),null===(t=e.querySelector("button.record"))||void 0===t||t.classList.add("alert")):(e.setAttribute("data-recorder","off"),null===(r=e.querySelector("button.record"))||void 0===r||r.classList.remove("alert"),"started"===l()&&i()))},i=async()=>{const e=await t.current.stop(),r=URL.createObjectURL(e),a=document.createElement("a");a.download="recording.webm",a.href=r,a.click()},m=(0,a.useMemo)((()=>({getTransportState:n,play:s,stop:o,record:c})),[]);return a.createElement(Se.Provider,{value:m},e)},Ie=e=>{const t=(0,a.useContext)(Se);if(!t)throw new Error(`Master components must be rendered within the MasterProvider component. Error occurred in the ${e} component.`);return t},qe=({songId:e,volume:t,bpm:r,onSave:n})=>{const s=(0,l.I0)(),{play:o,stop:c,record:i}=Ie("<Master>");return a.createElement("section",{id:"master","data-playback":"stopped","data-recorder":"off"},a.createElement("div",{className:"sub"},a.createElement(ae,{size:24,variant:"text",shape:"rounded",onClick:()=>{"started"!==T.J7.state&&(n(),s({type:"song/SAVE_MASTER",payload:{songId:e,data:{bpm:T.J7.get().bpm,volume:T.o6.get().volume}}}))}},"save settings")),a.createElement("div",{className:"main"},a.createElement(ie,{id:"master-volume",orient:"horizontal",label:"VOL",step:1,max:100,initialValue:K([G,20],t)??0,onChange:e=>T.o6.set({volume:B([G,20],e)})}),a.createElement(se,null,a.createElement(ae,{className:"playback record",variant:"outlined",onClick:i},a.createElement(H,{width:"64%"})),a.createElement(ae,{className:"playback play",variant:"outlined",value:"off",onClick:o},a.createElement(Y,{width:"72%"})),a.createElement(ae,{className:"playback stop",variant:"outlined",value:"on",onClick:c},a.createElement(te,{width:"54%"}))),a.createElement(le,{id:"master-bpm",orient:"horizontal",label:"BPM",min:60,max:240,initialValue:r??120,onChange:e=>T.J7.set({bpm:e})})))};const $e={s001:{t001:"i001",t002:"i002",t003:"i003",t004:"i004",t005:"i005"},s002:{t001:"i001",t002:"i002",t003:"i003",t004:"i004",t005:"i005"},s003:{t001:"i001",t002:"i002",t003:"i003",t004:"i004",t005:"i005"},s004:{t001:"i001",t002:"i002",t003:"i003",t004:"i004",t005:"i005"}};var Ae=()=>{var e,t;const{play:r,stop:n,record:s}=Ie("<Studio>"),o=(0,l.v9)((e=>e)),[c,i]=(0,a.useState)("s001"),m=(0,a.useMemo)((()=>{var e;return null===(e=o.songs)||void 0===e?void 0:e[c]}),[c]),u=$e[c],d=Object.entries(u),p=d.map((([e])=>e)),v=(0,a.useRef)(d.map((()=>(0,a.createRef)())));return((e,t=document.body,r="keydown")=>{const n=(0,a.useRef)();(0,a.useEffect)((()=>{n.current=e}),[e]),(0,a.useEffect)((()=>{if(!t||!t.addEventListener)return;const e=e=>n.current(e);return t.addEventListener(r,e),()=>{t.removeEventListener(r,e)}}),[r,t])})((e=>{const t=e.code;switch(t){case"Space":e.preventDefault(),"started"===T.J7.state?n():r();break;case"KeyR":s();break;case"KeyM":T.o6.set({mute:!T.o6.mute});break;case"Digit1":case"Digit2":case"Digit3":case"Digit4":case"Digit5":case"Digit6":case"Digit7":case"Digit8":const o=parseInt(t.charAt(t.length-1));if(o<=d.length){var a,l;const e=p[o-1];null===(a=document.querySelector(`#${e}`))||void 0===a||a.scrollIntoView(),null===(l=document.querySelector(`#${e}-sample`))||void 0===l||l.focus()}}})),a.createElement(a.Fragment,null,a.createElement($,{id:"studio"},a.createElement(qe,{songId:c,volume:(null==m||null===(e=m.master)||void 0===e?void 0:e.volume)??0,bpm:(null==m||null===(t=m.master)||void 0===t?void 0:t.bpm)??120,onSave:()=>{v.current.forEach((e=>{e.current.save()}))}}),d.map((([e,t],r)=>{var n;const l=null==m||null===(n=m.tracks)||void 0===n?void 0:n[e],s=z[t];return s?a.createElement(Ne,{key:e,ref:v.current[r],songId:c,trackId:e,trackNumber:r+1,notes:s.notes,stepCount:(null==l?void 0:l.stepCount)??16,steps:(null==l?void 0:l.steps)??_,channel:(null==l?void 0:l.channel)??L,instrument:s.instrument??"MembraneSynth",synth:(null==l?void 0:l.synth)??s.synth,effects:(null==l?void 0:l.effects)??s.effects,controls:s.controls}):null}))),a.createElement(M,null))},Fe=(0,k.EN)((()=>a.createElement("div",{className:"me"},a.createElement(k.rs,null,a.createElement(k.AW,{exact:!0,path:"/",render:()=>a.createElement(O,null)}),a.createElement(k.AW,{exact:!0,path:"/studio",render:()=>a.createElement(Ce,null,a.createElement(Ae,null))}),a.createElement(k.AW,{render:()=>a.createElement(O,null)}))))),Re=(0,k.EN)((()=>{const e=((e,t={})=>(0,m.useQuery)([{name:"get_auth",instance:e}],S,{...t}))({instance:"app-root"},{enabled:"localhost"!==window.location.hostname,cacheTime:0});return"localhost"===window.location.hostname||e.isSuccess?a.createElement(Fe,null):null}));const Ve=i()(),{store:De,persistor:Me}=((e={},t)=>{const r=[(0,g.Z)(t)],a=[(0,p.md)(...r)],n=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||p.qC,l=(0,p.MT)((0,v.OJ)(w,(e=>(0,p.UY)({router:(0,o.iz)(e),songs:b}))(t)),void 0,n(...a));return{store:l,persistor:(0,v.p5)(l)}})({},Ve),Oe=document.getElementById("root"),Te=new u.S;(0,n.render)(a.createElement(m.QueryClientProvider,{client:Te},a.createElement(l.zt,{store:De,context:l.ET},a.createElement(s.r,{loading:null,persistor:Me},a.createElement(o.xI,{history:Ve,context:l.ET},a.createElement(d.ErrorBoundary,null,a.createElement(Re,null)))))),Oe)}},r={};function a(e){var n=r[e];if(void 0!==n)return n.exports;var l=r[e]={id:e,loaded:!1,exports:{}};return t[e].call(l.exports,l,l.exports,a),l.loaded=!0,l.exports}a.m=t,e=[],a.O=function(t,r,n,l){if(!r){var s=1/0;for(i=0;i<e.length;i++){r=e[i][0],n=e[i][1],l=e[i][2];for(var o=!0,c=0;c<r.length;c++)(!1&l||s>=l)&&Object.keys(a.O).every((function(e){return a.O[e](r[c])}))?r.splice(c--,1):(o=!1,l<s&&(s=l));o&&(e.splice(i--,1),t=n())}return t}l=l||0;for(var i=e.length;i>0&&e[i-1][2]>l;i--)e[i]=e[i-1];e[i]=[r,n,l]},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,{a:t}),t},a.d=function(e,t){for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.hmd=function(e){return(e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},a.p="/",function(){var e={179:0};a.O.j=function(t){return 0===e[t]};var t=function(t,r){var n,l,s=r[0],o=r[1],c=r[2],i=0;for(n in o)a.o(o,n)&&(a.m[n]=o[n]);if(c)var m=c(a);for(t&&t(r);i<s.length;i++)l=s[i],a.o(e,l)&&e[l]&&e[l][0](),e[s[i]]=0;return a.O(m)},r=self.webpackChunktheseboys=self.webpackChunktheseboys||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var n=a.O(void 0,[216],(function(){return a(7425)}));n=a.O(n)}();
//# sourceMappingURL=main.c28dd6563026dde3cee5.bundle.js.map
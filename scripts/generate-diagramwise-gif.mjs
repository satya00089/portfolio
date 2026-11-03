// Regenerate the portfolio preview: node scripts/generate-diagramwise-gif.mjs
import { writeFileSync } from "node:fs";
const result = (() => {

const W=640,H=360,N=72;
const colors=[[12,15,28],[20,25,43],[32,39,61],[57,67,94],[104,119,150],[177,189,213],[239,244,255],[234,20,106],[110,44,94],[44,39,96],[68,214,188],[25,72,76]];
const font={
A:["01110","10001","10001","11111","10001","10001","10001"],B:["11110","10001","10001","11110","10001","10001","11110"],C:["01111","10000","10000","10000","10000","10000","01111"],D:["11110","10001","10001","10001","10001","10001","11110"],E:["11111","10000","10000","11110","10000","10000","11111"],F:["11111","10000","10000","11110","10000","10000","10000"],G:["01111","10000","10000","10111","10001","10001","01111"],H:["10001","10001","10001","11111","10001","10001","10001"],I:["111","010","010","010","010","010","111"],J:["00111","00010","00010","00010","10010","10010","01100"],K:["10001","10010","10100","11000","10100","10010","10001"],L:["10000","10000","10000","10000","10000","10000","11111"],M:["10001","11011","10101","10101","10001","10001","10001"],N:["10001","11001","10101","10011","10001","10001","10001"],O:["01110","10001","10001","10001","10001","10001","01110"],P:["11110","10001","10001","11110","10000","10000","10000"],Q:["01110","10001","10001","10001","10101","10010","01101"],R:["11110","10001","10001","11110","10100","10010","10001"],S:["01111","10000","10000","01110","00001","00001","11110"],T:["11111","00100","00100","00100","00100","00100","00100"],U:["10001","10001","10001","10001","10001","10001","01110"],V:["10001","10001","10001","10001","10001","01010","00100"],W:["10001","10001","10001","10101","10101","11011","10001"],X:["10001","10001","01010","00100","01010","10001","10001"],Y:["10001","10001","01010","00100","00100","00100","00100"],Z:["11111","00001","00010","00100","01000","10000","11111"],".":["0","0","0","0","0","0","1"],"/":["00001","00010","00010","00100","01000","01000","10000"]," ":["000","000","000","000","000","000","000"]};
function frame(n){
 const p=new Uint8Array(W*H);
 const rect=(x,y,w,h,c)=>{for(let j=Math.max(0,Math.round(y));j<Math.min(H,y+h);j++)for(let i=Math.max(0,Math.round(x));i<Math.min(W,x+w);i++)p[j*W+i]=c;};
 const circle=(x,y,r,c)=>{for(let j=Math.floor(y-r);j<=y+r;j++)for(let i=Math.floor(x-r);i<=x+r;i++)if(i>=0&&i<W&&j>=0&&j<H&&(i-x)**2+(j-y)**2<=r*r)p[j*W+i]=c;};
 const line=(x,y,a,b,c,t=1)=>{let d=Math.max(Math.abs(a-x),Math.abs(b-y));for(let i=0;i<=d;i++)circle(x+(a-x)*i/d,y+(b-y)*i/d,t,c);};
 const text=(s,x,y,z,c)=>{for(const ch of s){let g=font[ch]||font[" "];g.forEach((row,j)=>[...row].forEach((v,i)=>{if(v==="1")rect(x+i*z,y+j*z,z,z,c);}));x+=(g[0].length+1)*z;}};
 const round=(x,y,w,h,r,c)=>{rect(x+r,y,w-2*r,h,c);rect(x,y+r,w,h-2*r,c);for(const [a,b] of [[x+r,y+r],[x+w-r-1,y+r],[x+r,y+h-r-1],[x+w-r-1,y+h-r-1]])circle(a,b,r,c);};
 for(let y=86;y<320;y+=16)for(let x=22;x<620;x+=16)p[y*W+x]=2;
 rect(0,0,W,70,1);rect(24,69,592,1,2);
 // Diagramwise-inspired connected brackets.
 for(const [x,y,a,b] of [[36,22,28,35],[28,35,36,48],[49,22,58,35],[58,35,49,48]])line(x,y,a,b,7,3);
 circle(43,35,3,6);
 text("DIAGRAMWISE",75,22,3,6);
 text("DESIGN. EXPLAIN. IMPROVE.",76,49,1,4);
 round(508,24,107,24,10,9);circle(521,36,3,10);text("SYSTEM DESIGN",531,33,1,5);
 const t=n/12;
 const nodes=[{x:42,y:168,w:108,h:77,label:"CLIENT",sub:"WEB / MOBILE",kind:0},{x:222,y:168,w:124,h:77,label:"API GATEWAY",sub:"ROUTE / SCALE",kind:1},{x:430,y:105,w:145,h:77,label:"SERVICES",sub:"APP LOGIC",kind:2},{x:430,y:231,w:145,h:77,label:"DATABASE",sub:"PERSIST / QUERY",kind:3}];
 const path1=[[150,207],[222,207]],path2=[[346,207],[385,207],[385,144],[430,144]],path3=[[346,207],[385,207],[385,270],[430,270]];
 const paths=[path1,path2,path3];
 function drawPath(pts,progress,c,width){let lengths=pts.slice(1).map((q,i)=>Math.hypot(q[0]-pts[i][0],q[1]-pts[i][1])),total=lengths.reduce((a,b)=>a+b,0),left=total*progress;for(let i=0;i<lengths.length&&left>0;i++){let a=pts[i],b=pts[i+1],f=Math.min(1,left/lengths[i]);line(a[0],a[1],a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,c,width);left-=lengths[i];}}
 paths.forEach((path,i)=>{let q=Math.max(0,Math.min(1,(t-.8-i*.35)/.55));if(q>0)drawPath(path,q,3,1);if(t>2){for(let k=0;k<2;k++){let f=((t-2)*.5+k*.5+i*.1)%1;const lens=path.slice(1).map((b,j)=>Math.hypot(b[0]-path[j][0],b[1]-path[j][1]));let d=f*lens.reduce((a,b)=>a+b,0);for(let j=0;j<lens.length;j++){if(d<=lens[j]){let a=path[j],b=path[j+1];circle(a[0]+(b[0]-a[0])*d/lens[j],a[1]+(b[1]-a[1])*d/lens[j],5,8);circle(a[0]+(b[0]-a[0])*d/lens[j],a[1]+(b[1]-a[1])*d/lens[j],2,7);break;}d-=lens[j];}}}});
 nodes.forEach((node,i)=>{let q=Math.max(0,Math.min(1,(t-i*.3)/.4));if(q<=0)return;let {x,y,w,h}=node;y+=Math.round(12*(1-q)**3);round(x,y,w,h,10,3);round(x+1,y+1,w-2,h-2,9,1);rect(x+13,y+13,24,3,7);text(node.label,x+13,y+29,1,6);text(node.sub,x+13,y+47,1,4);circle(x+w-13,y+15,3,q===1?10:4);});
 text("ARCHITECTURE IN MOTION",26,91,1,4);
 rect(24,330,592,1,2);text("DIAGRAMWISE.COM",26,342,1,5);text("BUILD YOUR NEXT BIG IDEA",454,342,1,4);
 // Gentle end wipe gives a clean return to the assembly.
 if(n>=66){const k=(n-66)/6;for(let y=74;y<326;y++)for(let x=0;x<W;x++)if((x*13+y*7)%6<k*6)p[y*W+x]=0;}
 return p;
}
function encode(p){
 const out=[];let acc=0,bits=0,size=9,next=258,dict=new Map();
 function put(c){acc|=c<<bits;bits+=size;while(bits>=8){out.push(acc&255);acc>>>=8;bits-=8;}}
 put(256);let prefix=p[0];
 for(let i=1;i<p.length;i++){const v=p[i],key=prefix*256+v;if(dict.has(key)){prefix=dict.get(key);continue;}put(prefix);if(next<4096){dict.set(key,next++);if(next>(1<<size)&&size<12)size++;}else{put(256);dict=new Map();next=258;size=9;}prefix=v;}
 put(prefix);put(257);if(bits)out.push(acc&255);return out;
}
const bytes=[];const add=(...v)=>bytes.push(...v),word=n=>add(n&255,n>>8),str=s=>[...s].forEach(c=>add(c.charCodeAt(0)));
str("GIF89a");word(W);word(H);add(247,0,0);for(let i=0;i<256;i++)add(...(colors[i]||colors[0]));
add(33,255,11);str("NETSCAPE2.0");add(3,1,0,0,0);
for(let n=0;n<N;n++){add(33,249,4,4);word(n===35?65:8);add(0,0,44);word(0);word(0);word(W);word(H);add(0,8);const data=encode(frame((n+30)%N));for(let j=0;j<data.length;j+=255){let s=data.slice(j,j+255);add(s.length,...s);}add(0);}
add(59);
const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
let b64="";for(let i=0;i<bytes.length;i+=3){let a=bytes[i],b=bytes[i+1],c=bytes[i+2],v=(a<<16)|((b||0)<<8)|(c||0);b64+=chars[(v>>>18)&63]+chars[(v>>>12)&63]+(b===undefined?"=":chars[(v>>>6)&63])+(c===undefined?"=":chars[v&63]);}
return {b64,bytes:bytes.length,frames:N,width:W,height:H};

})();
writeFileSync(new URL("../public/diagramwise.gif", import.meta.url), Buffer.from(result.b64, "base64"));
console.log(`Generated ${result.frames} frames (${result.bytes} bytes)`);

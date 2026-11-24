(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var NS='http://www.w3.org/2000/svg';
var main=$('#main'),reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function toast(t){var e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(function(){e.classList.remove('on')},2200)}
/* hanging marigold garland */
(function(){var g=$('#garland'),h='';for(var i=0;i<15;i++){var x=16+i*32,len=30+((i*37)%5)*11,sw=(i%2?'':'animation-delay:-2s');
h+='<g class="swing" style="transform-origin:'+x+'px 0;'+sw+'"><line x1="'+x+'" y1="0" x2="'+x+'" y2="'+len+'" stroke="#6a8a3a" stroke-width="1.4"/>';
for(var y=8;y<=len;y+=12){h+='<circle cx="'+x+'" cy="'+y+'" r="6.2" fill="url(#mg)"/><circle cx="'+x+'" cy="'+y+'" r="2.4" fill="#c95f00" opacity=".7"/>'}
h+='</g>'}g.innerHTML=h})();
/* petals */
function petals(box,n){for(var i=0;i<n;i++){var p=document.createElement('i');p.className='petal';var s=p.style;
s.setProperty('--w',(9+Math.random()*9)+'px');s.left=(Math.random()*100)+'%';s.setProperty('--x',((Math.random()-.5)*120)+'px');
s.setProperty('--t',(7+Math.random()*6)+'s');s.setProperty('--dl',(-Math.random()*10)+'s');box.appendChild(p)}}
/* typing */
function seg(t){try{return Array.from(new Intl.Segmenter('bn',{granularity:'grapheme'}).segment(t),function(s){return s.segment})}catch(e){return Array.from(t)}}
function type(el,cb){var a=seg(el.dataset.t),i=0;el.textContent='';var tn=document.createTextNode(''),cur=document.createElement('span');cur.className='cur';el.appendChild(tn);el.appendChild(cur);
(function s(){if(i<a.length){tn.nodeValue+=a[i++];setTimeout(s,reduce?5:75)}else{cur.remove();cb&&cb()}})()}
var typed=false;function runType(){if(typed)return;typed=true;var n1=$('#n1'),b1=$('#b1'),n2=$('#n2'),b2=$('#b2');
type(n1,function(){type(b1,function(){type(n2,function(){type(b2)})})})}
/* open the book */
var book=$('#book'),opened=false;
function openBook(){if(opened)return;opened=true;startMusic();book.classList.add('open');petals($('#petals'),22);
setTimeout(function(){$('#cover').classList.add('gone');main.classList.add('show');['garland','dots','music'].forEach(function(i){$('#'+i).classList.add('show')});runType()},2100);
setTimeout(function(){$('#petals').style.transition='opacity 2s';$('#petals').style.opacity=0},9000)}
book.addEventListener('click',openBook);
/* page dots + visibility */
var pages=$$('.page'),dots=$('#dots');
pages.forEach(function(p,i){var b=document.createElement('button');b.setAttribute('aria-label',p.dataset.n);b.onclick=function(){p.scrollIntoView({behavior:'smooth'})};dots.appendChild(b)});
var db=$$('button',dots),p3petals=false;
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var i=pages.indexOf(e.target);db.forEach(function(b,k){b.classList.toggle('on',k===i)});
if(e.target.id==='p3'&&!p3petals&&!reduce){p3petals=true;var d=document.createElement('div');d.className='petals';d.style.zIndex=1;e.target.appendChild(d);petals(d,12)}}})},{root:main,threshold:.55});
pages.forEach(function(p){io.observe(p)});
$('#top').onclick=function(){main.scrollTo({top:0,behavior:'smooth'})};
document.addEventListener('keydown',function(e){if(!opened)return;if(e.key==='ArrowDown'||e.key==='PageDown'){main.scrollBy({top:main.clientHeight,behavior:'smooth'})}if(e.key==='ArrowUp'||e.key==='PageUp'){main.scrollBy({top:-main.clientHeight,behavior:'smooth'})}});
/* countdown */
var T=new Date('2027-01-27T18:00:00+05:30').getTime();
function tick(){var d=Math.max(0,T-Date.now()),s=Math.floor(d/1000);
$('#cdd').textContent=Math.floor(s/86400);$('#cdh').textContent=String(Math.floor(s%86400/3600)).padStart(2,'0');$('#cdm').textContent=String(Math.floor(s%3600/60)).padStart(2,'0');$('#cds').textContent=String(s%60).padStart(2,'0')}
tick();setInterval(tick,1000);
/* add to calendar */
var ev={t:'Reception of Suvankar & Sangita',loc:'Parui Bari, Kalinagar, Jagadishpur, Uluberia, Howrah, West Bengal',desc:'Reception at 6:00 PM. The wedding is on 26 January 2027. With love, the Parui and Mondal families.'};
function esc(t){return t.replace(/,/g,'\\,').replace(/;/g,'\\;')}
$('#gcal').href='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent(ev.t)+'&dates=20270127T180000/20270127T220000&ctz=Asia/Kolkata&location='+encodeURIComponent(ev.loc)+'&details='+encodeURIComponent(ev.desc);
var ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Wedding Invitation//EN','BEGIN:VEVENT','UID:suvankar-sangita-reception-20270127@invitation','DTSTAMP:20261124T000000Z','DTSTART:20270127T123000Z','DTEND:20270127T163000Z','SUMMARY:'+esc(ev.t),'LOCATION:'+esc(ev.loc),'DESCRIPTION:'+esc(ev.desc),'END:VEVENT','END:VCALENDAR'].join('\r\n');
try{var il=$('#icsl');il.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));il.setAttribute('download','Suvankar-Sangita-Reception.ics');il.removeAttribute('target')}catch(e){}
$('#addcal').onclick=function(){$('#calmenu').classList.add('on')};
$('#calclose').onclick=function(){$('#calmenu').classList.remove('on')};
$('#calmenu').onclick=function(e){if(e.target.id==='calmenu')e.target.classList.remove('on')};
/* copy address */
$('#copy').onclick=function(){var t='Parui Bari, Kalinagar, Jagadishpur, Uluberia, Howrah, West Bengal';
function fb(){var a=document.createElement('textarea');a.value=t;a.style.cssText='position:fixed;opacity:0';document.body.appendChild(a);a.select();var ok=false;try{ok=document.execCommand('copy')}catch(e){}a.remove();toast(ok?'Address copied':'Press and hold the address to copy')}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){toast('Address copied · ঠিকানা কপি হয়েছে')},fb)}else fb()};
/* tassel scroll */
var sc=$('#scroll'),ts=$('#tassel'),p3=$('#p3'),o=0,H=220,anim=0,first=true;
function setO(v){o=Math.max(0,Math.min(1,v));sc.style.setProperty('--o',o)}
function Hh(){H=$('.parch .in',sc).offsetHeight||220}
function go(to){cancelAnimationFrame(anim);var f=o,t0=performance.now(),D=reduce?1:800;(function s(n){var k=Math.min(1,(n-t0)/D),e=1-Math.pow(1-k,3);setO(f+(to-f)*e);if(k<1)anim=requestAnimationFrame(s);else if(to===1&&first){first=false;p3.classList.add('opened');confetti()}})(t0)}
var sy=0,so=0,drag=false,moved=0;
ts.addEventListener('pointerdown',function(e){drag=true;moved=0;sy=e.clientY;so=o;Hh();cancelAnimationFrame(anim);try{ts.setPointerCapture(e.pointerId)}catch(x){}});
ts.addEventListener('pointermove',function(e){if(!drag)return;var dy=e.clientY-sy;moved=Math.max(moved,Math.abs(dy));setO(so+dy/H)});
function end(){if(!drag)return;drag=false;if(moved<6)go(o>.5?o:1);else go(o>.35?1:0)}
ts.addEventListener('pointerup',end);ts.addEventListener('pointercancel',end);
ts.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();go(1)}});
/* confetti */
function confetti(){if(reduce)return;var c=$('#conf'),r=p3.getBoundingClientRect(),dpr=Math.min(2,window.devicePixelRatio||1);c.width=r.width*dpr;c.height=r.height*dpr;c.style.width=r.width+'px';c.style.height=r.height+'px';
var x=c.getContext('2d'),cols=['#c9a45c','#ecd9a6','#c8284f','#f2a7b8','#6e1f2f','#fff'],P=[];
for(var i=0;i<90;i++)P.push({x:r.width/2*dpr,y:r.height*.45*dpr,vx:(Math.random()-.5)*12*dpr,vy:(-Math.random()*13-3)*dpr,w:(4+Math.random()*5)*dpr,h:(6+Math.random()*7)*dpr,a:Math.random()*6,va:(Math.random()-.5)*.3,c:cols[i%6]});
var st=performance.now();(function f(n){var k=(n-st)/3200;x.clearRect(0,0,c.width,c.height);if(k>1)return;
P.forEach(function(p){p.vy+=.35*dpr;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.a+=p.va;x.save();x.globalAlpha=1-k*k;x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.fillRect(-p.w/2,-p.h/2,p.w,p.h);x.restore()});requestAnimationFrame(f)})(st)}
/* background music (supplied MP3) */
/* music: file is assets/music.mp3, set in index.html */
var bgm=$('#bgm'),mb=$('#music'),want=false,loaded=false,fadeT=0;
function loadMusic(){if(loaded)return;loaded=true}
function setUI(on){mb.classList.toggle('on',on);mb.setAttribute('aria-pressed',on?'true':'false');mb.setAttribute('aria-label',on?'Turn music off':'Turn music on')}
function fadeTo(v){clearInterval(fadeT);fadeT=setInterval(function(){var d=v-bgm.volume;if(Math.abs(d)<.03){bgm.volume=v;clearInterval(fadeT)}else bgm.volume=Math.max(0,Math.min(1,bgm.volume+Math.sign(d)*.03))},60)}
function startMusic(){loadMusic();want=true;try{bgm.volume=0}catch(e){}var p=bgm.play();(p&&p.then?p:Promise.resolve()).then(function(){setUI(true);fadeTo(.7)}).catch(function(){want=false;setUI(false)})}
mb.addEventListener('click',function(){if(bgm.paused||!want){startMusic()}else{want=false;bgm.pause();setUI(false)}});
document.addEventListener('visibilitychange',function(){if(document.hidden){bgm.pause()}else if(want&&opened){bgm.play().catch(function(){})}});
window.__app={petals:petals,toast:toast,$:$,$$:$$,main:main,reduce:reduce,NS:NS};
})();

(function(){
var A=window.__app,$=A.$,$$=A.$$;
var PH=["assets/photos/p01.jpg","assets/photos/p02.jpg","assets/photos/p03.jpg","assets/photos/p04.jpg","assets/photos/p05.jpg","assets/photos/p06.jpg","assets/photos/p07.jpg","assets/photos/p08.jpg","assets/photos/p09.jpg","assets/photos/p10.jpg","assets/photos/p11.jpg","assets/photos/p12.jpg","assets/photos/p13.jpg","assets/photos/p14.jpg","assets/photos/p15.jpg","assets/photos/p16.jpg","assets/photos/p17.jpg","assets/photos/p18.jpg"];
var CAP=[["A glance that said forever.","এক দৃষ্টিতেই চিরকালের কথা।","47% 40%"],["Side by side, by the river of time.","সময়ের নদীর ধারে, পাশাপাশি।","50% 62%"],["In your arms, I am home.","তোমার বাহুতেই আমার ঘর।","50% 45%"],["Eyes that speak without words.","চোখের ভাষায় সব কথা।","52% 50%"],["Every road leads to you.","সব পথ এসে মিশেছে তোমাতেই।","50% 50%"],["Two hearts, one beautiful path.","দুই মন, একটি সুন্দর পথ।","56% 50%"],["A calm heart and a gentle smile.","শান্ত মন, মিষ্টি হাসি।","48% 50%"],["My favourite smile, my forever.","আমার প্রিয় হাসি, আমার চিরদিন।","46% 40%"],["Laughter is our love language.","হাসিই আমাদের ভালোবাসার ভাষা।","52% 50%"],["Playful moments, endless joy.","খুনসুটিতে ভরা আনন্দের দিন।","54% 50%"],["Always right beside you.","সবসময় তোমার পাশেই।","48% 50%"],["Rest your dreams on me.","তোমার স্বপ্নগুলো আমার কাছে রেখো।","50% 50%"],["Wrapped in love, wrapped in you.","ভালোবাসার আলিঙ্গনে তুমি আর আমি।","50% 55%"],["A flower for my forever.","আমার চিরদিনের জন্য একটি ফুল।","50% 50%"],["Even our little quarrels end in laughter.","খুনসুটিও শেষে হাসিতে মেলে।","50% 50%"],["Her smile is my favourite place.","ওর হাসিই আমার সবচেয়ে প্রিয় ঠিকানা।","60% 50%"],["Your shoulder, my safest place.","তোমার কাঁধেই আমার নিশ্চিন্ত আশ্রয়।","54% 50%"],["Together, from today to always.","আজ থেকে চিরদিন, একসাথে।","50% 40%"]];
/* gallery */
var gal=$('#gal'),gd=$('#gd'),cnt=$('#cnt'),sl=[],gb=[];
CAP.forEach(function(c,i){var d=document.createElement('div');d.className='sl';d.innerHTML='<img alt="'+c[0]+'" decoding="async" loading="lazy" style="--pos:'+c[2]+'"><p>'+c[0]+'<span>'+c[1]+'</span></p>';d.firstChild.src=PH[i];gal.appendChild(d);sl.push(d);
var b=document.createElement('button');b.setAttribute('aria-label','Photo '+(i+1));b.onclick=function(){d.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'})};gd.appendChild(b);gb.push(b)});
var cur=-1,rq=0;function upd(){var r=gal.getBoundingClientRect(),m=r.left+r.width/2,best=0,bd=1e9;sl.forEach(function(s,i){var q=s.getBoundingClientRect(),d=Math.abs(q.left+q.width/2-m);if(d<bd){bd=d;best=i}});
if(best!==cur){cur=best;sl.forEach(function(s,i){s.classList.toggle('on',i===best)});gb.forEach(function(b,i){b.classList.toggle('on',i===best)});cnt.textContent=(best+1)+' / '+sl.length}}
gal.addEventListener('scroll',function(){cancelAnimationFrame(rq);rq=requestAnimationFrame(upd)},{passive:true});setTimeout(upd,50);window.addEventListener('resize',upd);
/* sparkles */
var sp=$('#sparks');sp.style.cssText='position:absolute;inset:0;pointer-events:none';
for(var i=0;i<34;i++){var s=document.createElement('i');s.className='spark';s.style.cssText='left:'+Math.random()*100+'%;top:'+Math.random()*100+'%;--z:'+(5+Math.random()*9)+'px;--t:'+(2+Math.random()*3)+'s;--dl:'+(-Math.random()*5)+'s';sp.appendChild(s)}
/* function cards */
var WED='<svg viewBox="0 0 280 170"><defs><linearGradient id="fl" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffb21c"/><stop offset="1" stop-color="#ff5a1c"/></linearGradient></defs><rect width="280" height="170" fill="#7c2438"/><circle cx="140" cy="86" r="86" fill="#9a3a50" opacity=".55"/><path d="M30 164h220" stroke="#c9a45c" stroke-width="3"/><rect x="40" y="52" width="9" height="112" fill="url(#gg)"/><rect x="231" y="52" width="9" height="112" fill="url(#gg)"/><rect x="76" y="60" width="7" height="104" fill="url(#gg)" opacity=".8"/><rect x="197" y="60" width="7" height="104" fill="url(#gg)" opacity=".8"/><path d="M28 54h224l-22-30H50z" fill="url(#gg)" stroke="#7a5a20"/><path d="M60 34h160M70 44h140" stroke="#7a1030" stroke-width="3" stroke-dasharray="3 5"/><g fill="url(#mg)"><circle cx="44" cy="66" r="5"/><circle cx="44" cy="80" r="5"/><circle cx="44" cy="94" r="5"/><circle cx="236" cy="66" r="5"/><circle cx="236" cy="80" r="5"/><circle cx="236" cy="94" r="5"/><circle cx="64" cy="60" r="5"/><circle cx="78" cy="64" r="5"/><circle cx="92" cy="66" r="5"/><circle cx="216" cy="60" r="5"/><circle cx="202" cy="64" r="5"/><circle cx="188" cy="66" r="5"/><circle cx="104" cy="66" r="4.5"/><circle cx="116" cy="66" r="4.5"/><circle cx="164" cy="66" r="4.5"/><circle cx="176" cy="66" r="4.5"/><circle cx="140" cy="62" r="4.5"/></g><path d="M98 150h84l-8-26h-68z" fill="#b88f3e" stroke="#7a5a20" stroke-width="1.5"/><rect x="104" y="146" width="72" height="6" fill="#e9cf8c"/><path d="M140 126c-18-6-14-22-6-30 0 8 6 8 8 2 8 6 18 14 12 28 8-6 8-16 4-22 16 12 12 36-18 22z" fill="url(#fl)"/><path d="M140 124c-8-4-6-12-2-16 2 4 6 8 2 16z" fill="#ffe27a"/><g fill="#fff7df" opacity=".8"><circle cx="30" cy="30" r="1.5"/><circle cx="256" cy="26" r="1.5"/><circle cx="20" cy="110" r="1.2"/><circle cx="262" cy="120" r="1.2"/></g></svg>';
var REC='<svg viewBox="0 0 280 170"><rect width="280" height="170" fill="#f6e2e4"/><circle cx="140" cy="90" r="84" fill="#fff" opacity=".55"/><path d="M52 168V84a88 88 0 0 1 176 0v84" fill="none" stroke="#6e1f2f" stroke-width="7"/><path d="M52 168V84a88 88 0 0 1 176 0v84" fill="none" stroke="#c9a45c" stroke-width="2" stroke-dasharray="1 7" stroke-linecap="round"/><g fill="#3f7a4a"><ellipse cx="62" cy="40" rx="14" ry="5" transform="rotate(-55 62 40)"/><ellipse cx="108" cy="12" rx="14" ry="5" transform="rotate(-20 108 12)"/><ellipse cx="172" cy="12" rx="14" ry="5" transform="rotate(20 172 12)"/><ellipse cx="218" cy="40" rx="14" ry="5" transform="rotate(55 218 40)"/></g><g><svg x="38" y="48" width="34" height="34" viewBox="0 0 100 100"><use href="#rose"/></svg><svg x="86" y="8" width="30" height="30" viewBox="0 0 100 100"><use href="#rose"/></svg><svg x="125" y="-4" width="32" height="32" viewBox="0 0 100 100"><use href="#rose"/></svg><svg x="166" y="8" width="30" height="30" viewBox="0 0 100 100"><use href="#rose"/></svg><svg x="208" y="48" width="34" height="34" viewBox="0 0 100 100"><use href="#rose"/></svg></g><path d="M66 70q74 40 148 0" fill="none" stroke="#a38046" stroke-width="1"/><g fill="#ffd25a"><circle cx="80" cy="77" r="4"/><circle cx="100" cy="86" r="4"/><circle cx="120" cy="92" r="4"/><circle cx="140" cy="94" r="4"/><circle cx="160" cy="92" r="4"/><circle cx="180" cy="86" r="4"/><circle cx="200" cy="77" r="4"/></g><g fill="#fff3b0" opacity=".5"><circle cx="80" cy="77" r="8"/><circle cx="140" cy="94" r="8"/><circle cx="200" cy="77" r="8"/></g><rect x="108" y="128" width="64" height="40" rx="4" fill="#6e1f2f"/><path d="M108 140h64" stroke="#c9a45c"/><g fill="#c9a45c"><path d="M82 168v-30h6v30zM86 132c-5-6-1-10 0-14 1 4 5 8 0 14z"/><path d="M192 168v-30h6v30zM196 132c-5-6-1-10 0-14 1 4 5 8 0 14z"/></g></svg>';
var CARDS=[
{t:'Reception',b:'প্রীতিভোজ',tag:'You are invited · আপনি আমন্ত্রিত',rows:[['Date','Wednesday, 27 January 2027','বুধবার, ২৭ জানুয়ারি ২০২৭'],['Time','6:00 PM','সন্ধ্যা ৬:০০টা'],['Venue','Parui Bari, Kalinagar, Uluberia','নিজ বাসভবন, কালীনগর, উলুবেড়িয়া'],['Dress code','Red & White','লাল ও সাদা']],col:['#c8102e','#ffffff','#c9a45c'],bg:'#f6e2e4',ill:REC},
{t:'Wedding',b:'শুভ বিবাহ',tag:'For your blessings · আশীর্বাদ কামনায়',rows:[['Date','Tuesday, 26 January 2027','মঙ্গলবার, ২৬ জানুয়ারি ২০২৭'],['Note','Celebrated with the blessings of our elders','গুরুজনদের আশীর্বাদে']],col:['#6e1f2f','#c9a45c','#fbf5ea'],bg:'#7c2438',ill:WED}];
var car=$('#car'),pd=$('#pd'),cs=[],ci=0,dx=0;
CARDS.forEach(function(c,i){var d=document.createElement('div');d.className='fc';d.style.setProperty('--bgc',c.bg);
d.innerHTML='<div class="ill">'+c.ill+'</div><div class="bd"><div class="tg">'+c.tag+'</div><h3>'+c.t+' <span class="bn" style="font-size:15px;color:#8a6a2b">'+c.b+'</span></h3>'+c.rows.map(function(r){return '<div class="row"><small>'+r[0]+'</small>'+r[1]+'<div class="bn">'+r[2]+'</div></div>'}).join('')+'<div class="row"><small>Theme colour</small><div class="sw">'+c.col.map(function(x){return '<i style="background:'+x+'"></i>'}).join('')+'</div></div></div>';
car.appendChild(d);cs.push(d);var p=document.createElement('i');pd.appendChild(p)});
function render(){cs.forEach(function(d,i){var o=i-ci;d.classList.toggle('act',o===0);var x=o*64,r=o>0?-36:36,vis=Math.abs(o)<=1;
d.style.transform='translateX('+(x+dx/3.2)+'%) rotateY('+(o===0?dx/-12:r)+'deg) scale('+(o===0?1:.8)+')';d.style.opacity=vis?(o===0?1:.35):0;d.style.zIndex=10-Math.abs(o);d.style.pointerEvents=o===0?'auto':'none';d.style.transition=dx?'none':''});
Array.prototype.forEach.call(pd.children,function(p,i){p.classList.toggle('on',i===ci)})}
function go(n){ci=Math.max(0,Math.min(cs.length-1,n));dx=0;render()}
var sx=0,sy=0,dg=false,hz=false;
car.addEventListener('pointerdown',function(e){dg=true;hz=false;sx=e.clientX;sy=e.clientY;dx=0});
car.addEventListener('pointermove',function(e){if(!dg)return;var a=e.clientX-sx,b=e.clientY-sy;if(!hz&&Math.abs(a)>10&&Math.abs(a)>Math.abs(b)){hz=true;try{car.setPointerCapture(e.pointerId)}catch(x){}}if(hz){dx=a;render()}});
function up(){if(!dg)return;dg=false;var a=dx;dx=0;if(hz&&Math.abs(a)>45)go(ci+(a<0?1:-1));else render()}
car.addEventListener('pointerup',up);car.addEventListener('pointercancel',up);
$('#prev').onclick=function(){go(ci-1)};$('#next').onclick=function(){go(ci+1)};
car.tabIndex=0;car.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')go(ci-1);if(e.key==='ArrowRight')go(ci+1)});
render();
})();

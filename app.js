'use strict';
(() => {
 const $=id=>document.getElementById(id), M=window.mathHTML, E=window.escapeHTML;
 const defaults={units:[1,2,3,4],count:12,seconds:20,feedback:4,seatMax:30};
 const countValues=[4,8,12,16,20,24,30,40,60,80], secondValues=[10,15,20,25,30,40,60,90,120], feedbackValues=Array.from({length:15},(_,i)=>i+1);
 let config={...defaults}, paused=false, locked=false, lastTick=performance.now(), toastTimer, modalPrevious=false;
 try { const saved=JSON.parse(localStorage.getItem('trig-formula-settings-v1'));
  if(saved && Array.isArray(saved.units) && saved.units.length && saved.units.every(u=>[1,2,3,4].includes(u)) && countValues.includes(saved.count) && (saved.seconds===0 || secondValues.includes(saved.seconds)) && feedbackValues.includes(saved.feedback) && [30,35,40,45,50,60].includes(saved.seatMax)) config={...saved,seconds:saved.seconds===0?defaults.seconds:saved.seconds,units:[...new Set(saved.units)]};
 } catch {}
 const zones=Array.from({length:3},(_,index)=>({index,status:'idle',seat:'',nextSeat:'',queue:[],position:0,correct:0,score:0,lastPoints:0,history:[],remaining:0,feedbackRemaining:0,chosen:null}));
 function shuffle(array) { const a=[...array]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a; }
 function buildQueue(settings) {
  const bags=settings.units.map(unit=>shuffle(QUESTION_BANK.filter(q=>q.unit===unit)));
  const picked=[];let order=shuffle(bags.map((_,i)=>i));
  while(picked.length<settings.count && bags.some(b=>b.length)){
   for(const i of order) if(bags[i].length && picked.length<settings.count) picked.push(bags[i].pop());
   order=shuffle(order);
  }
  return shuffle(picked).map(q=>({...q,choices:shuffle(q.options.map((formula,index)=>({formula,isCorrect:index===q.correct})))}));
 }
 function seatOptions(value=''){return `<option value="">不填座號</option>`+Array.from({length:config.seatMax},(_,i)=>`<option value="${i+1}" ${String(i+1)===String(value)?'selected':''}>${i+1} 號</option>`).join('');}
 function selectSeat(z,next=false){return `<label class="seat-choice">${next?'下一位同學的座號':'座號（可不填）'}<select data-seat="${z.index}" data-next="${next}" aria-label="${'左中右'[z.index]}區座號">${seatOptions(next?z.nextSeat:z.seat)}</select></label>`;}
 function renderZone(z){
  const root=$(`zone-${z.index}`),title=['左區','中區','右區'][z.index], letters=['A','B','C'];
  const score=z.score;
  let inner=`<div class="zone-head"><div class="zone-name"><span class="zone-letter">${letters[z.index]}</span>${title}<span class="seat-label">${z.seat?`${E(z.seat)} 號`:''}</span></div><div class="score">${score}<small>分</small></div></div>`;
  if(z.status==='idle') inner+=`<div class="zone-content idle"><div class="idle-number">${['α','β','θ'][z.index]}</div><h2>準備好就開始</h2><p>選出正確公式<br>每區獨立出題、計時與計分</p>${selectSeat(z)}<button class="zone-start" data-start="${z.index}">開始挑戰</button><p>${config.count} 題 · ${config.seconds===0?'不限時':`每題 ${config.seconds} 秒`}</p></div>`;
  else if(z.status==='done'){
   const total=z.queue.length, timed=z.history.filter(h=>h.chosen===null).length;
   inner+=`<div class="zone-content result"><span class="topic-line">本回合完成</span><h2>${z.seat?`${E(z.seat)} 號同學`:'挑戰完成'}</h2><div class="result-mark">${score}<small> / ${total*z.settings.seconds*2}</small></div><div class="result-stats">答對 ${z.correct} / ${total} 題 · 正確率 ${Math.round(z.correct/total*100)}%<br>答錯 ${total-z.correct-timed} 題 · 逾時 ${timed} 題</div><div class="unit-stats">${[...new Set(z.queue.map(q=>q.unit))].sort().map(u=>{const hs=z.history.filter(h=>h.question.unit===u);return `<div class="unit-stat">單元 ${u}<strong>${hs.filter(h=>h.correct).length} / ${hs.length}</strong></div>`;}).join('')}</div>${selectSeat(z,true)}<button class="zone-start" data-start="${z.index}">下一位同學開始</button></div>`;
  }else{
   const q=z.queue[z.position],feedback=z.status==='feedback',answerIndex=q.choices.findIndex(c=>c.isCorrect);
   inner+=`<div class="zone-content"><div class="round-strip"><span>第 ${z.position+1} / ${z.queue.length} 題</span><span class="timer ${z.remaining<=5000&&z.settings.seconds?'urgent':''}" data-timer="${z.index}">${feedback?'已作答':timerText(z)}</span></div><div class="progress-track"><div class="progress-fill" data-progress="${z.index}" style="width:${z.settings.seconds?z.remaining/(z.settings.seconds*10):100}%"></div></div><div class="prompt"><span class="topic-line">單元 ${q.unit} · ${E(q.topic)}</span><h2>${E(q.prompt)}</h2>${q.formula?`<div class="formula">${M(q.formula)}</div>`:''}</div><p class="condition">${E(q.condition||'選出一個正確答案')}</p><div class="answers">${q.choices.map((c,i)=>`<button class="answer ${feedback&&c.isCorrect?'correct':''} ${feedback&&z.chosen===i&&!c.isCorrect?'wrong':''}" data-answer="${z.index}" data-choice="${i}" ${feedback?'disabled':''} aria-label="選項 ${'ABCD'[i]}"><span class="choice-letter">${feedback&&c.isCorrect?'✓':feedback&&z.chosen===i?'×':'ABCD'[i]}</span><span class="formula">${M(c.formula)}</span></button>`).join('')}</div><div class="feedback ${feedback?(z.lastCorrect?'good':'bad'):''}" aria-live="polite">${feedback?`<strong>${z.lastCorrect?`答對了！ +${z.lastPoints} 分（${z.settings.seconds}＋${z.lastRemainingSeconds}）`:z.chosen===null?'時間到 · 正確答案 '+ 'ABCD'[answerIndex]:'再記住這個公式 · 正確答案 '+ 'ABCD'[answerIndex]}<span class="next-note" data-next-note="${z.index}"></span></strong><span class="detail">${E(q.explanation)}</span>`:`<strong>點選公式作答</strong><span>答對得 ${z.settings.seconds}＋剩餘秒數分，答錯 0 分。</span>`}</div></div>`;
  }
  root.innerHTML=inner;requestAnimationFrame(()=>fitMath(root));
 }
 function fitMath(root){
  root.querySelectorAll('.formula').forEach(wrap=>{
   const math=wrap.querySelector('math');if(!math)return;
   wrap.style.fontSize='';const initial=parseFloat(getComputedStyle(wrap).fontSize);
   const width=math.getBoundingClientRect().width,available=wrap.getBoundingClientRect().width-3;
   if(width>available&&available>0)wrap.style.fontSize=`${Math.max(16,initial*available/width)}px`;
  });
 }
 function renderAll(){zones.forEach(renderZone);updateScope();}
 function updateScope(){ $('scopeSummary').textContent=`單元 ${config.units.join('、')} · 每人 ${config.count} 題 · ${config.seconds?`每題 ${config.seconds} 秒`:'不限時'}`; }
 function timerText(z){return z.settings.seconds?`${Math.ceil(z.remaining/1000)} 秒`:'不限時';}
 function startZone(index){
  const z=zones[index];if(!z || !['idle','done'].includes(z.status))return false;
  if(z.status==='done')z.seat=z.nextSeat;
  z.settings={...config,units:[...config.units]};z.queue=buildQueue(z.settings);z.position=0;z.correct=0;z.score=0;z.lastPoints=0;z.history=[];z.nextSeat='';z.status='playing';z.remaining=z.settings.seconds*1000;z.chosen=null;
  renderZone(z);return true;
 }
 function answer(index,choice){
  const z=zones[index];if(!z || z.status!=='playing'||paused||!Number.isInteger(choice)||choice<0||choice>3)return;
  tick();
  if(z.status!=='playing')return;
  settle(z,choice);
 }
 function settle(z,chosen){
  if(z.status!=='playing')return;
  const q=z.queue[z.position];z.chosen=chosen;z.lastCorrect=chosen!==null&&q.choices[chosen].isCorrect;
  z.lastRemainingSeconds=Math.min(z.settings.seconds,Math.max(0,Math.ceil(z.remaining/1000)));
  z.lastPoints=z.lastCorrect?z.settings.seconds+z.lastRemainingSeconds:0;
  if(z.lastCorrect){z.correct++;z.score+=z.lastPoints;}
  z.history.push({question:q,chosen,correct:z.lastCorrect,points:z.lastPoints,remainingSeconds:z.lastRemainingSeconds});z.status='feedback';z.feedbackRemaining=z.settings.feedback*1000;renderZone(z);
 }
 function nextQuestion(z){
  z.position++;
  if(z.position>=z.queue.length){z.status='done';renderZone(z);return;}
  z.status='playing';z.chosen=null;z.remaining=z.settings.seconds*1000;renderZone(z);
 }
 function tick(){
  const now=performance.now(),dt=now-lastTick;lastTick=now;
  if(paused)return;
  for(const z of zones){
   if(z.status==='playing'&&z.settings.seconds){z.remaining=Math.max(0,z.remaining-dt);const timer=document.querySelector(`[data-timer="${z.index}"]`);if(timer){timer.textContent=timerText(z);timer.classList.toggle('urgent',z.remaining<=5000);}const fill=document.querySelector(`[data-progress="${z.index}"]`);if(fill)fill.style.width=`${z.remaining/(z.settings.seconds*10)}%`;if(z.remaining===0)settle(z,null);}
   else if(z.status==='feedback'){z.feedbackRemaining=Math.max(0,z.feedbackRemaining-dt);const note=document.querySelector(`[data-next-note="${z.index}"]`);if(note)note.textContent=`${Math.ceil(z.feedbackRemaining/1000)} 秒後${z.position===z.queue.length-1?'結算':'下一題'}`;if(z.feedbackRemaining===0)nextQuestion(z);}
  }
 }
 function setPaused(value){paused=value;lastTick=performance.now();$('pauseAll').textContent=value?'繼續':'暫停';$('pauseOverlay').hidden=!value||$('settingsDialog').open;}
 function toast(message){$('toast').textContent=message;$('toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{$('toast').hidden=true;},3200);}
 function populateSettings(value){
  $('unitChecks').innerHTML=[1,2,3,4].map(u=>`<label><input type="checkbox" value="${u}" ${value.units.includes(u)?'checked':''}>單元 ${u}　${UNIT_NAMES[u]}<small>${QUESTION_BANK.filter(q=>q.unit===u).length} 題</small></label>`).join('');
  const options=(id,values,current,label)=>{$(id).innerHTML=values.map(n=>`<option value="${n}" ${n===current?'selected':''}>${label(n)}</option>`).join('');};
  options('questionCount',countValues,value.count,n=>`${n} 題`);options('questionSeconds',secondValues,value.seconds,n=>n?`${n} 秒`:'不限時');options('feedbackSeconds',feedbackValues,value.feedback,n=>`${n} 秒`);options('seatMax',[30,35,40,45,50,60],value.seatMax,n=>`1–${n} 號`);$('settingsError').textContent='';$('bankCount').textContent=QUESTION_BANK.length;
 }
 function openModal(id){modalPrevious=paused;setPaused(true);$(id).showModal();$('pauseOverlay').hidden=true;}
 function closeModal(id){$(id).close();setPaused(modalPrevious);}
 $('arena').innerHTML=zones.map(z=>`<section class="zone" id="zone-${z.index}" aria-label="${['左','中','右'][z.index]}區遊戲"></section>`).join('');
 $('arena').addEventListener('pointerdown',event=>{
  const button=event.target.closest('[data-answer]');if(!button || button.disabled || (event.pointerType==='mouse'&&event.button!==0))return;
  event.preventDefault();answer(Number(button.dataset.answer),Number(button.dataset.choice));
 });
 $('arena').addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button || button.disabled)return;
  if(button.dataset.answer!==undefined && event.detail===0)answer(Number(button.dataset.answer),Number(button.dataset.choice));
  if(button.dataset.start!==undefined)startZone(Number(button.dataset.start));
 });
 $('arena').addEventListener('change',event=>{if(event.target.dataset.seat!==undefined){const z=zones[Number(event.target.dataset.seat)];z[event.target.dataset.next==='true'?'nextSeat':'seat']=event.target.value;}});
 $('startAll').onclick=()=>{let started=0;zones.forEach(z=>{if(startZone(z.index))started++;});if(!started)toast('三區都在挑戰中；完成後可各自換人。');};
 $('pauseAll').onclick=()=>setPaused(!paused);$('resume').onclick=()=>setPaused(false);
 $('settingsOpen').onclick=()=>{populateSettings(config);openModal('settingsDialog');};
 $('settingsClose').onclick=()=>closeModal('settingsDialog');
 for(const id of ['settingsDialog'])$(id).addEventListener('cancel',event=>{event.preventDefault();closeModal(id);});
 $('settingsReset').onclick=()=>populateSettings(defaults);
 $('settingsForm').onsubmit=event=>{
  event.preventDefault();const units=[...$('unitChecks').querySelectorAll('input:checked')].map(el=>Number(el.value));
  if(!units.length){$('settingsError').textContent='請至少選擇一個出題單元。';return;}
  const count=Number($('questionCount').value),available=QUESTION_BANK.filter(q=>units.includes(q.unit)).length;
  if(count>available){$('settingsError').textContent=`目前選取的單元共有 ${available} 題；請降低每人題數，以免同回合重複出題。`;return;}
  config={units,count,seconds:Number($('questionSeconds').value),feedback:Number($('feedbackSeconds').value),seatMax:Number($('seatMax').value)};
  try{localStorage.setItem('trig-formula-settings-v1',JSON.stringify(config));}catch{}
  zones.filter(z=>z.status==='idle'||z.status==='done').forEach(z=>{if(z.status==='idle'&&Number(z.seat)>config.seatMax)z.seat='';if(Number(z.nextSeat)>config.seatMax)z.nextSeat='';renderZone(z);});updateScope();closeModal('settingsDialog');toast('設定已儲存；下一回合套用。');
 };
 try{document.body.classList.toggle('light',localStorage.getItem('trig-formula-theme')==='light');}catch{}
 function themeLabel(){$('themeToggle').textContent=document.body.classList.contains('light')?'深色':'淺色';}
 $('themeToggle').onclick=()=>{document.body.classList.toggle('light');themeLabel();try{localStorage.setItem('trig-formula-theme',document.body.classList.contains('light')?'light':'dark');}catch{}};themeLabel();
 $('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{toast('可按鍵盤 F11，或使用瀏覽器選單進入全螢幕。');}};
 document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'離開全螢幕':'全螢幕';});
 function setLocked(value){locked=value;document.body.classList.toggle('locked',value);$('unlock').hidden=!value;}
 $('lock').onclick=()=>{setLocked(true);toast('操作列已鎖定；長按右上角 2 秒解鎖。');};
 let unlockTimer;
 const cancelUnlock=()=>{clearTimeout(unlockTimer);unlockTimer=null;};
 const beginUnlock=()=>{cancelUnlock();unlockTimer=setTimeout(()=>{setLocked(false);cancelUnlock();},2000);};
 $('unlock').addEventListener('pointerdown',event=>{if(event.button!==0&&event.pointerType==='mouse')return;event.preventDefault();$('unlock').setPointerCapture(event.pointerId);beginUnlock();});
 for(const name of ['pointerup','pointercancel','lostpointercapture'])$('unlock').addEventListener(name,cancelUnlock);
 $('unlock').addEventListener('keydown',event=>{if(['Enter',' '].includes(event.key)&&!event.repeat){event.preventDefault();beginUnlock();}});$('unlock').addEventListener('keyup',cancelUnlock);$('unlock').addEventListener('blur',cancelUnlock);
 document.addEventListener('contextmenu',event=>{if(event.target.closest('#arena'))event.preventDefault();});
 document.addEventListener('dragstart',event=>event.preventDefault());
 new ResizeObserver(()=>zones.forEach(z=>fitMath($(`zone-${z.index}`)))).observe($('arena'));
 renderAll();setInterval(tick,100);
 const context=document.modelContext;
 if(context?.registerTool)try{
  Promise.resolve(context.registerTool({name:'read_formula_game_status',description:'Read the visible three-zone formula review game status without revealing unanswered options.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:()=>({paused,zones:zones.map(z=>({zone:z.index+1,status:z.status,seat:z.seat,question:z.position+1,total:z.queue.length,score:z.score}))})})).catch(()=>{});
 }catch{}
})();

/* ============================================================
   HUMAID & SHUMAILA — Baraat & Walima invitation
   Behaviour: envelope reveal, scroll reveals, ambient particles
   and the countdown to the Baraat.
   No dependencies. Everything degrades to a readable document
   if JavaScript never runs (see notes in README).
   ============================================================ */
(function(){
  "use strict";

  /* ---- the one date everything counts toward -------------
     Baraat — 1 January 2027, 8pm, Kolkata (IST, UTC+05:30),
     matching the time printed on the card.
     The Nikah itself was on 31 May 2026; this counts to the
     celebration guests are invited to.                       */
  var TARGET = new Date('2027-01-01T20:00:00+05:30');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- sparks around the seal ---- */
  var env = document.getElementById('envelope');
  for (var i=0;i<14;i++){
    var s = document.createElement('span');
    s.className='spark';
    var a = (i/14)*Math.PI*2, d = 46+Math.random()*44;
    s.style.setProperty('--sx', (Math.cos(a)*d).toFixed(1)+'px');
    s.style.setProperty('--sy', (Math.sin(a)*d - 18).toFixed(1)+'px');
    s.style.animationDelay = (0.02+Math.random()*0.12).toFixed(2)+'s';
    env.appendChild(s);
  }

  /* ---- ambient life: petals and gold dust ----
     Three petal tints drawn from the palette. Fall, sway and flutter each
     get their own duration so no two petals trace the same path. */
  if (!reduce){
    var pc = document.getElementById("petals");
    var TINTS = [
      ["rgba(255,240,236,.95)","rgba(232,193,188,.78)"],   // pale blush
      ["rgba(252,228,222,.92)","rgba(219,171,165,.72)"],   // deeper blush
      ["rgba(255,249,238,.92)","rgba(228,203,152,.62)"]    // faint gold
    ];
    for (var p=0;p<18;p++){
      var t = TINTS[p % TINTS.length];
      var el = document.createElement("span");
      el.className = "petal";
      el.style.left = (Math.random()*100).toFixed(1)+"%";
      el.style.animationDuration = (15+Math.random()*15).toFixed(1)+"s";
      el.style.animationDelay = (-Math.random()*28).toFixed(1)+"s";

      var sway = document.createElement("em");
      sway.style.animationDuration = (3.4+Math.random()*3.4).toFixed(1)+"s";
      sway.style.animationDelay = (-Math.random()*5).toFixed(1)+"s";

      var petal = document.createElement("b");
      petal.style.setProperty("--w", (8+Math.random()*7).toFixed(1)+"px");
      petal.style.setProperty("--c1", t[0]);
      petal.style.setProperty("--c2", t[1]);
      petal.style.animationDuration = (5+Math.random()*5).toFixed(1)+"s";
      petal.style.animationDelay = (-Math.random()*7).toFixed(1)+"s";

      sway.appendChild(petal);
      el.appendChild(sway);
      pc.appendChild(el);
    }

    /* gold dust, rising slowly the other way so the air feels two-directional */
    for (var g=0;g<12;g++){
      var d = document.createElement("span");
      d.className = "dust";
      d.style.left = (Math.random()*100).toFixed(1)+"%";
      d.style.top = (86+Math.random()*16).toFixed(1)+"%";
      d.style.setProperty("--w", (3+Math.random()*4).toFixed(1)+"px");
      d.style.setProperty("--dx", (Math.random()*130-65).toFixed(0)+"px");
      d.style.animationDuration = (17+Math.random()*16).toFixed(1)+"s";
      d.style.animationDelay = (-Math.random()*30).toFixed(1)+"s";
      pc.appendChild(d);
    }
  }

  /* ---- open the envelope ---- */
  var opened = false;
  function open(){
    if (opened) return; opened = true;
    env.classList.add('opening');
    env.setAttribute('aria-expanded','true');
    var wait = reduce ? 120 : 1250;
    setTimeout(function(){
      document.getElementById('flash').classList.add('go');
      document.getElementById('cover').classList.add('gone');
      document.getElementById('main').classList.add('show');
      document.body.classList.remove('locked');
      window.scrollTo(0,0);
      /* Drop focus from the envelope button rather than moving it onto the
         hero. Focusing a full-width section made some mobile browsers draw
         their own focus ring right across the top of the invitation, and no
         amount of `outline:none` reliably suppressed it on every device. */
      setTimeout(function(){
        if (document.activeElement && document.activeElement.blur){
          document.activeElement.blur();
        }
      },100);
    }, wait);
  }
  env.addEventListener('click', open);

  /* ---- scroll reveals ---- */
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  function onReveal(node){
    node.classList.add('in');
    if (node.id === 'coupleSec') motes();
  }
  if ('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (!e.isIntersecting) return;
        onReveal(e.target);
        io.unobserve(e.target);
      });
    },{rootMargin:'0px 0px -12% 0px', threshold:.18});
    reveals.forEach(function(n){ io.observe(n); });
  } else {
    reveals.forEach(onReveal);
  }

  /* ---- warm motes drifting over the photograph ---- */
  function motes(){
    if (reduce) return;
    var box = document.querySelector('.ca-motes');
    if (!box) return;
    for (var m=0;m<11;m++){
      var q = document.createElement('span');
      q.style.left = (8+Math.random()*84).toFixed(1)+'%';
      q.style.setProperty('--dx', (Math.random()*56-28).toFixed(0)+'px');
      q.style.animationDuration = (9+Math.random()*8).toFixed(1)+'s';
      q.style.animationDelay = (-Math.random()*14).toFixed(1)+'s';
      box.appendChild(q);
    }
  }

  /* ---- countdown to the Baraat ---- */
  var dEl = document.getElementById('cd-d'), hEl = document.getElementById('cd-h'),
      mEl = document.getElementById('cd-m'), sEl = document.getElementById('cd-s'),
      noteEl = document.getElementById('cdnote');

  function pad(n){ return (n<10?'0':'')+n; }

  function tick(){
    var left = TARGET - new Date();

    if (left <= 0){
      dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '00';
      noteEl.textContent = 'Alhamdulillah — the day is here';
      return false;
    }

    var sec = Math.floor(left/1000);
    dEl.textContent = Math.floor(sec/86400);
    hEl.textContent = pad(Math.floor(sec/3600)%24);
    mEl.textContent = pad(Math.floor(sec/60)%60);
    sEl.textContent = pad(sec%60);
    return true;
  }

  if (tick()){
    var timer = setInterval(function(){
      if (!tick()) clearInterval(timer);
    }, 1000);
  }
})();

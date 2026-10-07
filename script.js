gsap.registerPlugin(ScrollTrigger);

const glow=document.querySelector(".cursor-glow");
window.addEventListener("mousemove",e=>{gsap.to(glow,{x:e.clientX,y:e.clientY,duration:.5,ease:"power2.out"})});

const intro=gsap.timeline({defaults:{ease:"power3.out"}});
intro.from(".nav",{y:-80,opacity:0,duration:.8})
  .from(".eyebrow",{y:25,opacity:0,duration:.6},"-=.3")
  .from(".hero-title span",{y:90,opacity:0,rotate:2,duration:.9,stagger:.12},"-=.2")
  .from(".lead,.hero-actions",{y:30,opacity:0,duration:.7,stagger:.12},"-=.45")
  .from(".energy-card",{scale:.75,opacity:0,rotateY:25,duration:1.1},"-=.8")
  .from(".float-chip",{scale:0,opacity:0,duration:.5,stagger:.12},"-=.5")
  .from(".scroll-hint",{opacity:0,duration:.5},"-=.2");

gsap.to(".energy-card",{y:-12,rotateZ:.6,duration:3,ease:"sine.inOut",repeat:-1,yoyo:true});
gsap.to(".chip-1",{y:-14,rotate:2,duration:2.8,ease:"sine.inOut",repeat:-1,yoyo:true});
gsap.to(".chip-2",{y:12,rotate:-2,duration:3.2,ease:"sine.inOut",repeat:-1,yoyo:true});
gsap.to(".chip-3",{y:-9,duration:2.5,ease:"sine.inOut",repeat:-1,yoyo:true});
gsap.to(".ring-1",{rotation:360,duration:30,ease:"none",repeat:-1});
gsap.to(".ring-2",{rotation:-360,duration:45,ease:"none",repeat:-1});

const card= document.querySelector(".energy-card");
card.addEventListener("mousemove",e=>{
  const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  gsap.to(card,{rotateY:x*16,rotateX:-y*16,scale:1.03,duration:.4,overwrite:true});
});
card.addEventListener("mouseleave",()=>gsap.to(card,{rotateY:0,rotateX:0,scale:1,duration:.8,ease:"elastic.out(1,.5)"}));

document.querySelectorAll(".interactive-card").forEach(el=>{
  el.addEventListener("mousemove",e=>{
    const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    gsap.to(el,{rotateY:x*7,rotateX:-y*7,y:-5,duration:.35,overwrite:true});
  });
  el.addEventListener("mouseleave",()=>gsap.to(el,{rotateY:0,rotateX:0,y:0,duration:.6,ease:"power3.out"}));
});

document.querySelectorAll(".reveal").forEach(el=>{
  gsap.from(el,{scrollTrigger:{trigger:el,start:"top 85%"},y:45,opacity:0,duration:.8,ease:"power3.out"});
});
gsap.from(".about h2",{scrollTrigger:{trigger:".about",start:"top 65%"},y:90,opacity:0,duration:1,ease:"power3.out"});
gsap.from(".feature-card",{scrollTrigger:{trigger:".feature-grid",start:"top 80%"},y:70,opacity:0,scale:.95,duration:.8,stagger:.15,ease:"power3.out"});
gsap.to(".marquee",{scrollTrigger:{trigger:".about",start:"top bottom",end:"bottom top",scrub:1},x:-350});

document.querySelectorAll(".magnetic").forEach(btn=>{
  btn.addEventListener("mousemove",e=>{
    const r=btn.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;
    gsap.to(btn,{x:x*.18,y:y*.18,duration:.3,ease:"power2.out"});
  });
  btn.addEventListener("mouseleave",()=>gsap.to(btn,{x:0,y:0,duration:.6,ease:"elastic.out(1,.5)"}));
});

document.getElementById("startButton").addEventListener("click",()=>{
  const msg=document.getElementById("message");
  msg.textContent="좋아요! 오늘의 10분 미션을 시작해보세요 💪";
  gsap.fromTo(msg,{y:10,opacity:0,scale:.9},{y:0,opacity:1,scale:1,duration:.6,ease:"back.out(2)"});
  gsap.fromTo("#startButton",{scale:1},{scale:1.08,duration:.15,yoyo:true,repeat:1});
});
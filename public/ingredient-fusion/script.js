const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const timing = { duration: 8000, iterations: Infinity, easing: 'linear' };
if (!reduced.matches) {
 const animations=[];
 const animate=(el,frames)=>animations.push(el.animate(frames,timing));
 document.querySelectorAll('.ingredients .ingredient').forEach(el=>{
  const x=el.dataset.x+'%', y=el.dataset.y+'%';
  animate(el,[{offset:0,left:x,top:y,opacity:1,filter:'blur(0px)',transform:'translate(-50%,-50%) scale(1)'},{offset:.125,left:x,top:y,opacity:1,filter:'blur(0px)',transform:'translate(-50%,-50%) scale(1)',easing:'cubic-bezier(.45,0,.25,1)'},{offset:.5,left:'50%',top:'50%',opacity:1,filter:'blur(0px)',transform:'translate(-50%,-50%) scale(.9)',easing:'ease-in-out'},{offset:.65,left:'50%',top:'50%',opacity:.4,filter:'blur(9px)',transform:'translate(-50%,-50%) scale(.97)'},{offset:.75,left:'50%',top:'50%',opacity:0,filter:'blur(14px)',transform:'translate(-50%,-50%) scale(1)'},{offset:1,left:x,top:y,opacity:0}]);
 });
 animate(document.querySelector('.labels'),[{offset:0,opacity:1},{offset:.5,opacity:1},{offset:.75,opacity:0},{offset:1,opacity:0}]);
 animate(document.querySelector('.final'),[{offset:0,opacity:0,transform:'translate(-50%,-50%) scale(.75)'},{offset:.5,opacity:0},{offset:.75,opacity:1,transform:'translate(-50%,-50%) scale(1)'},{offset:.96,opacity:1},{offset:1,opacity:0}]);
 animate(document.querySelector('.original'),[{offset:0,opacity:1},{offset:.125,opacity:1},{offset:.185,opacity:0},{offset:.96,opacity:0},{offset:1,opacity:1}]);
 // One shared clock keeps every layer synchronized across loop boundaries.
 const start=document.timeline.currentTime;animations.forEach(a=>a.startTime=start);
 document.addEventListener('visibilitychange',()=>animations.forEach(a=>document.hidden?a.pause():a.play()));
}

const dialog = document.querySelector('dialog');
const content = document.querySelector('#step-content');
const next = document.querySelector('.next');
const back = document.querySelector('.back');
let step = 0;
const steps = [
  '<h3>Start with your existing AI.</h3><p>“Help me design a small walnut mushroom lamp with a soft, warm glow.”</p><p style="margin-top:12px">The idea and CAD come from your existing design tools. PartPacket would take over at the handoff.</p>',
  '<h3>Review the example packet.</h3><dl><dt>Design</dt><dd>Walnut mushroom bedside lamp</dd><dt>CAD</dt><dd>lamp.step — example placeholder</dd><dt>Materials</dt><dd>Walnut, brass, opal shade</dd><dt>Destination</dt><dd>Your doorstep — placeholder only</dd></dl><p>In a working service, design feasibility and final details would need confirmation before ordering.</p>',
  '<h3>That’s the handoff we imagine.</h3><p>PartPacket would coordinate the path from your CAD to manufacturing and delivery, while you stay in the conversation.</p><p style="margin-top:12px"><strong>This example ends here.</strong> Nothing was uploaded, manufactured, purchased or sent. The lamp images are AI-generated concept imagery.</p>'
];
function render(){content.innerHTML=steps[step];dialog.scrollTop=0;document.querySelectorAll('.progress li').forEach((el,i)=>{el.classList.toggle('active',i===step);if(i===step)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');});back.hidden=step===0;next.innerHTML=step===0?'Review the example <span>→</span>':step===1?'Explore the handoff <span>→</span>':'Back to the story <span>↗</span>';}
document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>{step=0;render();dialog.showModal();}));
document.querySelector('.close').addEventListener('click',()=>dialog.close());
next.addEventListener('click',()=>{if(step===2){dialog.close();return;}step++;render();});
back.addEventListener('click',()=>{step--;render();});
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});

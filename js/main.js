const qf = document.getElementById('quoteForm');
  qf.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('qf-name').value;
    const contact = document.getElementById('qf-contact').value;
    const type = document.getElementById('qf-type').value;
    const message = document.getElementById('qf-msg').value;
    const subject = encodeURIComponent('Quote Request — ' + type);
    const body = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Contact: ' + contact + '\n' +
      'Project Type: ' + type + '\n\n' +
      'Details:\n' + message
    );
    window.location.href = 'mailto:belkhamsaayhem09@gmail.com?subject=' + subject + '&body=' + body;
  });

const messages = [
    "SYSTEM READY",
    "PLC LOGIC: COMPILED",
    "VISION INSPECTION: PASS",
    "SERVO AXES: HOMED",
    "STANDING BY FOR NEXT WORK ORDER"
  ];
  const el = document.getElementById('readout');
  let i = 0;
  function type(text, cb){
    el.textContent = '';
    let j = 0;
    const iv = setInterval(()=>{
      el.textContent += text[j];
      j++;
      if(j >= text.length){ clearInterval(iv); setTimeout(cb, 1400); }
    }, 32);
  }
  function cycle(){
    type(messages[i], ()=>{ i = (i+1) % messages.length; cycle(); });
  }
  cycle();

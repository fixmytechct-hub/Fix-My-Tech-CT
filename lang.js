/* Shared EN / ES language switcher. Uses the same saved setting as the home page. */
(function(){
  var KEY='fixmytech_lang';
  function getLang(){ try{ return localStorage.getItem(KEY)==='es'?'es':'en'; }catch(e){ return 'en'; } }
  function setLang(l){ try{ localStorage.setItem(KEY,l); }catch(e){} }
  function capture(){
    document.querySelectorAll('[data-es]').forEach(function(el){
      if(el.hasAttribute('data-en-captured')) return;
      el.setAttribute('data-en', el.hasAttribute('data-html') ? el.innerHTML : el.textContent);
      el.setAttribute('data-en-captured','1');
    });
    document.querySelectorAll('[data-es-placeholder]').forEach(function(el){
      if(!el.hasAttribute('data-en-placeholder')) el.setAttribute('data-en-placeholder', el.getAttribute('placeholder')||'');
    });
  }
  function render(lang){
    document.documentElement.setAttribute('lang',lang);
    document.querySelectorAll('[data-es]').forEach(function(el){
      var v=(lang==='es')?el.getAttribute('data-es'):el.getAttribute('data-en');
      if(v===null||v===undefined) return;
      if(el.hasAttribute('data-html')) el.innerHTML=v; else el.textContent=v;
    });
    document.querySelectorAll('[data-es-placeholder]').forEach(function(el){
      el.setAttribute('placeholder', lang==='es'?el.getAttribute('data-es-placeholder'):el.getAttribute('data-en-placeholder'));
    });
    document.querySelectorAll('.lang-toggle button[data-lang]').forEach(function(b){
      b.setAttribute('aria-pressed', b.getAttribute('data-lang')===lang?'true':'false');
    });
    var btn=document.getElementById('submitBtn');
    if(btn && !btn.disabled) btn.textContent=(lang==='es')?'Enviar Mensaje':'Send Message';
  }
  function init(){
    capture(); render(getLang());
    document.querySelectorAll('.lang-toggle button[data-lang]').forEach(function(b){
      b.addEventListener('click',function(){ var l=b.getAttribute('data-lang')==='es'?'es':'en'; setLang(l); render(l); });
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();

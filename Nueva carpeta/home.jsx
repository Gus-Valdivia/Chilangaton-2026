<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mercadopolis</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Nunito+Sans:wght@400;600;700&display=swap">
<style>
/* 1. TOKENS ---------------------------------------------------------------- */
:root{
  color-scheme:light;
  /* Marca (cambia solo estas líneas) */
  --brand-azalea:#A83278;
  --brand-vivid:#8F00FF;
  --brand-deep:#4B0082;
  --brand-pink-vivid:#D6007A;
  --brand-pink-medium:#F06FAE;
  /* Neutros */
  --color-white:#FFFFFF;
  --color-bg:#F8F6FB;
  --color-bg-alt:#F0EAF7;
  --color-text:#241A2D;
  --color-text-muted:#62586B;
  --color-border:#E4DCEB;
  --color-border-strong:#7A6F85;
  --color-success:#287A52;
  /* Roles */
  --color-heading:var(--brand-deep);
  --color-primary:var(--brand-vivid);
  --color-primary-hover:color-mix(in srgb,var(--brand-vivid) 85%,#000);
  --color-primary-active:color-mix(in srgb,var(--brand-vivid) 70%,#000);
  --color-primary-soft:color-mix(in srgb,var(--brand-vivid) 10%,#fff);
  --color-highlight:var(--brand-pink-vivid);
  --color-success-soft:color-mix(in srgb,var(--color-success) 8%,#fff);
  /* Tipografía */
  --font-sans:"Nunito Sans",system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  --font-serif:Lora,Georgia,"Times New Roman",serif;
  --text-sm:.9375rem;--text-base:1rem;--text-lg:1.125rem;--text-xl:1.375rem;--text-2xl:1.75rem;
  /* Espaciado, forma, elevación */
  --space-1:.25rem;--space-2:.5rem;--space-3:.75rem;--space-4:1rem;--space-5:1.5rem;--space-6:2rem;
  --radius-sm:.5rem;--radius-md:.75rem;--radius-lg:1rem;--radius-pill:999px;
  --shadow-sm:0 1px 2px rgb(36 26 45 / .08);
  --shadow-md:0 3px 10px rgb(36 26 45 / .16);
  --shadow-lg:0 8px 24px rgb(36 26 45 / .18);
  --touch-min:2.75rem;
  --z-chat:100;
  --transition-fast:120ms ease;
}
@media (prefers-reduced-motion:reduce){:root{--transition-fast:0s}}

/* 2. BASE ------------------------------------------------------------------ */
*,*::before,*::after{box-sizing:border-box}
body{margin:0;font:400 var(--text-base)/1.6 var(--font-sans);color:var(--color-text);background:var(--color-bg);overflow-wrap:break-word}
::selection{background:var(--brand-pink-medium);color:var(--color-text)}
:focus-visible{outline:3px solid var(--color-primary);outline-offset:2px}
p{margin:0 0 var(--space-2)}
h1,h2,h3,h4{line-height:1.25}
h2,h3,h4{margin:0 0 var(--space-1);color:var(--color-heading)}
h2{font-size:var(--text-xl)}
h3{font:700 var(--text-lg)/1.25 var(--font-serif)}
h4{font-size:var(--text-base)}

/* 3. LAYOUT (misma estructura: mapa fijo a la derecha, contenido a la izquierda) */
.layout{display:flex;flex-direction:row-reverse;min-height:100vh}
#mapa-panel{width:50%;height:100vh;position:sticky;top:0;align-self:flex-start;display:flex;align-items:center;justify-content:center;overflow:hidden;background:var(--color-bg-alt);border-left:4px solid var(--color-primary)}
#mapa-panel img{width:100%;height:100%;object-fit:cover}
#mapa-panel p{margin:0}
.contenido{width:50%;min-width:0;display:flex;flex-direction:column}
#app{flex:1;padding:var(--space-4)}
@media (max-width:800px){
  .layout{flex-direction:column}
  #mapa-panel{width:100%;height:40vh;position:static;border-left:0;border-bottom:4px solid var(--color-primary)}
  .contenido{width:100%}
}

/* 4. ENCABEZADO Y PIE ------------------------------------------------------ */
h1{display:flex;align-items:center;gap:var(--space-3);margin:0;padding:var(--space-3) var(--space-4);background:var(--color-heading);border-bottom:4px solid var(--color-highlight);color:var(--color-white);font:700 var(--text-2xl)/1.25 var(--font-serif)}
h1::before{content:"";flex:none;width:1.75rem;height:1.75rem;border:3px solid var(--color-white);border-radius:50%;background:var(--brand-azalea)}
footer{margin-top:var(--space-5);padding:var(--space-5) var(--space-4) 5rem;background:var(--color-heading);border-top:4px solid var(--color-highlight);color:var(--color-white)}
footer h3{margin:0 0 var(--space-1);color:var(--color-white)}
footer h4{margin:0;color:var(--color-border);font-weight:400}

/* 5. BOTONES --------------------------------------------------------------- */
button,.btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);min-height:var(--touch-min);padding:var(--space-2) var(--space-4);border:2px solid var(--color-primary);border-radius:var(--radius-md);background:var(--color-white);color:var(--color-primary);font:inherit;font-weight:700;line-height:1.2;text-align:center;text-decoration:none;cursor:pointer;transition:background-color var(--transition-fast),border-color var(--transition-fast)}
button:hover,.btn:hover{background:var(--color-primary-soft);border-color:var(--color-primary-hover);color:var(--color-primary-hover)}
button:active,.btn:active{background:color-mix(in srgb,var(--brand-vivid) 20%,#fff)}
a.btn{margin-top:var(--space-2)}
.btn--primary{background:var(--color-primary);color:var(--color-white)}
.btn--primary:hover{background:var(--color-primary-hover);color:var(--color-white)}
.btn--primary:active{background:var(--color-primary-active)}

.nav{display:flex;flex-wrap:wrap;gap:var(--space-2);margin-bottom:var(--space-3)}
.nav button[aria-current="page"]{background:var(--color-heading);border-color:var(--color-heading);color:var(--color-white);box-shadow:inset 0 -4px 0 var(--brand-pink-medium)}

#chat-icono{position:fixed;right:var(--space-4);bottom:var(--space-4);z-index:var(--z-chat);min-height:3rem;padding:0 var(--space-4);border:2px solid var(--color-white);border-radius:var(--radius-pill);background:var(--color-primary);color:var(--color-white);box-shadow:var(--shadow-lg)}
#chat-icono:hover,#chat-icono:active{background:var(--color-primary-hover);border-color:var(--color-white);color:var(--color-white)}
#chat-icono:focus-visible{outline-color:var(--color-heading)}

/* 6. FORMULARIOS ----------------------------------------------------------- */
input[type=text],input[type=password],select{display:block;width:100%;min-height:var(--touch-min);margin-bottom:var(--space-2);padding:var(--space-2) var(--space-3);border:2px solid var(--color-border-strong);border-radius:var(--radius-md);background:var(--color-white);color:var(--color-text);font:inherit}
input[type=text]:hover,input[type=password]:hover,select:hover{border-color:var(--color-heading)}
::placeholder{color:var(--color-text-muted);opacity:1}
label{display:flex;align-items:center;gap:var(--space-3);min-height:var(--touch-min);cursor:pointer}
input[type=checkbox]{flex:none;width:1.25rem;height:1.25rem;margin:0;accent-color:var(--color-primary)}

/* 7. TARJETAS, ETIQUETAS Y MENSAJES ---------------------------------------- */
.card{margin-bottom:var(--space-3);padding:var(--space-4);border:2px solid var(--color-border);border-radius:var(--radius-lg);background:var(--color-white);box-shadow:var(--shadow-sm);transition:border-color var(--transition-fast),box-shadow var(--transition-fast)}
.card>div{margin-top:var(--space-2)}
.card>p{margin:var(--space-2) 0 0}
.click{cursor:pointer}
.click:hover{border-color:var(--color-primary);box-shadow:var(--shadow-md)}
.item{display:flex;justify-content:space-between;gap:var(--space-3);padding:var(--space-2) 0;border-top:1px solid var(--color-border)}
.item:first-child{border-top:0}
.item b{color:var(--color-heading)}
.mut{color:var(--color-text-muted);font-size:var(--text-sm)}

.estado{display:inline-flex;align-items:center;min-height:1.75rem;padding:0 var(--space-3);border:2px solid;border-radius:var(--radius-pill);font-size:var(--text-sm);font-weight:700}
.estado--abierto{background:var(--color-success-soft);border-color:var(--color-success);color:var(--color-success)}
.estado--cerrado{background:var(--color-bg-alt);border-color:var(--color-border-strong);color:var(--color-text-muted)}
.chip{display:inline-flex;align-items:center;min-height:1.75rem;margin:0 var(--space-1) var(--space-1) 0;padding:0 var(--space-3);border-radius:var(--radius-pill);background:var(--color-primary-soft);color:var(--color-heading);font-size:var(--text-sm);font-weight:700}

#aviso{margin:0 0 var(--space-3)}
#aviso:empty{margin:0}
#aviso:not(:empty){padding:var(--space-3) var(--space-4);border:2px solid var(--color-border);border-left:6px solid var(--color-primary);border-radius:var(--radius-md);background:var(--color-white);color:var(--color-text)}
</style>
</head>
<body>
<div class="layout">
  <div id="mapa-panel" role="region" aria-label="Mapa de negocios"></div>
  <div class="contenido">
    <h1>Mercadopolis</h1>
    <div id="app"></div>

    <footer>
      <h3>Gracias por apoyar a los comerciantes mexicanos</h3>
      <h4>Con el apoyo de todos podemos progresar para un mejor futuro</h4>
    </footer>
  </div>
</div>

<button id="chat-icono" onclick="alert('espuro adorno mamon')">
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
  Chadbot
</button>

<script>
const API='';

const ALCALDIAS=['Álvaro Obregón','Azcapotzalco','Benito Juárez','Coyoacán','Cuajimalpa de Morelos','Cuauhtémoc','Gustavo A. Madero','Iztacalco','Iztapalapa','La Magdalena Contreras','Miguel Hidalgo','Milpa Alta','Tláhuac','Tlalpan','Venustiano Carranza','Xochimilco'];
const CATEGORIAS=['Alimentos','Florería/Plantas','Ropa','Accesorios/Moda','Papelería','Tecnología','Artesanías','Música','Chácharas'];
const PAGOS=['Efectivo','Tarjeta','Transferencia','Mercado Pago','Criptos'];

let NEGOCIOS=[
 {id:1,nombre:'Tacos Mr Uriel',registrado:true,Categoria:'Alimentos',alcaldia:'Cuauhtémoc',tianguis:'Tianguis del Domingo, Av. Reforma',maps:'',pagos:['Efectivo','Criptos'],
  horario:[{dias:[0,6],llegada:'07:00',salida:'15:00'}],
  productos:[{nombre:'Taco de pastor',precio:150},{nombre:'Agua de horchata el Vic',precio:200}]},
 {id:2,nombre:'Frutas y Verduras Don Rocky',registrado:false,Categoria:'Alimentos',alcaldia:'Coyoacán',tianguis:'Tianguis de los Miércoles, Col. Centro',maps:'',pagos:['Efectivo','Tarjeta','Mercado Pago','Organos','Criptos'],
  horario:[{dias:[3,5],llegada:'06:00',salida:'14:00'}],
  productos:[{nombre:'El tripi',precio:22},{nombre:'Aguacate (kg)',precio:65}]}
];

let token=null;
try{token=localStorage.getItem('token')}catch(e){}

async function api(ruta,op={}){
  const r=await fetch(API+ruta,{...op,headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{}),...(op.headers||{})}});
  if(!r.ok){let m='Error '+r.status;try{m=(await r.json()).error||m}catch(e){}throw new Error(m)}
  return r.json();
}
async function cargar(){
  if(!API){render();return}
  try{NEGOCIOS=await api('/negocios')}catch(e){msg='No se pudo conectar con el servidor; se muestran datos de ejemplo.'}
  render();
}

const DIAS=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const CORTO=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>'$'+Number(n).toLocaleString('es-MX');
const min=t=>{const [h,m]=t.split(':');return +h*60+ +m};

function estado(n){
  const hor=n.horario||[],now=new Date(),d=now.getDay(),m=now.getHours()*60+now.getMinutes();
  for(const h of hor)if(h.dias.includes(d)&&min(h.llegada)<=m&&m<min(h.salida))return{open:true,txt:'cierra a las '+h.salida};
  for(let off=0;off<=7;off++){
    const dd=(d+off)%7;let best=null;
    for(const h of hor)if(h.dias.includes(dd)&&(off>0||min(h.llegada)>m)&&(!best||min(h.llegada)<min(best.llegada)))best=h;
    if(best)return{open:false,txt:'abre '+(off===0?'hoy':off===1?'mañana':DIAS[dd])+' a las '+best.llegada};
  }
  return{open:false,txt:'sin horario'};
}
const badge=n=>{const e=estado(n);return `<span class="estado ${e.open?'estado--abierto':'estado--cerrado'}">${e.open?'ABIERTO':'CERRADO'}</span> <span class="mut">(${e.txt})</span>`};
const info=n=>`<div class="mut">${esc(n.Categoria)} · ${esc(n.alcaldia)} · ${n.registrado?'Registrado':'Sin registrar'}</div>`;
const mapsUrl=n=>/^https?:\/\//i.test(n.maps||'')?n.maps:'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(n.tianguis||'');
const pagos=n=>(n.pagos||[]).map(p=>`<span class="chip">${esc(p)}</span>`).join('')||'<span class="mut">No especificado</span>';
const opts=(lista,val,ph)=>`<option value="">${ph}</option>`+lista.map(x=>`<option value="${esc(x)}" ${x===val?'selected':''}>${esc(x)}</option>`).join('');
const val=id=>((document.getElementById(id)||{}).value||'').trim();

let vista='lista',sel=null,q='',solo=false,cat='',alc='',authReg=false,mio,msg='',mapaHtml='';
const app=document.getElementById('app');
const aviso=t=>{const a=document.getElementById('aviso');if(a)a.textContent=t};

function nav(){
  return `<div class="nav"><button onclick="ir('lista')" ${vista==='lista'?'aria-current="page"':''}>Negocios</button>
  <button onclick="ir(token?'mio':'auth')" ${vista!=='lista'?'aria-current="page"':''}>${token?'Mi negocio':'Soy vendedor'}</button>
  ${token?'<button onclick="salir()">Salir</button>':''}</div><p id="aviso" class="mut" role="status">${esc(msg)}</p>`;
}
function ir(v){vista=v;sel=null;msg='';if(v==='mio')cargarMio();else render()}
function salir(){token=null;try{localStorage.removeItem('token')}catch(e){}ir('lista')}

function filtrados(){
  const t=q.trim().toLowerCase();
  return NEGOCIOS.map((n,i)=>[n,i]).filter(([n])=>
    (!t||(n.nombre+' '+n.tianguis).toLowerCase().includes(t))&&
    (!solo||estado(n).open)&&
    (!cat||n.Categoria===cat)&&
    (!alc||n.alcaldia===alc));
}
function lista(){
  return filtrados().map(([n,i])=>`<div class="card click" role="button" tabindex="0" onclick="sel=${i};render()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();sel=${i};render()}"><h3>${esc(n.nombre)}</h3>
    ${info(n)}<div>${badge(n)}</div><div class="mut">Tianguis: ${esc(n.tianguis)}</div><div style="margin-top:6px">${pagos(n)}</div></div>`).join('')||'<p class="mut">No hay negocios con ese filtro.</p>';
}
function mapaNuevo(){
  const ph=t=>`<p class="mut" style="padding:12px;text-align:center">${t}</p>`;
  if(!API)return ph('Aquí va el pinche mapa culeros.');
  let ruta;
  if(vista==='lista'&&sel!==null&&NEGOCIOS[sel]&&NEGOCIOS[sel].id!=null)ruta='/negocios/'+encodeURIComponent(NEGOCIOS[sel].id)+'/mapa';
  else{
    const base=vista==='lista'?filtrados():NEGOCIOS.map((n,i)=>[n,i]);
    const ids=base.map(([n])=>n.id).filter(x=>x!=null);
    if(!ids.length)return ph('No hay negocios para mostrar en el mapa.');
    ruta='/mapa?ids='+ids.map(encodeURIComponent).join(',');
  }
  return `<img alt="Mapa de negocios" src="${esc(API+ruta)}" onerror="this.replaceWith(document.createTextNode('No se pudo cargar el mapa.'))">`;
}
function actMapa(){const h=mapaNuevo();if(h===mapaHtml)return;mapaHtml=h;document.getElementById('mapa-panel').innerHTML=h}
function act(){document.getElementById('lista').innerHTML=lista();actMapa()}
function vLista(){
  return `<input type="text" id="q" placeholder="Buscar negocio o tianguis" aria-label="Buscar negocio o tianguis" value="${esc(q)}">
  <select id="cat" aria-label="Categoría comercial">${opts(CATEGORIAS,cat,'Todas las categorías')}</select>
  <select id="alc" aria-label="Alcaldía">${opts(ALCALDIAS,alc,'Todas las alcaldías')}</select>
  <label><input type="checkbox" id="solo" ${solo?'checked':''}> Solo abiertos ahora</label>
  <div id="lista">${lista()}</div>`;
}
function bindLista(){
  document.getElementById('cat').onchange=e=>{cat=e.target.value;act()};
  document.getElementById('alc').onchange=e=>{alc=e.target.value;act()};
  document.getElementById('q').oninput=e=>{q=e.target.value;act()};
  document.getElementById('solo').onchange=e=>{solo=e.target.checked;act()};
}

function vDetalle(n){
  return `<button onclick="sel=null;render()">Volver</button>
  <div class="card" style="margin-top:10px"><h3>${esc(n.nombre)}</h3>${info(n)}<div>${badge(n)}</div>
    <p>Tianguis: <b>${esc(n.tianguis)}</b></p>
    <a class="btn" href="${esc(mapsUrl(n))}" target="_blank" rel="noopener">Ver en Google Maps</a></div>
  <div class="card"><h2>Horario</h2>${(n.horario||[]).map(h=>`<div class="item"><span>${h.dias.map(d=>CORTO[d]).join(', ')}</span><span>${esc(h.llegada)} a ${esc(h.salida)}</span></div>`).join('')||'<span class="mut">Sin horario</span>'}</div>
  <div class="card"><h2>Productos</h2>${(n.productos||[]).map(p=>`<div class="item"><span>${esc(p.nombre)}</span><b>${money(p.precio)}</b></div>`).join('')||'<span class="mut">Sin productos</span>'}</div>
  <div class="card"><h2>Formas de pago</h2>${pagos(n)}</div>`;
}

function vAuth(){
  return `<div class="card"><h2>${authReg?'Crear cuenta de vendedor':'Entrar como vendedor'}</h2>
  ${authReg?'<input type="text" id="a_nom" placeholder="Nombre del negocio" aria-label="Nombre del negocio">':''}
  <input type="text" id="a_mail" placeholder="Correo" aria-label="Correo" autocomplete="email">
  <input type="password" id="a_pass" placeholder="Contraseña (mínimo 8 caracteres)" aria-label="Contraseña (mínimo 8 caracteres)" autocomplete="${authReg?'new-password':'current-password'}">
  <button class="btn btn--primary" onclick="enviarAuth()">${authReg?'Registrarme':'Entrar'}</button>
  <button onclick="authReg=!authReg;render()">${authReg?'Ya tengo cuenta':'No tengo cuenta'}</button></div>`;
}
async function enviarAuth(){
  if(!API){aviso('Configura la constante API para usar cuentas.');return}
  const body=authReg?{correo:val('a_mail'),password:document.getElementById('a_pass').value,nombre:val('a_nom')}
                    :{correo:val('a_mail'),password:document.getElementById('a_pass').value};
  try{
    const r=await api(authReg?'/auth/registro':'/auth/login',{method:'POST',body:JSON.stringify(body)});
    token=r.token;try{localStorage.setItem('token',token)}catch(e){}
    ir('mio');
  }catch(e){aviso(e.message)}
}

async function cargarMio(){
  mio=undefined;render();
  if(!API){mio={};render();return}
  try{mio=await api('/negocios/mio')}catch(e){mio={}}
  render();
}
function vMio(){
  const m=mio||{};
  return `<div class="card"><h2>Mi negocio</h2>
  <input type="text" id="m_nombre" placeholder="Nombre del negocio" aria-label="Nombre del negocio" value="${esc(m.nombre)}">
  <select id="m_cat" aria-label="Categoría">${opts(CATEGORIAS,m.Categoria,'Categoría')}</select>
  <select id="m_alc" aria-label="Alcaldía">${opts(ALCALDIAS,m.alcaldia,'Alcaldía')}</select>
  <input type="text" id="m_tian" placeholder="Tianguis y dirección" aria-label="Tianguis y dirección" value="${esc(m.tianguis)}">
  <input type="text" id="m_maps" placeholder="Link de Google Maps (opcional)" aria-label="Link de Google Maps (opcional)" value="${esc(m.maps)}">
  <div>${PAGOS.map(p=>`<label><input type="checkbox" class="m_pago" value="${p}" ${(m.pagos||[]).includes(p)?'checked':''}> ${p}</label>`).join('')}</div>
  <button class="btn btn--primary" onclick="guardarMio()">Guardar</button></div>`;
}
async function guardarMio(){
  const body={nombre:val('m_nombre'),Categoria:val('m_cat'),alcaldia:val('m_alc'),tianguis:val('m_tian'),maps:val('m_maps'),
    pagos:[...document.querySelectorAll('.m_pago:checked')].map(x=>x.value)};
  if(!body.nombre){aviso('Pon el nombre del negocio.');return}
  if(!API){aviso('Configura la constante API para guardar.');return}
  try{
    mio=await api('/negocios/mio',{method:'PUT',body:JSON.stringify(body)});
    NEGOCIOS=await api('/negocios');
    aviso('Guardado.');
  }catch(e){aviso(e.message)}
}

function render(){
  if(sel!==null&&!NEGOCIOS[sel])sel=null;
  let html=nav(),bind=()=>{};
  if(vista==='auth')html+=vAuth();
  else if(vista==='mio')html+=mio===undefined?'<p class="mut">Cargando...</p>':vMio();
  else if(sel!==null)html+=vDetalle(NEGOCIOS[sel]);
  else{html+=vLista();bind=bindLista}
  app.innerHTML=html;bind();actMapa();
}
cargar();
</script>
</body>
</html>

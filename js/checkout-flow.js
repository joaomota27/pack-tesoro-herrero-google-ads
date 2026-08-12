(() => {
  const professionalCheckout = 'https://pay.hotmart.com/V107124548Y?off=5a4fv5en&checkoutMode=10';
  const basicCheckout = 'https://pay.hotmart.com/H106059168P?off=jicr4c7c&checkoutMode=10';
  const standardProfessionalCheckout = 'https://pay.hotmart.com/V107124548Y?off=i32j0u8c&checkoutMode=10';

  const style = document.createElement('style');
  style.textContent = `
    #checkout-upsell-modal { position:fixed; inset:0; z-index:9999; display:grid; place-items:center; padding:16px; font-family:Arial,sans-serif; }
    .checkout-upsell-backdrop { position:absolute; inset:0; background:rgba(0,0,0,.78); backdrop-filter:blur(3px); }
    .checkout-upsell-card { position:relative; z-index:1; width:min(100%,430px); max-height:calc(100vh - 32px); overflow:auto; box-sizing:border-box; padding:20px; border:2px solid #f59e0b; border-radius:16px; background:#141c28; color:#fff; box-shadow:0 0 60px -10px rgba(245,158,11,.6); text-align:center; }
    .checkout-upsell-card h3 { margin:0; font-size:21px; line-height:1.2; }
    .checkout-upsell-card img { width:auto; height:130px; max-width:100%; object-fit:contain; margin:10px auto 4px; display:block; }
    .checkout-upsell-card p { margin:8px 0; font-size:13px; line-height:1.4; color:#e5e7eb; }
    .checkout-upsell-card strong, .checkout-upsell-price b { color:#f59e0b; }
    .checkout-upsell-price { padding:12px; margin:12px 0; border:1px solid rgba(245,158,11,.3); border-radius:12px; background:rgba(0,0,0,.4); }
    .checkout-upsell-price small { display:block; color:#aeb4be; font-size:11px; }
    .checkout-upsell-price b { display:block; font-size:38px; line-height:1.1; margin:3px 0; }
    .checkout-upsell-price b span { font-size:19px; }
    .checkout-upsell-card ul { margin:12px 0; padding:0; list-style:none; text-align:left; font-size:12px; line-height:1.55; }
    .checkout-upsell-card li::before { content:'✓'; color:#f59e0b; font-weight:bold; margin-right:8px; }
    .checkout-upsell-card button { width:100%; border-radius:7px; padding:13px 12px; border:0; font-weight:800; text-transform:uppercase; cursor:pointer; }
    .checkout-upsell-professional { background:#f59e0b; color:#111; }
    .checkout-upsell-basic { margin-top:8px; color:#e5e7eb; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.25) !important; font-size:11px; }
    .checkout-upsell-close { position:absolute; right:8px; top:6px; width:auto !important; padding:2px 8px !important; background:transparent; color:#aeb4be; font-size:24px; line-height:1; }
  `;
  document.head.appendChild(style);

  const goTo = (url) => { window.location.assign(url); };

  function createUpsellModal() {
    const overlay = document.createElement('div');
    overlay.id = 'checkout-upsell-modal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'checkout-upsell-title');
    overlay.innerHTML = `
      <div class="checkout-upsell-backdrop"></div>
      <div class="checkout-upsell-card">
        <button class="checkout-upsell-close" type="button" aria-label="Cerrar">×</button>
        <h3 id="checkout-upsell-title">¡ESPERA! No cierres todavía…</h3>
        <img src="images/pack-hero-560-Ds-o04m7.webp" alt="Pack Tesoro del Herrero - Kit Profesional">
        <p>Suma <strong>+1.000 proyectos extras</strong> y los <strong>4 bonos exclusivos</strong> al Kit Profesional.</p>
        <div class="checkout-upsell-price">
          <small>Valor real <s>US$97</s> · Hoy, solo por esta página</small>
          <b><span>US$</span>3.49</b>
          <small>Menos que un almuerzo · Acceso de por vida</small>
        </div>
        <ul>
          <li>+1.000 proyectos extras (total +4.000)</li>
          <li>BONO 1: Planilla automática de precios</li>
          <li>BONO 2: Lista de proveedores confiables</li>
          <li>BONO 3: Guía: cuánto cobrar sin perder dinero</li>
          <li>BONO 4: Proyectos más solicitados en ciudades pequeñas</li>
          <li>Acceso digital de por vida</li>
        </ul>
        <button type="button" class="checkout-upsell-professional">¡SÍ! QUIERO EL PACK COMPLETO</button>
        <button type="button" class="checkout-upsell-basic">No, continuar solo con el Kit Básico</button>
      </div>`;

    const close = () => overlay.remove();
    overlay.querySelector('.checkout-upsell-close').addEventListener('click', close);
    overlay.querySelector('.checkout-upsell-backdrop').addEventListener('click', close);
    overlay.querySelector('.checkout-upsell-professional').addEventListener('click', () => goTo(professionalCheckout));
    overlay.querySelector('.checkout-upsell-basic').addEventListener('click', () => goTo(basicCheckout));
    return overlay;
  }

  function openUpsell() {
    if (!document.getElementById('checkout-upsell-modal')) {
      document.body.appendChild(createUpsellModal());
    }
  }

  function setCheckout(selector, url) {
    document.querySelectorAll(selector).forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        goTo(url);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button, a').forEach((element) => {
      const label = element.textContent.trim();
      if (label === 'QUIERO ESTE PACK AHORA') {
        element.addEventListener('click', (event) => { event.preventDefault(); openUpsell(); });
      }
      if (label === 'OBTENER ACCESO AHORA' || label === 'VER EL PAQUETE COMPLETO' || label === 'ACCEDER AL PACK COMPLETO') {
        element.addEventListener('click', (event) => { event.preventDefault(); goTo(standardProfessionalCheckout); });
      }
    });
  });
})();

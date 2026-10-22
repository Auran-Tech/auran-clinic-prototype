(() => {
  const healthUrl = new URLSearchParams(location.search).get('healthUrl');
  const root = document.getElementById('root');
  const cover = document.createElement('div');
  cover.className = 'auran-connection-cover';
  cover.hidden = true;
  cover.setAttribute('role', 'alertdialog');
  cover.setAttribute('aria-modal', 'true');
  cover.setAttribute('aria-labelledby', 'auran-connection-title');
  cover.setAttribute('aria-describedby', 'auran-connection-body');
  document.body.append(cover);

  const copy = {
    en: {
      checking: ['Preparing your clinic workspace', 'Connecting services and opening Auran Clinic.'],
      retrying: ['Connection interrupted', 'We are checking the clinic service again. Your current page stays open.'],
      disconnected: ['Cannot reach the clinic service', 'Check your connection or ask your administrator whether the service is running. Unsaved changes have not been sent.'],
      banner: seconds => `Retrying Connection (${seconds}s)`,
      disconnectedBanner: 'Disconnected', retry: 'Try connecting now', footnote: 'We will also check again automatically.'
    },
    ar: {
      checking: ['جارٍ تجهيز مساحة عمل العيادة', 'نتصل بالخدمات ونفتح نظام أوران للعيادات.'],
      retrying: ['انقطع الاتصال', 'نعيد التحقق من خدمة العيادة. ستبقى الصفحة الحالية مفتوحة.'],
      disconnected: ['تعذر الوصول إلى خدمة العيادة', 'تحقق من الاتصال أو اسأل المسؤول عن حالة الخدمة. لم تُرسل التغييرات غير المحفوظة.'],
      banner: seconds => `إعادة محاولة الاتصال (${seconds}ث)`,
      disconnectedBanner: 'غير متصل', retry: 'المحاولة الآن', footnote: 'سنتحقق من الاتصال تلقائياً أيضاً.'
    }
  };
  const icon = '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 0 0-14-5L4 8m0-5v5h5M4 13a8 8 0 0 0 14 5l2-2m0 5v-5h-5"/></svg>';
  let phase = 'connected';
  let seconds = 0;
  let failures = 0;
  let timer;
  let inFlight = false;
  let generation = 0;
  let preview = false;

  function clearTimer() { clearTimeout(timer); timer = undefined; }
  function show(next, remaining = 0) {
    phase = next;
    seconds = remaining;
    cover.hidden = next === 'connected';
    cover.className = `auran-connection-cover is-${next}`;
    cover.setAttribute('role', next === 'disconnected' ? 'alertdialog' : 'status');
    if (next === 'disconnected') cover.setAttribute('aria-modal', 'true');
    else cover.removeAttribute('aria-modal');
    if (next === 'retrying') cover.removeAttribute('aria-labelledby');
    else cover.setAttribute('aria-labelledby', 'auran-connection-title');
    if (root) root.inert = next !== 'connected';
    if (next === 'connected') return;
    const c = copy[document.documentElement.lang === 'en' ? 'en' : 'ar'];
    const [title, body] = c[next];
    if (next === 'checking') {
      cover.innerHTML = '<div class="auran-connection-startup"><div class="auran-connection-startup-mark" aria-hidden="true">A</div><p class="auran-connection-startup-brand">AURAN CLINIC</p><h1 id="auran-connection-title"></h1><p id="auran-connection-body"></p><div class="auran-connection-progress" aria-hidden="true"><span></span></div></div>';
      cover.querySelector('h1').textContent = title;
      cover.querySelector('#auran-connection-body').textContent = body;
      return;
    }
    if (next === 'retrying') {
      cover.innerHTML = `<div class="auran-connection-retry-state"><div class="auran-connection-banner" role="status">${icon}<span></span></div><p id="auran-connection-body"></p></div>`;
      cover.querySelector('.auran-connection-banner span').textContent = c.banner(seconds);
      cover.querySelector('#auran-connection-body').textContent = body;
      cover.querySelector('svg').classList.add('is-spinning');
      return;
    }
    cover.innerHTML = `<section class="auran-connection-card"><div class="auran-connection-banner ${next === 'disconnected' ? 'is-disconnected' : ''}" role="status">${icon}<span>${next === 'retrying' ? c.banner(seconds) : next === 'disconnected' ? c.disconnectedBanner : title}</span></div><div class="auran-connection-mark" aria-hidden="true">A</div><p class="auran-connection-eyebrow">AURAN CLINIC</p><h1 id="auran-connection-title"></h1><p class="auran-connection-body" id="auran-connection-body"></p>${next === 'disconnected' ? '<button class="auran-connection-retry" type="button"></button><p class="auran-connection-footnote"></p>' : ''}</section>`;
    cover.querySelector('h1').textContent = title;
    cover.querySelector('.auran-connection-body').textContent = body;
    const svg = cover.querySelector('svg');
    if (next !== 'disconnected') svg.classList.add('is-spinning');
    if (next === 'disconnected') {
      const button = cover.querySelector('button');
      button.textContent = c.retry;
      button.addEventListener('click', retryNow);
      cover.querySelector('.auran-connection-footnote').textContent = c.footnote;
    }
  }
  function poll() { clearTimer(); if (healthUrl) timer = setTimeout(check, 15000); }
  function retryCountdown() {
    show('retrying', 3);
    function tick() {
      if (phase !== 'retrying') return;
      if (seconds <= 1) { check(); return; }
      show('retrying', seconds - 1);
      timer = setTimeout(tick, 1000);
    }
    timer = setTimeout(tick, 1000);
  }
  async function check() {
    if (inFlight) return;
    clearTimer();
    inFlight = true;
    const current = ++generation;
    let ready = false;
    if (preview) {
      // Preview exercises the visible states without a backend.
      ready = false;
    } else if (healthUrl) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      try { ready = (await fetch(healthUrl, { cache: 'no-store', signal: controller.signal })).ok; }
      catch { ready = false; }
      finally { clearTimeout(timeout); }
    }
    if (current !== generation) return;
    inFlight = false;
    if (ready) { failures = 0; show('connected'); poll(); }
    else if (phase === 'disconnected') poll();
    else if (failures++ < 3) retryCountdown();
    else { show('disconnected'); poll(); }
  }
  function retryNow() {
    if (inFlight) return;
    clearTimer();
    failures = 0;
    if (preview) {
      preview = false;
      show('checking');
      if (healthUrl) check();
      else timer = setTimeout(() => show('connected'), 650);
    }
    else { show('checking'); check(); }
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-connection-preview]');
    if (!button) return;
    preview = true;
    generation++;
    inFlight = false;
    clearTimer();
    failures = 0;
    if (button.dataset.connectionPreview === 'disconnected') show('disconnected');
    else if (button.dataset.connectionPreview === 'loading') { show('checking'); timer = setTimeout(() => show('connected'), 1800); }
    else retryCountdown();
  });
  new MutationObserver(() => { if (phase !== 'connected') show(phase, seconds); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  if (healthUrl) {
    show('checking');
    check();
    window.addEventListener('online', retryNow);
    window.addEventListener('offline', () => { if (phase === 'connected') check(); });
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') retryNow(); });
  }
})();

// Mobile menu toggle — wires up the ☰ button to slide-open the .nav drawer
// on small screens. Shared across sve stranice — uključuje se na dnu svake
// HTML stranice preko <script src="...nav-mobile.js"></script>.
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var btn = document.querySelector('.menu-btn');
    var nav = document.querySelector('.nav');
    if (!btn || !nav) return;

    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', nav.id || 'site-nav');

    function close() {
      if (!document.body.classList.contains('menu-open')) return;
      document.body.classList.remove('menu-open');
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = document.body.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close on outside click (anywhere not inside nav ili menu button)
    document.addEventListener('click', function (e) {
      if (!document.body.classList.contains('menu-open')) return;
      if (nav.contains(e.target) || btn.contains(e.target)) return;
      close();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    // Close on resize past mobile breakpoint (sprječava "stuck open" stanje)
    var BP = 860;
    window.addEventListener('resize', function () {
      if (window.innerWidth > BP) close();
    });
  });
})();

(function(){
  "use strict";
  document.documentElement.classList.add('js-anim');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Header compact on scroll ---- */
  var header = document.getElementById('site-header');
  var lastY = 0;
  function onScroll(){
    var y = window.scrollY || 0;
    if(header) header.classList.toggle('is-compact', y > 40);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---- Mobile menu ---- */
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  function closeMenu(){
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden','true');
    menuToggle.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }
  function openMenu(){
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden','false');
    menuToggle.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
    var first = mobileMenu.querySelector('a');
    if(first) first.focus();
  }
  if(menuToggle && mobileMenu) menuToggle.addEventListener('click', function(){
    var expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    if(expanded){ closeMenu(); } else { openMenu(); }
  });
  if(mobileMenu) mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')){
      closeMenu();
      menuToggle.focus();
    }
  });

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -60px 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq__q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.classList.toggle('is-open', !isOpen);
    });
  });

  /* ---- Diagnostic quiz ---- */
  var questions = [
    {
      q: "עד כמה אתם מרוצים מהכיוון המקצועי שלכם כרגע?",
      opts: [
        {t:"מרוצה מאוד, רק רוצה לדייק פרטים", cat:null},
        {t:"בסך הכל בסדר, אבל משהו מרגיש לא שלם", cat:"focus"},
        {t:"לא ממש — יש לי כמה כיוונים אפשריים ולא ברור מה נכון", cat:"decision"},
        {t:"לא מרוצה, ומרגיש תקוע באותו מקום", cat:"action"}
      ]
    },
    {
      q: "מה הדבר שהכי חסר לכם כרגע?",
      opts: [
        {t:"בעיקר זמן פנוי", cat:null},
        {t:"בהירות לגבי הכיוון הנכון בשבילי", cat:"focus"},
        {t:"ביטחון להחליט בין האפשרויות שיש לי", cat:"decision"},
        {t:"התחלה בפועל — אני יודע מה, אבל לא זז", cat:"action"}
      ]
    },
    {
      q: "אם הייתם יכולים לשנות דבר אחד בקריירה שלכם, מה זה היה?",
      opts: [
        {t:"כלום, אני מרוצה מהמצב הנוכחי", cat:null},
        {t:"לדעת בדיוק לאן אני שואף להגיע", cat:"focus"},
        {t:"להפסיק להתלבט בין כמה אפשרויות שונות", cat:"decision"},
        {t:"סוף סוף לעשות את הצעד שדחיתי הרבה זמן", cat:"action"}
      ]
    },
    {
      q: "מה מונע מכם לבצע את השינוי?",
      opts: [
        {t:"כרגע אין באמת שינוי שאני צריך", cat:null},
        {t:"לא ברור לי מה בכלל השינוי הנכון", cat:"focus"},
        {t:"פחד לבחור לא נכון ולהתחרט", cat:"decision"},
        {t:"אני לא יודע מאיפה בכלל להתחיל", cat:"action"}
      ]
    },
    {
      q: "עד כמה ברור לכם מה הצעד הבא שלכם?",
      opts: [
        {t:"ברור לגמרי, ואני כבר בתנועה", cat:null},
        {t:"יש כיוון כללי, אבל לא מדויק", cat:"focus"},
        {t:"יש כמה אופציות ולא ברור מה עדיף", cat:"decision"},
        {t:"לא ברור לי בכלל", cat:"action"}
      ]
    }
  ];

  var results = {
    focus: {
      title: "האתגר המרכזי שלכם: חוסר מיקוד",
      body: "מהתשובות שלכם נראה שהבעיה אינה חוסר מוטיבציה או חוסר יכולת — אלא קושי להפוך רצונות מעורפלים לכיוון אחד ברור. זה בדיוק המקום שבו תהליך ממוקד עוזר לדייק את התמונה."
    },
    decision: {
      title: "האתגר המרכזי שלכם: קושי בקבלת החלטה",
      body: "נראה שיש לכם כמה אפשרויות טובות על השולחן, אבל קשה לדעת על מה לוותר ולמה. מבט חיצוני ומובנה יכול לעזור לכם להכריע בביטחון, בלי לנחש."
    },
    action: {
      title: "האתגר המרכזי שלכם: קושי לצאת לפעולה",
      body: "התמונה אצלכם די ברורה ברמת המחשבה — אבל היא נשארת שם. השאלה המרכזית היא איך הופכים אותה לצעדים קונקרטיים, עם ליווי שמייצר גם התקדמות וגם אחריות."
    },
    none: {
      title: "נראה שאתם במקום טוב יחסית",
      body: "אין אצלכם משבר כיוון דרמטי כרגע. עדיין, לפעמים גם מי שבמקום טוב יכול להרוויח מאוד ממבט חיצוני ממוקד שמדייק את הצעד הבא."
    }
  };

  var diagState = { index:0, answers:[] };
  var qEl = document.getElementById('diag-question');
  var optsEl = document.getElementById('diag-options');
  var stepLabel = document.getElementById('diag-step-label');
  var progressEl = document.getElementById('diag-progress');
  var progressWrap = document.getElementById('diag-progress-wrap');
  var backBtn = document.getElementById('diag-back');
  var quizWrap = document.getElementById('diag-quiz');
  var resultWrap = document.getElementById('diag-result');
  var resultTitle = document.getElementById('diag-result-title');
  var resultBody = document.getElementById('diag-result-body');
  var restartBtn = document.getElementById('diag-restart');
  var infoBtn = document.getElementById('diag-info-btn');
  var infoBox = document.getElementById('diag-info');

  function renderQuestion(){
    var i = diagState.index;
    var item = questions[i];
    qEl.textContent = item.q;
    stepLabel.textContent = "שאלה " + (i+1) + " מתוך " + questions.length;
    var pct = Math.round(((i)/questions.length)*100 + (100/questions.length)*0.2);
    progressEl.style.width = Math.round(((i)/questions.length)*100 + 6) + "%";
    progressWrap.setAttribute('aria-valuenow', String(Math.round((i/questions.length)*100)));
    backBtn.classList.toggle('is-visible', i > 0);

    optsEl.innerHTML = '';
    var letters = ['א','ב','ג','ד'];
    item.opts.forEach(function(opt, idx){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'diagnostic__option';
      b.innerHTML = '<span class="diagnostic__option-letter">' + letters[idx] + '</span><span>' + opt.t + '</span>';
      b.addEventListener('click', function(){
        b.classList.add('is-selected');
        window.setTimeout(function(){ selectAnswer(opt.cat); }, reduceMotion ? 0 : 160);
      });
      optsEl.appendChild(b);
    });
  }

  function selectAnswer(cat){
    diagState.answers[diagState.index] = cat;
    if(diagState.index < questions.length - 1){
      diagState.index++;
      renderQuestion();
    } else {
      showResult();
    }
  }

  function showResult(){
    var scores = {focus:0, decision:0, action:0};
    diagState.answers.forEach(function(cat){ if(cat) scores[cat]++; });
    var top = 'none', topScore = 0;
    Object.keys(scores).forEach(function(k){
      if(scores[k] > topScore){ topScore = scores[k]; top = k; }
    });
    var r = results[top];
    resultTitle.textContent = r.title;
    resultBody.textContent = r.body;
    quizWrap.style.display = 'none';
    resultWrap.classList.add('is-active');
    resultWrap.hidden = false;
    resultWrap.setAttribute('tabindex','-1');
    resultWrap.focus();
  }

  if(qEl && optsEl && resultWrap){
    backBtn.addEventListener('click', function(){
    if(diagState.index > 0){
      diagState.index--;
      renderQuestion();
    }
    });

    restartBtn.addEventListener('click', function(){
    diagState = { index:0, answers:[] };
    resultWrap.classList.remove('is-active');
    resultWrap.hidden = true;
    quizWrap.style.display = '';
    renderQuestion();
    });

    infoBtn.addEventListener('click', function(){
    var expanded = infoBtn.getAttribute('aria-expanded') === 'true';
    infoBtn.setAttribute('aria-expanded', String(!expanded));
    infoBox.hidden = expanded;
    });

    renderQuestion();
  }

  /* ---- Contact form ---- */
  var form = document.getElementById('contact-form');
  var formWrap = document.getElementById('contact-form-wrap');
  var success = document.getElementById('contact-success');

  function validateField(input, errEl, message){
    var valid = input.checkValidity();
    input.setAttribute('data-touched','true');
    if(errEl) errEl.textContent = valid ? '' : message;
    return valid;
  }

  if(form && formWrap && success) form.addEventListener('submit', function(e){
    e.preventDefault();
    var nameOk = validateField(document.getElementById('f-name'), document.getElementById('err-name'), 'נא למלא שם מלא');
    var phoneInput = document.getElementById('f-phone');
    var phoneOk = !phoneInput.value.trim() || validateField(phoneInput, document.getElementById('err-phone'), 'נא למלא מספר טלפון תקין');
    var emailOk = validateField(document.getElementById('f-email'), document.getElementById('err-email'), 'נא למלא כתובת אימייל תקינה');
    var msgOk = validateField(document.getElementById('f-message'), document.getElementById('err-message'), 'נא לכתוב כמה מילים');

    if(nameOk && phoneOk && emailOk && msgOk){
      formWrap.classList.add('is-sent');
      success.classList.add('is-active');
      success.focus();
    } else {
      var firstInvalid = form.querySelector(':invalid');
      if(firstInvalid) firstInvalid.focus();
    }
  });

})();

/**
 * Gradiq-Ova | Consulting Blog 2026
 * Full Native JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. МОБИЛЬНОЕ МЕНЮ ---
  const burger = document.getElementById('burger');
  const closeMenu = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuBackdrop = document.getElementById('menu-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMenu = (state) => {
      if (state === 'open') {
          mobileMenu.classList.add('mobile-menu--active');
          document.body.style.overflow = 'hidden'; // Блокируем скролл
      } else {
          mobileMenu.classList.remove('mobile-menu--active');
          document.body.style.overflow = ''; // Возвращаем скролл
      }
  };

  if (burger) burger.addEventListener('click', () => toggleMenu('open'));
  if (closeMenu) closeMenu.addEventListener('click', () => toggleMenu('close'));
  if (menuBackdrop) menuBackdrop.addEventListener('click', () => toggleMenu('close'));

  // Закрытие при клике на ссылку в меню
  mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu('close'));
  });


  // --- 2. ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href === '#') return;

          e.preventDefault();
          const target = document.querySelector(href);

          if (target) {
              const headerOffset = 80;
              const elementPosition = target.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });


  // --- 3. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ (Intersection Observer) ---
  const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              // После активации анимации прекращаем наблюдение за элементом
              revealObserver.unobserve(entry.target);
          }
      });
  }, revealOptions);

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  // --- 4. ИНТЕРАКТИВНЫЕ КАРТОЧКИ ИННОВАЦИЙ (Glow Effect) ---
  const innovationCards = document.querySelectorAll('.innovation-card');

  innovationCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
          const y = ((e.clientY - rect.top) / card.clientHeight) * 100;

          card.style.setProperty('--x', `${x}%`);
          card.style.setProperty('--y', `${y}%`);
      });
  });


  // --- 5. КОНТАКТНАЯ ФОРМА: ВАЛИДАЦИЯ И КАПЧА ---
  const contactForm = document.getElementById('main-form');
  const phoneInput = document.getElementById('phone');
  const captchaQuestion = document.getElementById('captcha-question');
  const successMessage = document.getElementById('success-message');

  // Ограничение ввода в телефон: только цифры
  if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/\D/g, '');
      });
  }

  // Генерация простой математической капчи
  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;
  let correctCaptchaSum = num1 + num2;

  if (captchaQuestion) {
      captchaQuestion.innerText = `${num1} + ${num2}`;
  }

  // Обработка отправки формы
  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();

          const userCaptchaAnswer = document.getElementById('captcha-input').value;

          // Валидация капчи
          if (parseInt(userCaptchaAnswer) !== correctCaptchaSum) {
              alert('Ошибка: Неверный результат капчи. Пожалуйста, попробуйте снова.');
              return;
          }

          // Имитация отправки данных (AJAX)
          const submitBtn = contactForm.querySelector('button[type="submit"]');
          submitBtn.innerText = 'Отправка...';
          submitBtn.disabled = true;

          setTimeout(() => {
              contactForm.style.display = 'none';
              if (successMessage) {
                  successMessage.style.display = 'block';
                  successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              console.log('Form submitted successfully to support@gradiq-ova.blog');
          }, 1500);
      });
  }


  // --- 6. COOKIE POPUP (Local Storage) ---
  const cookiePopup = document.getElementById('cookie-popup');
  const acceptCookiesBtn = document.getElementById('accept-cookies');

  if (cookiePopup) {
      const isAccepted = localStorage.getItem('cookiesAccepted');

      if (!isAccepted) {
          // Показываем плавно через 2.5 секунды
          setTimeout(() => {
              cookiePopup.classList.add('cookie-popup--active');
          }, 2500);
      }

      if (acceptCookiesBtn) {
          acceptCookiesBtn.addEventListener('click', () => {
              localStorage.setItem('cookiesAccepted', 'true');
              cookiePopup.classList.remove('cookie-popup--active');
          });
      }
  }


  // --- 7. ПАРАЛЛАКС ЭФФЕКТ ДЛЯ HERO (Ненавязчивый) ---
  window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroImg = document.querySelector('.hero__img');
      if (heroImg) {
          heroImg.style.transform = `translateY(${scrolled * 0.1}px)`;
      }
  });

});
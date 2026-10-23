/* ============================================================
   TradeTech — клиентский JS
   ============================================================ */

(function () {
    'use strict';

    /* ---------- Бургер-меню (для мобильных экранов) ---------- */
    var burger = document.getElementById('burger');
    var nav = document.getElementById('nav');

    if (burger && nav) {
        burger.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('is-open');
            burger.classList.toggle('is-open', isOpen);
            burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Закрываем меню при клике по ссылке
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('is-open');
                burger.classList.remove('is-open');
                burger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- Валидация формы заявки ---------- */
    var form = document.getElementById('demoForm');
    if (form) {
        var successEl = document.getElementById('formSuccess');

        function setError(input, message) {
            input.classList.add('is-invalid');
            var errorEl = form.querySelector('[data-for="' + input.name + '"]');
            if (errorEl) errorEl.textContent = message;
        }

        function clearError(input) {
            input.classList.remove('is-invalid');
            var errorEl = form.querySelector('[data-for="' + input.name + '"]');
            if (errorEl) errorEl.textContent = '';
        }

        // Очистка ошибки при вводе
        form.querySelectorAll('.form__input').forEach(function (input) {
            input.addEventListener('input', function () {
                clearError(input);
            });
        });

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            var name = form.elements['name'];
            var email = form.elements['email'];
            var phone = form.elements['phone'];

            var valid = true;

            // Имя
            if (!name.value.trim()) {
                setError(name, 'Пожалуйста, укажите имя');
                valid = false;
            } else if (name.value.trim().length < 2) {
                setError(name, 'Имя слишком короткое');
                valid = false;
            }

            // Email
            var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                setError(email, 'Пожалуйста, укажите email');
                valid = false;
            } else if (!emailRe.test(email.value.trim())) {
                setError(email, 'Введите корректный email');
                valid = false;
            }

            // Телефон — допускаем цифры, плюс, скобки, пробелы и дефисы
            var phoneDigits = phone.value.replace(/\D/g, '');
            if (!phone.value.trim()) {
                setError(phone, 'Пожалуйста, укажите телефон');
                valid = false;
            } else if (phoneDigits.length < 10) {
                setError(phone, 'Телефон должен содержать минимум 10 цифр');
                valid = false;
            }

            if (!valid) {
                if (successEl) successEl.hidden = true;
                return;
            }

            // "Отправка" — заглушка: показываем сообщение и сбрасываем форму
            if (successEl) successEl.hidden = false;
            form.reset();

            // Прячем сообщение через 5 секунд
            setTimeout(function () {
                if (successEl) successEl.hidden = true;
            }, 5000);
        });
    }

    /* ---------- Плавный скролл к якорям ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = link.getAttribute('href');
            if (href.length > 1) {
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

})();

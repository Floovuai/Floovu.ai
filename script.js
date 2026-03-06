document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling para enlaces ancla
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Manejo del formulario de contacto (Simulación hacia n8n webhook)
    const form = document.getElementById('lead-form');
    const formMessage = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Aquí iría el fetch() real hacia el Webhook de n8n
            // Ejemplo:
            /*
            fetch('URL_DEL_WEBHOOK_N8N', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(response => {
                // manejar respuesta
            })
            */

            // Simulación visual
            const btn = form.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                form.reset();
                formMessage.style.color = '#4CAF50';
                formMessage.textContent = '¡Solicitud enviada exitosamente! Nos pondremos en contacto pronto.';

                setTimeout(() => formMessage.textContent = '', 5000);
            }, 1500);
        });
    }

    // Efecto sutil de Navbar al hacer scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.9)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });
});

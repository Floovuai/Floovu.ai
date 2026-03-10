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



    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Cerrar otros
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));

            // Abrir el actual si no estaba activo
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

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

    // --- PUNTO 11: SOCIAL PROOF DINÁMICO ---
    const socialProof = document.getElementById('social-proof');
    const spMessage = document.getElementById('sp-message');
    const spTime = document.getElementById('sp-time');
    
    const messages = [
        { msg: "Firma en Bogotá ahorró 15h esta semana", time: "Hace 10 min" },
        { msg: "Nueva inmobiliaria en Cali activó Floovu", time: "Hace 23 min" },
        { msg: "7 expedientes procesados en Barranquilla", time: "Hace 5 min" },
        { msg: "Abogado Senior aumentó 40% su eficiencia", time: "Hace 2 min" },
        { msg: "Cierre exitoso en Medellín vía WhatsApp AI", time: "Hace 45 min" }
    ];

    let currentMsg = 0;

    function showSocialProof() {
        if (!socialProof) return;
        
        const data = messages[currentMsg];
        spMessage.innerText = data.msg;
        spTime.innerText = data.time;
        
        socialProof.classList.add('show');
        
        setTimeout(() => {
            socialProof.classList.remove('show');
            currentMsg = (currentMsg + 1) % messages.length;
        }, 5000);
    }

    // Iniciar rotación cada 60 segundos (según sugerencia del usuario)
    setInterval(showSocialProof, 60000);
    setTimeout(showSocialProof, 5000); // Primera vez después de 5s
});

// --- PUNTO 7: EFECTO ESPEJO (FILTER PROFILE) ---
function filterProfile(type) {
    const buttons = document.querySelectorAll('.profile-btn');
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    // Cambiar estado de botones
    buttons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(type)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Filtrar testimonios con animación
    testimonials.forEach(card => {
        card.style.opacity = '0.3';
        card.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            if (type === 'legal' && card.classList.contains('profile-realestate')) {
                card.style.display = 'none';
            } else if (type === 'realestate' && card.classList.contains('profile-legal')) {
                card.style.display = 'none';
            } else {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }
        }, 300);
    });
}

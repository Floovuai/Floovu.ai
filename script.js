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
            navbar.classList.add('scrolled');
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.7)';
            navbar.style.boxShadow = 'none';
            navbar.classList.remove('scrolled');
        }
    });

    // --- ETAPA 2: LÓGICA DE TIMELINE AL HACER SCROLL ---
    const timelineProgress = document.getElementById('timeline-progress');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineContainer = document.querySelector('.timeline-container');

    function updateTimeline() {
        if (!timelineContainer || !timelineProgress) return;

        const containerRect = timelineContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calcular cuánto del contenedor ha pasado por la pantalla
        let progress = (windowHeight / 2 - containerRect.top) / containerRect.height;
        progress = Math.max(0, Math.min(progress, 1));
        
        timelineProgress.style.height = (progress * 100) + '%';

        timelineItems.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            // Activar si el item está cerca del centro de la pantalla
            if (itemRect.top < windowHeight * 0.6) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateTimeline);
    updateTimeline(); // Inicializar

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

    // Iniciar rotación cada 3 minutos (según sugerencia del usuario)
    setInterval(showSocialProof, 180000);
    setTimeout(showSocialProof, 10000); // Primera vez después de 10s

    // --- ROI CALCULATOR LOGIC ---
    const lawyersSlider = document.getElementById('lawyers-slider');
    const hoursSlider = document.getElementById('hours-slider');
    const lawyersVal = document.getElementById('lawyers-val');
    const hoursVal = document.getElementById('hours-val');
    const savingsAmount = document.getElementById('savings-amount');
    const freedHours = document.getElementById('freed-hours');

    function updateROI() {
        if (!lawyersSlider || !hoursSlider) return;

        const lawyers = parseInt(lawyersSlider.value);
        const hoursPerWeek = parseInt(hoursSlider.value);
        
        // Costo promedio hora abogado senior en Colombia: ~$120.000 COP
        const hourlyRate = 120000;
        const weeksPerMonth = 4.3;
        
        const totalHoursMonth = lawyers * hoursPerWeek * weeksPerMonth;
        const savingsEfficiency = 0.9;
        const hoursSaved = totalHoursMonth * savingsEfficiency;
        const moneySaved = hoursSaved * hourlyRate;
        
        const currentCost = totalHoursMonth * hourlyRate;
        const floovuCost = currentCost - moneySaved;

        // Actualizar UI
        lawyersVal.innerText = lawyers;
        hoursVal.innerText = hoursPerWeek + 'h';
        savingsAmount.innerText = '$' + Math.round(moneySaved).toLocaleString('es-CO');
        freedHours.innerText = Math.round(hoursSaved) + ' horas';

        // Actualizar Gráfico (Punto 6)
        const barCurrent = document.getElementById('bar-current');
        const barFloovu = document.getElementById('bar-floovu');
        const valCurrent = document.getElementById('val-current');
        const valFloovu = document.getElementById('val-floovu');

        if (barCurrent && barFloovu) {
            // Escalamiento visual: barCurrent entre 40% y 95%, barFloovu proporcional a la eficiencia
            const maxInputs = 50 * 40;
            const currentInputs = lawyers * hoursPerWeek;
            
            // La barra roja siempre ocupa al menos el 40% para que se vea "llena"
            const redHeight = 40 + (currentInputs / maxInputs * 55); 
            // La verde es el 10% de la roja (basado en el 90% de ahorro)
            const greenHeight = redHeight * 0.1;
            
            barCurrent.style.height = redHeight + '%';
            barFloovu.style.height = Math.max(5, greenHeight) + '%';
            
            valCurrent.innerText = '$' + (Math.round(currentCost / 1000000 * 10) / 10) + 'M';
            valFloovu.innerText = '$' + (Math.round(floovuCost / 1000000 * 10) / 10) + 'M';
        }
    }

    if (lawyersSlider && hoursSlider) {
        lawyersSlider.addEventListener('input', updateROI);
        hoursSlider.addEventListener('input', updateROI);
        updateROI(); // Inicializar
    }

    // --- ETAPA 1: MENÚ MÓVIL ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Cambiar icono entre hamburguesa y X
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Cerrar menú al hacer clic en un enlace (para móviles)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-xmark');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            });
        });
    }
});

// --- PUNTO 7: EFECTO ESPEJO (FILTER PROFILE) ---
function filterProfile(type) {
    const buttons = document.querySelectorAll('.profile-btn');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const products = document.querySelectorAll('.product-card');
    const heroTitle = document.getElementById('hero-title');
    
    // Cambiar texto del título (Punto 7)
    if (heroTitle) {
        if (type === 'legal') {
            heroTitle.innerText = "La IA Senior que blinda tus términos legales";
        } else if (type === 'realestate') {
            heroTitle.innerText = "La IA que evalúa tus activos y automatiza cierres";
        }
    }

    // Cambiar estado de botones
    buttons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(type)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Scroll suave a la sección de productos para que vean el resultado
    const productosSection = document.getElementById('productos');
    if (productosSection) {
        productosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Filtrar productos
    products.forEach(card => {
        card.style.opacity = '0.3';
        card.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            if (type === 'legal' && !card.classList.contains('profile-legal')) {
                card.style.display = 'none';
            } else if (type === 'realestate' && !card.classList.contains('profile-realestate')) {
                card.style.display = 'none';
            } else {
                card.style.display = ''; // Restaurar display original
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }
        }, 300);
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

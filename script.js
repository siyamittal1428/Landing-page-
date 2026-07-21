/* ==========================================================================
   HIDDEN ORACLE - LANDING PAGE INTERACTIVE JAVASCRIPT
   Cosmic Canvas, Urgency Timer, Popup Modal, FAQ Accordion, Live Notifications
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. COSMIC STARFIELD CANVAS ANIMATION
       ---------------------------------------------------------------------- */
    const canvas = document.getElementById('cosmic-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const stars = [];
        const starCount = Math.floor((width * height) / 9000);

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.5,
                color: Math.random() > 0.3 ? '#FFD700' : '#FFFFFF',
                alpha: Math.random(),
                speed: Math.random() * 0.02 + 0.005
            });
        }

        function drawStars() {
            ctx.clearRect(0, 0, width, height);
            stars.forEach(star => {
                star.alpha += star.speed;
                if (star.alpha > 1 || star.alpha < 0) {
                    star.speed = -star.speed;
                }
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = star.color;
                ctx.globalAlpha = Math.abs(star.alpha);
                ctx.fill();
            });
            requestAnimationFrame(drawStars);
        }

        drawStars();
    }

    /* ----------------------------------------------------------------------
       2. CONSULTATION POPUP MODAL (As strictly requested)
       Tagline: "Get Consultation Today"
       Button 1: +91 7814794852
       Button 2: Whatsapp Us
       ---------------------------------------------------------------------- */
    const popupOverlay = document.getElementById('consultationPopup');
    const closePopupBtn = document.getElementById('closePopupBtn');
    let popupShown = false;

    function openPopup() {
        if (popupOverlay && !popupShown) {
            popupOverlay.classList.add('active');
            popupShown = true;
        }
    }

    function closePopup() {
        if (popupOverlay) {
            popupOverlay.classList.remove('active');
        }
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', closePopup);
    }

    if (popupOverlay) {
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                closePopup();
            }
        });
    }

    // Auto-trigger popup after 5 seconds
    setTimeout(openPopup, 5000);

    // Trigger on Exit Intent (Desktop mouse moving to top)
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0) {
            openPopup();
        }
    });

    /* ----------------------------------------------------------------------
       3. FAQ ACCORDION TOGGLE
       ---------------------------------------------------------------------- */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    /* ----------------------------------------------------------------------
       4. HERO CONSULTATION FORM WHATSAPP SUBMISSION
       ---------------------------------------------------------------------- */
    const heroForm = document.getElementById('heroWhatsappForm');
    if (heroForm) {
        heroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('formName').value.trim();
            const phone = document.getElementById('formPhone').value.trim();
            const service = document.getElementById('formService').value;
            const problem = document.getElementById('formProblem').value.trim();

            const message = `*Consultation Request - Hidden Oracle*%0A%0A` +
                            `👤 *Name:* ${encodeURIComponent(name)}%0A` +
                            `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
                            `🔮 *Service:* ${encodeURIComponent(service)}%0A` +
                            `📝 *Problem/Question:* ${encodeURIComponent(problem)}%0A%0A` +
                            `Hi Astrologer Siya Mittal, please provide guidance for my issue.`;

            const whatsappUrl = `https://wa.me/917814794852?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    }

});

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
       2. COUNTDOWN URGENCY TIMER FOR GOOGLE ADS CONVERSION
       ---------------------------------------------------------------------- */
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        let totalSeconds = 9 * 60 + 45; // 09:45

        setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
            } else {
                totalSeconds = 12 * 60 + 30; // reset to 12:30
            }

            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            timerElement.textContent = 
                `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }, 1000);
    }

    /* ----------------------------------------------------------------------
       3. CONSULTATION POPUP MODAL (As strictly requested)
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
       4. FAQ ACCORDION TOGGLE
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
       5. LIVE RECENT BOOKING NOTIFICATION TOAST
       ---------------------------------------------------------------------- */
    const toast = document.getElementById('liveToast');
    const toastName = document.getElementById('toastName');
    const toastAction = document.getElementById('toastAction');
    const toastTime = document.getElementById('toastTime');

    const recentBookings = [
        { name: "Pooja Sharma (Delhi)", action: "booked a Vastu Consultation", time: "2 mins ago" },
        { name: "Vikram Malhotra (Mumbai)", action: "booked Kundali Reading", time: "4 mins ago" },
        { name: "Ananya Mittal (Chandigarh)", action: "booked Tarot Card Reading", time: "1 min ago" },
        { name: "Rajesh Singhania (Jaipur)", action: "booked Commercial Vastu Audit", time: "5 mins ago" },
        { name: "Sujata Verma (Bengaluru)", action: "booked Love Compatibility Reading", time: "3 mins ago" },
        { name: "Deepak Patel (Ahmedabad)", action: "booked Gemstone Consultation", time: "6 mins ago" }
    ];

    let toastIndex = 0;

    function showNextToast() {
        if (!toast || !toastName) return;

        const booking = recentBookings[toastIndex];
        toastName.textContent = booking.name;
        toastAction.textContent = booking.action;
        toastTime.textContent = booking.time;

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4500);

        toastIndex = (toastIndex + 1) % recentBookings.length;
    }

    // Trigger first toast after 8 seconds, then every 15 seconds
    setTimeout(() => {
        showNextToast();
        setInterval(showNextToast, 15000);
    }, 8000);

});

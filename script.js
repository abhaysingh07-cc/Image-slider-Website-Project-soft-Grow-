document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slider = document.getElementById('slider');
    
    let currentIndex = 0;
    let autoSlideInterval;
    
    // --- Touch Variables ---
    let touchStartX = 0;
    let touchEndX = 0;

    const updateSlider = (index) => {
        slides.forEach(s => s.classList.remove('current'));
        dots.forEach(d => d.classList.remove('active-dot'));
        
        slides[index].classList.add('current');
        dots[index].classList.add('active-dot');
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider(currentIndex);
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider(currentIndex);
    };

    const resetTimer = () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    };

    // --- Click Events ---
    document.getElementById('nextBtn').addEventListener('click', () => { nextSlide(); resetTimer(); });
    document.getElementById('prevBtn').addEventListener('click', () => { prevSlide(); resetTimer(); });

    // --- Touch Events (Swipe Support) ---
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
        const swipeDistance = touchEndX - touchStartX;
        const threshold = 50; // Minimum pixels to count as a swipe

        if (swipeDistance < -threshold) {
            // Swiped Left -> Next Slide
            nextSlide();
            resetTimer();
        } else if (swipeDistance > threshold) {
            // Swiped Right -> Previous Slide
            prevSlide();
            resetTimer();
        }
    };

    // --- Initialize ---
    autoSlideInterval = setInterval(nextSlide, 5000);
});
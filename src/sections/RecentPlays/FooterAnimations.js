document.addEventListener('DOMContentLoaded', function() {
    const footerElements = document.querySelectorAll('.footer-left, .footer-right, .footer-image img');
  
    const animateOnScroll = () => {
      footerElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
  
    window.addEventListener('scroll', animateOnScroll);
  
    footerElements.forEach((element) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
  });
  
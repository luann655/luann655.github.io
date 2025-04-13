document.addEventListener("DOMContentLoaded", function() {
    // Cargar video
    fetch('https://magicloops.dev/api/loop/13f2447f-521c-489a-b7ba-3facc771ed25/run', {
        method: 'POST',
        body: JSON.stringify({ "videoContext": "project explanation" }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('video-container').innerHTML = '<iframe src="https://www.youtube.com/embed/jNQXAC9IVRw" allowfullscreen></iframe>';
    })
    .catch(err => console.error("Error loading video:", err));

    // Cargar información del proyecto
    fetch('https://magicloops.dev/api/loop/8b183891-030b-4f7e-b911-7a10996a6b99/run', {
        method: 'POST',
        body: JSON.stringify({ "rawProjectData": "Este proyecto nace de la necesidad de crear soluciones innovadoras para los desafíos actuales de la industria. Con un enfoque centrado en la sostenibilidad y la eficiencia, hemos desarrollado una plataforma que integra las últimas tecnologías para ofrecer resultados excepcionales. Nuestra visión es convertir este proyecto en un referente de innovación y excelencia en el mercado, ofreciendo valor tanto a inversores como a usuarios finales." }),
    })
    .then(response => response.json())
    .then(data => {
        if(data.formattedInfo){
            document.getElementById('project-info').innerHTML = '<p>' + data.formattedInfo + '</p>';
        }
    })
    .catch(err => console.error("Error formatting project info:", err));

    // Procesar contexto de imagen
    fetch('https://magicloops.dev/api/loop/a9088cae-4665-4122-a1cf-fe5e1bb991a1/run', {
        method: 'POST',
        body: JSON.stringify({ "imageContext": "overview of the project" }),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Image processing invoked");
    })
    .catch(err => console.error("Error processing image context:", err));
    
    // Botón volver arriba
    var backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // Inicializar AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Configuración de particles.js
    const particlesConfig = {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#2EE6AA"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#2EE6AA",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            }
        },
        retina_detect: true
    };

    // Inicializar particles.js en todas las secciones
    const sections = ["hero", "about", "features", "gallery", "team"];
    
    sections.forEach(section => {
        if (document.getElementById(`${section}-particles`)) {
            particlesJS(`${section}-particles`, particlesConfig);
        }
    });

    // Implementar lazy loading para imágenes
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        lazyImages.forEach(img => {
            img.classList.add('loaded');
        });
    }

    // Ocultar loader
    window.onload = function() {
        document.querySelector('.loader-wrapper').style.opacity = '0';
        setTimeout(function(){
            document.querySelector('.loader-wrapper').style.display = 'none';
        }, 500);
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.sticky-nav');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Gallery image click effect
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                const modal = document.createElement('div');
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <img src="${img.src}" alt="${img.alt}">
                    </div>
                `;
                document.body.appendChild(modal);
                
                modal.querySelector('.close').onclick = function() {
                    modal.remove();
                };
                
                modal.onclick = function(e) {
                    if (e.target === modal) {
                        modal.remove();
                    }
                };
            }
        });
    });
}); 
document.addEventListener('DOMContentLoaded', () => {
    // Función para activar la animación de entrada
    const animatePageIn = () => {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.classList.add('page-transition-active');
        }
    };

    // Función para manejar el clic en los enlaces
    const handleLinkClick = (event) => {
        const target = event.currentTarget; // El enlace clickeado
        const href = target.getAttribute('href');

        // Solo animar si es un enlace interno a otra página HTML
        // y no es un ancla interna (#), o un enlace externo, o un script
        if (href && !href.startsWith('#') && !href.startsWith('javascript:') && !target.hasAttribute('target')) {
            event.preventDefault(); // Detiene la navegación por defecto

            const mainContent = document.querySelector('main');
            if (mainContent) {
                // Inicia la animación de salida
                mainContent.classList.remove('page-transition-active');
                mainContent.classList.add('page-transition');

                // Espera a que termine la animación de salida antes de navegar
                mainContent.addEventListener('transitionend', () => {
                    window.location.href = href; // Redirige a la nueva página
                }, { once: true }); // Para que el listener se ejecute solo una vez
            } else {
                // Si no hay mainContent, simplemente navega
                window.location.href = href;
            }
        }
    };

    // Aplica la animación de entrada al cargar la página
    animatePageIn();

    // Añade el listener de clics a todos los enlaces internos de navegación
    document.querySelectorAll('header nav a, .cta-buttons a, .cta-bottom a').forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });
});

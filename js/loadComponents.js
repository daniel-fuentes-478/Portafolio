// Cargar componentes dinámicamente
async function loadComponent(elementId, componentPath) {
    console.log(`Intentando cargar: ${componentPath}`);
    try {
        const response = await fetch(componentPath);
        console.log(`Respuesta de ${componentPath}:`, response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        console.log(`HTML recibido de ${componentPath}:`, html.substring(0, 100));
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const component = doc.querySelector('nav') || doc.querySelector('footer');
        
        if (component) {
            const container = document.getElementById(elementId);
            if (container) {
                container.innerHTML = component.outerHTML;
                console.log(`✓ Componente ${elementId} cargado exitosamente`);
                
                // Aplicar clase adaptativa después de cargar
                applyAdaptiveClasses();
            } else {
                console.error(`✗ No se encontró el elemento con id: ${elementId}`);
            }
        } else {
            console.error(`✗ No se encontró nav o footer en ${componentPath}`);
        }
    } catch (error) {
        console.error(`✗ Error cargando componente ${componentPath}:`, error);
    }
}

// Función para detectar el color de fondo de la página y aplicar clases
function applyAdaptiveClasses() {
    // Detectar el color de fondo del body o de la primera sección principal
    const body = document.body;
    const firstSection = document.querySelector('section');
    
    // Obtener el color de fondo computado
    const bgColor = window.getComputedStyle(firstSection || body).backgroundColor;
    
    // Determinar si el fondo es negro o blanco
    const isBlackBackground = bgColor.includes('35, 31, 32') || // #231F20 en RGB
                              bgColor.includes('rgb(35, 31, 32)') ||
                              bgColor === 'rgb(35, 31, 32)';
    
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');
    
    if (navbar) {
        if (isBlackBackground) {
            navbar.classList.add('bg-black');
            navbar.classList.remove('bg-white');
        } else {
            navbar.classList.add('bg-white');
            navbar.classList.remove('bg-black');
        }
    }
    
    if (footer) {
        if (isBlackBackground) {
            footer.classList.add('bg-black');
            footer.classList.remove('bg-white');
        } else {
            footer.classList.add('bg-white');
            footer.classList.remove('bg-black');
        }
    }
    
    console.log(`🎨 Fondo detectado: ${isBlackBackground ? 'Negro' : 'Blanco'}`);
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, iniciando carga de componentes...');
    console.log('Ruta actual:', window.location.pathname);
    
    // Ruta relativa desde pages/
    loadComponent('navbar-component', 'components/navbar.html');
    loadComponent('footer-component', 'components/footer.html');
    
    // Aplicar clases adaptativas después de un pequeño delay para asegurar que todo esté cargado
    setTimeout(applyAdaptiveClasses, 100);
});
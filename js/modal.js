// Modal para visualizar imágenes en tamaño completo
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    
    // Obtener todos los items de galería que son imágenes
    const galeriaItems = document.querySelectorAll('.galeria-item[data-type="image"]');
    
    // Agregar evento click a cada imagen
    galeriaItems.forEach(item => {
        const img = item.querySelector('.galeria-imagen');
        if (img) {
            item.addEventListener('click', function() {
                modal.classList.add('active');
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                document.body.style.overflow = 'hidden'; // Prevenir scroll
            });
        }
    });
    
    // Cerrar modal al hacer click en la X
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Cerrar modal al hacer click fuera de la imagen
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }
    
    console.log('✨ Modal de imágenes cargado correctamente');
});
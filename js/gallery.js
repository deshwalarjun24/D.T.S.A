// Gallery Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Modal/Lightbox functionality
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    
    // Close modal when clicking the X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Open the modal and set the image
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            const img = this.querySelector('img');
            
            modalImg.src = img.src;
            modalCaption.innerHTML = '';
            modal.style.display = 'block';
        });
    });
    
    // Change image when clicking arrows
    window.changeImage = function(n) {
        showImage(currentIndex += n);
    };
    
    function showImage(n) {
        // If we go past the end, loop to the beginning
        if (n >= galleryItems.length) {
            currentIndex = 0;
        }
        
        // If we go before the beginning, loop to the end
        if (n < 0) {
            currentIndex = galleryItems.length - 1;
        }
        
        const item = galleryItems[currentIndex];
        const img = item.querySelector('img');
        
        modalImg.src = img.src;
        modalCaption.innerHTML = '';
    }
    
    // Load More functionality
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (loadMoreBtn) {
        let currentItems = 9;
        
        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            for (let i = currentItems; i < currentItems + 6; i++) {
                if (galleryItems[i]) {
                    galleryItems[i].style.display = 'block';
                }
            }
            
            currentItems += 6;
            
            // Hide button if all items are shown
            if (currentItems >= galleryItems.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
        
        // Initially hide items beyond the initial count
        Array.from(galleryItems).forEach((item, index) => {
            if (index >= currentItems) {
                item.style.display = 'none';
            }
        });
    }
    
    // Keyboard navigation for the modal
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeImage(1);
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });
}); 
// ===================================
// Configuration & State
// ===================================
const ADMIN_PASSWORD = 'coryadmin2024'; // Change this to your desired password

let photos = [];
let currentPhotoIndex = 0;
let isAdmin = false;

// Sample photos for initial display
const samplePhotos = [
    {
        id: 1,
        title: 'Golden Hour Portrait',
        description: 'Natural light portrait session',
        category: 'portrait',
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80'
    },
    {
        id: 2,
        title: 'Mountain Vista',
        description: 'Sunrise over the mountains',
        category: 'landscape',
        src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80'
    },
    {
        id: 3,
        title: 'Wedding Celebration',
        description: 'Joyful moments captured',
        category: 'event',
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80'
    },
    {
        id: 4,
        title: 'Forest Path',
        description: 'Autumn colors in the woods',
        category: 'nature',
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'
    },
    {
        id: 5,
        title: 'Urban Life',
        description: 'Street photography downtown',
        category: 'street',
        src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80'
    },
    {
        id: 6,
        title: 'Product Showcase',
        description: 'Commercial product photography',
        category: 'commercial',
        src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
    },
    {
        id: 7,
        title: 'Elegant Portrait',
        description: 'Studio portrait session',
        category: 'portrait',
        src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80'
    },
    {
        id: 8,
        title: 'Coastal Sunset',
        description: 'Ocean views at dusk',
        category: 'landscape',
        src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'
    },
    {
        id: 9,
        title: 'Corporate Event',
        description: 'Professional conference coverage',
        category: 'event',
        src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80'
    }
];

// ===================================
// DOM Elements
// ===================================
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const adminBtn = document.getElementById('adminBtn');
const loginModal = document.getElementById('loginModal');
const uploadModal = document.getElementById('uploadModal');
const loginForm = document.getElementById('loginForm');
const uploadForm = document.getElementById('uploadForm');
const gallery = document.getElementById('gallery');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxDescription = document.querySelector('.lightbox-description');
const contactForm = document.getElementById('contactForm');

// ===================================
// Initialization
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    loadPhotos();
    renderGallery('all');
    setupEventListeners();
    checkAdminStatus();
});

// ===================================
// Photo Management
// ===================================
function loadPhotos() {
    const storedPhotos = localStorage.getItem('coryphotos_gallery');
    if (storedPhotos) {
        photos = JSON.parse(storedPhotos);
    } else {
        photos = [...samplePhotos];
        savePhotos();
    }
}

function savePhotos() {
    localStorage.setItem('coryphotos_gallery', JSON.stringify(photos));
}

function renderGallery(filter = 'all') {
    gallery.innerHTML = '';
    
    const filteredPhotos = filter === 'all' 
        ? photos 
        : photos.filter(photo => photo.category === filter);
    
    if (filteredPhotos.length === 0) {
        gallery.innerHTML = `
            <div class="no-photos">
                <p>No photos in this category yet.</p>
            </div>
        `;
        return;
    }
    
    filteredPhotos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.index = photos.indexOf(photo);
        item.innerHTML = `
            <img src="${photo.src}" alt="${photo.title}" loading="lazy">
            <div class="gallery-overlay">
                <h3>${photo.title}</h3>
                <p>${photo.category}</p>
            </div>
        `;
        
        item.addEventListener('click', () => openLightbox(photos.indexOf(photo)));
        gallery.appendChild(item);
    });
}

// ===================================
// Admin Authentication
// ===================================
function checkAdminStatus() {
    const adminLoggedIn = localStorage.getItem('coryphotos_admin');
    if (adminLoggedIn === 'true') {
        isAdmin = true;
        updateAdminUI();
    }
}

function updateAdminUI() {
    adminBtn.textContent = 'Upload Photo';
    adminBtn.classList.remove('admin-btn');
    adminBtn.classList.add('upload-btn-direct');
}

function logoutAdmin() {
    isAdmin = false;
    localStorage.removeItem('coryphotos_admin');
    adminBtn.textContent = 'Admin Login';
    adminBtn.classList.add('admin-btn');
    adminBtn.classList.remove('upload-btn-direct');
}

// ===================================
// Event Listeners Setup
// ===================================
function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Admin button click
    adminBtn.addEventListener('click', handleAdminClick);
    
    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });
    
    // Login form submit
    loginForm.addEventListener('submit', handleLogin);
    
    // Upload form submit
    uploadForm.addEventListener('submit', handleUpload);
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
    
    // Lightbox navigation
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', prevPhoto);
    document.querySelector('.lightbox-next').addEventListener('click', nextPhoto);
    
    // Lightbox keyboard navigation
    document.addEventListener('keydown', handleLightboxKeyboard);
    
    // Click outside modal to close
    window.addEventListener('click', handleOutsideClick);
    
    // Contact form submit
    contactForm.addEventListener('submit', handleContactSubmit);
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
}

// ===================================
// Event Handlers
// ===================================
function handleScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function handleAdminClick() {
    if (isAdmin) {
        openModal(uploadModal);
    } else {
        openModal(loginModal);
    }
}

function handleLogin(e) {
    e.preventDefault();
    const password = document.getElementById('adminPassword').value;
    
    if (password === ADMIN_PASSWORD) {
        isAdmin = true;
        localStorage.setItem('coryphotos_admin', 'true');
        updateAdminUI();
        closeModal(loginModal);
        document.getElementById('adminPassword').value = '';
        document.getElementById('loginError').textContent = '';
        openModal(uploadModal);
    } else {
        document.getElementById('loginError').textContent = 'Incorrect password. Please try again.';
    }
}

function handleUpload(e) {
    e.preventDefault();
    
    const fileInput = document.getElementById('photoFile');
    const title = document.getElementById('photoTitle').value;
    const description = document.getElementById('photoDescription').value;
    const category = document.getElementById('photoCategory').value;
    
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const newPhoto = {
                id: Date.now(),
                title: title,
                description: description,
                category: category,
                src: event.target.result
            };
            
            photos.unshift(newPhoto);
            savePhotos();
            renderGallery('all');
            
            // Reset active filter
            filterButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('[data-filter="all"]').classList.add('active');
            
            closeModal(uploadModal);
            uploadForm.reset();
            
            alert('Photo uploaded successfully!');
        };
        
        reader.readAsDataURL(file);
    }
}

function handleFilter(e) {
    const filter = e.target.dataset.filter;
    
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    renderGallery(filter);
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    // In a real application, you would send this to a server
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    alert(`Thank you ${name}! Your message has been received. I'll get back to you at ${email} soon.`);
    contactForm.reset();
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// ===================================
// Lightbox Functions
// ===================================
function openLightbox(index) {
    currentPhotoIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightboxContent() {
    const photo = photos[currentPhotoIndex];
    lightboxImage.src = photo.src;
    lightboxTitle.textContent = photo.title;
    lightboxDescription.textContent = photo.description;
}

function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    updateLightboxContent();
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    updateLightboxContent();
}

function handleLightboxKeyboard(e) {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            prevPhoto();
            break;
        case 'ArrowRight':
            nextPhoto();
            break;
    }
}

// ===================================
// Modal Functions
// ===================================
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function handleOutsideClick(e) {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
    if (e.target.classList.contains('lightbox')) {
        closeLightbox();
    }
}

// ===================================
// Utility Functions
// ===================================
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Add logout functionality when clicking admin button while logged in
adminBtn.addEventListener('dblclick', (e) => {
    if (isAdmin) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            logoutAdmin();
        }
    }
});

// Add hint for logout on page load
console.log('%c CoryPhotos Admin Panel ', 'background: #d4af37; color: #0a0a0a; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%c To logout: Double-click the "Upload Photo" button ', 'background: #1a1a1a; color: #d4af37; font-size: 12px; padding: 5px;');
console.log('%c Default password: coryadmin2024 ', 'background: #1a1a1a; color: #ff4444; font-size: 12px; padding: 5px;');

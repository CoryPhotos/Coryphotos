// ===================================
// Photo Gallery Script
// ===================================

let photos = [];
let currentPhotoIndex = 0;

// DOM Elements
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
    setupEventListeners();
});

// ===================================
// Photo Management
// ===================================
async function loadPhotos() {
    try {
        const response = await fetch('photos.json');
        if (response.ok) {
            photos = await response.json();
        } else {
            photos = [];
        }
    } catch (error) {
        console.log('No photos.json found, starting with empty gallery');
        photos = [];
    }
    renderGallery('all');
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
                <p class="hint">Add photos by placing image files in the images/ folder and updating photos.json</p>
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
// Event Listeners Setup
// ===================================
function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
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
    window.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
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
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function handleFilter(e) {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    const filter = e.target.dataset.filter;
    renderGallery(filter);
}

function openLightbox(index) {
    currentPhotoIndex = index;
    const photo = photos[index];
    lightboxImage.src = photo.src;
    lightboxTitle.textContent = photo.title;
    lightboxDescription.textContent = photo.description || '';
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    openLightbox(currentPhotoIndex);
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    openLightbox(currentPhotoIndex);
}

function handleLightboxKeyboard(e) {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevPhoto();
        if (e.key === 'ArrowRight') nextPhoto();
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

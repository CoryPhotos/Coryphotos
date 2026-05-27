// ===================================
// Configuration & State
// ===================================
const ADMIN_PASSWORD = 'coryadmin2024'; // Change this to your desired password

let photos = [];
let currentPhotoIndex = 0;
let isAdmin = false;
let siteSettings = {
    heroTitle: 'Capturing Life\'s Beautiful Moments',
    heroSubtitle: 'Professional photography that tells your unique story',
    aboutTitle: 'About Cory',
    aboutLead: 'Passionate photographer capturing moments that matter',
    aboutText1: 'With over 10 years of experience behind the lens, I specialize in creating stunning visual narratives that resonate with emotion and authenticity.',
    aboutText2: 'Whether it\'s an intimate portrait session, a grand landscape, or a momentous event, I bring dedication and creativity to every shoot.',
    stat1Number: '500+',
    stat1Label: 'Projects Completed',
    stat2Number: '10+',
    stat2Label: 'Years Experience',
    stat3Number: '300+',
    stat3Label: 'Happy Clients',
    location: 'Los Angeles, CA',
    email: 'hello@coryphotos.com',
    phone: '+1 (555) 123-4567',
    footerTagline: 'Capturing moments, creating memories'
};

// ===================================
// DOM Elements
// ===================================
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const adminBtn = document.getElementById('adminBtn');
const settingsBtn = document.getElementById('settingsBtn');
const loginModal = document.getElementById('loginModal');
const uploadModal = document.getElementById('uploadModal');
const settingsModal = document.getElementById('settingsModal');
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
    loadSiteSettings();
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
        photos = [];
        savePhotos();
    }
}

function savePhotos() {
    localStorage.setItem('coryphotos_gallery', JSON.stringify(photos));
}

function loadSiteSettings() {
    const storedSettings = localStorage.getItem('coryphotos_settings');
    if (storedSettings) {
        siteSettings = JSON.parse(storedSettings);
    }
    applySiteSettings();
}

function saveSiteSettings() {
    localStorage.setItem('coryphotos_settings', JSON.stringify(siteSettings));
}

function applySiteSettings() {
    // Hero section
    document.querySelector('.hero h1').innerHTML = siteSettings.heroTitle.replace("Beautiful Moments", '<span class="highlight">Beautiful Moments</span>');
    document.querySelector('.hero p').textContent = siteSettings.heroSubtitle;
    
    // About section
    document.querySelector('.about-text h2').textContent = siteSettings.aboutTitle;
    document.querySelector('.about-text .lead').textContent = siteSettings.aboutLead;
    const aboutParagraphs = document.querySelectorAll('.about-text p:not(.lead)');
    if (aboutParagraphs.length >= 2) {
        aboutParagraphs[0].textContent = siteSettings.aboutText1;
        aboutParagraphs[1].textContent = siteSettings.aboutText2;
    }
    
    // Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statLabels = document.querySelectorAll('.stat-label');
    if (statNumbers.length >= 3 && statLabels.length >= 3) {
        statNumbers[0].textContent = siteSettings.stat1Number;
        statLabels[0].textContent = siteSettings.stat1Label;
        statNumbers[1].textContent = siteSettings.stat2Number;
        statLabels[1].textContent = siteSettings.stat2Label;
        statNumbers[2].textContent = siteSettings.stat3Number;
        statLabels[2].textContent = siteSettings.stat3Label;
    }
    
    // Contact info
    const infoItems = document.querySelectorAll('.info-text p');
    if (infoItems.length >= 3) {
        infoItems[0].textContent = siteSettings.location;
        infoItems[1].textContent = siteSettings.email;
        infoItems[2].textContent = siteSettings.phone;
    }
    
    // Footer
    document.querySelector('.footer-logo p').textContent = siteSettings.footerTagline;
}

// Populate settings form with current values
function populateSettingsForm() {
    document.getElementById('settingHeroTitle').value = siteSettings.heroTitle;
    document.getElementById('settingHeroSubtitle').value = siteSettings.heroSubtitle;
    document.getElementById('settingAboutTitle').value = siteSettings.aboutTitle;
    document.getElementById('settingAboutLead').value = siteSettings.aboutLead;
    document.getElementById('settingAboutText1').value = siteSettings.aboutText1;
    document.getElementById('settingAboutText2').value = siteSettings.aboutText2;
    document.getElementById('settingStat1Number').value = siteSettings.stat1Number;
    document.getElementById('settingStat1Label').value = siteSettings.stat1Label;
    document.getElementById('settingStat2Number').value = siteSettings.stat2Number;
    document.getElementById('settingStat2Label').value = siteSettings.stat2Label;
    document.getElementById('settingStat3Number').value = siteSettings.stat3Number;
    document.getElementById('settingStat3Label').value = siteSettings.stat3Label;
    document.getElementById('settingLocation').value = siteSettings.location;
    document.getElementById('settingEmail').value = siteSettings.email;
    document.getElementById('settingPhone').value = siteSettings.phone;
    document.getElementById('settingFooterTagline').value = siteSettings.footerTagline;
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
    settingsBtn.style.display = 'block';
}

function logoutAdmin() {
    isAdmin = false;
    localStorage.removeItem('coryphotos_admin');
    adminBtn.textContent = 'Admin Login';
    adminBtn.classList.add('admin-btn');
    adminBtn.classList.remove('upload-btn-direct');
    settingsBtn.style.display = 'none';
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
    
    // Settings button click
    settingsBtn.addEventListener('click', () => {
        if (isAdmin) {
            openModal(settingsModal);
        }
    });
    
    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });
    
    // Login form submit
    loginForm.addEventListener('submit', handleLogin);
    
    // Upload form submit
    uploadForm.addEventListener('submit', handleUpload);
    
    // Settings form submit
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', handleSettingsSave);
    }
    
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
        populateSettingsForm();
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

function handleSettingsSave(e) {
    e.preventDefault();
    
    siteSettings.heroTitle = document.getElementById('settingHeroTitle').value;
    siteSettings.heroSubtitle = document.getElementById('settingHeroSubtitle').value;
    siteSettings.aboutTitle = document.getElementById('settingAboutTitle').value;
    siteSettings.aboutLead = document.getElementById('settingAboutLead').value;
    siteSettings.aboutText1 = document.getElementById('settingAboutText1').value;
    siteSettings.aboutText2 = document.getElementById('settingAboutText2').value;
    siteSettings.stat1Number = document.getElementById('settingStat1Number').value;
    siteSettings.stat1Label = document.getElementById('settingStat1Label').value;
    siteSettings.stat2Number = document.getElementById('settingStat2Number').value;
    siteSettings.stat2Label = document.getElementById('settingStat2Label').value;
    siteSettings.stat3Number = document.getElementById('settingStat3Number').value;
    siteSettings.stat3Label = document.getElementById('settingStat3Label').value;
    siteSettings.location = document.getElementById('settingLocation').value;
    siteSettings.email = document.getElementById('settingEmail').value;
    siteSettings.phone = document.getElementById('settingPhone').value;
    siteSettings.footerTagline = document.getElementById('settingFooterTagline').value;
    
    saveSiteSettings();
    applySiteSettings();
    
    closeModal(settingsModal);
    alert('Site settings saved successfully!');
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

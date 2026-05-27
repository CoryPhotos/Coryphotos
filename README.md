# CoryPhotos - Professional Photography Website

A modern, professional photography portfolio website built with HTML, CSS, and JavaScript. **No login required** - edit everything directly through GitHub!

## 🚀 Quick Start: How to Add Your Photos

### Step 1: Upload Your Photos
1. Go to your GitHub repository
2. Click on the `images` folder (already created for you)
3. Click "Add file" → "Upload files"
4. Upload your photos:
   - **photographer.jpg** - Your profile photo for the About section
   - **portfolio-1.jpg, portfolio-2.jpg, etc.** - Your portfolio photos

### Step 2: Update photos.json
1. Click on `photos.json` in your repository
2. Click the pencil icon (✏️) to edit
3. Update each photo entry with your details:
   ```json
   {
     "id": 1,
     "title": "Mountain Sunrise",
     "description": "Golden hour light illuminating mountain peaks",
     "category": "landscape",
     "src": "images/portfolio-1.jpg"
   }
   ```
4. Click "Commit changes" at the bottom

### Step 3: Wait for Deployment
- Changes will appear on your live site in 1-2 minutes
- View your site at: `https://yourusername.github.io/repository-name`

## 📁 File Structure

```
├── index.html          # Main website content
├── styles.css          # All styling and colors
├── script.js           # Interactive features
├── photos.json         # Portfolio photo configuration
├── images/             # Upload your photos here
│   ├── photographer.jpg (upload this)
│   ├── portfolio-1.jpg (upload this)
│   ├── portfolio-2.jpg (upload this)
│   └── ...
└── README.md           # This file
```

## ✏️ Editing Directly in GitHub

**No login system needed!** Everything is edited through GitHub:

1. **Navigate to any file** in your repository
2. **Click the pencil icon** (✏️) to edit
3. **Make your changes**
4. **Click "Commit changes"** to save
5. **Wait 1-2 minutes** for the site to update

### Uploading New Photos
1. Go to the `images` folder
2. Click "Add file" → "Upload files"
3. Select your photo files
4. Add a commit message like "Add new portfolio photos"
5. Click "Commit changes"

### Updating Photo Information
1. Open `photos.json`
2. Click the pencil icon to edit
3. Modify titles, descriptions, or add new entries
4. Commit your changes

## 🎨 Customization Guide

### Changing Text Content
Edit `index.html` directly:
- Hero section title and description
- About section bio
- Contact information
- Footer details

### Changing Colors & Fonts
Edit `styles.css`:
- Color variables at the top
- Font families
- Spacing and layout

### Photo Categories
Available categories for filtering:
- portrait
- landscape
- event
- nature
- street
- commercial

## 🌐 Deployment Options

### GitHub Pages (Recommended)
1. Your site is already configured for GitHub Pages
2. Go to Settings → Pages
3. Ensure it's set to deploy from your main branch
4. Your site URL: `https://yourusername.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to Netlify Drop
2. Or connect your GitHub repository for automatic deployments

### Vercel
1. Import your GitHub repository
2. Automatic deployment on every commit

## 💡 Tips

- **Image sizes**: For best performance, keep photos under 500KB
- **Recommended dimensions**: 
  - Portfolio photos: 1200x800px
  - Photographer photo: 600x800px
- **File formats**: Use JPG for photos, PNG for graphics with transparency
- **Commit often**: Save small changes frequently to avoid conflicts

## 🆘 Troubleshooting

**Photos not showing up?**
- Check that the filename in `photos.json` matches exactly (case-sensitive)
- Ensure photos are uploaded to the `images` folder
- Wait 1-2 minutes for GitHub Pages to update
- Try a hard refresh (Ctrl+F5 or Cmd+Shift+R)

**Site not updating?**
- Check that you committed your changes
- Verify GitHub Pages is enabled in repository settings
- Clear your browser cache

## 📄 License

MIT License - Feel free to use this template for your own photography business!

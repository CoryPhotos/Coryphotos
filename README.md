# CoryPhotos Website

A clean, professional photography portfolio website.

## How to Edit Your Website

This is a **static website** that you edit directly through GitHub. No login system needed!

### Adding Photos to Your Portfolio

1. **Upload your photo files:**
   - Go to your GitHub repository
   - Navigate to the `images/` folder (create it if it doesn't exist)
   - Click "Add file" → "Upload files"
   - Upload your photos (JPG, PNG recommended)
   - Commit the changes

2. **Update photos.json:**
   - In your repo, open `photos.json`
   - Click the pencil icon to edit
   - Add a new entry for each photo:
   ```json
   {
     "id": 7,
     "title": "Your Photo Title",
     "description": "Brief description",
     "category": "portrait",
     "src": "images/your-photo-filename.jpg"
   }
   ```
   - Categories: `portrait`, `landscape`, `event`, `nature`, `street`, `commercial`
   - Commit the changes

### Changing Your Photographer Image

1. Upload your photo to the `images/` folder
2. Name it `photographer.jpg` (or update the filename in `index.html`)
3. Commit the changes

### Editing Text Content

- Open `index.html` in your repo
- Click the pencil icon
- Find and edit the text you want to change
- Commit the changes

### How Changes Get Published

When you commit changes to your GitHub repository:
- GitHub Pages automatically rebuilds your site
- Changes are live within 1-2 minutes
- Everyone sees the same updated version

## File Structure

```
├── index.html          # Main HTML file (edit text content here)
├── styles.css          # Styling (colors, fonts, layout)
├── script.js           # Gallery functionality
├── photos.json         # Your portfolio photos data
├── images/             # Your image files
│   └── photographer.jpg # Your photographer photo
└── README.md           # This file
```

## Tips

- Keep image files under 500KB for fast loading
- Use descriptive filenames
- Test changes by viewing your live site after committing

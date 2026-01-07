# StoryForge - Image Upload Feature

## Overview

This updated version of StoryForge includes **image upload functionality** for both **Characters** and all **World Building elements** (Locations, Cultures, Technology, Magic Systems, Historical Events, and Custom Elements).

## New Features

### Character Image Uploads
- Upload a character portrait or reference image for each character card
- Images display as **120x120px thumbnails**, aligned to the **far left** of the card
- Easy-to-use upload button with visual icon
- Remove button appears after uploading to allow image deletion

### World Building Image Uploads
- Upload reference images for all World Building elements:
  - **Locations** - Maps, landscape photos, architectural references
  - **Cultures** - Cultural symbols, traditional clothing, artifacts
  - **Technology** - Device concepts, technical diagrams, prototypes
  - **Magic Systems** - Magical symbols, spell visualizations, runes
  - **Historical Events** - Historical documents, battle maps, timelines
  - **Custom Elements** - Any custom world-building concept images

### Accessibility & Compliance
- **508 and ADA compliant** upload buttons
- Proper ARIA labels for screen readers
- Keyboard accessible controls
- Focus-visible styles for keyboard navigation
- Semantic HTML structure

### Technical Specifications
- **Supported formats**: JPG, PNG, GIF
- **Maximum file size**: 5MB per image
- **Thumbnail dimensions**: 120x120px
- **Image alignment**: Far left (as specified)
- **Storage**: Base64 encoded data URLs (stored in browser localStorage with the rest of your story data)

## How to Use

### Uploading an Image

1. **Navigate** to the Characters page or World Building page
2. **Create or open** a character or world element card
3. **Click** the "Upload Image" button (with upload icon)
4. **Select** an image file from your device (JPG, PNG, or GIF, max 5MB)
5. The image will **display immediately** as a thumbnail on the left side of the card

### Removing an Image

1. After uploading an image, a **"Remove" button** will appear
2. **Click** the "Remove" button to delete the image
3. The placeholder will reappear, and you can upload a new image if desired

## Files Included

- **StoryForge_OPEN.html** - Main application file (updated)
- **image-upload-enhancement.js** - Image upload functionality script
- **README.md** - This documentation file

## Installation

1. Keep both files (`StoryForge_OPEN.html` and `image-upload-enhancement.js`) in the **same directory**
2. Open `StoryForge_OPEN.html` in a modern web browser
3. The image upload functionality will be automatically available

## Browser Compatibility

- **Chrome** 90+ ✓
- **Firefox** 88+ ✓
- **Safari** 14+ ✓
- **Edge** 90+ ✓

## Technical Implementation

### Architecture
The image upload feature is implemented as a **non-invasive enhancement** that:
- Automatically detects character and world building cards
- Injects upload UI components dynamically
- Uses a **MutationObserver** to handle dynamically added cards
- Stores images as base64 data URLs alongside existing story data

### Key Components
1. **Image Display Area** - 120x120px bordered container with placeholder icon
2. **Upload Button** - Accessible button with upload icon and label
3. **Remove Button** - Appears after upload, allows image deletion
4. **File Input** - Hidden but accessible input element
5. **Help Text** - Displays supported formats and size limit

### Accessibility Features
- `aria-label` attributes on all interactive elements
- Screen reader compatible file inputs
- Keyboard navigation support
- Focus indicators for keyboard users
- Semantic HTML structure

## Data Persistence

Images are stored as **base64-encoded data URLs** in the browser's localStorage, integrated with StoryForge's existing data storage system. Your images will persist across sessions as long as you don't clear your browser data.

## Troubleshooting

### Image not uploading
- Check file size (must be under 5MB)
- Ensure file format is JPG, PNG, or GIF
- Try a different image file

### Upload button not appearing
- Refresh the page
- Ensure both HTML and JS files are in the same directory
- Check browser console for errors

### Image quality issues
- Use high-resolution source images
- Images will be scaled to fit 120x120px
- Consider cropping to square aspect ratio before upload

## Support

For issues or questions about the image upload feature, please refer to the test results document included with this delivery.

## Version

**StoryForge v1.0.0** with Image Upload Enhancement
**Last Updated**: January 6, 2026

---

**Developed by**: Elite Front-End and Back-End Engineering Team
**Feature**: Image Upload for Characters and World Building Elements
**Compliance**: 508 and ADA Accessible

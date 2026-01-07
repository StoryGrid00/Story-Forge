// Image Upload Enhancement for StoryForge
// This script adds image upload functionality to Characters and World Building elements

(function() {
  'use strict';
  
  // Wait for React to render
  function waitForReact() {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        const root = document.getElementById('root');
        if (root && root.children.length > 0) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  }
  
  // Add image upload UI to character cards
  function enhanceCharacterCards() {
    // Find all character cards
    const characterCards = document.querySelectorAll('[data-slot="card"]');
    
    characterCards.forEach((card) => {
      // Check if this is a character card (has role, age, gender inputs)
      const hasCharacterFields = card.querySelector('input[placeholder*="Role"]') || 
                                  card.querySelector('input[placeholder*="Protagonist"]');
      
      if (!hasCharacterFields) return;
      
      // Check if image upload already exists
      if (card.querySelector('.character-image-upload')) return;
      
      // Get the character header section
      const cardHeader = card.querySelector('[data-slot="card-header"]');
      if (!cardHeader) return;
      
      // Create image upload container
      const imageContainer = document.createElement('div');
      imageContainer.className = 'character-image-upload flex items-start gap-4 mb-4';
      
      // Create image display area (left-aligned)
      const imageDisplay = document.createElement('div');
      imageDisplay.className = 'character-image-display flex-shrink-0';
      imageDisplay.style.cssText = 'width: 120px; height: 120px; border: 2px dashed var(--border); border-radius: 8px; overflow: hidden; background: var(--muted); display: flex; align-items: center; justify-content: center;';
      
      const placeholderIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      placeholderIcon.setAttribute('width', '48');
      placeholderIcon.setAttribute('height', '48');
      placeholderIcon.setAttribute('viewBox', '0 0 24 24');
      placeholderIcon.setAttribute('fill', 'none');
      placeholderIcon.setAttribute('stroke', 'currentColor');
      placeholderIcon.setAttribute('stroke-width', '2');
      placeholderIcon.style.color = 'var(--muted-foreground)';
      placeholderIcon.innerHTML = '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>';
      
      imageDisplay.appendChild(placeholderIcon);
      
      // Create upload button container
      const uploadContainer = document.createElement('div');
      uploadContainer.className = 'flex-1 flex flex-col gap-2';
      
      // Create file input (hidden)
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.className = 'sr-only';
      fileInput.id = `character-image-${Date.now()}`;
      fileInput.setAttribute('aria-label', 'Upload character image');
      
      // Create upload button (ADA/508 compliant)
      const uploadButton = document.createElement('button');
      uploadButton.type = 'button';
      uploadButton.className = 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2';
      uploadButton.setAttribute('aria-label', 'Choose character image file');
      uploadButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" x2="12" y1="3" y2="15"/>
        </svg>
        <span>Upload Image</span>
      `;
      
      // Create remove button (initially hidden)
      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.className = 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-destructive hover:text-destructive-foreground h-9 px-4 py-2';
      removeButton.style.display = 'none';
      removeButton.setAttribute('aria-label', 'Remove character image');
      removeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 6h18"/>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
        <span>Remove</span>
      `;
      
      // Create help text
      const helpText = document.createElement('p');
      helpText.className = 'text-xs text-muted-foreground';
      helpText.textContent = 'JPG, PNG, GIF up to 5MB';
      
      // Handle file selection
      fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert('Please select an image file');
          return;
        }
        
        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Image size must be less than 5MB');
          return;
        }
        
        // Read and display image
        const reader = new FileReader();
        reader.onload = function(event) {
          // Clear placeholder
          imageDisplay.innerHTML = '';
          
          // Create and add image
          const img = document.createElement('img');
          img.src = event.target.result;
          img.alt = 'Character image';
          img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
          imageDisplay.appendChild(img);
          
          // Show remove button
          removeButton.style.display = 'inline-flex';
          
          // Store image data (you can integrate this with your state management)
          imageDisplay.dataset.imageData = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      
      // Handle upload button click
      uploadButton.addEventListener('click', () => {
        fileInput.click();
      });
      
      // Handle remove button click
      removeButton.addEventListener('click', () => {
        // Clear image
        imageDisplay.innerHTML = '';
        imageDisplay.appendChild(placeholderIcon.cloneNode(true));
        
        // Hide remove button
        removeButton.style.display = 'none';
        
        // Clear file input
        fileInput.value = '';
        
        // Clear stored data
        delete imageDisplay.dataset.imageData;
      });
      
      // Assemble the UI
      uploadContainer.appendChild(uploadButton);
      uploadContainer.appendChild(removeButton);
      uploadContainer.appendChild(helpText);
      
      imageContainer.appendChild(imageDisplay);
      imageContainer.appendChild(uploadContainer);
      imageContainer.appendChild(fileInput);
      
      // Insert at the top of the card content
      const cardContent = card.querySelector('[data-slot="card-content"]');
      if (cardContent) {
        cardContent.insertBefore(imageContainer, cardContent.firstChild);
      }
    });
  }
  
  // Add image upload UI to world building elements
  function enhanceWorldBuildingElements() {
    // Find all world building cards (locations, cultures, etc.)
    const worldCards = document.querySelectorAll('[data-slot="card"]');
    
    worldCards.forEach((card) => {
      // Check if this is a world building card
      const hasWorldFields = card.querySelector('textarea[placeholder*="Terrain"]') ||  // Location
                             card.querySelector('textarea[placeholder*="value most"]') ||  // Culture  
                             card.querySelector('textarea[placeholder*="Source of Power"]') ||  // Magic System (also matches "Where does the magic come from?")
                             card.querySelector('textarea[placeholder*="Where does the magic come from"]') ||  // Magic System alternate
                             card.querySelector('textarea[placeholder*="What is it? How does it look"]') ||  // Technology
                             card.querySelector('textarea[placeholder*="Brief overview"]') ||  // Historical Event
                             card.querySelector('textarea[placeholder*="In-depth information"]');  // Custom Element or Historical Event
      
      if (!hasWorldFields) return;
      
      // Check if image upload already exists
      if (card.querySelector('.world-element-image-upload')) return;
      
      // Get the card content section
      const cardContent = card.querySelector('[data-slot="card-content"]');
      if (!cardContent) return;
      
      // Create image upload container (similar to character but adapted)
      const imageContainer = document.createElement('div');
      imageContainer.className = 'world-element-image-upload flex items-start gap-4 mb-4 pb-4 border-b border-border';
      
      // Create image display area
      const imageDisplay = document.createElement('div');
      imageDisplay.className = 'world-element-image-display flex-shrink-0';
      imageDisplay.style.cssText = 'width: 120px; height: 120px; border: 2px dashed var(--border); border-radius: 8px; overflow: hidden; background: var(--muted); display: flex; align-items: center; justify-content: center;';
      
      const placeholderIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      placeholderIcon.setAttribute('width', '48');
      placeholderIcon.setAttribute('height', '48');
      placeholderIcon.setAttribute('viewBox', '0 0 24 24');
      placeholderIcon.setAttribute('fill', 'none');
      placeholderIcon.setAttribute('stroke', 'currentColor');
      placeholderIcon.setAttribute('stroke-width', '2');
      placeholderIcon.style.color = 'var(--muted-foreground)';
      placeholderIcon.innerHTML = '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>';
      
      imageDisplay.appendChild(placeholderIcon);
      
      // Create upload controls
      const uploadContainer = document.createElement('div');
      uploadContainer.className = 'flex-1 flex flex-col gap-2';
      
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.className = 'sr-only';
      fileInput.id = `world-element-image-${Date.now()}`;
      fileInput.setAttribute('aria-label', 'Upload element image');
      
      const uploadButton = document.createElement('button');
      uploadButton.type = 'button';
      uploadButton.className = 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2';
      uploadButton.setAttribute('aria-label', 'Choose element image file');
      uploadButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" x2="12" y1="3" y2="15"/>
        </svg>
        <span>Upload Image</span>
      `;
      
      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.className = 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-destructive hover:text-destructive-foreground h-9 px-4 py-2';
      removeButton.style.display = 'none';
      removeButton.setAttribute('aria-label', 'Remove element image');
      removeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 6h18"/>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
        <span>Remove</span>
      `;
      
      const helpText = document.createElement('p');
      helpText.className = 'text-xs text-muted-foreground';
      helpText.textContent = 'Add a reference image (JPG, PNG, GIF up to 5MB)';
      
      // Event handlers (same as character cards)
      fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        if (!file.type.startsWith('image/')) {
          alert('Please select an image file');
          return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
          alert('Image size must be less than 5MB');
          return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
          imageDisplay.innerHTML = '';
          const img = document.createElement('img');
          img.src = event.target.result;
          img.alt = 'Element reference image';
          img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
          imageDisplay.appendChild(img);
          removeButton.style.display = 'inline-flex';
          imageDisplay.dataset.imageData = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      
      uploadButton.addEventListener('click', () => fileInput.click());
      
      removeButton.addEventListener('click', () => {
        imageDisplay.innerHTML = '';
        imageDisplay.appendChild(placeholderIcon.cloneNode(true));
        removeButton.style.display = 'none';
        fileInput.value = '';
        delete imageDisplay.dataset.imageData;
      });
      
      // Assemble UI
      uploadContainer.appendChild(uploadButton);
      uploadContainer.appendChild(removeButton);
      uploadContainer.appendChild(helpText);
      
      imageContainer.appendChild(imageDisplay);
      imageContainer.appendChild(uploadContainer);
      imageContainer.appendChild(fileInput);
      
      // Insert at the top of card content
      cardContent.insertBefore(imageContainer, cardContent.firstChild);
    });
  }
  
  // Main initialization
  async function init() {
    await waitForReact();
    
    // Initial enhancement
    enhanceCharacterCards();
    enhanceWorldBuildingElements();
    
    // Set up mutation observer to handle dynamically added cards
    const observer = new MutationObserver((mutations) => {
      let shouldEnhance = false;
      
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && (node.matches('[data-slot="card"]') || node.querySelector('[data-slot="card"]'))) {
            shouldEnhance = true;
          }
        });
      });
      
      if (shouldEnhance) {
        setTimeout(() => {
          enhanceCharacterCards();
          enhanceWorldBuildingElements();
        }, 100);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

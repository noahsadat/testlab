// UI Library - Button Components JavaScript (Simplified)

class UIButton {
  constructor() {
    this.init();
  }

  init() {
    this.addRippleEffect();
    this.addKeyboardNavigation();
    this.addAccessibilityFeatures();
  }

  // Add ripple click effect
  addRippleEffect() {
    document.addEventListener('click', (event) => {
      const button = event.target.closest('.ui-btn');
      if (button) {
        this.createRipple(event, button);
      }
    });
  }

  createRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      z-index: 1;
    `;

    // Add CSS animation if not already present
    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Add keyboard navigation support
  addKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        const button = event.target.closest('.ui-btn');
        if (button) {
          event.preventDefault();
          button.click();
          this.createRipple(event, button);
        }
      }
    });
  }

  // Add accessibility features
  addAccessibilityFeatures() {
    document.addEventListener('DOMContentLoaded', () => {
      const buttons = документ.querySelectorAll('.ui-btn');
      
      buttons.forEach(button => {
        // Ensure proper ARIA attributes
        if (!button.hasAttribute('aria-label') && !button.textContent.trim()) {
          button.setAttribute('aria-label', 'Button');
        }

        // Add role if not present
        if (!button.hasAttribute('role')) {
          button.setAttribute('role', 'button');
        }

        // Make disabled buttons truly inaccessible
        if (button.disabled) {
          button.setAttribute('aria-disabled', 'true');
          button.setAttribute('tabindex', '-1');
        }
      });
    });
  }
}

// Enhanced button factory function
const createButton = (options = {}) => {
  const {
    text = 'Button',
    variant = 'default',
    className = '',
    onClick = null,
    disabled = false,
    loading = false,
    icon = null,
    iconPosition = 'left'
  } = options;

  const button = document.createElement('button');
  
  // Set button class based on variant
  const variantMap = {
    'default': 'ui-btn-default',
    'secondary': 'ui-btn-secondary', 
    'destructive': 'ui-btn-destructive',
    'outline': 'ui-btn-outline',
    'ghost': 'ui-btn-ghost',
    'link': 'ui-btn-link'
  };
  
  button.className = `ui-btn ${variantMap[variant] || variantMap['default']}`;
  
  if (className) {
    button.classList.add(...className.split(' '));
  }

  if (loading) {
    button.classList.add('ui-btn-loading');
    button.disabled = true;
  }

  button.disabled = disabled;

  // Add icon support
  if (icon) {
    const iconElement = document.createElement('span');
    iconElement.innerHTML = icon;
    iconElement.className = 'ui-btn-icon';
    
    const contentSpan = document.createElement('span');
    contentSpan.className = 'ui-btn-content';
    contentSpan.textContent = text;

    if (iconPosition === 'left') {
      button.appendChild(iconElement);
      button.appendChild(contentSpan);
    } else {
      button.appendChild(contentSpan);
      button.appendChild(iconElement);
    }
  } else {
    const contentSpan = document.createElement('span');
    contentSpan.className = 'ui-btn-content';
    contentSpan.textContent = text;
    button.appendChild(contentSpan);
  }

  if (onClick) {
    button.addEventListener('click', onClick);
  }

  return button;
};

// Specialized button creators for common use cases
const createLoadingButton = (text, variant = 'default', onClick = null) => {
  return createButton({
    text,
    variant,
    onClick,
    loading: true
  });
};

const createIconButton = (text, icon, variant = 'default', onClick = null) => {
  return createButton({
    text,
    variant,
    icon,
    onClick
  });
};

const toggleButtonLoading = (button, isLoading) => {
  if (isLoading) {
    button.classList.add('ui-btn-loading');
    button.disabled = true;
  } else {
    button.classList.remove('ui-btn-loading');
    button.disabled = false;
  }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    UIButton, 
    createButton, 
    createLoadingButton,
    createIconButton,
    toggleButtonLoading
  };
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new UIButton();
});

// Global exposure for direct usage
window.UIButton = UIButton;
window.createButton = createButton;
window.createLoadingButton = createLoadingButton;
window.createIconButton = createIconButton;
window.toggleButtonLoading = toggleButtonLoading;
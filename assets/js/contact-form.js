/**
 * Contact Form Enhancement Script
 * Provides client-side validation, UX improvements, and form handling
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Form field references
    const fields = {
        topic: form.querySelector('#topic'),
        firstName: form.querySelector('#firstName'),
        lastName: form.querySelector('#lastName'),
        email: form.querySelector('#email'),
        phone: form.querySelector('#phone'),
        message: form.querySelector('#message'),
        privacy: form.querySelector('#privacy')
    };

    // Validation rules
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-ZäöüÄÖÜß\s-]+$/,
            message: 'Please enter a valid first name (min. 2 characters)'
        },
        lastName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-ZäöüÄÖÜß\s-]+$/,
            message: 'Please enter a valid last name (min. 2 characters)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: false,
            pattern: /^[\d\s+()-]*$/,
            message: 'Please enter a valid phone number'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'Please enter a message (min. 10 characters)'
        }
    };

    // Add floating label effect
    Object.values(fields).forEach(field => {
        if (field) {
            field.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            field.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
                validateField(this);
            });

            // Check on load if field has value
            if (field.value) {
                field.parentElement.classList.add('focused');
            }
        }
    });

    // Field validation function
    function validateField(field) {
        const fieldName = field.name.replace('_', '');
        const rule = validationRules[fieldName];
        
        if (!rule) return true;

        const parent = field.parentElement;
        const existingError = parent.querySelector('.error-message');
        
        // Remove existing error
        if (existingError) {
            existingError.remove();
        }
        parent.classList.remove('error');

        let isValid = true;
        let errorMessage = '';

        // Check required
        if (rule.required && !field.value.trim()) {
            isValid = false;
            errorMessage = `This field is required`;
        }
        // Check minLength
        else if (rule.minLength && field.value.length < rule.minLength) {
            isValid = false;
            errorMessage = rule.message;
        }
        // Check pattern
        else if (rule.pattern && field.value && !rule.pattern.test(field.value)) {
            isValid = false;
            errorMessage = rule.message;
        }

        // Show error if invalid
        if (!isValid) {
            parent.classList.add('error');
            const errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            parent.appendChild(errorElement);
        }

        return isValid;
    }

    // Form submission handler
    form.addEventListener('submit', function(e) {
        let isFormValid = true;

        // Validate all required fields
        Object.entries(fields).forEach(([name, field]) => {
            if (field && validationRules[name]) {
                const isFieldValid = validateField(field);
                if (!isFieldValid) {
                    isFormValid = false;
                }
            }
        });

        // Check privacy checkbox
        if (!fields.privacy.checked) {
            e.preventDefault();
            showNotification('Please accept the Privacy Policy and Terms & Conditions', 'error');
            fields.privacy.parentElement.classList.add('shake');
            setTimeout(() => {
                fields.privacy.parentElement.classList.remove('shake');
            }, 500);
            return false;
        }

        // Check topic selection
        if (!fields.topic.value) {
            e.preventDefault();
            showNotification('Please select a topic for your inquiry', 'error');
            fields.topic.focus();
            return false;
        }

        if (!isFormValid) {
            e.preventDefault();
            showNotification('Please correct the errors in the form', 'error');
            
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return false;
        }

        // Show loading state
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Track form submission
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'Contact',
                'event_label': fields.topic.value
            });
        }
    });

    // Phone number formatting
    if (fields.phone) {
        fields.phone.addEventListener('input', function(e) {
            // Remove non-numeric characters for validation
            let value = e.target.value.replace(/\D/g, '');
            
            // Swiss phone number format
            if (value.startsWith('41')) {
                if (value.length > 2) {
                    value = '+41 ' + value.substring(2);
                }
                if (value.length > 6) {
                    value = value.substring(0, 6) + ' ' + value.substring(6);
                }
                if (value.length > 10) {
                    value = value.substring(0, 10) + ' ' + value.substring(10);
                }
                if (value.length > 13) {
                    value = value.substring(0, 13) + ' ' + value.substring(13, 15);
                }
            }
            
            // Only update if changed to prevent cursor jump
            if (e.target.value !== value) {
                e.target.value = value;
            }
        });
    }

    // Character counter for message
    if (fields.message) {
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.textContent = '0 / 2000';
        fields.message.parentElement.appendChild(charCounter);

        fields.message.addEventListener('input', function() {
            const length = this.value.length;
            charCounter.textContent = `${length} / 2000`;
            
            if (length > 1800) {
                charCounter.style.color = '#dc3545';
            } else if (length > 1500) {
                charCounter.style.color = '#ffc107';
            } else {
                charCounter.style.color = '#666';
            }
        });
    }

    // Topic change handler - Update form based on selected topic
    if (fields.topic) {
        fields.topic.addEventListener('change', function() {
            const topic = this.value;
            const projectTypeField = form.querySelector('#projectType').parentElement;
            const budgetField = form.querySelector('#budget').parentElement;
            
            // Show/hide relevant fields based on topic
            if (topic.includes('Job') || topic.includes('Freelance')) {
                projectTypeField.style.display = 'block';
                budgetField.style.display = 'none';
            } else if (topic.includes('General') || topic.includes('Tutorial')) {
                projectTypeField.style.display = 'none';
                budgetField.style.display = 'none';
            } else {
                projectTypeField.style.display = 'block';
                budgetField.style.display = 'block';
            }
        });
    }

    // Notification function
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Auto-save form data to localStorage
    let autoSaveTimeout;
    form.addEventListener('input', function() {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                if (key !== 'privacy_accepted' && key !== '_captcha' && key !== '_template' && key !== '_next') {
                    data[key] = value;
                }
            });
            localStorage.setItem('contactFormData', JSON.stringify(data));
            console.log('Form data auto-saved');
        }, 1000);
    });

    // Restore saved form data
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.entries(data).forEach(([key, value]) => {
                const field = form.elements[key];
                if (field) {
                    field.value = value;
                    if (value) {
                        field.parentElement.classList.add('focused');
                    }
                }
            });
            console.log('Form data restored from auto-save');
        } catch (e) {
            console.error('Error restoring form data:', e);
        }
    }

    // Clear saved data on successful submission
    if (window.location.search.includes('success=1')) {
        localStorage.removeItem('contactFormData');
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to submit
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && document.activeElement.form === form) {
            form.requestSubmit();
        }
        // Escape to close modals
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                }
            });
        }
    });
});

// Add CSS for notifications and animations
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 10000;
        max-width: 350px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-error {
        border-left: 4px solid #dc3545;
    }
    
    .notification-error i {
        color: #dc3545;
    }
    
    .notification-info {
        border-left: 4px solid #667eea;
    }
    
    .notification-info i {
        color: #667eea;
    }
    
    .error-message {
        display: block;
        color: #dc3545;
        font-size: 0.85rem;
        margin-top: 5px;
    }
    
    .form-group.error input,
    .form-group.error textarea,
    .form-group.error select {
        border-color: #dc3545;
    }
    
    .char-counter {
        text-align: right;
        font-size: 0.85rem;
        color: #666;
        margin-top: 5px;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    .shake {
        animation: shake 0.5s ease;
    }
`;
document.head.appendChild(style);
// Intake Form Multi-Step Logic

let currentStep = 1;
const totalSteps = 4;

// Step Navigation
function nextStep(step) {
    // Validate current step before proceeding
    if (!validateStep(currentStep)) {
        return;
    }

    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.progress-step:nth-child(${currentStep})`).classList.remove('active');
    document.querySelector(`.progress-step:nth-child(${currentStep})`).classList.add('completed');

    // Show next step
    currentStep = step;
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
    document.querySelector(`.progress-step:nth-child(${step})`).classList.add('active');

    // Update progress indicator
    updateProgress(step);

    // Scroll to top of form
    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function prevStep(step) {
    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.progress-step:nth-child(${currentStep})`).classList.remove('active');

    // Show previous step
    currentStep = step;
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
    document.querySelector(`.progress-step:nth-child(${step})`).classList.add('active');

    // Update progress indicator
    updateProgress(step);

    // Scroll to top of form
    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateProgress(step) {
    // Update progress circles
    for (let i = 1; i <= totalSteps; i++) {
        const progressStep = document.querySelector(`.progress-step:nth-child(${i})`);
        if (i < step) {
            progressStep.classList.add('completed');
            progressStep.classList.remove('active');
        } else if (i === step) {
            progressStep.classList.add('active');
            progressStep.classList.remove('completed');
        } else {
            progressStep.classList.remove('active', 'completed');
        }
    }
}

// Form Validation
function validateStep(step) {
    const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            showFieldError(field, 'This field is required');
        } else {
            clearFieldError(field);
        }

        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                showFieldError(field, 'Please enter a valid email address');
            }
        }
    });

    // Checkbox validation for step 4 (consent)
    if (step === 4) {
        const consentCheckbox = currentStepElement.querySelector('#consent');
        if (consentCheckbox && !consentCheckbox.checked) {
            isValid = false;
            alert('Please agree to receive a proposal via email');
        }
    }

    return isValid;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');

    // Check if error message already exists
    let errorMessage = formGroup.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message active';
        field.parentNode.insertBefore(errorMessage, field.nextSibling);
    }
    errorMessage.textContent = message;
    errorMessage.classList.add('active');
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');

    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Form Submission
document.getElementById('intakeForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate final step
    if (!validateStep(4)) {
        return;
    }

    // Get form data
    const formData = new FormData(this);
    const email = formData.get('email');

    // Show loading state on submit button
    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;

    // Submit form (using Formspree or your backend)
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Hide form
            document.getElementById('intakeForm').style.display = 'none';

            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.add('active');

            // Display user's email in success message
            document.getElementById('emailDisplay').textContent = email;

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show error message
        alert('There was an error submitting the form. Please try again or email us directly at contact@ai-techart.com');
        console.error('Form submission error:', error);
    });
});

// Real-time validation
document.querySelectorAll('#intakeForm input, #intakeForm select, #intakeForm textarea').forEach(field => {
    field.addEventListener('blur', function() {
        if (this.hasAttribute('required') && this.value.trim()) {
            clearFieldError(this);
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set first step as active
    updateProgress(1);
});

// FAQ Accordion and Category Switching

// Category Switching
document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const category = this.dataset.category;

        // Update active tab
        document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // Update active category section
        document.querySelectorAll('.faq-category-section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelector(`.faq-category-section[data-category="${category}"]`).classList.add('active');

        // Close all open questions when switching categories
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('open');
        });

        // Scroll to FAQ content
        document.querySelector('.faq-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Question Toggle (Accordion)
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isOpen = faqItem.classList.contains('open');

        // Accordion behavior: Close other open questions in the same category
        const currentCategory = faqItem.closest('.faq-category-section');
        currentCategory.querySelectorAll('.faq-item.open').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('open');
            }
        });

        // Toggle current question
        if (isOpen) {
            faqItem.classList.remove('open');
        } else {
            faqItem.classList.add('open');
        }
    });
});

// Deep Linking Support (Optional - for linking to specific questions)
function checkURLHash() {
    const hash = window.location.hash;
    if (hash) {
        // Remove # from hash
        const target = hash.substring(1);

        // Check if it's a category
        const categoryTab = document.querySelector(`.category-tab[data-category="${target}"]`);
        if (categoryTab) {
            categoryTab.click();
        }

        // Check if it's a specific question ID
        const questionElement = document.getElementById(target);
        if (questionElement && questionElement.closest('.faq-item')) {
            const faqItem = questionElement.closest('.faq-item');
            const category = faqItem.closest('.faq-category-section').dataset.category;

            // Switch to correct category
            const categoryTab = document.querySelector(`.category-tab[data-category="${category}"]`);
            if (categoryTab) {
                categoryTab.click();
            }

            // Open the question
            setTimeout(() => {
                faqItem.classList.add('open');
                faqItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Check for URL hash on page load
    checkURLHash();

    // Check for URL hash on hash change
    window.addEventListener('hashchange', checkURLHash);
});

// Optional: Search functionality (if you want to add a search box)
function searchFAQ(query) {
    const searchTerm = query.toLowerCase().trim();
    let foundCount = 0;

    document.querySelectorAll('.faq-item').forEach(item => {
        const questionText = item.querySelector('.faq-question span').textContent.toLowerCase();
        const answerText = item.querySelector('.faq-answer-content').textContent.toLowerCase();

        if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
            item.style.display = 'block';
            foundCount++;

            // Highlight search term (optional)
            if (searchTerm.length > 0) {
                item.classList.add('search-match');
            }
        } else {
            item.style.display = 'none';
        }
    });

    // Show/hide no results message
    const noResultsMsg = document.querySelector('.no-results');
    if (noResultsMsg) {
        if (foundCount === 0 && searchTerm.length > 0) {
            noResultsMsg.classList.add('active');
        } else {
            noResultsMsg.classList.remove('active');
        }
    }
}

// If you add a search input, uncomment this:
/*
document.querySelector('.faq-search input')?.addEventListener('input', function(e) {
    searchFAQ(e.target.value);
});
*/

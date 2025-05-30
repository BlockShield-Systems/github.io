// File Automation Tools Preview - Interactive Demo

document.addEventListener('DOMContentLoaded', function() {
    initToolSelector();
    initDuplicateDetector();
    initBatchResizer();
    initFileRenamer();
    initTextCorrector();
    
    console.log('Tool preview initialized');
});

// Tool selector functionality
function initToolSelector() {
    const toolButtons = document.querySelectorAll('.tool-btn');
    const toolSections = document.querySelectorAll('.tool-section');
    
    toolButtons.forEach(button => {
        button.addEventListener('click', () => {
            const toolId = button.getAttribute('data-tool');
            
            // Update active button
            toolButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding tool section
            toolSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === toolId) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// Duplicate Detector Tool
function initDuplicateDetector() {
    const inputArea = document.getElementById('duplicateInput');
    const fileInput = document.getElementById('duplicateFileInput');
    const fileList = document.getElementById('duplicateFileList');
    const detectButton = document.getElementById('detectDuplicates');
    const resultsArea = document.getElementById('duplicateResults');
    
    let uploadedFiles = [];
    
    // File input handlers
    inputArea.addEventListener('click', () => fileInput.click());
    inputArea.addEventListener('dragover', handleDragOver);
    inputArea.addEventListener('drop', handleFileDrop);
    
    fileInput.addEventListener('change', (e) => {
        handleFiles(Array.from(e.target.files));
    });
    
    detectButton.addEventListener('click', processDuplicateDetection);
    
    function handleDragOver(e) {
        e.preventDefault();
        inputArea.classList.add('dragover');
    }
    
    function handleFileDrop(e) {
        e.preventDefault();
        inputArea.classList.remove('dragover');
        
        const files = Array.from(e.dataTransfer.files).filter(file => 
            file.type.startsWith('image/')
        );
        
        if (files.length > 0) {
            handleFiles(files);
        }
    }
    
    function handleFiles(files) {
        uploadedFiles = files;
        displayFileList(files, fileList);
        detectButton.disabled = files.length === 0;
    }
    
    function processDuplicateDetection() {
        if (uploadedFiles.length < 2) {
            showMessage(resultsArea, 'Need at least 2 images to detect duplicates', 'error');
            return;
        }
        
        detectButton.disabled = true;
        detectButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        // Simulate processing
        setTimeout(() => {
            const duplicates = simulateDuplicateDetection(uploadedFiles);
            displayDuplicateResults(duplicates);
            
            detectButton.disabled = false;
            detectButton.innerHTML = '<i class="fas fa-search"></i> Detect Duplicates';
        }, 2000);
    }
    
    function simulateDuplicateDetection(files) {
        // Simulate finding duplicates based on filename similarity
        const duplicatePairs = [];
        
        for (let i = 0; i < files.length; i++) {
            for (let j = i + 1; j < files.length; j++) {
                const file1 = files[i];
                const file2 = files[j];
                
                // Simple similarity check for demo purposes
                if (file1.size === file2.size || 
                    file1.name.toLowerCase().includes('copy') ||
                    file2.name.toLowerCase().includes('copy') ||
                    Math.random() < 0.3) {
                    
                    duplicatePairs.push({
                        file1: file1,
                        file2: file2,
                        similarity: (85 + Math.random() * 15).toFixed(1)
                    });
                }
            }
        }
        
        return duplicatePairs;
    }
    
    function displayDuplicateResults(duplicates) {
        if (duplicates.length === 0) {
            showMessage(resultsArea, 'No duplicates found! All images are unique.', 'success');
            return;
        }
        
        let html = `<h3>Found ${duplicates.length} duplicate pair(s):</h3>`;
        
        duplicates.forEach((pair, index) => {
            html += `
                <div class="duplicate-pair">
                    <div class="duplicate-files">
                        <div>
                            <strong>${pair.file1.name}</strong><br>
                            <span class="file-size">${formatFileSize(pair.file1.size)}</span>
                        </div>
                        <div style="text-align: center;">
                            <i class="fas fa-arrows-alt-h"></i><br>
                            <span style="font-weight: bold; color: var(--accent-color);">${pair.similarity}% similar</span>
                        </div>
                        <div>
                            <strong>${pair.file2.name}</strong><br>
                            <span class="file-size">${formatFileSize(pair.file2.size)}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        resultsArea.innerHTML = html;
    }
}

// Batch Resizer Tool
function initBatchResizer() {
    const inputArea = document.getElementById('resizerInput');
    const fileInput = document.getElementById('resizerFileInput');
    const fileList = document.getElementById('resizerFileList');
    const resizeButton = document.getElementById('resizeImages');
    const resultsArea = document.getElementById('resizerResults');
    const progressBar = document.getElementById('resizeProgress');
    const qualitySlider = document.getElementById('jpegQuality');
    const qualityValue = document.getElementById('qualityValue');
    
    let uploadedFiles = [];
    
    // Quality slider update
    qualitySlider.addEventListener('input', () => {
        qualityValue.textContent = qualitySlider.value;
    });
    
    // File input handlers
    inputArea.addEventListener('click', () => fileInput.click());
    inputArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        inputArea.classList.add('dragover');
    });
    inputArea.addEventListener('drop', (e) => {
        e.preventDefault();
        inputArea.classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files).filter(file => 
            file.type.startsWith('image/')
        );
        if (files.length > 0) handleResizerFiles(files);
    });
    
    fileInput.addEventListener('change', (e) => {
        handleResizerFiles(Array.from(e.target.files));
    });
    
    resizeButton.addEventListener('click', processImageResize);
    
    function handleResizerFiles(files) {
        uploadedFiles = files;
        displayFileList(files, fileList);
        resizeButton.disabled = files.length === 0;
    }
    
    function processImageResize() {
        const width = parseInt(document.getElementById('targetWidth').value);
        const height = parseInt(document.getElementById('targetHeight').value);
        const maintainAspect = document.getElementById('maintainAspect').checked;
        const algorithm = document.getElementById('resampleAlgorithm').value;
        const quality = parseInt(qualitySlider.value);
        
        if (!width || !height) {
            showMessage(resultsArea, 'Please specify target dimensions', 'error');
            return;
        }
        
        resizeButton.disabled = true;
        resizeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Resizing...';
        progressBar.style.display = 'block';
        
        // Simulate processing with progress
        let progress = 0;
        const progressFill = progressBar.querySelector('.progress-fill');
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Show results
                setTimeout(() => {
                    displayResizeResults(width, height, algorithm, quality);
                    progressBar.style.display = 'none';
                    resizeButton.disabled = false;
                    resizeButton.innerHTML = '<i class="fas fa-cogs"></i> Resize Images';
                }, 500);
            }
            progressFill.style.width = `${progress}%`;
        }, 200);
    }
    
    function displayResizeResults(width, height, algorithm, quality) {
        let html = `<h3>Resize Complete!</h3>`;
        html += `<p><strong>Settings:</strong> ${width}x${height}, ${algorithm} algorithm, ${quality}% quality</p>`;
        html += `<div style="margin-top: 1rem;">`;
        
        uploadedFiles.forEach(file => {
            const originalSize = formatFileSize(file.size);
            const estimatedNewSize = formatFileSize(file.size * 0.6); // Estimate
            
            html += `
                <div class="rename-preview">
                    <div>${file.name} (${originalSize})</div>
                    <div class="arrow">→</div>
                    <div>${file.name.replace(/\.[^/.]+$/, '')}_resized.jpg (${estimatedNewSize})</div>
                </div>
            `;
        });
        
        html += `</div>`;
        resultsArea.innerHTML = html;
    }
}

// File Renamer Tool
function initFileRenamer() {
    const inputArea = document.getElementById('renamerInput');
    const fileInput = document.getElementById('renamerFileInput');
    const fileList = document.getElementById('renamerFileList');
    const renameButton = document.getElementById('renameFiles');
    const resultsArea = document.getElementById('renamerResults');
    const previewCheckbox = document.getElementById('previewOnly');
    const renameButtonText = document.getElementById('renameButtonText');
    
    let uploadedFiles = [];
    
    // Update button text based on preview mode
    previewCheckbox.addEventListener('change', () => {
        renameButtonText.textContent = previewCheckbox.checked ? 'Preview Rename' : 'Rename Files';
    });
    
    // File input handlers
    inputArea.addEventListener('click', () => fileInput.click());
    inputArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        inputArea.classList.add('dragover');
    });
    inputArea.addEventListener('drop', (e) => {
        e.preventDefault();
        inputArea.classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) handleRenamerFiles(files);
    });
    
    fileInput.addEventListener('change', (e) => {
        handleRenamerFiles(Array.from(e.target.files));
    });
    
    renameButton.addEventListener('click', processFileRename);
    
    function handleRenamerFiles(files) {
        uploadedFiles = files;
        displayFileList(files, fileList);
        renameButton.disabled = files.length === 0;
    }
    
    function processFileRename() {
        const prefix = document.getElementById('namePrefix').value || 'file_';
        const pattern = document.getElementById('numberingPattern').value;
        const preserveExt = document.getElementById('preserveExtension').checked;
        const handleCollisions = document.getElementById('handleCollisions').checked;
        const previewOnly = document.getElementById('previewOnly').checked;
        
        const renames = generateRenames(uploadedFiles, prefix, pattern, preserveExt, handleCollisions);
        displayRenameResults(renames, previewOnly);
    }
    
    function generateRenames(files, prefix, pattern, preserveExt, handleCollisions) {
        const renames = [];
        const usedNames = new Set();
        
        files.forEach((file, index) => {
            let newName = '';
            
            switch (pattern) {
                case 'sequential':
                    newName = `${prefix}${index + 1}`;
                    break;
                case 'padded':
                    newName = `${prefix}${String(index + 1).padStart(3, '0')}`;
                    break;
                case 'timestamp':
                    newName = `${prefix}${Date.now()}_${index}`;
                    break;
            }
            
            if (preserveExt) {
                const ext = file.name.split('.').pop();
                newName += `.${ext}`;
            }
            
            // Handle collisions
            if (handleCollisions && usedNames.has(newName)) {
                let counter = 1;
                let baseName = newName;
                const ext = preserveExt ? `.${file.name.split('.').pop()}` : '';
                baseName = baseName.replace(ext, '');
                
                do {
                    newName = `${baseName}_${counter}${ext}`;
                    counter++;
                } while (usedNames.has(newName));
            }
            
            usedNames.add(newName);
            renames.push({
                original: file.name,
                new: newName,
                status: usedNames.has(newName) ? 'duplicate' : 'ok'
            });
        });
        
        return renames;
    }
    
    function displayRenameResults(renames, isPreview) {
        let html = `<h3>${isPreview ? 'Rename Preview' : 'Rename Complete!'}</h3>`;
        
        renames.forEach(rename => {
            html += `
                <div class="rename-preview">
                    <div>${rename.original}</div>
                    <div class="arrow">→</div>
                    <div>${rename.new}</div>
                </div>
            `;
        });
        
        if (isPreview) {
            html += `<p style="margin-top: 1rem; color: var(--text-muted);">
                <i class="fas fa-info-circle"></i> This is a preview. Uncheck "Preview Only" to perform actual rename.
            </p>`;
        }
        
        resultsArea.innerHTML = html;
    }
}

// Text Corrector Tool
function initTextCorrector() {
    const inputText = document.getElementById('inputText');
    const correctButton = document.getElementById('correctText');
    const resultsArea = document.getElementById('correctorResults');
    const confidenceSlider = document.getElementById('confidenceThreshold');
    const confidenceValue = document.getElementById('confidenceValue');
    
    // Confidence slider update
    confidenceSlider.addEventListener('input', () => {
        confidenceValue.textContent = confidenceSlider.value;
    });
    
    correctButton.addEventListener('click', processTextCorrection);
    
    function processTextCorrection() {
        const text = inputText.value.trim();
        const dictionaryType = document.getElementById('dictionaryType').value;
        const threshold = parseInt(confidenceSlider.value);
        
        if (!text) {
            showMessage(resultsArea, 'Please enter some text to check', 'error');
            return;
        }
        
        correctButton.disabled = true;
        correctButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        setTimeout(() => {
            const corrections = simulateTextCorrection(text, dictionaryType, threshold);
            displayCorrectionResults(text, corrections);
            
            correctButton.disabled = false;
            correctButton.innerHTML = '<i class="fas fa-magic"></i> Check & Correct Text';
        }, 1500);
    }
    
    function simulateTextCorrection(text, dictionaryType, threshold) {
        // Common typos and corrections for demo
        const corrections = {
            'teh': 'the',
            'adn': 'and',
            'recieve': 'receive',
            'seperate': 'separate',
            'definately': 'definitely',
            'occured': 'occurred',
            'managment': 'management',
            'sucessful': 'successful',
            'proccessing': 'processing',
            'developement': 'development'
        };
        
        const words = text.split(/\s+/);
        const foundCorrections = [];
        
        words.forEach((word, index) => {
            const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
            
            if (corrections[cleanWord]) {
                foundCorrections.push({
                    original: word,
                    correction: corrections[cleanWord],
                    position: index,
                    confidence: Math.floor(threshold + Math.random() * (100 - threshold))
                });
            }
        });
        
        return foundCorrections;
    }
    
    function displayCorrectionResults(originalText, corrections) {
        if (corrections.length === 0) {
            showMessage(resultsArea, 'No corrections needed! Text looks good.', 'success');
            return;
        }
        
        let html = `<h3>Found ${corrections.length} potential correction(s):</h3>`;
        
        let correctedText = originalText;
        corrections.forEach(correction => {
            correctedText = correctedText.replace(
                new RegExp(`\\b${correction.original}\\b`, 'gi'), 
                correction.correction
            );
            
            html += `
                <div class="status-info" style="margin: 0.5rem 0;">
                    <strong>${correction.original}</strong> → <strong>${correction.correction}</strong>
                    <span style="float: right;">${correction.confidence}% confidence</span>
                </div>
            `;
        });
        
        html += `
            <div style="margin-top: 1.5rem;">
                <h4>Corrected Text:</h4>
                <div style="background: #f8f9fa; padding: 1rem; border-radius: var(--border-radius); border-left: 4px solid var(--secondary-color);">
                    ${correctedText}
                </div>
            </div>
        `;
        
        resultsArea.innerHTML = html;
    }
}

// Utility functions
function displayFileList(files, container) {
    let html = '<h4>Selected Files:</h4>';
    
    files.forEach(file => {
        html += `
            <div class="file-item">
                <div class="file-info">
                    <i class="fas fa-${getFileIcon(file.type)}"></i>
                    <span>${file.name}</span>
                </div>
                <span class="file-size">${formatFileSize(file.size)}</span>
            </div>
        `;
    });
    
    container.innerHTML = html;
    container.style.display = 'block';
}

function getFileIcon(fileType) {
    if (fileType.startsWith('image/')) return 'image';
    if (fileType.startsWith('video/')) return 'video';
    if (fileType.startsWith('audio/')) return 'music';
    if (fileType.includes('pdf')) return 'file-pdf';
    if (fileType.includes('document') || fileType.includes('word')) return 'file-word';
    if (fileType.includes('spreadsheet') || fileType.includes('excel')) return 'file-excel';
    return 'file';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function showMessage(container, message, type) {
    container.innerHTML = `
        <div class="status-message status-${type}">
            <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            ${message}
        </div>
    `;
}

// Add drag and drop visual feedback
document.addEventListener('dragover', (e) => {
    e.preventDefault();
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
});

// Trading Simulator Demo - Self-contained JavaScript implementation
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const chartArea = document.getElementById('chartArea');
    const timeSelect = document.getElementById('timeSelect');
    const orderTypeSelect = document.getElementById('orderType');
    const buyPriceInput = document.getElementById('buyPrice');
    const sellPriceInput = document.getElementById('sellPrice');
    const buyLabel = document.getElementById('buyLabel');
    const sellLabel = document.getElementById('sellLabel');
    const checkButton = document.getElementById('checkButton');
    const infoButton = document.getElementById('infoButton');
    const newDayButton = document.getElementById('newDayButton');
    const feedbackDiv = document.getElementById('feedback');
    const attemptsDiv = document.getElementById('attempts');
    
    // State
    let candleData = [];
    let selectedTime = '';
    let remainingAttempts = 3;
    
    // Generate random price data
    function generateRandomPriceData(basePrice = 85000, volatility = 0.02) {
        // Time points for a 24-hour trading day
        const times = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', 
                     '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
        let currentPrice = basePrice;
        let trend = Math.random() > 0.5 ? 1 : -1;
        
        return times.map((time) => {
            const maxMove = basePrice * volatility;
            const trendInfluence = trend * (Math.random() * maxMove * 0.3);
            const open = currentPrice;
            const close = open + trendInfluence + (Math.random() - 0.5) * maxMove;
            const high = Math.max(open, close) + Math.random() * maxMove * 0.5;
            const low = Math.min(open, close) - Math.random() * maxMove * 0.5;
            
            // Random trend changes (20% chance)
            if (Math.random() < 0.2) trend *= -1;
            currentPrice = close;
            
            return {
                time,
                open: Math.round(open),
                high: Math.round(high),
                low: Math.round(low),
                close: Math.round(close),
                trend: trend
            };
        });
    }
    
    // Analyze market conditions
    function analyzeMarketConditions(candle) {
        const volatility = (candle.high - candle.low) / candle.low;
        const bodySize = Math.abs(candle.close - candle.open) / candle.open;
        
        return {
            isVolatile: volatility > 0.02,
            trend: candle.close > candle.open ? 'bullish' : 'bearish',
            momentum: bodySize > 0.01 ? 'strong' : 'weak'
        };
    }
    
    // Render chart with candles
    function renderChart() {
        // Error handling
        try {
            // Clear chart area
            chartArea.innerHTML = '';
            
            // Calculate price range for scaling
            const allPrices = candleData.flatMap(d => [d.high, d.low]);
            const minPrice = Math.floor(Math.min(...allPrices) / 200) * 200;
            const maxPrice = Math.ceil(Math.max(...allPrices) / 200) * 200;
            
            // Create price axis labels
            const priceAxis = document.querySelector('.price-axis');
            priceAxis.innerHTML = '';
            
            const steps = [];
            const stepSize = 400;
            for (let price = minPrice; price <= maxPrice; price += stepSize) {
                steps.push(price);
                const label = document.createElement('div');
                label.className = 'price-label';
                label.textContent = price.toLocaleString();
                label.style.bottom = `${((price - minPrice) / (maxPrice - minPrice)) * 100}%`;
                priceAxis.appendChild(label);
            }
            
            // Create candles
            candleData.forEach((candle, index) => {
                const candleEl = document.createElement('div');
                candleEl.className = 'candle';
                
                // Wick (high-low line)
                const wickEl = document.createElement('div');
                wickEl.className = 'wick';
                wickEl.style.height = `${((candle.high - candle.low) / (maxPrice - minPrice)) * 100}%`;
                wickEl.style.bottom = `${((candle.low - minPrice) / (maxPrice - minPrice)) * 100}%`;
                
                // Body (open-close rectangle)
                const bodyEl = document.createElement('div');
                bodyEl.className = candle.close > candle.open ? 'body green' : 'body red';
                bodyEl.style.height = `${(Math.abs(candle.close - candle.open) / (maxPrice - minPrice)) * 100}%`;
                bodyEl.style.bottom = `${((Math.min(candle.open, candle.close) - minPrice) / (maxPrice - minPrice)) * 100}%`;
                
                // Time label
                const timeEl = document.createElement('div');
                timeEl.className = 'time-label';
                timeEl.textContent = candle.time;
                
                candleEl.appendChild(wickEl);
                candleEl.appendChild(bodyEl);
                candleEl.appendChild(timeEl);
                chartArea.appendChild(candleEl);
            });
            
            // Populate time select dropdown
            timeSelect.innerHTML = '<option value="">Select time...</option>';
            candleData.forEach(candle => {
                const option = document.createElement('option');
                option.value = candle.time;
                option.textContent = candle.time;
                timeSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error rendering chart:', error);
            showFeedback('error', ['An error occurred while rendering the chart. Please try again.']);
        }
    }
    
    // Update labels based on order type
    function updateOrderTypeLabels() {
        const orderType = orderTypeSelect.value;
        
        if (orderType === 'market') {
            buyPriceInput.disabled = true;
            sellPriceInput.disabled = true;
        } else {
            buyPriceInput.disabled = false;
            sellPriceInput.disabled = false;
            
            if (orderType === 'limit') {
                buyLabel.textContent = 'Buy Price (CHF)';
                sellLabel.textContent = 'Sell Price (CHF)';
            } else if (orderType === 'stopLimit') {
                buyLabel.textContent = 'Stop Price (CHF)';
                sellLabel.textContent = 'Limit Price (CHF)';
            }
        }
    }
    
    // Show feedback
    function showFeedback(type, messages) {
        feedbackDiv.innerHTML = '';
        feedbackDiv.className = `feedback ${type}`;
        
        messages.forEach(message => {
            const p = document.createElement('p');
            p.textContent = message;
            feedbackDiv.appendChild(p);
        });
        
        feedbackDiv.classList.remove('hidden');
        
        // Scroll feedback into view on mobile
        if (window.innerWidth <= 768) {
            feedbackDiv.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Check trading strategy
    function checkStrategy() {
        if (!selectedTime) {
            showFeedback('error', ['Please select a time first.']);
            return;
        }
        
        const selectedCandle = candleData.find(d => d.time === selectedTime);
        if (!selectedCandle) return;
        
        const orderType = orderTypeSelect.value;
        const marketConditions = analyzeMarketConditions(selectedCandle);
        
        switch(orderType) {
            case 'limit':
                const buyValue = parseFloat(buyPriceInput.value);
                const sellValue = parseFloat(sellPriceInput.value);
                const idealBuyZone = selectedCandle.low * 1.01;
                const idealSellZone = selectedCandle.high * 0.99;
                
                if (buyValue && sellValue) {
                    if (buyValue < idealBuyZone && sellValue > idealSellZone) {
                        showFeedback('success', [
                            'Excellent limit order placement!',
                            'Your buy and sell prices are optimally set.'
                        ]);
                    } else {
                        showFeedback('error', [
                            'Reconsider your price levels.',
                            `Ideal buy zone: around ${Math.round(idealBuyZone)} CHF`,
                            `Ideal sell zone: around ${Math.round(idealSellZone)} CHF`
                        ]);
                    }
                } else {
                    showFeedback('error', ['Please enter both buy and sell prices.']);
                    return;
                }
                break;
                
            case 'market':
                if (marketConditions.trend === 'bearish' && marketConditions.momentum === 'strong') {
                    showFeedback('success', [
                        'Perfect timing for a market order!',
                        'The market shows a strong downtrend.'
                    ]);
                } else {
                    showFeedback('error', [
                        'This timing is not optimal for a market order.',
                        'Wait for a stronger trend.'
                    ]);
                }
                break;
                
            case 'stopLimit':
                const stopPrice = parseFloat(buyPriceInput.value);
                const limitPrice = parseFloat(sellPriceInput.value);
                const idealStopDistance = selectedCandle.high * 0.01;
                
                if (stopPrice && limitPrice) {
                    if (stopPrice > limitPrice && (stopPrice - limitPrice) < idealStopDistance) {
                        showFeedback('success', [
                            'Excellent stop-limit configuration!',
                            'The distance between stop and limit is optimal.'
                        ]);
                    } else {
                        showFeedback('error', [
                            'Stop and limit are not optimally set.',
                            `Recommended maximum distance: ${Math.round(idealStopDistance)} CHF`
                        ]);
                    }
                } else {
                    showFeedback('error', ['Please enter both stop and limit prices.']);
                    return;
                }
                break;
        }
        
        remainingAttempts--;
        attemptsDiv.textContent = `Remaining attempts: ${remainingAttempts}`;
        
        if (remainingAttempts <= 0) {
            checkButton.disabled = true;
        }
    }
    
    // Show market info
    function showMarketInfo() {
        if (!selectedTime) {
            showFeedback('warning', ['Please select a time first.']);
            return;
        }
        
        const selectedCandle = candleData.find(d => d.time === selectedTime);
        const conditions = analyzeMarketConditions(selectedCandle);
        
        showFeedback('info', [
            `Market status: ${conditions.trend === 'bullish' ? 'Uptrend' : 'Downtrend'}`,
            `Momentum: ${conditions.momentum === 'strong' ? 'Strong' : 'Weak'}`,
            `Volatility: ${conditions.isVolatile ? 'High' : 'Normal'}`
        ]);
    }
    
    // Start new trading day
    function startNewDay() {
        // Generate new market data
        try {
            candleData = generateRandomPriceData();
            selectedTime = '';
            remainingAttempts = 3;
            
            timeSelect.value = '';
            buyPriceInput.value = '';
            sellPriceInput.value = '';
            feedbackDiv.classList.add('hidden');
            attemptsDiv.textContent = `Remaining attempts: ${remainingAttempts}`;
            checkButton.disabled = false;
            
            renderChart();
        } catch (error) {
            console.error('Error starting new day:', error);
            showFeedback('error', ['An error occurred. Please refresh the page.']);
        }
    }
    
    // Event Listeners
    orderTypeSelect.addEventListener('change', updateOrderTypeLabels);
    
    timeSelect.addEventListener('change', (e) => {
        selectedTime = e.target.value;
    });
    
    checkButton.addEventListener('click', checkStrategy);
    infoButton.addEventListener('click', showMarketInfo);
    newDayButton.addEventListener('click', startNewDay);
    
    // Handle window resize for responsive chart
    window.addEventListener('resize', () => {
        if (candleData.length > 0) {
            renderChart();
        }
    });
    
    // Initialize
    startNewDay();
    updateOrderTypeLabels();
});

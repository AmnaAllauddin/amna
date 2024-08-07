const apiUrl = 'https://v6.exchangerate-api.com/v6/6e4ba8b16098725093b3306e/latest/USD';

// Cache elements
const convertFrom = document.getElementById('convertFrom');
const convertTo = document.getElementById('convertTo');
const button = document.getElementById('button');
const selectFrom = document.getElementById('selectFrom');
const selectTo = document.getElementById('selectTo');

let rates = {};
console.log(convertFrom, convertTo, button, selectFrom, selectTo);

// Fetch exchange rates from the API
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        rates = data.conversion_rates; // Store conversion rates
        // Populate the currency select elements
        populateCurrencyOptions();
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    function populateCurrencyOptions() {
        const currencies = Object.keys(rates);
        console.log('Currencies:', currencies); // Debugging line
    
        // Clear existing options
        selectFrom.innerHTML = '';
        selectTo.innerHTML = '';
    
        // Add default options
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Select a currency';
        defaultOption.value = '';
        selectFrom.appendChild(defaultOption);
        selectTo.appendChild(defaultOption.cloneNode(true));
    
        currencies.forEach(currency => {
            const optionFrom = document.createElement('option');
            optionFrom.value = currency;
            optionFrom.textContent = currency;
            selectFrom.appendChild(optionFrom);
    
            const optionTo = document.createElement('option');
            optionTo.value = currency;
            optionTo.textContent = currency;
            selectTo.appendChild(optionTo);
        });
    
        console.log('Options added'); // Debugging line
    }
    

// Convert currency when button is clicked
button.addEventListener('click', () => {
    const fromAmount = parseFloat(convertFrom.value);
    const fromCurrency = selectFrom.value;
    const toCurrency = selectTo.value;

    if (!rates[fromCurrency] || !rates[toCurrency]) {
        alert('Conversion rate not available.');
        return;
    }

    const conversionRate = rates[toCurrency] / rates[fromCurrency];
    const convertedAmount = fromAmount * conversionRate;

    convertTo.value = convertedAmount.toFixed(2); // Update the "To" field
});

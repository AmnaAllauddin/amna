const apiUrl = 'https://v6.exchangerate-api.com/v6/6e4ba8b16098725093b3306e/latest/USD';

// Cache elements
const convertFrom = document.getElementById('convertFrom');
const convertTo = document.getElementById('convertTo');
const button = document.getElementById('button');
const selectFrom = document.getElementById('selectFrom');
const selectTo = document.getElementById('selectTo');

let rates = {};

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
        populateCurrencyOptions(); // Populate currency options
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Populate the currency select elements
function populateCurrencyOptions() {
    const currencies = Object.keys(rates);

    // Clear existing options
    selectFrom.innerHTML = '';
    selectTo.innerHTML = '';

    // Add default options
    const defaultOptionFrom = document.createElement('option');
    defaultOptionFrom.textContent = 'Select a currency';
    defaultOptionFrom.value = '';
    selectFrom.appendChild(defaultOptionFrom);

    const defaultOptionTo = document.createElement('option');
    defaultOptionTo.textContent = 'Select a currency';
    defaultOptionTo.value = '';
    selectTo.appendChild(defaultOptionTo);

    // Add currency options
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
}

// Convert currency when the button is clicked
button.addEventListener('click', () => {
    const fromAmount = parseFloat(convertFrom.value);
    const fromCurrency = selectFrom.value;
    const toCurrency = selectTo.value;

    if (!fromAmount || !fromCurrency || !toCurrency || !rates[fromCurrency] || !rates[toCurrency]) {
        alert('Please fill out all fields correctly.');
        return;
    }

    const conversionRate = rates[toCurrency] / rates[fromCurrency];
    const convertedAmount = fromAmount * conversionRate;

    convertTo.value = convertedAmount.toFixed(2); // Update the "To" field
});

    

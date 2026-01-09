const num = document.getElementById('numInput');
const numInputBtn = document.getElementById('count');
const clearBtn = document.getElementById('clearCount');
const resultDiv = document.getElementById('countResult');

numInputBtn.addEventListener('click', () => {
    const n = Number(num.value);

    if (isNaN(n) || n < 1) {
        console.error('Please enter a valid positive number.');
        return;
    }

    if (n > 1000) {
        console.warn('Counting to such a high number may affect performance.');
        resultDiv.innerHTML = '';
        num.value = '';
        return;
    }

    let output = ''; 
    for (let i = 1; i <= n; i++) {
        output += ` ${i}<br>`;
        resultDiv.style.color = 'green';
    }

    resultDiv.innerHTML = output; 
});

// Clear count button
clearBtn.addEventListener('click', () => {
    resultDiv.innerHTML = ''; 
    num.value = '';          
});


// 등락률 데이터 출력 로직
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('http://localhost:8000/api/changes');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Process the data and update the HTML table
        const tableBody = document.getElementById('mytable');
        
        data.forEach(stock => {
            // Create a new row for each stock
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${stock.Code}</td>
                <td>${stock.Name}</td>
                <td>${stock.Close}</td>
                <td>${stock.Changes}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('http://localhost:8000/api/changesDown');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Process the data and update the HTML table
        const tableBody = document.getElementById('mytable2');
        
        data.forEach(stock => {
            // Create a new row for each stock
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${stock.Code}</td>
                <td>${stock.Name}</td>
                <td>${stock.Close}</td>
                <td>${stock.Changes}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});


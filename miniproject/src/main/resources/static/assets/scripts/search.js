// 전체 데이터 출력 로직
document.addEventListener('DOMContentLoaded', function() {
    if (document.body.classList.contains('main-page')) {
        fetch(`http://localhost:8000/api/stocks`)
            .then(response => response.json())
            .then(data => updateTableWithAllStocks(data))
            .catch(error => console.error('Error:', error));
    }
});

// 전체 데이터 테이블 업데이트 함수
function updateTableWithAllStocks(data) {
    var tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '';
    data.forEach((stock, index) => {
        var row = `
            <tr>
                <td>${index + 1}</td>
                <td>${stock.Name}</td>
                <td>${stock.Close}</td>
                <td>${stock.Open}</td>
                <td>${stock.High}</td>
                <td>${stock.Low}</td>
                <td>${stock.Volume}</td>
                <td>${stock.Changes}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// 검색 로직
let selectedStockName = ""; // 선택된 주식명 저장

if (document.getElementById('searchButtonSelect')) {
    document.getElementById('searchButtonSelect').addEventListener('click', function(event) {
        event.preventDefault();
        selectedStockName = document.getElementById('stockNameSelect').value;

        fetch(`http://localhost:8000/api/stock?name=${selectedStockName}`)
            .then(response => response.json())
            .then(data => {
                updateTable(data);
            })
            .catch(error => console.error('Error:', error));
    });
}

// 데이터 테이블 업데이트 함수
function updateTable(data) {
    var tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '';
    var row = `
        <tr>
            <td>${data.Name}</td>
            <td>${data.Close}</td>
            <td>${data.Open}</td>
            <td>${data.High}</td>
            <td>${data.Low}</td>
            <td>${data.Volume}</td>
            <td>${data.Changes}</td>
        </tr>
    `;
    tableBody.innerHTML = row;
}

// 더보기 로직
if (document.getElementById('loadMore')) {
    let currentPage = 0;
    document.getElementById('loadMore').addEventListener('click', function() {
        currentPage++;
        fetch(`http://localhost:8000/api/stocks?page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    updateTableWithStocks(data, false);
                } else {
                    alert('더 이상 데이터가 없습니다.');
                    this.style.display = 'none';
                }
            })
            .catch(error => console.error('Error:', error));
    });
}

function updateTableWithStocks(data, clearTable = true) {
    const tableBody = document.querySelector('table tbody');
    if (clearTable) tableBody.innerHTML = ''; // 테이블 초기화
    data.forEach((stock, index) => {
        const absoluteIndex = currentPage * itemsPerPage + index + 1;
        const row = `
            <tr>
                <td>${absoluteIndex}</td>
                <td>${stock.Name}</td>
                <td>${stock.Close}</td>
                <td>${stock.Open}</td>
                <td>${stock.High}</td>
                <td>${stock.Low}</td>
                <td>${stock.Volume}</td>
                <td>${stock.Changes}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// 페이지 버튼 생성 함수
let currentPage = 0;
const itemsPerPage = 20;

function createPagination(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // 기존 내용 초기화

    for (let i = 0; i < totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i + 1; // 페이지 번호
        pageButton.addEventListener('click', function() {
            currentPage = i; // 현재 페이지 번호 업데이트
            fetchPageData(i);
        });
        paginationContainer.appendChild(pageButton);
    }
}

// 페이지 데이터 가져오기 함수
function fetchPageData(pageNumber) {
    fetch(`http://localhost:8000/api/stocks?page=${pageNumber}`)
        .then(response => response.json())
        .then(data => updateTableWithStocks(data))
        .catch(error => console.error('Error:', error));
}

// 페이지네이션 초기화
createPagination(20); // 총 페이지 수를 인자로 전달



// 날짜별 데이터 가져오기 함수 (select.html용)
function fetchStocksByDate(period) {
    if (!selectedStockName) {
        alert('먼저 주식을 검색해 주세요.');
        return;
    }

    fetch(`http://localhost:8000/api/stockData?selectedStockName=${selectedStockName}&period=${period}`)
        .then(response => response.json())
        .then(data => {
            drawChart(data); // 차트 그리기
        })
        .catch(error => console.error('Error:', error));
}

let chartInstance = null; // 차트 인스턴스를 저장하기 위한 전역 변수

function createChart(ctx, labels, dataPoints, backgroundColors) {
    return new Chart(ctx, {
        type: 'line', // 차트의 종류 (예: line, bar, pie 등)
        data: {
            labels: labels,
            datasets: [{
                label: '주식 가격',
                data: dataPoints,
                backgroundColor: backgroundColors,
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// 차트 그리기 함수
function drawChart(data) {
    const ctx = document.getElementById('stockChart').getContext('2d');

    // 기존 차트가 존재한다면 파괴
    if (chartInstance) {
        chartInstance.destroy();
    }

    const labels = data.map(item => item['Date']); // 날짜 데이터
    const dataPoints = data.map(item => item['Close']); // 종가 데이터
    
    const backgroundColors = dataPoints.map((_, index) => {
        if (index >= dataPoints.length - 10) {
            return 'rgba(255, 0, 0, 0.5)'; // 빨간색
        } else {
            return 'rgba(0, 123, 255, 0.5)'; // 파란색
        }
    });
    // 새 차트 생성
    chartInstance = createChart(ctx, labels, dataPoints, backgroundColors);
}


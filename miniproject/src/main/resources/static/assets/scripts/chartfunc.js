// 날짜별 데이터 가져오기 함수
function fetchStocksByDate(period, stockName) {
    fetch(`http://localhost:8000/api/stockData?selectedStockName=${stockName}&period=${period}`)
        .then(response => response.json())
        .then(data => {
            drawChart(data); // 차트 그리기
        })
        .catch(error => console.error('Error:', error));
}

let chartInstance = null; // 차트 인스턴스를 저장하기 위한 전역 변수

// 차트 생성 함수
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
                <td>${stock.Name}</td>
                <td>${stock.Close}</td>
                <td>${stock.Open}</td>
                <td>${stock.High}</td>
                <td>${stock.Low}</td>
                <td>${stock.Volume}</td>
                <td>${stock.Changes}</td>
            </tr>
    `;
    tableBody.innerHTML = row;
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    let selectedStockName = urlParams.get('name');

    if (!selectedStockName) {
        // 세션에 저장된 주식명이 없는 경우 서버에서 주식 목록을 가져옴
        fetch('http://localhost:8000/api/stocks')
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    // 첫 번째 주식을 기본 주식으로 설정
                    selectedStockName = data[0].Name;
                }
                fetchStocksByDate('1week', selectedStockName); // 기본 기간 설정
            })
            .catch(error => console.error('Error:', error));
    } else {
        // 세션에 저장된 주식명이 있는 경우 해당 주식 데이터 로드
        fetchStocksByDate('1week', selectedStockName); // 기본 기간 설정
    }
});


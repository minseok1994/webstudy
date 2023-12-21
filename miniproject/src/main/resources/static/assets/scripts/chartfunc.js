// 날짜별 데이터 가져오기 함수
function fetchStocksByDate(period) {
  let stockName =
    document.getElementById("stockNameSelect").value || selectedStockName;
  if (!stockName) {
    console.error("Stock name is undefined");
    return;
  }

  fetch(
    `http://localhost:8000/api/stockData?selectedStockName=${stockName}&period=${period}`
  )
    .then((response) => response.json())
    .then((data) => {
      drawChart(data);
    })
    .catch((error) => console.error("Error:", error));
}

let chartInstance = null; // 차트 인스턴스를 저장하기 위한 전역 변수

// 차트 생성 함수
function createChart(ctx, labels, dataPoints, backgroundColors) {
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "주식 가격",
          data: dataPoints,
          backgroundColor: backgroundColors,
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 2, // 선의 굵기
          pointRadius: 0, // 점의 크기 (0으로 설정하여 점을 숨김)
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function (value, index, values) {
              return value.toFixed(2); // y 축 레이블 소수점 자릿수 조절
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false, // 범례 숨김
        },
      },
      elements: {
        line: {
          tension: 0.3, // 곡선의 텐션 조절
        },
      },
    },
  });
}

// 차트 그리기 함수
function drawChart(data) {
  const ctx = document.getElementById("stockChart").getContext("2d");
  if (chartInstance) {
    chartInstance.destroy();
  }

  const labels = data.map((item) => item["Date"]);
  const dataPoints = data.map((item) => item["Close"]);
  const backgroundColors = dataPoints.map((_, index) =>
    index >= dataPoints.length - 10
      ? "rgba(255, 0, 0, 0.5)"
      : "rgba(0, 123, 255, 0.5)"
  );

  chartInstance = createChart(ctx, labels, dataPoints, backgroundColors);
}

// 검색 로직
if (document.getElementById("searchButtonSelect")) {
  document
    .getElementById("searchButtonSelect")
    .addEventListener("click", function (event) {
      event.preventDefault();
      selectedStockName = document.getElementById("stockNameSelect").value;
      if (selectedStockName) {
        fetchStocksByDate("3months", selectedStockName); // 기본으로 3달을 기본으로 차트 생성
      } else {
        console.error("No stock name entered");
      }
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  let urlStockName = urlParams.get("name");
  const stockNameHeader = document.getElementById("stockTitle");

  if (!urlStockName) {
    fetch("http://localhost:8000/api/stocks")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          selectedStockName = data[0].Name;
        }
        stockNameHeader.textContent = selectedStockName || "주식 선택 필요";
        fetchStocksByDate("3months", selectedStockName);
      })
      .catch((error) => console.error("Error:", error));
  } else {
    selectedStockName = urlStockName;
    stockNameHeader.textContent = selectedStockName;
    fetchStocksByDate("3months", selectedStockName);
  }
});

if (document.getElementById("searchButtonSelect")) {
  document
    .getElementById("searchButtonSelect")
    .addEventListener("click", function (event) {
      event.preventDefault();
      let inputStockName = document.getElementById("stockNameSelect").value;
      if (inputStockName) {
        selectedStockName = inputStockName;
        document.getElementById("stockTitle").textContent = selectedStockName; // Update h2 content
        fetchStocksByDate("1week", selectedStockName);
      } else {
        console.error("No stock name entered");
      }
    });
}

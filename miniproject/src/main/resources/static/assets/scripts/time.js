
function updateDateTime() {
  const currentDateTime = new Date();

  // 날짜 정보 추출
  const year = currentDateTime.getFullYear();
  const month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDateTime.getDate().toString().padStart(2, '0');

  // 시간 정보 추출
  const hours = currentDateTime.getHours().toString().padStart(2, '0');
  const minutes = currentDateTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentDateTime.getSeconds().toString().padStart(2, '0');

  // HTML에 날짜와 시간 정보 추가
  document.getElementById('date').innerText = `${year}-${month}-${day}`;
  document.getElementById('time').innerText = `${hours}:${minutes}:${seconds}`;
}

// 페이지 로드 시 최초 업데이트
updateDateTime();

// 1초마다 업데이트
setInterval(updateDateTime, 1000);

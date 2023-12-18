function updateCurrentTime() {
    var currentTimeElement = document.getElementById('current-time');
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    // 시, 분, 초가 한 자리 숫자일 경우 앞에 0을 추가
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    var timeString = hours + ':' + minutes + ':' + seconds;

    currentTimeElement.innerHTML = timeString;
  }

  // 초기에 한 번 호출
  updateCurrentTime();

  // 1초마다 업데이트
  setInterval(updateCurrentTime, 1000);


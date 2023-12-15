function checkLoginStatusAndUpdateUI() {
    fetch('/api/user/status')
        .then(response => response.json())
        .then(data => {
            updateAuthButton(data.loggedIn);
        })
        .catch(error => console.error('Error:', error));
}

function updateAuthButton(isLoggedIn) {
    var authButton = document.getElementById('authButton');
    if (isLoggedIn) {
        authButton.href = 'logoutAction'; 
        authButton.textContent = '로그아웃';
    } else {
        authButton.href = 'loginForm'; 
        authButton.textContent = '로그인';
    }
}

// 페이지 로드 시 로그인 상태 확인
window.onload = checkLoginStatusAndUpdateUI;

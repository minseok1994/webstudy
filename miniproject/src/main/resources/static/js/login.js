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
function loginClicked() {
    console.log("로그인 버튼이 클릭되었습니다.");
}
// 페이지 로드 시 로그인 상태 확인
window.onload = checkLoginStatusAndUpdateUI;

// window.onload = function() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const loginError = urlParams.get('error');
//     if (loginError === 'true') {
//         alert('아이디 혹은 패스워드가 틀렸습니다.');
//     }
// };
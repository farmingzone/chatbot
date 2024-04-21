document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // 폼이 실제로 제출되는 것을 방지
        sendMessage();
    }
});

function sendMessage() {
    var input = document.getElementById('chat-input');
    var message = input.value;
    if (message.trim() === '') return; // 빈 메시지는 무시

    displayMessage(message, 'user'); // 사용자 메시지 화면에 표시
    fetchChatBotResponse(message); // 서버로 메시지 전송 및 응답 요청
    input.value = ''; // 입력 필드 초기화
    input.focus(); // 메시지 전송 후 입력 상자에 포커스
}

function displayMessage(message, sender) {
    var chatBox = document.getElementById('chat-box');
    var msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    msgDiv.textContent = message;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // 스크롤을 아래로 이동
}

function fetchChatBotResponse(message) {
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        displayMessage(data.reply, 'bot'); // 서버 응답을 화면에 표시
    })
    .catch(error => {
        console.error('Error:', error);
        displayMessage('오류가 발생했습니다. 다시 시도해주세요.', 'bot');
    });
}

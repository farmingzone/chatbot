from flask import Flask, request, jsonify, render_template

app = Flask(__name__, static_folder='static')


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data['message']
        # 적절한 로직으로 응답 메시지 생성
        reply = generate_reply(user_message)  # 사용자 정의 응답 함수 사용
    except TypeError:
        reply = "잘못된 요청입니다."
    return jsonify({'reply': reply})

def generate_reply(user_message):
    if "안녕" in user_message:
        return "안녕하세요! 무엇을 도와드릴까요?"
    elif "날씨" in user_message:
        return "오늘 날씨는 맑고 따뜻할 예정입니다!"
    elif "이름" in user_message:
        return "저는 당신의 친구, ChatBot입니다!"
    else:
        return "죄송해요, 무슨 말인지 모르겠어요. 다시 말씀해주시겠어요?"

if __name__ == '__main__':
    app.run(debug=True)

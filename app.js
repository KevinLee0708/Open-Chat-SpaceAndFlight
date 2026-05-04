// =======================
// 🔥 Firebase 설정 (너 프로젝트 값 넣기)
// =======================
const firebaseConfig = {
  apiKey: "AIzaSyCNNbsbuyLDfZN8XB5uzexBNaNA_MuJ8QI",
  authDomain: "website-kevinlee0708.firebaseapp.com",
  projectId: "website-kevinlee0708",
  storageBucket: "website-kevinlee0708.firebasestorage.app",
  messagingSenderId: "313895693324",
  appId: "1:313895693324:web:81941ff11d726c7d7fd229",
  measurementId: "G-4NP7NRK0ED"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// =======================
// 📥 Firestore 데이터 로드
// =======================
async function loadData() {
    const snapshot = await db.collection("Dday").get();

    const data = [];

    snapshot.forEach(doc => {
        data.push(doc.data());
    });

    return data;
}

// =======================
// ⏱️ 안전한 날짜 변환 함수 (핵심)
// =======================
function getDate(item) {
    if (!item.date) return null;

    // Firestore Timestamp
    if (item.date.toDate) {
        return item.date.toDate();
    }

    // 문자열 fallback
    const d = new Date(item.date);

    if (isNaN(d.getTime())) return null;

    return d;
}

// =======================
// 📊 렌더링
// =======================
async function update() {
    const container = document.getElementById("container");
    container.innerHTML = "";

    const data = await loadData();
    const now = new Date().getTime();

    data.forEach(item => {

        const targetDate = getDate(item);

        let text = "";

        // ❗ 날짜 오류 방지
        if (!targetDate) {
            text = "⚠️ 날짜 오류";
        } else {

            let diff = targetDate.getTime() - now;

            if (diff <= 0) {
                text = "🎉 완료!";
            } else {
                const d = Math.floor(diff / (1000 * 60 * 60 * 24));
                diff %= (1000 * 60 * 60 * 24);

                const h = Math.floor(diff / (1000 * 60 * 60));
                diff %= (1000 * 60 * 60);

                const m = Math.floor(diff / (1000 * 60));
                diff %= (1000 * 60);

                const s = Math.floor(diff / 1000);

                text = `${d}일 ${h}시간 ${m}분 ${s}초`;
            }
        }

        container.innerHTML += `
            <div class="card">
                <div class="name">${item.name || "이름 없음"}</div>
                <div class="time">${text}</div>
            </div>
        `;
    });
}

// 🔄 1초마다 갱신
setInterval(update, 1000);
update();    container.innerHTML = "";

    const data = await loadData();
    const now = new Date().getTime();

    data.forEach(item => {
        let diff = new Date(item.date).getTime() - now;

        let text = "";

        if (diff <= 0) {
            text = "🎉 완료!";
        } else {
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            diff %= (1000 * 60 * 60 * 24);

            const h = Math.floor(diff / (1000 * 60 * 60));
            diff %= (1000 * 60 * 60);

            const m = Math.floor(diff / (1000 * 60));
            diff %= (1000 * 60);

            const s = Math.floor(diff / 1000);

            text = `${d}일 ${h}시간 ${m}분 ${s}초`;
        }

        container.innerHTML += `
            <div class="card">
                <div class="name">${item.name}</div>
                <div class="time">${text}</div>
            </div>
        `;
    });
}

// 1초마다 갱신
setInterval(update, 1000);
update();

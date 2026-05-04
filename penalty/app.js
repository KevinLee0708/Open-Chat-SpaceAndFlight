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
// 📦 전역 데이터 저장
// =======================
let data = [];

// =======================
// 📥 데이터 한 번만 가져오기
// =======================
async function loadDataOnce() {
  const snapshot = await db.collection("Dday").get();

  data = [];
  snapshot.forEach(doc => {
    data.push(doc.data());
  });

  render(); // 처음 렌더
}

// =======================
// ⏱️ 날짜 처리
// =======================
function getDate(item) {
  if (!item.date) return null;

  if (item.date.toDate) {
    return item.date.toDate();
  }

  const d = new Date(item.date);
  if (isNaN(d.getTime())) return null;

  return d;
}

// =======================
// 🎨 렌더링 (DB 안 건드림)
// =======================
function render() {
  const container = document.getElementById("container");
  container.innerHTML = "";

  const now = new Date().getTime();

  data.forEach(item => {
    const target = getDate(item);

    let text = "";

    if (!target) {
      text = "⚠️ 날짜 오류";
    } else {
      let diff = target.getTime() - now;

      if (diff <= 0) {
        text = "🎉 벌칙 이행 완료!";
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

// =======================
// 🚀 실행
// =======================
loadDataOnce();        // 데이터는 1번만
setInterval(render, 1000); // 시간만 업데이트

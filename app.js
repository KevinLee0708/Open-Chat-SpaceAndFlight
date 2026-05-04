
// ===== 모바일 메뉴 =====
function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}

// ===== 스크롤 애니메이션 =====
function scrollAnimation() {
  const items = document.querySelectorAll(".scroll-item");

  items.forEach(el => {
    const rect = el.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", scrollAnimation);
window.addEventListener("load", scrollAnimation);

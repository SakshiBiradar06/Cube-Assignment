// MENU
function toggleMenu() {
  document.querySelector(".nav").classList.toggle("open");
}

// IMAGE GALLERY
const imgs = [
  "assets/images1.png",
  "assets/images2.png",
  "assets/images3.png"
];

let current = 0;
function changeImage(i){
  const imgs = [
    "assets/images1.png",
    "assets/images2.png",
    "assets/images3.png"
  ];
  document.getElementById("mainImage").src = imgs[i];
}

// 🔥 NEW: NEXT / PREV BUTTONS
function nextImage(){
  current = (current + 1) % imgs.length;
  changeImage(current);
}

function prevImage(){
  current = (current - 1 + imgs.length) % imgs.length;
  changeImage(current);
}

// RADIO LOGIC
let f = "original";
let p = "single";

function updateCart(){
  document.getElementById("cartBtn").href = `#cart?f=${f}&p=${p}`;
}

// SUBSCRIPTION BOX (NEW)
function updateSubscriptionUI(value){
  const singleBox = document.getElementById("singleBox");
  const doubleBox = document.getElementById("doubleBox");

  if (!singleBox || !doubleBox) return; // safety

  if(value === "single"){
    singleBox.classList.add("active");
    doubleBox.classList.remove("active");
  } 
  else if(value === "double"){
    doubleBox.classList.add("active");
    singleBox.classList.remove("active");
  } 
  else {
    singleBox.classList.remove("active");
    doubleBox.classList.remove("active");
  }
}

// attach events AFTER DOM loads
document.addEventListener("DOMContentLoaded", () => {

  // FRAGRANCE
  document.querySelectorAll("input[name='f']").forEach(r=>{
    r.addEventListener("change", e=>{
      f = e.target.value;
      updateCart();
    });
  });


document.querySelectorAll(".f-card input").forEach(input => {
  input.addEventListener("change", () => {

    const group = input.name;

    document.querySelectorAll(`input[name="${group}"]`).forEach(i => {
      i.parentElement.classList.remove("active");
    });

    input.parentElement.classList.add("active");

  });
});

// ACCORDION
function toggleCollection(element) {
  const item = element.parentElement;

  // close all
  document.querySelectorAll(".col-item").forEach(i => {
    i.classList.remove("active");
    i.querySelector("span:last-child").innerText = "+";
  });

  // open clicked
  item.classList.add("active");
  element.querySelector("span:last-child").innerText = "-";
}

// COUNTER
const counters = document.querySelectorAll(".count");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      let el = entry.target;
      let target = +el.dataset.target;
      let count = 0;

      let update = () => {
        let speed = target / 50;

        if (count < target) {
          count += speed;
          el.innerText = Math.floor(count) + "%";
          requestAnimationFrame(update);
        } else {
          el.innerText = target + "%";
        }
      };

      update();
      observer.unobserve(el);
    }
  });
});

counters.forEach(c => observer.observe(c));
function selectPlan(type){
  document.getElementById("singlePlan").classList.remove("active");
  document.getElementById("doublePlan").classList.remove("active");

  if(type === "single"){
    document.getElementById("singlePlan").classList.add("active");
  } else {
    document.getElementById("doublePlan").classList.add("active");
  }
};
const accordionBtn = document.querySelectorAll(".accordion-btn");
const accordionWrap = document.querySelectorAll(".accordion-wrapper");
let isAnimating;

function setShow(btn) {
  const content = btn.nextElementSibling;
  btn.querySelector("img").src = "assets/images/icon-minus.svg";
  content.hidden = false;
  content.style.height = "0px";
  content.style.height = content.scrollHeight + "px";
  content.addEventListener(
    "transitionend",
    () => {
      isAnimating = false;
    },
    { once: true }
  );
}

function setHidden(btn) {
  const content = btn.nextElementSibling;
  btn.querySelector("img").src = "assets/images/icon-plus.svg";

  content.style.height = "0px";

  content.addEventListener(
    "transitionend",
    () => {
      content.hidden = true;
      isAnimating = false;
    },
    { once: true }
  );
}

function collapseAccordion() {
  accordionWrap.forEach((b) => {
    const content = b.querySelector(":scope > div");
    b.querySelector(":scope > button > img").src =
      "assets/images/icon-plus.svg";
    content.hidden = true;
    b.querySelector(":scope > button").setAttribute("aria-expanded", "false");
  });
}

function setActiveBtn(btn) {
  if (isAnimating) return;
  const expanded = btn.getAttribute("aria-expanded") === "true";
  btn.setAttribute("aria-expanded", !expanded);

  isAnimating = true;

  if (!(btn.getAttribute("aria-expanded") === "true")) {
    setHidden(btn);
  } else {
    collapseAccordion();
    btn.setAttribute("aria-expanded", "true");
    setShow(btn);
  }
}

accordionBtn.forEach((b) => {
  b.addEventListener("click", (e) => {
    setActiveBtn(e.currentTarget);
  });
});

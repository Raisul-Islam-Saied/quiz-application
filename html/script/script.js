//miniPlayer  floatingBtn

document.querySelector(".miniPlayer").addEventListener(
  "click",
  function () {
    this.classList.remove("floatingBtn");
  },
  true
);

document.querySelector(".miniPlayer .close").addEventListener(
  "click",
  function () {
    document.querySelector(".miniPlayer").classList.add("floatingBtn");
  },
  true
);

// tooltip
document.querySelector(".progress").addEventListener("mouseover", function () {
  document.querySelector(".tooltip").style.display = "block";
});

document.querySelector(".progress").addEventListener("mouseout", function () {
  document.querySelector(".tooltip").style.display = "none";
});

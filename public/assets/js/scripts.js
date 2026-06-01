const dropBtn = document.getElementById("dropbtn");
const dropContent = document.getElementById("dropcontent");

dropBtn.addEventListener("click", function () {
    if (dropContent.style.display !== "block") {
        dropContent.style.display = "block";
    } else {
        dropContent.style.display = "none";
    }
});

window.addEventListener("click", function (event) {
    if (!dropBtn.contains(event.target) && !dropContent.contains(event.target)) {
        dropContent.style.display = "none";
    }
});
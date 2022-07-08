function menuopen(i) {
  if (i == 0) {
    var x = document.getElementById("submenu");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  } else {
    var x = document.getElementById("submenu");
    x.style.display = "none";
  }
}

function mobilemenu(i) {
  if (i == 0) {
    var x = document.getElementById("mobile-menu");
    var y = document.getElementById("icon-bar");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  } else {
    var x = document.getElementById("mobile-menu");
    x.style.display = "none";
  }
}

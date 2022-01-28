const text = document.getElementById("result");
const search = document.getElementById("search");
const code = document.getElementById("code");
const amount = document.getElementById("amount");
// const meniDiv = document.getElementById("meniDiv");
const showBtn = document.getElementById("show");
const sellBtn = document.getElementById("sell");
const importBtn = document.getElementById("import");
const nivelationBtn = document.getElementById("nivelation");
const appBtn = document.getElementById("application");
const menuNav = document.getElementsByClassName("menuBtn");
const forma = document.getElementsByClassName("forma");

let cenaLager = 0;
let cenaStvarno = 0;
let Baza = [];
let Operacija = 0;

search.addEventListener("click", () => kazi(code.value));

function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);
  izborDiv.style.display = "none";

  reader.onload = function () {
    text.innerText = reader.result;
    let a = reader.result.split("\r\n");

    for (let i = 0; i < a.length - 1; i++) {
      Baza[parseInt(a[i].split(",").shift())] = a[i];

      cenaLager =
        cenaLager +
        parseFloat(a[i].split(",")[4]) * parseFloat(a[i].split(",")[7]);
      cenaStvarno =
        cenaStvarno +
        parseFloat(a[i].split(",")[4]) * parseFloat(a[i].split(",")[6]);
    }
    localStorage.setItem("baza", JSON.stringify(Baza));
    localStorage.setItem("lager", JSON.stringify(cenaLager));
    localStorage.setItem("lagerStvarno", JSON.stringify(cenaStvarno));
  };

  reader.onerror = function () {
    console.log(reader.error);
  };
}

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("baza")) {
    Baza = JSON.parse(localStorage.getItem("baza"));
    text.innerText = Baza.filter((x)=>x!==null).map(e=>(e.split(',').slice(0,2)).join('  ')).join("\r\n");
    cenaLager = JSON.parse(localStorage.getItem("lager"));
    cenaStvarno = JSON.parse(localStorage.getItem("lagerStvarno"));
  } else izborDiv.style.display = "block";
});

function kazi(e) {
  const odgovor = Baza[e];
  if (!Baza[e]) {
    alert("Nemate takav proizvod u bazi");
  } else {
    amount.focus();
    document.getElementById("article").innerText = odgovor;
  }
}

sellBtn.addEventListener("click", () => {
  for (let i = 0; i < 5; i++) {
    menuNav[i].style.color = "silver";
    menuNav[0].style.color = "white";
  }
  for (let j = 0; j < forma.length; j++) {
    forma[j].style.display = "none";
  }

  sell();
});

importBtn.addEventListener("click", () => {
  for (let i = 0; i < 5; i++) {
    menuNav[i].style.color = "silver";
    menuNav[1].style.color = "white";
  }
  for (let j = 0; j < forma.length; j++) {
    forma[j].style.display = "none";
  }
  importArticle();
});

showBtn.addEventListener("click", () => {
  for (let i = 0; i < 5; i++) {
    menuNav[i].style.color = "silver";
    menuNav[3].style.color = "white";
  }
  for (let j = 0; j < forma.length; j++) {
    forma[j].style.display = "none";
  }
  show();
});
nivelation.addEventListener("click", () => {
  for (let i = 0; i < 5; i++) {
    menuNav[i].style.color = "silver";
    menuNav[2].style.color = "white";
  }
  for (let j = 0; j < forma.length; j++) {
    forma[j].style.display = "none";
  }
  nivelation();
});
appBtn.addEventListener("click", () => {
  for (let i = 0; i < 5; i++) {
    menuNav[i].style.color = "silver";
    menuNav[4].style.color = "white";
  }
  for (let j = 0; j < forma.length; j++) {
    forma[j].style.display = "none";
  }
  if (!localStorage.getItem("baza")) {
    izborDiv.style.display = "block";
  }
});

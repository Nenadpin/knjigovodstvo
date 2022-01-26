const tekst = document.getElementById("prikaz");
const prikazi = document.getElementById("trazi");
const sifra = document.getElementById("sifra");
const kol = document.getElementById("kolicina");
const meniDiv = document.getElementById("meniDiv");
const pregledBtn = document.getElementById("pregledi");
const prodajaBtn = document.getElementById("prodaja");
const nabavkaBtn = document.getElementById("nabavka");
const nivelacijaBtn = document.getElementById("nivelacija");
const appBtn = document.getElementById("aplikacija");
const meniNav = document.getElementsByClassName("meniBtn");
const forma = document.getElementsByClassName("forma");

let cenaLager = 0;
let cenaStvarno = 0;
let Baza = [];
let Operacija = 0;

prikazi.addEventListener("click", () => kazi(sifra.value));

function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);
  izborDiv.style.display = "none";

  reader.onload = function () {
    tekst.innerText = reader.result;
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
    tekst.innerText = Baza.filter((x) => x !== null).join("\r\n");
    cenaLager = JSON.parse(localStorage.getItem("lager"));
    cenaStvarno = JSON.parse(localStorage.getItem("lagerStvarno"));
  } else izborDiv.style.display = "block";
});

function kazi(e) {
  const odgovor = Baza[e];
  if (!Baza[e]) {
    alert("Nemate takav proizvod u bazi");
  } else {
    kol.focus();
    document.getElementById("artikl").innerText = odgovor;
  }
}

prodajaBtn.addEventListener("click", () => {
  for (let i = 0; i < 5; i++) {
    meniNav[i].style.color = "silver";
    meniNav[0].style.color = "white";
  }
  for (let j = 0; j < forma.length; j++) {
    forma[j].style.display = "none";
  }

  prodaja();
});

nabavkaBtn.addEventListener("click", () => {
  for (let i = 0; i < 5; i++) {
    meniNav[i].style.color = "silver";
    meniNav[1].style.color = "white";
  }
  for (let j = 0; j < forma.length; j++) {
    forma[j].style.display = "none";
  }
  nabavka();
});

pregledBtn.addEventListener("click", () => {
  for (let i = 0; i < 5; i++) {
    meniNav[i].style.color = "silver";
    meniNav[3].style.color = "white";
  }
  for (let j = 0; j < forma.length; j++) {
    forma[j].style.display = "none";
  }
  pregled();
});
nivelacijaBtn.addEventListener("click", () => {
  for (let i = 0; i < 5; i++) {
    meniNav[i].style.color = "silver";
    meniNav[2].style.color = "white";
  }
  for (let j = 0; j < forma.length; j++) {
    forma[j].style.display = "none";
  }
  nivelacija();
});
appBtn.addEventListener("click", () => {
  for (let i = 0; i < 5; i++) {
    meniNav[i].style.color = "silver";
    meniNav[4].style.color = "white";
  }
  for (let j = 0; j < forma.length; j++) {
    forma[j].style.display = "none";
  }
  if (!localStorage.getItem("baza")) {
    izborDiv.style.display = "block";
  }
});

const text = document.getElementById("result");
const search = document.getElementById("search");
const code = document.getElementById("code");
const amount = document.getElementById("amount");
// const meniDiv = document.getElementById("meniDiv");
const menuNav = document.getElementsByClassName("menuBtn");
const forma = document.getElementsByClassName("forma");

let stockPrice = 0;
let actualPrice = 0;
let storage = [];
let Operacija = 0;

search.addEventListener("click", () => kazi(code.value));

function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);
  izborDiv.style.display = "none";

  reader.onload = function () {
    text.innerText = reader.result;
    let records = reader.result.split("\r\n");

    records.forEach(record => {
      let obj = parseRecord(record);
      storage[obj.id] = obj;      
      actualPrice += obj.price * obj.realStock;
      stockPrice += obj.price * obj.stock;
    });
    updateStorage();
  };

  reader.onerror = function () {
    console.log(reader.error);
  };
}

function updateStorage() {
  localStorage.setItem("baza", JSON.stringify(storage));
  localStorage.setItem("lager", stockPrice);
  localStorage.setItem("lagerStvarno", actualPrice);
}

// parse csv string line to an actual object
function parseRecord(csvRecord) {
  let record = csvRecord.split(",");
  return {
    id: parseInt(record[0]),
    name: record[1],
    // not sure something: record[2],
    // not sure something: record[3],
    price: parseFloat(record[4]),
    // not sure something: record[5]
    realStock: parseFloat(record[6]),
    stock: parseFloat(record[7]),
    originalCSV: csvRecord,
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("baza")) {
    storage = JSON.parse(localStorage.getItem("baza"));
    text.innerText = storage.filter(x => x).map(e => `${e.id}  ${e.name}`).join("\r\n");
    stockPrice = JSON.parse(localStorage.getItem("lager"));
    actualPrice = JSON.parse(localStorage.getItem("lagerStvarno"));
  } else izborDiv.style.display = "block";
});

function kazi(e) {
  const odgovor = storage[e];
  if (!storage[e]) {
    alert("Nemate takav proizvod u bazi");
  } else {
    amount.focus();
    document.getElementById("article").innerText = odgovor;
  }
}

function styleMenuNav(clickedId) {
  // no need to execute this each time in a loop
  menuNav[clickedId].style.color = "white";
  for (let i = 0; i < 5; i++) {
    if (clickedId != i) {
      menuNav[i].style.color = "silver";
    }
  }
  for (let j = 0; j < forma.length; j++) {
    forma[j].style.display = "none";
  }
}

function applicationClick() {
  if (!localStorage.getItem("baza")) {
    izborDiv.style.display = "block";
  }
}


function show() {

  const replaceAmountBtn = document.getElementById("replaceAmountBtn");
  const image = document.getElementById("replaceImage");
  const showInfo = document.getElementById('showInfo');
  const replaceAmount = document.getElementById('replaceAmount');
  const searchBtn = document.getElementById('searchBtn');
  const showDiv = document.getElementById('showDiv');


  let samoLager = false;
  let filtered = [];

  showDiv.style.display = "block";
  showCode.focus();

  document.getElementById("realState").innerText =
    "Knjigovodstveno stanje: " + actualPrice;
  document.getElementById("stock").innerText =
    "Vrednost lagera: " + stockPrice;

  replaceAmountBtn.addEventListener("click", () => {
    if (replaceAmount.value) {
      izmena(parseInt(showCode.value))
    }
  });

  searchBtn.addEventListener('click', () => {
    const odgovor = storage[parseInt(showCode.value)];
    if (!odgovor) {
      alert("Nemate takav proizvod u bazi");
    } else {
      replaceAmount.focus();
      document.getElementById("replaceArticle").innerText = odgovor;
    }
  })

  function izmena(e) {
    let clan = storage[e].split(",");
    if (replaceAmount.value) {
      let tempCena = parseFloat(clan[7]);
      clan[7] = replaceAmount.value;
      stockPrice -= parseFloat(clan[4]) * (tempCena - clan[7]);
      storage[e] = clan.join(",");
      document.getElementById("replaceArticle").innerText = storage[e];
      updateStorage();
      document.getElementById("stock").innerText =
        "Vrednost lagera: " + stockPrice;
    }
    replaceAmount.value = "";
    showCode.value = "";
    document.getElementById("article").innerText = "-";
    showCode.focus();
  }

  image.addEventListener("click", () => {

    samoLager = !samoLager;
    if (samoLager) {
      let a = [];
      text.innerText = "";
      for (let i = 1; i < storage.length + 1; i++) {
        if (storage[i] && parseFloat(storage[i].split(",")[4]) > 0) {
          a[i] = storage[i];
        }
      }
      showInfo.innerText = "samo proizvodi na lageru";
      text.innerText = a.filter((x) => x !== null).join("\r\n");
    } else {
      showInfo.innerText = "svi proizvodi";
      text.innerText = storage.filter((x) => x !== null).join("\r\n");
    }
  });

  replaceAmount.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      izmena(showCode.value);
    }
  });

  showCode.addEventListener("keydown", function Filter(e) {
    if (e.key === "Enter") {
      if (parseFloat(showCode.value)) {
        let g = [[]];
        for (let i = 0; i < storage.length; i++) {
          if (storage[i]) {
            if (
              parseFloat(storage[i].split(",")[4]) === parseFloat(showCode.value)
            ) {
              g.unshift(storage[i].split(","));
            } else if (
              parseFloat(storage[i].split(",")[4]) > parseFloat(showCode.value)
            ) {
              g.push(storage[i].split(","));
            }
          }
        }
        filtered = g.map((e) => e.join(","));
        text.innerText = filtered.filter((x) => x !== null).join("\r\n");
      } else {
        filtered = storage.filter((str) => {
          if (str) return str.includes(showCode.value.toUpperCase());
        });
        text.innerText = filtered.join("\r\n");
      }
    }
  });
}
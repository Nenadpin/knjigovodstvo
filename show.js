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
    "Knjigovodstveno stanje: " + cenaStvarno;
  document.getElementById("stock").innerText =
    "Vrednost lagera: " + cenaLager;

  replaceAmountBtn.addEventListener("click", () => {
    if (replaceAmount.value) {
      izmena(parseInt(showCode.value))
    }
  });

  searchBtn.addEventListener('click', () => {
    const odgovor = Baza[parseInt(showCode.value)];
    if (!odgovor) {
      alert("Nemate takav proizvod u bazi");
    } else {
      replaceAmount.focus();
      document.getElementById("replaceArticle").innerText = odgovor;
    }
  })

  function izmena(e) {
    let clan = Baza[e].split(",");
    if (replaceAmount.value) {
      let tempCena = parseFloat(clan[7]);
      clan[7] = replaceAmount.value;
      cenaLager -= parseFloat(clan[4]) * (tempCena - clan[7]);
      Baza[e] = clan.join(",");
      document.getElementById("replaceArticle").innerText = Baza[e];
      localStorage.setItem("baza", JSON.stringify(Baza));
      localStorage.setItem("lager", JSON.stringify(cenaLager));
      document.getElementById("stock").innerText =
        "Vrednost lagera: " + cenaLager;
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
      for (let i = 1; i < Baza.length + 1; i++) {
        if (Baza[i] && parseFloat(Baza[i].split(",")[4]) > 0) {
          a[i] = Baza[i];
        }
      }
      showInfo.innerText = "samo proizvodi na lageru";
      text.innerText = a.filter((x) => x !== null).join("\r\n");
    } else {
      showInfo.innerText = "svi proizvodi";
      text.innerText = Baza.filter((x) => x !== null).join("\r\n");
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
        for (let i = 0; i < Baza.length; i++) {
          if (Baza[i]) {
            if (
              parseFloat(Baza[i].split(",")[4]) === parseFloat(showCode.value)
            ) {
              g.unshift(Baza[i].split(","));
            } else if (
              parseFloat(Baza[i].split(",")[4]) > parseFloat(showCode.value)
            ) {
              g.push(Baza[i].split(","));
            }
          }
        }
        filtered = g.map((e) => e.join(","));
        text.innerText = filtered.filter((x) => x !== null).join("\r\n");
      } else {
        filtered = Baza.filter((str) => {
          if (str) return str.includes(showCode.value.toUpperCase());
        });
        text.innerText = filtered.join("\r\n");
      }
    }
  });
}
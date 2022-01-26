function pregled() {

  const zameni = document.getElementById("kolBtnPr");
  const slika = document.getElementById("slikaPr");
  const infoPr = document.getElementById('infoPregled');
  const kolPr = document.getElementById('kolicinaPr')
  const traziPr = document.getElementById('traziPr')


  let samoLager = false;
  let filtered = [];

  pregledDiv.style.display = "block";
  sifraPr.focus();

  document.getElementById("stvarno").innerText =
    "Knjigovodstveno stanje: " + cenaStvarno;
  document.getElementById("lager").innerText =
    "Vrednost lagera: " + cenaLager;

  zameni.addEventListener("click", () => {
    if (kolPr.value) {
      izmena(parseInt(sifraPr.value))
    }
  });

  traziPr.addEventListener('click', () => {
    const odgovor = Baza[parseInt(sifraPr.value)];
    if (!odgovor) {
      alert("Nemate takav proizvod u bazi");
    } else {
      kolPr.focus();
      document.getElementById("artiklPr").innerText = odgovor;
    }
  })

  function izmena(e) {
    let clan = Baza[e].split(",");
    if (kolPr.value) {
      let tempCena = parseFloat(clan[7]);
      clan[7] = kolPr.value;
      cenaLager -= parseFloat(clan[4]) * (tempCena - clan[7]);
      Baza[e] = clan.join(",");
      document.getElementById("artiklPr").innerText = Baza[e];
      localStorage.setItem("baza", JSON.stringify(Baza));
      localStorage.setItem("lager", JSON.stringify(cenaLager));
      document.getElementById("lager").innerText =
        "Vrednost lagera: " + cenaLager;
    }
    kolPr.value = "";
    sifraPr.value = "";
    document.getElementById("artikl").innerText = "-";
    sifraPr.focus();
  }

  slika.addEventListener("click", () => {

    samoLager = !samoLager;
    if (samoLager) {
      let a = [];
      tekst.innerText = "";
      for (let i = 1; i < Baza.length + 1; i++) {
        if (Baza[i] && parseFloat(Baza[i].split(",")[4]) > 0) {
          a[i] = Baza[i];
        }
      }
      infoPr.innerText = "samo proizvodi na lageru";
      tekst.innerText = a.filter((x) => x !== null).join("\r\n");
    } else {
      infoPr.innerText = "svi proizvodi";
      tekst.innerText = Baza.filter((x) => x !== null).join("\r\n");
    }
  });

  kolPr.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      izmena(sifraPr.value);
    }
  });

  sifraPr.addEventListener("keydown", function Filter(e) {
    if (e.key === "Enter") {
      if (parseFloat(sifraPr.value)) {
        let g = [[]];
        for (let i = 0; i < Baza.length; i++) {
          if (Baza[i]) {
            if (
              parseFloat(Baza[i].split(",")[4]) === parseFloat(sifraPr.value)
            ) {
              g.unshift(Baza[i].split(","));
            } else if (
              parseFloat(Baza[i].split(",")[4]) > parseFloat(sifraPr.value)
            ) {
              g.push(Baza[i].split(","));
            }
          }
        }
        filtered = g.map((e) => e.join(","));
        tekst.innerText = filtered.filter((x) => x !== null).join("\r\n");
      } else {
        filtered = Baza.filter((str) => {
          if (str) return str.includes(sifraPr.value.toUpperCase());
        });
        tekst.innerText = filtered.join("\r\n");
      }
    }
  });
}
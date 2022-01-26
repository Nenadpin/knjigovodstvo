function prodaja() {
  const kol = document.getElementById("kolicina");
  const prodaj = document.getElementById("kolBtn");
  const slika = document.getElementById("slikaP");
  const racun = document.getElementById("racun");
  const info = document.getElementById("infoProdaje");

  let kom = [[]];
  let singleItemP = 0;

  prodajaDiv.style.display = "block";
  document.getElementById("lager").innerText = "";
  sifra.focus();
  document.getElementById("stvarno").innerText = "";

  slika.addEventListener("click", () => {
    if (kom.length > 1) {
      let datum = new Date();
      let iznos = 0;
      let singleItem = [];
      kom[0] = datum;
      kom.push(singleItemP.toString());
      if (localStorage.getItem("prodaja")) {
        let temp = JSON.parse(localStorage.getItem("prodaja"));
        temp.push(kom);
        localStorage.setItem("prodaja", JSON.stringify(temp));
      } else localStorage.setItem("prodaja", JSON.stringify(kom));
      for (let i = 1; i < kom.length - 1; i++) {
        singleItem = Baza[kom[i][0]].split(",");
        singleItem[6] = parseFloat(singleItem[6]) - kom[i][1];
        singleItem[7] = parseFloat(singleItem[7]) - kom[i][1];
        iznos = parseFloat(singleItem[4]) * kom[i][1];
        cenaLager -= iznos;
        cenaStvarno -= iznos;
        Baza[kom[i][0]] = singleItem.join(",");
        localStorage.setItem("lager", JSON.stringify(cenaLager));
        localStorage.setItem("lagerStvarno", JSON.stringify(cenaStvarno));
        localStorage.setItem("baza", JSON.stringify(Baza));
      }
      exitP();
    }
  });

  sifra.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (parseFloat(sifra.value)) kazi(sifra.value);
    }
  });

  prodaj.addEventListener("click", () => prodato(parseFloat(sifra.value)));

  kol.addEventListener("keydown", (e) => {
    if (e.key === "Enter") prodato(parseFloat(sifra.value));
  });

  function prodato(art) {
    if (art && parseFloat(kol.value) > 0) {
      kom.push([art, parseFloat(kol.value)]);
      let singleArt = Baza[art].split(",");
      singleItemP += parseFloat(kol.value) * parseFloat(singleArt[4]);
      document.getElementById("artikl").innerText = "-";
      racun.innerText +=
        sifra.value +
        "  " +
        singleArt[1] +
        "  " +
        kol.value +
        "  " +
        singleArt[4] +
        " = " +
        parseFloat(kol.value) * parseFloat(singleArt[4]) +
        "\r\n";
      info.innerText = "Prodaja: " + singleItemP.toString();
      sifra.value = "";
      kol.value = "";
      sifra.focus();
    } else {
      alert("Neispravna kolicina!");
    }
  }

  document.getElementById("delBtn").addEventListener("click", () => {
    let temp = racun.innerText.split("\r\n")[0].split("\n");
    kom.pop();
    let umanjeno = temp.splice(temp.length - 2, 1)[0].split(" = ")[1];
    singleItemP -= parseFloat(umanjeno);
    info.innerText = "Prodaja: " + singleItemP.toString();
    racun.innerText = temp.join("\r\n");
  });

  function exitP() {
    kom = [[]];
    singleItemP = 0;
    sifra.value = "";
    kol.value = "";
    document.getElementById("artikl").innerText = "-";
    racun.innerText = "";
    prodajaDiv.style.display = "none";
  }
}

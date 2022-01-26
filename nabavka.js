function nabavka() {
  const sifraN = document.getElementById("sifraN");
  const kolN = document.getElementById("kolicinaN");
  const kupi = document.getElementById("kolBtnN");
  const slikaN = document.getElementById("slikaN");
  const racunN = document.getElementById("racunN");
  const infoN = document.getElementById("infoNabavke");
  const traziBtn = document.getElementById("traziN");

  let komN = [[]];
  let singleItemN = 0;

  nabavkaDiv.style.display = "block";
  sifraN.focus();

  slikaN.addEventListener("click", () => {
    if (komN.length > 1) {
      let datum = new Date();
      komN[0] = datum;
      komN.push(singleItemN.toString());
      let iznos = 0;
      let singleItem = [];
      if (localStorage.getItem("nabavka")) {
        let temp = JSON.parse(localStorage.getItem("nabavka"));
        temp.push(komN);
        localStorage.setItem("nabavka", JSON.stringify(temp));
      } else localStorage.setItem("nabavka", JSON.stringify(komN));
      for (let i = 1; i < komN.length - 1; i++) {
        singleItem = Baza[komN[i][0]].split(",");
        singleItem[6] = parseFloat(singleItem[6]) + komN[i][1];
        singleItem[7] = parseFloat(singleItem[7]) + komN[i][1];
        iznos = parseFloat(singleItem[4]) * komN[i][1];
        cenaLager += iznos;
        cenaStvarno += iznos;
        Baza[komN[i][0]] = singleItem.join(",");
        localStorage.setItem("lager", JSON.stringify(cenaLager));
        localStorage.setItem("lagerStvarno", JSON.stringify(cenaStvarno));
        localStorage.setItem("baza", JSON.stringify(Baza));
      }
    }
    exitN();
  });

  sifraN.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (parseFloat(sifraN.value)) traziN(sifraN.value);
    }
  });

  traziBtn.addEventListener("click", () => traziN(sifraN.value));

  kupi.addEventListener("click", () => {
    if (Baza[parseFloat(sifraN.value)]) {
      kupljeno(parseFloat(sifraN.value));
    } else {
      alert("Nemate takav proizvod!");
    }
  });

  kolN.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (Baza[parseFloat(sifraN.value)]) {
        kupljeno(parseFloat(sifraN.value));
      } else {
        alert("Nemate takav proizvod!");
      }
    }
  });

  function kupljeno(art) {
    if (art && parseFloat(kolN.value) > 0) {
      komN.push([art, parseFloat(kolN.value)]);
      let singleArtN = Baza[art].split(",");
      singleItemN += parseFloat(kolN.value) * parseFloat(singleArtN[4]);
      document.getElementById("artiklN").innerText = "-";
      racunN.innerText +=
        sifraN.value +
        "  " +
        singleArtN[1] +
        "  " +
        kolN.value +
        "  " +
        singleArtN[4] +
        " = " +
        parseFloat(kolN.value) * parseFloat(singleArtN[4]) +
        "\r\n";
      infoN.innerText = "Nabavka: " + singleItemN.toString();
      sifraN.value = "";
      kolN.value = "";
      sifraN.focus();
    } else {
      alert("Neispravna kolicina!");
    }
  }
  document.getElementById("delBtnN").addEventListener("click", () => {
    let temp = racunN.innerText.split("\r\n")[0].split("\n");
    komN.pop();
    let umanjeno = temp.splice(temp.length - 2, 1)[0].split(" = ")[1];
    singleItemN -= parseFloat(umanjeno);
    infoN.innerText = "Nabavka: " + singleItemN.toString();
    racunN.innerText = temp.join("\r\n");
  });

  function traziN(e) {
    const odgovor = Baza[e];
    if (!Baza[e]) {
      noviProizvod();
    } else {
      kolN.focus();
      document.getElementById("artiklN").innerText = odgovor;
    }
  }
  function noviProizvod() {
    let naziv = prompt(`Unesite naziv artikla za sifru: ${sifraN.value}`);
    if (naziv) {
      let cena = prompt(`Unesite prodajnu cenu za sifru: ${sifraN.value}`);
      if (cena) {
        Baza[
          parseFloat(sifraN.value)
        ] = `${sifraN.value},${naziv},0,kom,${cena},0,0,0`;
        kolN.focus();
      } else sifraN.focus();
    } else sifraN.focus();
  }
  function exitN() {
    komN = [[]];
    singleItemN = 0;
    sifraN.value = "";
    kolN.value = "";
    document.getElementById("artiklN").innerText = "-";
    racunN.innerText = "";
    nabavkaDiv.style.display = "none";
  }
}

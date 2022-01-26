function nivelacija() {
  const sifraNiv = document.getElementById("sifraNiv");
  const kolNiv = document.getElementById("kolicinaNiv");
  const zameniNiv = document.getElementById("kolBtnNiv");
  const slikaNiv = document.getElementById("slikaNiv");
  const racunNiv = document.getElementById("racunNiv");
  const infoNiv = document.getElementById("infoNiv");
  const traziNivBtn = document.getElementById("traziNiv");

  let komNiv = [[]];
  let singleItemNiv = 0;

  nivelacijaDiv.style.display = "block";
  sifraNiv.focus();

  slikaNiv.addEventListener("click", () => {
    if (komNiv.length > 1) {
      let datum = new Date();
      let singleItem = [];
      komNiv[0] = datum;
      komNiv.push(singleItemNiv.toString());
      if (localStorage.getItem("nivelacija")) {
        let temp = JSON.parse(localStorage.getItem("nivelacija"));
        temp.push(komNiv);
        localStorage.setItem("nivelacija", JSON.stringify(temp));
      } else localStorage.setItem("nivelacija", JSON.stringify(komNiv));
      for (let i = 0; i < komNiv.length; i++) {
        singleItem = Baza[komNiv[i][0]].split(",");
        singleItem[4] = komNiv[i][2];
        cenaLager += singleItemNiv;
        cenaStvarno += singleItemNiv;
        Baza[komNiv[i][0]] = singleItem.join(",");
        localStorage.setItem("lager", JSON.stringify(cenaLager));
        localStorage.setItem("lagerStvarno", JSON.stringify(cenaStvarno));
        localStorage.setItem("baza", JSON.stringify(Baza));
      }
      exitNiv();
    }
  });

  sifraNiv.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (parseFloat(sifraNiv.value)) traziNiv(sifraNiv.value);
    }
  });

  traziNivBtn.addEventListener("click", () => traziN(sifraNiv.value));

  zameniNiv.addEventListener("click", () => {
    if (Baza[parseFloat(sifraNiv.value)]) {
      zamenjeno(parseFloat(sifraNiv.value));
    } else {
      alert("Nemate takav proizvod!");
    }
  });

  kolNiv.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (Baza[parseFloat(sifraNiv.value)]) {
        zamenjeno(parseFloat(sifraNiv.value));
      } else {
        alert("Nemate takav proizvod!");
      }
    }
  });

  function zamenjeno(art) {
    if (art && parseFloat(kolNiv.value) > 0) {
      let singleArtNiv = Baza[art].split(",");

      komNiv.push([
        art,
        parseFloat(Baza[art].split(",")[4]),
        parseFloat(kolNiv.value),
      ]);
      singleItemNiv +=
        (parseFloat(kolNiv.value) - parseFloat(singleArtNiv[4])) *
        parseFloat(singleArtNiv[6]);
      document.getElementById("artiklNiv").innerText = "-";
      racunNiv.innerText +=
        sifraNiv.value +
        "  " +
        singleArtNiv[1] +
        "  " +
        kolNiv.value +
        "  " +
        singleArtNiv[4] +
        " razlika " +
        (parseFloat(kolNiv.value) - parseFloat(singleArtNiv[4])) *
          parseFloat(singleArtNiv[6]).toString() +
        "\r\n";
      singleArtNiv[4] = kolNiv.value;
      Baza[art] = singleArtNiv.join(",");
      infoNiv.innerText = "Razlika u ceni: " + singleItemNiv.toString();
      sifraNiv.value = "";
      kolNiv.value = "";
      sifraNiv.focus();
    } else {
      alert("Neispravna kolicina!");
    }
  }
  document.getElementById("delBtnNiv").addEventListener("click", () => {
    let temp = racunNiv.innerText.split("\r\n")[0].split("\n");
    komNiv.pop();
    let umanjeno = temp.splice(temp.length - 2, 1)[0].split(" razlika ")[1];
    singleItemNiv -= parseFloat(umanjeno);
    infoNiv.innerText = "Razlika u ceni: " + singleItemNiv.toString();
    racunNiv.innerText = temp.join("\r\n");
  });

  function traziNiv(e) {
    const odgovor = Baza[e];
    if (!Baza[e]) {
      alert("Nemate takav proizvod u bazi!");
    } else {
      kolNiv.focus();
      document.getElementById("artiklNiv").innerText = odgovor;
    }
  }
  function exitNiv() {
    komNiv = [[]];
    singleItemNiv = 0;
    sifraNiv.value = "";
    kolNiv.value = "";
    document.getElementById("artiklNiv").innerText = "-";
    racunNiv.innerText = "";
    nivelacijaDiv.style.display = "none";
  }
}

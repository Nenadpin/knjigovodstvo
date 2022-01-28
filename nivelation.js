function nivelation() {
  const nivelationCode = document.getElementById("nivelationCode");
  const nivelationAmount = document.getElementById("nivelationAmount");
  const zameniNiv = document.getElementById("nivelationAmountBtn");
  const nivelationImage = document.getElementById("nivelationImage");
  const billNiv = document.getElementById("billNiv");
  const infoNiv = document.getElementById("infoNiv");
  const nivelationSearchBtn = document.getElementById("nivelationSearch");
  const nivelationDiv = document.getElementById("nivelationDiv");

  let komNiv = [[]];
  let singleItemNiv = 0;

  nivelationDiv.style.display = "block";
  nivelationCode.focus();

  nivelationImage.addEventListener("click", () => {
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
      for (let i = 1; i < komNiv.length; i++) {
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

  nivelationCode.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (parseFloat(nivelationCode.value)) search(nivelationCode.value);
    }
  });

  nivelationSearchBtn.addEventListener("click", () => traziN(nivelationCode.value));

  zameniNiv.addEventListener("click", () => {
    if (Baza[parseFloat(nivelationCode.value)]) {
      zamenjeno(parseFloat(nivelationCode.value));
    } else {
      alert("Nemate takav proizvod!");
    }
  });

  nivelationAmount.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (Baza[parseFloat(nivelationCode.value)]) {
        zamenjeno(parseFloat(nivelationCode.value));
      } else {
        alert("Nemate takav proizvod!");
      }
    }
  });

  function zamenjeno(art) {
    if (art && parseFloat(nivelationAmount.value) > 0) {
      let singleArtNiv = Baza[art].split(",");

      komNiv.push([
        art,
        parseFloat(Baza[art].split(",")[4]),
        parseFloat(nivelationAmount.value),
      ]);
      singleItemNiv +=
        (parseFloat(nivelationAmount.value) - parseFloat(singleArtNiv[4])) *
        parseFloat(singleArtNiv[6]);
      document.getElementById("articleNiv").innerText = "-";
      billNiv.innerText +=
        nivelationCode.value +
        "  " +
        singleArtNiv[1] +
        "  " +
        nivelationAmount.value +
        "  " +
        singleArtNiv[4] +
        " razlika " +
        (parseFloat(nivelationAmount.value) - parseFloat(singleArtNiv[4])) *
          parseFloat(singleArtNiv[6]).toString() +
        "\r\n";
      singleArtNiv[4] = nivelationAmount.value;
      Baza[art] = singleArtNiv.join(",");
      infoNiv.innerText = "Razlika u ceni: " + singleItemNiv.toString();
      nivelationCode.value = "";
      nivelationAmount.value = "";
      nivelationCode.focus();
    } else {
      alert("Neispravna kolicina!");
    }
  }
  document.getElementById("delBtnNiv").addEventListener("click", () => {
    let temp = billNiv.innerText.split("\r\n")[0].split("\n");
    komNiv.pop();
    let umanjeno = temp.splice(temp.length - 2, 1)[0].split(" razlika ")[1];
    singleItemNiv -= parseFloat(umanjeno);
    infoNiv.innerText = "Razlika u ceni: " + singleItemNiv.toString();
    billNiv.innerText = temp.join("\r\n");
  });

  function search(e) {
    const odgovor = Baza[e];
    if (!Baza[e]) {
      alert("Nemate takav proizvod u bazi!");
    } else {
      nivelationAmount.focus();
      document.getElementById("articleNiv").innerText = odgovor;
    }
  }
  function exitNiv() {
    komNiv = [[]];
    singleItemNiv = 0;
    nivelationCode.value = "";
    nivelationAmount.value = "";
    document.getElementById("articleNiv").innerText = "-";
    billNiv.innerText = "";
    nivelationDiv.style.display = "none";
  }
}

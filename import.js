function importArticle() {
  const codeN = document.getElementById("codeN");
  const amount = document.getElementById("amountN");
  const buy = document.getElementById("amountBtnN");
  const imageN = document.getElementById("imangeN");
  const billN = document.getElementById("billN");
  const infoN = document.getElementById("importInfo");
  const traziBtn = document.getElementById("searchN");

  let komN = [[]];
  let singleItemN = 0;

  importDiv.style.display = "block";
  codeN.focus();

  imageN.addEventListener("click", () => {
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

  codeN.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (parseFloat(codeN.value)) searchN(codeN.value);
    }
  });

  traziBtn.addEventListener("click", () => searchN(codeN.value));

  buy.addEventListener("click", () => {
    if (Baza[parseFloat(codeN.value)]) {
      kupljeno(parseFloat(codeN.value));
    } else {
      alert("Nemate takav proizvod!");
    }
  });

  amount.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (Baza[parseFloat(codeN.value)]) {
        kupljeno(parseFloat(codeN.value));
      } else {
        alert("Nemate takav proizvod!");
      }
    }
  });

  function kupljeno(art) {
    if (art && parseFloat(amount.value) > 0) {
      komN.push([art, parseFloat(amount.value)]);
      let singleArtN = Baza[art].split(",");
      singleItemN += parseFloat(amount.value) * parseFloat(singleArtN[4]);
      document.getElementById("articleN").innerText = "-";
      billN.innerText +=
        codeN.value +
        "  " +
        singleArtN[1] +
        "  " +
        amount.value +
        "  " +
        singleArtN[4] +
        " = " +
        parseFloat(amount.value) * parseFloat(singleArtN[4]) +
        "\r\n";
      infoN.innerText = "Nabavka: " + singleItemN.toString();
      codeN.value = "";
      amount.value = "";
      codeN.focus();
    } else {
      alert("Neispravna kolicina!");
    }
  }
  document.getElementById("delBtnN").addEventListener("click", () => {
    let temp = billN.innerText.split("\r\n")[0].split("\n");
    komN.pop();
    let umanjeno = temp.splice(temp.length - 2, 1)[0].split(" = ")[1];
    singleItemN -= parseFloat(umanjeno);
    infoN.innerText = "Nabavka: " + singleItemN.toString();
    billN.innerText = temp.join("\r\n");
  });

  function searchN(e) {
    const odgovor = Baza[e];
    if (!Baza[e]) {
      noviProizvod();
    } else {
      amount.focus();
      document.getElementById("articleN").innerText = odgovor;
    }
  }
  function noviProizvod() {
    let naziv = prompt(`Unesite naziv artikla za sifru: ${codeN.value}`);
    if (naziv) {
      let cena = prompt(`Unesite prodajnu cenu za sifru: ${codeN.value}`);
      if (cena) {
        Baza[
          parseFloat(codeN.value)
        ] = `${codeN.value},${naziv},0,kom,${cena},0,0,0`;
        amount.focus();
      } else codeN.focus();
    } else codeN.focus();
  }
  function exitN() {
    komN = [[]];
    singleItemN = 0;
    codeN.value = "";
    amount.value = "";
    document.getElementById("articleN").innerText = "-";
    billN.innerText = "";
    importDiv.style.display = "none";
  }
}

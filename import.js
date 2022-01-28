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
      komN[0] = new Date();
      komN.push(singleItemN.toString());
      let singleItem = [];
      if (localStorage.getItem("nabavka")) {
        let temp = JSON.parse(localStorage.getItem("nabavka"));
        temp = temp.concat(komN);
        localStorage.setItem("nabavka", JSON.stringify(temp));
      } else localStorage.setItem("nabavka", JSON.stringify(komN));
      for (let i = 1; i < komN.length - 1; i++) {
        singleItem = storage[komN[i][0]];
        singleItem.stock += komN[i][1];
        singleItem.realStock += komN[i][1];
        let price = singleItem.price * komN[i][1];
        stockPrice += price;
        actualPrice += price;
        updateStorage();
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
    storeRecord(codeN.value);
  });

  amount.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      storeRecord(codeN.value);
    }
  });

  function storeRecord(value) {
    value = parseFloat(value);
    if (storage[parseFloat(value)]) {
      kupljeno(parseFloat(value));
    } else {
      alert("Nemate takav proizvod!");
    }
  }

  function kupljeno(art) {
    if (art && parseFloat(amount.value) > 0) {
      komN.push([art, parseFloat(amount.value)]);
      let singleArtN = storage[art];
      singleItemN += parseFloat(amount.value) * singleArtN.price;
      document.getElementById("articleN").innerText = "-";
      let price = parseFloat(amount.value) * singleArtN.price;
      billN.innerText += `${codeN.value}  ${singleArtN.name}  ${amount.value}  ${singleArtN.price} = ${price}\r\n`;
      infoN.innerText = "Nabavka: " + singleItemN;
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
    const odgovor = storage[e];
    if (!odgovor) {
      noviProizvod();
    } else {
      amount.focus();
      document.getElementById("articleN").innerText = odgovor.originalCSV;
    }
  }
  function noviProizvod() {
    let naziv = prompt(`Unesite naziv artikla za sifru: ${codeN.value}`);
    if (naziv) {
      let cena = prompt(`Unesite prodajnu cenu za sifru: ${codeN.value}`);
      if (cena) {
        storage[
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

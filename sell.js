function sell() {
  const amount = document.getElementById("amount");
  const sellBtn = document.getElementById("sellBtn");
  const sellImage = document.getElementById("sellImage");
  const racun = document.getElementById("racun");
  const info = document.getElementById("sellInfo");
  const sellDiv = document.getElementById("sellDiv");

  let kom = [[]];
  let singleItemP = 0;

  sellDiv.style.display = "block";
  document.getElementById("stock").innerText = "";
  code.focus();
  document.getElementById("realState").innerText = "";

  sellImage.addEventListener("click", () => {
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
        singleItem = storage[kom[i][0]].split(",");
        singleItem[6] = parseFloat(singleItem[6]) - kom[i][1];
        singleItem[7] = parseFloat(singleItem[7]) - kom[i][1];
        iznos = parseFloat(singleItem[4]) * kom[i][1];
        stockPrice -= iznos;
        actualPrice -= iznos;
        storage[kom[i][0]] = singleItem.join(",");
        
        updateStorage();
      }
      exitP();
    }
  });

  code.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (parseFloat(code.value)) kazi(code.value);
    }
  });

  sellBtn.addEventListener("click", () => sold(parseFloat(code.value)));

  amount.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sold(parseFloat(code.value));
  });

  function sold(art) {
    if (art && parseFloat(amount.value) > 0) {
      kom.push([art, parseFloat(amount.value)]);
      let singleArt = storage[art].split(",");
      singleItemP += parseFloat(amount.value) * parseFloat(singleArt[4]);
      document.getElementById("article").innerText = "-";
      racun.innerText +=
      code.value +
        "  " +
        singleArt[1] +
        "  " +
        amount.value +
        "  " +
        singleArt[4] +
        " = " +
        parseFloat(amount.value) * parseFloat(singleArt[4]) +
        "\r\n";
      info.innerText = "Prodaja: " + singleItemP.toString();
      code.value = "";
      amount.value = "";
      code.focus();
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
    code.value = "";
    kol.value = "";
    document.getElementById("article").innerText = "-";
    racun.innerText = "";
    sellDiv.style.display = "none";
  }
}

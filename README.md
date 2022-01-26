# knjigovodstvo
javascript knjigovodstvo, lokalna baza
Baza treba biti u csv formatu sa 7 kolona. Prva kolona je sifra artikla, druga naziv, cetvrta cena, 6-ta i 7-ma su kolicine(knjigovodstvene i stvarne). 
ostale kolone su nebitne (mogu biti 0) i postoje samo zbog kompatibilnosti sa starim softverima za knjigovodstvo.
localstorage se koristi za cuvanje baze, kao i za prodaje, nabavke i nivelacije. Localstorage se moze eksportovati kao jedan object
(postoji google ekstenzija za import/export localStorage) pa se moze koristiti i na drugom uredjaju

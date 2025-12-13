const proizvodi = [
    { id: 1, naziv: "ROG Strix Laptop", cijena: 1999, slika: "images/laptoprogstrix.jpg" },
    { id: 2, naziv: "ROG Gaming Miš", cijena: 99, slika: "images/mis.jpg" },
    { id: 3, naziv: "ROG Mehanička Tipkovnica", cijena: 179, slika: "images/tipkovnica.jpg" },
    { id: 4, naziv: "ROG Strix Monitor", cijena: 499, slika: "images/monitor.jpg" },
    { id: 5, naziv: "ROG Gaming Slušalice", cijena: 229, slika: "images/slusalice.jpg" },
    { id: 6, naziv: "ROG Gaming Tipkovnica", cijena: 129, slika: "images/tipkovnica2.jpg" },
    { id: 7, naziv: "ROG Strix Ruksak", cijena: 89, slika: "images/ruksak.jpg" },
    { id: 8, naziv: "ROG Mišpad", cijena: 39, slika: "images/mispad.jpg" },
    { id: 9, naziv: "ROG Strix Ventilator", cijena: 69, slika: "images/ventilator.jpg" },
    { id: 10, naziv: "ROG USB Tipkovnica", cijena: 89, slika: "images/usb_tipkovnica.jpg" },
    { id: 11, naziv: "ROG 7.1 Surround Sound Slušalice", cijena: 299, slika: "images/slusalice2.jpg" },
    { id: 12, naziv: "ROG External SSD 1TB", cijena: 179, slika: "images/ssd.jpg" }
];


let kosarica = JSON.parse(localStorage.getItem("kosarica")) || [];


function prikaziProizvode() {
    const listaProizvoda = document.getElementById("lista-proizvoda");
    listaProizvoda.innerHTML = "";

    proizvodi.forEach(proizvod => {
        const kartica = document.createElement("div");
        kartica.classList.add("kartica");
        kartica.innerHTML = `
            <img src="${proizvod.slika}" alt="${proizvod.naziv}">
            <h3>${proizvod.naziv}</h3>
            <p>${proizvod.cijena} €</p>
            <button class="gumb" onclick="dodajUKosaricu(${proizvod.id})">Dodaj u košaricu</button>
        `;
        listaProizvoda.appendChild(kartica);
    });
}


function dodajUKosaricu(id) {
    const proizvod = proizvodi.find(p => p.id === id);
    kosarica.push(proizvod);
    localStorage.setItem("kosarica", JSON.stringify(kosarica));
    prikaziKosaricu();
}


function prikaziKosaricu() {
    const sadrzajKosarice = document.getElementById("sadrzaj-kosarice");
    sadrzajKosarice.innerHTML = "";
    if (kosarica.length === 0) {
        sadrzajKosarice.innerHTML = "<p>Vaša košarica je prazna.</p>";
        return;
    }

    let ukupnaCijena = 0;
    kosarica.forEach((proizvod, index) => {
        ukupnaCijena += proizvod.cijena;

        const karticaKosarica = document.createElement("div");
        karticaKosarica.classList.add("kartica");
        karticaKosarica.innerHTML = `
            <img src="${proizvod.slika}" alt="${proizvod.naziv}">
            <h3>${proizvod.naziv}</h3>
            <p>${proizvod.cijena} €</p>
            <button class="gumb" onclick="ukloniIzKosarice(${index})">Ukloni</button>
        `;
        sadrzajKosarice.appendChild(karticaKosarica);
    });

    const ukupno = document.getElementById("ukupna-cijena");
    ukupno.innerText = ukupnaCijena.toFixed(2);
}


function ukloniIzKosarice(index) {
    kosarica.splice(index, 1); // Brišemo proizvod iz košarice
    localStorage.setItem("kosarica", JSON.stringify(kosarica));
    prikaziKosaricu(); // Ažuriramo košaricu na stranici
}


function zavrsiKupnju() {
    const kosaricaSekcija = document.getElementById("kosarica");
    const forma = document.createElement("div");
    forma.innerHTML = `
        <h3>Za završetak kupnje unesite svoje podatke</h3>
        <form id="login-form">
            <input type="email" id="email" placeholder="Unesite svoj email" required>
            <p id="email-napomena" style="font-size: 12px; color: red; margin-top: 5px;">Molimo vas da unesete važeći email adresu. (npr. korisnik@mail.com)</p>
            <input type="password" id="lozinka" placeholder="Unesite lozinku" required>
            <p id="lozinka-napomena" style="font-size: 12px; color: red; margin-top: 5px;">Lozinka mora imati minimalno 8 znakova, početi velikim početnim slovom i sadržavati barem jedno slovo i broj.</p>
            <button type="submit" class="gumb">Završi kupnju</button>
        </form>
    `;
    kosaricaSekcija.appendChild(forma);


    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const lozinka = document.getElementById("lozinka").value;


        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert("Molimo vas da unesete važeću email adresu!");
            return;
        }

        // lzinka: minimalno 8 znakova, prvo veliko slovo, jedno slovo i broj
        const lozinkaPattern = /^(?=[a-zA-Z0-9]*[A-Z])(?=[a-zA-Z0-9]*\d)[A-Za-z\d]{8,}$/;
        if (!lozinkaPattern.test(lozinka)) {
            alert("Lozinka mora imati najmanje 8 znakova, početi velikim početnim slovom i sadržavati barem jedno slovo i broj.");
            return;
        }

        if (email && lozinka) {
            alert("Kupnja uspješno završena! Potvrda će biti poslana na " + email);


            kosarica = [];
            localStorage.removeItem("kosarica");
            prikaziKosaricu();
        } else {
            alert("Molimo vas da unesete email i lozinku!");
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    prikaziProizvode();
    prikaziKosaricu();


    document.getElementById("naruci").addEventListener("click", zavrsiKupnju);
});

/*
Azt akarjuk, hogy amikor a felhasználó még nem választott szintet, akkor ne is jelenjen meg az input, ahova be lehet írni a számot 
lementeni
- select-mező, mert annak kell majd az értéke, hogyha nem nulla, akkor amiben van az input meg a button stb onnan remove-oljuk a 
display-none class-t 
- input mező (ki kell olvasni az értéket)
- button (megnyomjuk, akkor adjuk be az értéket meg hasonlítjuk össze a dolgokat)
- guess-form (amiben van a button, input), mert arról kell majd levenni a display:none-t 

szinteket csinálni 
*/

const playBtn = document.querySelector("#play");
const guessInput = document.querySelector("#guess");
const levelSelect = document.querySelector("#select");
const levelDescDiv = document.querySelector("#level-desc");
let level = 0;
let guessNumber = 0; max = 0;

levelSelect.addEventListener("change", ()=> {
    level = parseInt(this.value); //azért this. mert ez a levelSelect-re van és annak az értékét szeretnénk megszerezni és ez egy string -> parse
    
    if(level !== 0) {
        max = 10 ** level; //mert 10-100-1000 szintenként ennyi számot generálunk 
        guessForm.classList.remove("display-none");
        guessNumber = Math.floor(Math.random() * max) + 1;
        console.log(guessNumber);

        levelDescDiv.innerHTML = `<h4>A számok 1-től ${max}-ig lehetnek</h4>`

    } else {
        guessForm.classList.add("display-none");
    }
});

/*
fontos, hogy mindennek, amik számok pl. level, guessNumber, max annak hozzunk létre egy 0-val értéket!!!! 

az is fontos, hogy ha levesszük az if-ben a classList akkor az else-ben rakjuk vissza, mert ha egyszer levettük de visszaraktuk nullára 
akkor alapból nem fog eltünni, csak akkor ha az else-ben itt visszarakjuk -> guessForm.classList.add("display-none");
*/

playBtn.addEventListener("click", ()=> {
    const guess = parseInt(guessInput.value);

    //ha nem számot adtunk meg azt ugy lehet ellenőrizni, hogy van egy isNaN() metódus!! és ha az true, akkor nem number 
    if(isNaN(guess)) {
        alert("Nem megfelelően töltötted ki az input mezőt!");
        return;
    }

    //azt is ellenőrizzük, hogy nem nagyobb számot írt-e be, mint amennyi lehet, ez ugye a max -> max = 10 ** level
    if(guess > max) {
        alert(`Nem megfelelő számot adtál meg. (${1}-${max})`);
    }

    /*
    itt meg összehasonlítjuk a mi számunkat meg a felhasználó által beírt számot és megmondjuk neki, hogy kisebb-e vagy nagyobb 
    ha meg nyert, akkor kiírunk neki valamit
    */
    if(guess < guessNumber) {
        alert("Az általad beírt szám KISEBB, mint a véletlen szám!");
    } else if(guess > guessNumber) {
        alert("Az általad beírt szám NAGYOBB, mint a véletlen szám!");
    } else {
        alert("Nyertél egy ájfont!");
    }
});

/*
fontos, hogy csináljunk egy let-es változót olyanokra, amiket, mindkét eventListener-ben használunk, mert ha csak ott az egyikben hoznánk
létre, akkor nem tudjuk elérni a másikban, ezért fontos, hogy globális változó legyen amit több függvényben is szeretnénk használni!!!!!!

nagyon fontos, hogy a kikötéseket megcsináljuk és ott return legyen, meg az is, hogy alert és tudja a felhasználó, hogy mi a hiba

minden amit beszedünk az input-ból meg a select-ből azok string-ek lesznek, ezért parseInt-elni kell őket 
*/


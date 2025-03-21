/*  gode ideer og tips:

hvis du vil begrænse antallet af decimaler på dit resultat, så brug methoden toFixed(antal decimaler)  eks.  result.toFixed(2) giver et resultat med 2 decimaler

hvis du vil have navnet på din valuta med fra options i dit select tag, så undersøg denne linje...
 let myCurrency = mySelectElement.options[mySelectElement.selectedIndex].innerText
 prøv evt. at consol logge mySelectElement.options, hvor mySelectElement er det select element du har fundet i din DOM med getElementById()

 */
 async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (amount === "" || amount <= 0) {
        alert("Indtast et gyldigt beløb");
        return;
    }
    // her bruger jeg en API URL med latest currency rate
    const apiURL = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    // her går jeg ned og henter api url og venter på en response og venter også på response, efter den har hentet og fundet resultatet går den ned og viser os prisen på den nuværende valuta 
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const result = (amount * rate).toFixed(2);

        document.getElementById("result").textContent = `${result} ${toCurrency}`;
    } catch (error) {
        alert("Kunne ikke hente valutakurser. Prøv igen senere.");
    }
}

// ### **1. Funktion: `convertCurrency()`**
// Denne funktion kaldes, når brugeren trykker på "Omregn"-knappen. Den håndterer følgende opgaver:  
// - Henter input fra brugeren (beløb og valgte valutaer).  
// - Validerer om brugeren har indtastet et gyldigt beløb.  
// - Forespørger en API for at få den aktuelle valutakurs.  
// - Beregner det omregnede beløb.  
// - Opdaterer HTML'en for at vise resultatet.

// ### **2. Henter input fra HTML**
// ```js
// const amount = document.getElementById("amount").value;
// const fromCurrency = document.getElementById("fromCurrency").value;
// const toCurrency = document.getElementById("toCurrency").value;
// ```
// Disse tre linjer henter værdierne fra:  
// - **Beløbsfeltet** (`amount`)  
// - **"Fra"-valuta dropdown** (`fromCurrency`)  
// - **"Til"-valuta dropdown** (`toCurrency`)  

// ---

// ### **3. Validerer input**
// ```js
// if (amount === "" || amount <= 0) {
//     alert("Indtast et gyldigt beløb");
//     return;
// }
// ```
// - Hvis brugeren ikke har indtastet noget eller har angivet `0` eller et negativt tal, vises en advarsel (`alert`), og funktionen **stopper** (`return`).

// ---

// ### **4. API-URL til valutakurser**
// ```js
// const apiURL = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
// ```
// - API'en `exchangerate-api.com` returnerer valutakurser for en given valuta.  
// - Ved at sætte `fromCurrency` ind i URL'en, får vi valutakurserne baseret på den valgte startvaluta.

// Eksempel:  
// Hvis `fromCurrency` = `"DKK"`, vil URL'en blive:  
// ```
// https://api.exchangerate-api.com/v4/latest/DKK
// ```
// Dette vil give os valutakurser **med DKK som base**.

// ---

// ### **5. Henter valutakurser fra API'en**
// ```js
// const response = await fetch(apiURL);
// const data = await response.json();
// ```
// - `fetch(apiURL)`: Sender en HTTP-forespørgsel til API'en.  
// - `await`: Sikrer, at vi **venter på svar**, før vi fortsætter.  
// - `response.json()`: Konverterer API-svaret fra tekst til et JavaScript-objekt (`data`).

// Eksempel på svar fra API'en:  
// ```json
// {
//   "base": "DKK",
//   "rates": {
//     "EUR": 0.134,
//     "USD": 0.145,
//     "DKK": 1.0
//   }
// }
// ```
// Dette betyder:
// - 1 DKK = 0.134 EUR  
// - 1 DKK = 0.145 USD  

// ---

// ### **6. Henter den relevante valutakurs**
// ```js
// const rate = data.rates[toCurrency];
// ```
// - `data.rates` indeholder valutakurserne.  
// - `toCurrency` er den valuta, brugeren vil konvertere til.  
// - `data.rates[toCurrency]` finder den rigtige kurs.  

// Eksempel:  
// Hvis brugeren vælger `DKK → EUR`, får vi:  
// ```js
// const rate = data.rates["EUR"]; // rate = 0.134
// ```

// ---

// ### **7. Udfører valutaberegningen**
// ```js
// const result = (amount * rate).toFixed(2);
// ```
// - `amount * rate`: Multiplicerer brugerens beløb med valutakursen.  
// - `.toFixed(2)`: Begrænser resultatet til **to decimaler** for bedre læsbarhed.  

// Eksempel:  
// Hvis brugeren indtaster `100` DKK og kursen til EUR er `0.134`:  
// ```js
// const result = (100 * 0.134).toFixed(2); // result = "13.40"
// ```

// ---

// ### **8. Opdaterer resultatet i HTML**
// ```js
// document.getElementById("result").textContent = `${result} ${toCurrency}`;
// ```
// - Finder `<span id="result"></span>` i HTML og indsætter det beregnede beløb.  
// - Bruger skabelonstrenge (`` ` ``) til at inkludere resultatet og den valgte valuta.  

// Eksempel på, hvad brugeren ser:  
// ```
// Resultat: 13.40 EUR
// ```

// ---

// ### **9. Håndtering af fejl**
// ```js
// catch (error) {
//     alert("Kunne ikke hente valutakurser. Prøv igen senere.");
// }
// ```
// - Hvis der sker en fejl (f.eks. API'en ikke svarer), vises en fejlmeddelelse.  
// - `catch (error)` fanger og håndterer fejlen, så scriptet ikke crasher.
// 1. "use strict"; innebär att javascript inte försöker göra en massa förändringar/konverteringar etc på egen hand för att få kod att rulla utan problem.
// Istället ger din utvecklaren utökade felmeddelanden.
"use strict";

// 2a. "$document.ready(callback)", JQuery event
// Kör callback när html/css/javascript har lästs in fullständigt och DOM:en (DocumentObjectModel, eller document i javascript) har skapats.
// $(document) delen koverterar hela DOM:en till ett jquery-object och sen kör funktionen i ready. Alltså, när DOCUMENT är READY, kör callback function (CB).
// Namngivning av callback functions är frivillig, men det gör det lättare att läsa stack-traces etc. när man har ett namn på funktionen. 
// Du kan även definiera callback funktionen fristående (se utkommenterad kod för 2c längre ned. 

$(document).ready(function documentRdyCB() {

// 2b. "window.onload = callback" Vanilla JS
// Motsvarigheten till 2a utan JQuery. dock körs 2a funktionen före denna, så används båda gäller det att ha koll på ordningen. 
// Man kan även binda till ett event som heter "DOMContentLoaded" för att nå samma event som 2a använder.

// window.onload = function(){
//   body...;
// };


    // 3a. "document.getElementById" Vanilla JS (aka. ES5/EcmaScript 5) 
    // Funktion för att hämta ett html element med dess id. Observera att JQuery funktioner inte fungerar på detta objekt.
    // Du använder inte "CSS Selectors (#, . etc) utan metoden visar att det är id som du letar efter.
    var title = document.getElementById("PageTitle");

    // 3b. Vanilla JS 
    // Funktion för att hämta ett HTML element efter dess "class". 
    // Observera att id endast kan finnas en utav, medan classes kan flera element ha, så du kommer få tillbaka en array av element.
    // Nedanstående kod hämtar alla element, oavsett typ som har "form-group" som class.
    // var allFormGroups = document.getElementsByClassName("form-group");


    // 4a. Konvertera Vanilla JS object av ett html-element för att kunna använda JQuery funktionalitet på elementet.
    var $serverTitle = $(title);
    // 4b. Konvertera åt andra hållet, från JQuery object till Vanilla JS object.
    // Det ser ut som man hämtar första elementet i en array och det är precis vad man gör. 
    // Men när du hämtar den genom "[index]" konverterar den tillbaka till Vanilla JS.
    var titleElementJs = $serverTitle[0];

    // 5a. JQuery get value from element.
    // Hämtar ut värdet, eller "value", från $serverTitle elementet.
    // .val() utan parameter hämtar value från elementet.
    // Vad "value" är beror på elementet. Textbox är text, nummer-slider är en int/float/double/etc. (Number i JavaScript), h2 är text etc. 
    // Om elementet har en sluttagg (<div></div> istället för <input type="button" value="Text" />) är value eller val() alltid det som är mellan start- och sluttagg.
    // Exempel: "<div id="valueCheck">Detta är value</div>"
    // Om man kör $("#valueCheck").val() får du tillbaka strängen "Detta är value".
    var serverValue = $serverTitle.val();

    // 5b. JQuery set value on element. 
    // Sätter value på elementet. Många JQuery funktioner används för flera syften beroende på parametrar man skickar in. Samma koncept som 5a, fast tvärtom. 
    // Du sätter vad som ska vara inuti elementets start- och sluttagg eller attributen "value" på tex. en <input value="Detta är value" />.
    $("#title").val(serverValue);
});

// 2c. JQuery Event
// Exakt samma funktionalitet som 2a) men callback funktionen är definierad seperat. 
// Det är användbart om du vill kunna återanvända funktionen, tex att två events kör samma funktion.
// $(document).ready(documentRdyCB);
//
// function documentRdyCB() {
//     var $serverTitle = $("#PageTitle");
//     var serverValue = $serverTitle.val();
//     $("#title").val(serverValue);
// }

// 6a. IIFE (Immediately-Invoked Function Expression), uttalas "Iffy".
// Väldigt viktigt "pattern" som låter alla variabler, funktioner etc. undvika att hamna på "Global Scope".
// Alla Javascript variabler, object och namngivna funktioner tillhör ett "namespace". 
// Javascripts normala variabellivslängd är knuten till funktionen den definierades i. 
// Om du skapar variabler rakt i en *.js fil eller i en <script></script>-tagg har de ingen funktion knuten till sig. 
// JS går då till "root-namespacet" vilket kallas "Global Scope".

// IIFE-exempel:
// "use strict";
// (function(){
//   ...
//   Code goes here
//   ...
// }())

//
// 6b. Ytterligare information
// Enda anledningen du har att fästa variabler på "Global Scope" är om de behöver vara åtkomliga från andra *.js-filer.
// Men då exponerar man sällan enskilda variabler utan ofta en function som i sin tur returnar de variabler/functions man vill sätta som "public".
// Detta kallas "Revealing Module Pattern" och används flitigt när du försöker efterlikna objektorienterad kod.
// Detta "pattern" låter dig skapa en funktion som ger liknande funktionalitet som en Service klass i C# (Android Services är annorlunda om jag förstått rätt.).
// Med detta menas ofta att den har ett specifikt syfte, den har funktionalitet som bara kan användas internt och du kan skapa åtkomliga (public i C#) variabler/funktioner.
// Du kan helt enkelt "gömma" komplexitet i "private" funktioner och låta "publics" var ingången till funktionaliteten som denna Service/Modul erbjuder.

// 6c. Blogg (del 3 av 3 om JS Patterns) av Dan Wahlin runt "Revealing Module Pattern"
// Ett av de tre viktigaste programmeringsmönster inom JS.
// https://weblogs.asp.net/dwahlin/techniques-strategies-and-patterns-for-structuring-javascript-code-revealing-module-pattern
// Inget man behöver lära sig direkt, men du kommer älska det när du förstått poängen med det.
// ES6 (Senaste Javascript versionen) använder class syntax med contructor istället för detta pattern, men i äldre browsers genereras ändå detta pattern.


// 6d. IIFE (se 6a)
// Omsluter koden och undviker att tex. "var $container" exponeras mot Global Scope.
// Om tex. JQuery hade haft en variabel med det namnet som också är definierad på Global Scope, kommer de krocka och du kan få värden du inte har en aning om vart de kommer ifrån.
(function () {
    var $container = $("#formSection");

    var convertedToJq = $(title);


    // 7a. Event tillagt med JQuery.
    // Registrerat clickevent med <html> som "base-element" som i sin tur skickar upp eventet till #registerUserBtn.
    $("html").on("click", "#registerUserBtn", function registerCb(ev, el) {

        // Vanilla JS, Block other Actions funktion
        // Om elementet du binder eventet mot (#registerUserBtn) har andra events bundna eller några standard actions vid click
        // <input type="submit" /> tex. postar det formulär (<form>) den ingår i automatiskt.
        // Vill du att endast ditt event-callback ska köras använder du denna funktion.
        ev.preventDefault();

        // JQuery Ajax (Async server calls)
        $.ajax({
            // Server url to make request to.
            url: '/Account/_RegisterForm',

            // Request-type ("GET"/"POST"/"PUT"/"DELETE"/etc) 
            type: "GET",

            // What type of Data you are sending TO the server. Aka. MIME-Type
            // Examples are 'application/json', 'image/jpeg', 'audio/*' etc.
            // default = 'application/x-www-form-urlencoded; charset=UTF-8'
            // See link for documentation on avalible types.
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',

            // What type of Data you're expecting to get back FROM the Server.
            // Same avalible types as contentType.
            dataType: "html",

            // The actual data (Http Request body/Url Params) that needs to be sent to Server.
            data: {},

            // Function callback for when the request comes back from Server with 200* Status.
            // response is data sent back FROM the Server.
            success: function registerSuccess(response) {
                debugger;

                // Jquery Animation (500ms)
                $container.fadeOut(500);

                // JQuery Replace html in $container with the response from the server (typeof 'html')
                // And Animation chained onto the replace function.
                $container.html(response).fadeIn(500);

                var $title = $("#PageTitle")
                $("#title").val($title.val());
            }
        });
    });

    $("html").on("click", "#loginUserBtn", function loginCb(ev, el) {
        ev.preventDefault();
        $.ajax({
            url: '/Account/_LoginForm',
            type: "GET",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: "json",
            data: {},
            success: function loginSuccess(response) {
                debugger;
                $("#formSection").html(response);

                var $title = $("#PageTitle")
                $("#title").val($title.val());
            }
        });
    })


}());
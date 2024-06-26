
const trainingsplanSec = document.getElementById("trainingsplanSec");
const rekordeSec = document.getElementById("rekordeSec");
const trainingErklaerenSec = document.getElementById("trainingErklaerenSec");

const trainingHIIT = document.getElementById("trainingHIIT")
const ganzkoerperEigSec = document.getElementById("ganzkoerperEigSec")
const ganzkoerperZusSec = document.getElementById("ganzkoerperZusSec")

const trainingHIITOne = document.getElementById("trainingHIITOne")
const trainingHIITTwo = document.getElementById("trainingHIITTwo")
const trainingHIITThree = document.getElementById("trainingHIITThree")

const ganzkoerperEigOne = document.getElementById("ganzkoerperEigOne")
const ganzkoerperEigTwo = document.getElementById("ganzkoerperEigTwo")
const ganzkoerperEigThree = document.getElementById("ganzkoerperEigThree")

const ganzkoerperZusOne = document.getElementById("ganzkoerperZusOne")
const ganzkoerperZusTwo = document.getElementById("ganzkoerperZusTwo")
const ganzkoerperZusThree = document.getElementById("ganzkoerperZusThree")

const rekordeSquats = document.getElementById("rekordeSquats")
const rekordeLatzug = document.getElementById("rekordeLatzug")
const rekordeBankdruecken = document.getElementById("rekordeBankdruecken")
const rekordeLiegestueze = document.getElementById("rekordeLiegestuetze")
const rekordeKlimmzuege = document.getElementById("rekordeKlimmzuege")
const rekordeKreuzheben = document.getElementById("rekordeKreuzheben")

const erklaerenSquats = document.getElementById("erklaerenSquats")
const erklaerenLiegestuetze = document.getElementById("erklaerenLiegestuetze")
const erklaerenKreuzheben = document.getElementById("erklaerenKreuzheben")
const erklaerenLatzug = document.getElementById("erklaerenLatzug")
const erklaerenKlimmzuege = document.getElementById("erklaerenKlimmzuege")
const erklaerenBankdruecken = document.getElementById("erklaerenBankdruecken")

const allSections: (HTMLElement | null)[] = [
  trainingsplanSec, rekordeSec, trainingErklaerenSec, trainingHIIT, ganzkoerperEigSec, ganzkoerperZusSec,
  trainingHIITOne, trainingHIITTwo, trainingHIITThree, ganzkoerperZusOne, ganzkoerperZusTwo, ganzkoerperZusThree,
  ganzkoerperEigOne, ganzkoerperEigTwo, ganzkoerperEigThree, rekordeSquats, rekordeLatzug, rekordeBankdruecken,
  rekordeKlimmzuege, rekordeLiegestueze, rekordeKreuzheben, erklaerenBankdruecken, erklaerenKlimmzuege,
  erklaerenKreuzheben, erklaerenLatzug, erklaerenLiegestuetze, erklaerenSquats
];//alle benötigten elemente werden in entsprechenden Variablen gespeichert und in einem allumfassenden Array eingegeben


//Funktion um alle Sektionen nach Bedarf ein-/auszublenden
function showHideSections(sectionId: string) {
  //entsprechende HTML Elemente werden in einer Constanten gespeichert um sie später aufzurufen
  const section: HTMLElement | null = document.getElementById(sectionId);
  //if-else um zu überprüfen ob die Sektion im Array der angegebenen Sektion welche auf Block geschaltet werden soll zu überprüfen
  if (section) {
    //foreach für genau diese Überprüfung
    allSections.forEach(element => {
      if (element){
        if (element === section) {
          element.style.display = "block";
        } else {
          //wenn die Sektion nicht der Ausgewählten entspricht wird diese auf display: none gesetzt
          element.style.display = "none";
        }
      } else {
        console.log("Element mit der ID $(sectionId) kann nicht aufgerufen werden")
      }
    });
  }
}
showHideSections("trainingsplanSec")


//funktion um das Training mit Klick auf den Startbutton starten zu lassen
function startTraining(sectionList: string, sectionStart: string, sectionTimer: string, sectionPowRes: string, repeats: number){
  //entsprechende HTML Elemente werden in Constanten gespeichert
  const list: HTMLElement | null = document.getElementById(sectionList)
  const start: HTMLElement | null = document.getElementById(sectionStart)

  //wenn die beiden Elemente nicht null sind, dann...
  if (list && start){
    //werden sie auf Display: none & block gesetzt
    start.style.display = "none"
    list.style.display = "block"
  }
  else {
    //ansonsten wird ein Error ausgegeben
    console.log("Error, Elemente nicht gefunden")
  }
  //weitere Funktion wird aufgerufen um den Timer zu starten
  startTimer(sectionTimer, sectionPowRes, repeats)
}


//Funktion zum starten des Trainingstimers
function startTimer(timer: string, powRes: string, repeats: number) {
  //Sekunden für Power/Rest werden hier definiert
  let secondsPower = 45;
  let secondsRest = 15
  let secondsBigRest = 120
  //entsprechend gebrauchte HTML Elemente werden in Constanten gespeichert
  const timerElement: HTMLElement | null = document.getElementById(timer);
  const PowerRest: HTMLElement | null = document.getElementById(powRes)

  //die TimerIntervall Constante wird mit einem SetIntervall versehen um einen Intervall von 1 Sekunde zu starten
  const timerInterval = setInterval(() => {
    //wenn die Wiederholungen größer 0 sind, dann... 
    if (repeats > 0){
      //wenn die Sekunden für das Training gleich/kleiner Null sind, dann..
      if (secondsPower <= 0) {
        //wenn die Elemente vorhanden sind, dann...
        if(timerElement && PowerRest){
          //werden die Sekunden für die Pause formatiert und die Pause wird eingeleitet
          timerElement.textContent = formatTime(secondsRest);
          //Die Pause wird angezeigt
          PowerRest.textContent = "Pause"
        }
        //Sekunden Pause werden -1 gerechnent
        secondsRest--;
        //wenn die Sekunden der Pause gleich/kleiner 0 sind
        if (secondsRest <= 0){
          //wird der Intervall angehalten, Wiederholungen -1 gerechnet und ein neuer Timer gestartet
          clearInterval(timerInterval)
          repeats--;
          startTimer(timer, powRes, repeats)
        }
        //wenn die Pausenzeit gleich/kleiner 0 ist 
      } else {
        //und die Elemente vorhanden sind
        if(timerElement && PowerRest){
          //werden die Sekunden von dem Gas geben formatiert und angezeigt, dass gerade Training ist
          timerElement.textContent = formatTime(secondsPower);
          PowerRest.textContent = "Gib Gas!!!"
        }
        //Sekunden für das Training werden -1 gerechnet
        secondsPower--;
      }
      //wenn die Wiederholungen kleiner/gleich 0 sind
    }else{
      //und die Elemente vorhanden sind
      if(timerElement && PowerRest){
        //werden die Sekunden von der großen Pause formatiert und angezeigt, dass große Pause von 2 min ist
        timerElement.textContent = formatTime(secondsBigRest);
        PowerRest.textContent = "Große Pause";
      }
      //Sekunden von der großen Pause werden -1 gerechnet
      secondsBigRest--
      //wenn die Sekunden von der großen Pause kleiner/gleich 0 sind
      if(secondsBigRest <= 0)
        //wird ein neuer Intervall gestartet
        startTimer(timer, powRes, repeats)
    }
    //der Intervall wird auf 1000/1 Sekunde gesetzt
  }, 1000);
}

// Funktion, die eine Zeitangabe in Sekunden in ein formatiertes Zeitformat umwandelt
function formatTime(seconds: number): string {
  // Berechnung der Minuten durch ganzzahlige Division von Sekunden durch 60
  const minutes = Math.floor(seconds / 60);
  // Berechnung der verbleibenden Sekunden durch Modulo-Operation mit 60
  const remainingSeconds = seconds % 60;
  // Formatierung der Minuten als zweistellige Zahl (z. B. "02" anstelle von "2")
  const formattedMinutes = String(minutes).padStart(2, "0");
  // Formatierung der Sekunden als zweistellige Zahl (z. B. "07" anstelle von "7")
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  // Zusammensetzen der formatierten Minuten und Sekunden zu einem Zeitformat (Minuten:Sekunden)
  return `${formattedMinutes}:${formattedSeconds}`;
}
// Diese Funktion startet das volle Training, indem sie die Anzeige des Startbuttons ausblendet,
// die Anzeige der Trainingsliste einschaltet und eine Nachricht für die Ruhephase anzeigt.
function startFullTraining(start: string, list: string, rest: string){
  // Holen der DOM-Elemente für den Startbutton, die Trainingsliste und den Ruhephasen-Text
  const sectionStart: HTMLElement | null = document.getElementById(start);
  const sectionList: HTMLElement | null = document.getElementById(list);
  const sectionRest: HTMLElement | null = document.getElementById(rest);

  // Überprüfen, ob alle DOM-Elemente erfolgreich geholt wurden
  if(sectionStart && sectionList && sectionRest){
    // Ausblenden des Startbuttons und Einblenden der Trainingsliste
    sectionStart.style.display = "none";
    sectionList.style.display = "block";
    // Anzeigen einer Nachricht für die Ruhephase
    sectionRest.textContent = "Gib Gas!!!";
  }
}



// Diese Variable speichert die ID des Timers für die Ruhephase
let timerRest: number | undefined;

// Diese Variable speichert die Anzahl der bereits durchgeführten Wiederholungen bis zum Abschluss
let repeatsTillFinish: number = 0;

// Diese Funktion wird aufgerufen, um den Timer für die Ruhephase fortzusetzen
function weiter(elementID: string) {

  let timer: string = "";
  let repeats: number = 0;
  let dotts: string[] = [];

  const element: HTMLElement | null = document.getElementById(elementID)

  if (element){
    timer = element.getAttribute('dataTimer') || '';
    repeats = parseInt(element.getAttribute('dataRepeats') || '0', 10);
    dotts = JSON.parse(element.getAttribute('dataDotts') || '[]');
  }

  // Diese Variable speichert die aktuelle Anzahl der bereits durchgeführten Wiederholungen
  let remainingRepeats: number = repeats - repeatsTillFinish;

  // Aufrufen der Funktion startTimer2, um den Timer fortzusetzen
  startTimer2(timer, remainingRepeats, dotts);
}



// Diese Funktion startet den Timer für die Ruhephase
function startTimer2(sectionTimer: string, remainingRepeats: number, dotts: string[]) {

  // Initialisierung der Restzeit für die Ruhephase
  let secondsRest = 120;
  // Holen des DOM-Elements für den Timer
  const timerElement: HTMLElement | null = document.getElementById(sectionTimer);

  // Überprüfen, ob der Timer bereits läuft
  if (timerRest !== undefined) {
    // Wenn noch Wiederholungen übrig sind
    if (remainingRepeats > 0) {
      // Überprüfen, ob das DOM-Element für den Timer vorhanden ist
      if (timerElement) {
        // Den Timer zurücksetzen und aktualisieren, eine Nachricht anzeigen und den Fortschritt anzeigen
        clearInterval(timerRest)
        timerElement.textContent = "Gib Gas!!!";
        timerRest = undefined
        repeatsTillFinish++
      }
    const currentDott: string = dotts[remainingRepeats - 1];
    const HTMLDott = document.getElementById(currentDott);
    console.log(HTMLDott)


    if (HTMLDott) {
      HTMLDott.style.display = "block";
        
      console.log(remainingRepeats + ": 1");
      //}
    } else {
      if (timerElement){
        clearInterval(timerRest)
        timerElement.textContent = "Training ist vorbei"
      }
    }
} else {
  timerRest = window.setInterval(() => {
    if (secondsRest > 0) {
    // Wenn noch Zeit übrig ist, die Restzeit aktualisieren und anzeigen
      if (timerElement) {
        timerElement.textContent = formatTime(secondsRest);
        
      }  
      secondsRest--;
    } else {
      // Wenn die Ruhezeit abgelaufen ist, den Timer zurücksetzen und aktualisieren
      clearInterval(timerRest);   
      timerRest = undefined;

      if (timerElement) {
        timerElement.textContent = "Gib Gas!!!";
      }

      console.log(remainingRepeats + ": 2");
      repeatsTillFinish++;
    }
  }, 1000);
}
}
}

function zurueck(){
  repeatsTillFinish--
}


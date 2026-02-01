// Task definitions for the game
export const tasks = [
  {
    id: 1,
    from: "Chef",
    subject: "Willkommen! Deine erste Aufgabe",
    body: `Hallo neuer Kollege!

Willkommen bei TechCorp! Ich bin dein Chef, Herr Müller.

Deine erste Aufgabe ist ganz einfach: In der Datei Login.java gibt es einen Tippfehler. 
Der Datentyp "bollean" existiert nicht - es muss "boolean" heißen.

Fix das und deploy!

Gruß,
Herr Müller`,
    difficulty: "Einfach",
    reward: 50,
    xp: 10,
    fileName: "Login.java",
    initialCode: `public class Login {
    // FIXME: Da ist ein Tippfehler!
    public bollean isUserLoggedIn = true;
    
    public void checkLogin() {
        if (isUserLoggedIn) {
            System.out.println("User ist eingeloggt");
        }
    }
}`,
    solutionCheck: (code) => {
      return code.includes("boolean") && !code.includes("bollean");
    },
    successMessage: "✅ Kompilierung erfolgreich! Der Login funktioniert wieder.",
    errorMessage: "❌ Compiler Error: 'bollean' ist kein bekannter Datentyp in Java.",
    hint: "Tipp: Schau dir die Zeile mit 'bollean' genau an..."
  },
  {
    id: 2,
    from: "Senior Dev (Lisa)",
    subject: "Null Pointer Exception im User-Service",
    body: `Hey!

Wir haben einen Bug im Produktivsystem. Der User-Service wirft eine NullPointerException.

Das Problem: Die Variable "userName" wird nie initialisiert, bevor sie benutzt wird.
Du musst sie mit einem Default-Wert initialisieren.

Deadline: Heute noch!

LG Lisa`,
    difficulty: "Einfach",
    reward: 75,
    xp: 15,
    fileName: "UserService.java",
    initialCode: `public class UserService {
    private String userName;
    
    public void printWelcome() {
        // Dieser Code wirft NullPointerException!
        System.out.println("Willkommen, " + userName.toUpperCase());
    }
    
    public void setUserName(String name) {
        this.userName = name;
    }
}`,
    solutionCheck: (code) => {
      // Check if userName is initialized with some value
      return code.includes('userName = "') || code.includes("userName = '") || 
             code.includes('userName = ""') || code.includes("userName = \"\"") ||
             code.includes('= "Guest"') || code.includes('= "Gast"') ||
             code.includes('= "Default"') || code.includes('= "User"');
    },
    successMessage: "✅ Keine NullPointerException mehr! Der Service läuft.",
    errorMessage: "❌ java.lang.NullPointerException at UserService.printWelcome(UserService.java:6)",
    hint: "Tipp: Initialisiere die Variable direkt bei der Deklaration: private String userName = \"...\""
  },
  {
    id: 3,
    from: "QA Team",
    subject: "DRINGEND: Endlosschleife in Calculator",
    body: `ACHTUNG! KRITISCH!

Der Server hängt sich auf wegen einer Endlosschleife im Calculator.

Das Problem: Die for-Schleife zählt nie hoch, weil das "i++" fehlt!

Bitte SOFORT fixen, die CPU brennt!

QA Team`,
    difficulty: "Mittel",
    reward: 100,
    xp: 25,
    fileName: "Calculator.java",
    initialCode: `public class Calculator {
    public int sumUpTo(int n) {
        int sum = 0;
        
        // WARNUNG: Diese Schleife endet nie!
        for (int i = 0; i < n; ) {
            sum += i;
        }
        
        return sum;
    }
}`,
    solutionCheck: (code) => {
      return code.includes("i++") || code.includes("i += 1") || code.includes("i = i + 1");
    },
    successMessage: "✅ Schleife repariert! CPU-Auslastung normalisiert.",
    errorMessage: "❌ TIMEOUT: Programm antwortet nicht (Endlosschleife detektiert)",
    hint: "Tipp: In einer for-Schleife braucht man: for(init; bedingung; INKREMENT)"
  }
];

export const getTaskById = (id) => tasks.find(t => t.id === id);
export const getUncompletedTasks = (completedIds) => tasks.filter(t => !completedIds.includes(t.id));

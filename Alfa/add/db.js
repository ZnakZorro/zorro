
class SimpleDB {
    constructor(tableName) {
        this.tableName = tableName;
    }

    // Pobiera wszystkie rekordy
    getAll() {
        const data = localStorage.getItem(this.tableName);
        return data ? JSON.parse(data) : [];
    }

    // Zapisuje całą tablicę do localStorage
    _save(data) {
        localStorage.setItem(this.tableName, JSON.stringify(data));
    }

    // Dodaje nowy rekord
    create(item) {
        const data = this.getAll();
        const newItem = {
            id: Date.now().toString(), // Prosty unikalny identyfikator
            createdAt: new Date().toISOString(),
            ...item
        };
        data.push(newItem);
        this._save(data);
        return newItem;
    }

    // Pobiera jeden rekord po ID
    getById(id) {
        return this.getAll().find(item => item.id === id);
    }

    // Aktualizuje rekord
    update(id, updatedFields) {
        let data = this.getAll();
        const index = data.findIndex(item => item.id === id);
        
        if (index !== -1) {
            data[index] = { ...data[index], ...updatedFields };
            this._save(data);
            return true;
        }
        return false;
    }

    // Usuwa rekord
    delete(id) {
        const data = this.getAll();
        const filteredData = data.filter(item => item.id !== id);
        this._save(filteredData);
    }

    // Czyści całą "tabelę"
    clear() {
        localStorage.removeItem(this.tableName);
    }
}


///////////////////////
/*
// 1. Inicjalizacja "tabeli"
const notesDB = new SimpleDB('00user_notes');

// 2. Dodawanie danych
notesDB.create({ title: "Zakupy", content: "Mleko, jajka, chleb" });
notesDB.create({ title: "Projekt ESP32", content: "Poprawić fonty na e-ink" });

// 3. Pobieranie i wyświetlanie
console.table(notesDB.getAll());

// 4. Aktualizacja
const myNote = notesDB.getAll()[0];
notesDB.update(myNote.id, { content: "Mleko, jajka i piwo" });

// 5. Usuwanie
// notesDB.delete(myNote.id);

*/


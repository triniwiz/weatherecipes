import {Couchbase} from 'nativescript-couchbase';
export class CouchBaseDB {
    private db: any;
    constructor() { }
    init() {
        this.db = new Couchbase("weatherecipes");
        this.db.createView("weatherecipes", "1", (document, emitter) => {
            emitter.emit(document._id, document);
        });
    }
    getDataBase() {
        return this.db;
    }
}


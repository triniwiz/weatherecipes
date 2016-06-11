var couchbaseModule = require("nativescript-couchbase");
import {Injectable} from '@angular/core';
@Injectable()
export class DBService {
    db;
    locationId;
    constructor() {
        this.locationId = '';
        this.db = new couchbaseModule.Couchbase("weatherecipes");
        this.db.createView("location", "1", function (document, emitter) {
            emitter.emit(JSON.parse(document)._id, document);
        });
    }

    setLocation(location): Promise<any> {
        return new Promise((resolve, reject) => {
            var rows = this.db.executeQuery("location");
             var arr = Object.keys(rows);
              this.db.createDocument(Object.assign(location, { type: 'manual' }));
        /*    if (this.locationId.length > 1) {
                
                for (var i in rows) {
                    if (rows.hasOwnProperty(i)) {
                        if (JSON.parse(rows[i]).type === 'auto') {
                            this.locationId = JSON.parse(rows[i]).id;
                            try {
                                this.db.createDocument(JSON.parse(rows[i]).id, Object.assign(location, { type: 'manual' }));
                                resolve();
                            } catch (ex) {
                                reject(ex);
                            }
                        } 
                    }
                }
            } else if() {
                this.db.updateDocument(this.locationId, Object.assign(location, { type: 'auto' }));
            }*/
        });
    }
    createDoc(doc): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.db.createDocument(doc));
            } catch (ex) {
                reject(ex);
            }
        });
    }

    getDoc(docId): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.db.getDocument(docId));
            } catch (ex) {
                reject(ex);
            }
        });
    }

    updateDoc(docId, doc): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.db.updateDocument(doc, doc));
            } catch (ex) {
                reject(ex);
            }
        });
    }
    deleteDoc(docId): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.db.deleteDocument(docId));
            } catch (ex) {
                reject(ex);
            }
        });
    }
}
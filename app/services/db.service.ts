import {Couchbase} from 'nativescript-couchbase';
import {Injectable} from '@angular/core';
import {CouchBaseDB} from '../couchbase.db';
@Injectable()
export class DBService {
    db;
    constructor(private couchbaseInstance: CouchBaseDB) {
        this.db = this.couchbaseInstance.getDataBase();
    }

    createDoc(doc, docId?): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                if (docId) {
                    const id = this.db.createDocument(doc, docId);
                    resolve(id);
                } else {
                    const id = this.db.createDocument(doc);
                    resolve(id);
                }
            } catch (ex) {
                reject(ex);
            }
        });
    }

    getDoc(docId): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const doc = this.db.getDocument(docId);
                resolve(doc);
            } catch (ex) {
                reject(ex);
            }
        });
    }

    updateDoc(docId, doc): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const newDoc = this.db.updateDocument(docId, doc);
                resolve(newDoc);
            } catch (ex) {
                reject(ex);
            }
        });
    }
    deleteDoc(docId): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const id = this.db.deleteDocument(docId);
                resolve(id);
            } catch (ex) {
                reject(ex);
            }
        });
    }
}
import { Injectable } from '@nestjs/common';

@Injectable()
export class Storage {
    private static data = {};

    upsert(key: string, value: any) {
        Storage.data[key] = value;
    }

    get(key: string): any {
        return Storage.data[key] || false ;
    }

    getAll(): any {
        return Storage.data;
    }

    delete(key) {
        delete Storage.data[key];
    }

    clear() {
        Storage.data = {};
    }
}

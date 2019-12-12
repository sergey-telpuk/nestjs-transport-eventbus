import {Injectable} from '@nestjs/common';

@Injectable()
export class Storage {
    static data = {};

    upsert(key: string, value: any) {
        Storage.data[key] = value;
    }

    get(key: string): any {
        return Storage.data[key];
    }

    delete(key) {
        delete Storage.data[key];
    }

    clear() {
        Storage.data = {}
    }
}

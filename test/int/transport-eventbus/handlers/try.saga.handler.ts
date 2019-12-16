import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map } from 'rxjs/operators';
import { SagaEvent } from '../events/test.events';
import { TrySagaCommand } from '../commands/try.saga.command';

@Injectable()
export class TrySagaHandler {
    @Saga()
    dragonKilled = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(SagaEvent),
            map((event: SagaEvent) => {
                return new TrySagaCommand(event.message);
            }),
        );
    }
}

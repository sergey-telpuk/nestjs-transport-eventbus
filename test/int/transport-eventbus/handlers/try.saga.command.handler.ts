import { TrySagaCommand } from '../commands/try.saga.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Storage } from '../storage/storage';

@CommandHandler(TrySagaCommand)
export class TrySagaCommandHandler implements ICommandHandler<TrySagaCommand> {
    constructor(
        private readonly storage: Storage
    ) {
    }

    async execute(command: TrySagaCommand) {
        this.storage.upsert('TrySagaCommand', command.message);
    }
}

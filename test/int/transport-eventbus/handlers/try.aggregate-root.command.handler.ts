import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TryAggregateRootCommand } from '../commands/try.aggregate-root.command';
import { Inject } from '@nestjs/common';
import { TRANSPORT_EVENT_BUS_PUBLISHER } from '../../../../src/constants/transport.event-bus.constants';
import { TestModel } from '../model/test.model';

@CommandHandler(TryAggregateRootCommand)
export class TryAggregateRootCommandHandler implements ICommandHandler<TryAggregateRootCommand> {
    constructor(
        @Inject(TRANSPORT_EVENT_BUS_PUBLISHER) private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: TryAggregateRootCommand) {
        const {message} = command;
        const aggregator = this.publisher.mergeObjectContext(
            new TestModel()
        );
        aggregator.applyEvent(message);
        aggregator.commit();
    }
}

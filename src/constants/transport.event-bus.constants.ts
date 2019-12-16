
export const TRANSPORT_EVENT_BUS_PATTERN = process.env.TRANSPORT_EVENT_BUS_PATTERN || 'TRANSPORT_EVENT_BUS_PATTERN';
export const EXCLUDE_DEF = '__EXCLUDE_DEF';
export const TRANSPORTS = '__TRANSPORTS';
export const TRANSPORT = '__TRANSPORT';
export const EVENT_NAME = '__EVENT_NAME';
export const TRANSPORT_EVENT_BUS_SERVICE = Symbol('TransportEventBusService');
export const TRANSPORT_EVENT_BUS_PUBLISHER = Symbol('TransportEventBusPublisher');

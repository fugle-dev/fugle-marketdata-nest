import { Inject } from '@nestjs/common';
import { FUGLE_MARKETDATA_REST_CLIENT, FUGLE_MARKETDATA_WEBSOCKET_CLIENT } from '../fugle-marketdata.constants';

export const InjectRestClient = (): ParameterDecorator => {
  return Inject(FUGLE_MARKETDATA_REST_CLIENT);
};

export const InjectWebSocketClient = (): ParameterDecorator => {
  return Inject(FUGLE_MARKETDATA_WEBSOCKET_CLIENT);
};

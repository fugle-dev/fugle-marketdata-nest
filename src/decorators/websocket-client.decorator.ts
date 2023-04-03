import { Inject } from '@nestjs/common';
import { FUGLE_MARKETDATA_WEBSOCKET_CLIENT } from '../fugle-marketdata.constants';

export const InjectWebSocketClient = (): ParameterDecorator => {
  return Inject(FUGLE_MARKETDATA_WEBSOCKET_CLIENT);
};

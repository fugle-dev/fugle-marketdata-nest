import { Inject } from '@nestjs/common';
import { FUGLE_MARKETDATA_REST_CLIENT } from '../fugle-marketdata.constants';

export const InjectRestClient = (): ParameterDecorator => {
  return Inject(FUGLE_MARKETDATA_REST_CLIENT);
};

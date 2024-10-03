import { FUGLE_MARKETDATA_REST_CLIENT, FUGLE_MARKETDATA_WEBSOCKET_CLIENT } from '../fugle-marketdata.constants';

export function getRestClientToken() {
  return FUGLE_MARKETDATA_REST_CLIENT;
}

export function getWebSocketClientToken() {
  return FUGLE_MARKETDATA_WEBSOCKET_CLIENT;
}

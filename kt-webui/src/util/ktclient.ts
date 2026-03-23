import { AWClient as KTClient } from 'kt-client';

import { useSettingsStore } from '~/stores/settings';

let _client: KTClient | null;

export function createClient(force?: boolean): KTClient {
  let baseURL = '';

  const production = typeof PRODUCTION !== 'undefined' && PRODUCTION;

  // If running with `npm node dev`, use testing server as origin.
  // Works since CORS is enabled by default when running `kt-server --testing`.
  if (!production) {
    const kt_server_url = typeof KT_SERVER_URL !== 'undefined' && KT_SERVER_URL;
    baseURL = kt_server_url || 'http://127.0.0.1:5666';
  }

  if (!_client || force) {
    _client = new KTClient('kt-webui', {
      testing: !production,
      baseURL,
    });
  } else {
    throw 'Tried to instantiate global KTClient twice!';
  }
  return _client;
}

export function configureClient(): void {
  const settings = useSettingsStore();
  _client.req.defaults.timeout = 1000 * settings.requestTimeout;
}

export function getClient(): KTClient {
  if (!_client) {
    throw 'Tried to get global KTClient before instantiating it!';
  }
  return _client;
}

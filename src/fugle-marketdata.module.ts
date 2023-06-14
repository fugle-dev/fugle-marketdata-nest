import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { RestClient, WebSocketClient } from '@fugle/marketdata';
import { FugleMarketDataModuleOptions, FugleMarketDataModuleAsyncOptions, FugleMarketDataModuleOptionsFactory } from './interfaces';
import { FUGLE_MARKETDATA_REST_CLIENT, FUGLE_MARKETDATA_WEBSOCKET_CLIENT, FUGLE_MARKETDATA_CLIENT_OPTIONS } from './fugle-marketdata.constants';

@Global()
@Module({})
export class FugleMarketDataModule {
  static forRoot(options: FugleMarketDataModuleOptions): DynamicModule {
    return {
      module: FugleMarketDataModule,
      providers: [
        {
          provide: FUGLE_MARKETDATA_REST_CLIENT,
          useValue: new RestClient(options),
        },
        {
          provide: FUGLE_MARKETDATA_WEBSOCKET_CLIENT,
          useValue: new WebSocketClient(options),
        },
      ],
      exports: [
        FUGLE_MARKETDATA_REST_CLIENT,
        FUGLE_MARKETDATA_WEBSOCKET_CLIENT,
      ],
    };
  }

  static forRootAsync(options: FugleMarketDataModuleAsyncOptions): DynamicModule {
    return {
      module: FugleMarketDataModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: FUGLE_MARKETDATA_REST_CLIENT,
          useFactory: (options: FugleMarketDataModuleOptions) => new RestClient(options),
          inject: [FUGLE_MARKETDATA_CLIENT_OPTIONS],
        },
        {
          provide: FUGLE_MARKETDATA_WEBSOCKET_CLIENT,
          useFactory: (options: FugleMarketDataModuleOptions) => new WebSocketClient(options),
          inject: [FUGLE_MARKETDATA_CLIENT_OPTIONS],
        },
      ],
      exports: [
        FUGLE_MARKETDATA_REST_CLIENT,
        FUGLE_MARKETDATA_WEBSOCKET_CLIENT,
      ],
    };
  }

  private static createAsyncProviders(options: FugleMarketDataModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: FugleMarketDataModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: FUGLE_MARKETDATA_CLIENT_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: FUGLE_MARKETDATA_CLIENT_OPTIONS,
      useFactory: async (optionsFactory: FugleMarketDataModuleOptionsFactory) =>
        optionsFactory.createFugleMarketDataOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}

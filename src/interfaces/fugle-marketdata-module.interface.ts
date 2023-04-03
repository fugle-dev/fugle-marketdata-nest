import { ModuleMetadata, Type } from '@nestjs/common';
import { ClientOptions } from '@fugle/marketdata/lib/client-factory';

export interface FugleMarketDataModuleOptions extends ClientOptions {}

export interface FugleMarketDataModuleOptionsFactory {
  createFugleMarketDataOptions(): Promise<FugleMarketDataModuleOptions> | FugleMarketDataModuleOptions;
}

export interface FugleMarketDataModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<FugleMarketDataModuleOptionsFactory>;
  useClass?: Type<FugleMarketDataModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<FugleMarketDataModuleOptions> | FugleMarketDataModuleOptions;
  inject?: any[];
}

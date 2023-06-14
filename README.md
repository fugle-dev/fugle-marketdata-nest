# @fugle/marketdata-nest

[![NPM version][npm-image]][npm-url]

> A Nest module wrapper for [@fugle/marketdata](https://github.com/fugle-dev/fugle-marketdata-node)

## Installation

To begin using it, we first install the required dependencies.

```bash
$ npm install --save @fugle/marketdata-nest @fugle/marketdata
```

## Getting started

Once the installation is complete, to use the `RestClient` or `WebSocketClient`, first import `FugleMarketDataModule` and pass the options with `apiKey` to the `forRoot()` method.

```typescript
import { Module } from '@nestjs/common';
import { FugleMarketDataModule } from '@fugle/marketdata-nest';

@Module({
  imports: [
    FugleMarketDataModule.forRoot({
      apiKey: 'YOUR_API_KEY',
    }),
  ],
})
export class AppModule {}
```

Next, inject the `RestClient` instance using the `@InjectRestClient()` decorator.

```typescript
constructor(@InjectRestClient() private readonly client: RestClient) {}
```

The `@InjectWebSocketClient()` decorator is used for the `WebSocketClient` instance injection.

```typescript
constructor(@InjectWebSocketClient() private readonly client: WebSocketClient) {}
```

## Async configuration

When you need to pass module options asynchronously instead of statically, use the `forRootAsync()` method. As with most dynamic modules, Nest provides several techniques to deal with async configuration.

One technique is to use a factory function:

```typescript
FugleMarketDataModule.forRootAsync({
  useFactory: () => ({
    apiKey: 'YOUR_API_KEY',
  }),
});
```

Like other factory providers, our factory function can be [async](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory) and can inject dependencies through `inject`.

```typescript
FugleMarketDataModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    apiKey: configService.get('FUGLE_MARKETDATA_API_KEY'),
  }),
  inject: [ConfigService],
});
```

Alternatively, you can configure the `FugleMarketDataModule` using a class instead of a factory, as shown below.

```typescript
FugleMarketDataModule.forRootAsync({
  useClass: FugleMarketDataConfigService,
});
```

The construction above instantiates `FugleMarketDataConfigService` inside `FugleMarketDataModule`, using it to create an options object. Note that in this example, the `FugleMarketDataConfigService` has to implement `FugleMarketDataModuleOptionsFactory` interface as shown below. The `FugleMarketDataModule` will call the `createFugleMarketDataOptions()` method on the instantiated object of the supplied class.

```typescript
@Injectable()
class FugleMarketDataConfigService implements FugleMarketDataModuleOptionsFactory {
  createFugleMarketDataOptions(): FugleMarketDataModuleOptions {
    return {
      apiKey: 'YOUR_API_KEY',
    };
  }
}
```

If you want to reuse an existing options provider instead of creating a private copy inside the `FugleMarketDataModule`, use the `useExisting` syntax.

```typescript
FugleMarketDataModule.forRootAsync({
  imports: [ConfigModule],
  useExisting: FugleMarketDataConfigService,
});
```

## Reference

- [fugle-marketdata-node](https://github.com/fugle-dev/fugle-marketdata-node)
- [富果股市 API](https://developer.fugle.tw)

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@fugle/marketdata-nest.svg
[npm-url]: https://npmjs.com/package/@fugle/marketdata-nest

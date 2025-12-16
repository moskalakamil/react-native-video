# Interface: VideoError\<TCode\>

Defined in: [types/VideoError.ts:32](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/VideoError.ts#L32)

## Extends

- `Error`

## Extended by

- [`VideoComponentError`](VideoComponentError.md)
- [`VideoRuntimeError`](VideoRuntimeError.md)

## Type Parameters

| Type Parameter |
| ------ |
| `TCode` *extends* [`VideoErrorCode`](../type-aliases/VideoErrorCode.md) |

## Accessors

### code

#### Get Signature

```ts
get code(): TCode;
```

Defined in: [types/VideoError.ts:37](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/VideoError.ts#L37)

##### Returns

`TCode`

***

### message

#### Get Signature

```ts
get message(): string;
```

Defined in: [types/VideoError.ts:40](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/VideoError.ts#L40)

##### Returns

`string`

#### Overrides

```ts
Error.message
```

***

### stack

#### Get Signature

```ts
get stack(): string | undefined;
```

Defined in: [types/VideoError.ts:44](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/VideoError.ts#L44)

##### Returns

`string` \| `undefined`

#### Overrides

```ts
Error.stack
```

## Methods

### toString()

```ts
toString(): string;
```

Defined in: [types/VideoError.ts:61](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/VideoError.ts#L61)

Returns a string representation of an object.

#### Returns

`string`

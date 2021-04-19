# fontverter

Convert Buffer instances back and forth between SFNT (TrueType/OpenType), WOFF, and WOFF2 formats.

Uses the WebAssembly-based [`wawoff2`](https://github.com/fontello/wawoff2) and [`woff2sfnt-sfnt2woff`](https://github.com/odemiral/woff2sfnt-sfnt2woff) modules under the hood, so no binaries or native modules are involved.

```js
const fontverter = require('fontverter');

const mySfntFontBuffer = Buffer.from(/*...*/);
const myWoffFontBuffer = await fontverter.convert(mySfntFontBuffer, 'woff');
const myWoff2FontBuffer = await fontverter.convert(myWoffFontBuffer, 'woff2');
```

## API

#### `fontverter.convert(buffer, toFormat[, fromFormat]): Promise<Buffer>`

Asynchronously convert a Buffer instance containing a font to another format.

`toFormat` and `fromFormat` can be either `'sfnt'`, `'woff'`, or `'woff2'`.

If `fromFormat` is omitted, the source format will be detected based on the signature at the start of the buffer.

For backwards compatibility reasons, `'truetype'` is supported as an alias for `'sfnt'` in both `toFormat` and `fromFormat`.

Returns a promise that fulfills with the converted font as a Buffer instance, or rejected with an error.
If `toFormat` is the same as the current format (as specified by `fromFormat` or detected), the original buffer instance will be returned without any conversion taking place.

#### `fontverter.detectFormat(buffer): String`

Returns the detected format of the font contained in `buffer` (either `'sfnt'`, `'woff'`, or `'woff2'`), or throws an exception if the format could not be detected.

## Releases

[Changelog](https://github.com/papandreou/fontverter/blob/master/CHANGELOG.md)

## License

3-clause BSD license -- see the `LICENSE` file for details.

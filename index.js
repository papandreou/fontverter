const wawoff2 = require('wawoff2');
const woffTool = require('woff2sfnt-sfnt2woff');

const supportedFormats = new Set(['truetype', 'woff', 'woff2']);

exports.detectFormat = function (buffer) {
  const signature = buffer.toString('ascii', 0, 4);
  if (signature === 'wOFF') {
    return 'woff';
  } else if (signature === 'wOF2') {
    return 'woff2';
  } else if (
    signature === 'true' ||
    signature === 'OTTO' ||
    signature === '\x00\x01\x00\x00'
  ) {
    return 'truetype';
  } else {
    throw new Error(`Unrecognized font signature: ${signature}`);
  }
};

exports.convert = async function (buffer, toFormat, fromFormat) {
  if (!supportedFormats.has(toFormat)) {
    throw new Error(`Cannot convert to ${toFormat}`);
  }
  if (fromFormat) {
    if (!supportedFormats.has(fromFormat)) {
      throw new Error(`Cannot convert from ${toFormat}`);
    }
  } else {
    fromFormat = exports.detectFormat(buffer);
  }

  if (fromFormat === toFormat) {
    return buffer;
  }
  if (fromFormat === 'woff') {
    buffer = woffTool.toSfnt(buffer);
  } else if (fromFormat === 'woff2') {
    buffer = Buffer.from(await wawoff2.decompress(buffer));
  }

  if (toFormat === 'woff') {
    buffer = woffTool.toWoff(buffer);
  } else if (toFormat === 'woff2') {
    buffer = Buffer.from(await wawoff2.compress(buffer));
  }
  return buffer;
};

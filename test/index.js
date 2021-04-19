const fontverter = require('..');
const { readFile } = require('fs').promises;
const pathModule = require('path');
const expect = require('unexpected').clone();

describe('fontverter.convert', function () {
  before(async function () {
    this.sfnt = await readFile(
      pathModule.resolve(__dirname, '..', 'testdata', 'Roboto-400.ttf')
    );
    this.woff = await readFile(
      pathModule.resolve(__dirname, '..', 'testdata', 'Roboto-400.woff')
    );
    this.woff2 = await readFile(
      pathModule.resolve(__dirname, '..', 'testdata', 'Roboto-400.woff2')
    );
  });

  describe('when the source format is not given', function () {
    it('should throw if the source format could not be detected', async function () {
      expect(
        () => fontverter.convert(Buffer.from('abcd'), 'sfnt'),
        'to error',
        'Unrecognized font signature: abcd'
      );
    });

    it('should throw if the target format is not supported', async function () {
      expect(
        () => fontverter.convert(this.sfnt, 'footype'),
        'to error',
        'Unsupported target format: footype'
      );
    });

    it('should convert a sfnt font to sfnt', async function () {
      const buffer = await fontverter.convert(this.sfnt, 'sfnt');
      expect(fontverter.detectFormat(buffer), 'to equal', 'sfnt');
      expect(buffer, 'to be', this.sfnt); // Should be a noop
    });

    it('should convert a sfnt font to woff', async function () {
      const buffer = await fontverter.convert(this.sfnt, 'woff');
      expect(fontverter.detectFormat(buffer), 'to equal', 'woff');
    });

    it('should convert a sfnt font to woff2', async function () {
      const buffer = await fontverter.convert(this.sfnt, 'woff2');
      expect(fontverter.detectFormat(buffer), 'to equal', 'woff2');
    });

    it('should convert a woff font to sfnt', async function () {
      const buffer = await fontverter.convert(this.woff, 'sfnt');
      expect(fontverter.detectFormat(buffer), 'to equal', 'sfnt');
    });

    it('should convert a woff font to woff', async function () {
      const buffer = await fontverter.convert(this.woff, 'woff');
      expect(fontverter.detectFormat(buffer), 'to equal', 'woff');
      expect(buffer, 'to be', this.woff); // Should be a noop
    });

    it('should convert a woff font to woff2', async function () {
      const buffer = await fontverter.convert(this.woff, 'woff2');
      expect(fontverter.detectFormat(buffer), 'to equal', 'woff2');
    });

    it('should convert a woff2 font to sfnt', async function () {
      const buffer = await fontverter.convert(this.woff2, 'sfnt');
      expect(fontverter.detectFormat(buffer), 'to equal', 'sfnt');
    });

    it('should convert a woff2 font to woff', async function () {
      const buffer = await fontverter.convert(this.woff2, 'woff');
      expect(fontverter.detectFormat(buffer), 'to equal', 'woff');
    });

    it('should convert a woff2 font to woff2', async function () {
      const buffer = await fontverter.convert(this.woff2, 'woff2');
      expect(fontverter.detectFormat(buffer), 'to equal', 'woff2');
      expect(buffer, 'to be', this.woff2); // Should be a noop
    });
  });

  describe('when the source format is given', function () {
    it('should throw if the source format is not supported', async function () {
      expect(
        () => fontverter.convert(Buffer.from('abcd'), 'sfnt', 'footype'),
        'to error',
        'Unsupported source format: footype'
      );
    });

    it('should convert a sfnt font to sfnt', async function () {
      const buffer = await fontverter.convert(this.sfnt, 'sfnt', 'sfnt');
      expect(fontverter.detectFormat(buffer), 'to equal', 'sfnt');
      expect(buffer, 'to be', this.sfnt); // Should be a noop
    });

    it('should convert a sfnt font to sfnt, using truetype as an alias', async function () {
      const buffer = await fontverter.convert(
        this.sfnt,
        'truetype',
        'truetype'
      );
      expect(fontverter.detectFormat(buffer), 'to equal', 'sfnt');
      expect(buffer, 'to be', this.sfnt); // Should be a noop
    });

    it('should convert a sfnt font to woff', async function () {
      const buffer = await fontverter.convert(this.sfnt, 'woff', 'sfnt');
      expect(fontverter.detectFormat(buffer), 'to equal', 'woff');
    });

    it('should convert a sfnt font to woff2', async function () {
      const buffer = await fontverter.convert(this.sfnt, 'woff2', 'sfnt');
      expect(fontverter.detectFormat(buffer), 'to equal', 'woff2');
    });

    it('should convert a woff font to sfnt', async function () {
      const buffer = await fontverter.convert(this.woff, 'sfnt', 'woff');
      expect(fontverter.detectFormat(buffer), 'to equal', 'sfnt');
    });

    it('should convert a woff font to woff', async function () {
      const buffer = await fontverter.convert(this.woff, 'woff', 'woff');
      expect(fontverter.detectFormat(buffer), 'to equal', 'woff');
      expect(buffer, 'to be', this.woff); // Should be a noop
    });

    it('should convert a woff font to woff2', async function () {
      const buffer = await fontverter.convert(this.woff, 'woff2', 'woff');
      expect(fontverter.detectFormat(buffer), 'to equal', 'woff2');
    });

    it('should convert a woff2 font to sfnt', async function () {
      const buffer = await fontverter.convert(this.woff2, 'sfnt', 'woff2');
      expect(fontverter.detectFormat(buffer), 'to equal', 'sfnt');
    });

    it('should convert a woff2 font to woff', async function () {
      const buffer = await fontverter.convert(this.woff2, 'woff', 'woff2');
      expect(fontverter.detectFormat(buffer), 'to equal', 'woff');
    });

    it('should convert a woff2 font to woff2', async function () {
      const buffer = await fontverter.convert(this.woff2, 'woff2', 'woff2');
      expect(fontverter.detectFormat(buffer), 'to equal', 'woff2');
      expect(buffer, 'to be', this.woff2); // Should be a noop
    });
  });
});

describe('fontverter.detectFormat', function () {
  it('should throw if the contents of the buffer could not be recognized', async function () {
    expect(
      () => fontverter.convert(Buffer.from('abcd'), 'sfnt'),
      'to error',
      'Unrecognized font signature: abcd'
    );
  });

  it('should detect a sfnt font', async function () {
    const buffer = await readFile(
      pathModule.resolve(__dirname, '..', 'testdata', 'Roboto-400.ttf')
    );
    expect(fontverter.detectFormat(buffer), 'to equal', 'sfnt');
  });

  it('should detect a woff font', async function () {
    const buffer = await readFile(
      pathModule.resolve(__dirname, '..', 'testdata', 'Roboto-400.woff')
    );
    expect(fontverter.detectFormat(buffer), 'to equal', 'woff');
  });

  it('should detect a woff2 font', async function () {
    const buffer = await readFile(
      pathModule.resolve(__dirname, '..', 'testdata', 'Roboto-400.woff2')
    );
    expect(fontverter.detectFormat(buffer), 'to equal', 'woff2');
  });
});

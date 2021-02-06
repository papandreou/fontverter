const fontverter = require('..');
const { readFile } = require('fs').promises;
const pathModule = require('path');
const expect = require('unexpected').clone();

describe('fontverter.convert', function () {
  before(async function () {
    this.truetype = await readFile(
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
        () => fontverter.convert(Buffer.from('abcd'), 'truetype'),
        'to error',
        'Unrecognized font signature: abcd'
      );
    });

    it('should convert a truetype font to truetype', async function () {
      const buffer = await fontverter.convert(this.truetype, 'truetype');
      expect(fontverter.detectFormat(buffer), 'to equal', 'truetype');
      expect(buffer, 'to be', this.truetype); // Should be a noop
    });

    it('should convert a truetype font to woff', async function () {
      const buffer = await fontverter.convert(this.truetype, 'woff');
      expect(fontverter.detectFormat(buffer), 'to equal', 'woff');
    });

    it('should convert a truetype font to woff2', async function () {
      const buffer = await fontverter.convert(this.truetype, 'woff2');
      expect(fontverter.detectFormat(buffer), 'to equal', 'woff2');
    });

    it('should convert a woff font to truetype', async function () {
      const buffer = await fontverter.convert(this.woff, 'truetype');
      expect(fontverter.detectFormat(buffer), 'to equal', 'truetype');
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

    it('should convert a woff2 font to truetype', async function () {
      const buffer = await fontverter.convert(this.woff2, 'truetype');
      expect(fontverter.detectFormat(buffer), 'to equal', 'truetype');
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
    it('should convert a truetype font to truetype', async function () {
      const buffer = await fontverter.convert(
        this.truetype,
        'truetype',
        'truetype'
      );
      expect(fontverter.detectFormat(buffer), 'to equal', 'truetype');
      expect(buffer, 'to be', this.truetype); // Should be a noop
    });

    it('should convert a truetype font to woff', async function () {
      const buffer = await fontverter.convert(
        this.truetype,
        'woff',
        'truetype'
      );
      expect(fontverter.detectFormat(buffer), 'to equal', 'woff');
    });

    it('should convert a truetype font to woff2', async function () {
      const buffer = await fontverter.convert(
        this.truetype,
        'woff2',
        'truetype'
      );
      expect(fontverter.detectFormat(buffer), 'to equal', 'woff2');
    });

    it('should convert a woff font to truetype', async function () {
      const buffer = await fontverter.convert(this.woff, 'truetype', 'woff');
      expect(fontverter.detectFormat(buffer), 'to equal', 'truetype');
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

    it('should convert a woff2 font to truetype', async function () {
      const buffer = await fontverter.convert(this.woff2, 'truetype', 'woff2');
      expect(fontverter.detectFormat(buffer), 'to equal', 'truetype');
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
      () => fontverter.convert(Buffer.from('abcd'), 'truetype'),
      'to error',
      'Unrecognized font signature: abcd'
    );
  });

  it('should detect a truetype font', async function () {
    const buffer = await readFile(
      pathModule.resolve(__dirname, '..', 'testdata', 'Roboto-400.ttf')
    );
    expect(fontverter.detectFormat(buffer), 'to equal', 'truetype');
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

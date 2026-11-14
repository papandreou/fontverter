declare namespace fontverter {
  type Format = "truetype" | "sfnt" | "woff" | "woff2";

  /*
   * Convert buf from one font format to another.
   * If fromFormat is not specified, the format is automatically detected.
   * @param buf - the font as a Buffer
   * @param toFormat - wanted format
   * @param fromFormat - original format
   */
  function convert(buf: Buffer, toFormat: Format, fromFormat?: Format): Promise<Buffer>;
};

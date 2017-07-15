'use strict';

var HUFFMAN_EOF = -1;

var huffmanTree = [
    { value: 0x00, codeLen: 2, code: 0x0003 },  //  11
    { value: 0x01, codeLen: 3, code: 0x0005 },  //  101
    { value: 0x02, codeLen: 4, code: 0x0009 },  //  1001
    { value: 0x03, codeLen: 5, code: 0x0011 },  //  10001
    { value: 0x04, codeLen: 5, code: 0x0010 },  //  10000
    { value: 0x50, codeLen: 5, code: 0x000F },  //  01111
    { value: 0x05, codeLen: 6, code: 0x001D },  //  011101
    { value: 0x06, codeLen: 6, code: 0x001C },  //  011100
    { value: 0x07, codeLen: 6, code: 0x001B },  //  011011
    { value: 0x08, codeLen: 6, code: 0x001A },  //  011010
    { value: 0x10, codeLen: 6, code: 0x0019 },  //  011001
    { value: 0x09, codeLen: 7, code: 0x0031 },  //  0110001
    { value: 0x0A, codeLen: 7, code: 0x0030 },  //  0110000
    { value: 0x0B, codeLen: 7, code: 0x002F },  //  0101111
    { value: 0x0C, codeLen: 7, code: 0x002E },  //  0101110
    { value: 0x0D, codeLen: 7, code: 0x002D },  //  0101101
    { value: 0x0E, codeLen: 7, code: 0x002C },  //  0101100
    { value: 0x0F, codeLen: 7, code: 0x002B },  //  0101011
    { value: 0x11, codeLen: 7, code: 0x002A },  //  0101010
    { value: 0x12, codeLen: 7, code: 0x0029 },  //  0101001
    { value: 0x13, codeLen: 8, code: 0x0051 },  //  01010001
    { value: 0x14, codeLen: 8, code: 0x0050 },  //  01010000
    { value: 0x15, codeLen: 8, code: 0x004F },  //  01001111
    { value: 0x16, codeLen: 8, code: 0x004E },  //  01001110
    { value: 0x17, codeLen: 8, code: 0x004D },  //  01001101
    { value: 0x18, codeLen: 8, code: 0x004C },  //  01001100
    { value: 0x19, codeLen: 8, code: 0x004B },  //  01001011
    { value: 0x1A, codeLen: 8, code: 0x004A },  //  01001010
    { value: 0x1B, codeLen: 8, code: 0x0049 },  //  01001001
    { value: 0x1C, codeLen: 8, code: 0x0048 },  //  01001000
    { value: 0x1D, codeLen: 8, code: 0x0047 },  //  01000111
    { value: 0x1E, codeLen: 8, code: 0x0046 },  //  01000110
    { value: 0x1F, codeLen: 8, code: 0x0045 },  //  01000101
    { value: 0x20, codeLen: 8, code: 0x0044 },  //  01000100
    { value: 0x21, codeLen: 8, code: 0x0043 },  //  01000011
    { value: 0x22, codeLen: 8, code: 0x0042 },  //  01000010
    { value: 0x23, codeLen: 8, code: 0x0041 },  //  01000001
    { value: 0x24, codeLen: 8, code: 0x0040 },  //  01000000
    { value: 0x30, codeLen: 8, code: 0x003F },  //  00111111
    { value: 0x40, codeLen: 8, code: 0x003E },  //  00111110
    { value: 0xF0, codeLen: 8, code: 0x003D },  //  00111101
    { value: 0x25, codeLen: 9, code: 0x0079 },  //  001111001
    { value: 0x26, codeLen: 9, code: 0x0078 },  //  001111000
    { value: 0x27, codeLen: 9, code: 0x0077 },  //  001110111
    { value: 0x28, codeLen: 9, code: 0x0076 },  //  001110110
    { value: 0x29, codeLen: 9, code: 0x0075 },  //  001110101
    { value: 0x2A, codeLen: 9, code: 0x0074 },  //  001110100
    { value: 0x2B, codeLen: 9, code: 0x0073 },  //  001110011
    { value: 0x2C, codeLen: 9, code: 0x0072 },  //  001110010
    { value: 0x2D, codeLen: 9, code: 0x0071 },  //  001110001
    { value: 0x2E, codeLen: 9, code: 0x0070 },  //  001110000
    { value: 0x2F, codeLen: 9, code: 0x006F },  //  001101111
    { value: 0x31, codeLen: 9, code: 0x006E },  //  001101110
    { value: 0x32, codeLen: 9, code: 0x006D },  //  001101101
    { value: 0x33, codeLen: 9, code: 0x006C },  //  001101100
    { value: 0x34, codeLen: 9, code: 0x006B },  //  001101011
    { value: 0x35, codeLen: 9, code: 0x006A },  //  001101010
    { value: 0x36, codeLen: 9, code: 0x0069 },  //  001101001
    { value: 0x37, codeLen: 9, code: 0x0068 },  //  001101000
    { value: 0x38, codeLen: 9, code: 0x0067 },  //  001100111
    { value: 0x39, codeLen: 9, code: 0x0066 },  //  001100110
    { value: 0x3A, codeLen: 9, code: 0x0065 },  //  001100101
    { value: 0x3B, codeLen: 9, code: 0x0064 },  //  001100100
    { value: 0x3C, codeLen: 9, code: 0x0063 },  //  001100011
    { value: 0x3D, codeLen: 9, code: 0x0062 },  //  001100010
    { value: 0x3E, codeLen: 9, code: 0x0061 },  //  001100001
    { value: 0x3F, codeLen: 9, code: 0x0060 },  //  001100000
    { value: 0x41, codeLen: 9, code: 0x005F },  //  001011111
    { value: 0x42, codeLen: 9, code: 0x005E },  //  001011110
    { value: 0x43, codeLen: 9, code: 0x005D },  //  001011101
    { value: 0x44, codeLen: 9, code: 0x005C },  //  001011100
    { value: 0x45, codeLen: 9, code: 0x005B },  //  001011011
    { value: 0x46, codeLen: 9, code: 0x005A },  //  001011010
    { value: 0x47, codeLen: 9, code: 0x0059 },  //  001011001
    { value: 0x48, codeLen: 9, code: 0x0058 },  //  001011000
    { value: 0x49, codeLen: 9, code: 0x0057 },  //  001010111
    { value: 0x4C, codeLen: 9, code: 0x0056 },  //  001010110
    { value: 0x4F, codeLen: 9, code: 0x0055 },  //  001010101
    { value: 0x51, codeLen: 9, code: 0x0054 },  //  001010100
    { value: 0x80, codeLen: 9, code: 0x0053 },  //  001010011
    { value: 0xE0, codeLen: 9, code: 0x0052 },  //  001010010
    { value: 0xF1, codeLen: 9, code: 0x0051 },  //  001010001
    { value: 0xFF, codeLen: 9, code: 0x0050 },  //  001010000
    { value: 0x4A, codeLen: 10, code: 0x009F },  //  0010011111
    { value: 0x4B, codeLen: 10, code: 0x009E },  //  0010011110
    { value: 0x4D, codeLen: 10, code: 0x009D },  //  0010011101
    { value: 0x4E, codeLen: 10, code: 0x009C },  //  0010011100
    { value: 0x52, codeLen: 10, code: 0x009B },  //  0010011011
    { value: 0x53, codeLen: 10, code: 0x009A },  //  0010011010
    { value: 0x54, codeLen: 10, code: 0x0099 },  //  0010011001
    { value: 0x55, codeLen: 10, code: 0x0098 },  //  0010011000
    { value: 0x56, codeLen: 10, code: 0x0097 },  //  0010010111
    { value: 0x57, codeLen: 10, code: 0x0096 },  //  0010010110
    { value: 0x58, codeLen: 10, code: 0x0095 },  //  0010010101
    { value: 0x59, codeLen: 10, code: 0x0094 },  //  0010010100
    { value: 0x5A, codeLen: 10, code: 0x0093 },  //  0010010011
    { value: 0x5B, codeLen: 10, code: 0x0092 },  //  0010010010
    { value: 0x5C, codeLen: 10, code: 0x0091 },  //  0010010001
    { value: 0x5D, codeLen: 10, code: 0x0090 },  //  0010010000
    { value: 0x5E, codeLen: 10, code: 0x008F },  //  0010001111
    { value: 0x5F, codeLen: 10, code: 0x008E },  //  0010001110
    { value: 0x60, codeLen: 10, code: 0x008D },  //  0010001101
    { value: 0x61, codeLen: 10, code: 0x008C },  //  0010001100
    { value: 0x62, codeLen: 10, code: 0x008B },  //  0010001011
    { value: 0x63, codeLen: 10, code: 0x008A },  //  0010001010
    { value: 0x64, codeLen: 10, code: 0x0089 },  //  0010001001
    { value: 0x65, codeLen: 10, code: 0x0088 },  //  0010001000
    { value: 0x66, codeLen: 10, code: 0x0087 },  //  0010000111
    { value: 0x67, codeLen: 10, code: 0x0086 },  //  0010000110
    { value: 0x68, codeLen: 10, code: 0x0085 },  //  0010000101
    { value: 0x69, codeLen: 10, code: 0x0084 },  //  0010000100
    { value: 0x6A, codeLen: 10, code: 0x0083 },  //  0010000011
    { value: 0x6B, codeLen: 10, code: 0x0082 },  //  0010000010
    { value: 0x6C, codeLen: 10, code: 0x0081 },  //  0010000001
    { value: 0x6D, codeLen: 10, code: 0x0080 },  //  0010000000
    { value: 0x6E, codeLen: 10, code: 0x007F },  //  0001111111
    { value: 0x6F, codeLen: 10, code: 0x007E },  //  0001111110
    { value: 0x70, codeLen: 10, code: 0x007D },  //  0001111101
    { value: 0x71, codeLen: 10, code: 0x007C },  //  0001111100
    { value: 0x72, codeLen: 10, code: 0x007B },  //  0001111011
    { value: 0x73, codeLen: 10, code: 0x007A },  //  0001111010
    { value: 0x74, codeLen: 10, code: 0x0079 },  //  0001111001
    { value: 0x75, codeLen: 10, code: 0x0078 },  //  0001111000
    { value: 0x76, codeLen: 10, code: 0x0077 },  //  0001110111
    { value: 0x77, codeLen: 10, code: 0x0076 },  //  0001110110
    { value: 0x78, codeLen: 10, code: 0x0075 },  //  0001110101
    { value: 0x79, codeLen: 10, code: 0x0074 },  //  0001110100
    { value: 0x7A, codeLen: 10, code: 0x0073 },  //  0001110011
    { value: 0x7B, codeLen: 10, code: 0x0072 },  //  0001110010
    { value: 0x7C, codeLen: 10, code: 0x0071 },  //  0001110001
    { value: 0x7D, codeLen: 10, code: 0x0070 },  //  0001110000
    { value: 0x7E, codeLen: 10, code: 0x006F },  //  0001101111
    { value: 0x7F, codeLen: 10, code: 0x006E },  //  0001101110
    { value: 0x81, codeLen: 10, code: 0x006D },  //  0001101101
    { value: 0x82, codeLen: 10, code: 0x006C },  //  0001101100
    { value: 0x83, codeLen: 10, code: 0x006B },  //  0001101011
    { value: 0x84, codeLen: 10, code: 0x006A },  //  0001101010
    { value: 0x85, codeLen: 10, code: 0x0069 },  //  0001101001
    { value: 0x86, codeLen: 10, code: 0x0068 },  //  0001101000
    { value: 0x87, codeLen: 10, code: 0x0067 },  //  0001100111
    { value: 0x88, codeLen: 10, code: 0x0066 },  //  0001100110
    { value: 0x89, codeLen: 10, code: 0x0065 },  //  0001100101
    { value: 0x8A, codeLen: 10, code: 0x0064 },  //  0001100100
    { value: 0x8B, codeLen: 10, code: 0x0063 },  //  0001100011
    { value: 0x8C, codeLen: 10, code: 0x0062 },  //  0001100010
    { value: 0x8D, codeLen: 10, code: 0x0061 },  //  0001100001
    { value: 0x8E, codeLen: 10, code: 0x0060 },  //  0001100000
    { value: 0x8F, codeLen: 10, code: 0x005F },  //  0001011111
    { value: 0x90, codeLen: 10, code: 0x005E },  //  0001011110
    { value: 0x91, codeLen: 10, code: 0x005D },  //  0001011101
    { value: 0x92, codeLen: 10, code: 0x005C },  //  0001011100
    { value: 0x93, codeLen: 10, code: 0x005B },  //  0001011011
    { value: 0x94, codeLen: 10, code: 0x005A },  //  0001011010
    { value: 0x95, codeLen: 10, code: 0x0059 },  //  0001011001
    { value: 0x96, codeLen: 10, code: 0x0058 },  //  0001011000
    { value: 0x97, codeLen: 10, code: 0x0057 },  //  0001010111
    { value: 0x98, codeLen: 10, code: 0x0056 },  //  0001010110
    { value: 0x99, codeLen: 10, code: 0x0055 },  //  0001010101
    { value: 0x9A, codeLen: 10, code: 0x0054 },  //  0001010100
    { value: 0x9B, codeLen: 10, code: 0x0053 },  //  0001010011
    { value: 0x9C, codeLen: 10, code: 0x0052 },  //  0001010010
    { value: 0x9D, codeLen: 10, code: 0x0051 },  //  0001010001
    { value: 0x9E, codeLen: 10, code: 0x0050 },  //  0001010000
    { value: 0x9F, codeLen: 10, code: 0x004F },  //  0001001111
    { value: 0xA0, codeLen: 10, code: 0x004E },  //  0001001110
    { value: 0xA1, codeLen: 10, code: 0x004D },  //  0001001101
    { value: 0xA2, codeLen: 10, code: 0x004C },  //  0001001100
    { value: 0xA3, codeLen: 10, code: 0x004B },  //  0001001011
    { value: 0xA4, codeLen: 10, code: 0x004A },  //  0001001010
    { value: 0xA5, codeLen: 10, code: 0x0049 },  //  0001001001
    { value: 0xA6, codeLen: 10, code: 0x0048 },  //  0001001000
    { value: 0xA7, codeLen: 10, code: 0x0047 },  //  0001000111
    { value: 0xA8, codeLen: 10, code: 0x0046 },  //  0001000110
    { value: 0xA9, codeLen: 10, code: 0x0045 },  //  0001000101
    { value: 0xAA, codeLen: 10, code: 0x0044 },  //  0001000100
    { value: 0xAB, codeLen: 10, code: 0x0043 },  //  0001000011
    { value: 0xAC, codeLen: 10, code: 0x0042 },  //  0001000010
    { value: 0xAD, codeLen: 10, code: 0x0041 },  //  0001000001
    { value: 0xAE, codeLen: 10, code: 0x0040 },  //  0001000000
    { value: 0xAF, codeLen: 10, code: 0x003F },  //  0000111111
    { value: 0xB0, codeLen: 10, code: 0x003E },  //  0000111110
    { value: 0xB1, codeLen: 10, code: 0x003D },  //  0000111101
    { value: 0xB2, codeLen: 10, code: 0x003C },  //  0000111100
    { value: 0xB3, codeLen: 10, code: 0x003B },  //  0000111011
    { value: 0xB4, codeLen: 10, code: 0x003A },  //  0000111010
    { value: 0xB5, codeLen: 10, code: 0x0039 },  //  0000111001
    { value: 0xB6, codeLen: 10, code: 0x0038 },  //  0000111000
    { value: 0xB7, codeLen: 10, code: 0x0037 },  //  0000110111
    { value: 0xB8, codeLen: 10, code: 0x0036 },  //  0000110110
    { value: 0xB9, codeLen: 10, code: 0x0035 },  //  0000110101
    { value: 0xBA, codeLen: 10, code: 0x0034 },  //  0000110100
    { value: 0xBB, codeLen: 10, code: 0x0033 },  //  0000110011
    { value: 0xBC, codeLen: 10, code: 0x0032 },  //  0000110010
    { value: 0xBD, codeLen: 10, code: 0x0031 },  //  0000110001
    { value: 0xBE, codeLen: 10, code: 0x0030 },  //  0000110000
    { value: 0xBF, codeLen: 10, code: 0x002F },  //  0000101111
    { value: 0xC0, codeLen: 10, code: 0x002E },  //  0000101110
    { value: 0xC1, codeLen: 10, code: 0x002D },  //  0000101101
    { value: 0xC2, codeLen: 10, code: 0x002C },  //  0000101100
    { value: 0xC3, codeLen: 10, code: 0x002B },  //  0000101011
    { value: 0xC4, codeLen: 10, code: 0x002A },  //  0000101010
    { value: 0xC5, codeLen: 10, code: 0x0029 },  //  0000101001
    { value: 0xC6, codeLen: 10, code: 0x0028 },  //  0000101000
    { value: 0xC7, codeLen: 10, code: 0x0027 },  //  0000100111
    { value: 0xC8, codeLen: 10, code: 0x0026 },  //  0000100110
    { value: 0xC9, codeLen: 10, code: 0x0025 },  //  0000100101
    { value: 0xCA, codeLen: 10, code: 0x0024 },  //  0000100100
    { value: 0xCB, codeLen: 10, code: 0x0023 },  //  0000100011
    { value: 0xCC, codeLen: 10, code: 0x0022 },  //  0000100010
    { value: 0xCD, codeLen: 10, code: 0x0021 },  //  0000100001
    { value: 0xCE, codeLen: 10, code: 0x0020 },  //  0000100000
    { value: 0xCF, codeLen: 10, code: 0x001F },  //  0000011111
    { value: 0xD0, codeLen: 10, code: 0x001E },  //  0000011110
    { value: 0xD1, codeLen: 10, code: 0x001D },  //  0000011101
    { value: 0xD2, codeLen: 10, code: 0x001C },  //  0000011100
    { value: 0xD3, codeLen: 10, code: 0x001B },  //  0000011011
    { value: 0xD4, codeLen: 10, code: 0x001A },  //  0000011010
    { value: 0xD6, codeLen: 10, code: 0x0019 },  //  0000011001
    { value: 0xD7, codeLen: 10, code: 0x0018 },  //  0000011000
    { value: 0xD8, codeLen: 10, code: 0x0017 },  //  0000010111
    { value: 0xD9, codeLen: 10, code: 0x0016 },  //  0000010110
    { value: 0xDA, codeLen: 10, code: 0x0015 },  //  0000010101
    { value: 0xDB, codeLen: 10, code: 0x0014 },  //  0000010100
    { value: 0xDC, codeLen: 10, code: 0x0013 },  //  0000010011
    { value: 0xDE, codeLen: 10, code: 0x0012 },  //  0000010010
    { value: 0xDF, codeLen: 10, code: 0x0011 },  //  0000010001
    { value: 0xE1, codeLen: 10, code: 0x0010 },  //  0000010000
    { value: 0xE2, codeLen: 10, code: 0x000F },  //  0000001111
    { value: 0xE4, codeLen: 10, code: 0x000E },  //  0000001110
    { value: 0xEF, codeLen: 10, code: 0x000D },  //  0000001101
    { value: 0xD5, codeLen: 11, code: 0x0019 },  //  00000011001
    { value: 0xDD, codeLen: 11, code: 0x0018 },  //  00000011000
    { value: 0xE3, codeLen: 11, code: 0x0017 },  //  00000010111
    { value: 0xE5, codeLen: 11, code: 0x0016 },  //  00000010110
    { value: 0xE6, codeLen: 11, code: 0x0015 },  //  00000010101
    { value: 0xE7, codeLen: 11, code: 0x0014 },  //  00000010100
    { value: 0xE8, codeLen: 11, code: 0x0013 },  //  00000010011
    { value: 0xE9, codeLen: 11, code: 0x0012 },  //  00000010010
    { value: 0xEA, codeLen: 11, code: 0x0011 },  //  00000010001
    { value: 0xEB, codeLen: 11, code: 0x0010 },  //  00000010000
    { value: 0xEC, codeLen: 11, code: 0x000F },  //  00000001111
    { value: 0xED, codeLen: 11, code: 0x000E },  //  00000001110
    { value: 0xEE, codeLen: 11, code: 0x000D },  //  00000001101
    { value: 0xF2, codeLen: 11, code: 0x000C },  //  00000001100
    { value: 0xF3, codeLen: 11, code: 0x000B },  //  00000001011
    { value: 0xF4, codeLen: 11, code: 0x000A },  //  00000001010
    { value: 0xF5, codeLen: 11, code: 0x0009 },  //  00000001001
    { value: 0xF6, codeLen: 11, code: 0x0008 },  //  00000001000
    { value: 0xF7, codeLen: 11, code: 0x0007 },  //  00000000111
    { value: 0xF8, codeLen: 11, code: 0x0006 },  //  00000000110
    { value: 0xFA, codeLen: 11, code: 0x0005 },  //  00000000101
    { value: 0xFB, codeLen: 11, code: 0x0004 },  //  00000000100
    { value: 0xFC, codeLen: 11, code: 0x0003 },  //  00000000011
    { value: 0xFD, codeLen: 11, code: 0x0002 },  //  00000000010
    { value: 0xFE, codeLen: 11, code: 0x0001 },  //  00000000001
    { value: 0xF9, codeLen: 12, code: 0x0001 },  //  000000000001
    { value: HUFFMAN_EOF, codeLen: 12, code: 0x0000 },  //  000000000000
];

var huffmanLenIndex = function()
{
    var result = Array(huffmanTree.length).fill(-1);

    for (var i = 0; i < huffmanTree.length; ++i) {
        if (result[huffmanTree[i].codeLen] == -1) {
            result[huffmanTree[i].codeLen] = i;
        }
    }

    return result;
}();

function huffmanDecodeBuf(inBuf, inBufCharacterCount)
{
    var code = 0;
    var codeLen = 0;
    var testBit = 0x80;
    var eof = false;
    var outBuf = [];

    while (!eof && inBuf.byteLength != 0) {
        if (outBuf.length == inBufCharacterCount) {
            // we've exhausted the input stream, discard any odd bits on the end
            break;
        }

        if (inBuf.byteLength == 0) {
            throw new Error('unexpected');
        }

        // get the next bit from the input buffer
        code <<= 1;
        ++codeLen;
        if (inBuf[0] & testBit) {
            code |= 0x01;
        }
        testBit >>= 1;
        if (testBit == 0) {
            testBit = 0x80;
            inBuf = inBuf.subarray(1);
        }

        // check if the code is a leaf node or an interior node
        if (huffmanLenIndex[codeLen] != -1) {
            // look for the code in the tree, only leaf nodes are stored in the tree
            for (var i = huffmanLenIndex[codeLen]; (i < huffmanTree.length) && (huffmanTree[i].codeLen == codeLen); ++i) {
                if (huffmanTree[i].code == code) {
                    // we've found the code, so it is a leaf node
                    var value = huffmanTree[i].value;

                    if (value == HUFFMAN_EOF) {
                        eof = true;
                    } else {
                        // output the value
                        outBuf.push(value);
                    }

                    // reset the code to continue decompressing the input buffer
                    code = 0;
                    codeLen = 0;
                    break;
                }
            }
        }
    }

    return new Uint8Array(outBuf);
}
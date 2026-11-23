#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/picomatch/lib/constants.js
var require_constants = __commonJS({
  "node_modules/picomatch/lib/constants.js"(exports2, module2) {
    "use strict";
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DEFAULT_MAX_EXTGLOB_RECURSION = 0;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var SEP = "/";
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR,
      SEP
    };
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`,
      SEP: "\\"
    };
    var POSIX_REGEX_SOURCE = {
      __proto__: null,
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module2.exports = {
      DEFAULT_MAX_EXTGLOB_RECURSION,
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      // regular expressions
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      // Replace globs with equivalent patterns to reduce parsing time.
      REPLACEMENTS: {
        __proto__: null,
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      // Digits
      CHAR_0: 48,
      /* 0 */
      CHAR_9: 57,
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: 65,
      /* A */
      CHAR_LOWERCASE_A: 97,
      /* a */
      CHAR_UPPERCASE_Z: 90,
      /* Z */
      CHAR_LOWERCASE_Z: 122,
      /* z */
      CHAR_LEFT_PARENTHESES: 40,
      /* ( */
      CHAR_RIGHT_PARENTHESES: 41,
      /* ) */
      CHAR_ASTERISK: 42,
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: 38,
      /* & */
      CHAR_AT: 64,
      /* @ */
      CHAR_BACKWARD_SLASH: 92,
      /* \ */
      CHAR_CARRIAGE_RETURN: 13,
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: 94,
      /* ^ */
      CHAR_COLON: 58,
      /* : */
      CHAR_COMMA: 44,
      /* , */
      CHAR_DOT: 46,
      /* . */
      CHAR_DOUBLE_QUOTE: 34,
      /* " */
      CHAR_EQUAL: 61,
      /* = */
      CHAR_EXCLAMATION_MARK: 33,
      /* ! */
      CHAR_FORM_FEED: 12,
      /* \f */
      CHAR_FORWARD_SLASH: 47,
      /* / */
      CHAR_GRAVE_ACCENT: 96,
      /* ` */
      CHAR_HASH: 35,
      /* # */
      CHAR_HYPHEN_MINUS: 45,
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: 60,
      /* < */
      CHAR_LEFT_CURLY_BRACE: 123,
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: 91,
      /* [ */
      CHAR_LINE_FEED: 10,
      /* \n */
      CHAR_NO_BREAK_SPACE: 160,
      /* \u00A0 */
      CHAR_PERCENT: 37,
      /* % */
      CHAR_PLUS: 43,
      /* + */
      CHAR_QUESTION_MARK: 63,
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      /* > */
      CHAR_RIGHT_CURLY_BRACE: 125,
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      /* ] */
      CHAR_SEMICOLON: 59,
      /* ; */
      CHAR_SINGLE_QUOTE: 39,
      /* ' */
      CHAR_SPACE: 32,
      /*   */
      CHAR_TAB: 9,
      /* \t */
      CHAR_UNDERSCORE: 95,
      /* _ */
      CHAR_VERTICAL_LINE: 124,
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      /* \uFEFF */
      /**
       * Create EXTGLOB_CHARS
       */
      extglobChars(chars) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      /**
       * Create GLOB_CHARS
       */
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// node_modules/picomatch/lib/utils.js
var require_utils = __commonJS({
  "node_modules/picomatch/lib/utils.js"(exports2) {
    "use strict";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants();
    exports2.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports2.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports2.isRegexChar = (str) => str.length === 1 && exports2.hasRegexChars(str);
    exports2.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports2.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports2.isWindows = () => {
      if (typeof navigator !== "undefined" && navigator.platform) {
        const platform = navigator.platform.toLowerCase();
        return platform === "win32" || platform === "windows";
      }
      if (typeof process !== "undefined" && process.platform) {
        return process.platform === "win32";
      }
      return false;
    };
    exports2.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports2.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1) return input;
      if (input[idx - 1] === "\\") return exports2.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports2.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports2.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
    exports2.basename = (path, { windows } = {}) => {
      const segs = path.split(windows ? /[\\/]/ : "/");
      const last = segs[segs.length - 1];
      if (last === "") {
        return segs[segs.length - 2];
      }
      return last;
    };
  }
});

// node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "node_modules/picomatch/lib/scan.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var {
      CHAR_ASTERISK,
      /* * */
      CHAR_AT,
      /* @ */
      CHAR_BACKWARD_SLASH,
      /* \ */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_EXCLAMATION_MARK,
      /* ! */
      CHAR_FORWARD_SLASH,
      /* / */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_PLUS,
      /* + */
      CHAR_QUESTION_MARK,
      /* ? */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_RIGHT_SQUARE_BRACKET
      /* ] */
    } = require_constants();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.tokens === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts = [];
      let str = input;
      let index = -1;
      let start2 = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true) continue;
          if (prev === CHAR_DOT && index === start2 + 1) {
            start2 += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start2) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              let parens = 0;
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  advance();
                  continue;
                }
                if (code === CHAR_LEFT_PARENTHESES) {
                  parens++;
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES && --parens === 0) {
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start2) {
          negated = token.negated = true;
          start2++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            let parens = 1;
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_BACKWARD_SLASH) {
                backslashes = token.backslashes = true;
                advance();
                continue;
              }
              if (code === CHAR_LEFT_PARENTHESES) {
                parens++;
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES && --parens === 0) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base = str;
      let prefix = "";
      let glob = "";
      if (start2 > 0) {
        prefix = str.slice(0, start2);
        str = str.slice(start2);
        lastIndex -= start2;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex);
        glob = str.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob = str;
      } else {
        base = str;
      }
      if (base && base !== "" && base !== "/" && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob) glob = utils.removeBackslashes(glob);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start: start2,
        base,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n2 = prevIndex !== void 0 ? prevIndex + 1 : start2;
          const i = slashes[idx];
          const value2 = input.slice(n2, i);
          if (opts.tokens) {
            if (idx === 0 && start2 !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value2;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (i >= start2) {
            parts.push(value2);
            prevIndex = i;
          }
        }
        const n = prevIndex !== void 0 ? prevIndex + 1 : start2;
        const value = input.slice(n);
        parts.push(value);
        if (opts.tokens && prevIndex && prevIndex + 1 < input.length) {
          tokens[tokens.length - 1].value = value;
          depth(tokens[tokens.length - 1]);
          state.maxDepth += tokens[tokens.length - 1].depth;
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module2.exports = scan;
  }
});

// node_modules/picomatch/lib/parse.js
var require_parse = __commonJS({
  "node_modules/picomatch/lib/parse.js"(exports2, module2) {
    "use strict";
    var constants2 = require_constants();
    var utils = require_utils();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants2;
    var expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join("..");
      }
      return value;
    };
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var splitTopLevel = (input) => {
      const parts = [];
      let bracket = 0;
      let paren = 0;
      let quote = 0;
      let value = "";
      let escaped = false;
      for (const ch of input) {
        if (escaped === true) {
          value += ch;
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          value += ch;
          escaped = true;
          continue;
        }
        if (ch === '"') {
          quote = quote === 1 ? 0 : 1;
          value += ch;
          continue;
        }
        if (quote === 0) {
          if (ch === "[") {
            bracket++;
          } else if (ch === "]" && bracket > 0) {
            bracket--;
          } else if (bracket === 0) {
            if (ch === "(") {
              paren++;
            } else if (ch === ")" && paren > 0) {
              paren--;
            } else if (ch === "|" && paren === 0) {
              parts.push(value);
              value = "";
              continue;
            }
          }
        }
        value += ch;
      }
      parts.push(value);
      return parts;
    };
    var isPlainBranch = (branch) => {
      let escaped = false;
      for (const ch of branch) {
        if (escaped === true) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (/[?*+@!()[\]{}]/.test(ch)) {
          return false;
        }
      }
      return true;
    };
    var normalizeSimpleBranch = (branch) => {
      let value = branch.trim();
      let changed = true;
      while (changed === true) {
        changed = false;
        if (/^@\([^\\()[\]{}|]+\)$/.test(value)) {
          value = value.slice(2, -1);
          changed = true;
        }
      }
      if (!isPlainBranch(value)) {
        return;
      }
      return value.replace(/\\(.)/g, "$1");
    };
    var hasRepeatedCharPrefixOverlap = (branches) => {
      const values = branches.map(normalizeSimpleBranch).filter(Boolean);
      for (let i = 0; i < values.length; i++) {
        for (let j = i + 1; j < values.length; j++) {
          const a = values[i];
          const b = values[j];
          const char = a[0];
          if (!char || a !== char.repeat(a.length) || b !== char.repeat(b.length)) {
            continue;
          }
          if (a === b || a.startsWith(b) || b.startsWith(a)) {
            return true;
          }
        }
      }
      return false;
    };
    var parseRepeatedExtglob = (pattern, requireEnd = true) => {
      if (pattern[0] !== "+" && pattern[0] !== "*" || pattern[1] !== "(") {
        return;
      }
      let bracket = 0;
      let paren = 0;
      let quote = 0;
      let escaped = false;
      for (let i = 1; i < pattern.length; i++) {
        const ch = pattern[i];
        if (escaped === true) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (ch === '"') {
          quote = quote === 1 ? 0 : 1;
          continue;
        }
        if (quote === 1) {
          continue;
        }
        if (ch === "[") {
          bracket++;
          continue;
        }
        if (ch === "]" && bracket > 0) {
          bracket--;
          continue;
        }
        if (bracket > 0) {
          continue;
        }
        if (ch === "(") {
          paren++;
          continue;
        }
        if (ch === ")") {
          paren--;
          if (paren === 0) {
            if (requireEnd === true && i !== pattern.length - 1) {
              return;
            }
            return {
              type: pattern[0],
              body: pattern.slice(2, i),
              end: i
            };
          }
        }
      }
    };
    var buildCharClassStar = (chars) => {
      const source = chars.length === 1 ? utils.escapeRegex(chars[0]) : `[${chars.map((ch) => utils.escapeRegex(ch)).join("")}]`;
      return `${source}*`;
    };
    var getStarExtglobSequenceChars = (pattern) => {
      let index = 0;
      const chars = [];
      while (index < pattern.length) {
        const match = parseRepeatedExtglob(pattern.slice(index), false);
        if (!match || match.type !== "*") {
          return;
        }
        const branches = splitTopLevel(match.body).map((branch2) => branch2.trim());
        if (branches.length !== 1) {
          return;
        }
        const branch = normalizeSimpleBranch(branches[0]);
        if (!branch || branch.length !== 1) {
          return;
        }
        chars.push(branch);
        index += match.end + 1;
      }
      if (chars.length < 1) {
        return;
      }
      return chars;
    };
    var repeatedExtglobRecursion = (pattern) => {
      let depth = 0;
      let value = pattern.trim();
      let match = parseRepeatedExtglob(value);
      while (match) {
        depth++;
        value = match.body.trim();
        match = parseRepeatedExtglob(value);
      }
      return depth;
    };
    var analyzeRepeatedExtglob = (body, options) => {
      if (options.maxExtglobRecursion === false) {
        return { risky: false };
      }
      const max = typeof options.maxExtglobRecursion === "number" ? options.maxExtglobRecursion : constants2.DEFAULT_MAX_EXTGLOB_RECURSION;
      const branches = splitTopLevel(body).map((branch) => branch.trim());
      if (branches.length > 1) {
        if (branches.some((branch) => branch === "") || branches.some((branch) => /^[*?]+$/.test(branch)) || hasRepeatedCharPrefixOverlap(branches)) {
          return { risky: true };
        }
      }
      const safeChars = [];
      let sawStarSequence = false;
      let combinable = true;
      for (const branch of branches) {
        const chars = getStarExtglobSequenceChars(branch);
        if (chars) {
          sawStarSequence = true;
          safeChars.push(...chars);
          continue;
        }
        const literal = normalizeSimpleBranch(branch);
        if (literal && literal.length === 1) {
          safeChars.push(literal);
          continue;
        }
        combinable = false;
        if (repeatedExtglobRecursion(branch) > max) {
          return { risky: true };
        }
      }
      if (sawStarSequence) {
        return combinable ? { risky: true, safeOutput: buildCharClassStar([...new Set(safeChars)]) } : { risky: true };
      }
      return { risky: false };
    };
    var parse = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const PLATFORM_CHARS = constants2.globChars(opts.windows);
      const EXTGLOB_CHARS = constants2.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n = 1) => input[state.index + n];
      const advance = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type) => {
        state[type]++;
        stack.push(type);
      };
      const decrement = (type) => {
        state[type]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output) append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.output = (prev.output || prev.value) + tok.value;
          prev.value += tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        token.startIndex = state.index;
        token.tokensIndex = tokens.length;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
        push({ type: "paren", extglob: true, value: advance(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        const literal = input.slice(token.startIndex, state.index + 1);
        const body = input.slice(token.startIndex + 2, state.index);
        const analysis = analyzeRepeatedExtglob(body, opts);
        if ((token.type === "plus" || token.type === "star") && analysis.risky) {
          const safeOutput = analysis.safeOutput ? (token.output ? "" : ONE_CHAR) + (opts.capture ? `(${analysis.safeOutput})` : analysis.safeOutput) : void 0;
          const open = tokens[token.tokensIndex];
          open.type = "text";
          open.value = literal;
          open.output = safeOutput || utils.escapeRegex(literal);
          for (let i = token.tokensIndex + 1; i < tokens.length; i++) {
            tokens[i].value = "";
            tokens[i].output = "";
            delete tokens[i].suffix;
          }
          state.output = token.output + open.output;
          state.backtrack = true;
          push({ type: "paren", extglob: true, value, output: "" });
          decrement("parens");
          return;
        }
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse(rest, { ...options, fastpaths: false }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m : `\\${m}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix = POSIX_REGEX_SOURCE[rest2];
                if (posix) {
                  prev.value = pre + posix;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range.unshift(arr[i].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".") prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          const isEnd = eos() || state.parens > 0 && rest === ")".repeat(state.parens) && !extglobs.some((extglob) => extglob.type === "negate");
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && isEnd) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end2 = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end2})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse.fastpaths = (input, options) => {
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants2.globChars(opts.windows);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true) return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match) return;
            const source2 = create(match[1]);
            if (!source2) return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module2.exports = parse;
  }
});

// node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "node_modules/picomatch/lib/picomatch.js"(exports2, module2) {
    "use strict";
    var scan = require_scan();
    var parse = require_parse();
    var utils = require_utils();
    var constants2 = require_constants();
    var isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch2 = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch2(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2) return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject(glob) && glob.tokens && glob.input;
      if (glob === "" || typeof glob !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix = opts.windows;
      const regex = isState ? picomatch2.compileRe(glob, options) : picomatch2.makeRe(glob, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch2(opts.ignore, ignoreOpts, returnState);
      }
      const matcher2 = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch2.test(input, regex, options, { glob, posix });
        const result = { glob, state, regex, posix, input, output, match, isMatch };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher2.state = state;
      }
      return matcher2;
    };
    picomatch2.test = (input, regex, options, { glob, posix } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix ? utils.toPosixSlashes : null);
      let match = input === glob;
      let output = match && format ? format(input) : input;
      if (match === false) {
        output = format ? format(input) : input;
        match = output === glob;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch2.matchBase(input, regex, options, posix);
        } else {
          match = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch2.matchBase = (input, glob, options, posix = options && options.windows) => {
      const regex = glob instanceof RegExp ? glob : picomatch2.makeRe(glob, options);
      return regex.test(utils.basename(input, { windows: posix }));
    };
    picomatch2.isMatch = (str, patterns, options) => picomatch2(patterns, options)(str);
    picomatch2.parse = (pattern, options) => {
      if (Array.isArray(pattern)) return pattern.map((p) => picomatch2.parse(p, options));
      return parse(pattern, { ...options, fastpaths: false });
    };
    picomatch2.scan = (input, options) => scan(input, options);
    picomatch2.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch2.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch2.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse(input, options);
      }
      return picomatch2.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch2.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true) throw err;
        return /$^/;
      }
    };
    picomatch2.constants = constants2;
    module2.exports = picomatch2;
  }
});

// node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "node_modules/picomatch/index.js"(exports2, module2) {
    "use strict";
    var pico = require_picomatch();
    var utils = require_utils();
    function picomatch2(glob, options, returnState = false) {
      if (options && (options.windows === null || options.windows === void 0)) {
        options = { ...options, windows: utils.isWindows() };
      }
      return pico(glob, options, returnState);
    }
    Object.assign(picomatch2, pico);
    module2.exports = picomatch2;
  }
});

// src/cli.ts
var cli_exports = {};
__export(cli_exports, {
  stripSnapshots: () => stripSnapshots
});
module.exports = __toCommonJS(cli_exports);
var import_node_fs6 = require("node:fs");
var import_node_path7 = require("node:path");
var import_node_util = require("node:util");

// src/check.ts
var import_node_path6 = require("node:path");

// src/config.ts
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");

// src/rules.ts
var RULES = {
  "storage-var-removed": { severity: "error", description: "A state variable from the base layout no longer exists." },
  "storage-var-moved": { severity: "error", description: "A state variable now lives at a different slot or offset." },
  "storage-var-inserted": { severity: "error", description: "A new state variable occupies storage that was used in the base layout." },
  "storage-var-replaced": { severity: "error", description: "A different variable with an incompatible type occupies an existing slot." },
  "storage-var-renamed": { severity: "warning", description: "A variable at the same position was renamed (same type). Safe for storage, but check intent." },
  "storage-type-changed": { severity: "error", description: "A state variable's type changed in a way that reinterprets existing data." },
  "storage-type-compatible": { severity: "warning", description: "A type changed, but the encoding is compatible (e.g. address to contract type, struct members appended inside a mapping)." },
  "storage-var-appended": { severity: "info", description: "A new state variable was appended after the existing layout. Safe." },
  "storage-gap-changed": { severity: "error", description: "A storage gap was resized so that the variables after it shift." },
  "storage-gap-consumed": { severity: "info", description: "New variables use space reserved by a storage gap, and the gap shrank to match. Safe." },
  "storage-layout-missing": { severity: "warning", description: "No storage layout was produced for this contract, so storage could not be checked." },
  "abi-function-removed": { severity: "error", description: "A function was removed or its signature (selector) changed." },
  "abi-function-outputs-changed": { severity: "error", description: "A function's return types changed, so existing callers decode the wrong data." },
  "abi-function-mutability-changed": { severity: "warning", description: "A function's state mutability changed (e.g. view to nonpayable, payable to nonpayable)." },
  "abi-event-removed": { severity: "error", description: "An event was removed or its signature (topic) changed; indexers and subgraphs stop seeing it." },
  "abi-event-indexed-changed": { severity: "error", description: "An event kept its signature but changed which parameters are indexed, which changes its log layout." },
  "abi-error-removed": { severity: "warning", description: "A custom error was removed or its signature changed." },
  "abi-receive-removed": { severity: "error", description: "The receive function was removed; plain ETH transfers now revert." },
  "abi-fallback-removed": { severity: "error", description: "The fallback function was removed." },
  "abi-function-added": { severity: "info", description: "A function was added." },
  "abi-event-added": { severity: "info", description: "An event was added." },
  "contract-removed": { severity: "warning", description: "A contract that was checked on the base branch no longer exists." }
};
var RULE_IDS = Object.keys(RULES);

// src/config.ts
var DEFAULT_EXCLUDE = [
  "lib/**",
  "node_modules/**",
  "dependencies/**",
  "@*/**",
  "test/**",
  "tests/**",
  "script/**",
  "scripts/**",
  "**/*.t.sol",
  "**/*.s.sol",
  "**/mocks/**",
  "**/mock/**",
  "**/test/**"
];
var CONFIG_FILES = [".slotguard.json", "slotguard.config.json"];
function defaultConfig() {
  return { include: [], exclude: [...DEFAULT_EXCLUDE], contracts: [], scope: "upgradeable", failOn: "error", rules: {} };
}
function loadConfig(root, explicit) {
  const config = defaultConfig();
  const file = explicit ? (0, import_node_path.join)(root, explicit) : CONFIG_FILES.map((f) => (0, import_node_path.join)(root, f)).find((f) => (0, import_node_fs.existsSync)(f));
  if (!file) return config;
  if (!(0, import_node_fs.existsSync)(file)) throw new Error(`Config file not found: ${file}`);
  let raw;
  try {
    raw = JSON.parse((0, import_node_fs.readFileSync)(file, "utf8"));
  } catch (e) {
    throw new Error(`Could not parse ${file}: ${e.message}`);
  }
  return mergeConfig(config, raw, file);
}
function mergeConfig(config, raw, origin = "config") {
  const list = (key) => {
    const v = raw[key];
    if (v === void 0) return void 0;
    if (!Array.isArray(v) || v.some((x) => typeof x !== "string")) throw new Error(`${origin}: "${key}" must be an array of strings`);
    return v;
  };
  const include = list("include");
  const exclude = list("exclude");
  const extraExclude = list("extraExclude");
  const contracts = list("contracts");
  if (include) config.include = include;
  if (exclude) config.exclude = exclude;
  if (extraExclude) config.exclude.push(...extraExclude);
  if (contracts) config.contracts = contracts;
  if (raw.scope !== void 0) config.scope = parseScope(raw.scope, origin);
  if (raw.failOn !== void 0) config.failOn = parseFailOn(raw.failOn, origin);
  if (raw.rules !== void 0) {
    if (typeof raw.rules !== "object" || raw.rules === null) throw new Error(`${origin}: "rules" must be an object`);
    for (const [rule, level] of Object.entries(raw.rules)) {
      if (!RULE_IDS.includes(rule)) throw new Error(`${origin}: unknown rule "${rule}"`);
      if (!["error", "warning", "info", "off"].includes(level)) {
        throw new Error(`${origin}: rule "${rule}" must be error, warning, info or off`);
      }
      config.rules[rule] = level;
    }
  }
  return config;
}
function parseScope(v, origin = "option") {
  if (v === "upgradeable" || v === "all") return v;
  throw new Error(`${origin}: scope must be "upgradeable" or "all"`);
}
function parseFailOn(v, origin = "option") {
  if (v === "error" || v === "warning" || v === "info" || v === "never") return v;
  throw new Error(`${origin}: failOn must be error, warning, info or never`);
}

// src/diff/index.ts
var import_picomatch = __toESM(require_picomatch2());

// src/diff/abi.ts
function canonicalType(p) {
  if (p.type.startsWith("tuple")) {
    return `(${(p.components ?? []).map(canonicalType).join(",")})${p.type.slice("tuple".length)}`;
  }
  return p.type;
}
function signature(e) {
  return `${e.name ?? ""}(${(e.inputs ?? []).map(canonicalType).join(",")})`;
}
function byType(abi, type) {
  const map = /* @__PURE__ */ new Map();
  for (const e of abi) if (e.type === type) map.set(signature(e), e);
  return map;
}
function sameNameHint(entry, head) {
  const others = [...head.values()].filter((e) => e.name === entry.name).map((e) => `\`${signature(e)}\``);
  return others.length ? ` Now: ${others.join(", ")}.` : "";
}
function mutability(e) {
  if (e.stateMutability) return e.stateMutability;
  return "nonpayable";
}
function diffAbi(base, head, emit) {
  const bf = byType(base, "function");
  const hf = byType(head, "function");
  for (const [sig, b] of bf) {
    const h = hf.get(sig);
    if (!h) {
      emit("abi-function-removed", `Function \`${sig}\` was removed.${sameNameHint(b, hf)}`);
      continue;
    }
    const bo = (b.outputs ?? []).map(canonicalType).join(",");
    const ho = (h.outputs ?? []).map(canonicalType).join(",");
    if (bo !== ho) emit("abi-function-outputs-changed", `Function \`${sig}\` now returns \`(${ho})\` instead of \`(${bo})\`.`);
    if (mutability(b) !== mutability(h)) {
      emit("abi-function-mutability-changed", `Function \`${sig}\` changed from \`${mutability(b)}\` to \`${mutability(h)}\`.`);
    }
  }
  for (const sig of hf.keys()) if (!bf.has(sig)) emit("abi-function-added", `Function \`${sig}\` was added.`);
  const be = byType(base, "event");
  const he = byType(head, "event");
  for (const [sig, b] of be) {
    const h = he.get(sig);
    if (!h) {
      emit("abi-event-removed", `Event \`${sig}\` was removed.${sameNameHint(b, he)}`);
      continue;
    }
    const bi = (b.inputs ?? []).map((p) => p.indexed ? "1" : "0").join("");
    const hi = (h.inputs ?? []).map((p) => p.indexed ? "1" : "0").join("");
    if (bi !== hi || Boolean(b.anonymous) !== Boolean(h.anonymous)) {
      const show = (e) => `${e.anonymous ? "anonymous " : ""}${e.name}(${(e.inputs ?? []).map((p) => `${canonicalType(p)}${p.indexed ? " indexed" : ""}`).join(", ")})`;
      emit("abi-event-indexed-changed", `Event \`${sig}\` changed from \`${show(b)}\` to \`${show(h)}\`.`);
    }
  }
  for (const sig of he.keys()) if (!be.has(sig)) emit("abi-event-added", `Event \`${sig}\` was added.`);
  const ber = byType(base, "error");
  const her = byType(head, "error");
  for (const [sig, b] of ber) {
    if (!her.has(sig)) emit("abi-error-removed", `Error \`${sig}\` was removed.${sameNameHint(b, her)}`);
  }
  if (base.some((e) => e.type === "receive") && !head.some((e) => e.type === "receive")) {
    emit("abi-receive-removed", "The `receive()` function was removed.");
  }
  if (base.some((e) => e.type === "fallback") && !head.some((e) => e.type === "fallback")) {
    emit("abi-fallback-removed", "The `fallback()` function was removed.");
  }
}

// src/diff/types-compare.ts
var ADDRESS_LIKE = /^(address( payable)?|contract .+)$/;
function worst(a, b) {
  const order = ["equal", "compatible", "breaking"];
  return order[Math.max(order.indexOf(a), order.indexOf(b))];
}
function compareTypes(a, b, tail, path = "") {
  const at = path ? ` (${path})` : "";
  if (a.kind !== b.kind) {
    return { status: "breaking", reasons: [`\`${a.label}\` became \`${b.label}\`${at}`] };
  }
  switch (a.kind) {
    case "value": {
      const bb = b;
      if (a.label === bb.label) return { status: "equal", reasons: [] };
      if (a.bytes === bb.bytes && ADDRESS_LIKE.test(a.label) && ADDRESS_LIKE.test(bb.label)) {
        return { status: "compatible", reasons: [`\`${a.label}\` became \`${bb.label}\`${at} (same 20-byte encoding)`] };
      }
      if (a.bytes === bb.bytes && a.label.startsWith("enum ") && bb.label.startsWith("enum ")) {
        return { status: "compatible", reasons: [`\`${a.label}\` became \`${bb.label}\`${at} (same size; check member order)`] };
      }
      return { status: "breaking", reasons: [`\`${a.label}\` became \`${bb.label}\`${at}`] };
    }
    case "bytes": {
      const bb = b;
      if (a.label === bb.label) return { status: "equal", reasons: [] };
      return { status: "compatible", reasons: [`\`${a.label}\` became \`${bb.label}\`${at} (same encoding)`] };
    }
    case "ref": {
      const bb = b;
      return a.label === bb.label ? { status: "equal", reasons: [] } : { status: "breaking", reasons: [`\`${a.label}\` became \`${bb.label}\`${at}`] };
    }
    case "mapping": {
      const bb = b;
      const key = compareTypes(a.key, bb.key, false, join2(path, "key"));
      const value = compareTypes(a.value, bb.value, true, join2(path, "value"));
      return { status: worst(key.status, value.status), reasons: [...key.reasons, ...value.reasons] };
    }
    case "array": {
      const bb = b;
      if (a.length !== bb.length) {
        return { status: "breaking", reasons: [`\`${a.label}\` became \`${bb.label}\`${at}`] };
      }
      return compareTypes(a.base, bb.base, a.length === null, join2(path, "[]"));
    }
    case "struct": {
      const bb = b;
      let status = "equal";
      const reasons = [];
      const common = Math.min(a.members.length, bb.members.length);
      for (let i = 0; i < common; i++) {
        const ma = a.members[i];
        const mb = bb.members[i];
        const memberPath = join2(path, ma.label);
        if (ma.slot !== mb.slot || ma.offset !== mb.offset) {
          status = "breaking";
          reasons.push(`member \`${ma.label}\` moved from slot ${ma.slot}+${ma.offset} to ${mb.slot}+${mb.offset} in \`${a.label}\``);
          continue;
        }
        const r = compareTypes(ma.type, mb.type, tail && i === a.members.length - 1 && i === bb.members.length - 1, memberPath);
        status = worst(status, r.status);
        reasons.push(...r.reasons);
        if (ma.label !== mb.label) {
          status = worst(status, "compatible");
          reasons.push(`member \`${ma.label}\` renamed to \`${mb.label}\` in \`${a.label}\``);
        }
      }
      if (bb.members.length < a.members.length) {
        status = "breaking";
        const removed = a.members.slice(common).map((m) => `\`${m.label}\``).join(", ");
        reasons.push(`members ${removed} removed from \`${a.label}\``);
      } else if (bb.members.length > a.members.length) {
        const added = bb.members.slice(common).map((m) => `\`${m.label}\``).join(", ");
        if (tail) {
          status = worst(status, "compatible");
          reasons.push(`members ${added} appended to \`${a.label}\`; safe because nothing is stored after it`);
        } else {
          status = "breaking";
          reasons.push(`members ${added} appended to \`${a.label}\`, which grows it over the storage that follows`);
        }
      }
      if (status === "equal" && a.label !== bb.label) {
        return { status: "compatible", reasons: [`\`${a.label}\` renamed to \`${bb.label}\`${at}`] };
      }
      return { status, reasons };
    }
  }
}
function join2(path, part) {
  return path ? `${path}.${part}` : part;
}

// src/diff/storage.ts
var GAP = /^_{1,2}gap/i;
function bytesOf(t) {
  switch (t.kind) {
    case "value":
    case "array":
    case "struct":
      return BigInt(t.kind === "array" && t.length === null ? 32 : t.bytes);
    default:
      return 32n;
  }
}
function start(v) {
  return BigInt(v.slot) * 32n + BigInt(v.offset);
}
function end(v) {
  const size = bytesOf(v.type);
  const whole = v.type.kind === "struct" || v.type.kind === "array";
  return start(v) + (whole ? (size + 31n) / 32n * 32n : size);
}
function pos(v) {
  return v.offset === 0 ? `slot ${v.slot}` : `slot ${v.slot} (offset ${v.offset})`;
}
function describe(v) {
  return `\`${v.label}\` (\`${v.type.label}\`)`;
}
function isGap(v) {
  return GAP.test(v.label) && v.type.kind === "array" && v.type.length !== null;
}
function diffStorage(base, head, emit) {
  const headByLabel = /* @__PURE__ */ new Map();
  for (const v of head) if (!headByLabel.has(v.label)) headByLabel.set(v.label, v);
  const headByPos = /* @__PURE__ */ new Map();
  for (const v of head) headByPos.set(`${v.slot}:${v.offset}`, v);
  const baseLabels = new Set(base.map((v) => v.label));
  const lastBase = base.reduce((acc, v) => !acc || end(v) > end(acc) ? v : acc, void 0);
  const baseEnd = lastBase ? end(lastBase) : 0n;
  const consumed = [];
  const claimed = /* @__PURE__ */ new Set();
  for (const b of base) {
    const h = headByLabel.get(b.label);
    if (isGap(b)) {
      if (!h) {
        consumed.push({ from: start(b), to: end(b) });
        emit("storage-gap-consumed", `Gap ${describe(b)} at ${pos(b)} was removed; its space is free for new variables.`);
        continue;
      }
      claimed.add(h);
      if (end(h) === end(b) && start(h) >= start(b) && h.type.kind === "array" && b.type.kind === "array") {
        if (start(h) > start(b)) {
          consumed.push({ from: start(b), to: start(h) });
          emit(
            "storage-gap-consumed",
            `Gap \`${b.label}\` shrank from \`${b.type.label}\` to \`${h.type.label}\` and still ends at the same slot.`
          );
        }
        continue;
      }
      emit(
        "storage-gap-changed",
        `Gap \`${b.label}\` went from \`${b.type.label}\` at ${pos(b)} to \`${h.type.label}\` at ${pos(h)}, so it no longer ends at the same slot and everything after it shifts.`
      );
      continue;
    }
    if (h) {
      claimed.add(h);
      if (h.slot !== b.slot || h.offset !== b.offset) {
        emit("storage-var-moved", `${describe(b)} moved from ${pos(b)} to ${pos(h)}. Existing data stays at the old slot.`);
        continue;
      }
      const r = compareTypes(b.type, h.type, b === lastBase);
      if (r.status === "breaking") {
        emit("storage-type-changed", `${describe(b)} at ${pos(b)} changed type: ${r.reasons.join("; ")}.`);
      } else if (r.status === "compatible") {
        emit("storage-type-compatible", `${describe(b)} at ${pos(b)}: ${r.reasons.join("; ")}.`);
      }
      continue;
    }
    const occupant = headByPos.get(`${b.slot}:${b.offset}`);
    if (occupant && !baseLabels.has(occupant.label) && !claimed.has(occupant)) {
      claimed.add(occupant);
      const r = compareTypes(b.type, occupant.type, b === lastBase);
      if (r.status === "breaking") {
        emit("storage-var-replaced", `${describe(b)} at ${pos(b)} was replaced by ${describe(occupant)}: ${r.reasons.join("; ")}.`);
      } else {
        emit("storage-var-renamed", `\`${b.label}\` at ${pos(b)} was renamed to \`${occupant.label}\`.`);
        if (r.status === "compatible") emit("storage-type-compatible", `\`${occupant.label}\` at ${pos(b)}: ${r.reasons.join("; ")}.`);
      }
      continue;
    }
    emit("storage-var-removed", `${describe(b)} at ${pos(b)} was removed. Its slot still holds the old value and may be reused by a later variable.`);
  }
  for (const h of head) {
    if (claimed.has(h) || baseLabels.has(h.label)) continue;
    const s = start(h);
    const e = end(h);
    if (s >= baseEnd) {
      emit("storage-var-appended", `${describe(h)} appended at ${pos(h)}.`);
    } else if (consumed.some((r) => s >= r.from && e <= r.to)) {
      emit("storage-var-appended", `${describe(h)} added at ${pos(h)} in space taken from a storage gap.`);
    } else {
      const overlapped = base.find((b) => start(b) < e && s < end(b));
      const where = overlapped ? `, on top of base variable ${describe(overlapped)}` : "";
      emit("storage-var-inserted", `${describe(h)} was inserted at ${pos(h)}${where}. Variables after it shift and read the wrong data.`);
    }
  }
}
function collectStorage(contract, base, head, into, severity) {
  diffStorage(base, head, (rule, message) => {
    const s = severity(rule);
    if (s !== "off") into.push({ rule, severity: s, contract, message });
  });
}

// src/diff/index.ts
var UPGRADE_FUNCTIONS = /* @__PURE__ */ new Set(["upgradeTo(address)", "upgradeToAndCall(address,bytes)", "proxiableUUID()"]);
var INITIALIZED_EVENTS = /* @__PURE__ */ new Set(["Initialized(uint8)", "Initialized(uint64)", "Initialized(uint256)"]);
function looksUpgradeable(c) {
  for (const e of c.abi) {
    if (e.type === "function" && UPGRADE_FUNCTIONS.has(signature(e))) return true;
    if (e.type === "function" && e.name && /^initialize/i.test(e.name)) return true;
    if (e.type === "event" && INITIALIZED_EVENTS.has(signature(e))) return true;
  }
  return (c.storage ?? []).some((v) => /^_{1,2}gap/i.test(v.label) || v.label === "_initialized");
}
function matcher(globs) {
  if (globs.length === 0) return () => false;
  const m = (0, import_picomatch.default)(globs, { dot: true });
  return (fqn, source) => m(source) || m(fqn);
}
function selectContracts(snapshot, config) {
  const include = config.include.length ? matcher(config.include) : () => true;
  const exclude = matcher(config.exclude);
  const forced = matcher(config.contracts);
  const selected = /* @__PURE__ */ new Set();
  for (const [fqn, c] of Object.entries(snapshot.contracts)) {
    if (forced(fqn, c.source) || config.contracts.includes(c.name)) {
      selected.add(fqn);
      continue;
    }
    if (!include(fqn, c.source) || exclude(fqn, c.source)) continue;
    if (!c.deployable) continue;
    if (config.scope === "all" || looksUpgradeable(c)) selected.add(fqn);
  }
  return selected;
}
function diffSnapshots(base, head, config) {
  const severity = (rule) => config.rules[rule] ?? RULES[rule].severity;
  const checked = [...selectContracts(base, config)].sort();
  const results = [];
  for (const fqn of checked) {
    const b = base.contracts[fqn];
    const h = head.contracts[fqn];
    const findings = [];
    const push = (rule, message) => {
      const s = severity(rule);
      if (s !== "off") findings.push({ rule, severity: s, contract: fqn, message });
    };
    if (!h) {
      push("contract-removed", `\`${fqn}\` no longer exists. If it was renamed or moved, list the new name under "contracts" to keep checking it.`);
    } else {
      if (b.storage && h.storage) {
        collectStorage(fqn, b.storage, h.storage, findings, severity);
      } else {
        push("storage-layout-missing", `No storage layout for \`${fqn}\` on the ${b.storage ? "head" : "base"} side.`);
      }
      diffAbi(b.abi, h.abi, push);
    }
    results.push({ contract: fqn, findings, base: b, head: h });
  }
  const counts = { error: 0, warning: 0, info: 0 };
  for (const r of results) for (const f of r.findings) counts[f.severity]++;
  return { checked, contracts: results, counts };
}
function shouldFail(result, failOn) {
  if (failOn === "never") return false;
  if (failOn === "info") return result.counts.error + result.counts.warning + result.counts.info > 0;
  if (failOn === "warning") return result.counts.error + result.counts.warning > 0;
  return result.counts.error > 0;
}

// src/extract/index.ts
var import_node_fs4 = require("node:fs");
var import_node_path4 = require("node:path");

// src/extract/foundry.ts
var import_node_fs2 = require("node:fs");
var import_node_os = require("node:os");
var import_node_path2 = require("node:path");

// src/exec.ts
var import_node_child_process = require("node:child_process");
function run(cmd, args, opts) {
  const res = (0, import_node_child_process.spawnSync)(cmd, args, {
    cwd: opts.cwd,
    env: opts.env ?? process.env,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
    stdio: opts.inherit ? ["ignore", "inherit", "inherit"] : ["ignore", "pipe", "pipe"]
  });
  if (res.error) throw new Error(`Failed to run ${cmd}: ${res.error.message}`);
  const out = { status: res.status ?? 1, stdout: res.stdout ?? "", stderr: res.stderr ?? "" };
  if (out.status !== 0 && !opts.allowFailure) {
    const tail = (out.stderr || out.stdout).trim().split("\n").slice(-30).join("\n");
    throw new Error(`\`${[cmd, ...args].join(" ")}\` failed with exit code ${out.status}${tail ? `:
${tail}` : ""}`);
  }
  return out;
}
function runShell(command, opts) {
  return run("bash", ["-o", "pipefail", "-c", command], opts);
}

// src/normalize.ts
function normalizeStorageLayout(layout) {
  const types = layout.types ?? {};
  const resolve3 = (id, path) => {
    const def = types[id];
    if (!def) return { kind: "value", label: id, bytes: 32 };
    if (path.has(id)) return { kind: "ref", label: def.label };
    const next = new Set(path).add(id);
    const bytes = Number(def.numberOfBytes);
    switch (def.encoding) {
      case "mapping":
        return { kind: "mapping", label: def.label, key: resolve3(def.key, next), value: resolve3(def.value, next) };
      case "dynamic_array":
        return { kind: "array", label: def.label, bytes, length: null, base: resolve3(def.base, next) };
      case "bytes":
        return { kind: "bytes", label: def.label };
      default:
        if (def.members) {
          return {
            kind: "struct",
            label: def.label,
            bytes,
            members: def.members.map((m) => ({
              label: m.label,
              slot: String(m.slot),
              offset: Number(m.offset),
              type: resolve3(m.type, next)
            }))
          };
        }
        if (def.base) {
          const match = /\[(\d+)\]$/.exec(def.label);
          return { kind: "array", label: def.label, bytes, length: match ? Number(match[1]) : 0, base: resolve3(def.base, next) };
        }
        return { kind: "value", label: def.label, bytes };
    }
  };
  return layout.storage.map((item) => ({
    label: item.label,
    slot: String(item.slot),
    offset: Number(item.offset),
    type: resolve3(item.type, /* @__PURE__ */ new Set())
  }));
}
function makeContract(source, name, abi, storageLayout, bytecode) {
  const code = (bytecode ?? "").replace(/^0x/, "");
  return {
    source,
    name,
    // Unknown bytecode (not requested from the compiler) counts as deployable.
    deployable: bytecode === void 0 || code.length > 0,
    storage: storageLayout && Array.isArray(storageLayout.storage) ? normalizeStorageLayout(storageLayout) : null,
    abi: Array.isArray(abi) ? abi : []
  };
}

// src/extract/foundry.ts
function snapshotFoundry(root, opts = {}) {
  let outDir = opts.artifacts;
  let tmp;
  if (!outDir) {
    tmp = (0, import_node_fs2.mkdtempSync)((0, import_node_path2.join)((0, import_node_os.tmpdir)(), "slotguard-forge-"));
    outDir = (0, import_node_path2.join)(tmp, "out");
    const env = { ...process.env, SLOTGUARD_OUT: outDir, FOUNDRY_OUT: outDir, FOUNDRY_CACHE_PATH: (0, import_node_path2.join)(tmp, "cache") };
    opts.log?.(`Building ${root} with forge`);
    if (opts.buildCommand) {
      runShell(opts.buildCommand, { cwd: root, env, inherit: true });
    } else {
      run(
        "forge",
        ["build", "--extra-output", "storageLayout", "--skip", "test", "--skip", "script", "--out", outDir, "--cache-path", (0, import_node_path2.join)(tmp, "cache")],
        { cwd: root, env, inherit: true }
      );
    }
  }
  try {
    return readFoundryArtifacts(outDir);
  } finally {
    if (tmp) (0, import_node_fs2.rmSync)(tmp, { recursive: true, force: true });
  }
}
function readFoundryArtifacts(outDir) {
  const contracts = {};
  let withLayout = 0;
  for (const file of walk(outDir)) {
    let artifact;
    try {
      artifact = JSON.parse((0, import_node_fs2.readFileSync)(file, "utf8"));
    } catch {
      continue;
    }
    const target = artifact.metadata?.settings?.compilationTarget;
    if (!target) continue;
    const [source, name] = Object.entries(target)[0] ?? [];
    if (!source || !name) continue;
    const fqn = `${source}:${name}`;
    if (contracts[fqn]) continue;
    if (artifact.storageLayout) withLayout++;
    contracts[fqn] = makeContract(source, name, artifact.abi, artifact.storageLayout, artifact.bytecode?.object);
  }
  if (Object.keys(contracts).length === 0) throw new Error(`No Foundry artifacts found in ${outDir}`);
  if (withLayout === 0) {
    throw new Error(`Artifacts in ${outDir} have no storageLayout. Build with \`forge build --extra-output storageLayout\`.`);
  }
  return { tool: "slotguard", version: 1, framework: "foundry", contracts: sortKeys(contracts) };
}
function* walk(dir) {
  for (const entry of (0, import_node_fs2.readdirSync)(dir)) {
    if (entry === "build-info") continue;
    const full = (0, import_node_path2.join)(dir, entry);
    if ((0, import_node_fs2.statSync)(full).isDirectory()) yield* walk(full);
    else if (entry.endsWith(".json")) yield full;
  }
}
function sortKeys(obj) {
  return Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0));
}

// src/extract/hardhat.ts
var import_node_child_process2 = require("node:child_process");
var import_node_fs3 = require("node:fs");
var import_node_os2 = require("node:os");
var import_node_path3 = require("node:path");
function snapshotHardhat(root, opts = {}) {
  if (opts.build !== false) {
    opts.log?.(`Compiling ${root} with Hardhat`);
    if (opts.buildCommand) runShell(opts.buildCommand, { cwd: root, inherit: true });
    else run("npx", ["--no-install", "hardhat", "compile"], { cwd: root, inherit: true });
  }
  return readHardhatBuildInfo((0, import_node_path3.join)(root, opts.artifacts ?? "artifacts", "build-info"), opts.log);
}
function loadBuildInfos(dir) {
  if (!(0, import_node_fs3.existsSync)(dir)) throw new Error(`Hardhat build-info directory not found: ${dir}. Run \`npx hardhat compile\` first.`);
  const byId = /* @__PURE__ */ new Map();
  for (const entry of (0, import_node_fs3.readdirSync)(dir).sort()) {
    if (!entry.endsWith(".json")) continue;
    const file = (0, import_node_path3.join)(dir, entry);
    const data = JSON.parse((0, import_node_fs3.readFileSync)(file, "utf8"));
    const id = data.id ?? entry.replace(/(\.output)?\.json$/, "");
    const info = byId.get(id) ?? { file };
    if (entry.endsWith(".output.json")) info.output = data.output;
    else {
      info.file = file;
      info.solcVersion = data.solcVersion;
      info.solcLongVersion = data.solcLongVersion;
      info.input = data.input;
      if (data.output) info.output = data.output;
    }
    byId.set(id, info);
  }
  return [...byId.values()];
}
function userSourceName(source) {
  return source.startsWith("project/") ? source.slice("project/".length) : source;
}
function readHardhatBuildInfo(dir, log) {
  const contracts = {};
  for (const info of loadBuildInfos(dir)) {
    let output = info.output;
    if (!output?.contracts) continue;
    const hasLayout = Object.values(output.contracts).some((byName) => Object.values(byName).some((c) => c.storageLayout));
    if (!hasLayout) output = recompileWithLayout(info, log);
    for (const [source, byName] of Object.entries(output.contracts ?? {})) {
      for (const [name, c] of Object.entries(byName)) {
        const src = userSourceName(source);
        const fqn = `${src}:${name}`;
        if (contracts[fqn]) continue;
        contracts[fqn] = makeContract(src, name, c.abi, c.storageLayout, c.evm?.bytecode?.object);
      }
    }
  }
  if (Object.keys(contracts).length === 0) throw new Error(`No compiled contracts found in ${dir}`);
  return { tool: "slotguard", version: 1, framework: "hardhat", contracts: sortKeys(contracts) };
}
var LAYOUT_HELP = 'Add storageLayout to the compiler output in hardhat.config: solidity.settings.outputSelection = { "*": { "*": ["storageLayout"] } } (the OpenZeppelin upgrades plugin does this for you).';
function recompileWithLayout(info, log) {
  if (!info.input || !info.solcLongVersion) throw new Error(`${info.file} has no storageLayout. ${LAYOUT_HELP}`);
  const solc = findSolc(info.solcLongVersion, info.solcVersion);
  if (!solc) {
    throw new Error(`${info.file} has no storageLayout and no native solc ${info.solcLongVersion} was found to recompile it. ${LAYOUT_HELP}`);
  }
  log?.(`Recompiling ${Object.keys(info.input.sources ?? {}).length} sources with ${solc} to get storage layouts`);
  const input = structuredClone(info.input);
  input.settings ??= {};
  input.settings.outputSelection = { "*": { "*": ["abi", "storageLayout", "evm.bytecode.object"] } };
  const res = runSolc(solc, JSON.stringify(input));
  const parsed = JSON.parse(res);
  const errors = (parsed.errors ?? []).filter((e) => e.severity === "error");
  if (errors.length) throw new Error(`solc failed:
${errors.map((e) => e.formattedMessage ?? e.message).join("\n")}`);
  return parsed;
}
function runSolc(solc, input) {
  const res = (0, import_node_child_process2.spawnSync)(solc, ["--standard-json"], { input, encoding: "utf8", maxBuffer: 512 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`${solc} --standard-json failed: ${res.stderr}`);
  return res.stdout;
}
function findSolc(longVersion, version) {
  const roots = [
    process.env.XDG_CACHE_HOME && (0, import_node_path3.join)(process.env.XDG_CACHE_HOME, "hardhat-nodejs"),
    (0, import_node_path3.join)((0, import_node_os2.homedir)(), ".cache", "hardhat-nodejs"),
    (0, import_node_path3.join)((0, import_node_os2.homedir)(), "Library", "Caches", "hardhat-nodejs"),
    process.env.LOCALAPPDATA && (0, import_node_path3.join)(process.env.LOCALAPPDATA, "hardhat-nodejs", "Cache"),
    (0, import_node_path3.join)((0, import_node_os2.homedir)(), ".svm"),
    (0, import_node_path3.join)((0, import_node_os2.homedir)(), ".foundry", "svm")
  ].filter((r) => Boolean(r) && (0, import_node_fs3.existsSync)(r));
  const wanted = [longVersion, version].filter(Boolean);
  for (const root of roots) {
    const hit = search(root, wanted, 5);
    if (hit) return hit;
  }
  return void 0;
}
function search(dir, wanted, depth) {
  if (depth < 0) return void 0;
  let entries;
  try {
    entries = (0, import_node_fs3.readdirSync)(dir);
  } catch {
    return void 0;
  }
  for (const entry of entries) {
    const full = (0, import_node_path3.join)(dir, entry);
    let st;
    try {
      st = (0, import_node_fs3.statSync)(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      const hit = search(full, wanted, depth - 1);
      if (hit) return hit;
    } else if (/^solc/.test(entry) && !/\.(js|json|txt|md)$/.test(entry) && wanted.some((w) => entry.includes(w) || dir.endsWith(w))) {
      try {
        (0, import_node_fs3.accessSync)(full, import_node_fs3.constants.X_OK);
        return full;
      } catch {
        continue;
      }
    }
  }
  return void 0;
}

// src/extract/index.ts
var HARDHAT_CONFIGS = ["hardhat.config.ts", "hardhat.config.js", "hardhat.config.cjs", "hardhat.config.mjs", "hardhat.config.cts", "hardhat.config.mts"];
function detectFramework(root) {
  if ((0, import_node_fs4.existsSync)((0, import_node_path4.join)(root, "foundry.toml"))) return "foundry";
  if (HARDHAT_CONFIGS.some((f) => (0, import_node_fs4.existsSync)((0, import_node_path4.join)(root, f)))) return "hardhat";
  throw new Error(`No foundry.toml or hardhat.config.* in ${root}. Pass --framework or --working-directory.`);
}
function snapshotProject(root, opts = {}) {
  const framework = !opts.framework || opts.framework === "auto" ? detectFramework(root) : opts.framework;
  if (framework === "foundry") {
    const artifacts = opts.artifacts ?? (opts.build === false ? (0, import_node_path4.join)(root, "out") : void 0);
    return snapshotFoundry(root, { artifacts, buildCommand: opts.buildCommand, log: opts.log });
  }
  return snapshotHardhat(root, { artifacts: opts.artifacts, build: opts.build, buildCommand: opts.buildCommand, log: opts.log });
}

// src/git.ts
var import_node_fs5 = require("node:fs");
var import_node_os3 = require("node:os");
var import_node_path5 = require("node:path");
var LOCKFILES = [
  ["package-lock.json", "npm ci --ignore-scripts --no-audit --no-fund"],
  ["npm-shrinkwrap.json", "npm ci --ignore-scripts --no-audit --no-fund"],
  ["yarn.lock", "yarn install --frozen-lockfile --ignore-scripts"],
  ["pnpm-lock.yaml", "pnpm install --frozen-lockfile --ignore-scripts"],
  ["bun.lock", "bun install --frozen-lockfile --ignore-scripts"],
  ["bun.lockb", "bun install --frozen-lockfile --ignore-scripts"]
];
function git(cwd, args, allowFailure = false) {
  return run("git", args, { cwd, allowFailure });
}
function repoRoot(dir) {
  return git(dir, ["rev-parse", "--show-toplevel"]).stdout.trim();
}
function resolveCommit(root, ref, log) {
  const local = git(root, ["rev-parse", "--verify", "--quiet", `${ref}^{commit}`], true);
  if (local.status === 0) return local.stdout.trim();
  log?.(`Fetching ${ref} from origin`);
  const remoteRef = ref.replace(/^origin\//, "");
  git(root, ["fetch", "--no-tags", "--depth=1", "origin", remoteRef]);
  return git(root, ["rev-parse", "--verify", "FETCH_HEAD^{commit}"]).stdout.trim();
}
function blob(root, sha, path) {
  const res = git(root, ["show", `${sha}:${path}`], true);
  return res.status === 0 ? res.stdout : void 0;
}
function checkoutBase(headRoot, ref, opts) {
  const sha = resolveCommit(headRoot, ref, opts.log);
  const dir = (0, import_node_path5.join)((0, import_node_fs5.mkdtempSync)((0, import_node_path5.join)((0, import_node_os3.tmpdir)(), "slotguard-base-")), "repo");
  opts.log?.(`Checking out base ${ref} (${sha.slice(0, 12)}) in ${dir}`);
  git(headRoot, ["worktree", "add", "--detach", "--force", dir, sha]);
  const cleanup = () => {
    git(headRoot, ["worktree", "remove", "--force", dir], true);
    (0, import_node_fs5.rmSync)((0, import_node_path5.dirname)(dir), { recursive: true, force: true });
    git(headRoot, ["worktree", "prune"], true);
  };
  try {
    const rel = (0, import_node_path5.relative)(headRoot, opts.projectDir);
    const baseProject = (0, import_node_path5.join)(dir, rel);
    if (opts.setupCommand) {
      runShell(opts.setupCommand, { cwd: baseProject, inherit: true });
    } else {
      setupSubmodules(headRoot, dir, sha, opts.log);
      for (const prefix of /* @__PURE__ */ new Set([rel, ""])) setupNodeModules(headRoot, dir, sha, prefix, opts.log);
      setupSoldeer(headRoot, dir, sha, rel, opts.log);
    }
    return { root: dir, sha, cleanup };
  } catch (e) {
    cleanup();
    throw e;
  }
}
function setupSubmodules(headRoot, baseRoot, sha, log) {
  const tree = git(headRoot, ["ls-tree", "-r", sha]).stdout;
  const links = tree.split("\n").map((line) => /^160000 commit ([0-9a-f]+)\t(.+)$/.exec(line)).filter((m) => Boolean(m));
  const missing = [];
  for (const [, commit, path] of links) {
    const headPath = (0, import_node_path5.join)(headRoot, path);
    const headCommit = (0, import_node_fs5.existsSync)((0, import_node_path5.join)(headPath, ".git")) ? git(headPath, ["rev-parse", "HEAD"], true).stdout.trim() : "";
    if (headCommit === commit) {
      (0, import_node_fs5.rmSync)((0, import_node_path5.join)(baseRoot, path), { recursive: true, force: true });
      (0, import_node_fs5.symlinkSync)(headPath, (0, import_node_path5.join)(baseRoot, path), "dir");
    } else {
      missing.push(path);
    }
  }
  if (missing.length) {
    log?.(`Initializing ${missing.length} submodule(s) for the base checkout`);
    git(baseRoot, ["submodule", "update", "--init", "--recursive", "--depth=1", "--", ...missing]);
  }
}
function setupNodeModules(headRoot, baseRoot, sha, prefix, log) {
  const headModules = (0, import_node_path5.join)(headRoot, prefix, "node_modules");
  if (!(0, import_node_fs5.existsSync)(headModules)) return;
  const target = (0, import_node_path5.join)(baseRoot, prefix, "node_modules");
  if ((0, import_node_fs5.existsSync)(target)) return;
  const lock = LOCKFILES.find(([f]) => (0, import_node_fs5.existsSync)((0, import_node_path5.join)(headRoot, prefix, f)));
  if (!lock) {
    (0, import_node_fs5.symlinkSync)(headModules, target, "dir");
    return;
  }
  const [file, install] = lock;
  const baseLock = blob(headRoot, sha, (0, import_node_path5.join)(prefix, file));
  const headLock = (0, import_node_fs5.readFileSync)((0, import_node_path5.join)(headRoot, prefix, file), "utf8");
  if (baseLock === void 0 || baseLock === headLock) {
    (0, import_node_fs5.symlinkSync)(headModules, target, "dir");
  } else {
    log?.(`${(0, import_node_path5.join)(prefix, file)} differs on the base branch; running \`${install}\``);
    runShell(install, { cwd: (0, import_node_path5.join)(baseRoot, prefix), inherit: true });
  }
}
function setupSoldeer(headRoot, baseRoot, sha, prefix, log) {
  const headDeps = (0, import_node_path5.join)(headRoot, prefix, "dependencies");
  if (!(0, import_node_fs5.existsSync)((0, import_node_path5.join)(headRoot, prefix, "soldeer.lock")) || !(0, import_node_fs5.existsSync)(headDeps)) return;
  const target = (0, import_node_path5.join)(baseRoot, prefix, "dependencies");
  const baseLock = blob(headRoot, sha, (0, import_node_path5.join)(prefix, "soldeer.lock"));
  if (baseLock === (0, import_node_fs5.readFileSync)((0, import_node_path5.join)(headRoot, prefix, "soldeer.lock"), "utf8")) {
    (0, import_node_fs5.rmSync)(target, { recursive: true, force: true });
    (0, import_node_fs5.symlinkSync)(headDeps, target, "dir");
  } else {
    log?.("soldeer.lock differs on the base branch; running `forge soldeer install`");
    run("forge", ["soldeer", "install"], { cwd: (0, import_node_path5.join)(baseRoot, prefix), inherit: true });
  }
}

// src/check.ts
function runCheck(opts) {
  const root = (0, import_node_path6.resolve)(opts.root);
  const config = loadConfig(root, opts.config);
  opts.configOverrides?.(config);
  const head = snapshotProject(root, opts);
  const top = repoRoot(root);
  const headSha = git(top, ["rev-parse", "HEAD"]).stdout.trim();
  const checkout = checkoutBase(top, opts.base, { projectDir: root, setupCommand: opts.setupCommand, log: opts.log });
  let base;
  try {
    const baseRoot = (0, import_node_path6.join)(checkout.root, (0, import_node_path6.relative)(top, root));
    const framework = !opts.framework || opts.framework === "auto" ? detectFramework(baseRoot) : opts.framework;
    base = snapshotProject(baseRoot, { ...opts, framework, build: true, artifacts: framework === "hardhat" ? opts.artifacts : void 0 });
  } finally {
    checkout.cleanup();
  }
  return { result: diffSnapshots(base, head, config), config, base, head, baseSha: checkout.sha, headSha };
}

// src/report/markdown.ts
var REPO_URL = "https://github.com/piolpro/slotguard";
function marker(id = "default") {
  return `<!-- slotguard:${id} -->`;
}
var LABEL = { error: "Error", warning: "Warning", info: "Info" };
function cell(text) {
  return text.replace(/\|/g, "\\|").replace(/\n/g, " ");
}
function plural(n, word) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}
function headline(result) {
  const { error, warning } = result.counts;
  if (error) return `slotguard: ${plural(error, "breaking change")} found`;
  if (warning) return `slotguard: ${plural(warning, "warning")}, no breaking changes`;
  return "slotguard: no breaking storage or ABI changes";
}
function renderMarkdown(result, ctx = {}) {
  const out = [marker(ctx.id), `## ${headline(result)}`, ""];
  const { error, warning, info } = result.counts;
  if (error) {
    out.push(
      "> [!CAUTION]",
      "> This change breaks the storage layout or ABI of contracts that look upgradeable. Upgrading a deployed proxy to this code can corrupt its state or break integrations.",
      ""
    );
  }
  const range = ctx.baseLabel && ctx.headLabel ? `Compared \`${ctx.baseLabel}\` \u2192 \`${ctx.headLabel}\` \xB7 ` : "";
  out.push(`${range}${plural(result.checked.length, "contract")} checked \xB7 ${plural(error, "error")} \xB7 ${plural(warning, "warning")} \xB7 ${info} info`, "");
  const clean = [];
  for (const c of result.contracts) {
    const serious = c.findings.filter((f) => f.severity !== "info");
    if (serious.length === 0) {
      clean.push(c.contract);
      continue;
    }
    const e = serious.filter((f) => f.severity === "error").length;
    const w = serious.length - e;
    const parts = [e && plural(e, "error"), w && plural(w, "warning")].filter(Boolean).join(", ");
    out.push(`### \`${c.contract}\` (${parts})`, "", "| Severity | Rule | Finding |", "| --- | --- | --- |");
    for (const f of sortFindings(serious)) out.push(`| ${LABEL[f.severity]} | [\`${f.rule}\`](${REPO_URL}/blob/main/docs/rules.md#${f.rule}) | ${cell(f.message)} |`);
    out.push("");
    const infos = c.findings.filter((f) => f.severity === "info");
    if (infos.length) out.push(...details(`${plural(infos.length, "safe change")}`, infos.map((f) => `- ${f.message}`)));
    if (c.base?.storage && c.head?.storage && serious.some((f) => f.rule.startsWith("storage-"))) {
      out.push(...details("Storage layout, base \u2192 head", layoutTable(c.base.storage, c.head.storage)));
    }
  }
  if (clean.length) {
    const lines = result.contracts.filter((c) => clean.includes(c.contract)).map((c) => {
      const infos = c.findings.length;
      return `- \`${c.contract}\`${infos ? ` (${plural(infos, "safe change")})` : ""}`;
    });
    out.push(...details(`${plural(clean.length, "contract")} with no issues`, lines));
  }
  if (result.checked.length === 0) {
    out.push(
      "No upgradeable contracts were found on the base branch. slotguard detects OpenZeppelin-style initializers, UUPS functions and storage gaps; list contracts explicitly under `contracts` in `.slotguard.json`, or set `scope` to `all`.",
      ""
    );
  }
  out.push(`<sub>[slotguard](${REPO_URL})${ctx.version ? ` v${ctx.version}` : ""} \xB7 [rules](${REPO_URL}/blob/main/docs/rules.md) \xB7 configure with \`.slotguard.json\`</sub>`);
  return out.join("\n") + "\n";
}
function details(summary, lines) {
  return ["<details>", `<summary>${summary}</summary>`, "", ...lines, "", "</details>", ""];
}
var ORDER = { error: 0, warning: 1, info: 2 };
function sortFindings(findings) {
  return [...findings].sort((a, b) => ORDER[a.severity] - ORDER[b.severity]);
}
function layoutTable(base, head) {
  const key = (v) => `${v.slot}:${v.offset}`;
  const rows = /* @__PURE__ */ new Map();
  for (const v of base) rows.set(key(v), { slot: v.slot, offset: v.offset, base: v });
  for (const v of head) {
    const row = rows.get(key(v)) ?? { slot: v.slot, offset: v.offset };
    row.head = v;
    rows.set(key(v), row);
  }
  const sorted = [...rows.values()].sort((a, b) => {
    const d = BigInt(a.slot) - BigInt(b.slot);
    return d !== 0n ? d < 0n ? -1 : 1 : a.offset - b.offset;
  });
  const show = (v) => v ? `\`${cell(v.label)}\`: \`${cell(v.type.label)}\`` : "";
  const lines = ["| Slot | Offset | Base | Head | |", "| --- | --- | --- | --- | --- |"];
  for (const r of sorted) {
    const same = r.base && r.head && r.base.label === r.head.label && r.base.type.label === r.head.type.label;
    lines.push(`| ${r.slot} | ${r.offset} | ${show(r.base)} | ${show(r.head)} | ${same ? "" : "changed"} |`);
  }
  return lines;
}
function renderText(result, color = false) {
  const paint = (code, s) => color ? `\x1B[${code}m${s}\x1B[0m` : s;
  const sev = { error: paint("31", "error  "), warning: paint("33", "warning"), info: paint("2", "info   ") };
  const lines = [];
  for (const c of result.contracts) {
    if (!c.findings.length) continue;
    lines.push(paint("1", c.contract));
    for (const f of sortFindings(c.findings)) lines.push(`  ${sev[f.severity]}  ${f.rule.padEnd(32)} ${f.message.replace(/`/g, "")}`);
    lines.push("");
  }
  const { error, warning, info } = result.counts;
  lines.push(`${plural(result.checked.length, "contract")} checked: ${plural(error, "error")}, ${plural(warning, "warning")}, ${info} info`);
  return lines.join("\n") + "\n";
}

// src/version.ts
var VERSION = true ? "0.1.0" : "0.0.0-dev";

// src/cli.ts
var HELP = `slotguard ${VERSION}: catch storage layout and ABI breaks in upgradeable Solidity contracts

Usage:
  slotguard check [--base <ref>] [options]      Build the base ref and the working tree, then diff them
  slotguard snapshot [--out <file>] [options]   Write the storage layout + ABI snapshot of the working tree
  slotguard diff <base.json> <head.json>        Diff two snapshots

Options:
  --root <dir>             Project directory (default: current directory)
  --base <ref>             Base git ref for \`check\` (default: origin/main)
  --framework <name>       foundry, hardhat or auto (default: auto)
  --no-build               Read existing artifacts instead of building the working tree
  --artifacts <dir>        Artifacts directory (Foundry \`out\`, Hardhat \`artifacts\`)
  --build-command <cmd>    Custom build command
  --setup-command <cmd>    Command that installs dependencies in the base checkout
  --config <file>          Config file (default: .slotguard.json or slotguard.config.json)
  --scope <scope>          upgradeable (default) or all
  --fail-on <level>        error (default), warning, info or never
  --format <fmt>           text (default), markdown or json
  --markdown-out <file>    Also write the markdown report to a file
  --json-out <file>        Also write the JSON result to a file
  -q, --quiet              Only print the report
  -v, --version            Print the version
  -h, --help               Show this help

Exit codes: 0 no findings at --fail-on level, 1 findings, 2 usage or build error.
`;
function main(argv) {
  const { values, positionals } = (0, import_node_util.parseArgs)({
    args: argv,
    allowPositionals: true,
    options: {
      root: { type: "string" },
      base: { type: "string" },
      framework: { type: "string" },
      "no-build": { type: "boolean" },
      artifacts: { type: "string" },
      "build-command": { type: "string" },
      "setup-command": { type: "string" },
      config: { type: "string" },
      scope: { type: "string" },
      "fail-on": { type: "string" },
      format: { type: "string" },
      out: { type: "string" },
      "markdown-out": { type: "string" },
      "json-out": { type: "string" },
      quiet: { type: "boolean", short: "q" },
      version: { type: "boolean", short: "v" },
      help: { type: "boolean", short: "h" }
    }
  });
  if (values.version) {
    process.stdout.write(`${VERSION}
`);
    return 0;
  }
  const [command, ...rest] = positionals;
  if (values.help || !command) {
    process.stdout.write(HELP);
    return command || values.help ? 0 : 2;
  }
  const root = (0, import_node_path7.resolve)(values.root ?? ".");
  const log = values.quiet ? void 0 : (msg) => process.stderr.write(`slotguard: ${msg}
`);
  const framework = values.framework ?? "auto";
  if (!["auto", "foundry", "hardhat"].includes(framework)) throw new UsageError("--framework must be foundry, hardhat or auto");
  const snapshotOpts = {
    framework,
    build: !values["no-build"],
    artifacts: values.artifacts,
    buildCommand: values["build-command"],
    log
  };
  if (command === "snapshot") {
    const snap = snapshotProject(root, snapshotOpts);
    const json = JSON.stringify(snap, null, 2) + "\n";
    if (values.out) (0, import_node_fs6.writeFileSync)(values.out, json);
    else process.stdout.write(json);
    return 0;
  }
  const config = loadConfig(root, values.config);
  if (values.scope) config.scope = parseScope(values.scope, "--scope");
  if (values["fail-on"]) config.failOn = parseFailOn(values["fail-on"], "--fail-on");
  let result;
  let labels = {};
  if (command === "diff") {
    if (rest.length !== 2) throw new UsageError("diff needs <base.json> <head.json>");
    const read = (f) => JSON.parse((0, import_node_fs6.readFileSync)(f, "utf8"));
    result = diffSnapshots(read(rest[0]), read(rest[1]), config);
    labels = { baseLabel: rest[0], headLabel: rest[1] };
  } else if (command === "check") {
    const base = values.base ?? "origin/main";
    const res = runCheck({
      ...snapshotOpts,
      root,
      base,
      config: values.config,
      setupCommand: values["setup-command"],
      configOverrides: (c) => {
        c.scope = config.scope;
        c.failOn = config.failOn;
      }
    });
    result = res.result;
    labels = { baseLabel: `${base} (${res.baseSha.slice(0, 7)})`, headLabel: `HEAD (${res.headSha.slice(0, 7)})` };
  } else {
    throw new UsageError(`Unknown command "${command}"`);
  }
  const markdown = renderMarkdown(result, { ...labels, version: VERSION });
  if (values["markdown-out"]) (0, import_node_fs6.writeFileSync)(values["markdown-out"], markdown);
  if (values["json-out"]) (0, import_node_fs6.writeFileSync)(values["json-out"], JSON.stringify(stripSnapshots(result), null, 2) + "\n");
  const format = values.format ?? "text";
  if (format === "markdown") process.stdout.write(markdown);
  else if (format === "json") process.stdout.write(JSON.stringify(stripSnapshots(result), null, 2) + "\n");
  else if (format === "text") process.stdout.write(renderText(result, process.stdout.isTTY));
  else throw new UsageError("--format must be text, markdown or json");
  return shouldFail(result, config.failOn) ? 1 : 0;
}
function stripSnapshots(result) {
  return { ...result, contracts: result.contracts.map(({ contract, findings }) => ({ contract, findings })) };
}
var UsageError = class extends Error {
};
try {
  process.exitCode = main(process.argv.slice(2));
} catch (e) {
  process.stderr.write(`slotguard: ${e.message}
`);
  if (e instanceof UsageError) process.stderr.write("Run `slotguard --help` for usage.\n");
  process.exitCode = 2;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  stripSnapshots
});

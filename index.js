'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

// Log node version to help debug
console.log(process.version);

var fs = require('fs');

var readSummary = function readSummary(filepath) {
  return fs.readFileSync(filepath, { encoding: 'utf8' }).trim().split('\n');
};
var writeSummary = function writeSummary(filepath, lines) {
  return fs.writeFileSync(filepath, lines.join('\n'));
};

var isLink = function isLink(line) {
  return (/^\s*(\*|-|\+)/.test(line)
  );
};

var isSubpart = function isSubpart(line, indent) {
  return line.startsWith(indent);
};
var isSubsubpart = function isSubsubpart(line, indent) {
  return line.startsWith('' + indent + indent);
};

// To my knowledge, Gitbook disallows nesting more than 2 levels deep which is
// why the section is a hard-coded 3-tuple of [part, subpart, subsubpart].
function addSectionNumber(lines) {
  var section = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0, 0];
  var indent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '  ';

  if (lines.length === 0) {
    return lines;
  }

  var _lines = _toArray(lines),
      line = _lines[0],
      rest = _lines.slice(1);

  var _section = _slicedToArray(section, 3),
      part = _section[0],
      subpart = _section[1],
      subsubpart = _section[2];

  if (!isLink(line)) {
    return [line].concat(_toConsumableArray(addSectionNumber(rest, section, indent)));
  }

  var _line$split = line.split('['),
      _line$split2 = _slicedToArray(_line$split, 2),
      before = _line$split2[0],
      after = _line$split2[1];

  // We only increment the numbering for a section *after* the recursion since
  // we can't tell ahead of time whether the next link is nested.


  if (isSubsubpart(line, indent)) {
    var newLine = before + '[' + part + '.' + subpart + '.' + (subsubpart + 1) + ' ' + after;
    return [newLine].concat(_toConsumableArray(addSectionNumber(rest, [part, subpart, subsubpart + 1], indent)));
  } else if (isSubpart(line, indent)) {
    var _newLine = before + '[' + part + '.' + (subpart + 1) + ' ' + after;
    return [_newLine].concat(_toConsumableArray(addSectionNumber(rest, [part, subpart + 1, 0], indent)));
  } else {
    var _newLine2 = before + '[' + (part + 1) + '. ' + after;
    return [_newLine2].concat(_toConsumableArray(addSectionNumber(rest, [part + 1, 0, 0], indent)));
  }
}

module.exports = {
  hooks: {
    init: function init() {
      var root = this.resolve('');
      var summaryFilename = this.config.get('structure.summary');
      var filepath = root + '/' + summaryFilename;

      var lines = readSummary(filepath);
      var linesWithSection = addSectionNumber(lines);
      writeSummary(filepath, linesWithSection);

      // Log output summary for debugging
      console.log(readSummary(filepath));
    }
  },

  // Add functions to the exports for easier testing
  testing: {
    addSectionNumber: addSectionNumber
  }
};

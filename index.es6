// Log node version to help debug
console.log(process.version)

const fs = require('fs')

const readSummary = filepath =>
  fs
    .readFileSync(filepath, { encoding: 'utf8' })
    .trim()
    .split('\n')
const writeSummary = (filepath, lines) =>
  fs.writeFileSync(filepath, lines.join('\n'))

const isLink = line => /^\s*(\*|-|\+)/.test(line)

const isSubpart = (line, indent) => line.startsWith(indent)
const isSubsubpart = (line, indent) => line.startsWith(`${indent}${indent}`)

// To my knowledge, Gitbook disallows nesting more than 2 levels deep which is
// why the section is a hard-coded 3-tuple of [part, subpart, subsubpart].
function addSectionNumber(lines, section = [0, 0, 0], indent = '  ') {
  if (lines.length === 0) {
    return lines
  }

  const [line, ...rest] = lines
  const [part, subpart, subsubpart] = section

  if (!isLink(line)) {
    return [line, ...addSectionNumber(rest, section, indent)]
  }

  const [before, after] = line.split('[')

  // We only increment the numbering for a section *after* the recursion since
  // we can't tell ahead of time whether the next link is nested.
  if (isSubsubpart(line, indent)) {
    const newLine = `${before}[${part}.${subpart}.${subsubpart + 1} ${after}`
    return [
      newLine,
      ...addSectionNumber(rest, [part, subpart, subsubpart + 1], indent),
    ]
  } else if (isSubpart(line, indent)) {
    const newLine = `${before}[${part}.${subpart + 1} ${after}`
    return [newLine, ...addSectionNumber(rest, [part, subpart + 1, 0], indent)]
  } else {
    const newLine = `${before}[${part + 1}. ${after}`
    return [newLine, ...addSectionNumber(rest, [part + 1, 0, 0], indent)]
  }
}

module.exports = {
  hooks: {
    init: function init() {
      const root = this.resolve('')
      const summaryFilename = this.config.get('structure.summary')
      const filepath = `${root}/${summaryFilename}`

      const lines = readSummary(filepath)
      const linesWithSection = addSectionNumber(lines)
      writeSummary(filepath, linesWithSection)

      // Log output summary for debugging
      console.log(readSummary(filepath));
    },
  },

  // Add functions to the exports for easier testing
  testing: {
    addSectionNumber,
  },
}

const fs = require('fs')

const readSummary = () =>
  fs
    .readFileSync('SUMMARY.md', { encoding: 'utf8' })
    .trim()
    .split('\n')
const writeSummary = lines =>
  fs.writeFileSync('NEW_SUMMARY.md', str.join('\n'))

const isLink = line => /^\s*(\*|-|\+)/.test(line)
const isSubsection = line => /^\s+/.test(line)

function addSectionNumber(lines, section = 1, subsection = 1) {
  if (lines.length === 0) {
    return lines
  }

  const [line, ...rest] = lines

  if (!isLink(line)) {
    return [line, ...addSectionNumber(rest, section, subsection)]
  }

  const [before, after] = line.split('[')

  if (isSubsection(line)) {
    // If we recursed into a subsection we've just incremented the section
    // number after parsing the previous section, so we decrement it by one to
    // avoid an off-by-one error.
    const newLine = `${before}[${section - 1}.${subsection} ${after}`
    return [newLine, ...addSectionNumber(rest, section, subsection + 1)]
  } else {
    const newLine = `${before}[${section}. ${after}`
    return [newLine, ...addSectionNumber(rest, section + 1, 1)]
  }
}

module.exports = {
  hooks: {
    init: () => {
      const lines = readSummary()
      const linesWithSection = addSectionNumber(lines)
      writeSummary(linesWithSection)
    },
  },

  // Add functions to the exports for easier testing
  testing: {
    addSectionNumber,
  },
}

// Simple assertion that the index.js file works as expected
const assert = require('assert')
const plugin = require('./index.js')

const { addSectionNumber } = plugin.testing

const ALL_TESTS = [testSimple, testNested]

function testAddSectionNum(input, output) {
  assert.deepStrictEqual(addSectionNumber(input, [0, 0, 0], '  '), output)
}

function testSimple() {
  const input = [
    '# Table of Contents',
    '* [Read Me](/README.md)',
    '* [Introduction](/introduction/README.md)',
    '  * [Motivation](/introduction/Motivation.md)',
    '  * [Getting Started](/introduction/Getting_Started.md)',
    '* [Tutorial](/tutorial/README.md)',
    '  * [Simple Widgets](/tutorial/Simple_Widgets.md)',
    '  * [Interact](/tutorial/Interact.md)',
  ]

  const output = [
    '# Table of Contents',
    '* [1. Read Me](/README.md)',
    '* [2. Introduction](/introduction/README.md)',
    '  * [2.1 Motivation](/introduction/Motivation.md)',
    '  * [2.2 Getting Started](/introduction/Getting_Started.md)',
    '* [3. Tutorial](/tutorial/README.md)',
    '  * [3.1 Simple Widgets](/tutorial/Simple_Widgets.md)',
    '  * [3.2 Interact](/tutorial/Interact.md)',
  ]

  testAddSectionNum(input, output)
}

function testNested() {
  const input = [
    '* [Data Science](chapters/01/what-is-data-science.md)',
    '  * [Introduction](chapters/01/1/intro.md)',
    '    * [Computational Tools](chapters/01/1/1/computational-tools.md)',
    '    * [Statistical Techniques](chapters/01/1/2/statistical-techniques.md)',
    '  * [Why Data Science?](chapters/01/2/why-data-science.md)',
    '  * [Plotting the Classics](chapters/01/3/plotting-the-classics.md)',
    '    * [Literary Characters](chapters/01/3/1/literary-characters.md)',
    '    * [Another Kind of Character](chapters/01/3/2/another-kind-of-character.md)',
    '* [Causality and Experiments](chapters/02/causality-and-experiments.md)',
    '  * [John Snow and the Broad Street Pump](chapters/02/1/observation-and-visualization-john-snow-and-the-broad-street-pump.md)',
  ]

  const output = [
    '* [1. Data Science](chapters/01/what-is-data-science.md)',
    '  * [1.1 Introduction](chapters/01/1/intro.md)',
    '    * [1.1.1 Computational Tools](chapters/01/1/1/computational-tools.md)',
    '    * [1.1.2 Statistical Techniques](chapters/01/1/2/statistical-techniques.md)',
    '  * [1.2 Why Data Science?](chapters/01/2/why-data-science.md)',
    '  * [1.3 Plotting the Classics](chapters/01/3/plotting-the-classics.md)',
    '    * [1.3.1 Literary Characters](chapters/01/3/1/literary-characters.md)',
    '    * [1.3.2 Another Kind of Character](chapters/01/3/2/another-kind-of-character.md)',
    '* [2. Causality and Experiments](chapters/02/causality-and-experiments.md)',
    '  * [2.1 John Snow and the Broad Street Pump](chapters/02/1/observation-and-visualization-john-snow-and-the-broad-street-pump.md)',
  ]

  testAddSectionNum(input, output)
}

ALL_TESTS.forEach(test => test())
console.log('Tests pass.')

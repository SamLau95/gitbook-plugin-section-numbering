// Simple assertion that the index.js file works as expected
const assert = require('assert')
const plugin = require('./index.js')

const { addSectionNumber } = plugin.testing

function testAddSectionNumber() {
  const summary = [
  '# Table of Contents',
  '* [Read Me](/README.md)',
  '* [Introduction](/introduction/README.md)',
  '  * [Motivation](/introduction/Motivation.md)',
  '  * [Getting Started](/introduction/Getting_Started.md)',
  '* [Tutorial](/tutorial/README.md)',
  '  * [Simple Widgets](/tutorial/Simple_Widgets.md)',
  '  * [Interact](/tutorial/Interact.md)',
  ]

  const result = addSectionNumber(summary)

  assert.deepStrictEqual(result, [
    '# Table of Contents',
    '* [1. Read Me](/README.md)',
    '* [2. Introduction](/introduction/README.md)',
    '  * [2.1 Motivation](/introduction/Motivation.md)',
    '  * [2.2 Getting Started](/introduction/Getting_Started.md)',
    '* [3. Tutorial](/tutorial/README.md)',
    '  * [3.1 Simple Widgets](/tutorial/Simple_Widgets.md)',
    '  * [3.2 Interact](/tutorial/Interact.md)',
  ])
}

testAddSectionNumber()
console.log('Tests pass.')

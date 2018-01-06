# Automatic Section Numbering in Gitbook Sidebar

This plugin will take a `SUMMARY.md` that you've already written and add
section numbers in the generated Gitbook's sidebar.

For example, given this `SUMMARY.md` file:

```markdown
# Table of Contents
* [Read Me](/README.md)
* [Introduction](/introduction/README.md)
  * [Motivation](/introduction/Motivation.md)
  * [Getting Started](/introduction/Getting_Started.md)
* [Tutorial](/tutorial/README.md)
  * [Simple Widgets](/tutorial/Simple_Widgets.md)
  * [Interact](/tutorial/Interact.md)
```

This plugin will generate:

```markdown
# Table of Contents
* [1. Read Me](/README.md)
* [2. Introduction](/introduction/README.md)
  * [2.1 Motivation](/introduction/Motivation.md)
  * [2.2 Getting Started](/introduction/Getting_Started.md)
* [3. Tutorial](/tutorial/README.md)
  * [3.1 Simple Widgets](/tutorial/Simple_Widgets.md)
  * [3.2 Interact](/tutorial/Interact.md)
```

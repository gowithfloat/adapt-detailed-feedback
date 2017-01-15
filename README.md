Detailed Feedback
=================
**Detailed Feedback** is a drop-in replacement for [Tutor](https://github.com/adaptlearning/adapt-contrib-tutor/) that provides more detailed feedback on multiple-choice questions. In addition to the generic correct/incorrect feedback, it also provides answer-specific feedback for each user-selected answer.

![detailed-feedback](https://cloud.githubusercontent.com/assets/480718/21966313/ab8aefee-db36-11e6-8908-16a642661d2a.gif)

To keep compatibility with Tutor, this extension will still trigger the `tutor:opened` and `tutor:closed` events when the feedback window is opened and closed.

Settings
--------
### Attributes
#### config.json
**_isEnabled** (boolean): Set to false to disable feedback popups.

**_showDetailsBeforeLastAttempt** (boolean): Set to false to prevent showing detailed feedback until all attempts are exhausted or the question is answered correctly.

Limitations
-----------
No known limitations.

-----------
**Detailed Feedback** is a plugin for the Adapt Framework. [Adapt](https://www.adaptlearning.org) is a free and easy to use e-learning authoring tool that creates fully responsive, multi-device, HTML5 e-learning content using the award-winning Adapt developer framework.
define([
  'coreJS/adapt'
],function(Adapt) {
  Adapt.on('questionView:showFeedback', function(view) {
    var config = Adapt.config.get("_detailedFeedback");

    if (!config || !config._isEnabled) {
      return;
    }

    var template = Handlebars.templates['detailed-feedback'];
    var modelAttributes = _.clone(view.model.attributes);
    
    modelAttributes.genericFeedback = _determineGenericFeedback(view.model);
    modelAttributes.shouldShowDetails = view.model.get('_isCorrect') || view.model.get('_attemptsLeft') === 0 || config._showDetailsBeforeLastAttempt;

    var alertObject = {
      title: view.model.get("feedbackTitle"),
      body: template(modelAttributes)
    };

    // Attach classes to the feedback popup to enable
    // correct vs incorrect styling
    if (view.model.has('_isCorrect')) {
      if (view.model.get('_isCorrect')) {
        alertObject._classes = 'correct';
      } else if (view.model.has('_isAtLeastOneCorrectSelection') && view.model.get('_isAtLeastOneCorrectSelection')) {
        alertObject._classes = 'partially-correct';
      } else {
        alertObject._classes = 'incorrect';
      }
    }

    Adapt.once("notify:closed", function() {
      Adapt.trigger("tutor:closed", view, alertObject);
    });

    Adapt.trigger('notify:popup', alertObject);

    // Serve as a drop-in replacement for Tutor, but still fire the tutor events
    Adapt.trigger('tutor:opened', view, alertObject);
  });
});

/**
 * Each question can be assigned generic correct, incorrect, or partially correct feedback.
 * (Generic meaning it's not dependent on any selected item.)
 *
 * @param  {Model} model An answered question model.
 *
 * @return {string}      The generic feedback based on current answer state; or null if no feedback could be determined.
 */
function _determineGenericFeedback(model) {
  /**
   * Selects either the `notFinal` or `final` feedback state
   * depending on the state of the question.
   *
   * If the user is out of attempts, or there is no content specified for `notFinal` feedback,
   * then the `final` feedback is returned.
   *
   * @param  {object} feedbackObject Object containing feedback.
   *
   * @return {string}                The feedback.
   */
  function _selectFeedback(feedbackObject) {
    if (model.get('_attemptsLeft') === 0 || !feedbackObject.notFinal) {
      return feedbackObject.final;
    } else {
      return feedbackObject.notFinal;
    }
  }

  if (model.get('_isCorrect')) {
    return model.get('_feedback').correct;
  } else if (model.get('_isAtLeastOneCorrectSelection')) {
    return _selectFeedback(model.get('_feedback')._partlyCorrect);
  } else {
    return _selectFeedback(model.get('_feedback')._incorrect);
  }
}
module.exports = {
  //handlebarsHelpers
  isEqual: function (a, b, options) {
    if (a === b) {
      return options.fn(this)
    }
    return options.inverse(this)
  },
  //製作Description
  createDescription: function (req) {
    const taskData = require('../config/taskData.json')
    const occupation = String(req.body.radio)
    const occupationChinese = taskData.occupation[occupation]

    const taskArray = taskData.task[occupation]
    const taskRandomIndex = Math.floor(Math.random() * (taskArray.length))
    const task = taskArray[taskRandomIndex]

    const phraseArray = taskData.phrase
    const phraseRandomIndex = Math.floor(Math.random() * (phraseArray.length))
    const phrase = phraseArray[phraseRandomIndex]
    const description = `身為一個${occupationChinese}，${task}，${phrase}吧！`
    return description
  }
}
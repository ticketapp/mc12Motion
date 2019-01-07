{
  //@include "./dict.js"

  function FindAndReplaceText(thisObj) {
    var scriptName = "Find and Replace Text";

    // var f = new File("log.txt")
    // f.encoding = "UTF-8";
    // f.open("w");

    var fileName = prompt("Please enter the file name");

    // app.beginUndoGroup("Replace All");

    var compToExport = null;

    // Rajouter une boucle sur la liste des langues
    var langList = ["en", "es", "de", "it"]
    var langIndex;
    for (langIndex = 0; langIndex < langList.length; langIndex++) {

      for (var i = 1; i <= app.project.numItems; i++) {
        if (app.project.item(i) instanceof CompItem) {
          var myComp = app.project.item(i);

          if (myComp.name === '01_01_01_FR_04') {
            compToExport = myComp;
          }

          var numberOfLayers = myComp.numLayers;
          for (var j = 1; j <= numberOfLayers; j++) {
            var sourceText = myComp.layer(j).sourceText;
            if (sourceText != null) {
              if (sourceText.numKeys == 0) {
                //     // textValue is a TextDocument. Retrieve the string inside
                var oldString = sourceText.value.text;
                // f.writeln(oldString);
                if (dict[oldString]) {
                  var newString = replaceTextInString(oldString, oldString, dict[oldString][langIndex]);
                  if (oldString != newString) {
                    sourceText.setValue(newString);
                  }
                }
              } else {
                // Do it for each keyframe:
                for (var keyIndex = 1; keyIndex <= sourceText.numKeys; keyIndex++) {
                  // textValue is a TextDocument. Retrieve the string inside
                  var oldString = sourceText.keyValue(keyIndex).text;
                  // f.writeln(oldString);
                  if (dict[oldString]) {
                    var newString = replaceTextInString(oldString, oldString, dict[oldString][langIndex]);
                    if (oldString != newString) {
                      sourceText.setValueAtKey(keyIndex,newString);
                    }
                  }
                }
              }
            }
          }
        }
      }
      // app.endUndoGroup();
      // f.close();
      alert(langList[langIndex])
      var resultFile = new File(fileName + "_" + langList[langIndex])
      var renderQueue = app.project.renderQueue;
      var render = renderQueue.items.add(compToExport);
      render.outputModules[1].file = resultFile;
      renderQueue.queueInAME(false);
    }

    function replaceTextInString(totalString, findString, replaceString) {
      var regularExpression = new RegExp(findString, "g");
      var newString = totalString.replace(regularExpression, replaceString);
      return newString;
    }
  }

  FindAndReplaceText(this);
}

{
  function FindAndReplaceText(thisObj) {
    var scriptName = "Find and Replace Text";

    var f = new File("log.txt")
    f.encoding = "UTF-8";
    f.open("w");
    //================== HASH MAP ==============================================
    var myFile = File("motion.csv");
    var fileOK = myFile.open("r");

    // var frenchWords = [];
    var dict = {};

    if (fileOK) {

      var line;
      var words;

      while (!myFile.eof) {
        line = myFile.readln();
        words = line.split(",");

        var toolPattern = /^(T\d)/;
        var numberPattern = /^\s*\d\s*$/;

        var onlyGoodWords = words
        .filter(function (el) { return el !== "" })
        .filter(function (el) { return !toolPattern.test(el) })
        .filter(function (el) { return !numberPattern.test(el) })

        if(onlyGoodWords[0]) {
          // f.writeln(onlyGoodWords[0])
          // frenchWords.push(onlyGoodWords[0])
          dict[onlyGoodWords[0]] = onlyGoodWords.slice(1);
        }
        // else if(onlyGoodWords.length != 5)  {
        //   alert(onlyGoodWords)
        // }
      }
    }

    myFile.close();
    //==========================================================================

    var fileName = prompt("Please enter the file name");

    app.beginUndoGroup("Replace All");

    var compToExport = null;

    for (var i = 1; i <= app.project.numItems; i++) {
      if (app.project.item(i) instanceof CompItem) {
        var myComp = app.project.item(i);

        if (myComp.name === '01_01_01_FR_04') {
          compToExport = myComp;
        }

        // mettre des vraies var ici
        // mettre des vraies var ici
        // mettre des vraies var ici
        // mettre des vraies var ici
        // mettre des vraies var ici
        // mettre des vraies var ici
        // mettre des vraies var ici
        var findString = "AGENDA"
        var replaceString = "WESH"

        var numberOfLayers = myComp.numLayers;
        for (var j = 1; j <= numberOfLayers; j++) {
          // f.writeln(myComp.layer(j).name)
          var sourceText = myComp.layer(j).sourceText;
          if (sourceText != null) {
            if (sourceText.numKeys == 0) {
              //     // textValue is a TextDocument. Retrieve the string inside
              var oldString = sourceText.value.text;
              // f.writeln(oldString);
              if (oldString.indexOf(findString) != -1) {
                var newString = replaceTextInString(oldString, findString, replaceString);
                if (oldString != newString) {
                  sourceText.setValue(newString);
                }
              }
            } else {
              // Do it for each keyframe:
              for (var keyIndex = 1; keyIndex <= sourceText.numKeys; keyIndex++) {
                // textValue is a TextDocument. Retrieve the string inside
                var oldString = sourceText.keyValue(keyIndex).text;
                f.writeln(oldString);
                if (oldString.indexOf(findString) != -1) {
                  var newString = replaceTextInString(oldString, findString, replaceString);
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
    app.endUndoGroup();
    f.close();

    var resultFile = new File(fileName + "_it")
    var renderQueue = app.project.renderQueue;
    var render = renderQueue.items.add(compToExport);
    render.outputModules[1].file = resultFile;
    renderQueue.queueInAME(false);

    function replaceTextInString(totalString, findString, replaceString) {
      var regularExpression = new RegExp(findString,"g");
      var newString = totalString.replace(regularExpression, replaceString);
      return newString;
    }
  }

  FindAndReplaceText(this);
}

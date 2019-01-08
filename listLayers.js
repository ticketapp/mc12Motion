{
  //@include "./dict.js"

  function FindAndReplaceText(thisObj) {
    var scriptName = "Bruthor";


    var f = new File("log.txt")
    f.encoding = "UTF-8";
    f.open("w");

    //   var fileName = prompt("Please enter the file name without any dot");
    //   // Rajouter l'export du français avant la trad
    //   // rajouter dans le fichier dict.js
    //   var renderQueue = app.project.renderQueue;
    //
    //   var duplicatedComp = null;
    //
    //   var langList = ["en", "es", "de", "it"]
    //   var langIndex;
    //   for (langIndex = 0; langIndex < langList.length; langIndex++) {
    //
    //   f.writeln(  app.project.numItems)
    //
    //     for (var i = 1; i <= app.project.numItems; i++) {
    //
    //
    //
    //       var isMainComp = app.project.item(i) instanceof CompItem &&
    //       app.project.item(i).name === '01_01_01_FR_04'
    //
    //
    //       if (isMainComp) {
    //         f.writeln(app.project.item(i).name)
    //
    //         var comp = app.project.item(i)
    //
    //         replaceTextInCompAndExport(comp, fileName, langList[langIndex]);
    //       }
    //     }
    //   }
    //
    //   f.close();
    //
    //   function replaceTextInCompAndExport(comp, fileName, langName) {
    //     var duplicatedComp = comp.duplicate();
    //
    //     var numberOfLayers = duplicatedComp.numLayers;
    //     f.writeln(numberOfLayers)
    //     for (var j = 1; j <= numberOfLayers; j++) {
    //       var sourceText = duplicatedComp.layer(j).sourceText;
    //       if (sourceText != null) {
    //
    //         f.writeln(sourceText)
    //
    //         if (sourceText.numKeys == 0) {
    //           var oldString = sourceText.value.text;
    //
    //           if (dict[oldString]) {
    //             var newString = replaceTextInString(oldString, oldString, dict[oldString][langIndex]);
    //             f.writeln(dict[oldString][langIndex])
    //             if (oldString != newString) {
    //               sourceText.setValue(newString);
    //             }
    //           }
    //         } else {
    //           for (var keyIndex = 1; keyIndex <= sourceText.numKeys; keyIndex++) {
    //             var oldString = sourceText.keyValue(keyIndex).text;
    //
    //             if (dict[oldString]) {
    //               var newString = replaceTextInString(oldString, oldString, dict[oldString][langIndex]);
    //               f.writeln(dict[oldString][langIndex])
    //               if (oldString != newString) {
    //                 sourceText.setValueAtKey(keyIndex,newString);
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //
    //     // var resultFile = new File(fileName + "_" + langList[langIndex])
    //     // var render = renderQueue.items.add(duplicatedComp);
    //     // render.outputModules[1].file = resultFile;
    //     // renderQueue.queueInAME(false);
    //
    //     duplicatedComp.name = "duplicatedComp_" + langName;
    //   }
    //
    //   function replaceTextInString(totalString, findString, replaceString) {
    //     var regularExpression = new RegExp(findString, "g");
    //     var newString = totalString.replace(regularExpression, replaceString);
    //     return newString;
    //   }
    alert("ok")


    var dict = {};
    dict[1] = 5;
    dict[8] = 4;


    f.writeln("ok")
    f.writeln(dict[1])
    f.writeln(dict[2])

    var newDict = {};
    newDict[2] = 5;
    newDict[8] = 5;

    dict = JSON.parse(JSON.stringify(newDict));

    f.writeln(dict[1])
    f.writeln(dict[2])
    f.writeln(dict[8])
  }
  FindAndReplaceText(this);
}
// function exportComp(duplicatedComp, fileName, langName) {
//   var resultFile = new File(fileName + "_" + langList[langIndex])
//   var render = renderQueue.items.add(duplicatedComp);
//   render.outputModules[1].file = resultFile;
//   renderQueue.queueInAME(false);
//
//   duplicatedComp.name = "duplicatedComp_" + langName;
// }

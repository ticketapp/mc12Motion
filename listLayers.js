{
  function FindAndReplaceText(thisObj) {
    var scriptName = "Find and Replace Text";

    var f = new File("log.txt")
    f.encoding = "UTF-8";
    f.open("w");
    app.beginUndoGroup("Replace All");
    for (var i = 1; i <= app.project.numItems; i++) {
      // && (app.project.item(i).name === 'MAIN')
      if (app.project.item(i) instanceof CompItem) {
        var myComp = app.project.item(i);
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

    function onReplaceAll() {
    }

    function replaceTextInString(totalString, findString, replaceString) {
      // Use a regular expression for the replacement.
      // The "g" flag will direct the replace() method to change all instances
      // of the findString instead of just the first.
      var regularExpression = new RegExp(findString,"g");
      var newString = totalString.replace(regularExpression, replaceString);
      return newString;
    }

    // Called when the Find Text string is edited
    function onFindStringChanged()
    {
      myFindString = this.text;
    }

    // Called when the Replacement Text string is edited
    function onReplaceStringChanged()
    {
      myReplaceString = this.text;
    }

    //=============================================================================================================
    //UI
    //=============================================================================================================
    // Called when the "?" button is clicked
    function onShowHelp()
    {
      alert(scriptName + ":help", scriptName);
    }

    if (parseFloat(app.version) < 8)
    {
      alert("This script requires After Effects CS3 or later.", scriptName);
      return;
    }
    else
    {
      // Create and show a floating palette
      var my_palette = (thisObj instanceof Panel) ? thisObj : new Window("palette", scriptName, undefined, {resizeable:true});
      if (my_palette != null)
      {
        var res =
        "group { \
          orientation:'column', alignment:['fill','fill'], alignChildren:['left','top'], spacing:5, margins:[0,0,0,0], \
          findRow: Group { \
            alignment:['fill','top'], \
            findStr: StaticText { text:'Find Text:', alignment:['left','center'] }, \
            findEditText: EditText { text:'', characters:20, alignment:['fill','center'] }, \
          }, \
          replaceRow: Group { \
            alignment:['fill','top'], \
            replaceStr: StaticText { text:'Replacement Text:', alignment:['left','center'] }, \
            replaceEditText: EditText { text:'', characters:20, alignment:['fill','center'] }, \
          }, \
          cmds: Group { \
            alignment:['fill','top'], \
            findButton: Button { text:'Find All', alignment:['fill','center'] }, \
            replaceButton: Button { text:'Replace All', alignment:['fill','center'] }, \
            helpButton: Button { text:'?', alignment:['right','center'], preferredSize:[25,20] }, \
          }, \
        }";

        my_palette.margins = [10,10,10,10];
        my_palette.grp = my_palette.add(res);

        // Workaround to ensure the editext text color is black, even at darker UI brightness levels
        var winGfx = my_palette.graphics;
        var darkColorBrush = winGfx.newPen(winGfx.BrushType.SOLID_COLOR, [0,0,0], 1);
        my_palette.grp.findRow.findEditText.graphics.foregroundColor = darkColorBrush;
        my_palette.grp.replaceRow.replaceEditText.graphics.foregroundColor = darkColorBrush;

        my_palette.grp.findRow.findStr.preferredSize.width = my_palette.grp.replaceRow.replaceStr.preferredSize.width;

        my_palette.grp.findRow.findEditText.onChange = my_palette.grp.findRow.findEditText.onChanging = onFindStringChanged;
        my_palette.grp.replaceRow.replaceEditText.onChange = my_palette.grp.replaceRow.replaceEditText.onChanging = onReplaceStringChanged;

        my_palette.grp.cmds.replaceButton.onClick = onReplaceAll;
        my_palette.grp.cmds.helpButton.onClick    = onShowHelp;

        my_palette.onResizing = my_palette.onResize = function () {this.layout.resize();}

        if (my_palette instanceof Window) {
          my_palette.center();
          my_palette.show();
        } else {
          my_palette.layout.layout(true);
          my_palette.layout.resize();
        }
      }
      else {
        alert("Could not open the user interface.", scriptName);
      }
    }
  }


  FindAndReplaceText(this);
}

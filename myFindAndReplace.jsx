/*

Devis :
UI : 1j
Select all comp: 1j
Extract : 1j
explications/retours : 1/2j

+ ajouter durée/difficulté/je sais plus quoi

http://www.arturobracero.com/2018/05/05/how-to-import-json-files-in-after-effects-cc-2018-to-display-twitter-data/
===========================================================
https://stackoverflow.com/questions/26285164/get-read-text-file-from-url-javascript-for-after-effects
===========================================================
myPath = "/c/badpath/txt.txt";

try{

  $.evalFile (myPath);

}catch(err){

  "Not found."

}
*/

String.prototype.trim = function () {
    return this.replace(/^\s+/,'').replace(/\s+$/,'');
}

{
	function FindAndReplaceText(thisObj)
	{
		var scriptName = "Find and Replace Text";
		var myFindString    = "";
		var myReplaceString = "";

		// This function is used  during the Find All process.
		// It deselects the layer if it is not a text layer or if it does not
		// contain the Find Text string.
		function deselectLayerIfFindStringNotFound(theLayer, findString)
		{
			// foundIt is initialized to false. It is set to true only if the Find Text string is
			// contained in the Source Text (sourceText) property, as determined by the
			// test in the nested if/else block below.
			var foundIt = false;

			// Get the Source Text property, if there is one.
			var sourceText = theLayer.sourceText;
			// Test to see if the Find Text value is contained in the Source Text property.
			if (sourceText != null) {
				if (sourceText.numKeys == 0) {
					// textValue is a TextDocument. Check the string inside.
					if (sourceText.value.text.indexOf(findString) != -1) {
						foundIt = true;
					}
				} else {
					// Do the test for each keyframe:
					for (var keyIndex = 1; keyIndex <= sourceText.numKeys; keyIndex++) {
						// textValue is a TextDocument. Check the string inside.
						var oldString = sourceText.keyValue(keyIndex).text;
						if (sourceText.keyValue(keyIndex).text.indexOf(findString) != -1) {
							foundIt = true;
							break;
						}
					}
				}
			}
			// Deselect the layer if foundIt was not set to true in the tests of the Source Text property.
			if (foundIt == false) {
				theLayer.selected = false;
			}
		}

		// This function takes totalString and replaces all instances of
		// findString with replaceString.
		// Returns the changed string.
		function replaceTextInString(totalString, findString, replaceString)
		{
			// Use a regular expression for the replacement.
			// The "g" flag will direct the replace() method to change all instances
			// of the findString instead of just the first.
			var regularExpression = new RegExp(findString,"g");
			var newString = totalString.replace(regularExpression, replaceString);
			return newString;
		}

		// This function replaces findString with replaceString in the layer's
		// sourceText property.
		// The method changes all keyframes, if there are keyframes, or just
		// the value, if there are not keyframes.
		function replaceTextInLayer(theLayer, findString, replaceString)
		{
			var changedSomething = false;

			// Get the sourceText property, if there is one.
			var sourceText = theLayer.sourceText;
			if (sourceText != null) {
				if (sourceText.numKeys == 0) {
					// textValue is a TextDocument. Retrieve the string inside
					var oldString = sourceText.value.text;
					if (oldString.indexOf(findString) != -1) {
						var newString = replaceTextInString(oldString, findString, replaceString);
						if (oldString != newString) {
							sourceText.setValue(newString);
							changedSomething = true;
						}
					}
				} else {
					// Do it for each keyframe:
					for (var keyIndex = 1; keyIndex <= sourceText.numKeys; keyIndex++) {
						// textValue is a TextDocument. Retrieve the string inside
						var oldString = sourceText.keyValue(keyIndex).text;
						if (oldString.indexOf(findString) != -1) {
							var newString = replaceTextInString(oldString, findString, replaceString);
							if (oldString != newString) {
								sourceText.setValueAtKey(keyIndex,newString);
								changedSomething = true;
							}
						}
					}
				}
			}
			// Return a boolean saying whether we replaced the text
			return changedSomething;
		}

		function onReplaceAll()
		{
			app.beginUndoGroup("Replace All");
			var activeItem = app.project.activeItem;
			if (activeItem != null && (activeItem instanceof CompItem)){
				var activeComp = activeItem;
                var numberOfLayers = activeComp.numLayers
              var myFile = File.openDialog("Please select input text file.");
              if (myFile != null){

                var langCase = 0;

                switch (myFindString) {
                    case "fr":
                        langCase = 1;
                        break;
                    case "en":
                        langCase = 5;
                        break;
                    case "es":
                        langCase = 9;
                        break;
                    case "de":
                        langCase = 13;
                        break;
                    case "it":
                        langCase = 17;
                        break;
                    default:
                        alert("unknown language")
                        return
                }

                var fileOK = myFile.open("r");
                  if (fileOK){

                    // read text lines and create text layer for each
                    // until end-of-file is reached
                    var line;
                    var words;

                    var j = 0;

                    alert(langCase)

                    while (!myFile.eof && j < 5000){
                      j = j+1;
                      line = myFile.readln();
                      words = line.split(",");

//
                    /*  if (words[langCase].trim() == "Changer le filtre à gasoil") {
                        alert(words[langCase]);
                      } else {
                        alert('a'+words[langCase]+'z');
                      }*/
//1 = french
				for (var i = 1; i <= numberOfLayers; i++) {
					replaceTextInLayer(activeComp.layer(i), words[1].trim() , words[langCase].trim())
				}

                    }

                    myFile.close();

                  }else{
                    alert("File open failed!");
                  }

                }else{
                  alert("No text file selected.");
                }
			}

			app.endUndoGroup();
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

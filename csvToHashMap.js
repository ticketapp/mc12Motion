{
  function FindAndReplaceText(thisObj) {
    var scriptName = "Haaaaaaaaaaash";

    var f = new File("log.txt")
    f.encoding = "UTF-8";
    f.open("w");

    var myFile = File("motion.csv");
    var fileOK = myFile.open("r");
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
          f.writeln(onlyGoodWords[0])
          dict[onlyGoodWords[0]] = onlyGoodWords.slice(1);
        } else if(onlyGoodWords.length != 5)  {
          alert(onlyGoodWords)
        }
      }
    }

    myFile.close();
    f.close();
  }

  FindAndReplaceText(this);
}

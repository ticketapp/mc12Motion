{
  function FindAndReplaceText(thisObj) {
    var scriptName = "Haaaaaaaaaaash";

    var f = new File("log.txt")
    f.encoding = "UTF-8";
    f.open("w");

    var myFile = File("tools.csv");
    var fileOK = myFile.open("r");
    var dict = {};

    if (fileOK) {

      var line;
      var words;

      while (!myFile.eof) {
        line = myFile.readln();
        words = line.split(",");

        var toolPattern = /^(T\d)/;
        var toolPattern2 = /^(IT\d)/;
        var numberPattern = /^\s*\d\s*$/;

        var onlyGoodWords = words
        .filter(function (el) { return el !== "" })
        .filter(function (el) { return !toolPattern.test(el) })
        .filter(function (el) { return !toolPattern2.test(el) })
        .filter(function (el) { return !numberPattern.test(el) })

        // alert(onlyGoodWords)
        // alert(onlyGoodWords.length)

        if(onlyGoodWords && onlyGoodWords.length == 5 && !dict[onlyGoodWords[0]]) {
          // if (onlyGoodWords.length < 3) {
            // alert(onlyGoodWords.slice(1))
          // }
          f.write("dict[\"" + onlyGoodWords[0] + "\"] = [\"")
          f.write(onlyGoodWords.slice(1).join('", "'))
          f.writeln("\"]")
          dict[onlyGoodWords[0]] = onlyGoodWords.slice(1);
        } else if(onlyGoodWords.length != 5)  {
          // alert(onlyGoodWords)
        }
      }
    }

    myFile.close();
    f.close();
  }

  FindAndReplaceText(this);
}

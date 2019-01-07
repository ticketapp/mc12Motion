{
  function FindAndReplaceText(thisObj) {
    var scriptName = "Queueeeeeeeee";
// prefixer de la langue et laisser rentrer le nom du fichier à la main
    var f = new File("log.txt")
    f.encoding = "UTF-8";
    f.open("w");
    // app.project.renderQueue.canQueueInAME --> false is there is nothing to render in AE
    // app.project.renderQueue.queueInAME(false); --> false = no render, true = render immedialty in AME

    if (app.project.renderQueue.canQueueInAME == true) {
      // Send queued items to AME, but do not start rendering.
      app.project.renderQueue.queueInAME(false);
    }
    else {
      // alert("There are no queued item in the Render Queue. Number of items: " + app.project.numItems);
      var resultFile = new File("outputVideoName")
      var renderQueue = app.project.renderQueue;
      var render = renderQueue.items.add(comp);
      render.outputModules[1].file = resultFile;
    }

    f.close();
  }

  FindAndReplaceText(this);
}

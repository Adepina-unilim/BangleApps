var fileNumber = 0;
var MAXLOGS = 9;

function getFileName(n) {
  return "accellog."+n+".csv";
}

function showMenu() {
  var menu = {
    "" : { title : /*LANG*/"Adepina" },
    "< Retour" : function() {
      load();
    },
    /*LANG*/"Fichier Num" : {
      value : fileNumber,
      min : 0,
      max : MAXLOGS,
      onchange : v => { fileNumber=v; }
    },
    /*LANG*/"Commencer" : function() {
      E.showMenu();
      startRecord();
    },
    /*LANG*/"Voir les données" : function() {
      viewLogs();
    },
  };
  E.showMenu(menu);
}

function viewLog(n) {
  E.showMessage(/*LANG*/"Loading...");
  var f = require("Storage").open(getFileName(n), "r");
  var records = 0, l = "", ll="";
  while ((l=f.readLine())!==undefined) {records++;ll=l;}
  var length = 0;
  if (ll) length = Math.round( (ll.split(",")[0]|0)/1000 );

  var menu = {
    "" : { title : "Log "+n },
    "< Retour" : () => { viewLogs(); }
  };
  menu[records+/*LANG*/" Valeurs"] = "";
  menu[length+/*LANG*/" Secondes"] = "";
  menu[/*LANG*/"DELETE"] = function() {
    E.showPrompt(/*LANG*/"Supprimer les données "+n).then(ok=>{
      if (ok) {
        E.showMessage(/*LANG*/"Suppression...");
        f.erase();
        viewLogs();
      } else viewLog(n);
    });
  };


  E.showMenu(menu);
}

function viewLogs() {
  var menu = {
    "" : { title : /*LANG*/"Logs" },
    "< Retour" : () => { showMenu(); }
  };

  var hadLogs = false;
  for (var i=0;i<=MAXLOGS;i++) {
    var f = require("Storage").open(getFileName(i), "r");
    if (f.readLine()!==undefined) {
      (function(i) {
        menu[/*LANG*/"Log "+i] = () => viewLog(i);
      })(i);
      hadLogs = true;
    }
  }
  if (!hadLogs)
    menu[/*LANG*/"Pas de données trouvées"] = function(){};
  E.showMenu(menu);
}

function startRecord(force) {
  if (!force) {
    // check for existing file
    var f = require("Storage").open(getFileName(fileNumber), "r");
    if (f.readLine()!==undefined)
      return E.showPrompt(/*LANG*/"Écraser Log "+fileNumber+"?").then(ok=>{
        if (ok) startRecord(true); else showMenu();
      });
  }
  // display
  g.clear(1);
  Bangle.drawWidgets();

  var Layout = require("Layout");
  var layout = new Layout({ type: "v", c: [
      {type:"txt", font:"6x8", label:/*LANG*/"Valeurs", pad:2},
      {type:"txt", id:"samples", font:"6x8:2", label:"  -  ", pad:5, bgCol:g.theme.bg},
      {type:"txt", font:"6x8", label:/*LANG*/"Temps", pad:2},
      {type:"txt", id:"time", font:"6x8:2", label:"  -  ", pad:5, bgCol:g.theme.bg},
      {type:"txt", font:"6x8:2", label:/*LANG*/"ENREGISTREMENT", bgCol:"#f00", pad:5, fillx:1},
    ]
  },{btns:[ // Buttons...
    {label:/*LANG*/"STOP", cb:()=>{
      Bangle.removeListener('accel', accelHandler);
      showMenu();
    }}
  ]});
  layout.render();

  // now start writing
  var f = require("Storage").open(getFileName(fileNumber), "w");
  f.write("Chrono,Ax,Ay,Az,Mx,My,Mz,Pas\n");
  var start = getTime();
  var sampleCount = 0;

  function accelHandler(accel) {
	Bangle.setCompassPower(1);
    var comp = Bangle.getCompass();
    var pas = Bangle.getStepCount();
    var t = getTime()-start;
    f.write([
      t*1000,
      accel.x,
      accel.y,
      accel.z,
      comp.x,
      comp.y,
      comp.z,
      pas   ].map(n=>Math.round(n*100000000)/100000000).join(",")+"\n");

    sampleCount++;
    layout.samples.label = sampleCount;
    layout.time.label = Math.round(t)+"s";
    layout.render(layout.samples);
    layout.render(layout.time);
  }

  Bangle.setPollInterval(80); // 12.5 Hz - the default
  Bangle.on('accel', accelHandler);
}


Bangle.loadWidgets();
Bangle.drawWidgets();
showMenu();

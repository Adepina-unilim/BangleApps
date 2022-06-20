
function showMenu() {
  var menu = {
    "" : { title : /*LANG*/"Test du lever de chaise" },
    "< Retour" : function() {
      load();
    },

    /*LANG*/"Commencer" : function() {
      E.showMenu();
      startRecord();
    },
  };
  E.showMenu(menu);
}


  E.showMenu(menu);
}


function startRecord(force) {
  if (!force) {
    startRecord(true);
      });
  }
  // display
  g.clear(1);
  Bangle.drawWidgets();

if (t<30){

  var Layout = require("Layout");
  var layout = new Layout({ type: "v", c: [
      {type:"txt", font:"6x8", label:/*LANG*/"Valeurs", pad:2},
      {type:"txt", id:"samples", font:"6x8:2", label:"  -  ", pad:5, bgCol:g.theme.bg},
      {type:"txt", font:"6x8", label:/*LANG*/"Time", pad:2},
      {type:"txt", id:"time", font:"6x8:2", label:"  -  ", pad:5, bgCol:g.theme.bg},
      {type:"txt", font:"6x8:2", label:/*LANG*/"ENREGISTREMENT", bgCol:"#f00", pad:5, fillx:1},
    ]
  },{btns:[ // Buttons...
    {label:/*LANG*/"STOP", cb:()=>{
      Bangle.removeListener('accel', accelHandler);
      showResult();
    }}}
if (t>=30){
Bangle.removeListener('accel', accelHandler);
showResult();}

  ]});
  layout.render();

  // now start writing
  var f = require("Storage").open(getFileName(fileNumber), "w");
  f.write("Time (ms),AX,AY,AZ,MX,MY,MZ\n");
  start = getTime();
  var sampleCount = 0;

  function accelHandler(accel) {
	tabx = [];
	taby = [];
	tabz = [];
    	t = getTime()-start;

	tabx.push(accel.x)
	taby.push(accel.y)
	tabz.push(accel.z)

    sampleCount++;
    layout.samples.label = sampleCount;
    layout.time.label = Math.round(t)+"s";
    layout.render(layout.samples);
    layout.render(layout.time);
  }

function calculNbre() {

//filtrage des données

var axf = filtrage(Ax);
var ayf = filtrage(Ay);
var azf = filtrage(Az);


//calcul nbre de lever de chaise

var M = 25; //Mediane glissante toutes les deux secondes
var med = 0;
var sup = false;
var compteur = 0;

for (let i = 4; i < axf.length; i++) {

	if (i < M+1)
	{
	med = numMedian(axf);
	} 

	else 
	{
	var tab = axf.slice(i-M, i);
	med = numMedian(tab);
	}


	if (sup == false) 
	{
		if (axf[i]>med)
		{
			sup = true;
			compteur = compteur +1;
		}
	}


	if (sup == true) 
	{
		if (axf[I]<med)
		{
			sup = false;
			compteur = compteur +1;
		}
	}

return compteur/2;		


}


}



function filtrage(valeurs)
{

var B1 = 0.001832160233696078;
var B2 = 0.007328640934784310;
var B3 = 0.001099296140218;
var B4 = 0.007328640934784310;
var B5 = 0.001832160233696078;

var A1 = 1;
var A2 = 3.344067837711877;
var A3 = 4.238863950884072;
var A4 = 2.409342856586324;
var A5 = 0.517478199788042; 

sortie[0] = B1 * valeurs[0];

sortie[1] = B1 * valeurs[1] + B2 * valeurs[0] - A2 * sortie[0];

sortie[2] = B1 * valeurs[2] + B2 * valeurs[1] + B3 * valeurs[0] - A2 * sortie[1] - A3 * sortie[0];

sortie[3] = B1 * valeurs[3] + B2 * valeurs[2] + B3 * valeurs[1] + B4 * valeurs [0] - A2 * sortie[2] - A3 * sortie[1] - A4 * sortie[0];

for (let i = 4; i < valeurs.length; i++) {
  sortie[i] = B1 * valeurs[i] + B2 * valeurs[i-1] + B3 * valeurs[i-2] + B4 * valeurs [i-3] +  B5 * valeurs [i-4] - A2 * sortie[i-1] - A3 * sortie[i-2] - A4 * sortie[i-3] - A5 * sortie[i-4];
}

return sortie;

}

function showResult()
{
	g.reset().clearRect(Bangle.appRect);
	g.setFont("12x20").setFontAllign(0,0);
	g.drawString("Nombre de pas");
	g.setFont("Vector:40");
	g.drawString(calculNbre());

}


  Bangle.setPollInterval(80); // 12.5 Hz - the default
  Bangle.on('accel', accelHandler);
}


Bangle.loadWidgets();
Bangle.drawWidgets();
showMenu();
/*********DESARROLLO*************

Para iniciar la compilación abrir "Node.js command prompt"
cd Desktop
node batalla.js
*/
/********************************
25/05/2016 - Miguel Ascaso Nerín - ascasomiguel92@hotmail.com
Optimizador de flota Ogame
Este script predice cual es la cantidad exacta de tus naves que tienes que mandar, en el juego de navegador OGame, para obtener el máximo beneficio.
Se basa en algoritmos evolutivos por lo que la completa exactitud no está garantizada y es posible que ni siquiera converja. 
La precisión y rapidez del algoritmo está basada en todo caso en el número de naves que se envíen así como en la cantidad de tipos de naves distintos.
*********************************/



/******************IMPORTATE*******************
***********************************************
CATÁLOGO DE NAVES (siguiendo orden de disparo)

1 - Nave Pequeña de Carga
2 - Nave Grande de Carga
3 - Cazador Ligero
4 - Cazador Pesado
5 - Crucero
6 - Nave de Batalla
7 - Colonizador
8 - Reciclador
9 - Sonda de Espionaje
10- Bombardero
11- Satélite Solar
12- Destructor
13- Estrella de la Muerte
14- Acorazado
15- Lanzamisiles
16- Laser Pequeño
17- Laser Grande
18- Cañón Gauss
19- Cañón Iónico
20- Cañón de Plasma
21- Cúpula Pequeña de Protección
22- Cúpula Grande de Protección
***********************************************
***********************************************/




/**********************************************
***********************************************
***********************************************
***********************************************
******* DATOS GENERALES Y DEFINICIONES ********
***********************************************
***********************************************
***********************************************
***********************************************/
//MATRIZ DE FUEGO RÁPIDO
var i;
var MatrizFuegoRapido = new Array(23);
for (i = 1; i <= 22; i++)
{    // Create the columns in the table
    MatrizFuegoRapido[i] = [,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}	
MatrizFuegoRapido[1][9]=5, MatrizFuegoRapido[1][11]=5;
MatrizFuegoRapido[2][9]=5, MatrizFuegoRapido[2][11]=5;
MatrizFuegoRapido[3][9]=5, MatrizFuegoRapido[3][11]=5;
MatrizFuegoRapido[4][9]=5, MatrizFuegoRapido[4][11]=5, MatrizFuegoRapido[4][1]=3;
MatrizFuegoRapido[5][9]=5, MatrizFuegoRapido[5][11]=5, MatrizFuegoRapido[5][3]=6, MatrizFuegoRapido[5][15]=10;
MatrizFuegoRapido[6][9]=5, MatrizFuegoRapido[6][11]=5;
MatrizFuegoRapido[7][9]=5, MatrizFuegoRapido[7][11]=5;
MatrizFuegoRapido[8][9]=5, MatrizFuegoRapido[8][11]=5;
MatrizFuegoRapido[10][9]=5, MatrizFuegoRapido[10][11]=5, MatrizFuegoRapido[10][15]=20, MatrizFuegoRapido[10][16]=20, MatrizFuegoRapido[10][17]=10, MatrizFuegoRapido[10][19]=10;
MatrizFuegoRapido[12][9]=5, MatrizFuegoRapido[12][11]=5, MatrizFuegoRapido[12][16]=10, MatrizFuegoRapido[12][14]=2;
MatrizFuegoRapido[13][1]=250, MatrizFuegoRapido[13][2]=250, MatrizFuegoRapido[13][3]=200, MatrizFuegoRapido[13][4]=100, MatrizFuegoRapido[13][5]=33, MatrizFuegoRapido[13][6]=30, MatrizFuegoRapido[13][7]=250, MatrizFuegoRapido[13][8]=250, MatrizFuegoRapido[13][9]=1250, MatrizFuegoRapido[13][10]=25, MatrizFuegoRapido[13][11]=1250, MatrizFuegoRapido[13][12]=5, MatrizFuegoRapido[13][14]=15, MatrizFuegoRapido[13][15]=200, MatrizFuegoRapido[13][16]=200, MatrizFuegoRapido[13][17]=100, MatrizFuegoRapido[13][18]=50, MatrizFuegoRapido[13][19]=100;
MatrizFuegoRapido[14][9]=5, MatrizFuegoRapido[14][11]=5, MatrizFuegoRapido[14][1]=3, MatrizFuegoRapido[14][2]=3, MatrizFuegoRapido[14][4]=4, MatrizFuegoRapido[14][5]=4, MatrizFuegoRapido[14][6]=7;


//COSTE DE NAVES
var MatrizCosteNaves = new Array(23);
for (i = 1; i <= 22; i++)
{    // Create the columns in the table
    MatrizCosteNaves[i] = [0,0,0];
}
MatrizCosteNaves[1][0]=2000, MatrizCosteNaves[1][1]=2000, MatrizCosteNaves[1][2]=0;
MatrizCosteNaves[2][0]=6000, MatrizCosteNaves[2][1]=6000, MatrizCosteNaves[2][2]=0;
MatrizCosteNaves[3][0]=3000, MatrizCosteNaves[3][1]=1000, MatrizCosteNaves[3][2]=0;
MatrizCosteNaves[4][0]=6000, MatrizCosteNaves[4][1]=4000, MatrizCosteNaves[4][2]=0;
MatrizCosteNaves[5][0]=20000, MatrizCosteNaves[5][1]=7000, MatrizCosteNaves[5][2]=2000;
MatrizCosteNaves[6][0]=45000, MatrizCosteNaves[6][1]=15000, MatrizCosteNaves[6][2]=0;
MatrizCosteNaves[7][0]=10000, MatrizCosteNaves[7][1]=20000, MatrizCosteNaves[7][2]=10000;
MatrizCosteNaves[8][0]=10000, MatrizCosteNaves[8][1]=6000, MatrizCosteNaves[8][2]=2000;
MatrizCosteNaves[9][0]=0, MatrizCosteNaves[9][1]=1000, MatrizCosteNaves[9][2]=0;
MatrizCosteNaves[10][0]=50000, MatrizCosteNaves[10][1]=25000, MatrizCosteNaves[10][2]=15000;
MatrizCosteNaves[11][0]=0, MatrizCosteNaves[11][1]=2000, MatrizCosteNaves[11][2]=500;
MatrizCosteNaves[12][0]=60000, MatrizCosteNaves[12][1]=50000, MatrizCosteNaves[12][2]=15000;
MatrizCosteNaves[13][0]=5000000, MatrizCosteNaves[13][1]=4000000, MatrizCosteNaves[13][2]=1000000;
MatrizCosteNaves[14][0]=30000, MatrizCosteNaves[14][1]=40000, MatrizCosteNaves[14][2]=15000;
MatrizCosteNaves[15][0]=2000, MatrizCosteNaves[15][1]=0, MatrizCosteNaves[15][2]=0;
MatrizCosteNaves[16][0]=1500, MatrizCosteNaves[16][1]=500, MatrizCosteNaves[16][2]=0;
MatrizCosteNaves[17][0]=6000, MatrizCosteNaves[17][1]=2000, MatrizCosteNaves[17][2]=0;
MatrizCosteNaves[18][0]=20000, MatrizCosteNaves[18][1]=15000, MatrizCosteNaves[18][2]=2000;
MatrizCosteNaves[19][0]=2000, MatrizCosteNaves[19][1]=6000, MatrizCosteNaves[19][2]=0;
MatrizCosteNaves[20][0]=50000, MatrizCosteNaves[20][1]=50000, MatrizCosteNaves[20][2]=30000;
MatrizCosteNaves[21][0]=10000, MatrizCosteNaves[21][1]=10000, MatrizCosteNaves[21][2]=0;
MatrizCosteNaves[22][0]=50000, MatrizCosteNaves[22][1]=50000, MatrizCosteNaves[22][2]=0;



//ATAQUE, ESCUDO, CAPACIDAD, VELOCIDAD, Y CONSUMO BÁSICOS
var valorBaseEscudo=[,10,25,10,25,50,200,100,10,0,500,1,500,50000,400,20,25,100,200,500,300,2000,10000]
var valorBaseAtaque=[,5,5,50,150,400,1000,50,1,0,1000,1,2000,200000,700,80,100,250,1100,150,3000,1,1]
var valorBaseVelocidad=[,10000,7500,12500,10000,15000,10000,2500,2000,1e6,5000,0,5000,100,10000,0,0,0,0,0,0,0,0]
var valorBaseCapacidad=[,5000,25000,50,100,800,1500,7500,20000,0,500,0,2000,1000000,750,0,0,0,0,0,0,0,0]
var valorBaseConsumo=[,20,50,20,75,300,500,1000,300,1,1000,0,1000,1,250,0,0,0,0,0,0,0,0]



/**********************************************
***********************************************
***********************************************
***********************************************
**** DATOS DE ENTRADA Y PRIMEROS CALCULOS *****
***********************************************
***********************************************
***********************************************
***********************************************/

//TECNOLOGÍAS
var tecMilitarAtacante=16,tecDefensaAtacante=15,tecBlindajeAtacante=18;
var tecMilitarDefensor=16,tecDefensaDefensor=15,tecBlindajeDefensor=16;
var tecMotorCombustion=15, tecMotorImpulso=11,tecMotorHiperespacial=9;

//RATIOS PARA CALCULAR BENEFICIOS
var ratioCristal=2,ratioMetal=3;
var ratioEscombros=0.3;
var porcentajeRobo=50;

//COORDENADAS DE ORIGEN Y DESTINO, DISTANCIA Y FACTOR DE VELOCIDAD
var galaxiaOrigen=1;
var sistemaOrigen=401;
var posicionOrigen=5;
var galaxiaDestino=1;
var sistemaDestino=406;
var posicionDestino=4;
var factorVelocidad=1;
var distanciaRecorrida=0;
var universoCircular=true;

//CALCULO DE DISTANCIAS
if(universoCircular=false){
	if(galaxiaDestino==galaxiaOrigen){
		if(sistemaDestino==sistemaOrigen){
			if(posicionDestino==posicionOrigen){
				distanciaRecorrida=5;
			} else {
				distanciaRecorrida=1e3+5*(Math.max(posicionDestino,posicionOrigen)-Math.min(posicionDestino,posicionOrigen));
			}
		} else {
			distanciaRecorrida=27e2+95*(Math.max(sistemaDestino,sistemaOrigen)-Math.min(sistemaDestino,sistemaOrigen));
		}
	} else {
		distanciaRecorrida=2e4*(Math.max(galaxiaOrigen,galaxiaDestino)-Math.min(galaxiaOrigen,galaxiaDestino));
	}
} else {
	if(galaxiaDestino==galaxiaOrigen){
		if(sistemaDestino==sistemaOrigen){
			if(posicionDestino==posicionOrigen){
				distanciaRecorrida=5;
			} else {
				distanciaRecorrida=1e3+5*(Math.max(posicionDestino,posicionOrigen)-Math.min(posicionDestino,posicionOrigen));
			}
		} else {
			distanciaRecorrida=27e2+95*(Math.min(Math.abs(sistemaDestino-sistemaOrigen),Math.abs(sistemaDestino-sistemaOrigen-499)));
		}
	} else {
		distanciaRecorrida=2e4*(Math.min(Math.abs(galaxiaDestino-galaxiaOrigen),Math.abs(galaxiaDestino-galaxiaOrigen-9)));
	}
}

//RECURSOS EN PLANETA DESTINO
var metalDisponible=1138000,cristalDisponible=412000,deuterioDisponible=2708000;




//IMPUT DE LAS NAVES
var numeroMaxNavesAtacante =[,0   ,1000,1000,0   ,0   ,1000,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ];
var numeroNavesDefensor    =[,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,100 ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ];
//                            1    2    3    4    5    6    7    8    9    10   11   12   13   14   15   16   17   18   19   20   21   22
/******************IMPORTATE*******************
***********************************************
CATÁLOGO DE NAVES (siguiendo orden de disparo)

1 - Nave Pequeña de Carga
2 - Nave Grande de Carga
3 - Cazador Ligero
4 - Cazador Pesado
5 - Crucero
6 - Nave de Batalla
7 - Colonizador
8 - Reciclador
9 - Sonda de Espionaje
10- Bombardero
11- Satélite Solar
12- Destructor
13- Estrella de la Muerte
14- Acorazado
15- Lanzamisiles
16- Laser Pequeño
17- Laser Grande
18- Cañón Gauss
19- Cañón Iónico
20- Cañón de Plasma
21- Cúpula Pequeña de Protección
22- Cúpula Grande de Protección
***********************************************
***********************************************/





//CÁLCULO DE POTENCIA EFECTIVA
var escudoNaveAtacante = new Array(23);
var blindajeNaveAtacante = new Array(23);
var ataqueNaveAtacante = new Array(23);
var velocidadNaveAtacante = [,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var escudoNaveDefensor = new Array(23);
var blindajeNaveDefensor = new Array(23);
var ataqueNaveDefensor = new Array(23);
for (i = 1; i <= 22; i++){
	if(tecDefensaAtacante>=1){
		escudoNaveAtacante[i]=valorBaseEscudo[i]*(1+tecDefensaAtacante/10);
	}else {
		escudoNaveAtacante[i]=0;
	}
    blindajeNaveAtacante[i]=(MatrizCosteNaves[i][0]+MatrizCosteNaves[i][1])*(1+tecBlindajeAtacante/10)/10;
	ataqueNaveAtacante[i]=valorBaseAtaque[i]*(1+tecMilitarAtacante/10);
	
	if(tecDefensaDefensor>=1){
		escudoNaveDefensor[i]=valorBaseEscudo[i]*(1+tecDefensaDefensor/10);
	} else {
		escudoNaveDefensor[i]=0;
	}
	blindajeNaveDefensor[i]=(MatrizCosteNaves[i][0]+MatrizCosteNaves[i][1])*(1+tecBlindajeDefensor/10)/10;
	ataqueNaveDefensor[i]=valorBaseAtaque[i]*(1+tecMilitarDefensor/10);
}

//CALCULO DE VELOCIDADES EFECTIVAS
velocidadNaveAtacante[1]=valorBaseVelocidad[1]*(1+tecMotorCombustion/10)
if (tecMotorImpulso>=5){
	velocidadNaveAtacante[1]=valorBaseVelocidad[1]*(1+tecMotorImpulso*0.2)
}
velocidadNaveAtacante[2]=valorBaseVelocidad[2]*(1+tecMotorCombustion/10)
velocidadNaveAtacante[3]=valorBaseVelocidad[3]*(1+tecMotorCombustion/10)
velocidadNaveAtacante[4]=valorBaseVelocidad[4]*(1+tecMotorImpulso*0.2)
velocidadNaveAtacante[5]=valorBaseVelocidad[5]*(1+tecMotorImpulso*0.2)
velocidadNaveAtacante[6]=valorBaseVelocidad[6]*(1+tecMotorHiperespacial*0.3)
velocidadNaveAtacante[7]=valorBaseVelocidad[7]*(1+tecMotorImpulso*0.2)
velocidadNaveAtacante[8]=valorBaseVelocidad[8]*(1+tecMotorCombustion/10)
if (tecMotorImpulso>=17){
	velocidadNaveAtacante[8]=valorBaseVelocidad[8]*(1+tecMotorImpulso*0.2)
}
if (tecMotorHiperespacial>=15){
	velocidadNaveAtacante[8]=valorBaseVelocidad[8]*(1+tecMotorHiperespacial*0.3)
}
velocidadNaveAtacante[9]=valorBaseVelocidad[9]*(1+tecMotorCombustion/10)
velocidadNaveAtacante[10]=valorBaseVelocidad[10]*(1+tecMotorImpulso*0.2)
if (tecMotorHiperespacial>=8){
	velocidadNaveAtacante[10]=valorBaseVelocidad[10]*(1+tecMotorHiperespacial*0.3)
}
velocidadNaveAtacante[12]=valorBaseVelocidad[12]*(1+tecMotorHiperespacial*0.3)
velocidadNaveAtacante[13]=valorBaseVelocidad[13]*(1+tecMotorHiperespacial*0.3)
velocidadNaveAtacante[14]=valorBaseVelocidad[14]*(1+tecMotorHiperespacial*0.3)



//IDENTIFICAR LA CANTIDAD DE ALELOS ACTIVOS, SOLO HAREMOS CALCULOS EN LOS ALELOS ACTIVOS
var tiposNaveActivos=[,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
alelosActivos=0;

for (ni=1;ni<=14;ni++){
	if(numeroMaxNavesAtacante[ni]>0){
		tiposNaveActivos[ni]=true;
		alelosActivos++;
	}
	//console.log("Atafantes tipo "+ni+" estan "+tiposNaveActivos[ni])
}

var ejecucion=1;
var numeroEjecuciones=1000;
var tiempoInicial=0;
var tiempoTrascurrido=0;
var tiemposejecucion="Tiempos;";
var iteracionesejecucion="Iteraciones;";
var puntuacionesejecucion="Puntuaciones;";
var genesejecucion="Genes;";

for(ejecucion=1;ejecucion<=numeroEjecuciones;ejecucion++){
	tiempoInicial=0;
	tiempoTrascurrido=0;
	tiempoInicial=Date.now();
	

	//CONFIGURACIÓN ALGORITMO BIOINSPIRADO
	var numeroIndividuos=20+(alelosActivos*3);
	var numeroHijos=4+(alelosActivos*2); //que sea siempre par
	var memoriaMinimoFitness=8;
	var maxIter=1600000000+(alelosActivos*200);
	var minimoIteraciones=100;
	var probaRecombinacion=0.6,probaIntercambio=0.4,probaMutacion=1/(6*alelosActivos),desviacionTipica=0.2;
	var reinicioCapacidadAdaptativa=10*alelosActivos;
	var coeficienteVariacionPermitido=0.03, numeroAtipicosPermitido=Math.round(numeroIndividuos*10/100);
	var presionSeleccion=2; //siempre un numero entero
	var penalizacionInfactibilidad=10, potenciaPenalizacion=2;
	var precisionResultado=50, iteracionesCalculoVFO=10;
	var coeficienteMejora=0.03;
	var tamanoElite=Math.round(numeroAtipicosPermitido*70/100);
	var numeroIgnorados=Math.round(numeroIndividuos*10/100);



	/**********************************************
	***********************************************
	***********************************************
	***********************************************
	**************** SIMULACIÓN *******************
	***********************************************
	***********************************************
	***********************************************
	***********************************************/


	var escombrosMetal=0,escombrosCristal=0;
	var perdidasMetal=0,perdidasCristal=0,perdidasDeuterio=0;
	var numeroNavesDestruidasAtacante=[,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var numeroNavesDestruidasDefensor=[,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var roboMetal=0,roboCristal=0,roboDeuterio=0;
	var rondasDuracion=0;
	var puntuacion=0;
	var ganadorAtacante=false;
	var capacidadCargaInicial=0;
	var capacidadCargaFinal=0;
	var segundosVuelo=0;
	var gastoCombustible=0;
	var numeroNavesAtacante=[];
	//VARIABLES ALGORITMO BIOINSPIRADO AUXILIARES
	var individuo = [];
	var padre = [];
	var hijo = [];
	var ni,m,v,z;
	var finAlgoritmo=false;
	var probaSeleccion = new Array(numeroIndividuos);
	var probaSeleccionAcumulada = new Array(numeroIndividuos);
	var sumaFO=0,mFO;
	var aleatorio=0;
	var minimoFuncionObjetivo=[];
	var maximoFuncionObjetivo=[];
	var mediaFuncionObjetivo=[];
	var factorDesviacionTipica=1;
	var mediaAlelos=[,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var individuoFinal;
	var mediaFOanterior=0;
	var elite=0, indElite= new Array(tamanoElite), seleccionado=false;
	var alfaBlend=0.5, fi=0;
	var vectorVFO=[];
	var puntoCorte=0;
	var numeroIgnoradosReal=0;



	//GENERAMOS ALEATORIAMENTE LA PRIMERA GENERACIÓN
	//SE OBLIGA A TENER LA SOLUCIÓN MÁXIMA Y LA MÍNIMA
	individuo.push(new clsIndividuo([,0,0,0,0,0,0,0,0,0,0,0,0,0,0]));
	individuo.push(new clsIndividuo(numeroMaxNavesAtacante));
	for (ni=2;ni<numeroIndividuos;ni++){
		for (m=1;m<=14;m++){
			if(tiposNaveActivos[m]==true){
				numeroNavesAtacante[m]=Math.ceil(Math.random() * (numeroMaxNavesAtacante[m]-1));
			} else {
				numeroNavesAtacante[m]=0;
			}
		}
		individuo.push(new clsIndividuo(numeroNavesAtacante));
	}



	//EVALUAMOS LA PRIMERA GENERACIÓN
	minimoFuncionObjetivo[0]=Infinity;
	maximoFuncionObjetivo[0]=-Infinity;
	for(ni=0;ni<numeroIndividuos;ni++){
		individuo[ni].valorFuncionObjetivo=funcionObjetivo(individuo[ni].alelo);
		
		for(var z=0; z<iteracionesCalculoVFO-1;z++){
			individuo[ni].valorFuncionObjetivo+=funcionObjetivo(individuo[ni].alelo);
		}
		individuo[ni].valorFuncionObjetivo=individuo[ni].valorFuncionObjetivo/iteracionesCalculoVFO;
		if(minimoFuncionObjetivo[0]>individuo[ni].valorFuncionObjetivo){
			minimoFuncionObjetivo[0]=individuo[ni].valorFuncionObjetivo;
		}
		if(maximoFuncionObjetivo[0]<individuo[ni].valorFuncionObjetivo){
			maximoFuncionObjetivo[0]=individuo[ni].valorFuncionObjetivo;
		}
		//console.log("VFO: ",individuo[ni].valorFuncionObjetivo );
	}

	//SELECCIONAMOS EL MÍNIMO FITNESS
	mFO=minimoFuncionObjetivo[0];


	//ALGORITMO GENETICO
	ni=0;
	while (ni<maxIter && (finAlgoritmo==false)){
		
		//VERIFICAMOS PERIODICAMENTE EL PROGRESO DEL ALGORITMO
		if(ni%reinicioCapacidadAdaptativa==0){
			if(ni>minimoIteraciones){
				
				//INDIVIDUOS IGNORADOS
				for (v=0;v<individuo.length;v++){
					vectorVFO[v]=individuo[v].valorFuncionObjetivo;
				}
				vectorVFO.sort(function(a, b){return a - b});
				for (z=0;z<individuo.length;z++){
					//console.log("vector puntos de corte ",z," ",vectorVFO[z]);
				}
				//console.log("vector VFO= ",vectorVFO);
				puntoCorte=vectorVFO[Math.max( numeroIgnorados,0)]-0.00000001;
				//console.log("Punto de corte: ", puntoCorte);
				
				numeroIgnoradosReal=0;
				for (v=0;v<individuo.length;v++){
					if(individuo[v].valorFuncionObjetivo<=puntoCorte){
						numeroIgnoradosReal++;
					}
				}
				
				//CONDICIÓN DE FINALIZACIÓN
				mediaAlelos=[,0,0,0,0,0,0,0,0,0,0,0,0,0,0];		
				for(v=0;v<individuo.length;v++){
					if(individuo[v].valorFuncionObjetivo>puntoCorte){
						for(z=1;z<=14;z++){
							if(tiposNaveActivos[z]==true){
								mediaAlelos[z]+=individuo[v].alelo[z];
							}
						}
					}
				}
								
				for(z=1;z<=14;z++){
					if(tiposNaveActivos[z]==true){
						mediaAlelos[z]=mediaAlelos[z]/(numeroIndividuos-(numeroIgnoradosReal));
					}
				}
				
				listaAtipicos=[];
				for(v=0;v<individuo.length;v++){
					if(individuo[v].valorFuncionObjetivo>puntoCorte){
						for(z=1;z<=14;z++){
							if(tiposNaveActivos[z]==true && Math.abs(mediaAlelos[z]-individuo[v].alelo[z])>numeroMaxNavesAtacante[z]*coeficienteVariacionPermitido){
								listaAtipicos.push(v);
								//console.log("ATIPICO! ",v);
								break;
							}
						}
					}
				}
				
				
				console.log("Med: "+mediaFuncionObjetivo[(ni)%memoriaMinimoFitness]+"     Min: "+minimoFuncionObjetivo[(ni)%memoriaMinimoFitness]+" Max: "+maximoFuncionObjetivo[(ni)%memoriaMinimoFitness]);
				
				//console.log("Nº atipicos: ", numeroAtipicosPermitido,"Atipicos en lista: ",listaAtipicos.length);
				//console.log("Atipicos: ",listaAtipicos);
				
				if(listaAtipicos.length<=numeroAtipicosPermitido && mediaFOanterior*(1+coeficienteMejora)>mediaFuncionObjetivo[(ni)%memoriaMinimoFitness]){
					finAlgoritmo=true;
					console.log("Fin");
				}
				
			}
			mediaFOanterior= mediaFuncionObjetivo[(ni)%memoriaMinimoFitness];
			factorDesviacionTipica=1;
			
		}


		
		
		if(finAlgoritmo==false){
			//SELECCIONAMOS LOS PADRES
			//PROPORCIONAL AL FITNESS
			sumaFO=0;
			for (v=0;v<numeroIndividuos;v++){
				probaSeleccion[v]=Math.pow((individuo[v].valorFuncionObjetivo-mFO+1),presionSeleccion);
				sumaFO+=probaSeleccion[v];
				//console.log("V: "+v+" probaSeleccion[v] "+probaSeleccion[v]+" ni: "+ni+"individuo[v].valorFuncionObjetivo"+individuo[v].valorFuncionObjetivo+" mFO "+mFO);
			}
			for (v=0;v<numeroIndividuos;v++){
				probaSeleccion[v]=probaSeleccion[v]/sumaFO;
			}
			probaSeleccionAcumulada[0]=probaSeleccion[0];
			for (v=1;v<numeroIndividuos;v++){
				probaSeleccionAcumulada[v]=probaSeleccionAcumulada[v-1]+probaSeleccion[v];
			}
			for (v=0;v<numeroHijos;v++){
				
				aleatorio=Math.random();
				for (m=0;m<numeroIndividuos;m++){
					//console.log("V: "+v+" m: "+m+" aleatorio: "+aleatorio+" probaSeleccionAcumulada[m]"+probaSeleccionAcumulada[m]+" ni: "+ni);
					if(aleatorio<=probaSeleccionAcumulada[m]){
						padre[v]=m;
						break;
					}
				}
				//console.log("Padre["+v+"]="+padre[v]);
			}
			
			
			//RECOMBINACIÓN DE PADRES Y CREACIÓN DE HIJOS
			for (v=0;v<numeroHijos;v+=2){
				hijo[v]=new clsIndividuo(individuo[padre[v]].alelo);
				hijo[v+1]=new clsIndividuo(individuo[padre[v+1]].alelo);
				
				if(Math.random()<probaRecombinacion){		
					for (m=1;m<=14;m++){
						if(tiposNaveActivos[m]==true && Math.random()<probaIntercambio){
							aleatorio=Math.random();
							fi=(1+2*alfaBlend)*aleatorio-alfaBlend;
							hijo[v].alelo[m]=Math.round(individuo[padre[v+1]].alelo[m]*fi+(1-fi)*individuo[padre[v]].alelo[m]);
							hijo[v+1].alelo[m]=Math.round(individuo[padre[v]].alelo[m]*fi+(1-fi)*individuo[padre[v+1]].alelo[m]);
							if(hijo[v].alelo[m]>numeroMaxNavesAtacante[m]){
								hijo[v].alelo[m]=numeroMaxNavesAtacante[m];
							} else if(hijo[v].alelo[m]<0){
								hijo[v].alelo[m]=0;
							}
							if(hijo[v+1].alelo[m]>numeroMaxNavesAtacante[m]){
								hijo[v+1].alelo[m]=numeroMaxNavesAtacante[m];
							} else if(hijo[v+1].alelo[m]<0){
								hijo[v+1].alelo[m]=0;
							}
						}
					}
				}
			}
			
			//MUTACIÓN DE LOS NUEVOS INDIVIDUOS
			for (v=0;v<numeroHijos;v++){
				for (m=1;m<=14;m++){
					if(tiposNaveActivos[m]==true && Math.random()<probaMutacion){
						
						hijo[v].alelo[m]+=Math.round(gaussian(0,factorDesviacionTipica*numeroMaxNavesAtacante[m]*desviacionTipica));;
						
						if(hijo[v].alelo[m]>numeroMaxNavesAtacante[m]){
							hijo[v].alelo[m]=numeroMaxNavesAtacante[m];
						} else if(hijo[v].alelo[m]<0){
							hijo[v].alelo[m]=0;
						}
					}
				}
				individuo.push(hijo[v]);
			}
			
			//EVALUAMOS EL FITNESS Y CALCULAMOS EL MÍNIMO Y MÁXIMO DE LAS ÚLTIMAS N GENERACIONES
			minimoFuncionObjetivo[(ni+1)%memoriaMinimoFitness]=Infinity;
			maximoFuncionObjetivo[(ni+1)%memoriaMinimoFitness]=-Infinity;
			mediaFuncionObjetivo[(ni+1)%memoriaMinimoFitness]=0;
			for(v=0;v<individuo.length;v++){
				if(individuo[v].valorFuncionObjetivo== -Infinity){
					individuo[v].valorFuncionObjetivo=0;
					for(var z=0; z<iteracionesCalculoVFO;z++){
						individuo[v].valorFuncionObjetivo+=funcionObjetivo(individuo[v].alelo);
					}
					individuo[v].valorFuncionObjetivo=individuo[v].valorFuncionObjetivo/iteracionesCalculoVFO;
				}
				
				mediaFuncionObjetivo[(ni+1)%memoriaMinimoFitness]+=individuo[v].valorFuncionObjetivo;
				if(minimoFuncionObjetivo[(ni+1)%memoriaMinimoFitness]>individuo[v].valorFuncionObjetivo){
					minimoFuncionObjetivo[(ni+1)%memoriaMinimoFitness]=individuo[v].valorFuncionObjetivo;
				}
				if(maximoFuncionObjetivo[(ni+1)%memoriaMinimoFitness]<individuo[v].valorFuncionObjetivo){
					maximoFuncionObjetivo[(ni+1)%memoriaMinimoFitness]=individuo[v].valorFuncionObjetivo;
				}
			}
			mediaFuncionObjetivo[(ni+1)%memoriaMinimoFitness]=mediaFuncionObjetivo[(ni+1)%memoriaMinimoFitness]/individuo.length;
			mFO=Math.min.apply(null,minimoFuncionObjetivo);
			
			
			//SELECCIÓN DE LA NUEVA GENERACIÓN
			//SELECCIÓN POR ELITISMO
			elite=0;
			for (elite=0;elite<tamanoElite;elite++){
				indElite[elite]=-1;
				for (v=0;v<tamanoElite;v++){
					if(indElite.indexOf(v)==-1){
						indElite[elite]=v;
						break;
					}
				}		
				for (v=0;v<individuo.length;v++){
					if(individuo[v].valorFuncionObjetivo>individuo[indElite[elite]].valorFuncionObjetivo){
						if(indElite.indexOf(v)==-1){
							indElite[elite]=v;
						}
					}
				}
			}
			
			//EL RESTO PROPORCIONAL AL FITNESS
			sumaFO=0;
			for(m=0;m<numeroHijos;m++){
				for(v=0;v<individuo.length;v++){
					if(indElite.indexOf(v)==-1){
						probaSeleccion[v]=Math.pow((individuo[v].valorFuncionObjetivo-mFO+1),presionSeleccion);
						sumaFO+=probaSeleccion[v];
					}
				}
				for(v=0;v<individuo.length;v++){
					if(indElite.indexOf(v)==-1){
						probaSeleccion[v]=1-(probaSeleccion[v]/sumaFO);
					}
				}
				for(v=0;v<=tamanoElite;v++){
					if(indElite.indexOf(v)==-1){
						probaSeleccionAcumulada[v]=probaSeleccion[v];
						break;
					}
				}
				for (v=1;v<individuo.length;v++){
					if(indElite.indexOf(v)==-1){
						probaSeleccionAcumulada[v]=probaSeleccionAcumulada[v-1]+probaSeleccion[v];
					}
				}
				aleatorio=Math.random();
				for (z=0;z<individuo.length;z++){
					if(indElite.indexOf(z)==-1){
						if(aleatorio<probaSeleccionAcumulada[z]){
							individuo.splice(z,1);
							break;
						}
					}
				}
			}
			
			//console.log("Minimo "+Math.max.apply(null,minimoFuncionObjetivo)+"  y maximo "+Math.min.apply(null,minimoFuncionObjetivo))
			
			
			
			factorDesviacionTipica-=(1/(reinicioCapacidadAdaptativa+1));
			

			ni++;
		}
	}

	tiempoTrascurrido=Date.now()-tiempoInicial;




	/*SALIDA PANTALLA
	//PUNTUACIÓN FINAL
	console.log("");
	console.log("RESULTADOS DE LA BATALLA");
	console.log("");
	console.log("La batala ha durado "+rondasDuracion+" rondas");
	console.log("");
	console.log("Nave pqueña de carga: "+(numeroNavesAtacante[1]-numeroNavesDestruidasAtacante[1])+"/"+numeroNavesAtacante[1]);
	console.log("Nav grande de carga: "+(numeroNavesAtacante[2]-numeroNavesDestruidasAtacante[2])+"/"+numeroNavesAtacante[2]);
	console.log("Cazador ligero: "+(numeroNavesAtacante[3]-numeroNavesDestruidasAtacante[3])+"/"+numeroNavesAtacante[3]);
	console.log("cazador pesa: "+(numeroNavesAtacante[4]-numeroNavesDestruidasAtacante[4])+"/"+numeroNavesAtacante[4]);
	console.log("Crucero: "+(numeroNavesAtacante[5]-numeroNavesDestruidasAtacante[5])+"/"+numeroNavesAtacante[5]);
	console.log("Nav de batalla: "+(numeroNavesAtacante[6]-numeroNavesDestruidasAtacante[6])+"/"+numeroNavesAtacante[6]);
	console.log("Colonizador: "+(numeroNavesAtacante[7]-numeroNavesDestruidasAtacante[7])+"/"+numeroNavesAtacante[7]);
	console.log("Recilador: "+(numeroNavesAtacante[8]-numeroNavesDestruidasAtacante[8])+"/"+numeroNavesAtacante[8]);
	console.log("Sond de espionaje: "+(numeroNavesAtacante[9]-numeroNavesDestruidasAtacante[9])+"/"+numeroNavesAtacante[9]);
	console.log("Bombarero: "+(numeroNavesAtacante[10]-numeroNavesDestruidasAtacante[10])+"/"+numeroNavesAtacante[10]);
	console.log("Satelite solar: "+(numeroNavesAtacante[11]-numeroNavesDestruidasAtacante[11])+"/"+numeroNavesAtacante[11]);
	console.log("Destrucor: "+(numeroNavesAtacante[12]-numeroNavesDestruidasAtacante[12])+"/"+numeroNavesAtacante[12]);
	console.log("Estrela de la muerte: "+(numeroNavesAtacante[13]-numeroNavesDestruidasAtacante[13])+"/"+numeroNavesAtacante[13]);
	console.log("Acorazado: "+(numeroNavesAtacante[14]-numeroNavesDestruidasAtacante[14])+"/"+numeroNavesAtacante[14]);
	console.log("");
	console.log("Distancia recorrida: "+distanciaRecorrida);
	console.log("Consumo de deuterio: "+gastoCombustible);
	console.log("Segundos de vuelo: "+segundosVuelo);
	console.log("Tiempo de vuelo: "+(((segundosVuelo-segundosVuelo%60)/60)-((segundosVuelo-segundosVuelo%60)/60)%60)/60+" horas, "+(((segundosVuelo-(segundosVuelo%60))/60)%60)+" minutos y "+segundosVuelo%60 + " segundos");
	console.log("Escombros: Metal: "+escombrosMetal+", Cristal: "+escombrosCristal);
	console.log("Robo: Metal: "+roboMetal+", Cristal: "+roboCristal+ ", Deuterio: "+roboDeuterio );
	console.log("Perdidas: Metal: "+perdidasMetal+", Cristal: "+perdidasCristal+", Deuterio: "+perdidasDeuterio);
	console.log("Total funcion objetivo: "+puntuacion);
	*/
	
	
	/*console.log("********************************");
	console.log("******FIN DE LA SIMULACION******");
	console.log("********************************");*/
	console.log("Ejecucion: "+ ejecucion+"   Numero de iteraciones: "+ni+"   Tiempo simulacion: "+tiempoTrascurrido/1000);
	iteracionesejecucion=iteracionesejecucion.concat(ni+";");
	tiemposejecucion=tiemposejecucion.concat(tiempoTrascurrido/1000+";");
	/*console.log("");
	console.log("RESULTADOS:");
	for(ni=0;ni<individuo.length;ni++){
		console.log("Genes individuo "+ni+": "+"("+individuo[ni].alelo[1]+","+individuo[ni].alelo[2]+","+individuo[ni].alelo[3]+","+individuo[ni].alelo[4]+","+individuo[ni].alelo[5]+","+individuo[ni].alelo[6]+","+individuo[ni].alelo[7]+","+individuo[ni].alelo[8]+","+individuo[ni].alelo[9]+","+individuo[ni].alelo[10]+","+individuo[ni].alelo[11]+","+individuo[ni].alelo[12]+","+individuo[ni].alelo[13]+","+individuo[ni].alelo[14]+") VFO: "+individuo[ni].valorFuncionObjetivo);
	}
	console.log("");
	console.log("");
*/


	//FINALIZACIÓN DEL ALGORITMO, CALCULO DE RESULTADOS
	if (finAlgoritmo==true){		
		
	var excluido=false;
		mediaAlelos=[,0,0,0,0,0,0,0,0,0,0,0,0,0,0];		
		for(v=0;v<individuo.length;v++){
			excluido=false;
			for(ni=0;ni<listaAtipicos.length;ni++){
				if(listaAtipicos[ni]==v || individuo[v].valorFuncionObjetivo<=puntoCorte){
					excluido=true;
					break;
				}
			}
			if(excluido==false){
				for(z=1;z<=14;z++){
					if(tiposNaveActivos[z]==true){
						mediaAlelos[z]+=individuo[v].alelo[z];
					}
				}
			}
		}
			
		for(z=1;z<=14;z++){
			if(tiposNaveActivos[z]==true){
				mediaAlelos[z]=mediaAlelos[z]/(numeroIndividuos-listaAtipicos.length-numeroIgnoradosReal);
			}
		}		
		//console.log("division: ",numeroIndividuos-listaAtipicos.length-numeroIgnoradosReal," individuos: ",numeroIndividuos," atipicos ",listaAtipicos.length," ignorados ",numeroIgnoradosReal)


		for(z=1;z<=14;z++){
			if(tiposNaveActivos[z]==true){
				mediaAlelos[z]=Math.round(mediaAlelos[z]);
				
				if(coeficienteVariacionPermitido*numeroMaxNavesAtacante[z]/4>mediaAlelos[z]){
					mediaAlelos[z]=0;
				} else if((1-coeficienteVariacionPermitido/4)*numeroMaxNavesAtacante[z]<mediaAlelos[z]){
					mediaAlelos[z]=numeroMaxNavesAtacante[z];
				}
				
			}
		}
			
		
		
		individuoFinal=new clsIndividuo(mediaAlelos);
		console.log("Genes individuo final: "+"("+individuoFinal.alelo[1]+","+individuoFinal.alelo[2]+","+individuoFinal.alelo[3]+","+individuoFinal.alelo[4]+","+individuoFinal.alelo[5]+","+individuoFinal.alelo[6]+","+individuoFinal.alelo[7]+","+individuoFinal.alelo[8]+","+individuoFinal.alelo[9]+","+individuoFinal.alelo[10]+","+individuoFinal.alelo[11]+","+individuoFinal.alelo[12]+","+individuoFinal.alelo[13]+","+individuoFinal.alelo[14]+")");
		genesejecucion=genesejecucion.concat(individuoFinal.alelo[1]+","+individuoFinal.alelo[2]+","+individuoFinal.alelo[3]+","+individuoFinal.alelo[4]+","+individuoFinal.alelo[5]+","+individuoFinal.alelo[6]+","+individuoFinal.alelo[7]+","+individuoFinal.alelo[8]+","+individuoFinal.alelo[9]+","+individuoFinal.alelo[10]+","+individuoFinal.alelo[11]+","+individuoFinal.alelo[12]+","+individuoFinal.alelo[13]+","+individuoFinal.alelo[14]+";");
		
		
		var puntuacion=0,roboMetalMedia=0,roboCristalMedia=0,roboDeuterioMedia=0,escombrosMetalMedia=0,escombrosCristalMedia=0,capacidadCargaFinalMedia=0,perdidasMetalMedia=0,perdidasCristalMedia=0,perdidasDeuterioMedia=0,rondasDuracionMedia=0,rondasDuracionMaximas=0;
		var navesRestantes=[,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for (v=0;v<precisionResultado;v++){
			puntuacion+=funcionObjetivo(individuoFinal.alelo);
			escombrosMetalMedia+=escombrosMetal;
			escombrosCristalMedia+=escombrosCristal;
			capacidadCargaFinalMedia+=capacidadCargaFinal;
			perdidasMetalMedia+=perdidasMetal;
			perdidasCristalMedia+=perdidasCristal;
			perdidasDeuterioMedia+=perdidasDeuterio;
			rondasDuracionMedia+=rondasDuracion;
			roboMetalMedia+=roboMetal;
			roboCristalMedia+=roboCristal;
			roboDeuterioMedia+=roboDeuterio;
			
			if(rondasDuracionMaximas < rondasDuracion){
				rondasDuracionMaximas=rondasDuracion;
			}
			
			for(z=1;z<=14;z++){
				if(tiposNaveActivos[z]==true){
					navesRestantes[z]+=individuoFinal.alelo[z]-numeroNavesDestruidasAtacante[z];
				}
			}
		}
		
		
		for(z=1;z<=14;z++){
			if(tiposNaveActivos[z]==true){
				navesRestantes[z]=navesRestantes[z]/precisionResultado;
			}
		}	
		puntuacion=puntuacion/precisionResultado;
		escombrosMetalMedia=escombrosMetalMedia/precisionResultado;
		escombrosCristalMedia=escombrosCristalMedia/precisionResultado;
		capacidadCargaFinalMedia=capacidadCargaFinalMedia/precisionResultado;
		perdidasMetalMedia=perdidasMetalMedia/precisionResultado;
		perdidasCristalMedia=perdidasCristalMedia/precisionResultado;
		perdidasDeuterioMedia=perdidasDeuterioMedia/precisionResultado;
		rondasDuracionMedia=rondasDuracionMedia/precisionResultado;
		/*
		console.log("");
		console.log("RESULTADOS DE LA BATALLA");
		console.log("");
		console.log("La batala dura una media de "+rondasDuracionMedia+" rondas");
		console.log("La batala puede durar hasta "+rondasDuracionMaximas+" rondas");
		console.log("");
		console.log("Nave pqueña de carga: "+(navesRestantes[1])+"/"+individuoFinal.alelo[1]);
		console.log("Nav grande de carga: "+(navesRestantes[2])+"/"+individuoFinal.alelo[2]);
		console.log("Cazador ligero: "+(navesRestantes[3])+"/"+individuoFinal.alelo[3]);
		console.log("cazador pesa: "+(navesRestantes[4])+"/"+individuoFinal.alelo[4]);
		console.log("Crucero: "+(navesRestantes[5])+"/"+individuoFinal.alelo[5]);
		console.log("Nav de batalla: "+(navesRestantes[6])+"/"+individuoFinal.alelo[6]);
		console.log("Colonizador: "+(navesRestantes[7])+"/"+individuoFinal.alelo[7]);
		console.log("Recilador: "+(navesRestantes[8])+"/"+individuoFinal.alelo[8]);
		console.log("Sond de espionaje: "+(navesRestantes[9])+"/"+individuoFinal.alelo[9]);
		console.log("Bombarero: "+(navesRestantes[10])+"/"+individuoFinal.alelo[10]);
		console.log("Satelite solar: "+(navesRestantes[11])+"/"+individuoFinal.alelo[11]);
		console.log("Destrucor: "+(navesRestantes[12])+"/"+individuoFinal.alelo[12]);
		console.log("Estrela de la muerte: "+(navesRestantes[13])+"/"+individuoFinal.alelo[13]);
		console.log("Acorazado: "+(navesRestantes[14])+"/"+individuoFinal.alelo[14]);
		console.log("");
		//console.log("Distancia recorrida: "+distanciaRecorrida);
		console.log("Consumo de deuterio: "+gastoCombustible);
		console.log("Capacidad de carga inicial: "+capacidadCargaInicial);
		//console.log("Segundos de vuelo: "+segundosVuelo);
		console.log("Tiempo de vuelo: "+(((segundosVuelo-segundosVuelo%60)/60)-((segundosVuelo-segundosVuelo%60)/60)%60)/60+" horas, "+(((segundosVuelo-(segundosVuelo%60))/60)%60)+" minutos y "+segundosVuelo%60 + " segundos");
		console.log("Escombros: Metal: "+escombrosMetalMedia+", Cristal: "+escombrosCristalMedia);
		console.log("Capacidad de carga final: "+capacidadCargaFinalMedia);
		console.log("Robo: Metal: "+roboMetalMedia+", Cristal: "+roboCristalMedia+ ", Deuterio: "+roboDeuterioMedia );
		console.log("Perdidas: Metal: "+perdidasMetalMedia+", Cristal: "+perdidasCristalMedia+", Deuterio: "+perdidasDeuterioMedia);*/
		console.log("Total funcion objetivo: "+puntuacion);
		puntuacionesejecucion=puntuacionesejecucion.concat(puntuacion+";");
	} else {
		console.log("");
		console.log("***********************************************");
		console.log("*****PRECAUCION: Simulacion no concluyente*****");
		console.log("***********************************************");
	}
	
	
 

}

	var fs = require('fs');
	fs.writeFile("C://Program Files//nodejs//Ogame.csv", tiemposejecucion+"\r\n"+iteracionesejecucion+"\r\n"+genesejecucion+"\r\n"+puntuacionesejecucion, function(err) {
		if(err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	});

/**********************************************
***********************************************
***********************************************
***********************************************
***************** FUNCIONES *******************
***********************************************
***********************************************
***********************************************
***********************************************/



function funcionObjetivo(distribucion){
	
//TIEMPO DE VUELO
var velocidadFlota=0;
for (i=1;i<=14;i++){
	if (distribucion[i]>0){
		if (velocidadFlota==0){
			velocidadFlota=velocidadNaveAtacante[i];
		} else if(velocidadFlota>velocidadNaveAtacante[i]){
			velocidadFlota=velocidadNaveAtacante[i];
		}
	}
}
segundosVuelo=Math.round((35e2/factorVelocidad)*Math.sqrt(distanciaRecorrida*10/velocidadFlota)+10);


//CONSUMO DE COMBUSTIBLE
gastoCombustible=0;
for (i=1;i<=14;i++){
	if (distribucion[i]>0){
		gastoCombustible += distribucion[i]*valorBaseConsumo[i]*distanciaRecorrida/35e3*Math.pow((35e3/(segundosVuelo-10)*Math.sqrt(distanciaRecorrida*10/velocidadNaveAtacante[i]))/10+1,2);
	}	
}
if(Math.round(gastoCombustible)!=0){
	gastoCombustible=Math.round(gastoCombustible)+1;	
}	
	
	
	//CAPACIDAD DE CARGA INICIAL (HAY QUE PENSAR COMO IMPLEMENTAR LA LIMITACIÓN DEL DEUTERIO)
	capacidadCargaInicial=0;
	for (i = 1; i <= 14; i++){
		if (distribucion[i]>0){
			capacidadCargaInicial=capacidadCargaInicial+(distribucion[i]*valorBaseCapacidad[i]);
		}
	}
	/*
	if(gastoCombustible>capacidadCargaInicial){
		//return -987654321e15;
		alerta consumo
	}
	*/

	//BATALLA
	numeroNavesDestruidasAtacante=[,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	numeroNavesDestruidasDefensor=[,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	ganadorAtacante=false;
	simularBatalla(distribucion,numeroNavesDefensor);

	//CÁLCULO DE BENEFICIO
	//ESCOMBROS
	escombrosMetal=0,escombrosCristal=0;
	for (i = 1; i <= 14; i++){
		escombrosMetal=escombrosMetal+(((numeroNavesDestruidasAtacante[i]+numeroNavesDestruidasDefensor[i])*MatrizCosteNaves[i][0])*ratioEscombros);
		escombrosCristal=escombrosCristal+(((numeroNavesDestruidasAtacante[i]+numeroNavesDestruidasDefensor[i])*MatrizCosteNaves[i][1])*ratioEscombros);
	}
	//PÉRDIDAS
	perdidasMetal=0,perdidasCristal=0,perdidasDeuterio=0;
	for (i = 1; i <= 14; i++){
		perdidasMetal=perdidasMetal+(numeroNavesDestruidasAtacante[i]*MatrizCosteNaves[i][0]);
		perdidasCristal=perdidasCristal+(numeroNavesDestruidasAtacante[i]*MatrizCosteNaves[i][1]);
		perdidasDeuterio=perdidasDeuterio+(numeroNavesDestruidasAtacante[i]*MatrizCosteNaves[i][2]);
	}
	
	roboMetal=0,roboCristal=0,roboDeuterio=0;
	if (ganadorAtacante==true){
		//CAPACIDAD DE CARGA FINAL
		capacidadCargaFinal=0
		for (i = 1; i <= 14; i++){
			capacidadCargaFinal+=((distribucion[i]-numeroNavesDestruidasAtacante[i])*valorBaseCapacidad[i]);
		}
		//ROBO DE RECURSOS
		roboMetal= Math.min(capacidadCargaFinal/3,metalDisponible*porcentajeRobo/100);
		roboCristal=Math.min((capacidadCargaFinal-roboMetal)/2,cristalDisponible*porcentajeRobo/100);
		roboDeuterio=Math.min(capacidadCargaFinal-roboCristal-roboMetal,deuterioDisponible*porcentajeRobo/100);
		roboMetal=roboMetal+Math.min((capacidadCargaFinal-roboCristal-roboMetal-roboDeuterio)/2,(metalDisponible*porcentajeRobo/100)-roboMetal);
		roboCristal=roboCristal+Math.min((capacidadCargaFinal-roboCristal-roboMetal-roboDeuterio)/2,(cristalDisponible*porcentajeRobo/100)-roboCristal);
	}
	
	return ((roboDeuterio-perdidasDeuterio-gastoCombustible-(penalizacionInfactibilidad*Math.pow(Math.min(capacidadCargaInicial-gastoCombustible,0),potenciaPenalizacion)))+((roboMetal+escombrosMetal-perdidasMetal)/ratioMetal)+((roboCristal+escombrosCristal-perdidasCristal)/ratioCristal));
}



function simularBatalla(numeroNavesAtacanteAux,numeroNavesDefensorAux){
		
		
		
	//CREAMOS LAS NAVES Y DEFENSAS
	var naveAtacante = [];
	var naveDefensor = [];

	var i,j,h,k=1,penetracion=0;
	for (i=1;i<=14;i++){
		if(numeroNavesAtacanteAux[i]>0){
			for (j=1;j<=numeroNavesAtacanteAux[i];j++){
				naveAtacante[k] = new clsNaveAtacante(i);
				k++;
			}
		}
	}
	k=1;
	for (i=1;i<=22;i++){
		if(numeroNavesDefensorAux[i]>0){
			for (j=1;j<=numeroNavesDefensorAux[i];j++){
				naveDefensor[k] = new clsNaveDefensor(i);
				k++;
			}
		}
	}

	
	//COMIENZA LA BATALLA
	for (h=1;h<=6;h++){
		if((naveAtacante.length<=1) || (naveDefensor.length<=1)){break;}
		
		
		
		//CARGA ESCUDOS
		for (i=1;i<naveAtacante.length;i++){
			naveAtacante[i].escudo=escudoNaveAtacante[naveAtacante[i].tipo];
		}
		for (i=1;i<naveDefensor.length;i++){
			naveDefensor[i].escudo=escudoNaveDefensor[naveDefensor[i].tipo];
		}
		
		
		var obj;
		var fr;
		//DISPAROS DEL ATACANTE
		for (i=1;i<naveAtacante.length;i++){
			
			
			fr=true;
			while (fr==true){
			
				fr=false;
				
				obj=Math.floor(Math.random() * (naveDefensor.length-1)+1); 
				
				if (MatrizFuegoRapido[naveAtacante[i].tipo][naveDefensor[obj].tipo]>0){
					if (Math.random()*MatrizFuegoRapido[naveAtacante[i].tipo][naveDefensor[obj].tipo]>1){
						fr=true;
					}
				}
				
				if (naveDefensor[obj].destruida==false){
					
					penetracion=Math.floor((ataqueNaveAtacante[naveAtacante[i].tipo]/escudoNaveDefensor[naveDefensor[obj].tipo])*100);
					
					if ((penetracion>=1) || (naveDefensor[obj].escudo==0)){
						
						if (naveDefensor[obj].escudo > ataqueNaveAtacante[naveAtacante[i].tipo] && penetracion<100) {
							
							naveDefensor[obj].escudo -= escudoNaveDefensor[naveDefensor[obj].tipo]*(penetracion/100);
							
						} else {
							
							naveDefensor[obj].blindaje += naveDefensor[obj].escudo-Math.floor(ataqueNaveAtacante[naveAtacante[i].tipo]*100)/100;
							naveDefensor[obj].escudo=0;
							
						}
						
						if (naveDefensor[obj].blindaje<=blindajeNaveDefensor[naveDefensor[obj].tipo]*0.7){
							
							if (Math.random()*blindajeNaveDefensor[naveDefensor[obj].tipo] > naveDefensor[obj].blindaje){
								naveDefensor[obj].destruida=true;
							}
							
						}
						
					}
					
				}
			//console.log("i vale "+i+", obj vale "+obj+", Matriz de fr: "+MatrizFuegoRapido[naveAtacante[i].tipo][naveDefensor[obj].tipo]+", fr vale: "+fr+", El escudo del defensor vale: "+naveDefensor[obj].escudo);
			}
			
			
		}
		
		
		//DISPAROS DEL DEFENSOR
		for (i=1;i<naveDefensor.length;i++){
			
			fr=true;
			while (fr==true){
			
				fr=false;
				
				obj=Math.floor(Math.random() * (naveAtacante.length-1)+1); 
				
				if (MatrizFuegoRapido[naveDefensor[i].tipo][naveAtacante[obj].tipo]>0){
					if (Math.random()*MatrizFuegoRapido[naveDefensor[i].tipo][naveAtacante[obj].tipo]>1){
						fr=true;
					}
				}
				
				if (naveAtacante[obj].destruida==false){
					
					penetracion=Math.floor((ataqueNaveDefensor[naveDefensor[i].tipo]/escudoNaveAtacante[naveAtacante[obj].tipo])*100);
					
					if ((penetracion>=1) || (naveAtacante[obj].escudo==0)){
						
						if (naveAtacante[obj].escudo > ataqueNaveDefensor[naveDefensor[i].tipo] && penetracion<100) {
							
							naveAtacante[obj].escudo -= escudoNaveAtacante[naveAtacante[obj].tipo]*(penetracion/100);
							
						} else {
							
							naveAtacante[obj].blindaje += naveAtacante[obj].escudo-Math.floor(ataqueNaveDefensor[naveDefensor[i].tipo]*100)/100;
							naveAtacante[obj].escudo=0;
							
						}
						
						if (naveAtacante[obj].blindaje<=blindajeNaveAtacante[naveAtacante[obj].tipo]*0.7){
						
							if (Math.random()*blindajeNaveAtacante[naveAtacante[obj].tipo] > naveAtacante[obj].blindaje){
								naveAtacante[obj].destruida=true;
							}
							
						}
						
					}
					
				}
			
			}
			
			
		}
		
	
		//DESTRUCCIÓN DE NAVES
		for (i=1;i<naveAtacante.length;i++){
			while ((i<naveAtacante.length) && (naveAtacante[i].destruida==true)){
				numeroNavesDestruidasAtacante[naveAtacante[i].tipo]++;
				naveAtacante.splice(i,1);
			}
		}	
		for (i=1;i<naveDefensor.length;i++){
			while ((i<naveDefensor.length) && (naveDefensor[i].destruida==true)){
				numeroNavesDestruidasDefensor[naveDefensor[i].tipo]++;
				naveDefensor.splice(i,1);
			}
		}	
		
	}

	
	//console.log("Fin de la batalla, la batalla ha durado "+(h-1)+" rondas, Resultado: ");
	rondasDuracion=Math.max(h-1,1);
	//console.log("Han sobrevido " +(naveAtacante.length-1) + " naves atacantes.");
	//console.log("Han sobrevido " +(naveDefensor.length-1) + " naves defensoras.");
	
	if (naveDefensor.length<=1) {
		ganadorAtacante=true;
	}
}



//NORMAL GAUSSIANA
function gaussian(mean, stdev) {
	var y1;
	var x1, x2, w;
	do {
		 x1 = 2.0 * Math.random() - 1.0;
		 x2 = 2.0 * Math.random() - 1.0;
		 w  = x1 * x1 + x2 * x2;               
	} while( w >= 1.0);
	w = Math.sqrt((-2.0 * Math.log(w))/w);
	y1 = x1 * w;

   return mean + stdev * y1;
   
}


/**********************************************
***********************************************
***********************************************
***********************************************
****************** CLASES *********************
***********************************************
***********************************************
***********************************************
***********************************************/




function clsIndividuo(numeroNavesAtacanteAux){
	this.alelo=[];
	for (var t=1;t<=14;t++){
		this.alelo[t]=numeroNavesAtacanteAux[t];
	}
	this.valorFuncionObjetivo= -Infinity;
}



function clsNaveAtacante(tipoNave){
	this.tipo=tipoNave;
	this.escudo=escudoNaveAtacante[tipoNave];
	this.blindaje=blindajeNaveAtacante[tipoNave];
	this.destruida=false;
}

function clsNaveDefensor(tipoNave){
	this.tipo=tipoNave;
	this.escudo=escudoNaveDefensor[tipoNave];
	this.blindaje=blindajeNaveDefensor[tipoNave];
	this.destruida=false;
}




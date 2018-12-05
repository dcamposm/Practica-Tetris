    /* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Joc = {
    espai: new Array(25),
    actual: null,
    punts: 0,
    puntsMax: 0,
    nivell: 1,
    pecaActual: null,
    pecaSeguent: null,
    cont: {"i": 0, "j": 0, "l": 0, "o": 0, "s": 0, "z": 0, "t": 0},
    inter: 1000,
    contInt: 0,
    nextLvl: 5,
    
    inici: function() {
        Joc.punts=0;
        Joc.puntsMax=0;
        Joc.nivell=1;
        Joc.inter= 1000;
        Joc.contInt=0;
        Joc.nextLvl=5;
                
        
        for (var i = 0; i < Joc.espai.length; i++) {
            Joc.espai[i] = new Array(10);
        }
        
        for (var i = 0; i < Joc.espai.length; i++) {
            if (i===this.espai.length-1 || i===0){
                Joc.espai[i] = [1,1,1,1,1,1,1,1,1,1];
            }
            else{
                Joc.espai[i] = [1,0,0,0,0,0,0,0,0,1]; 
            }
        }
        
        Joc.mostrar();
    },
    
    nextPeca: function() {
        var peces = [
                 [[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]],"groc"],
                 [[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],"lila"],
                 [[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],"verd"],
                 [[[0,0,0,0],[0,1,1,0],[0,0,1,1],[0,0,0,0]],"roig"],
                 [[[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]],"blau"],
                 [[[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],"taronga"],
                 [[[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],"morat"] ];
        
        var num = Math.round(Math.random()*6);
        
        return peces[num];
    },
    
    /*keyUser: function(e){
        if (e.key==="ArrowUp") {
            girarPeca;
        }
        else if (e.key==="ArrowDown") {
            aumentaVel;
        }
        else if (e.key==="ArrowRight") {
            mov=r;
        }
        else if (e.key==="ArrowLeft") {
            mov=l;
        }
    },*/
    
    autoMov: function(){
        this.inici();
        
        game=setInterval(Joc.mostrar, Joc.inter);
    },
    
    stop: function(){
        clearInterval(game);
    },
    
    mostrar: function(){     
        Joc.punts++;
        Joc.contInt++;
        
        if (Joc.contInt>=this.nextLvl && Joc.inter>300){
            Joc.nivell++;
            Joc.punts+=20;
            Joc.nextLvl+=5;
            Joc.inter-=10;
        }
        else if(Joc.contInt>=Joc.nextLvl) {
            Joc.nivell++;
            Joc.punts+=20;
            Joc.nextLvl+=5;
        }
        
        //if (enterPeca=true){this.punts+=10};
        
        var veure="";
        for (var i=0; i<Joc.espai.length; i++){
            veure+="<br>";
            for (var e=0; e<10; e++){
                veure+=Joc.espai[i][e]+" ";
            }
        }
        
        logPunts="<b>PuntsMax:</b> "+Joc.puntsMax+" <b>PuntsActuals: </b>"+Joc.punts+" <b>Nivell: </b>"+Joc.nivell;
        
        //return [document.getElementById("t").innerHTML=veure,document.getElementById("p").innerHTML=logPunts];
        document.getElementById("t").innerHTML=veure;
        document.getElementById("p").innerHTML=logPunts;
    }
    
    
};

var peca = function(forma, color, posX, posY){
    this.forma=forma;
    this.color=color;
    this.posX=posX;
    this.posY=posY;
    
    this.rotarHorari = function(){
        
    };
    
};
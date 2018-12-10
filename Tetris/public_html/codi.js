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
    pecaActual: 0,
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
        var newPeca=Joc.nextPeca();
        Joc.pecaActual=new Peca(newPeca[0], newPeca[1],1,2);        
        
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
    
    keyUser: function(e){
        if (e.key==="ArrowUp") {
            Joc.pecaActual=Joc.pecaActual.rotarHorari();
        }
        else if (e.key==="ArrowDown") {
            Joc.pecaActual=Joc.pecaActual.moureAvall();
        }
        else if (e.key==="ArrowRight") {
            Joc.pecaActual=Joc.pecaActual.moureDreta();
        }
        else if (e.key==="ArrowLeft") {
            Joc.pecaActual=Joc.pecaActual.moureEsquerra();
        }
    },
    
    autoMov: function(){
        this.inici();
        
        game=setInterval(Joc.mostrar, Joc.inter);
    },
    
    stop: function(){
        clearInterval(game);
    },
    
    continue: function(){
        game=setInterval(Joc.mostrar, Joc.inter);
    },
    
    mostrar: function(){     
        Joc.punts++;
        Joc.contInt++;
        
        if (Joc.contInt>=this.nextLvl && Joc.inter>300){
            Joc.nivell++;
            Joc.punts+=20;
            Joc.nextLvl+=5;
            //Joc.inter-=10;
        }
        else if(Joc.contInt>=Joc.nextLvl) {
            Joc.nivell++;
            Joc.punts+=20;
            Joc.nextLvl+=5;
        }
        
        //if (enterPeca=true){this.punts+=10};
        
        for (var i = 3; i>=0;i--){
            for (var e = 0; e<4;e++){
                if (Joc.pecaActual.forma[i][e]===1){
                    Joc.espai[Joc.pecaActual.posX+i][Joc.pecaActual.posY+e] = "x";  
                }
            }
        }
        
        var veure="";
        for (var i=0; i<Joc.espai.length; i++){
            veure+="<br>";
            for (var e=0; e<10; e++){
                veure+=Joc.espai[i][e]+" ";
            }
        }
        
        
        
        /*if (Joc.espai[Joc.pecaActual.posX+4][Joc.pecaActual.posY]===0){
            for (var i = 0; i<4;i++){
                for (var e = 0; e<4;e++){
                    Joc.espai[Joc.pecaActual.posX+i][Joc.pecaActual.posY+e] = 0;  
                }
            }
            Joc.pecaActual.posX++;
        }
        else if(Joc.espai[Joc.pecaActual.posX+4][Joc.pecaActual.posY]===1) {
            for (var i = 0; i<4;i++){
                for (var e = 0; e<4;e++){
                    if (Joc.pecaActual.forma[i][e]===1){
                        Joc.espai[Joc.pecaActual.posX+i][Joc.pecaActual.posY+e] = 1;  
                    }
                }
            }
            var newPeca=Joc.nextPeca();
            Joc.pecaActual=new Peca(newPeca[0], newPeca[1],1,2); 
        }*/
        
        //Joc.pecaActual;
        
        logPunts="<b>PuntsMax:</b> "+Joc.puntsMax+" <b>PuntsActuals: </b>"+Joc.punts+" <b>Nivell: </b>"+Joc.nivell;
        
        //return [document.getElementById("t").innerHTML=veure,document.getElementById("p").innerHTML=logPunts];
        document.getElementById("t").innerHTML=veure;
        document.getElementById("p").innerHTML=logPunts;
    }
    
    
};

var Peca = function(forma, color, posX, posY){
    this.forma=forma;
    this.color=color;
    this.posX=posX;
    this.posY=posY;
    
    this.rotarHorari = function(){
        var formaNova = new Array();
            for (var i=0;i<this.forma.length;i++) {
                formaNova[i]=new Array();
                for (var j=0;j<this.forma[i].length;j++) {
                    formaNova[i][j]=this.forma[this.forma[i].length-1-j][i];
                }
            }
        this.forma = formaNova;
    };
    
    this.moureDreta = function(){ 
        if ((x-1)>0) { 
            x--;
            return true;
        }
        else { 
            return false; 
        }
    };
    
    this.moureEsquerra = function(){
        if ((x+1)<14) { 
            x++;
            return true;
        }
        else {
            return false;
        }
    };
    
    this.moureAvall = function(){
        if ((y+1)<14) { 
            y++;
            return true;
        }
        else {
            return false;
        }
    };
};
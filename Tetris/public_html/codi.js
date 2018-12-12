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
    pecaSeguent: 0,
    cont: {"i": 0, "j": 0, "l": 0, "o": 0, "s": 0, "z": 0, "t": 0},
    inter: 1000,
    contInt: 0,
    nextLvl: 5,
    
    inici: function() {
        Joc.punts=0;
        Joc.puntsMax=0;
        Joc.nivell=1;
        Joc.nextLvl=5;
        Joc.inter= 1000;
        Joc.contInt=0;
        var newPeca=Joc.nextPeca();
        Joc.pecaActual=new Peca(newPeca[0], newPeca[1],1,4);
        var newPeca=Joc.nextPeca();
        Joc.pecaSeguent=new Peca(newPeca[0], newPeca[1],1,4);
        
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
        
        //Joc.mostrar();
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
            Joc.pecaActual.rotarHorari();
        }
        else if (e.key==="ArrowDown") {
            if(Joc.pecaActual.moureAvall()===true){
                Joc.pecaActual.posX++;
            }       
        }
        else if (e.key==="ArrowRight") {
            if (Joc.pecaActual.moureDreta()===true){
                Joc.pecaActual.posY++;
            }
        }
        else if (e.key==="ArrowLeft") {
            if (Joc.pecaActual.moureEsquerra()===true){
                Joc.pecaActual.posY--;
            }
        }
    },
    
    autoMov: function(){
        Joc.inici();
        
        Joc.continue();
    },
    
    stop: function(){
        clearInterval(game);
    },
    
    continue: function(){
        game=setInterval(Joc.mostrar, Joc.inter);
    },
    
    mostrar: function(){     
        Joc.punts++;
        /*Joc.contInt++;
        
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
        }*/
        
        //if (enterPeca=true){this.punts+=10};
        
        for (var i = 3; i>=0;i--){
            for (var e = 0; e<4;e++){
                if (Joc.pecaActual.forma[i][e]===1){
                    Joc.espai[Joc.pecaActual.posX+i][Joc.pecaActual.posY+e] = "x";  
                }
            }
        }
        
        var veureNext="";
        for (var i=0; i<4; i++){
            veureNext+="<br>";
            for (var e=0; e<4; e++){
                if (Joc.pecaSeguent.forma[i][e]===1){
                    veureNext+="x"+" ";
                }
                else {
                    veureNext+=0+" ";
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
        
        var fin=false;
        for (var i = 3; i>=0 && fin===false;i--){
            for (var e = 0; e<4 && fin===false;e++){
                if (Joc.pecaActual.forma[i][e]===1){
                    if(Joc.espai[Joc.pecaActual.posX+i+1][Joc.pecaActual.posY+e]===1 || Joc.espai[Joc.pecaActual.posX+i+1][Joc.pecaActual.posY+e]==="p"){
                        fin=true;
                    }
                }
            }
        }
        
        if (fin===false){
            for (var i = 0; i<4;i++){
                for (var e = 0; e<4;e++){
                    if ( Joc.espai[Joc.pecaActual.posX+i][Joc.pecaActual.posY+e]==="x" ||  Joc.espai[Joc.pecaActual.posX+i][Joc.pecaActual.posY+e]===0){
                        Joc.espai[Joc.pecaActual.posX+i][Joc.pecaActual.posY+e] = 0;  
                    }
                }
            }
            Joc.pecaActual.posX++;
        }
        else {
            for (var i = 0; i<4;i++){
                for (var e = 0; e<4;e++){
                    if (Joc.pecaActual.forma[i][e]===1){
                        Joc.espai[Joc.pecaActual.posX+i][Joc.pecaActual.posY+e] = "p";  
                    }
                }
            }
            Joc.pecaActual=Joc.pecaSeguent;
            var newPeca=Joc.nextPeca();
            Joc.pecaSeguent=new Peca(newPeca[0], newPeca[1],1,4);
        }
        
        logPunts="<b>PuntsMax:</b> "+Joc.puntsMax+" <b>PuntsActuals: </b>"+Joc.punts+" <b>Nivell: </b>"+Joc.nivell;
        
        //return [document.getElementById("t").innerHTML=veure,document.getElementById("p").innerHTML=logPunts];
        document.getElementById("t").innerHTML=veure;
        document.getElementById("n").innerHTML=veureNext;
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
        if ((this.posY+1)>0) { 
            return true;
        }
        else { 
            return false; 
        }
    };
    
    this.moureEsquerra = function(){
        if ((this.posY-1)<10) { 
            return true;
        }
        else {
            return false;
        }
    };
    
    this.moureAvall = function(){
        if ((this.posX+1)<25) { 
            return true;
        }
        else {
            return false;
        }
    };
};
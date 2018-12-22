//Classe Joc, que sera on fara la major part de les operacions per veure el joc, guradar els punts, etc...
var Joc = {
    espai: new Array(25),
    actual: null,
    punts: 0,
    puntsMax: 0,
    nivell: 1,
    pecaActual: 0,
    pecaSeguent: 0,
    cont: {"i": 0, "j": 0, "l": 0, "o": 0, "s": 0, "z": 0, "t": 0},
    inter: 0,
    contPec: 0,
    nextLvl: 5,
    //Metoda per reiniciar el s atributs, crear la cookie on es emmagatzema la puntuacio maxima i la creacio de la taula del joc
    inici: function() {
        Joc.punts=0;
        Joc.puntsMax=0;
        Joc.nivell=1;
        Joc.nextLvl=10;
        Joc.inter= 1000;
        Joc.contPec=0;
        var newPeca=Joc.nextPeca();
        Joc.pecaActual=new Peca(newPeca[0], newPeca[1],1,3);
        var newPeca=Joc.nextPeca();
        Joc.pecaSeguent=new Peca(newPeca[0], newPeca[1],1,3);
        
        Joc.comprovarPeca(Joc.pecaActual.color);
        
        if (getCookie("maxP")===""){
            document.cookie = "maxP=0"; 
         }
        
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
        
        game=setInterval(Joc.mostrar, 1000);
        //Joc.mostrar();
    },
    //Metoda on eligeix de manera aleatoria una peça, posant la seva forma i color
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
    //Metoda que detecta quin tecla a tocat i fara una operacio depenent de la tecla
    keyUser: function(e){
        if (e.key==="ArrowUp") {
            Joc.pecaActual.rotarHorari();
            Joc.mostrar();
        }
        else if (e.key==="ArrowDown") {
            if(Joc.pecaActual.moureAvall()===true){
                Joc.punts++;
                Joc.pecaActual.posX++;
                Joc.mostrar();
            }       
        }
        else if (e.key==="ArrowRight") {
            if (Joc.pecaActual.moureDreta()===true){
                Joc.pecaActual.posY++;
                Joc.mostrar();
            }
        }
        else if (e.key==="ArrowLeft") {
            if (Joc.pecaActual.moureEsquerra()===true){
                Joc.pecaActual.posY--;
                Joc.mostrar();
            }
        }
    },
    //Metoda per atorar el joc    
    stop: function(){
        clearInterval(game);
    },
    //Metoda per continuar el joc, en cas que se atores
    continue: function(){
        Joc.stop();
        game=setInterval(Joc.mostrar, Joc.inter);
    },
    //Metoda que se executa quant perds, on posara la teva puntuacio maxima feta en la partida
    end: function(){
        Joc.stop();
        
        Joc.puntsMax=Joc.puntsMax+Joc.punts;
        
        if (getCookie("maxP")<Joc.puntsMax){
            document.cookie="maxP="+Joc.puntsMax;
        }
        
        Joc.puntsMax=0;
        alert('Punts conseguits: '+Joc.puntsMax);
        
        Joc.inici();
    },
    //Metoda per somar el contador de peces sortides en la partida.
    comprovarPeca: function(peca){
        switch (peca){
                case "lila":
                    Joc.cont["i"]++;
                    break;
                case "blau":
                    Joc.cont["l"]++;
                    break;
                case "taronga":
                    Joc.cont["j"]++;
                    break;
                case "groc":
                    Joc.cont["o"]++;
                    break;
                case "verd":
                    Joc.cont["s"]++;
                    break;
                case "roig":
                    Joc.cont["z"]++;
                    break;
                default:
                    Joc.cont["t"]++;
            }
    },
    //Metoda on es mostrara tots per pantalla i on es fara algunes operacions
    mostrar: function(){     
        var taula = document.getElementById("view");
        var veureNext = document.getElementById("next");
        var ctx = taula.getContext("2d");
        var ctxs = veureNext.getContext("2d");
        var img;
        var imgs;
        
        
        Joc.punts++;
        //Operacio per quant pugi de nivell
        if (Joc.contPec>=Joc.nextLvl && Joc.inter>300){
            Joc.nivell++;
            Joc.punts+=20;
            Joc.nextLvl+=10;
            Joc.inter=Joc.inter - 100;
            
            game=setInterval(Joc.mostrar, Joc.inter);
        }
        else if(Joc.contPec>=Joc.nextLvl) {
            Joc.nivell++;
            Joc.punts+=20;
            Joc.nextLvl+=10;
        }
        
        //Operacio per mostrar per posar la peça actual en la taula
        for (var i = 3; i>=0;i--){
            for (var e = 0; e<4;e++){
                if (Joc.pecaActual.forma[i][e]===1){
                    Joc.espai[Joc.pecaActual.posX+i][Joc.pecaActual.posY+e] = "x";  
                }
            }
        }
        //Operacio per mostrar la peça seguent
        for (var i=0; i<4; i++){
            for (var e=0; e<4; e++){
                if (Joc.pecaSeguent.forma[i][e]===1) {
                    switch (Joc.pecaSeguent.color){
                        case "blau":
                            imgs = document.getElementById("blau");
                            break;
                        case "groc":
                            imgs = document.getElementById("groc");
                            break;
                        case "lila":
                            imgs = document.getElementById("lila");
                            break;
                        case "morat":
                            imgs = document.getElementById("morat");
                            break;
                        case "roig":
                            imgs = document.getElementById("roig");
                            break;
                        case "taronja":
                            imgs = document.getElementById("taronja");
                            break;
                        default:
                            imgs = document.getElementById("verd");
                    }
                }
                else {
                    imgs = document.getElementById("point");
                } 
                ctxs.drawImage(imgs, e*23, i*23, 22, 22);
            }   
        }
        //Operacio per mostrar a taula i el se contingut
        for (var i=0; i<Joc.espai.length; i++){
            for (var e=0; e<Joc.espai[i].length; e++){
                if(Joc.espai[i][e]==="p"){
                    img = document.getElementById("point");
                }
                else if (Joc.espai[i][e]==="x") {
                    switch (Joc.pecaActual.color){
                        case "blau":
                            img = document.getElementById("blau");
                            break;
                        case "groc":
                            img = document.getElementById("groc");
                            break;
                        case "lila":
                            img = document.getElementById("lila");
                            break;
                        case "morat":
                            img = document.getElementById("morat");
                            break;
                        case "roig":
                            img = document.getElementById("roig");
                            break;
                        case "taronja":
                            img = document.getElementById("taronja");
                            break;
                        default:
                            img = document.getElementById("verd");
                    }
                }
                else if (Joc.espai[i][e]===1) {
                    img = document.getElementById("pared");
                }
                else {
                    img = document.getElementById("res");
                }

                ctx.drawImage(img, e*23, i*23, 25, 25);
            }
        }
        
        //Operacio per detectar la colissio cap avall de la peça, on si trova que colissionara donara un true, en cas que no un false
        var fin=false;
        for (var i = 3; i>=0 && fin===false;i--){
            for (var e = 0; e<4 && fin===false;e++){
                if (Joc.pecaActual.forma[i][e]===1){
                    if(Joc.espai[Joc.pecaActual.posX+i+1][Joc.pecaActual.posY+e]===1 || Joc.espai[Joc.pecaActual.posX+i+1][Joc.pecaActual.posY+e]==="p"){
                        fin = true;
                    }
                }
            }
        }
        //Si dona false, lo que fara sera seguint tirant cap avall la peça
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
        //Si dona true, priemer posara a la taula la peça actual com p, per saber que son per fer punts
        else {
            for (var i = 0; i<4;i++){
                for (var e = 0; e<4;e++){
                    if (Joc.pecaActual.forma[i][e]===1){
                        Joc.espai[Joc.pecaActual.posX+i][Joc.pecaActual.posY+e] = "p";  
                    }
                }
            }
            //Despres, canviara la actual per la seguent i creara la peça seguent
            Joc.pecaActual=Joc.pecaSeguent;
            
            Joc.comprovarPeca(Joc.pecaActual.color);
            
            var newPeca=Joc.nextPeca();
            //Depenent de la peça que surti le dira una posicio diferent, a si sempre surtira adalt de tot
            switch (newPeca[1]){
                case "lila":
                    Joc.pecaSeguent=new Peca(newPeca[0], newPeca[1],1,3);
                    break;
                case "blau":
                    Joc.pecaSeguent=new Peca(newPeca[0], newPeca[1],1,3);
                    break;
                case "taronga":
                    Joc.pecaSeguent=new Peca(newPeca[0], newPeca[1],1,3);
                    break;
                default:
                    Joc.pecaSeguent=new Peca(newPeca[0], newPeca[1],0,3);
            }
            //Contador de peça que serveix per aumnetar el nivell
            Joc.contPec++;            
            //Operacio per detectar que una linea se a completat i baixa totes les demas lineas i donar punt extras
            var cont=0;
            var stop=false;
            for (var i=23 ; stop===false; i--){
                for (var e=0; e<10; e++){
                    if (Joc.espai[i][e]==="p"){
                        cont++;
                    }
                }
                if (cont===8){
                    for (var j = i; j>1;j--){
                        for (var k = 0; k<10;k++){
                            Joc.espai[j][k]=Joc.espai[j-1][k];
                        }
                    }
                    i++;
                    Joc.punts+=10;
                }
                else if (cont===0){
                    stop=true;
                }

                else if (i===1){
                    Joc.end();
                }
                
                cont=0;
            }
        }
        //Log que es veuren en la pagina
        var logPunts="<b>PuntsMax:</b> "+getCookie("maxP")+" <b>PuntsActuals: </b>"+Joc.punts+" <b>Nivell: </b>"+Joc.nivell;
        var seguent="Següent peça: ";
        var logPeca="<b>O:</b> "+Joc.cont["o"]+"<br><b>I: </b>"+Joc.cont["i"]+"<br><b>L: </b>"+Joc.cont["l"]
                        +"<br><b>J: </b>"+Joc.cont["j"]+"<br><b>S: </b>"+Joc.cont["s"]
                        +"<br><b>Z: </b>"+Joc.cont["z"]+"<br><b>T: </b>"+Joc.cont["t"];
        
        //return [document.getElementById("t").innerHTML=veure,document.getElementById("p").innerHTML=logPunts];

        document.getElementById("p").innerHTML=logPunts;
        document.getElementById("seg").innerHTML=seguent;
        document.getElementById("cp").innerHTML=logPeca;
    }
    
    
};
//Classe Peça, es on se guradara la forma, color i posicions de la peça i on es faran els metodes de moviment
var Peca = function(forma, color, posX, posY){
    this.forma=forma;
    this.color=color;
    this.posX=posX;
    this.posY=posY;
    //Metoda per rotar
    this.rotarHorari = function(){
        var formaNova = new Array();
            for (var i=0;i<this.forma.length;i++) {
                formaNova[i]=new Array();
                for (var j=0;j<this.forma[i].length;j++) {
                    formaNova[i][j]=this.forma[this.forma[i].length-1-j][i];
                }
            }
            
            for (var i = 3; i>=0;i--){
                for (var e = 0; e<4;e++){
                    if (formaNova[i][e]===1){
                        if(Joc.espai[Joc.pecaActual.posX+i][Joc.pecaActual.posY+e]!==0){
                            i=0;
                            formaNova = this.forma;
                        }
                    }
                }
            }    
            
        this.forma = formaNova;
    };
    //Metoda per moura a la dreta
    this.moureDreta = function(){ 
        for (var i = 3; i>=0;i--){
            for (var e = 0; e<4;e++){
                if (Joc.pecaActual.forma[i][e]===1){
                    if(Joc.espai[Joc.pecaActual.posX+i][Joc.pecaActual.posY+e+1]===1 || Joc.espai[Joc.pecaActual.posX+i][Joc.pecaActual.posY+e+1]==="p"){
                        return false;
                    }
                }
            }
        }

        return true;
    };
    //Metoda per moura a la esquerra
    this.moureEsquerra = function(){
        for (var i = 3; i>=0;i--){
            for (var e = 0; e<4;e++){
                if (Joc.pecaActual.forma[i][e]===1){
                    if(Joc.espai[Joc.pecaActual.posX+i][Joc.pecaActual.posY+e-1]===1 || Joc.espai[Joc.pecaActual.posX+i][Joc.pecaActual.posY+e-1]==="p"){
                        return false;
                    }
                }
            }
        }

        return true;
    };
    //Metoda per moura cap avall
    this.moureAvall = function(){
        for (var i = 3; i>=0;i--){
            for (var e = 0; e<4;e++){
                if (Joc.pecaActual.forma[i][e]===1){
                    if(Joc.espai[Joc.pecaActual.posX+i+1][Joc.pecaActual.posY+e]===1 || Joc.espai[Joc.pecaActual.posX+i+1][Joc.pecaActual.posY+e]==="p"){
                        return false;
                    }
                }
            }
        }

        return true;
    };
};
//Funcio per donar el contingut d'una cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
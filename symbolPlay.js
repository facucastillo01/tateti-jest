//Funcion que recorre todos los simbolos del tablero de entrada,
//  cuenta las apariciones de cada simbolo y 
// retorna el simbolo con el que debe jugar el bot

export default function symbolPlay (board){
    let x = 0;
    let o = 0;
    board.forEach(symbol => {
        switch(symbol){
            case 0:
                break
            case 1: 
                 x++
                 break;
            case 2: 
                o++
                break;
            default:
                console.error("Simbolo Incorrecto");
                break;
        }
    })
    if( o <= x && x-o <=1){
        if(x === o){
            return "X"
        }
        else{
            return "O"
        }
        }
    else{
        console.error("JAJAJA")
    }
}
    
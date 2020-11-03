function showNumAnimation(x,y,N){
    var numbercell=$("#number-cell-"+x+"-"+y);
    numbercell.css('background-color',getNumberBackgroundColor(N));
    numbercell.css('color',getNumberColor(N));
    numbercell.text(N);

    numbercell.animate({
        width:cellWidth,
        height:cellWidth,
        top:getTop(x,y),
        left:getLeft(x,y)
        },100);
}
function showMoveAnimation(fromX,fromY,toX,toY){
    var movenumbercell=$("#number-cell-"+fromX+"-"+fromY);
    movenumbercell.animate({
        top:getTop(toX,toY),
        left:getLeft(toX,toY)
    },200);
}
function updateScore(score){
    $("#totalscore").text(score);
}

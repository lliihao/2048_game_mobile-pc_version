var board = new Array();
var score = 0;
var hasConflict = new Array();
var startx = 0;
var starty = 0;
var endx = 0
var endy = 0;

$(document).ready(function() {
    // function stopScrolling(event) {
    //     event.preventDefault();
    //     }
    // document.addEventListener('touchmove',stopScrolling,false);

    forMobile();
    startGame();

});

function forMobile() {
    if (documentWidth > 500) {
        cellSpace = 20;
        cellWidth = 100;
    } else {
        $("#container").css("width", containerWidth - 2 * cellSpace);
        $("#container").css("height", containerWidth - 2 * cellSpace);
        $("#container").css("padding", cellSpace);
        $("#container").css("border-radius", containerWidth * 0.02);

        $(".grid-cell").css("width", cellWidth);
        $(".grid-cell").css("height", cellWidth);
        $(".grid-cell").css("border-radius", cellWidth * 0.02);
    }
}

function startGame() {
    initial();
    generateOneNumber();
    generateOneNumber();
}

function initial() {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            var getCell = $("#grid-cell-" + i + "-" + j);
            //var getCell = $(document.getElementById("grid-cell-"+i+"-"+j));
            getCell.css('top', getTop(i, j));
            getCell.css('left', getLeft(i, j));
        }


    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflict[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflict[i][j] = false;
        }
    }
    updateBoardView();
    score = 0;
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            $("#container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $("#number-cell-" + i + "-" + j);
            if (board[i][j] == 0) {
                theNumberCell.css("width", '0px');
                theNumberCell.css("height", '0px');
                theNumberCell.css("top", getTop(i, j) + cellWidth / 2);
                theNumberCell.css("left", getLeft(i, j) + cellWidth / 2);


            } else {
                theNumberCell.css("width", cellWidth);
                theNumberCell.css("height", cellWidth);
                theNumberCell.css("top", getTop(i, j));
                theNumberCell.css("left", getLeft(i, j));
                theNumberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color", getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);

            }
            hasConflict[i][j] = false;
        }
    $(".number-cell").css("line-height", cellWidth + 'px');
    $(".number-cell").css("font-size", cellWidth * 0.6 + 'px');

}

function generateOneNumber() {
    if (nospace(board)) {
        return false;
    } else {
        var randomx = parseInt(Math.floor(Math.random() * 4));
        var randomy = parseInt(Math.floor(Math.random() * 4));
        var times = 0;
        while (times < 50) {
            if (board[randomx][randomy] == 0) {
                break;
            } else {
                var randomx = parseInt(Math.random() * 4);
                var randomy = parseInt(Math.random() * 4);
                times++;
            }
        }
        if (times == 50) {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (board[randomx][randomy] == 0) {
                        randomx = i;
                        randomy = j;
                        break;
                    }
                }
            }
        }

        var randomN = Math.random() >= 0.5 ? 2 : 4;
        // if(Math.random()>=0.5){
        //     board[randomx][randomy]=2;
        // }else{
        //     board[randomx][randomy]=4;
        // }
        board[randomx][randomy] = randomN;
        showNumAnimation(randomx, randomy, randomN);
        return true;
    }

}
document.addEventListener("touchstart", function(event) {
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

// document.addEventListener("touchmove",function(event){
//     event.preventDefault();
// });

document.addEventListener("touchend", function(event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;
    var deltaX = endx - startx;
    var deltaY = endy - starty;
    if (Math.abs(deltaX) < 0.3 * documentWidth && Math.abs(deltaY) < 0.3 * documentWidth) {
        return;
    }

    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        if (deltaX > 0) {
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        } else {
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        }
    } else {
        if (deltaY > 0) {
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        } else {
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        }
    }
});

$(document).keydown(function(event) {

    switch (event.keyCode) {
        case 37:
            event.preventDefault();
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 38:
            event.preventDefault();
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 39:
            event.preventDefault();
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 40:
            event.preventDefault();
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        default:
            break;
    }
});

function isGameOver() {
    if (nospace(board) && noMove(board)) {
        setTimeout("gameOver()", 200);
    }
}

function gameOver() {
    alert("Game Over喽~哈哈哈哈哈哈哈哈哈哈哈哈");
}

function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }
    //moveleft
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockH(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        //continue;
                    } else if (board[i][k] == board[i][j] && noBlockH(i, k, j, board) && !hasConflict[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] *= 2;
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflict[i][k] = true;

                        //continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockH(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        //continue;
                    } else if (board[i][k] == board[i][j] && noBlockH(i, j, k, board) && !hasConflict[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] *= 2;
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflict[i][k] = true;
                        //continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockV(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        //continue;
                    } else if (board[k][j] == board[i][j] && noBlockV(j, k, i, board) && !hasConflict[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflict[k][j] = true;

                        //continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockV(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        //continue;
                    } else if (board[k][j] == board[i][j] && noBlockV(j, i, k, board) && !hasConflict[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflict[k][j] = true;
                        //continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}
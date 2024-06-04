document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    
    let squares = []
    let score = 0

    function createBoard() {
        for (let i=0; i< 16; i++){
            let square = document.createElement('div')
            square.classList.add('square')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generateTwo()
        generateTwo()
    }
    
    createBoard()

    function generateTwo(){
        let random = Math.floor(Math.random() * squares.length)
        if (squares[random].innerHTML == 0){
            squares[random].innerHTML = 2
            squares[random].classList.add('new')
            checkLose()
        }
        else generateTwo()
    }

    function moveRight(){
        for (let i = 0; i < 16; i++){
            if(i % 4 === 0 ){ 
                let row = [
                    parseInt(squares[i].innerHTML),
                    parseInt(squares[i+1].innerHTML),
                    parseInt(squares[i+2].innerHTML),
                    parseInt(squares[i+3].innerHTML)
                ]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                console.log(missing);
                let newRow = Array(missing).fill(0).concat(filteredRow)
                console.log(newRow);

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }

    function moveLeft(){
        for (let i = 0; i < 16; i++){
            if(i % 4 === 0 ){ 
                let row = [
                    parseInt(squares[i].innerHTML),
                    parseInt(squares[i+1].innerHTML),
                    parseInt(squares[i+2].innerHTML),
                    parseInt(squares[i+3].innerHTML)
                ]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let newRow = filteredRow.concat(Array(missing).fill(0))

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }
    
    function sumRow(){
        for (let i = 0; i < 15; i++){ 
            if(squares[i].innerHTML == squares[i + 1].innerHTML && squares[i].innerHTML != 0){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i + 1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
                squares[i].classList.add('combine')
            }
        }
    }

    function moveDown(){
        for(let i = 0; i < 4; i++){
            let column = [
                parseInt(squares[i].innerHTML),
                parseInt(squares[i + 4].innerHTML),
                parseInt(squares[i + 8].innerHTML),
                parseInt(squares[i + 12].innerHTML)
            ]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let newColumn = Array(missing).fill(0).concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i + 4].innerHTML = newColumn[1]
            squares[i + 8].innerHTML = newColumn[2]
            squares[i + 12].innerHTML = newColumn[3]
        }
    }

    function moveUp(){
        for(let i = 0; i < 4; i++){
            let column = [
                parseInt(squares[i].innerHTML),
                parseInt(squares[i + 4].innerHTML),
                parseInt(squares[i + 8].innerHTML),
                parseInt(squares[i + 12].innerHTML)
            ]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let newColumn = filteredColumn.concat(Array(missing).fill(0))

            squares[i].innerHTML = newColumn[0]
            squares[i + 4].innerHTML = newColumn[1]
            squares[i + 8].innerHTML = newColumn[2]
            squares[i + 12].innerHTML = newColumn[3]
        }
    }

    function sumColumn(){
        for (let i = 0; i < 12; i++){ 
            if(squares[i].innerHTML == squares[i + 4].innerHTML && squares[i].innerHTML != 0){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 4].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i + 4].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
                squares[i].classList.add('combine')
            }
        }
    }

    var buttons = document.querySelectorAll('.button button');

    buttons[0].addEventListener("click", keyUp);
    buttons[1].addEventListener("click", keyLeft);
    buttons[2].addEventListener("click", keyRight);
    buttons[3].addEventListener("click", keyDown);

    function control(event){
        if(event.keyCode === 39){
            keyRight()
        }else if (event.keyCode === 37){
            keyLeft()
        }else if (event.keyCode === 38){
            keyUp()
        }else if (event.keyCode === 40){
            keyDown()
        }
    }
    document.addEventListener('keyup', control)

    function keyRight(){
        moveRight()
        sumRow()
        moveRight()
        generateTwo()
        checkWin()
    }

    function keyLeft(){
        moveLeft()
        sumRow()
        moveLeft()
        generateTwo()
        checkWin()
    }

    function keyDown(){
        moveDown()
        sumColumn()
        moveDown()
        generateTwo()
        checkWin()
    }

    function keyUp(){
        moveUp()
        sumColumn()
        moveUp()
        generateTwo()
        checkWin()
    }

    function checkWin(){
        for(let i = 0; i < 16; i++){
            if (squares[i].innerHTML == 2048){
                alert('Congratulations!! Refresh the page to play again.')
                document.removeEventListener('keyup', control)
            }
        }
    }

    function checkLose(){
        let numZeros = 0
        for(let i = 0; i < 16; i++){
            if(squares[i].innerHTML == 0){
                numZeros++
            }
        }
        if(numZeros === 0){
            alert('Game Over!! Refresh the page to play again.')
            document.removeEventListener('keyup', control)
        }
    }
})

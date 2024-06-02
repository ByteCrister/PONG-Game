window.addEventListener('DOMContentLoaded', (DOMEvent)=>{

    
let mainDiv = document.querySelector("#main-outer");
let remainingHeart = 5;

let rightBar = mainDiv.children[1];

let rightX = 0;
let rightY = 0;

let leftBar = mainDiv.children[2];

let leftX = 0;
let leftY = 0;

let ball = mainDiv.children[3];

let ballX = 330;
let ballY = 0;

let countOfLifeLeft = 5;


const maxUpperBound = -190;
const maxLowerBound = 190;

const maxForwardLeftBall = -330;
const maxForwardRightBall = 330;
const maxUpBall = -200;
const maxDownBall = 200;

let maxUp;
let maxLow;

let inInterval;

let keyDownInterval;

/*******************************************************/

window.addEventListener('keydown', (e) => {

    console.log(e.key);

    if (e.key == 'ArrowUp' && 10 + maxUpperBound <= leftY) {
        keyDownInterval = setInterval(() => {
            if (e.key == 'ArrowUp' && 10 + maxUpperBound <= leftY) {
                leftBar.style.transform = `translate(${leftX}, ${leftY -= 3}px)`;
                console.log('X - ' + leftX + ', Y - ' + leftY);
            } 

        }, 6)

    }

    if (e.key == 'ArrowDown' && maxLowerBound - 10 >= leftY) {
        keyDownInterval = setInterval(() => {
            if (e.key == 'ArrowDown' && maxLowerBound - 10 >= leftY) {
                leftBar.style.transform = `translate(${leftX}, ${leftY += 3}px)`;
                console.log('X - ' + leftX + ', Y - ' + leftY);
            } 

        }, 6)
    }

})

window.addEventListener('keyup', (e)=>{
    if(e.key == 'ArrowDown' || e.key == 'ArrowUp'){
        clearInterval(keyDownInterval);
    }
})

/*******************************************************/



document.getElementById('heart-' + remainingHeart).classList.add('add-animation');

function minimizeHeart() {

    if (remainingHeart > 0) {

        let child = document.getElementById('heart-' + remainingHeart);
        child.classList.remove('add-animation');
        child.classList.add('last-scale');
        console.log(child);

        setTimeout(() => {
            child.style.transform = 'scale(0)';
            remainingHeart--;

            if (remainingHeart > 0) {
                document.getElementById('heart-' + remainingHeart).classList.add('add-animation');
                console.log('Heart remain : ' + remainingHeart);
                runFirstThrow();
            }
        }, 500);

    }

}






/*****************************************************/
function ballHitsOnLeftBar() {
    maxUp = ballY - 40;
    maxLow = ballY + 40;

    if (ballY < 0) {/* For negative Y value */
        if (leftY <= maxLow && leftY >= maxUp) {
            console.log('In condition maxUp : ' + maxUp + " , maxLow : " + maxLow);
            return true
        } else {
            console.log('In condition maxUp : ' + maxUp + " , maxLow : " + maxLow);
            return false
        }
    } else {/* For positive Y value  */
        if (leftY >= maxUp && leftY <= maxLow) {
            console.log('In condition maxUp : ' + maxUp + " , maxLow : " + maxLow);
            return true
        } else {
            console.log('In condition maxUp : ' + maxUp + " , maxLow : " + maxLow);
            return false
        }
    }
}


function ballHitsOnRightBar() {
    maxUp = ballY - 40;
    maxLow = ballY + 40;

    if (ballY < 0) {/* For negative Y value */
        if (rightY <= maxLow && rightY >= maxUp) {
            console.log('In condition maxUp : ' + maxUp + " , maxLow : " + maxLow);
            return true
        } else {
            console.log('In condition maxUp : ' + maxUp + " , maxLow : " + maxLow);
            return false
        }
    } else {/* For positive Y value  */
        if (rightY >= maxUp && rightY <= maxLow) {
            console.log('In condition maxUp : ' + maxUp + " , maxLow : " + maxLow);
            return true
        } else {
            console.log('In condition maxUp : ' + maxUp + " , maxLow : " + maxLow);
            return false
        }
    }
}
/***********************^^^^^^^^^*********************/


/****************************/
function changeOfRightBar() {
    if (ballX === 0 || ballX === 100 || ballX === 200 || ballX === 300) {
        console.log('Moving rightBar ballX : ' + ballX);
        rightBar.style.transition = '0.2s ease-in-out';
        rightBar.style.transform = `translate(${rightX}px, ${rightY = ballY}px)`;
    }
}
/*****************************/





function rightBarMovement() {
    console.log('rightBarMovement activated');

    rightBar.style.transition = '0s ease-in-out';

    if (Math.floor(Math.random() * 2) === 1) {
        inInterval = setInterval(() => {
            rightBar.style.transform = `translate(${rightX}px, ${--rightY}px)`
            ball.style.transform = `translate(${ballX}px, ${--ballY}px)`
        }, 15)

    } else {

        inInterval = setInterval(() => {
            rightBar.style.transform = `translate(${rightX}px, ${++rightY}px)`
            ball.style.transform = `translate(${ballX}px, ${++ballY}px)`
        }, 15)



    }
}
rightBarMovement()/*<------------ */


let valueForTimeout = Math.floor(Math.random() * 3 + 1);
console.log('valueForTimeout : ' + valueForTimeout);



let firstCallTime;
let linerCoordinate

let increment;

function runFirstThrow() {

    /********** Game starts From here **********/
    setTimeout(() => {

        clearInterval(inInterval);

        /************ For first throw ***********/

        if (Math.floor(Math.random() * 2) === 1) {

            increment = Math.floor(Math.random() * 3 + 1)
            // increment = 0

            console.log('Fist condition runs. : ' + increment);

            firstCallTime = setInterval(() => {
                if (maxForwardLeftBall <= ballX && maxForwardRightBall >= ballX && maxUpBall <= ballY && maxDownBall >= ballY) {

                    ball.style.transform = `translate(${--ballX}px, ${ballY += increment}px)`
                    // rightBar.style.transform = `translate(${rightX}px, ${rightY += increment}px)`

                } else {
                    console.log('previousX : ' + ballX + ", previousY : " + ballY);
                    linerCoordinate = '--X, +Y' /* For lower bound - new direction*/
                    clearInterval(firstCallTime)
                    nextBounds();
                }

            }, 6)

        } else {
            increment = Math.floor(Math.random() * 3 + 1)
            // increment = 0

            console.log('second condition runs : ' + increment);

            firstCallTime = setInterval(() => {
                if (maxForwardLeftBall <= ballX && maxForwardRightBall >= ballX && maxUpBall <= ballY && maxDownBall >= ballY) {

                    ball.style.transform = `translate(${--ballX}px, ${ballY -= increment}px)`
                    // rightBar.style.transform = `translate(${rightX}px, ${rightY -= increment}px)`

                } else {
                    console.log('previousX : ' + ballX + ", previousY : " + ballY);
                    linerCoordinate = '--X, -Y'/* For upper bound - new direction */
                    clearInterval(firstCallTime)
                    nextBounds();
                }

            }, 6)
        }


    }, valueForTimeout * 1000)
}
runFirstThrow()/*<----------------- */


let nextBoundsTime;

function nextBounds() {
    console.log('Bound hits ');
    if (maxDownBall <= ballY) { /* <------ lower bound */
        console.log('maxDownBall runs : ' + ballY);
        ballY = maxDownBall;

        if (linerCoordinate === '--X, +Y' || linerCoordinate === '-X, ++Y') {
            increment = Math.floor(Math.random() * 3 + 1)

            nextBoundsTime = setInterval(() => {

                if (maxForwardLeftBall <= ballX && maxForwardRightBall >= ballX && maxUpBall <= ballY && maxDownBall >= ballY) {
                    ball.style.transform = `translate(${ballX -= increment}px, ${--ballY}px)`
                    changeOfRightBar();
                    // rightBar.style.transform = `translate(${rightX}px, ${--rightY}px)`

                } else {
                    console.log('previousX : ' + ballX + ", previousY : " + ballY);
                    linerCoordinate = '-X, --Y'/* For right to down */
                    clearInterval(nextBoundsTime)
                    nextBounds();
                }
            }, 6)

        } else if (linerCoordinate === '++X, +Y') {   /* connection - 01 */
            increment = Math.floor(Math.random() * 3 + 1)

            nextBoundsTime = setInterval(() => {

                if (maxForwardLeftBall <= ballX && maxForwardRightBall >= ballX && maxUpBall <= ballY && maxDownBall >= ballY) {
                    ball.style.transform = `translate(${++ballX}px, ${ballY -= increment}px)`
                    changeOfRightBar();
                    // rightBar.style.transform = `translate(${rightX}px, ${rightY -= increment}px)`

                } else {
                    console.log('previousX : ' + ballX + ", previousY : " + ballY);
                    linerCoordinate = '++X, -Y'/* For down to right bar */
                    clearInterval(nextBoundsTime)
                    nextBounds();
                }
            }, 6)
        }


    } else if (maxUpBall >= ballY) {/*<------ upper bound */
        console.log('maxUpBall runs : ' + ballY);
        ballY = maxUpBall;

        if (linerCoordinate === '--X, -Y' || linerCoordinate === '-X, --Y') {
            increment = Math.floor(Math.random() * 3 + 1)

            nextBoundsTime = setInterval(() => {

                if (maxForwardLeftBall <= ballX && maxForwardRightBall >= ballX && maxUpBall <= ballY && maxDownBall >= ballY) {
                    ball.style.transform = `translate(${ballX -= increment}px, ${++ballY}px)`
                    changeOfRightBar();
                    // rightBar.style.transform = `translate(${rightX}px, ${++rightY}px)`

                } else {
                    console.log('previousX : ' + ballX + ", previousY : " + ballY);
                    linerCoordinate = '-X, ++Y' /* upper bound from right*/
                    clearInterval(nextBoundsTime)
                    nextBounds();
                }
            }, 6)

        } else if (linerCoordinate === '++X, -Y') {/////////////////
            increment = Math.floor(Math.random() * 3 + 1)

            nextBoundsTime = setInterval(() => {

                if (maxForwardLeftBall <= ballX && maxForwardRightBall >= ballX && maxUpBall <= ballY && maxDownBall >= ballY) {
                    ball.style.transform = `translate(${++ballX}px, ${ballY += increment}px)`;
                    changeOfRightBar();
                    // rightBar.style.transform = `translate(${rightX}px, ${rightY += increment}px)`

                } else {
                    console.log('previousX : ' + ballX + ", previousY : " + ballY);
                    linerCoordinate = '++X, +Y' /* upper bound from left*/
                    clearInterval(nextBoundsTime)
                    nextBounds();
                }
            }, 6)
        }
    }


    else if (maxForwardLeftBall >= ballX) {

        console.log('maxForwardLeftBall runs : ' + ballX);
        ballX = maxForwardLeftBall;

        if (ballHitsOnLeftBar()) {

            console.log("Ball touched on the left bar");

            if (linerCoordinate === '-X, --Y') {
                increment = Math.floor(Math.random() * 3 + 1)

                nextBoundsTime = setInterval(() => {

                    if (maxForwardLeftBall <= ballX && maxForwardRightBall >= ballX && maxUpBall <= ballY && maxDownBall >= ballY) {
                        ball.style.transform = `translate(${++ballX}px, ${ballY -= increment}px)`
                        rightY = leftY;
                        // rightBar.style.transition= '0.1s ease-in-out';
                        changeOfRightBar();
                        rightBar.style.transform = `translate(${rightX}px, ${rightY}px)`

                    } else {
                        console.log('previousX : ' + ballX + ", previousY : " + ballY);
                        linerCoordinate = '++X, -Y'/* For left bar to up bound */
                        clearInterval(nextBoundsTime)
                        nextBounds();
                    }
                }, 6)

            } else if (linerCoordinate === '-X, ++Y') { /* connection - 01 */
                increment = Math.floor(Math.random() * 3 + 1)

                nextBoundsTime = setInterval(() => {

                    if (maxForwardLeftBall <= ballX && maxForwardRightBall >= ballX && maxUpBall <= ballY && maxDownBall >= ballY) {
                        ball.style.transform = `translate(${++ballX}px, ${ballY += increment}px)`
                        rightY = leftY;
                        // rightBar.style.transition= '0.1s ease-in-out';
                        changeOfRightBar();
                        rightBar.style.transform = `translate(${rightX}px, ${rightY += increment}px)`

                    } else {
                        console.log('previousX : ' + ballX + ", previousY : " + ballY);
                        linerCoordinate = '++X, +Y'/* For left bar to low bound */
                        clearInterval(nextBoundsTime)
                        nextBounds();
                    }
                }, 6)

            }


        } else {
            console.log("Ball not touched - game end");
            clearInterval(nextBoundsTime)

            setTimeout(() => {

                rightX = rightY = leftX = leftY = ballY = 0;
                ballX = 330
                leftBar.style.transform = `translate(${leftX}, ${leftY}px)`;

                rightBar.style.transform = `translate(${rightX}, ${rightY}px)`;
                minimizeHeart();
            }, 1000);

        }


    } else if (maxForwardRightBall <= ballX) {

        console.log('maxForwardRightBall runs : ' + ballX);
        ballX = maxForwardRightBall


        if (ballHitsOnRightBar()) {
            console.log('Right hits the ball');

            if (linerCoordinate === '++X, +Y') {   /* connection - 01 */
                increment = Math.floor(Math.random() * 3 + 1)

                nextBoundsTime = setInterval(() => {

                    if (maxForwardLeftBall <= ballX && maxForwardRightBall >= ballX && maxUpBall <= ballY && maxDownBall >= ballY) {
                        ball.style.transform = `translate(${--ballX}px, ${ballY += increment}px)`
                        // rightBar.style.transform = `translate(${rightX}px, ${rightY += increment}px)`

                    } else {
                        console.log('previousX : ' + ballX + ", previousY : " + ballY);
                        linerCoordinate = '--X, +Y'/* Lower bound  to right bound */
                        clearInterval(nextBoundsTime)
                        nextBounds();
                    }
                }, 6)
            } else if (linerCoordinate === '++X, -Y') {
                increment = Math.floor(Math.random() * 3 + 1)

                nextBoundsTime = setInterval(() => {
                    if (maxForwardLeftBall <= ballX && maxForwardRightBall >= ballX && maxUpBall <= ballY && maxDownBall >= ballY) {

                        ball.style.transform = `translate(${--ballX}px, ${ballY -= increment}px)`
                        // rightBar.style.transform = `translate(${rightX}px, ${rightY -= increment}px)`

                    } else {
                        console.log('previousX : ' + ballX + ", previousY : " + ballY);
                        linerCoordinate = '--X, -Y'/* For upper bound - new direction */
                        clearInterval(nextBoundsTime)
                        nextBounds();
                    }

                }, 6)

            }
        } else {
            console.log("Ball not touched - game end");
            clearInterval(nextBoundsTime)

            setTimeout(() => {

                rightX = rightY = leftX = leftY = ballY = 0;
                ballX = 330
                leftBar.style.transform = `translate(${leftX}, ${leftY}px)`;
                rightBar.style.transform = `translate(${rightX}, ${rightY}px)`;
                if (remainingHeart !== 0) {
                    runFirstThrow();
                }
            }, 1000);
        }



    }
}


})

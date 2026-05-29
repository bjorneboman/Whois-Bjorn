const canvas = document.getElementById("glitchy-bjorn")
canvas.width = 440
canvas.height = 532
const ctx = canvas.getContext("2d")

const img = new Image()
img.src = "./src/temp-bjorn-400.png"
img.width = 400
img.height = 532

ctx.drawImage(img, 0, 0, 400, canvas.height, 20, 0, 400, canvas.height)

function draw(startRow, height) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let row = 0; row < canvas.height; row+=3){
        let shift = 20
        if(row >= startRow && row < (startRow + height)) shift = Math.floor(Math.random() * 40)
        ctx.drawImage(img, 0, row, 400, 3, shift, row, 400, 3)
    }
}

function sweep(pos, height = 20){
    ctx.clearRect(0, pos, canvas.width, height)
}

let startTime = null
let glitchPause = 0
let sweepPos = canvas.height
let sweepHeight = 40

function frame(timestamp){
    if(!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    
    let glitchHeight = 0
    let glitchStartRow = canvas.height

    if(elapsed > glitchPause){
        glitchHeight = Math.floor(Math.random()*200)
        glitchStartRow = Math.floor(Math.random()*(canvas.height - glitchHeight))
        
        glitchPause = Math.floor(Math.random()*1000)
        startTime = null
    }
    
    draw(glitchStartRow, glitchHeight)
    sweep(sweepPos, sweepHeight)
    sweepPos -= 1
    if(sweepPos < 0 - sweepHeight) sweepPos = canvas.height    

    requestAnimationFrame(frame)
}

requestAnimationFrame(frame)
    

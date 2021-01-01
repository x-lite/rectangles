class ShadedRectangles {

    maxX: number
    maxY: number
    delay: number
    vertical: boolean

    //  Set up the rectangle drawing routine - keeping track of the border and how fast to draw*
    //  How fast is determined by how long we wait (the delay) each time we finish drawing a new dot
    constructor(maxxX: number, maxxY: number, verticle: boolean, delay: number) {
        this.maxX = maxxX
        this.maxY = maxxY
        this.delay = delay
        this.vertical = verticle
    }
    
    //  The main loop that draws the rectangle as a set of vertical or horizontal lines (configurable)
    run() {
        let i: number;
        if (this.vertical) {
            for (i = 0; i < this.maxX + 1; i++) {
                this.drawVerticalLine(0, this.maxY, i)
            }
        } else {
            for (i = 0; i < this.maxY + 1; i++) {
                this.drawHorizontalLine(0, this.maxX, i)
            }
        }
        
    }
    
    /** # A set of functions for drawing the lines of a rectangle */
    public drawVerticalLine(start: number, end: number, x: number) {
        for (let y = start; y < end + 1; y++) {
            led.plot(x, y)
            pause(this.delay)
        }
    }
    
    public drawHorizontalLine(start: number, end: number, y: number) {
        for (let x = start; x < end + 1; x += 1) {
            led.plot(x, y)
            pause(this.delay)
        }
    }
    
}

/** 
# The concentricRectangles class draws a shaded rectangle by drawing rectangles within rectangles until there 
# are no more lights to light
#
# The algorithm is aware of the display resolution and so can 'crudely' determine how many rectangles
# it needs to draw based on the size of the outer rectangle

 */
class ConcentricRectangles {
    maxX: number
    maxY: number
    delay: number
    //  Set up the rectangle drawing routine - keeping track of the border and how fast to draw*
    //  How fast is determined by how long we wait (the delay) each time we finish drawing a new dot
    constructor(maxX: number, maxY: number, delay: number)  {
        this.maxX = maxX
        this.maxY = maxY
        this.delay = delay
    }
    
    //  The main loop that draws the rectangle and fills it in with a set of 'ever' decreasing rectangles
    public run() {
        let numberOfLoops = 0
        //  Crudely determine how many rectangles we need to draw
        if (this.maxX < 2 || this.maxY < 2) {
            numberOfLoops = 1
        } else if (this.maxX == 2 || this.maxY == 2) {
            numberOfLoops = 2
        } else {
            numberOfLoops = 3
        }
        
        //  Draw each rectangle, one at a time, starting at the outer rectangle 
        for (let i = 0; i < numberOfLoops; i++) {
            this.topEdge(i, this.maxX, i)
            this.rightEdge(i + 1, this.maxY, this.maxX)
            this.bottomEdge(this.maxX - 1, i, this.maxY)
            this.leftEdge(this.maxY, i, i)
            this.maxX = this.maxX - 1
            this.maxY = this.maxY - 1
        }
    }
    
    /** # A set of functions for drawing the edges of a rectangle */
    public leftEdge(start: number, end: number, fixedX: number) {
        for (let y = start; y > end - 1; y += -1) {
            led.plot(fixedX, y)
            pause(this.delay)
        }
    }
    
    public bottomEdge(start: number, end: number, fixedY: number) {
        for (let x = start; x > end - 1; x += -1) {
            led.plot(x, fixedY)
            pause(this.delay)
        }
    }
    
    public topEdge(start: number, end: number, fixedY: number) {
        for (let x = start; x < end + 1; x++) {
            led.plot(x, fixedY)
            pause(this.delay)
        }
    }
    
    public rightEdge(start: any, end: number, fixedX: number) {
        for (let y = start; y < end + 1; y=y+1) {
            led.plot(fixedX, y)
            pause(this.delay)
        }
    }
    
}

function shadedRunner() {
    new ShadedRectangles(randint(1, 4), randint(1, 4), Math.randomBoolean(), randint(10, 250)).run()
}

function concentricRunner() {
    new ConcentricRectangles(randint(1, 4), randint(1, 4), randint(10, 250)).run()
}

basic.clearScreen()

while (true) {
   shadedRunner()
   pause(300)
   basic.clearScreen()
   concentricRunner()
   pause(300)
   basic.clearScreen()
}

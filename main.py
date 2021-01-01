class ShadedRectangles:

    # Set up the rectangle drawing routine - keeping track of the border and how fast to draw*
    # How fast is determined by how long we wait (the delay) each time we finish drawing a new dot
    def __init__(self, maxxX, maxxY, verticle, inDillay):
        self.maxX = maxxX
        self.maxY = maxxY
        self.dillay = inDillay
        self.vertical = verticle
    
    
    # The main loop that draws the rectangle as a set of vertical or horizontal lines (configurable)
    def run(self):

        if self.vertical:
            for i in range(self.maxX+1):
                self.drawVerticalLine(0, self.maxY, i)
        else:
            for i in range(self.maxY+1):
                self.drawHorizontalLine(0, self.maxX, i)
        
    '''
    # A set of functions for drawing the lines of a rectangle
    '''
    def drawVerticalLine(self, start, end, x):
        for y in range(start,end+1):
            led.plot(x, y)
            pause(self.dillay)   
            
    def drawHorizontalLine(self, start, end, y):
        for x in range(start,end+1,1):
            led.plot(x,y)
            pause(self.dillay)   
            

'''
# The concentricRectangles class draws a shaded rectangle by drawing rectangles within rectangles until there 
# are no more lights to light
#
# The algorithm is aware of the display resolution and so can 'crudely' determine how many rectangles
# it needs to draw based on the size of the outer rectangle
'''
class concentricRectangles:


    # Set up the rectangle drawing routine - keeping track of the border and how fast to draw*
    # How fast is determined by how long we wait (the delay) each time we finish drawing a new dot
    def __init__(self,maxX, maxY,delay):
        self.maxX = maxX
        self.maxY = maxY
        self.delay = delay
    

    # The main loop that draws the rectangle and fills it in with a set of 'ever' decreasing rectangles
    def run(self):
        
        numberOfLoops = 0
        
        # Crudely determine how many rectangles we need to draw
        if self.maxX < 2 or self.maxY < 2:
            numberOfLoops = 1
        elif self.maxX == 2 or self.maxY == 2:
            numberOfLoops = 2
        else:
            numberOfLoops = 3
            
        # Draw each rectangle, one at a time, starting at the outer rectangle 
        for i in range(numberOfLoops):
            
            self.topEdge(i, self.maxX, i)
            self.rightEdge(i+1, self.maxY, self.maxX)
            self.bottomEdge(self.maxX - 1, i, self.maxY)
            self.leftEdge(self.maxY, i, i)
            
            self.maxX=self.maxX-1 
            self.maxY=self.maxY-1

    '''
    # A set of functions for drawing the edges of a rectangle
    '''
    def leftEdge(self, start, end, x):
        for y in range(start,end-1,-1):
            led.plot(x, y)
            pause(self.delay)   
        
    def bottomEdge(self, start, end, y):
        for x in range (start,end-1,-1):
            led.plot(x, y)
            pause(self.delay)   
        
    def topEdge(self, start, end, y):
        for x in range (start,end+1):
            led.plot(x, y)
            pause(self.delay)   

    def rightEdge(self, start, end, x):
        for y in range(start,end+1):
            led.plot(x, y)
            pause(self.delay)   
    
def shadedRunner():
    ShadedRectangles(
            randint(1,4),
            randint(1,4), 
            Math.random_boolean(),
            randint(10,250)
    ).run()


while True:

    shadedRunner()
    pause(300)
    basic.clear_screen()
    

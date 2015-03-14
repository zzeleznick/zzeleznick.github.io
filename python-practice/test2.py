def readNumber ():
    '''Returns a number if valid
    throws error message if invalid'''
    number = float(input("Enter a float number: "))
    return number

while True:
    try:
        print (readNumber())
    except:
        print("INVALID INPUT")
    '''finally:
        print("Done")'''
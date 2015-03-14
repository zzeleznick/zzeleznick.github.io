''' view.py returns all files and directories in the given path
'''
import sys, os

class zDoc(object):
    """docstring for nice functions"""
    def __init__(self, z):
        self.z = z
    def __call__(self, *args, **kwargs):
        print "Entering function " + self.z.__name__
        i=0
        if len(args) == 0:
            print "NOTE: no args passed in"
        for arg in args:
            print "arg {0}: {1}".format(i, arg)
            i =i+1
        return self.z(*args, **kwargs)


@zDoc
def view_dir(path = '.'):
    names = os.listdir(path)
    names.sort()
    for name in names:
            print(name)
    print(' ')

if __name__ == '__main__':
    view_dir(sys.argv[1])
    #argv ['view.py', '/']


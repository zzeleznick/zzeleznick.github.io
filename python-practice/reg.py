'''
Given input of a file, reg.py returns the most commmonly used
word.

BASIC USAGE: python reg.py FILE
FULL USAGE: python reg.py [-h] [-v VERBOSE ] FILE

VERBOSE will allow the user to find the most commmonly used words up to the limit of all unique words.
'''
import argparse
import re
def uniqueWordsCount(text):
    '''
    Returns the number of unique words
    non-latin words are excluded, and
    case is non-exclusive
    '''
    pattern = re.compile(r"""
        \s*                 # Skip leading whitespace
        [a-zA-Z]+           # any letter
        [\s\-\n]+           # space hyphen or newline
    """, re.VERBOSE)
    print 'running uniqueWordsCount'
    i = 0
    wordCount = 0
    wordDict = {}
    with open(text, 'r') as f:
        for line in f:
            i+=1
            matches = pattern.findall(line.strip(' \t\n')) #strip any spaces, tabs, newlines in pattern
            wordCount += len(matches)
            print matches
            print line
            for match in matches:
                if wordDict.__contains__(match):
                    wordDict.__setitem__(match, wordDict.get(match) + 1)
                else:
                    wordDict.__setitem__(match, 1)
            if i == 20 :
                break
    print 'total word count = ' + str(wordCount)
    print 'unique word count = ' +str(wordDict.__len__())
    print 'end of uniqueWordsCount'

if  __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("file", help="display the number and word of unique words in a textfile")
    parser.add_argument("-v", "--verbosity", action="count", default=0, help="increase output verbosity")
    args = parser.parse_args()
    print args
    ''' if args.verbosity >= 2:
        #print("the square of {} equals {}".format(args.square, answer))
    elif args.verbosity >= 1:
        #print("{}^2 == {}".format(args.square, answer))
    else:
        #print(answer)
    '''
    uniqueWordsCount(args.file)
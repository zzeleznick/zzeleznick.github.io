'''
Given input of a file, reg.py returns the most commmonly used
word.

BASIC USAGE: python reg.py FILE
FULL USAGE: python reg.py [-h] [-v VERBOSE ] FILE

VERBOSE will allow the user to find the most commmonly used words up to the limit of all unique words.
'''
import argparse
import re
import operator
def uniqueWordsCount(text):
    '''
    Returns the number of unique words
    and the dictionary with all words
    non-latin words are excluded, and
    case is non-exclusive
    '''
    pattern = re.compile(r"""
        \s*                 # Skip leading whitespace
        [a-zA-Z]+           # any letter
        [\s\-\n]+           # space hyphen or newline or colon
    """, re.VERBOSE)
    rx = re.compile(r"""
        [:,\.]*             # hyphen or newline, comma, colon
    """, re.VERBOSE)
    print 'running uniqueWordsCount'
    i = 0
    wordCount = 0
    wordDict = {}
    with open(text, 'r') as f:
        for line in f:
            i+=1
            trimline = re.sub(rx, '', line)
            matches = pattern.findall(trimline)
            wordCount += len(matches)
            #print matches
            #print line
            for match in matches:
                match = match.strip(' \n') #remove spaces and newlines from matches in dict
                if wordDict.__contains__(match):
                    wordDict.__setitem__(match, wordDict.get(match) + 1)
                else:
                    wordDict.__setitem__(match, 1)
            #if i == 10 :
            #    break
    print 'total word count = ' + str(wordCount)
    print 'unique word count = ' +str(wordDict.__len__())
    #print wordDict
    print 'end of uniqueWordsCount'
    return wordDict

def commonWords(mydict, limit):
    '''
    Returns the most
    frequent words in a dictionary
    and the count up to a limit
    as the number of words to return
    '''
    count = 0
    print 'limit passed as ' + str(limit)
    #print 'length as ' + str(mydict.__len__())
    #print limit > mydict.__len__()
    if limit > mydict.__len__():
        limit = mydict.__len__()
        print 'limit exceeded. default to total words at: ' + str(limit)
    sorted_x = sorted(mydict.items(), key=operator.itemgetter(1), reverse=True)
    for item in sorted_x:
        #tmp = max(mydict.iteritems(), key=operator.itemgetter(1)) # {'key', value} for max val
        print item
        count+=1
        if count == limit:
            break
    print 'end of output'


if  __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("file", help="display the number and word of unique words in a textfile")
    parser.add_argument("lim", help="display the number of common words to display", type=int, nargs='?', default=1)
    parser.add_argument("-v", "--verbosity", action="count", default=0, help="increase output verbosity")
    args = parser.parse_args()
    #print args
    ''' if args.verbosity >= 2:
        #print("the square of {} equals {}".format(args.square, answer))
    elif args.verbosity >= 1:
        #print("{}^2 == {}".format(args.square, answer))
    else:
        #print(answer)
    '''
    x = uniqueWordsCount(args.file)
    #print args.lim
    commonWords(x, args.lim)
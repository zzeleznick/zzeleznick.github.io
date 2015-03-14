#!/usr/bin/env python3
import os
import os.path
import requests

def download(url):
    '''Download the given url and saves it to the current directory.

    :arg url: URL of the file to be downloaded.
    '''
    # First ensure input is a string
    if url[0:7] != 'http://':
        url = 'http://' + url

    req = requests.get(url)
    # Second let us check non existing files.
    if req.status_code == 404:
        print('No such file found at %s' % url)
        return
    filename = url.split('/')[2] + '.html'
    with open(filename, 'wb') as fobj:  #w -> write, b -> in binary
        fobj.write(req.content)
    print("Download over.")

if __name__ == '__main__':
    url = input('Enter a URL:')
    download(url)
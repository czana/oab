#!/usr/bin/env python

import sys
import os

sound_path = sys.argv[1]
os.system('mpg321 ' + sound_path + ' &')

#! /usr/bin/python3

import cgi
import cgitb

cgitb.enable()

print("Content-Type: text/html\n")
print()

print("<TITLE>CGI script</TITLE>")
print("<h1>test</h1>")

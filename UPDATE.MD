Rune Updates:

I was able to find out what was wrong.

Remember we had the issue if we were going to have two entries on line 5 or one on 5 and one on 13.
Turns out that it was needed to have them both on 5.
I also added the autoswagger as a dependancy in the package.json file.
I added the swagger to the script in the server.js file, and made a small change on line 29. It seems to work so I guess its ok.
I added the api-docs link to the navigation in nav.ejs.



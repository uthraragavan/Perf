
### Setup Instructions to host your own web server
* **Node JS for localhost web server**:  Install Node JS by following instructions from here https://nodejs.org/en/download/
* **Ngrok for webserver over proxy**: Install ngrok by following instructions from here: https://ngrok.com/download
* **Gulp as build configuration tool**: From Node JS command prompt, install gulp by following instructions from here: https://www.npmjs.com/package/gulp-download
* **Gulp modules required to run our web app**: From Node JS command prompt, install the following gulp modules:
    * gulp-uglify'
    * gulp-rename
    * gulp-clean-css
    * gulp-imagemin
    * gulp-image-resize
    * gulp-htmlmin
    * browser-sync
    * ngrok
    * run-sequence

### Starting Web App and Measuring Page Speed
##### Measuring page speed from github server
* The web app is hosted on https://uthraragavan.github.io/Perf/
* Enter the above url here https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2F0e34821d.ngrok.io%2F&tab=mobile to measure the page speed.

##### Measuring page speed by hosting your own web server on ngrok

* **Download the project assets from Github**: https://github.com/uthraragavan/Perf
* **Starting web app**: From Node JS command prompt, navigate to the project asset folder on your system and type gulp. This will start the web app over ngrok proxy. A browser window showing index.html from dist folder shows up.
* **Measuring page speed insight**: The gulp command from command prompt should display something like this:
 ```
[16:03:04] Using gulpfile ~\Desktop\Udacity\FrontEnd\Performance\gulpfile.js
[16:03:04] Starting 'webhost'...
[16:03:04] Starting 'browser-sync'...
[16:03:04] Finished 'browser-sync' after 43 ms
[16:03:04] Starting 'ngrok-url'...
serving your tunnel from: **https://0e34821d.ngrok.io
[16:03:06] Finished 'ngrok-url' after 1.67 s
[16:03:06] Finished 'webhost' after 1.73 s
[16:03:06] Starting 'default'...
[16:03:06] Finished 'default' after 34 μs
[BS] Access URLs:
 --------------------------------------
       Local: http://localhost:3000
    External: http://192.168.0.105:3000
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.0.105:3001
 --------------------------------------
[BS] Serving files from: ./dist
```
* **Measure page speed from Google's page speed page**: From the above output, enter the url from here - **serving your tunnel from: https://0e34821d.ngrok.io** in Google’s page speed tools web page:
https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2F0e34821d.ngrok.io%2F&tab=mobile

### Changes Made to Acheive Website Optimization
#### index.html
* **Remove render blocking CSS**: Asynchronously load style.css and add media attribute to print.css
```
<link rel="preload" href="css/style.css" as="style" onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="css/style.css"></noscript>
<link href="css/print.css" rel="stylesheet" media="print">
```
* **Remove render blocking JS**: Asynchronously load the javascript for Open Sans web font, analytics.js and perfmatters, at the footer of index.html:
```
<script src="http://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js" async>
</script>
<script type="text/javascript">
WebFont.load({
            google: {
              families: ['Open Sans']
            }
          });
</script>
<script src="http://www.google-analytics.com/analytics.js" async></script>
<script async src="js/perfmatters.js"></script>
```
#### views/js/main.js
 Declaring global variables
```
var rpc = document.querySelectorAll(".randomPizzaContainer");
var windowWidth = document.querySelector("#randomPizzas").offsetWidth;
```
and local variable
```
var st = document.body.scrollTop;
```
to be used inside functions ```changePizzaSizes```, ```determineDx``` and ```updatePositions```.
#### Others
* **Minify**: Minify all the project assets such as css, js, images and html files.
* **Image resize**: Resize image src/views/images/pizzeria.jepg to 360 X 270 by running img-resize gulp task. Also resize image src/views/images/pizzeria.jepg to 115 X 75 and saving it as pizzeria-thumb.jepg.


#Doppler Effect README

##Usage Instructions
Please load this in brackets or similar, there will be a CORS error on the canvas element unless the site is running on a server of some sort.

This web app is meant to demostrate the doppler effect. Use the scale or the input box to change values that correspond to velocity. Both the scale and the input box accept numerical values between 0 and 100. 

Positive values represent moving away from the observer. Negative values represent moving towards the observer.  The app provides more detail on the blue side of the spectrum.

##Project Architecture
For my view I chose a simple HTML / CSS setup with Bootstrap and jQuery. My controller is a simple JS file, which also doubles as the model. This is tradeoff for simplicity, since this particular problem does not warrant a very complex MVC architecture in my opinion.

* Ruled out using a front end framework like Angular or React because the project really does not need any routing / extensive data-binding or DB interaction.
* Ruled out a DB since there is really no need to save state here. Users will likely be just fine with starting at initial state every time.  
* Utilized jQuery because it can be served through CDN with minimal impact on load times, is very small and makes DOM manipulation a lot easier than pure JavaScript.
	* Saves time without hurting loadtimes.
* Utilized BootStrap because it can be served through CDN with minimal impact on load times, is very small and gives me grid layout, some responsiveness and some handy CSS.
	* Saves time without hurting loadtimes.
* Utilized canvas html element for color manipulation using javascript. I feel like this step can be further improved with some sort of drawing framework but I feel like it does the job fairly well.

##Development Best Practices
List of selected best practices used:

* HTML
	* Viewport width specified
	* Apple touch icon specified - allowing for saving to home screen
	* CDNs were used to rely on caching and reduce load times
	* Images have been compressed to save load time
	* Less than IE8 warning added
	* All closing divs are labled
	* Ran through HTML validator
* CSS
	* Sections are clearly labled
	* Browser prefixes used where necessary
	* Media queries on the bottom
	* Ran through CSS validator
* JS
	* Sections are clearly labled
	* Used "TODOs" to explain what work remains undone
	* Ran through JS synthax validator
* General
	* Ran usability testing with folks sitting nearby to find bugs
	* Ran the site on Chrome, Opera, Safari and Edge
	* Ran the site on Desktop, iPhone and iPad.
	
##Misc
Please don't forget to open the console to check for any errors. There may be a little easter egg in there for the curious student and or interviewer :)  [May require disabling the popup blocker.]

I know there is a bit of a sluggishness on the color update when using up and down errows in the input box.  This is definately a TODO.



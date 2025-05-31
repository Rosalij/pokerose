# Restaurant pokerose frontend customer website and CMS
## This is a website built with Vite and represents a restaurant. The website has two different parts - one for the public and one CMS part for the staff of the restaurant
to be able to log in as admin at /login and change information on the public webpage dynamically, in the food and drink menu, in the image gallery, and see and delete current takeaway orders.
The website uses a web service: 
Link to the API gitHub and README: (https://github.com/Rosalij/pokerose_restaurantAPI.git)
Published restaurant website: (https://pokerose.netlify.app/)

Clone the repository and run npm install to install the necessary packages. 

Authorization and authentication for admin pages are managed with REST API and JSON Web Token validation.

The JSON web token is stored in local Storage upon login and is removed upon logout.

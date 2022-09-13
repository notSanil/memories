# memories
Basic Layout of the page will include a login form, which will be responsible for taking the input credentials of the user who is attempting to login into the service portal. The login page ensures that the user is unique which helps in load balancing on the backend of the service and ensures that the page is up and running at all times, reducing the likeliness of a backend failure. 

The login page uses Google OAuth2.0 which then encrypts the information and helps us retain the privacy of the user. An essential component by which we maintain the privacy of our users is the way we handle their data at the backend, our server has no plaintext access to the information which is provided by the users. This will in turn maintain the anonymity of the service.



Another page which is paramount to the service is the registration page. We have to ensure the user at the other end is not some bot with minimum data input, as logistics and datamining is something which undermines the usage of a service. We, as a team do not support selling data. We eliminate any web bots by using a simple puzzle which randomly changes itself every time making it virtually impossible for a bot to be trained to complete. Some of the puzzles are, deciphering the text, labeling the orientation of the image and correcting it, identifying the black and white images. After a user has successfully passed these, their account in now registered and added to the data base where a foreign key is used to keep track of the accounts table. 



The landing page will work in collaboration with the database table which will collect the account token for the user and take them to their designated account page. The database at the backend will retrieve all the entries made by the user and will display the content. The option to turn the filters on and off will be worked into the bundle. The page displays a collection of images which will be fetched from the backend. 



Machine learning model will be the basis on which the filter works, enabling the option to collect photos according to the people who appear in them. This will grant the ability to enable to group photos according to the people who appear in them. Using the model to learn classification based on predictive analysis is the objective of the project here. The template holding the page together is to create and explore a platform where ideas are embedded in forms of bulletin pins. Being able to store photos and to be able to filter them. 



Another idea in progress is the feature enabling auto image captions based on analysis of content in the photos. Searching based on the caption generated is also possible. The database will feature an additional section which will include grouping based on the Auto-Captions generated. Overtime according to milestones, the service will provide highlights, star moments based on the date, content and the composition of the photos. A photo processing and imaging model will be present at the end of the project. 


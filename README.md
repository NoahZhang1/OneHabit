# OneHabit


<p align="left">
	<a href="https://docs.npmjs.com/cli/v9/commands/npm-version"><img img src="https://img.shields.io/badge/npm-9.4.0-green"/></a
  	<a href="https://nodejs.org/en/blog/release/v16.14.2/"><img img src="https://img.shields.io/badge/node-16.14.2-green"/></a>
 
note: please go to master branch for development
	
# A Template Page for CS4261 Team Turkey


### Quick Start to Start Local Testing
please refer to https://docs.expo.dev/get-started/installation/ for installation and set up

After finishing setup, enter

`npx expo whoami`

Should give youyoru account name.

Example:

```console
zyn92@NoahPC:~$ npx expo whoami
noahzhang
```

Set up yourself up with Amplify Studio https://docs.amplify.aws/console/

When asked to enter access key, enter the following credential:


### Quick Guide on Development Setup
Run

`npm install`
	
`npx expo start`

After all prerequisite and you should see a sample page setup on your app "Expo GO"	

### Files and Directories:

The architecture of files and directories are as follows:

* assets
* Amplify
* src/ 
    * components/
		* CustomButton/
			* CustomButton.js
			* index.js
		* CustomButton/
		 	* CustomInput.js
			* index.js
	* navigation/
		* index.js
	* screen/
		* HomeScreen/
			* Homescreen.js
			* index.js
		* SignInScreen/
			* SigninScreen.js
			* index.js
	aws-exports.js
* .gitignore
* App.js
* README.md
* app.json
* babel.config.js
* package-lock.json
* package.json



### Dev Guide:


Go to https://docs.amplify.aws to make sure you installed all the prerequisite package for AWS Amplify.




# React Native Starter Kit 🚀

Bootstrap your app development by using this awesome react native starter kit, integrated with Firebase Auth and Facebook Login. Clone this boilerplate app to get you up and running quickly.

## Fully working features

- Login with Facebook
- Sign in with Google
- User Management with Firebase Auth
- Firebase Firestore Integration
- Email/Password Registration
- Persistent Login Credentials (a.k.a Remember password)
- Logout Functionality
- Beautiful UI and transitions

## App Designs

<a href="https://www.instamobile.io/app-templates/react-native-starter-kit-firebase/">
	<img src="https://www.instamobile.io/wp-content/uploads/2019/01/Simulator-Screen-Shot-iPhone-XS-2019-01-20-at-16.00.46-473x1024.png" alt="react native splash screen" width="210" height="456" /></a>
<a href="https://www.instamobile.io/app-templates/react-native-starter-kit-firebase/">
	<img src="https://www.instamobile.io/wp-content/uploads/2019/01/Simulator-Screen-Shot-iPhone-XS-2019-01-20-at-16.17.53-473x1024.png" alt="react native starter kit welcome" width="210" height="456"/></a>
<a href="https://www.instamobile.io/templates">
	<img src="https://www.instamobile.io/wp-content/uploads/2019/01/Simulator-Screen-Shot-iPhone-XS-2019-01-20-at-16.18.34-473x1024.png" alt="react native starter kit firebase" width="210" height="456" /></a>
<a href="https://www.instamobile.io">
	<img src="https://www.instamobile.io/wp-content/uploads/2019/01/Simulator-Screen-Shot-iPhone-XS-2019-01-20-at-16.18.39-473x1024.png" alt="registration screen firebase react native" width="210" height="456" /></a>

## Google signin

- when signing in with google on android and you get "developer_error google sign in".
- take the following steps:

      	* in the command line, enter:
      		keytool -exportcert -list -v -alias androiddebugkey -keystore ~/.android/debug.keystore

      	*  when prompted for password, enter:
      		android

      	* you should successfully generate some keys.
      	* copy the "SHA1:" key
      	* visit firestore console in your browser
      	* under settings>>Project settings select "RN Starter Kit Android"
      	* click "add fingerprint"
      	* paste the copied "SHA1:" key

      	* then rebuild app
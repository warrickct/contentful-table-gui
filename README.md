# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

## Usage Within Contentful

This web application is designed to be used within Contentful and uses the Contentful UI Extension SDK to set and retrieve values.

The github hosted version of this application uses the gh-pages branch which has an unrelated git commit history to the normal development and master branches. In order to update the gh-pages branch follow the following steps for all stages:

### 1. Github Setup

In order for this extension to be accessed by Contentful, it needs to be externally hosted. This is done via Github pages.

1. Go to this repositories settings and enable github pages.
2. Copy the URL from the github pages setup and paste the github hub pages URL in the `package.json` of this repostiory in the `homepage` property (should be near the bottom of the package.json).

### 2. Local Setup

1. Git clone / download the repository
2. Install the dependencies using `npm i`
3. Run the deployment command `npm run deploy`

This will build and deploy the web application to the gh-pages branch of the repository and allow it to be accessed by Contentful UI Extensions.


### 3. Contentful Setup
To add this as a UI extension to your Contentful Space

1. Navigate to `<your contentful space>` > `settings` > `extensions` 
2. Click add extension
3. Create a name
4. Uncheck all field types apart from Object
5. Select self-hosted (src)
6. Provide the self-hosted URL of this gh-pages web application or from step 2 under the Github setup section of this readme. (Found in the blurb for this repo).

### 4. Adding to a Contentful Content Model

1. Navigate to the content model to add a field to
2. Select `add field`
3. Select `JSON object`
4. Create a name and field ID.
5. Click `create and configure`
6. Go to the Appearance tab of the modal.
7. Select `Editable Table UI Extension` (should be based off the name given when adding the extension in stage 3.)
8. Click `save`.

You should now see a table UI when editing content or creating an entry using the edited Content Model.
# Cenitex Cloud Hosting Privileged User Access Management

Welcome to the Cenitex Cloud Hosting Privileged User Access Management application! This ReactJS application is specifically crafted to streamline the management and tracking of privileged user access within the Cenitex Cloud Hosting platform. Whether you're an administrator overseeing access requests or a user submitting them, this tool provides an intuitive interface to handle the process efficiently.

## Features

- **User Data Fetching**: Fetches user data from a backend API, displaying vital information such as usernames, full names, and group affiliations.
- **Approval/Denial Selection**: Enables reviewers to easily approve or deny access requests via a dropdown menu.
- **Remarks Input**: Allows reviewers to include additional remarks or notes for each user request, facilitating effective communication.
- **User Authentication**: Provides personalized experiences by fetching and displaying logged-in user information.
- **Responsive Design**: Offers a seamless viewing experience across various devices and screen sizes, ensuring accessibility for all users.
- **Data Submission**: Facilitates the submission of reviewed data, including approvals, denials, and remarks, to the backend API.
- **Loading Indicator**: Enhances user experience with a loading spinner during data fetching and submission processes, ensuring clear visual feedback.

## Installation

To run the Cenitex Cloud Hosting Privileged User Access Management application locally, follow these simple steps:

1. Clone the repository: `git clone https://github.com/your-repo/cenitex-access-management.git`
2. Navigate to the project directory: `cd cenitex-access-management`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your preferred web browser and visit `http://localhost:3000` to access the application.

## Usage

Here's a quick guide on how to effectively use the application:

1. Upon launching the application, user data will be fetched from the backend API and presented in a convenient grid layout.
2. Review each access request thoroughly, examining details such as username, full name, and group affiliation.
3. For each request, select the appropriate action (approve or deny) from the dropdown menu provided.
4. Optionally, include any additional remarks or notes in the designated text input field to provide context or feedback.
5. Once all requests have been reviewed, simply click the "Submit" button to transmit the updated data, including approvals, denials, and remarks, to the backend API.
6. Throughout the process, a loading spinner will indicate ongoing operations such as data fetching and submission.

## Configuration

For customizing the application, you can modify the following variables in the `App.js` file:

- `BASE_URL`: Determines the URL of the backend API. By default, it's set to `http://localhost:8000` for local development or `https://production_url` for production.

## Contributing

Contributions to the Cenitex Cloud Hosting Privileged User Access Management application are highly encouraged! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the project's GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to explore, modify, and share it according to the terms of the license. Your feedback and contributions are invaluable to the community!

# ZenTask

ZenTask is a task manager application designed to help you organize and manage your tasks efficiently.

## Features

- Create, update, and delete tasks
- Set deadlines and priorities for tasks
- Organize tasks into categories
- Mark tasks as complete
- User authentication and data security

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zentask.git
   ```
2. Navigate to the project directory:
   ```bash
   cd zentask
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Make sure to create a `.env` file and a `config.json` file in the backend directory. These files are important because they store the database and personal key data. These files should be added to your `.gitignore` to prevent them from being tracked by Git. There is the possibility of having to change your listen in the index.js, located in the backend.

### .gitignore

```plaintext
# Environment variables
.env

# Configuration files
config.json
```

## Usage

1. Start the front end:
   ```bash
   npm run dev
   ```
2. Start the back end:
   ```bash
   npm start
   ```
3. Connect to the localhost that is prompted to you.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

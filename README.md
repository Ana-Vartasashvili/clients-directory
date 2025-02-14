# Clients Directory

This project is a clients directory application built with Angular. It allows users to manage client information, including adding, editing, and deleting clients.

## Getting Started

### Prerequisites

- Node.js - v^18.19.1 or newer
- .NET 8.0 SDK (for the backend API)

### Installation

#### Frontend (Angular)

1. Clone the repository:

   ```sh
   git clone https://github.com/Ana-Vartasashvili/clients-directory.git
   ```

2. Navigate to the project directory:

   ```sh
   cd clients-directory
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

#### Backend (ASP.NET Web API)

1. Clone the backend repository:

   ```sh
   git clone https://github.com/Ana-Vartasashvili/clients-directory-api.git
   ```

2. Navigate to the backend project directory:

   ```sh
   cd clients-directory-api
   ```

3. Restore the .NET dependencies:

   ```sh
   dotnet restore
   ```

4. Build the project:

   ```sh
   dotnet build
   ```

5. Run the project:

   ```sh
   dotnet run
   ```

### Running the Application

#### Frontend

1. Start the development server:

   ```sh
   npm start
   ```

2. Open your browser and navigate to `http://localhost:4200`.

#### Backend

1. Ensure the backend API is running by following the steps in the [Backend (ASP.NET Web API)](#backend-aspnet-web-api) section.

### Building the Application

To build the application for production, run:

```sh
ng build
```

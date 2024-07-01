# Project CoolCity

A comprehensive AI-based solution to mitigate rising urban temperatures caused by climate change, industrial emissions, vehicular heat, and other natural factors.

## Challenge

We are addressing escalating urban temperatures disrupting daily life. Temperatures have risen significantly due to solar heat, industrial emissions, vehicular heat, and other natural influences. Our goal is to develop an AI-powered solution to reduce these temperatures.

## AI-Based Solution

Our AI system generates feasible solutions to reduce urban temperatures. Additionally, we have a ChatBot using the Gemini API to provide accurate answers in any situation.

## Purpose

Our goal is to reduce urban temperatures and demonstrate the efficacy of our solution. For instance, in Rajshahi, Bangladesh, our system analyzes various factors to propose solutions, including the current and required number of trees, available green areas, and necessary measures. The system also provides industrial and infrastructural plans for 1-2 years and 2-3 years.

## Functionality

- **Map Interface Display:** An interactive map allows users to click on various points.
- **Location Data Retrieval:** Fetches latitude and longitude using Maptiler API and Leaflet API.
- **Environmental Data Display:** Shows data such as air index, temperature, pollution levels using OpenWeather API, AgroMonitoring API, and Google Air Quality API.
- **Data Processing:** Sends collected data to Gemini's API for analysis.
- **Solution Generation:** Gemini's API generates optimal solutions.
- **Solution Display:** Displays solutions through a user-friendly interface.
- **Gemini-Based ChatBot:** Provides suitable answers to user queries.

## Impact Potential

- **Enhanced Urban Livability:** Improves quality of life and reduces health risks.
- **Environmental Sustainability:** Promotes tree planting and green areas.
- **Informed Urban Planning:** Provides data-driven recommendations.
- **Reduction of Heat Islands:** Mitigates urban heat islands.
- **Long-term Strategic Planning:** Offers short-term and long-term plans.
- **Replicability and Scalability:** Can be replicated and scaled to other cities.
- **Community Engagement:** Fosters engagement and awareness.
- **Economic Benefits:** Reduces energy consumption and stimulates local economies.

## Agile Model

### Project Initiation

- **Kick-off Meeting:** Discuss goals, scope, and deliverables.
- **Roles and Responsibilities:**
  - Developer 1: Frontend (Map Interface Display)
  - Developer 2: Backend (API integration and Data Processing)
  - Developer 3: Environmental Data Analysis
  - Developer 4: Solution Generation and Display

### Sprint Planning

- **Sprint Duration:** 2 weeks
- **Sprint Goals:** Define objectives and tasks.
- **Backlog Creation:** List and prioritize tasks.

### Development Sprints

1. **Setup and Initial Development:**
   - Tasks: Set up version control, project repositories, basic map interface, API calls.
   - Deliverables: Interactive map, API integration.
2. **Environmental Data Retrieval and Display:**
   - Tasks: Integrate APIs, display data.
   - Deliverables: Interactive map with environmental data.
3. **Data Processing and Analysis:**
   - Tasks: Set up data processing, integrate Gemini's API.
   - Deliverables: Backend system for data processing.
4. **Solution Generation Algorithm:**
   - Tasks: Develop solution algorithms, define criteria.
   - Deliverables: Functional solution generation system.
5. **User Interface and Solution Display:**
   - Tasks: Design UI, implement visual indicators.
   - Deliverables: Interactive solution display.
6. **Testing and Refinement:**
   - Tasks: Perform testing, gather feedback.
   - Deliverables: Refined prototype.

### Sprint Review and Retrospective

- **Review:** Demonstrate deliverables, gather feedback.
- **Retrospective:** Discuss improvements for the next sprint.

### Release Planning

- **Deployment:** Finalize system for Rajshahi.
- **Documentation:** Create user guides and technical documentation.
- **Training:** Train city planners and stakeholders.

### Post-Release Support

- **Monitor and Maintain:** Continuously monitor the system and address issues.
- **Iterate and Improve:** Plan further sprints based on feedback.

## Collaboration Tools

- **Version Control:** GitHub
- **Project Management:** Visual Studio Code
- **Communication:** Google Meet
- **Documentation:** Google Docs

## Docker Setup and User Manual

### Prerequisites

Make sure you have Docker and Docker Compose installed on your system. If not, you can download and install them from [Docker's official website](https://www.docker.com/products/docker-desktop).

### Setup Instructions

1. Clone the repository:

    ```sh
    git clone --branch main --single-branch https://github.com/thabir303/AI-for-Change-Hackathon.git
    cd AI-for-Change-Hackathon
    ```

2. Create a `.env` file in the root directory and configure the necessary environment variables:

    ```env
    # Example .env file
    API_KEY=
    PORT=3000
    OPENWEATHER_API_KEY=
    AGROMONITORING_API_KEY=
    OPENCAGE_API_KEY=
    SESSION_SECRET=
    GOOGLE_API_KEY=
    ```

3. Build and start the Docker containers:

    ```sh
    docker-compose up --build
    ```

    This command will build the Docker images for the backend and frontend services and start the containers.

### Accessing the Application

- **Frontend:** Open your browser and navigate to `http://localhost:5173` to access the frontend interface.
- **Backend:** The backend service will be running on `http://localhost:3000`.

### Stopping the Application

To stop the running containers, use the following command:

    ```sh
    docker-compose down
    ```

### Development Workflow

- Any changes made to the code in the `./server` and `./client` directories will be reflected in the running containers, thanks to the volume mounts specified in the `docker-compose.yml` file.

### Troubleshooting

- If you encounter any issues during setup or while running the application, check the container logs for more information:

    ```sh
    docker-compose logs
    ```

    This command will display the logs for all services defined in the `docker-compose.yml` file.

### Project Structure

- `./server`: Contains the backend code.
- `./client`: Contains the frontend code.
- `docker-compose.yml`: Defines the Docker services and configurations.

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details on how to get started.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

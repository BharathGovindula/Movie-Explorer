# Movie Explorer

A responsive React application for browsing and searching movies using the OMDB API. This project allows users to explore movies by genre, search for specific titles, and filter results by year and genre.

![Movie Explorer Screenshot](https://via.placeholder.com/800x400?text=Movie+Explorer+Screenshot)

## Live Demo

Check out the live demo: [Movie Explorer on Netlify](https://moviefetcherr.netlify.app/)

## Features

- **Movie Browsing**: Browse movies by genre categories (Action, Comedy, Drama, Thriller)
- **Search Functionality**: Search for movies by title
- **Filtering Options**: Filter movies by release year and genre
- **Responsive Design**: Optimized for all screen sizes with a 4-column grid layout
- **Infinite Scrolling**: Load more movies as you scroll down
- **Recent Searches**: Track and revisit your recent search queries

## Technologies Used

- **React**: Frontend library for building the user interface
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **OMDB API**: Movie database API for fetching movie data
- **Axios**: Promise-based HTTP client for API requests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BharathGovindula/Movie-Explorer.git
   cd movie-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OMDB API key:
   ```
   VITE_OMDB_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Deployment

This project is deployed on Netlify. To deploy your own version:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to Netlify:
   - Create an account on [Netlify](https://www.netlify.com/)
   - Connect your GitHub repository
   - Set the build command to `npm run build`
   - Set the publish directory to `dist`
   - Add your OMDB API key as an environment variable named `VITE_OMDB_API_KEY`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.



## Acknowledgments

- [OMDB API](https://www.omdbapi.com/) for providing movie data
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [React](https://reactjs.org/) for the frontend framework

# RecipeHub

RecipeHub is a frontend application for creating, sharing, and exploring user-generated recipes. Built with Angular, this project showcases advanced state management, optimized component performance, and CI/CD integration with Azure DevOps.

## Technologies Used
- Angular 18: Latest stable version, utilizing the latest framework features.
- NgRx: State management to handle application data in a scalable and maintainable way.
- Bootstrap: Responsive design to enhance user interface.
- YAML: Used in pipeline configurations for continuous integration.

## Project Highlights

### Focus on State Management
The primary focus of RecipeHub was to deepen my understanding of Angular’s state management via NgRx. This project employs NgRx to manage and organize complex application state efficiently, especially useful for components requiring shared data across the app.

### Reactive Forms
In implementing features like the edit-recipe component, I explored Angular's reactive forms to enable a dynamic and responsive user experience. This component serves as a robust example of handling complex form interactions in Angular.

### Continuous Integration with Azure DevOps
To automate workflows, I integrated Azure DevOps, configuring two pipelines that can be triggered from a self-hosted agent on my local machine. This setup provided valuable experience in CI/CD, allowing for rapid feedback during development.

### Angular Signals
RecipeHub is built on Angular 18, incorporating signals—a recent addition that enables a more responsive, reactive approach to data flow within Angular components.

## Challenges and Solutions

### Optimizing Recipe-Card Component Performance
Initially, each recipe-card component independently handled like status checks, creating a potential performance bottleneck as the application scaled. To address this, I implemented a centralized IsLikedMap interface, which manages like statuses efficiently. Now, a single store subscription per page loads data, feeding boolean values through input signals to individual cards. This optimized approach significantly reduced component subscriptions and improved performance.
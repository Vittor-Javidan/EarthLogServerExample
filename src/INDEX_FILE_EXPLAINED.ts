import express from 'express';
import { projectsExample } from './projectsExample/index.js';
import { ProjectDTO } from './Types.js';
import DBSystem from './DBSystem.js';

const app = express();

app.use(express.json({
  limit: '100mb'                                                                                    // If you to receive projects with a huge amount of information, don't forget to configure you server acordling.
}));

/**
 * Receive credentials data from mobile app to authenticate.
 * If authenticated, you can send back a accessToken. This token you be send back to this server as
 * a header with the key as 'Authorization'.
 */
app.post('/auth', (request, response) => {

  // Authenticate
  console.log(request.body)                                                                         // console.log: { user: 'johnDoe', password: '123456'}

  // If success, just send the token back (App will already add a "Beared" prefix on it)
  response.send({
    accessToken: 'userAccessToken',                                                                 // Any type of token. Ex: JWT token. Mobile App will use this token sooner as it can to do a second endppoint call, like /projects, and then discart the token. The Mobile app never stays online, by design.
  });
});

/**
 * Send projects to mobile app
 */
app.get('/project', (request, response) => {

  console.log(request.headers['authorization'])                                                     // console.log: Bearer userAccessToken
  
  const allprojects: ProjectDTO[] = Object.values(projectsExample)
  const allUploadedProject = DBSystem.loadAllProjectFiles()

  allUploadedProject.forEach(project => {

    /**
     * Its always a good practive to have so type of logic somewhere to change the project
     * status to "uploaded" if you planning to allow the user to download an old project again.
     * 
     * During download, the app only cares if projectSettings.status is "uploaded" or not.
     * 
     * If the app reads "uploaded", all other elements will have their status changed to "uploaded".
     * Any other value will cause the app to change all status to "new", and the user will not have
     * the nice visual feedback with green or yellow clouds marking the project status.
     * 
     * And if you send back the projectSettings.uploads, instead leaving as undefined, the app will
     * use the the element from the last index to show the upload time to the user.
     */ 
    project.projectSettings.status = 'uploaded'

  })

  response.send({
    projects: [
      ...allprojects,                                                                               // You can send many projectsDTO as you want inside the array. Mobile app will identify wich projects is already downloaded by the `project_id` inside the projectSettings, blocking projects with duplicated ids to be saved.
      ...DBSystem.loadAllProjectFiles()
    ],
  })
});

/**
 * Receive projects from the mobile app
 */
app.post('/project', (request, response) => {

  console.log(request.headers['authorization'])                                                     // console.log: Bearer userAccessToken
  console.log(request.body.projects)                                                                // console.log: ProjectsDTO[] sended by the app

  /*
    After receiving the project, you can do whatever logic you want.
      - Validations before saving to database.
      - Check for project widgets, so you can decide where to save,
        or wich type of project you create.
      - create your own sync logic that can satistfy your own and specific needs.

    Creativity is limitless from here. Do whatever you want with your data, with
    no third parties companies as midleman.
  */
  const projects: ProjectDTO[] = request.body.projects

  // Example of validation 
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].projectSettings.status === 'uploaded') {
      response
        .setHeader(
          'serverMessage', `project "${projects[i].projectSettings.name}" was uploaded already`     // If you refuse the upload, you can send a message back to the app using the 'serverMessage' key inside the response header, giving a feedback to the user why the upload was refused.
        )
        .sendStatus(406)
      return;
    }
  }
  response.sendStatus(202);                                                                         // You need to send response feedback. At least a 2XX status, so the app can recognize if the upload was succesfull. Otherwise on user side it will looks like the project was not uploaded or conection was not stablished.

  // Everything ok, so lets save into our Database
  for (let i = 0; i < projects.length; i++) {
    DBSystem.saveFile(projects[i].projectSettings.id_project, projects[i])
  }
})

app.listen(4000, () => {
  console.log(`Server is running on http://localhost:6969`);
});
import express from 'express';

import LocalDatabase from './LocalDatabase.js';
import { projectsExample } from './projectsExample/index.js';

import { ProjectDTO, ProjectSettings, ProjectStatus } from './Types/DTO.js';
import { SyncData } from './Types/Sync.js';

const app = express();
app.use(express.json({ limit: '100mb' })); // Limit of each json request payload.

// Authenticate User
app.post('/auth', (request, response) => {

  console.log('=======================================')
  console.log('ENDPOINT: /auth (POST)')
  console.log(request.body.user)     // User name
  console.log(request.body.password) // User password

  /*
    On this example, the server is not verifying any account user and password, but this is the
    place to recognize users and to send their accessToken to be used on other endpoints if they got
    authenticated.

    The auth endpoint is always called before any other endpoint. You don't need to create tokens
    with long expire time, since the app don't store any accessToken in cache or storage. Once the
    accessToken is used, its throw away to garbage collector.

    Is this that way to allow user to configure credentials only once, and to allow multiple servers to be
    configured, each one with their own credentials. So, its recommended to generate long private keys for
    users instead asking then to create their own password, for safety reasons.
  */

  response.send({
    accessToken: 'userAccessToken',
  });
});

// Get the list of All Projects Available
app.get('/project', (request, response) => {

  console.log('=======================================')
  console.log('ENDPOINT: /project (GET)')
  console.log(request.headers.authorization) // Authorization token

  // Get all ProjectSettings you want to display to user. Theses are just to display the available 
  // project users can download.
  // ===================================================================== //
  // IMPLEMENTATION EXAMPLE                                                //
  const allExampleProjects: ProjectDTO[] = Object.values(projectsExample)  //
  const allUploadedProject = LocalDatabase.loadAllProjectFiles()           //
  const allProjectSettings: ProjectSettings[] = [                          //
    ...allExampleProjects.map(project => project.projectSettings),         //
    ...allUploadedProject.map(project => project.projectSettings)          //
  ]                                                                        //
  // ===================================================================== //

  // Send projects to the app to be saved or discarted
  response.send({
    projects: allProjectSettings,
  })
});

// Create New Project
app.post('/project', (request, response) => {

  console.log('=======================================')
  console.log('ENDPOINT: /project (POST)')
  console.log(request.headers.authorization) // Authorization token
  console.log(request.body.syncData)         // Sync Data

  const project: ProjectDTO = request.body.project;
  const { id_project } = project.projectSettings;

  // Do anything you want with the project data from this point
  // ================================================================================= //
  // IMPLEMENTATION EXAMPLE                                                            //
  LocalDatabase.saveProject(`${id_project}.json`, project)                             //
  response.sendStatus(202);                                                            //
  // ================================================================================= //
})

// Get Specific Project
// If the user selected multiple projects to download, this endpoint will be called multiple times, one for each project.
app.get('/project/:id_project', (request, response) => {

  console.log('=======================================')
  console.log(`ENDPOINT: /project/${request.params.id_project} (GET)`)
  console.log(request.headers.authorization) // Authorization token

  const id_project: string = request.params.id_project;

  // Get or build a ProjectDTO from received id_project
  // ===================================================================== //
  // IMPLEMENTATION EXAMPLE                                                //
  let project: ProjectDTO | undefined;                                     //
  let projectStatus: ProjectStatus | undefined                             //
  const allExampleProjects: ProjectDTO[] = Object.values(projectsExample)  //
  allExampleProjects.forEach(exampleProject => {                           //
    if (exampleProject.projectSettings.id_project === id_project) {        //
      project = exampleProject;                                            //
      projectStatus = 'new'                                                //
    }                                                                      //
  })                                                                       //
  const allUploadedProject = LocalDatabase.loadAllProjectFiles()           //  
  allUploadedProject.forEach(uploadedProject => {                          //
    if (uploadedProject.projectSettings.id_project === id_project) {       //
      project = uploadedProject;                                           //
      projectStatus = 'uploaded'                                           //
    }                                                                      //
  })                                                                       //
  // ===================================================================== //

  if (project === undefined || projectStatus === undefined) {
    response.sendStatus(404);
  } else {
    response.send({
      project: project,
      projectStatus: projectStatus
    })
  }
})

// Update Project
app.post('/project/:id_project', (request, response) => {

  console.log('=======================================')
  console.log(`ENDPOINT: /project/${request.params.id_project} (POST)`)
  console.log(request.headers.authorization) // Authorization token
  console.log(request.body.syncData)         // Sync Data

  const id_project: string = request.params.id_project;
  const project: ProjectDTO = request.body.project;

  // Do anything you want with the project data from this point
  // ========================================================================================== //
  // IMPLEMENTATION EXAMPLE                                                                     //
  LocalDatabase.saveProject(`${id_project}.json`, project)                                      //
  // ========================================================================================== //

  // Delete any picture deleted by the user from it's device that is saved on server as well
  // ================================================================================= //
  const syncData = request.body.syncData as SyncData                                   //
  const picturesSyncDataIDs = Object.keys(syncData.pictures)                           //
  picturesSyncDataIDs.forEach(id_picture => {                                          //
    if (syncData.pictures[id_picture] === 'deleted') {                                 //
      LocalDatabase.deletePicture(id_project, `${id_picture}.jpg`)                     //
    }                                                                                  //
  })                                                                                   //
  // ================================================================================= //

  response.sendStatus(202);
});

// Upload Image
app.post('/image/:id_project', (request, response) => {

  console.log('=======================================')
  console.log(`ENDPOINT: /image/${request.params.id_project} (POST)`)
  console.log(request.headers.authorization) // Authorization token
  console.log(request.body.syncData)         // Sync Data

  const id_project: string = request.params.id_project;
  const id_picture: string = request.body.id_picture;
  const base64Data: string = request.body.picture;

  // Do anything you want with the picture data from this point
  // ===================================================================== //
  // IMPLEMENTATION EXAMPLE                                                //
  LocalDatabase.savePicture(id_project, `${id_picture}.jpg`, base64Data)   //
  response.sendStatus(202);                                                //
  // ===================================================================== //
});

// Get Image
app.get('/image/:id_project/:id_picture', (request, response) => {

  console.log('=======================================')
  console.log(`ENDPOINT: /image/${request.params.id_project}/${request.params.id_picture} (GET)`)
  console.log(request.headers.authorization) // Authorization token

  const id_project: string = request.params.id_project;
  const id_picture: string = request.params.id_picture;

  // Get the picture base64 string data from database
  // ============================================================================= //
  // IMPLEMENTATION EXAMPLE                                                        //
  const pictureData = LocalDatabase.loadPicture(id_project, `${id_picture}.jpg`)   //
  // ============================================================================= //

  pictureData === null
  ? response.sendStatus(404)
  : response.send({
    picture: pictureData
  })
});

app.listen(6902, () => {
  console.log(`Server is running on http://localhost:6902`);
});

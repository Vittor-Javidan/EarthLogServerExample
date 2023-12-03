import express from 'express';

import LocalDatabase from './LocalDatabase.js';
import { projectsExample } from './projectsExample/index.js';

import { ProjectDTO, ProjectSettings } from './Types/DTO.js';
import { SyncData } from './Types/Sync.js';

const app = express();
app.use(express.json({ limit: '100mb' })); // Limit of each json request payload.

app.post('/auth', (request, response) => {
  request.body
  response.send({
    accessToken: 'userAccessToken',
  });
});

app.get('/project', (request, response) => {

  console.log(request.headers.authorization) // Authorization token

  // Get all ProjectSettings you want to display to user. Theses are just to display the available 
  // project users can download.
  // ===================================================================== //
  // IMPLEMENTATION EXAMPLE                                                //
  const allExampleProjects: ProjectDTO[] = Object.values(projectsExample)  //
  const allUploadedProject = LocalDatabase.loadAllProjectFiles()           //
  allUploadedProject.forEach(project => {                                  //
    project.projectSettings.status = 'uploaded'                            //
  })                                                                       //
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

app.post('/project', (request, response) => {

  console.log(request.headers.authorization) // Authorization token

  const project: ProjectDTO = request.body.project;
  const { id_project } = project.projectSettings;
  const syncData: SyncData = request.body.syncData;

  // Do anything you want with the project data from this point
  // ================================================================================= //
  // IMPLEMENTATION EXAMPLE                                                            //
  LocalDatabase.saveProject(`${id_project}.json`, project)                             //
  response.sendStatus(202);                                                            //
  console.log(project.projectSettings.status) // status will always be 'new'           //
  // ================================================================================= //
})

app.get('/project/:id_project', (request, response) => {

  console.log(request.headers.authorization) // Authorization token

  const id_project: string = request.params.id_project;

  // Get or build a ProjectDTO from received id_project
  // ===================================================================== //
  // IMPLEMENTATION EXAMPLE                                                //
  const allExampleProjects: ProjectDTO[] = Object.values(projectsExample)  //
  const allUploadedProject = LocalDatabase.loadAllProjectFiles()           //
  allUploadedProject.forEach(project => {                                  //
    project.projectSettings.status = 'uploaded'                            //
  })                                                                       //
  const allProjects: ProjectDTO[] = [                                      //
    ...allExampleProjects,                                                 //
    ...allUploadedProject                                                  //
  ]                                                                        //
  const filteredProject: ProjectDTO[] = allProjects.filter(project =>      //
    project.projectSettings.id_project === id_project                      //
  )                                                                        //
  // ===================================================================== //

  filteredProject.length <= 0
  ? response.sendStatus(404)
  : response.send({
    project: filteredProject[0]
  })
})

app.post('/project/:id_project', (request, response) => {

  console.log(request.headers.authorization) // Authorization token

  const id_project: string = request.params.id_project;
  const project: ProjectDTO = request.body.project;
  const syncData: SyncData = request.body.syncData;

  // Do anything you want with the project data from this point
  // ========================================================================================== //
  // IMPLEMENTATION EXAMPLE                                                                     //
  LocalDatabase.saveProject(`${id_project}.json`, project)                                      //
  response.sendStatus(202);                                                                     //
  console.log(project.projectSettings.status) // status will always be 'modified' or 'uploaded' //
  // ========================================================================================== //
});

app.post('/image/:id_project', (request, response) => {

  console.log(request.headers.authorization) // Authorization token

  const id_project: string = request.params.id_project;
  const id_picture: string = request.body.id_picture;
  const base64Data: string = request.body.picture;
  const syncData: SyncData = request.body.syncData;

  // Do anything you want with the picture data from this point
  // ===================================================================== //
  // IMPLEMENTATION EXAMPLE                                                //
  LocalDatabase.savePicture(id_project, `${id_picture}.jpg`, base64Data)   //
  response.sendStatus(202);                                                //
  // ===================================================================== //
});

app.get('/image/:id_project/:id_picture', (request, response) => {

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

app.listen(6969, () => {
  console.log(`Server is running on http://localhost:6969`);
});

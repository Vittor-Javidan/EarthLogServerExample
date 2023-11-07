import express from 'express';
import multer from 'multer';
import { projectsExample } from './projectsExample/index.js';
import { ProjectDTO, ProjectSettings } from './Types/DTO.js';
import MockedDatabase from './MockedDatabase.js';

const app = express();

const storage = multer.memoryStorage();
const upload = multer({
  storage,   limits: {
  fieldSize: 10 * 10 * 1024 * 1024, // 100mb limit for each media file.
}, });

app.use(express.json({ limit: '100mb' })); // Limit of json payload.

app.post('/auth', (request, response) => {
  request.body
  response.send({
    accessToken: 'userAccessToken',
  });
});

app.get('/project', (request, response) => {

  console.log(request.headers.authorization) // Authorization token

  // Meke your own implementation to send projects
  // ===================================================================== //
  const allExampleProjects: ProjectDTO[] = Object.values(projectsExample)  //
  const allUploadedProject = MockedDatabase.loadAllProjectFiles()          //
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

  // Do anything you want with the data from this point 
  // ======================================================================= //
  MockedDatabase.saveProject(project.projectSettings.id_project, project)    //
  response.sendStatus(202);                                                  //
  console.log(project.projectSettings.status) // status will always be 'new' //
  // ======================================================================= //
})

app.get('/project/:id_project', (request, response) => {

  console.log(request.headers.authorization) // Authorization token

  const id_project: string = request.params.id_project;

  // Get or build a project from the received id
  // ===================================================================== //
  const allExampleProjects: ProjectDTO[] = Object.values(projectsExample)  //
  const allUploadedProject = MockedDatabase.loadAllProjectFiles()          //
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

  // Do anything you want with the data from this point
  // ========================================================================================== //
  MockedDatabase.saveProject(`${id_project}.json`, project)                                     //
  response.sendStatus(202);                                                                     //
  console.log(project.projectSettings.status) // status will always be 'modified' or 'uploaded' //
  // ========================================================================================== //
});

app.post('/image', upload.single('image'), (request, response) => {

  console.log(request.headers.authorization) // Authorization token

  const id_project: string = request.body.id_project;
  const id_picture: string = request.body.id_picture;
  const base64Data: string = request.body.picture;

  // Do anything you want with the data from this point
  // ===================================================================== //
  MockedDatabase.savePicture(id_project, `${id_picture}.jpg`, base64Data)  //
  response.sendStatus(202);                                                //
  // ===================================================================== //
});

app.get('/image/:id_project/:id_picture', (request, response) => {

  console.log(request.headers.authorization) // Authorization token

  const id_project: string = request.body.id_project;
  const id_picture: string = request.body.id_picture;

  // Get the picture base64 string data
  // ============================================================================= //
  const pictureData = MockedDatabase.loadPicture(id_project, `${id_picture}.jpg`)  //
  response.sendStatus(202);                                                        //
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

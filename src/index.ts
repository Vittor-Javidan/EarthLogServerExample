import express from 'express';
import multer from 'multer';
import { projectsExample } from './projectsExample/index.js';
import { ProjectDTO } from './Types/DTO.js';
import DBSystem from './DBSystem.js';

const app = express();

const storage = multer.memoryStorage();
const upload = multer({
  storage,   limits: {
  fieldSize: 10 * 10 * 1024 * 1024, // 100mb form data limit
}, });

app.use(express.json({ limit: '100mb' }));

app.post('/auth', (request, response) => {
  request.body
  response.send({
    accessToken: 'userAccessToken',
  });
});

app.get('/project', (request, response) => {

  console.log(request.headers.authorization) // Authorization token

  // Meke your own implementation to send projects
  // ============================================================== //
  const allprojects: ProjectDTO[] = Object.values(projectsExample)  //
  const allUploadedProject = DBSystem.loadAllProjectFiles()         //
  allUploadedProject.forEach(project => {                           //
    project.projectSettings.status = 'uploaded'                     //
  })                                                                //
  // ============================================================== //

  // Send projects to the app to be saved or discarted
  response.send({
    projects: [
      ...allprojects,
      ...allUploadedProject,
    ],
  })
});

app.post('/project', (request, response) => {

  console.log(request.headers.authorization) // Authorization token

  const project: ProjectDTO = request.body.project;

  // Do anything you want with the data from this point 
  // ======================================================================= //
  DBSystem.saveProject(project.projectSettings.id_project, project)          //
  response.sendStatus(202);                                                  //
  console.log(project.projectSettings.status) // status will always be 'new' //
  // ======================================================================= //
})

app.post('/project/:id_project', (request, response) => {

  console.log(request.headers.authorization) // Authorization token

  const id_project: string = request.params.id_project;
  const project: ProjectDTO = request.body.project;

  // Do anything you want with the data from this point
  // ========================================================================================== //
  DBSystem.saveProject(`${id_project}.json`, project)                                           //
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
  // ============================================================= //
  DBSystem.saveImage(id_project, `${id_picture}.jpg`, base64Data)  //
  response.sendStatus(202);                                        //
  // ============================================================= //
});

app.listen(6969, () => {
  console.log(`Server is running on http://localhost:6969`);
});

import express from 'express';
import { projectsExample } from './projectsExample/index.js';
import { ProjectDTO } from './Types.js';
import DBSystem from './DBSystem.js';

const app = express();

app.use(express.json({
  limit: '100mb'
}));

app.post('/auth', (request, response) => {
  request.body
  response.send({
    accessToken: 'userAccessToken',
  });
});

app.get('/project', (request, response) => {

  // Authorization token
  console.log(request.headers.authorization)

  // Projects to be downloaded many time as needed
  const allprojects: ProjectDTO[] = Object.values(projectsExample)

  // Projects that was uploaded before
  const allUploadedProject = DBSystem.loadAllProjectFiles()
  allUploadedProject.forEach(project => {
    project.projectSettings.status = 'uploaded'
  })

  response.send({
    projects: [
      ...allprojects,
      ...allUploadedProject,
    ],
  })
});

app.post('/project', (request, response) => {

  // Authorization token
  console.log(request.headers.authorization)

  const project: ProjectDTO = request.body.project;

  // status will always be 'new'
  console.log(project.projectSettings.status)

  DBSystem.saveFile(project.projectSettings.id_project, project)
  response.sendStatus(202);
})

app.post('/project/:id_project', (request, response) => {

  // Authorization token
  console.log(request.headers.authorization)

  const id_project = request.params.id_project;
  const project: ProjectDTO = request.body.project;

  // status will always be 'modified' or 'uploaded'
  console.log(project.projectSettings.status)

  DBSystem.saveFile(id_project, project)
  response.sendStatus(202);
});

app.listen(6969, () => {
  console.log(`Server is running on http://localhost:6969`);
});

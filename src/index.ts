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

  const allprojects: ProjectDTO[] = Object.values(projectsExample)
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

  const projects: ProjectDTO[] = request.body.projects;

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].projectSettings.status === 'uploaded') {
      response
        .setHeader('serverMessage', `project "${projects[i].projectSettings.name}" was uploaded already`)
        .sendStatus(406)
      return;
    }
  }

  response.sendStatus(202);

  for (let i = 0; i < projects.length; i++) {
    DBSystem.saveFile(projects[i].projectSettings.id_project, projects[i])
  }
})

app.listen(6969, () => {
  console.log(`Server is running on http://localhost:6969`);
});

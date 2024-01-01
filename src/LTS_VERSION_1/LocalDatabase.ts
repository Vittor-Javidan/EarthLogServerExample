import fs from 'fs'
import { ProjectDTO } from './Types/DTO.js'


/**
 * This is a mocked database, with only the purpose to display the data saved with easy access and
 * to demo the app Server features.
 * You can you any other database you desire, all you need to do is change the implementation on
 * index.ts file.
 */
export default class LocalDatabase {

  private static lts_version_folder = './v1'
  private static projectsFolder = '/JsonProjects'
  private static imageFolder = '/Images'

  static saveProject(fileName: string, data: object): void {

    if (!fs.existsSync(this.lts_version_folder)) {
      fs.mkdirSync(this.lts_version_folder)
    }

    if (!fs.existsSync(this.projectsFolder)) {
      fs.mkdirSync(this.projectsFolder)
    }

    fs.writeFileSync(`${this.lts_version_folder}${this.projectsFolder}/${fileName}`, JSON.stringify(data, null, 2))
  }

  static loadAllProjectFiles(): ProjectDTO[] {

    if (!fs.existsSync(this.lts_version_folder)) {
      fs.mkdirSync(this.lts_version_folder)
    }

    if (!fs.existsSync(this.projectsFolder)) {
      fs.mkdirSync(this.projectsFolder)
    }

    const files = fs.readdirSync(`${this.lts_version_folder}${this.projectsFolder}`)
    const allProjects: ProjectDTO[] = []

    for (const file of files) {
      const fileData = fs.readFileSync(`${this.lts_version_folder}${this.projectsFolder}/${file}`, 'utf-8');
      const parsedData = JSON.parse(fileData) as ProjectDTO
      allProjects.push(parsedData)
    }

    return allProjects;
  }

  static savePicture(id_project: string, fileName: string, data: string) {

    if (!fs.existsSync(this.lts_version_folder)) {
      fs.mkdirSync(this.lts_version_folder)
    }

    if (!fs.existsSync(this.imageFolder)) {
      fs.mkdirSync(this.imageFolder)
    }

    if (!fs.existsSync(`${this.imageFolder}/${id_project}`)) {
      fs.mkdirSync(`${this.lts_version_folder}${this.imageFolder}/${id_project}`)
    }

    fs.writeFileSync(`${this.lts_version_folder}${this.imageFolder}/${id_project}/${fileName}`, data, { encoding: 'base64' })
  }

  static loadPicture(id_project: string, fileName: string): string | null {

    if (!fs.existsSync(this.lts_version_folder)) {
      fs.mkdirSync(this.lts_version_folder)
    }

    if (!fs.existsSync(this.imageFolder)) {
      fs.mkdirSync(this.imageFolder)
    }

    if (!fs.existsSync(`${this.lts_version_folder}${this.imageFolder}/${id_project}`)) {
      return null
    }

    if (!fs.existsSync(`${this.lts_version_folder}${this.imageFolder}/${id_project}/${fileName}`)) {
      return null
    }

    return fs.readFileSync(`${this.lts_version_folder}${this.imageFolder}/${id_project}/${fileName}`, 'base64')
  }
}
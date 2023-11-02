import fs from 'fs'
import { ProjectDTO } from './Types/DTO.js'


/**
 * This is a mocked database, with the purpose to display the data saved with easy access.
 * In production you can use any service as you want. Cloud, SQL noSQL, etc.
 */
export default class MockedDatabase {

  private static folderDir = './JsonProjects' 
  private static imageFolder = './Images'

  static saveProject(fileName: string, data: object): void {
    if (!fs.existsSync(this.folderDir)) {
      fs.mkdirSync(this.folderDir)
    }
    fs.writeFileSync(`${this.folderDir}/${fileName}.json`, JSON.stringify(data, null, 2))
  }

  static saveImage(id_project: string, fileName: string, data: string) {
    if (!fs.existsSync(this.imageFolder)) {
      fs.mkdirSync(this.imageFolder)
    }
    if (!fs.existsSync(`${this.imageFolder}/${id_project}`)) {
      fs.mkdirSync(`${this.imageFolder}/${id_project}`)
    }
    fs.writeFileSync(`${this.imageFolder}/${id_project}/${fileName}`, data, { encoding: 'base64' })
  }

  static loadAllProjectFiles(): ProjectDTO[] {
    if (!fs.existsSync(this.folderDir)) {
      fs.mkdirSync(this.folderDir)
    }

    const files = fs.readdirSync(this.folderDir)
    const allProjects: ProjectDTO[] = []

    for (const file of files) {
      const filePath = `${this.folderDir}/${file}`
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const parsedData = JSON.parse(fileData) as ProjectDTO
      allProjects.push(parsedData)
    }

    return allProjects;
  }
}
import fs from 'fs'
import { ProjectDTO } from './Types.js'

export default class DBSystem {

  private static folderDir = './JsonProjects' 

  static saveFile(fileName: string, data: object): void {
    if (!fs.existsSync(this.folderDir)) {
      fs.mkdirSync(this.folderDir)
    }
    fs.writeFileSync(`${this.folderDir}/${fileName}.json`, JSON.stringify(data, null, 2))
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
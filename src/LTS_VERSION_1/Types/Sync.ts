/** 
 * "new" means this is the first time the element is being uploaded
 * "modified" means the element was uploaded before and has new changes
 * "uploaded" means no changes was made on the element since last upload.
 * "deleted" means a element that was uploaded before but now was deleted.
 * 
 * All elements with status "new" or "modified" are changed locally on users phone to "uploaded"
 * when uploads succeed by receiving a 2XX status from the server.
 * 
 * All elements with status "deleted" are removed locally on users phone after a succeed upload.
 * 
 * You can use SyncData data when users uploads their projects, to decide faster and more precise
 * the database operations you gonna use, like CREATE, UPDATE, DELETE operations.
 */
export type SyncData = {
  id_project:       string
  project:          'uploaded' | 'modified' | 'new'
  samples:          Record<string, "uploaded" | "modified" | "new" | 'deleted'>
  widgets_Project:  Record<string, "uploaded" | "modified" | "new" | 'deleted'>
  widgets_Template: Record<string, "uploaded" | "modified" | "new" | 'deleted'>
  widgets_Samples:  Record<string, Record<string, "uploaded" | "modified" | "new" | 'deleted'>>
  pictures:         Record<string, "uploaded" | "new" | "deleted" | "on cloud">
}
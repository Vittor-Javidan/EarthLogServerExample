/** 
 * `new` means this is the first time the element is being uploaded.
 * 
 * `modified` means the element was uploaded before and has new changes.
 * 
 * `uploaded` means no changes was made on the element since last upload.
 * 
 * `deleted`  means a element that was uploaded before but now was deleted.
 * 
 * `on cloud` means the element is already uploaded, but is not available on user device.
 * 
 * All elements with status "new" or "modified" are changed locally on users phone to "uploaded"
 * when uploads succeed by receiving a 2XX status from the server.
 * 
 * All elements with status "deleted" are removed locally on users phone after a succeed upload.
 * 
 * The SyncData object can be utilized when users upload their projects. It allows for quicker and
 * more accurate determination of the necessary database operations, such as CREATE, UPDATE, and DELETE.
 */
export type SyncData = {
  id_project:       string
  project:          'uploaded' | 'modified' | 'new'                                                 // "new" means this is the first time the project is being uploaded. "modified" means the project was uploaded before and has new changes. "uploaded" means no changes was made on the project since last upload.
  samples:          Record<string, "uploaded" | "modified" | "new" | 'deleted'>                     // "new" means this is the first time the sample is being uploaded. "modified" means the sample was uploaded before and has new changes. "uploaded" means no changes was made on the sample since last upload. "deleted" means a sample that was uploaded before but now was deleted.
  widgets_Project:  Record<string, "uploaded" | "modified" | "new" | 'deleted'>                     // "new" means this is the first time the widget is being uploaded. "modified" means the widget was uploaded before and has new changes. "uploaded" means no changes was made on the widget since last upload. "deleted" means a widget that was uploaded before but now was deleted.
  widgets_Template: Record<string, "uploaded" | "modified" | "new" | 'deleted'>                     // "new" means this is the first time the widget is being uploaded. "modified" means the widget was uploaded before and has new changes. "uploaded" means no changes was made on the widget since last upload. "deleted" means a widget that was uploaded before but now was deleted.
  widgets_Samples:  Record<string, Record<string, "uploaded" | "modified" | "new" | 'deleted'>>     // "new" means this is the first time the widget is being uploaded. "modified" means the widget was uploaded before and has new changes. "uploaded" means no changes was made on the widget since last upload. "deleted" means a widget that was uploaded before but now was deleted.
  pictures:         Record<string, "uploaded" | "new" | "deleted" | "on cloud">                     // "new" means this is the first time the picture is being uploaded. "uploaded" means no changes was made on the picture since last upload. "deleted" means a picture that was uploaded before but now was deleted. "on cloud" means the picture is already uploaded, but is not available on user device.
}
/**
 * When projectSettings === 'new'
 *   If the server receives a project with 'new' status, you can be sure any other element
 *   (sampleSettings/widgetData) will have the status as 'nwe'. You can safely save everything on
 *   your database.
 *
 * When projectSettings === 'modified'
 *   If the server receives a project with "modified" status, you can loop through all elements to
 *   check wich elements has "new" or "modified" status.
 *   This mean you can loop through all sampleSettings, and all widgets from project, template
 *   or samples and UPDATE what has "modified", and CREATE what has "new" status.
 */
export type Status = 'uploaded' | 'modified' | 'new'

/** 
 * "new" means this is the first the element is being uploaded
 * "modified" means the element was uploaded before and has new changes
 * "uploaded" means no changes was made on the element since last upload.
 * "deleted" means a element that was uploaded before but now was deleted.
 * 
 * All elements with status "new" or "modified" are changed locally on users phone to "uploaded"
 * when uploads succeed by receiving a 2XX status from the server.
 * 
 * All elements with status "deleted" are removed locally on users phone after a succeed upload.
 * 
 * You don't need to add these syncData on your project, since they are generated automatically by the
 * app. But you need to specify on projectSettings status if the project is "new" or "uploaded".
 * 
 * You can use these SyncData when users uploads their projects, to decide faster and more precise
 * the database operations you gonna use, like CREATE, UPDATE, DELETE.
 */
export type SyncData = {
  id_project:     string                                                                            // ID of the project. App uses this to identify wich syncData file belongs to wich project. You don't need to worry about this.
  project:        Status                                                                            // The Status of project. This always will be the same value present on projectSettings status propertie.
  projectWidgets: Record<string, Status | 'deleted'>                                                // Key-Value pairs of project widgets IDs and theirs status. Key = id_widget, Value: 'new' | 'updated' | 'modified' | 'deleted'.
  template:       Record<string, Status | 'deleted'>                                                // Key-Value pairs of template widgets IDs and theirs status. Key = id_widget, Value: 'new' | 'updated' | 'modified' | 'deleted'.
  samples:        Record<string, Status | 'deleted'>                                                // Key-Value pairs of samples IDs and theirs status. Key = id_sample, Value: 'new' | 'updated' | 'modified' | 'deleted'.
  sampleWidgets:  Record<string, Record<string, Status | 'deleted'>>                                // Dictionary with sample_id as key, and values representing another Key-Value pairs of sample widgets IDs and theirs status. Key = id_widget, Value: 'new' | 'updated' | 'modified' | 'deleted'. If a sample is deleted, all widgets it widgets will not be shown here.
}
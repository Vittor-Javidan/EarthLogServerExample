export type ProjectRules = {
  allowMultipleDownloads?: boolean                                                                  // When true, the app will make a copy of the projects and replace the ids of all elements (project/samples/widgets/inputs) with new ones. This does not remove the need to give an id to all elements inside the project that will be copied.
  allowProjectNameChange?: boolean                                                                  // Allows the project name to be changed on project info.
  allowSampleAliasChange?: boolean                                                                  // Allows the sample alias to be changed on project info.
  allowGPSChange?: boolean                                                                          // Hide GPSInput if both this and gps undefined
  allowProjectExport?: boolean                                                                      // Allows the project to be exported into files
  showCreateWidgetButton_Project?: boolean                                                          // Shows the project widget creation button.
  showCreateWidgetButton_Template?: boolean                                                         // Shows the template widget creation button.
  showSampleCreationButton?: boolean                                                                // Shows the sample widget creation button.
  addGPSToNewSamples?: boolean                                                                      // Shows gps input on Sample Info for new samples created by users. This work the same as leaving SampleSettings.gps prop as "{}" or "undefined".
  deleteAfterUpload?: boolean                                                                       // Deletes the project from user phones when server returns a 2XX status response after a upload. Use this with caution to avoid data loss, by validating the project that is being uploaded. If the server refuses the project by sending any other type of status than 2XX, the project wil not be deleted from user phone, allowing him to fix or complete the project.
  enableResetSyncData?: boolean                                                                     // Enables the option to reset sync data on project settings. When a project has its sync data reseted, all ids inside the project remains the same. I case you want this to be enabled, make sure your backend has upsert logics where it's needed, and skip logics for media that may already exist on your database.
  sendSyncDataOnlyOnce?: boolean                                                                     // When enabled, the sync data will be sent only during the post of an update (/project/:id_project) or creat (/project) new project, instead being sent on every media post call.
  uploadToURL?: string                                                                               // When enabled, the project will only be allowed to upload to the specified URL.
}

export type SampleRules = {
  allowSampleNameChange?: boolean                                                                   // Allows sample name to be changed.
  allowGPSChange?: boolean                                                                          // Allows the GPS input from the sample settings to be used.
  showCreateWidgetButton?: boolean                                                                  // Shows a button that allow users to create a widget from scratch. Use this with caution, since users have total control about inputs type, label and values on these widgets.
  showCopyWidgetFromTemplateButton?: boolean                                                        // Shows a button that allow users to copy widgets from template.
}

export type WidgetRules = {
  allowWidgetNameChange?: boolean                                                                   // Allows widget name to be changed when user clicks on it.
  showAddInputButton?: boolean                                                                      // Shows widget AddInput button.
  showOptionsButton?: boolean                                                                       // Shows widget edit button.
  showThemeButton?: boolean                                                                         // Shows widget theme button.
  showDeleteButton_Widget?: boolean                                                                 // Shows widget delete button when widget edit mode is enabled.
  showDeleteButton_Inputs?: boolean                                                                 // Shows inputs delete buttons when widget edit mode is enabled
  showMoveButton_Inputs?: boolean                                                                   // Shows inputs move buttons when widget edit mode is enabled.
  template_showDeleteButton_Widget?: boolean                                                        // Overrides the "showDeleteButton_Widget" rule for template widgets. "showDeleteButton_Widget" will work only on template copies from this point.
  template_showOptionsButton?: boolean                                                              // Overrides the "showOptionsButton" rule for template widgets. "showOptionsButton" will work only on template copies from this point.
  template_unlockAddAutomatically?: boolean                                                         // Unlocks the checkbox "Add automatically"
  template_AllowCopies?: boolean                                                                    // Hides the option to copie the template widget when user tries to copy from templates. Usefull when you want to add a widget automatically, but don't want more than one widget on each sample.
}
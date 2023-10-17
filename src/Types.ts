// =================================================================================================
// Sync types
// =================================================================================================

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

// =================================================================================================
// DTOs
// =================================================================================================

export type ProjectDTO = {
  projectSettings: ProjectSettings
  projectWidgets: WidgetData[]
  template: WidgetData[]
  samples: SampleDTO[]
  syncData?: SyncData                                                                               // All info you need to sync and old and uploaded project with more recent data. This data is always generated by the app, to allow you to do more precise database operations during project upload. You don't need to send this to the app when someone download a project from your server.
}

export type SampleDTO = {
  sampleSettings: SampleSettings
  sampleWidgets: WidgetData[]
}

// =================================================================================================
// Settings Types
// =================================================================================================

export type ProjectSettings = {
  id_project: string                                                                                // Do not share same id between Projects, because its used to name actual folders inside user device, so it can leads into to crash or unexpected behaviors. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
  status: Status
  name: string                                                                                      // The name of the project.
  sampleAlias: {                                                                                    // If the name "Sample" or "Samples" do not satisfy the context of your project, you can change this names here.
    singular: string
    plural: string
  }
  gps?: GPS_DTO                                                                                     // Hides GPSInput if undefined
  rules: ProjectRules
  sampleRules?: SampleRules                                                                         // If you allow user to create new samples, these new samples will receive the rules defined here.
  uploads?: {                                                                                       // Upload history, added automatically by user phone on first upload. Important: During a project upload, the server must send a 2XX status response in order to the upload history be updated on user phone as well. Is made that way to avoid false upload to be saved with the project data.
    dateUTM: string                                                                                 // Upload in UTM date and hour on "yyyy-mm-dd hh:mm:ss" format. This is consistent, and made to allow servers to have a reference about project upload date and time.
    date: string                                                                                    // User's phone Upload date and hour. This is inconsitent and formated accodlying to user customization. It was made to allow user to see date and hour in a better visualization format.
    url: string                                                                                     // url of the upload.
  }[]
}

export type SampleSettings = {
  id_sample: string                                                                                 // Do not share same id between Samples, because its used to name actual folders inside user device, so it can leads into to crash or unexpected behaviors. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
  name: string
  gps?: GPS_DTO                                                                                     // Hides GPSInput if undefined
  rules: SampleRules
}

// =================================================================================================
// Widget TYPES
// =================================================================================================

export type WidgetData = {
  id_widget: string                                                                                 // No not share same id between Widgets, because its used to name actual folders inside user device, so it can leads into to crash or unexpected behaviors. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
  widgetName: string                                                                                // You can use scape sequence on strings here, without break app layout, like "\n", "\t", etc.
  inputs: InputData[]
  addToNewSamples?: boolean                                                                         // Used by template screen to auto add a Widget on new Samples user creates
  rules: WidgetRules
  widgetTheme?: WidgetTheme                                                                         // When undefine, it renders with default theme
}

export type WidgetTheme = {
  font: string                                                                                      // Defines color for fonts and Inputs Borders
  font_placeholder: string                                                                          // Defines color font for placeholders
  background: string                                                                                // Defines color for Widget static background color.
  confirm: string                                                                                   // Defines a color for confirm feedback. Ex: "True" value on boolean Input; Confirm button when editing input label name; Saved feedback.
  wrong: string                                                                                     // Defines a color for negation feedback. Ex: "False" value on boolean input; Trash color on input.
  warning: string                                                                                   // Defines a color for changes feedback. Ex: "Saved" status changing to "Saving" status on top left Widget corner.
  disabled: string                                                                                  // Defines a color for disabled things. Ex: When N/A is clicked on a boolean input, turning the switch and boolean value to disbled color.
}

// =================================================================================================
// Input TYPES
// =================================================================================================

export type InputData = StringInputData | BooleanInputData | GPSInputData

// ============================
export type StringInputData = {
  id_input: string                                                                                  // Do not share same id betweens Inputs of the same Widget. this can lead into unexpected behavior. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
  label: string                                                                                     // Max of 25 characteres. More than this can break input label layout render. App will not allow you to edit the label in app if you pass this threshold.
  type: 'string'                                                                                    // Without this value, the apps cannot recognize the existence of the input
  value: string                                                                                     // The actual value of the input
  placeholder?: string                                                                              // Customize the placeholder text for your Text input.
  lockedLabel?: boolean                                                                             // Locks input label to not be changed.
  lockedData?: boolean                                                                              // Locks input data, to not be modified, and just displayed.
}

// ============================
export type BooleanInputData = {
  id_input: string                                                                                  // Do not share same id betweens Inputs of the same Widget. this can lead into unexpected behavior. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
  label: string                                                                                     // Max of 25 characteres. More than this can break input label layout render. App will not allow you to edit the label in app if you pass this threshold.
  type: 'boolean'                                                                                   // Without this value, the apps cannot recognize the existence of the input
  value: boolean                                                                                    // The actual value of the input
  notApplicable?: boolean                                                                           // Shows "N/A" option on boolean inputs when not undefined. Use this when just true or false is not enough.
  lockedLabel?: boolean                                                                             // Locks input label to not be changed.
  lockedData?: boolean                                                                              // Locks input data, to not be modified, and just displayed.
}

// ============================
export type  GPSInputData = {
  id_input: string                                                                                  // Do not share same id betweens Inputs of the same Widget. this can lead into unexpected behavior. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
  label: string                                                                                     // Max of 25 characteres. More than this can break input label layout render. App will not allow you to edit the label in app if you pass this threshold.
  type: 'gps'                                                                                       // Without this value, the apps cannot recognize the existence of the input
  value: GPS_DTO                                                                                    // The actual value of the input
  lockedLabel?: boolean                                                                             // Locks input label to not be changed.
  lockedData?: boolean                                                                              // Locks input data, to not be modified, and just displayed.
}
export type GPS_DTO = {
  coordinates?: CoordinateDTO
  altitude?: AltitudeDTO
}
export type CoordinateDTO = {
  lat: number                                                                                       // Latitude in decimal degrees format (DD)
  long: number                                                                                      // Longitude in decimal degrees format (DD)
  accuracy: number                                                                                  // Coordinate accuracy in meters (m)
}
export type AltitudeDTO = {
  value: number                                                                                     // Altitude value in meters (m)
  accuracy: number                                                                                  // Altitude accuracy in meters (m)
}

// =================================================================================================
// Input TYPES
// =================================================================================================

export type ProjectRules = {
  allowMultipleDownloads?: boolean                                                                  // When true, the app will make a copy of the projects and replace the ids of all elements (project/samples/widgets/inputs) with new ones. This does not remove the need to give an id to all elements inside the project that will be copied.
  allowProjectNameChange?: boolean                                                                  // Allows the project name to be changed on project info.
  allowSampleAliasChange?: boolean                                                                  // Allows the sample alias to be changed on project info.
  allowGPSChange?: boolean                                                                          // Hide GPSInput if both this and gps undefined
  showCreateWidgetButton_Project?: boolean                                                          // Shows the project widget creation button.
  showCreateWidgetButton_Template?: boolean                                                         // Shows the template widget creation button.
  showSampleCreationButton?: boolean                                                                // Shows the sample widget creation button.
  addGPSToNewSamples?: boolean                                                                      // Shows gps input on Sample Info for new samples created by users. This work the same as leaving SampleSettings.gps prop as "{}" or "undefined".
  deleteAfterUpload?: boolean                                                                       // Deletes the project from user phones when server returns a 2XX status response after a upload. Use this with caution to avoid data loss, by validating the project that is being uploaded. If the server refuses the project by sending any other type of status than 2XX, the project wil not be deleted from user phone, allowing him to fix or complete the project.
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

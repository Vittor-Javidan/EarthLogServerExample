import { GPS_DTO, InputData } from "./Inputs.js"
import { ProjectRules, SampleRules, WidgetRules } from "./Rules.js"


// =================================================================================================
// DTOs
// =================================================================================================


export type ProjectStatus = "uploaded" | "new"                                                      // When a user downloads a project, that's the place to tell the app if the project was oploaded before, or if it's a fresh one.
export type ProjectDTO = {
  projectSettings: ProjectSettings                                                                  // All basic information about the project
  projectWidgets: WidgetData[]                                                                      // Project widgets, design to allow you to add custom general information about the project
  template: WidgetData[]                                                                            // Template widgets, design to be copied into the samples, automatically, or manually, making the user life quality much better.
  samples: SampleDTO[]                                                                              // All the samples
}

export type SampleDTO = {
  sampleSettings: SampleSettings                                                                    // All basic information about the sample
  sampleWidgets: WidgetData[]                                                                       // Widget samples. design to represent the data users collect during their jobs.
}

// =================================================================================================
// Settings Types
// =================================================================================================

export type ProjectSettings = {
  id_project: string                                                                                // Do not share same id between Projects, because its used to name actual folders inside user device, so it can leads into to crash or unexpected behaviors. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
  lts_version: 1                                                                                    // The lts version of the project. App uses this to decide if the project should be display or not during project download, according to the user selected lts version.
  name: string                                                                                      // The name of the project displayed inside the app.
  sampleAlias: {                                                                                    // If the name "Sample" or "Samples" do not satisfy the context of your project, you can change this names here.
    singular: string
    plural: string
  }
  gps?: GPS_DTO                                                                                     // Hides GPSInput if undefined
  rules: ProjectRules                                                                               // Rules that defines how the project should behave. Check Rules.ts for more information
  sampleRules?: SampleRules                                                                         // If you allow user to create new samples, these new samples will receive the rules defined here.
  uploads?: {                                                                                       // Upload history, added automatically by user phone on first upload. Important: During a project upload, the server must send a 2XX status response in order to the upload history be updated on user phone as well. Is made that way to avoid false upload to be saved with the project data.
    dateUTM: string                                                                                 // Upload in UTM date and hour on "yyyy-mm-dd hh:mm:ss" format. This is consistent, and made to allow servers to have a reference about project upload date and time.
    date: string                                                                                    // User's phone Upload date and hour. This is inconsitent and formated accodlying to user customization. It was made to allow user to see date and hour in a better visualization format.
    url: string                                                                                     // url of the upload.
  }[]
}

export type SampleSettings = {
  id_sample: string                                                                                 // Do not share same id between Samples, because its used to name actual folders inside user device, so it can leads into to crash or unexpected behaviors. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
  name: string                                                                                      // The name of the sample displayed inside the app.
  gps?: GPS_DTO                                                                                     // Hides GPSInput if undefined
  rules: SampleRules                                                                                // Rules that defines how the sample should behave. Check Rules.ts for more information
}

// =================================================================================================
// Widget TYPES
// =================================================================================================

export type WidgetData = {
  id_widget: string                                                                                 // No not share same id between Widgets, because its used to name actual folders inside user device, so it can leads into to crash or unexpected behaviors. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
  widgetName: string                                                                                // You can use scape sequence on strings here, without break app layout, like "\n", "\t", etc.
  inputs: InputData[]                                                                               // All Inputs that compose the Widget. Check Inputs.ts for more information
  addToNewSamples?: boolean                                                                         // Used by template screen to auto add a Widget on new Samples user creates
  rules: WidgetRules                                                                                // Rules that defines how the widget should behave. Check Rules.ts for more information
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


export type InputData = StringInputData | BooleanInputData | GPSInputData

// ============================
export type StringInputData = {
  id_input: string                                                                                  // Do not share same id betweens Inputs of the same Widget. this can lead into unexpected behavior. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
  label: string                                                                                     // Label of the input, to guide the user about what data they must collect. Carefull, Words with more than 25 characters can break the app Layout.
  type: 'string'                                                                                    // Without this value, the app cannot recognize the existence of the input
  value: string                                                                                     // The actual value of the input
  placeholder?: string                                                                              // Customize the placeholder text for your Text input.
  lockedLabel?: boolean                                                                             // Locks input label to not be changed.
  lockedData?: boolean                                                                              // Locks input data, to not be modified, and just displayed.
}

// ============================
export type BooleanInputData = {
  id_input: string                                                                                  // Do not share same id betweens Inputs of the same Widget. this can lead into unexpected behavior. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
  label: string                                                                                     // Label of the input, to guide the user about what data they must collect. Carefull, Words with more than 25 characters can break the app Layout.
  type: 'boolean'                                                                                   // Without this value, the app cannot recognize the existence of the input
  value: boolean                                                                                    // The actual value of the input
  notApplicable?: boolean                                                                           // Shows "N/A" option on boolean inputs when not undefined. Use this when just true or false is not enough.
  lockedLabel?: boolean                                                                             // Locks input label to not be changed.
  lockedData?: boolean                                                                              // Locks input data, to not be modified, and just displayed.
}

// ============================
export type OptionsInputData = {
  id_input: string                                                                                  // Do not share same id betweens Inputs of the same Widget. this can lead into unexpected behavior. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
  label: string                                                                                     // Label of the input, to guide the user about what data they must collect. Carefull, Words with more than 25 characters can break the app Layout.
  type: 'options'                                                                                   // Without this value, the app cannot recognize the existence of the input
  value: OptionData[]                                                                               // All options available
  showAddOptionButton?: boolean                                                                     // Shows the button to allow users to add more options
  allowOptionLabelChange?: boolean                                                                  // Allows users to change the label of each option
  allowOptionDeletion?: boolean                                                                     // Shows delete button for each option when edit mode is enable for this input
  lockedLabel?: boolean                                                                             // Locks input label to not be changed.
  lockedData?: boolean                                                                              // Locks options values, to not be modified, and just displayed.
}
export type OptionData = {
  id: string                                                                                        // Do not share same id betweens options of the same input. this can lead into unexpected behavior. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
  optionLabel: string                                                                               // option label
  checked: boolean                                                                                  // option value
}

// ============================
export type SelectionInputData = {
  id_input: string                                                                                  // Do not share same id betweens Inputs of the same Widget. this can lead into unexpected behavior. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
  label: string                                                                                     // Label of the input, to guide the user about what data they must collect. Carefull, Words with more than 25 characters can break the app Layout.
  type: 'selection'                                                                                 // Without this value, the app cannot recognize the existence of the input
  value: SelectionOptionData                                                                        // All options available
  showAddOptionButton?: boolean                                                                     // Shows the button to allow users to add more options
  allowOptionLabelChange?: boolean                                                                  // Allows users to change the label of each option
  allowOptionDeletion?: boolean                                                                     // Shows delete button for each option when edit mode is enable for this input
  lockedLabel?: boolean                                                                             // Locks input label to not be changed.
  lockedData?: boolean                                                                              // Locks options values, to not be modified, and just displayed.
}
export type SelectionOptionData = {
  options: {                                                                                        // Array of options inside the selection input.
    id: string,                                                                                     // Do not share same id betweens options of the same input. this can lead into unexpected behavior. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
    optionLabel: string                                                                             // option label.
  }[]
  id_selected: string                                                                               // ID of the selected option.(It's empty when no option was selected by the user).
}

// ============================
export type PictureInputData = {
  id_input: string                                                                                  // Do not share same id betweens Inputs of the same Widget. this can lead into unexpected behavior. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
  label: string                                                                                     // Label of the input, to guide the user about what data they must collect. Carefull, Words with more than 25 characters can break the app Layout.
  type: 'picture'                                                                                   // Without this value, the app cannot recognize the existence of the input
  value: PictureData[]                                                                              // Array with metadata of each picture taken.
  lockedLabel?: boolean                                                                             // Locks input label to not be changed.
  lockedData?: boolean                                                                              // Do nothing at the moment.
  picturesAmountLimit?: number                                                                      // Max amount of pictures user can save on this input. If undefined, unlimited amount is set.
}
export type PictureData = {
  id_picture: string                                                                                // Reference ID of the picture. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
  description: string                                                                               // Picture description.
  dateAndTimeUTC: string                                                                            // Upload in UTM date and hour on "yyyy-mm-dd hh:mm:ss" format. This is consistent, and made to allow servers to have a reference about project upload date and time.
  dateAndTime: string                                                                               // User's phone Upload date and hour. This is inconsitent and formated accodlying to user customization. It was made to allow user to see date and hour in a better visualization format.
}

// ============================
export type  GPSInputData = {
  id_input: string                                                                                  // Do not share same id betweens Inputs of the same Widget. this can lead into unexpected behavior. Use ids validated by this regex: /^[0-9A-Za-z-]+$/, or just use a uuidV4 generator.
  label: string                                                                                     // Label of the input, to guide the user about what data they must collect. Carefull, Words with more than 25 characters can break the app Layout.
  type: 'gps'                                                                                       // Without this value, the app cannot recognize the existence of the input
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
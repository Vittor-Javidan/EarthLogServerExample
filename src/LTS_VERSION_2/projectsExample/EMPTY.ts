import { ProjectDTO } from "../Types/DTO.js";

export const EMPTY: ProjectDTO = {
  projectSettings: {
    id_project: 'd5b97e50-9375-49fd-a383-39433e2f8a1b',
    lts_version: 2,
    status: 'new',
    name: 'Empty project',
    rules: {
      allowMultipleDownloads: true,
      allowGPSChange: true,
      allowProjectNameChange: true,
      allowSampleAliasChange: true,
      allowProjectExport: true,
      showCreateWidgetButton_Project: true,
      showCreateWidgetButton_Template: true,
      showSampleCreationButton: true,
      addGPSToNewSamples: true,
    },
    gps: {},
    sampleAlias: {
      singular: '',
      plural: '',
    },
  },
  projectWidgets: [],
  samples: [],
  template: [],
}

import { ProjectDTO } from "../Types.js";

export const GEOLOGY: ProjectDTO = {
  projectSettings: {
    id_project: 'a9376198-3818-40ea-b23e-2b6cfb61d084',
    status: 'new',
    name: 'Geology field description example',
    sampleAlias: {
      singular: 'Local',
      plural: 'Localities',
    },
    gps: {},
    rules: {
      allowProjectNameChange: true,
      allowMultipleDownloads: true,
      allowGPSChange: true,
      showSampleCreationButton: true,
      addGPSToNewSamples: true,
    },
    sampleRules: {
      allowGPSChange: true,
      allowSampleNameChange: true,
      showCopyWidgetFromTemplateButton: true,
    }
  },
  projectWidgets: [
    {
      id_widget: 'de24da16-1a66-4803-b56d-d7c886354f5d',
      widgetName: 'Project description',
      rules: {
        showThemeButton: true,
      },
      inputs: [
        {
          id_input: 'd6d0282d-e854-47d5-985f-04d86faf3c67',
          type: 'string',
          label: 'Regional Geology',
          value: '',
          lockedLabel: true,
        },
      ]
    }
  ],
  template: [
    {
      id_widget: 'e983620b-1eed-4ccf-b2c2-d0d624ef6b42',
      widgetName: 'Local Description',
      addToNewSamples: true,
      rules: {
        showThemeButton: true,
      },
      inputs: [
        {
          id_input: 'fcfbbf9d-136e-496c-acda-7422c0066ce1',
          label: 'What do you see?',
          type: 'string',
          value: '',
          placeholder: 'Give general description of the local you in.',
          lockedLabel: true,
        },
        {
          id_input: '1f131910-0022-4213-8ee5-db64112301a9',
          label: 'Any crop?',
          type: 'boolean',
          value: true,
          lockedLabel: true,
        },
        {
          id_input: '36052cee-700c-4dd5-8cb2-cfae7fa43e99',
          label: 'GPS',
          type: 'gps',
          value: {},
          lockedLabel: true,
        },
      ]
    },
    {
      id_widget: '838a9ecb-7042-49fc-88be-7c484f566f8e',
      widgetName: 'Crop',
      rules: {
        template_AllowCopies: true,
        template_unlockAddAutomatically: true,
        showDeleteButton_Widget: true,
        showOptionsButton: true,
        showThemeButton: true,
      },
      inputs: [
        {
          id_input: '436a0ed3-d9a2-4704-b650-5ea52497fb57',
          label: 'Composition',
          type: 'string',
          value: '',
          lockedLabel: true,
          placeholder: 'Gives a overall description about composition'
        },
        {
          id_input: '2262379f-50bf-44a8-829b-312f27d98f06',
          label: 'Dimensions',
          type: 'string',
          value: '',
          lockedLabel: true,
          placeholder: 'Gives a overall description about its dimensions'
        },
        {
          id_input: '9c5598d6-11c1-470d-95f6-8182e217eb3a',
          label: 'Structures',
          type: 'string',
          value: '',
          lockedLabel: true,
          placeholder: 'Gives a overall description about the structures you see'
        },
        {
          id_input: 'c11c1ddc-3ddb-4775-8181-aa067385ade3',
          label: 'Veins and mineralogy',
          type: 'string',
          value: '',
          lockedLabel: true,
          placeholder: 'Gives a overall description about veins and mineralogy'
        },
      ]
    },
    {
      id_widget: 'cf08b4b7-df7b-4876-9555-3e793be549a9',
      widgetName: 'Rock',
      rules: {
        template_AllowCopies: true,
        template_unlockAddAutomatically: true,
        showOptionsButton: true,
        showDeleteButton_Widget: true,
        showThemeButton: true,
      },
      inputs: [
        {
          id_input: '34aaf434-6ec3-4e0a-a119-c80a41492878',
          label: 'Name',
          type: 'string',
          value: '',
          placeholder: 'Give a name based on your interpretation of the rock',
          lockedLabel: true,
        },{
          id_input: 'd4b14445-2877-4228-957b-4f49a6c7f5c7',
          label: 'Description',
          type: 'string',
          value: '',
          placeholder: 'Give the rock description',
          lockedLabel: true,
        },{
          id_input: 'ff236786-a37d-43aa-ba81-c6e1581cdcaf',
          label: 'GPS',
          type: 'gps',
          value: {},
          lockedLabel: true,
        }
      ]
    }
  ],
  samples: []
}
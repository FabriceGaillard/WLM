// HELPERS
import { addStorageSettings } from '../../../handleStorage';
// DATA
import checkedStatus from '../../../../data/home/contacts/checkedStatus';

const showDetails = (target, settings, setSettings) => {
  let { checked } = target.dataset;

  const updateSettings = {
    ...settings,
    sortShowOptions: {
      ...settings.sortShowOptions,
      showDetails: checkedStatus[checked]
    }
  };

  setSettings(updateSettings);
  addStorageSettings(updateSettings);
};

export default showDetails;
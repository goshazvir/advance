// Third-party Imports
import 'server-only';

// Load the default dictionary
const dictionary = () =>
  import('@/data/dictionaries/en.json').then(module => module.default);

export const getDictionary = async () => dictionary();

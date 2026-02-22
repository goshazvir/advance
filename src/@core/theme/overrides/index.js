import fab from './fab';
import card from './card';
import chip from './chip';
import list from './list';
import menu from './menu';
import tabs from './tabs';
import link from './link';
import input from './input';
import paper from './paper';
import Radio from './radio';
import Alerts from './alerts';
import avatar from './avatar';
import badges from './badges';
import button from './button';
import dialog from './dialog';
import drawer from './drawer';
import rating from './rating';
import Select from './select';
import slider from './slider';
import popper from './popper';
import popover from './popover';
import tooltip from './tooltip';
import tabList from './tab-list';
import backdrop from './backdrop';
import Checkbox from './checkbox';
import progress from './progress';
import snackbar from './snackbar';
import timeline from './timeline';
// Override Imports
import Accordion from './accordion';
import pagination from './pagination';
import typography from './typography';
import datePicker from './date-picker';
import iconButton from './icon-button';
import switchOverrides from './switch';
import breadcrumbs from './breadcrumbs';
import buttonGroup from './button-group';
import formControl from './form-control';
import Autocomplete from './autocomplete';
import toggleButton from './toggle-button';
import tablePagination from './table-pagination';

const overrides = skin => {
  return Object.assign(
    {},
    Accordion(skin),
    Alerts,
    Autocomplete(skin),
    avatar,
    backdrop,
    badges,
    breadcrumbs,
    button,
    buttonGroup,
    card(skin),
    Checkbox,
    chip,
    datePicker,
    dialog(skin),
    drawer(skin),
    fab,
    formControl,
    iconButton,
    input,
    list,
    menu(skin),
    pagination,
    paper,
    popover(skin),
    popper(),
    progress,
    Radio,
    rating,
    Select,
    slider,
    snackbar(skin),
    switchOverrides,
    tablePagination,
    timeline,
    toggleButton,
    tooltip,
    typography,
    link,
    tabs(link),
    tabList(link),
  );
};

export default overrides;

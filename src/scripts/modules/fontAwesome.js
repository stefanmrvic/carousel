import { library, dom } from '@fortawesome/fontawesome-svg-core';
import * as icon from './icons.js';

library.add(
    icon.faChevronLeft,
    icon.faChevronRight,
    icon.faCircle,
    icon.faCircleDot
);

dom.watch();

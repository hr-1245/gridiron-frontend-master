import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import SvgColor from 'src/components/svg-color';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  // <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  <Iconify icon={name} />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

// const ICONS = {
//   job: icon('ic_job'),
//   blog: icon('ic_blog'),
//   chat: icon('ic_chat'),
//   mail: icon('ic_mail'),
//   user: icon('ic_user'),
//   file: icon('ic_file'),
//   lock: icon('ic_lock'),
//   tour: icon('ic_tour'),
//   order: icon('ic_order'),
//   label: icon('ic_label'),
//   blank: icon('ic_blank'),
//   kanban: icon('ic_kanban'),
//   folder: icon('ic_folder'),
//   banking: icon('ic_banking'),
//   booking: icon('ic_booking'),
//   invoice: icon('ic_invoice'),
//   product: icon('ic_product'),
//   calendar: icon('ic_calendar'),
//   disabled: icon('ic_disabled'),
//   external: icon('ic_external'),
//   menuItem: icon('ic_menu_item'),
//   ecommerce: icon('ic_ecommerce'),
//   analytics: icon('ic_analytics'),
//   dashboard: icon('ic_dashboard'),
// };

const ICONS = {
  dashboard: icon('fluent:home-16-filled'),
  profile: icon('fluent:person-circle-24-filled'),
  ecommerce: icon('tabler:shopping-cart'),
  convertManual: icon('solar:document-text-bold'),
  convertBulk: icon('fluent:document-multiple-24-filled'),
  howToUse: icon('fluent:book-open-24-filled'),

  blog: icon('mdi:blog'),
  chat: icon('fluent:chat-24-filled'),
  mail: icon('fluent:mail-24-filled'),
  user: icon('fluent:person-24-filled'),
  file: icon('fluent:people-team-24-filled'),
  lock: icon('fluent:lock-closed-24-filled'),
  tour: icon('fluent:map-24-filled'),
  order: icon('tabler:receipt'),
  label: icon('tabler:tag'),
  blank: icon('mdi:checkbox-blank-outline'),
  kanban: icon('fluent:apps-24-filled'),
  folder: icon('fluent:folder-24-filled'),
  banking: icon('tabler:building-bank'),
  booking: icon('mdi:calendar-check'),
  invoice: icon('tabler:file-invoice'),
  product: icon('mdi:package-variant-closed'),
  calendar: icon('fluent:calendar-24-filled'),
  disabled: icon('mdi:eye-off-outline'),
  external: icon('mdi:open-in-new'),
  menuItem: icon('tabler:menu'),
  analytics: icon('fluent:data-pie-24-filled'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: 'overview',
        items: [
          { title: 'Home', path: "/dashboard" ,icon: ICONS.dashboard },
          { title: 'All Players', path: paths.dashboard.allDraft, icon: ICONS.file },
          { title: 'Manual Convert', path: paths.dashboard.convert.manual, icon: ICONS.convertManual },
          { title: 'Bulk Convert', path: paths.dashboard.convert.bulk, icon: ICONS.convertBulk },
          { title: 'How To Use', path: paths.dashboard.howToUse, icon: ICONS.howToUse },
        ],
      },

    ],
    []
  );

  return data;
}

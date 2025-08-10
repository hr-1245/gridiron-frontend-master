import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { IUserItem } from 'src/types/user';
import { IPlayer } from 'src/types/player';
import { useRouter } from 'next/navigation';
import { paths } from 'src/routes/paths';
import { Link } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { overArgs } from 'lodash';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IPlayer;
  onSelectRow: VoidFunction;
  onDeleteRow: (id: number) => Promise<void>
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const router = useRouter();
  const { name, attributes, position, projectedReason,homeTown,college,overallRating, id } = row;

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={name} src={"avatarUrl"} sx={{ mr: 2 }} />

          <Link
            component={RouterLink}
            href={paths.dashboard.profile.view(id)}
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItemText
              primary={name}
              primaryTypographyProps={{ typography: 'body2' }}

            />
          </Link>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{college}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{position.name}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{projectedReason}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{overallRating}</TableCell>



        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>


          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>


      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >


        <MenuItem
          onClick={() => router.push(paths.dashboard.profile.view(row.id))}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={() => onDeleteRow(+row.id)}>
            Delete
          </Button>
        }
      />
    </>
  );
}

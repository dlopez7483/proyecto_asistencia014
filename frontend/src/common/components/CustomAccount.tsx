import { Button, Divider, MenuList, Stack } from "@mui/material";
import {
  AccountPreview,
  SignOutButton,
  AccountPopoverFooter,
  Account,
} from "@toolpad/core/Account";
import EditIcon from "@mui/icons-material/Edit";

function CustomAccountMenu() {
  return (
    <Stack direction="column">
      <AccountPreview variant="expanded" />
      <Divider />
      <MenuList>
        <Button
          variant="text"
          sx={{ textTransform: "capitalize", display: "flex", mx: "auto" }}
          size="small"
          startIcon={<EditIcon />}
          disableElevation
        >
          Aditar perfil
        </Button>
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
}

export default function CustomAccount() {
  return <Account slots={{
    popoverContent: CustomAccountMenu
  }} />;
}

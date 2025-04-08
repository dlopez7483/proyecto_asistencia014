import { Button, Divider, MenuList, Stack } from "@mui/material";
import {
  AccountPreview,
  SignOutButton,
  AccountPopoverFooter,
  Account,
} from "@toolpad/core/Account";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { config } from "@config/config";

function CustomAccountMenu() {
  const rol = JSON.parse(
    sessionStorage.getItem(config.SESSION_AUTH) || "{}"
  ). rol;

  return (
    <Stack direction="column">
      <AccountPreview variant="expanded" />
      <Divider />
      {rol == 1 ? (
        <MenuList>
          <Link to={"./perfil"} style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              sx={{ textTransform: "capitalize", display: "flex", mx: "auto" }}
              size="small"
              startIcon={<EditIcon />}
              disableElevation
            >
              Editar perfil
            </Button>
          </Link>
        </MenuList>
      ) : null}
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
}

export default function CustomAccount() {
  return (
    <Account
      slots={{
        popoverContent: CustomAccountMenu,
      }}
    />
  );
}

import { Theme } from '../../components/Theme';
import Dashboard from '../../components/Dashboard';
import Navigation from './Navigation-Admin';

const BRANDING = {
  logo: <img src="/src/assets/logo-ecys-fiusac-min.png" alt="DTT USAC" style={{ height: '100%', width: 'auto' }} />,
  title: "ADMINISTRADOR",
  homeUrl: "/dashboard-admin",
};

export default function Dashboard_Admin() {

  return (
    <Dashboard branding={BRANDING} navigation={Navigation} theme={Theme} />
  );
}

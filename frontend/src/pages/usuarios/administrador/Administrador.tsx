import Dashboard from '@common/components/Dashboard';
import Navigation from './Navigation';
import logo from '@assets/logo.png';

const BRANDING = {
  logo: <img src={logo} alt="DTT USAC" style={{ height: '100%', width: 'auto' }} />,
  title: "ADMINISTRADOR",
  homeUrl: "/dashboard-admin/tutores",
};

export default function Administrador() {

  return (
    <Dashboard branding={BRANDING} navigation={Navigation} />
  );
}

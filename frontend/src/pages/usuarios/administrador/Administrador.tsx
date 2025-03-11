import Dashboard from '@common/components/Dashboard';
import Navigation from './Navigation';

const BRANDING = {
  logo: <img src="/src/assets/logo-ecys-fiusac-min.png" alt="DTT USAC" style={{ height: '100%', width: 'auto' }} />,
  title: "ADMINISTRADOR",
  homeUrl: "/dashboard-admin",
};

export default function Administrador() {

  return (
    <Dashboard branding={BRANDING} navigation={Navigation} />
  );
}

import Dashboard from '@common/components/Dashboard';
import Navigation from './Navigation';
import logo from '@assets/logo.png';


const BRANDING = {
  logo: <img src={logo} alt="DTT USAC" style={{ height: '100%', width: 'auto' }} />,
  title: "TUTOR",
  homeUrl: "/dashboard-tutor",
};

export default function Dashboard_Admin() {

  return (
    <Dashboard branding={BRANDING} navigation={Navigation} />
  );
}

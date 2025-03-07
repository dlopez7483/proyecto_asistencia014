import Dashboard from '../../components/Dashboard';
import Navigation from './Navigation-Tutor';
import { Theme } from '../../components/Theme';


const BRANDING = {
  logo: <img src="/src/assets/logo-ecys-fiusac-min.png" alt="DTT USAC" style={{ height: '100%', width: 'auto' }} />,
  title: "TUTOR",
  homeUrl: "/dashboard-tutor",
};

export default function Dashboard_Admin() {

  return (
    <Dashboard branding={BRANDING} navigation={Navigation} theme={Theme} />
  );
}

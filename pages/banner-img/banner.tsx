import { MainLayout } from '../../components/layouts';
import Image from 'next/image';

import banner from '../../public/images/banner.png';

const Banner = () => {
  return (
    <MainLayout title='banner img'>
      <Image src={banner} alt='banner img' width='100%' height='100%' />
    </MainLayout>
  );
};

export default Banner;

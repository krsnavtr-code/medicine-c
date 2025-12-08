'use client';

import Banner from '@/components/Banner';
import HomeProduct from '@/components/HomeProduct';
import Offers from '@/components/offers';
import ShopByCategories from '@/components/ShopByCategories';

export default function Page() {
  return (
    <>
      <Banner />
      <Offers />
      <ShopByCategories />
      <HomeProduct />
    </>
  );
}